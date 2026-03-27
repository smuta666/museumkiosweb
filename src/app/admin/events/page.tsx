"use client";

import { useEffect, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/events", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить мероприятия");
      }

      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setError("Ошибка загрузки мероприятий");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function handleCreateEvent() {
    if (!title.trim() || !description.trim() || !startDate || !endDate) {
      setError("Заполни все обязательные поля");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/admin/events", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не удалось создать мероприятие");
      }

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setFile(null);
      setPreview(null);

      await loadEvents();
    } catch {
      setError("Ошибка при создании мероприятия");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteEvent(id: string) {
    const confirmed = window.confirm("Удалить это мероприятие?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить мероприятие");
      }

      await loadEvents();
    } catch {
      setError("Ошибка при удалении мероприятия");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">
          Управление контентом
        </div>
        <h1 className="mt-3 text-5xl font-extrabold tracking-[-0.04em] text-[#f2f1e9]">
          Мероприятия
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[#b9c7c2]">
          Здесь можно добавлять афиши, события и временные выставки.
        </p>
      </div>

      {error ? (
        <div className="rounded-[22px] border border-[rgba(255,120,120,0.22)] bg-[rgba(255,80,80,0.08)] px-5 py-4 text-lg text-[#ffd7d7]">
          {error}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[560px_1fr]">
        <div className="rounded-[28px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
            Новое мероприятие
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <div><label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Название
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Весенняя экскурсия"
                className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Описание
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание мероприятия"
                className="min-h-[120px] w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                  Начало
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 text-lg text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                  Окончание
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 text-lg text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Изображение
              </label>

              <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border border-[rgba(124,201,183,0.2)] px-4 py-3 text-[#cfe7e3] hover:bg-[rgba(255,255,255,0.05)]">
                Выбрать изображение
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);

                    if (selectedFile) {
                      const url = URL.createObjectURL(selectedFile);
                      setPreview(url);
                    } else {
                      setPreview(null);
                    }
                  }}
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleCreateEvent}
              disabled={submitting}
              className="mt-2 h-[60px] rounded-[22px] border border-[rgba(132,220,204,0.28)] bg-[linear-gradient(180deg,rgba(49,163,139,0.98),rgba(28,118,100,0.98))] px-6 text-xl font-extrabold text-[#f4efe4] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Сохранение..." : "Добавить мероприятие"}
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
            Превью
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-[rgba(124,201,183,0.16)] bg-[rgba(3,20,17,0.7)]">
            <div className="relative aspect-[16/8] w-full bg-[linear-gradient(135deg,rgba(14,52,44,0.92),rgba(8,25,21,0.96))]">
              {preview ? (
                <img
                  src={preview}
                  alt="Превью мероприятия"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xl text-[rgba(255,255,255,0.35)]">
                  Здесь появится превью изображения
                </div>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,18,15,0.78),transparent_42%)]" />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-sm uppercase tracking-[0.32em] text-[#9ed5cd]">
                  Мероприятие
                </div>
                <div className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.03em] text-[#f3efe4]">
                  {title.trim() || "Название мероприятия"}
                </div>
                <div className="mt-3 text-lg text-[#d4dfdb]">
                  {description.trim() || "Описание мероприятия"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
          Все мероприятия
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Загрузка мероприятий...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Пока нет ни одного мероприятия
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-[26px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                {event.imageUrl ? (
                  <div className="flex h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-[rgba(0,0,0,0.18)] p-3">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="max-h-full max-w-full rounded-[18px] object-contain"
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">
                    Мероприятие
                  </div>

                  <div className="mt-3 text-2xl font-bold text-[#f2f1e9]">
                    {event.title}
                  </div>

                  <div className="mt-3 text-base leading-relaxed text-[#b9c7c2]">
                    {event.description}
                  </div>

                  <div className="mt-4 text-sm text-[#9ec1ba]">
                    {new Date(event.startDate).toLocaleString("ru-RU")} —{" "}
                    {new Date(event.endDate).toLocaleString("ru-RU")}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(event.id)}
                    disabled={deletingId === event.id}
                    className="mt-5 rounded-2xl border border-[rgba(255,120,120,0.20)] bg-[rgba(255,80,80,0.08)] px-5 py-3 text-base font-semibold text-[#ffd6d6] transition hover:bg-[rgba(255,80,80,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === event.id ? "Удаление..." : "Удалить"}
                  </button>
                </div></div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}