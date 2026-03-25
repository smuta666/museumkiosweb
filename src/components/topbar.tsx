import Link from "next/link";

export function Topbar() {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <Link
        href="/home"
        className="flex h-12 min-w-[120px] items-center justify-center rounded-2xl border border-[#3d6c5d] bg-[#0a221d] px-6 text-lg font-semibold text-[#f2f1e9] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:border-[#4fc3b3] hover:bg-[#12342d]"
      >
        Главная
      </Link>
      <Link
        href="/"
        className="flex h-12 min-w-[120px] items-center justify-center rounded-2xl border border-[#3d6c5d] bg-[#0a221d] px-6 text-lg font-semibold text-[#f2f1e9] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:border-[#4fc3b3] hover:bg-[#12342d]"
      >
        Назад
      </Link>
    </div>
  );
}
