"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        setError("Неверный логин или пароль");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Не удалось выполнить вход");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-10 pb-16">
      <div className="grid w-full max-w-[1320px] grid-cols-1 gap-8 xl:grid-cols-[1.1fr_520px]">
        <div className="hidden rounded-[34px] border border-[rgba(124,201,183,0.16)] bg-[linear-gradient(180deg,rgba(5,28,24,0.72),rgba(5,24,21,0.82))] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl xl:block">
          <div className="text-sm uppercase tracking-[0.38em] text-[#8fc9c5]">
            Панель управления
          </div>

          <h1 className="mt-6 max-w-3xl text-6xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f3efe4]">
            Админка
            <br />
            Museum Kiosk
          </h1>

          <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-[#c7d6d1]">
            Управляйте баннерами, мероприятиями, ценами и содержимым интерактивного терминала
            в едином интерфейсе.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-5">
            <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] p-6">
              <div className="text-sm uppercase tracking-[0.24em] text-[#8fc9c5]">
                Баннеры
              </div>
              <div className="mt-3 text-2xl font-bold text-[#f2f1e9]">
                Главный слайдер
              </div>
              <div className="mt-3 text-lg leading-relaxed text-[#b9c7c2]">
                Управление визуальными блоками и изображениями главной страницы.
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(124,201,183,0.14)] bg-[rgba(255,255,255,0.03)] p-6">
              <div className="text-sm uppercase tracking-[0.24em] text-[#8fc9c5]">
                Контент
              </div>
              <div className="mt-3 text-2xl font-bold text-[#f2f1e9]">
                Разделы сайта
              </div>
              <div className="mt-3 text-lg leading-relaxed text-[#b9c7c2]">
                Мероприятия, цены, часы работы, доступность и другие страницы.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-[rgba(124,201,183,0.18)] bg-[rgba(6,34,28,0.88)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-10">
          <div className="text-sm uppercase tracking-[0.38em] text-[#8fc9c5]">
            Авторизация
          </div>

          <h2 className="mt-4 text-5xl font-extrabold tracking-[-0.04em] text-[#f3efe4]">
            Вход в систему
          </h2>

          <p className="mt-4 text-xl leading-relaxed text-[#c5d2cc]">
            Введите логин и пароль администратора для доступа к панели управления.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.22em] text-[#8eb6ae]">
                Логин
              </label>
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}placeholder="Введите логин"
                className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-5 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.22em] text-[#8eb6ae]">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="h-14 w-full rounded-2xl border border-[rgba(124,201,183,0.18)] bg-[rgba(255,255,255,0.04)] px-5 text-lg text-white outline-none placeholder:text-[rgba(255,255,255,0.35)]"
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-[rgba(255,120,120,0.22)] bg-[rgba(255,80,80,0.08)] px-4 py-3 text-base text-[#ffd7d7]">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-[62px] rounded-[22px] border border-[rgba(132,220,204,0.28)] bg-[linear-gradient(180deg,rgba(49,163,139,0.98),rgba(28,118,100,0.98))] px-6 text-[22px] font-extrabold text-[#f4efe4] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>

          <div className="mt-8 rounded-[22px] border border-[rgba(124,201,183,0.12)] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-base leading-relaxed text-[#b9c7c2]">
            После входа вы сможете редактировать баннеры и управлять контентом терминала.
          </div>
        </div>
      </div>
    </div>
  );
}