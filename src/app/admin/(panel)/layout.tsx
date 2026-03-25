import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1700px] gap-8 px-6 py-8">
      <aside className="sticky top-8 h-fit w-[320px] rounded-[28px] border border-[rgba(124,201,183,0.22)] bg-[rgba(6,34,28,0.92)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">
          Admin
        </div>
        <div className="mt-3 text-3xl font-extrabold text-[#f2f1e9]">
          Museum Kiosk
        </div>

        <nav className="mt-8 flex flex-col gap-3">
          <Link href="/admin" className="rounded-2xl border border-[rgba(124,201,183,0.18)] px-4 py-4 text-xl text-[#e7ebe7]">
            Главная
          </Link>
          <Link href="/admin/banners" className="rounded-2xl border border-[rgba(124,201,183,0.18)] px-4 py-4 text-xl text-[#e7ebe7]">
            Баннеры
          </Link>
          <Link href="/admin/events" className="rounded-2xl border border-[rgba(124,201,183,0.18)] px-4 py-4 text-xl text-[#e7ebe7]">
            Мероприятия
          </Link>
          <Link href="/admin/prices" className="rounded-2xl border border-[rgba(124,201,183,0.18)] px-4 py-4 text-xl text-[#e7ebe7]">
            Цены
          </Link>
        </nav>

        <form
          action="/api/admin/logout"
          method="post"
          className="mt-8"
        >
          <button
            type="submit"
            className="w-full rounded-2xl border border-[rgba(255,120,120,0.20)] bg-[rgba(255,80,80,0.07)] px-4 py-4 text-xl font-semibold text-[#ffd6d6]"
          >
            Выйти
          </button>
        </form>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}