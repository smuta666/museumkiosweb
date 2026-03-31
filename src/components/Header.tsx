"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

function formatDate(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [now, setNow] = useState(new Date());
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const time = useMemo(
    () =>
      now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [now]
  );

  return (
    <header
      ref={headerRef}
      className="kiosk-header kiosk-divider fixed left-0 right-0 top-0 z-30 bg-[rgba(3,20,17,0.94)] backdrop-blur-xl"
    >
      <div className="kiosk-container flex items-center justify-between gap-8 py-6">
        <div>
          <div className="kiosk-title-overline">Алупкинский музей-заповедник</div>
          <div className="mt-2 text-[42px] font-extrabold leading-none tracking-[-0.03em] text-[var(--text-main)]">
            Интерактивный терминал
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="kiosk-stat-card text-right">
            <div className="kiosk-title-overline">Текущее время</div>
            <div className="mt-3 text-[58px] font-extrabold leading-none text-[var(--text-main)]">
              {time}
            </div>
            <div className="mt-3 text-[22px] text-[var(--text-soft)] capitalize">
              {formatDate(now)}
            </div>
          </div>

          <div className="ml-6 flex flex-col items-end gap-3">
            {pathname !== "/" && (
              <Link href="/" className="kiosk-button min-w-[160px] text-[22px]">
                Главная
              </Link>
            )}

            <button
              onClick={() => router.back()}
              className="kiosk-button min-w-[160px] text-[22px]"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}