"use client";

import { useEffect, useState } from "react";

type PriceItem = {
  id: string;
  category: string;
  description: string | null;
  price: number;
};

export default function AdminPricesPage() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadPrices() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/prices", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить цены");
      }

      const data = await response.json();
      setPrices(Array.isArray(data) ? data : []);
    } catch {
      setError("Ошибка загрузки цен");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPrices();
  }, []);

  async function handleCreatePrice() {
    if (!category.trim() || !price.trim()) {
        setError("Заполни обязательные поля");
        return;
    }

    try {
        setSubmitting(true);
        setError("");

        const response = await fetch("/api/admin/prices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category: category.trim(),
            description: description.trim(),
            price: Number(price),
        }),
        });

        if (!response.ok) {
        throw new Error("Не удалось создать цену");
        }

        setCategory("");
        setDescription("");
        setPrice("");

        await loadPrices();
    } catch {
        setError("Ошибка при создании цены");
    } finally {
        setSubmitting(false);
    }
  }

  async function handleDeletePrice(id: string) {
    const confirmed = window.confirm("Удалить эту цену?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/admin/prices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить цену");
      }

      await loadPrices();
    } catch {
      setError("Ошибка при удалении цены");
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
          Цены
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[#b9c7c2]">
          Здесь можно добавлять категории билетов и стоимость посещения.
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
            Новая цена
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Название
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Например: Взрослый билет"
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
                placeholder="Описание категории билета"
                className="min-h-[120px] w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#8eb6ae]">
                Стоимость
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="500"
                className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-4 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <button
              type="button"
              onClick={handleCreatePrice}
              disabled={submitting}
              className="mt-2 h-[60px] rounded-[22px] border border-[rgba(132,220,204,0.28)] bg-[linear-gradient(180deg,rgba(49,163,139,0.98),rgba(28,118,100,0.98))] px-6 text-xl font-extrabold text-[#f4efe4] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Сохранение..." : "Добавить цену"}
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
            Превью
          </div>

          <div className="mt-6 rounded-[24px] border border-[rgba(124,201,183,0.16)] bg-[rgba(3,20,17,0.7)] p-8">
            <div className="text-sm uppercase tracking-[0.32em] text-[#9ed5cd]">
              Категория
            </div>

            <div className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.03em] text-[#f3efe4]">
              {category.trim() || "Название категории"}
            </div>

            <div className="mt-4 text-xl leading-relaxed text-[#d4dfdb]">
              {description.trim() || "Описание категории билета"}
            </div>

            <div className="mt-8 inline-flex rounded-[22px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] px-6 py-4 text-3xl font-extrabold text-[#f2f1e9]">
              {price ? `${price} ₽` : "0 ₽"}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 text-sm uppercase tracking-[0.28em] text-[#8fc9c5]">
          Все цены
        </div>

        {loading ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Загрузка цен...
          </div>
        ) : prices.length === 0 ? (
          <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-8 text-xl text-[#b9c7c2]">
            Пока нет ни одной цены
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {prices.map((price) => (
              <div
                key={price.id}
                className="rounded-[26px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">
                  Категория
                </div><div className="mt-3 text-2xl font-bold text-[#f2f1e9]">
                  {price.category}
                </div>

                <div className="mt-3 text-base leading-relaxed text-[#b9c7c2]">
                  {price.description}
                </div>

                <div className="mt-5 inline-flex rounded-[20px] border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.03)] px-5 py-3 text-2xl font-extrabold text-[#f3efe4]">
                  {price.price} ₽
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleDeletePrice(price.id)}
                    disabled={deletingId === price.id}
                    className="mt-5 rounded-2xl border border-[rgba(255,120,120,0.20)] bg-[rgba(255,80,80,0.08)] px-5 py-3 text-base font-semibold text-[#ffd6d6] transition hover:bg-[rgba(255,80,80,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === price.id ? "Удаление..." : "Удалить"}
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