import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getBootstrapContent } from "@/lib/content";

export default async function EventsPage() {
  const data = await getBootstrapContent();

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Афиша</div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">Мероприятия</h1>
          <div className="mt-3 text-xl text-[#b9c7c2]">Актуальные экскурсии, выставки и события музея</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {data.events.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="h-[240px] w-full object-cover" />
            ) : (
              <div className="flex h-[240px] items-center justify-center bg-[#12342d] text-2xl text-[#b9c7c2]">
                Нет изображения
              </div>
            )}
            <div className="p-6">
              <div className="text-sm uppercase tracking-[0.25em] text-[#8fc9c5]">Событие</div>
              <div className="mt-3 text-3xl font-bold leading-tight text-[#f2f1e9]">{item.title}</div>
              {item.description ? (
                <div className="mt-4 text-lg leading-relaxed text-[#b9c7c2]">{item.description}</div>
              ) : null}
              <div className="mt-6 rounded-[24px] border border-[#4b7b6c] bg-[linear-gradient(180deg,#12342d,#0f2d27)] px-6 py-5 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                <div className="text-sm uppercase tracking-[0.22em] text-[#8fc9c5]">Дата и время</div>
                <div className="mt-3 text-2xl font-bold text-[#f2f1e9]">
                  {format(item.startDate, "dd.MM.yyyy HH:mm", { locale: ru })}
                </div>
                {item.endDate ? (
                  <div className="mt-2 text-base text-[#d9e3de]">
                    до {format(item.endDate, "dd.MM.yyyy HH:mm", { locale: ru })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
