"use client";

import { useState } from "react";
import ExpositionsModal from "@/components/expositions-modal";

type ExpositionItem = {
  id: string;
  title: string;
  description?: string | null;
  fullDescription?: string | null;
  price?: string | number | null;
  imageUrl?: string | null;
};

export default function ExpositionsClient({
  items,
}: {
  items: ExpositionItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<ExpositionItem | null>(null);

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">
            Экспозиции
          </div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[#f2f1e9]">
            Экспозиции и выставки
          </h1>
          <div className="mt-3 text-xl text-[#b9c7c2]">
            Постоянные музейные пространства и тематические выставки
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 text-2xl text-[#b9c7c2]">
          Пока нет ни одной экспозиции
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:border-[#67d2c0]/50 hover:bg-[#10342d]"
            >
              {item.imageUrl ? (
                <div className="flex h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#12342d] to-[#0c2a24] p-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-h-full max-w-full rounded-[18px] object-contain shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  />
                </div>
              ) : (
                <div className="flex h-[260px] items-center justify-center bg-[#12342d] text-2xl text-[#b9c7c2]">
                  Нет изображения
                </div>
              )}

              <div className="p-6">
                <div className="text-3xl font-bold text-[#f2f1e9]">
                  {item.title}
                </div>

                {item.description ? (
                  <div className="mt-3 text-lg text-[#b9c7c2]">
                    {item.description}
                  </div>
                ) : null}

                <div className="mt-5 text-base font-semibold text-[#8fc9c5]">
                  Нажмите для подробностей
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedItem ? (
        <ExpositionsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
    </>
  );
}