

const parkFacts = [
  {
    title: "История создания",
    text: "Алупкинский парк создавался как часть дворцового ансамбля и стал важной частью архитектурного и природного образа музея.",
  },
  {
    title: "Ландшафт",
    text: "Парк сочетает природный рельеф, скальные формы, аллеи, пруды и декоративные композиции, создавая уникальное пространство для прогулок.",
  },
  {
    title: "Растительный мир",
    text: "В парке представлены многочисленные декоративные и экзотические растения, формирующие богатую ботаническую среду.",
  },
  {
    title: "Маршруты",
    text: "Прогулочные маршруты парка позволяют познакомиться с панорамными точками, террасами, водоёмами и архитектурными видами дворца.",
  },
];

export default function ParkHistoryPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Алупкинский парк</div>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">История парка</h1>
        <div className="mt-3 text-xl text-[#b9c7c2]">
          Краткая информация об одном из главных природных пространств музейного комплекса
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24]/95 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <div className="flex gap-6 overflow-x-auto bg-[#071a17] p-6">
          {['/static/park/park-main.svg', '/static/park/park-2.svg', '/static/park/park-3.svg'].map((src) => (
            <img key={src} src={src} alt="Алупкинский парк" className="h-[320px] rounded-[24px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.3)]" />
          ))}
        </div>
        <div className="border-t border-[#2c5a4d] p-8">
          <div className="text-2xl leading-relaxed text-[#b9c7c2]">
            Алупкинский парк — важная часть ансамбля Воронцовского дворца, соединяющая архитектуру,
            природный ландшафт и прогулочную среду для посетителей музея.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {parkFacts.map((item) => (
          <div
            key={item.title}
            className="rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">Раздел</div>
            <div className="mt-3 text-3xl font-bold text-[#f2f1e9]">{item.title}</div>
            <div className="mt-4 text-xl leading-relaxed text-[#b9c7c2]">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
