import { prisma } from "@/lib/prisma";

export async function getBootstrapContent() {
  const [museum, banners, events, ticketPrices] = await Promise.all([
    prisma.museum.findFirst(),
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "asc" },
    }),
    prisma.ticketPrice.findMany({
      orderBy: [{ price: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  return {
    museum,
    banners,
    events,
    ticketPrices,
  };
}
