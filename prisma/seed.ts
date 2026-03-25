import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.banner.deleteMany();
  await prisma.event.deleteMany();
  await prisma.ticketPrice.deleteMany();
  await prisma.terminal.deleteMany();
  await prisma.museum.deleteMany();

  const museum = await prisma.museum.create({
    data: {
      slug: "vorontsov-palace",
      name: "Алупкинский дворцово-парковый музей-заповедник",
      description:
        "Современная цифровая витрина музея для посетителей: афиши, цены, история, доступность и Пушкинская карта.",
      address:
        "298676, Республика Крым, г. Ялта, г. Алупка, ул. Дворцовое шоссе, д. 18",
      phone: "+7 (3654) 722-951",
      email: "direction@worontsovpalace.ru",
    },
  });

  await prisma.terminal.create({
    data: {
      deviceCode: "terminal-main-01",
      apiKey: "demo-terminal-key",
      name: "Главный терминал",
    },
  });

  await prisma.banner.createMany({
    data: [
      {
        museumId: museum.id,
        title: "Воронцовский дворец — интерактивный цифровой киоск",
        imageUrl: "/static/park/park-main.jpg",
      },
      {
        museumId: museum.id,
        title: "Актуальные мероприятия, цены и навигация для посетителей",
        imageUrl: "/static/expositions/paradnye-zaly.svg",
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        museumId: museum.id,
        title: "Тематическая экскурсия по парадным залам",
        description:
          "Обзорная программа по главным интерьерам дворца с рассказом об истории семьи Воронцовых.",
        imageUrl: "/static/expositions/paradnye-zaly.svg",
        startDate: new Date("2026-04-01T11:00:00.000Z"),
        endDate: new Date("2026-04-01T12:30:00.000Z"),
      },
      {
        museumId: museum.id,
        title: "Прогулка по Алупкинскому парку",
        description:
          "Маршрут по историческим террасам, видовым площадкам и главным парковым объектам.",
        imageUrl: "/static/park/park-2.svg",
        startDate: new Date("2026-04-02T13:00:00.000Z"),
        endDate: new Date("2026-04-02T14:00:00.000Z"),
      },
      {
        museumId: museum.id,
        title: "Временная выставка в выставочном зале",
        description:
          "Выставочный проект о культурной жизни дворца и музейных коллекциях XIX–XX веков.",
        imageUrl: "/static/expositions/exhibition-hall.svg",
        startDate: new Date("2026-04-03T10:00:00.000Z"),
        endDate: new Date("2026-04-03T18:00:00.000Z"),
      },
    ],
  });

  await prisma.ticketPrice.createMany({
    data: [
      {
        museumId: museum.id,
        category: "Взрослый билет",
        description: "Основная категория посещения музейных экспозиций.",
        price: 500,
      },
      {
        museumId: museum.id,
        category: "Льготный билет",
        description: "Для отдельных категорий посетителей при наличии подтверждающих документов.",
        price: 300,
      },
      {
        museumId: museum.id,
        category: "Детский билет",
        description: "Посещение для школьников и детей в сопровождении взрослых.",
        price: 200,
      },
      {
        museumId: museum.id,
        category: "Экскурсионное обслуживание",
        description: "Дополнительная стоимость экскурсионной программы.",
        price: 700,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
