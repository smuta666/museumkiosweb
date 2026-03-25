"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/banners", label: "Баннеры" },
    { href: "/admin/events", label: "Мероприятия" },
    { href: "/admin/prices", label: "Цены" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1700px] gap-10 px-8 py-10">
      {/* SIDEBAR */}
      <aside className="sticky top-8 h-fit w-[320px] rounded-[30px] border border-[rgba(124,201,183,0.18)] bg-[rgba(5,28,24,0.85)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        
        {/* HEADER */}
        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-[#8fc9c5]/80">
            Панель
          </div>
          <div className="mt-3 text-[28px] font-extrabold text-[#f3efe4]">
            Admin Panel
          </div>
        </div>

        {/* NAV */}
        <nav className="mt-8 flex flex-col gap-3">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[linear-gradient(180deg,rgba(52,168,144,0.9),rgba(26,110,92,0.9))] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    : "text-[#d6e2dc] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                }`}
              >
                {item.label}

                {/* glow */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_40%)] opacity-0 transition group-hover:opacity-100" />
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-6">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-2xl border border-[rgba(255,120,120,0.25)] bg-[linear-gradient(180deg,rgba(255,80,80,0.18),rgba(255,60,60,0.12))] px-4 py-4 text-lg font-semibold text-[#ffd6d6] transition hover:bg-[rgba(255,80,80,0.25)] hover:shadow-[0_10px_25px_rgba(255,80,80,0.2)]"
            >
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="min-w-0 flex-1">
        <div className="rounded-[30px] border border-[rgba(124,201,183,0.18)] bg-[rgba(5,28,24,0.65)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          {children}
        </div>
      </main>
    </div>
  );
}