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
      imageUrl: "../public/static/expositions/exhibition-hall.jpg",
    },
    {
      id: "2",
      title: "Воронцовская кухня",
      description: "Пространство, знакомящее с бытом дворцовой кухни.",
      fullDescription:
        "Экспозиция рассказывает о повседневной жизни дворцовой кухни и хозяйственной части комплекса. Посетители могут увидеть предметы быта, кухонную утварь и особенности организации работы службы дворца.",
      price: "400 ₽",
      imageUrl: "../public/static/expositions/kuhnya.jpg",
    },
    {
      id: "3",
      title: "Квартира дворецкого",
      description:
        "Экспозиция, раскрывающая повседневную жизнь и организацию службы во дворце.",
      fullDescription:
        "Экспозиция показывает, как была устроена служебная жизнь дворца, какие обязанности были у персонала и как выглядели жилые помещения служащих.",
      price: "350 ₽",
      imageUrl: "../public/static/expositions/dvoreckiy.jpg",
    },
    {
      id: "4",
      title: "ASD",
      description:
        "ASD",
      fullDescription:
        "ASD",
      price: "350 ₽",
      imageUrl: "../public/static/expositions/paradnye-zaly.jpg",
    },
    {
      id: "5",
      title: "ASD",
      description:
        "ASD",
      fullDescription:
        "ASD",
      price: "350 ₽",
      imageUrl: "../public/static/expositions/gallery.jpg",
    },
  ];

  return <ExpositionsClient items={expositions} />;
}