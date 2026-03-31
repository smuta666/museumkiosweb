

const expositions = [
  {
    title: "Парадные залы",
    description: "Исторические интерьеры главного корпуса дворца, сохранившие атмосферу XIX века.",
    image: "/static/expositions/paradnye-zaly.jpg",
  },
  {
    title: "Воронцовская кухня",
    description: "Пространство, знакомящее посетителей с бытом дворцовой кухни и хозяйственной частью комплекса.",
    image: "/static/expositions/kuhnya.jpg",
  },
  {
    title: "Квартира дворецкого",
    description: "Экспозиция, раскрывающая повседневную жизнь и организацию службы во дворце.",
    image: "/static/expositions/dvoreckiy.jpg",
  },
  {
    title: "Художественная галерея",
    description: "Произведения искусства и выставочные материалы, связанные с историей дворца и его эпохой.",
    image: "/static/expositions/gallery.jpg",
  },
  {
    title: "Выставочный зал",
    description: "Пространство для временных выставок, музейных проектов и тематических экспозиций.",
    image: "/static/expositions/exhibition-hall.jpg",
  },
];

export default function ExpositionsPage() {
  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Музейные пространства</div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">Экспозиции и выставки</h1>
          <div className="mt-3 text-xl text-[#b9c7c2]">Основные музейные экспозиции Воронцовского дворца</div>
        </div>
        <div className="rounded-2xl border border-[#3d6c5d] bg-[#0c2a24]/90 px-5 py-3 text-lg text-[#e8dcc7] shadow-lg">
          Разделов: {expositions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {expositions.map((item) => (
          <div
            key={item.title}
            className="flex h-full flex-col overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="flex h-[260px] items-center justify-center bg-[#071a17] p-4">
              <img src={item.image} alt={item.title} className="max-h-full max-w-full rounded-2xl object-contain" />
            </div>
            <div className="border-t border-[#2c5a4d] p-5">
              <div className="text-2xl font-bold leading-tight text-[#f2f1e9]">{item.title}</div>
              <div className="mt-4 text-lg leading-relaxed text-[#b9c7c2]">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
