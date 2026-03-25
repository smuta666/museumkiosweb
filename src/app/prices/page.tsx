import { getBootstrapContent } from "@/lib/content";

export default async function PricesPage() {
  const data = await getBootstrapContent();

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Информация</div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">Цены на билеты</h1>
          <div className="mt-3 text-xl text-[#b9c7c2]">Актуальная стоимость посещения музея</div>
        </div>
        <div className="rounded-2xl border border-[#3d6c5d] bg-[#0c2a24]/90 px-5 py-3 text-lg text-[#e8dcc7] shadow-lg">
          Категорий: {data.ticketPrices.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {data.ticketPrices.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.10),transparent_34%)]" />
            <div className="relative flex items-center justify-between gap-6">
              <div className="max-w-[70%]">
                <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">Категория</div>
                <div className="mt-3 text-4xl font-bold leading-tight text-[#f2f1e9]">{item.category}</div>
                {item.description ? (
                  <div className="mt-4 text-xl leading-relaxed text-[#b9c7c2]">{item.description}</div>
                ) : null}
              </div>
              <div className="relative shrink-0 rounded-[28px] border border-[#4b7b6c] bg-[linear-gradient(180deg,#12342d,#0f2d27)] px-8 py-7 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                <div className="text-sm uppercase tracking-[0.22em] text-[#8fc9c5]">Стоимость</div>
                <div className="mt-3 text-5xl font-bold text-[#f2f1e9]">{item.price} ₽</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
