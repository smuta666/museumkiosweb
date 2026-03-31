import ExpositionsClient from "@/components/expositions-client";

export const dynamic = "force-dynamic";

export default async function ExpositionsPage() {
  const expositions = [
    {
      id: "1",
      title: "Парадные залы",
      description: "Исторические интерьеры главного корпуса дворца.",
      fullDescription:
        "Исторические интерьеры главного корпуса дворца, сохранившие атмосферу XIX века. Экспозиция знакомит посетителей с оформлением парадных помещений, мебелью, декоративными элементами и атмосферой эпохи.",
      price: "500 ₽",
      imageUrl: "/uploads/174521141305-2026_04_17-MSR-Alupka.jpg",
    },
    {
      id: "2",
      title: "Воронцовская кухня",
      description: "Пространство, знакомящее с бытом дворцовой кухни.",
      fullDescription:
        "Экспозиция рассказывает о повседневной жизни дворцовой кухни и хозяйственной части комплекса. Посетители могут увидеть предметы быта, кухонную утварь и особенности организации работы службы дворца.",
      price: "400 ₽",
      imageUrl: "/uploads/17452118836256-2026_04_17-MSR-Alupka.jpg",
    },
    {
      id: "3",
      title: "Квартира дворецкого",
      description:
        "Экспозиция, раскрывающая повседневную жизнь и организацию службы во дворце.",
      fullDescription:
        "Экспозиция показывает, как была устроена служебная жизнь дворца, какие обязанности были у персонала и как выглядели жилые помещения служащих.",
      price: "350 ₽",
      imageUrl: "/uploads/1745217997012-waving-silk-flag-of-russia-illustration-ai-generative-free-photo.jpg",
    },
  ];

  return <ExpositionsClient items={expositions} />;
}