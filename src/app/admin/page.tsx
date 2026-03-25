import Link from "next/link";

const cards = [
  {
    href: "/admin/banners",
    title: "Баннеры",
    subtitle: "Главный слайдер и фоновые изображения",
  },
  {
    href: "/admin/events",
    title: "Мероприятия",
    subtitle: "Афиши, события и даты проведения",
  },
  {
    href: "/admin/prices",
    title: "Цены",
    subtitle: "Категории билетов и стоимость",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">
          Панель управления
        </div>
        <h1 className="mt-3 text-5xl font-extrabold tracking-[-0.04em] text-[#f2f1e9]">
          Админка киоска
        </h1>
        <div className="mt-4 text-2xl text-[#b9c7c2]">
          Управление содержимым интерактивного терминала
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="relative overflow-hidden rounded-[28px] border border-[rgba(124,201,183,0.22)] bg-[linear-gradient(180deg,rgba(9,52,42,0.9),rgba(5,31,25,0.92))] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(21,154,156,0.10),transparent_34%)]" />
            <div className="relative">
              <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">
                Раздел
              </div>
              <div className="mt-4 text-4xl font-bold leading-tight text-[#f2f1e9]">
                {card.title}
              </div>
              <div className="mt-4 text-xl leading-relaxed text-[#b9c7c2]">
                {card.subtitle}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}