import { BannerSlider } from "@/components/banner-slider";
import { SectionCard } from "@/components/section-card";
import { getBootstrapContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getBootstrapContent();

  const mainCards = [
    {
      href: "/events",
      title: "Мероприятия",
      subtitle: "Афиши, экскурсии и музейные события",
      caption: "Раздел",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/expositions",
      title: "Экспозиции\nи выставки",
      subtitle: "Постоянные музейные пространства",
      caption: "Раздел",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/prices",
      title: "Стоимость билетов",
      subtitle: "Билеты и категории посещения",
      caption: "Цены",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/hours",
      title: "Режим работы",
      subtitle: "Часы посещения и работа касс",
      caption: "Информация",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/park-history",
      title: "История парка",
      subtitle: "Алупкинский парк и прогулочные маршруты",
      caption: "Раздел",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/accessibility",
      title: "Доступность",
      subtitle: "Условия посещения и льготы",
      caption: "Раздел",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
    {
      href: "/pushkin-card",
      title: "Пушкинская карта",
      subtitle: "Информация и быстрый переход по QR-коду",
      caption: "Раздел",
      gradient:
        "bg-[linear-gradient(135deg,rgba(33,102,92,0.96),rgba(49,133,120,0.92))]",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div className="text-sm uppercase tracking-[0.35em] text-[#98d7cf]">
          Цифровой музейный киоск
        </div>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f3efe4] md:text-6xl xl:text-[76px]">
          {data.museum?.name ?? "Алупкинский дворцово-парковый музей-заповедник"}
        </h1>

        <p className="max-w-4xl text-xl leading-relaxed text-[#c8d6d1] md:text-2xl">
          Новости, события и актуальная информация для посетителей
        </p>
      </section>

      <section>
        <BannerSlider banners={data.banners} />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {mainCards.map((card) => (
          <SectionCard key={card.href} {...card} />
        ))}
      </section>
    </div>
  );
}