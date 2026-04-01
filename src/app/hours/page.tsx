

const hours = [
  {
    title: "Экспозиции дворца",
    value: "09:00 — 18:00, суббота: 9:00 – 20:00",
    note: "01 апреля – 30 июня",
  },
  {
    title: "Кассы",
    value: "09:00 — 17:15, суббота: 9:00 – 19:15",
    note: "01 апреля – 30 июня",
  },
  {
    title: "Территория дворца",
    value: "06:00 — 22:00",
    note: "Прогулки по территории музейного комплекса",
  },
];

export default function HoursPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Посещение музея</div>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">Режим работы</h1>
        <div className="mt-3 text-xl text-[#b9c7c2]">Актуальная информация по часам работы музея и касс</div>
      </div>

      <div className="grid gap-6">
        {hours.map((item) => (
          <div
            key={item.title}
            className="relative overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.10),transparent_34%)]" />
            <div className="relative flex items-center justify-between gap-6">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">Раздел</div>
                <div className="mt-3 text-4xl font-bold leading-tight text-[#f2f1e9]">{item.title}</div>
                <div className="mt-4 text-xl text-[#b9c7c2]">{item.note}</div>
              </div>
              <div className="relative shrink-0 rounded-[28px] border border-[#4b7b6c] bg-[linear-gradient(180deg,#12342d,#0f2d27)] px-8 py-7 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                <div className="text-sm uppercase tracking-[0.22em] text-[#8fc9c5]">Время</div>
                <div className="mt-3 text-5xl font-bold text-[#f2f1e9]">{item.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
