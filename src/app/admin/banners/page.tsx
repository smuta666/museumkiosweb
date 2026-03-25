"use client";

import { useEffect, useState } from "react";

type Banner = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function loadBanners() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/banners", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить баннеры");
      }

      const data = await response.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Ошибка загрузки баннеров");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function handleCreateBanner() {
    const cleanTitle = title.trim();

    if (!cleanTitle || !file) {
      setError("Заполни название и выбери изображение");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append("title", cleanTitle);
      formData.append("file", file);

      const response = await fetch("/api/admin/banners", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не удалось создать баннер");
      }

      setTitle("");
      setFile(null);
      setPreview(null);
      await loadBanners();
    } catch {
      setError("Ошибка при создании баннера");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteBanner(id: string) {
    const confirmed = window.confirm("Удалить этот баннер?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить баннер");
      }

      await loadBanners();
    } catch (err) {
      setError("Ошибка при удалении баннера");
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
          Баннеры
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[#b9c7c2]">
          Здесь можно добавлять баннеры для главного слайдера и удалять неактуальные изображения.
        </p>
      </div>

      {error ? (
        <div className="rounded-[22px] border border-[rgba(255,120,120,0.22)] bg-[rgba(255,80,80,0.08)] px-5 py-4 text-lg text-[#ffd7d7]">
          {error}
        </div>
      ) : null}

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[520px_1fr]">
        <div className="rounded-[28px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
            Новый баннер
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Название
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Весенняя программа музея"
                className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <div>
              <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border border-[rgba(124,201,183,0.2)] px-4 py-3 text-[#cfe7e3] hover:bg-[rgba(255,255,255,0.05)]">
                Выбрать изображение
                <input
                  type="file"
                  name="file"
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
              onClick={handleCreateBanner}
              disabled={submitting}
              className="mt-2 h-[60px] rounded-[22px] border border-[rgba(132,220,204,0.28)] bg-[linear-gradient(180deg,rgba(49,163,139,0.98),rgba(28,118,100,0.98))] px-6 text-xl font-extrabold text-[#f4efe4] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Сохранение..." : "Добавить баннер"}
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
                  alt="Превью баннера"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xl text-[rgba(255,255,255,0.35)]">
                  Здесь появится превью изображения
                </div>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,24,20,0.86),rgba(7,33,28,0.35),rgba(5,24,20,0.56))]" />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-sm uppercase tracking-[0.32em] text-[#9ed5cd]">
                  Баннер
                </div>
                <div className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.03em] text-[#f3efe4]">
                  {title.trim() || "Название баннера появится здесь"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
          Все баннеры
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Загрузка баннеров...
          </div>
        ) : banners.length === 0 ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Пока нет ни одного баннера
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="overflow-hidden rounded-[26px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="relative aspect-[16/8] w-full bg-[rgba(3,20,17,0.7)]">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,18,15,0.78),transparent_42%)]" />
                </div>

                <div className="flex items-start justify-between gap-6 p-6">
                  <div className="min-w-0">
                    <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">
                      ID #{banner.id}
                    </div>
                    <div className="mt-3 text-2xl font-bold leading-snug text-[#f2f1e9]">
                      {banner.title}
                    </div>
                    <div className="mt-3 break-all text-base text-[#b9c7c2]">
                      {banner.imageUrl}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteBanner(banner.id)}
                    disabled={deletingId === banner.id}
                    className="shrink-0 rounded-2xl border border-[rgba(255,120,120,0.20)] bg-[rgba(255,80,80,0.08)] px-5 py-3 text-base font-semibold text-[#ffd6d6] transition hover:bg-[rgba(255,80,80,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === banner.id ? "Удаление..." : "Удалить"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}