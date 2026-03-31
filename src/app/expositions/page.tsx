"use client";

import { useEffect, useState } from "react";
import ExpositionModal from "@/components/expositions-modal";
import { getBootstrapContent } from "@/lib/content";

export default function ExpositionsPage() {
  const [data, setData] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const result = await getBootstrapContent();
      setData(result);
    }

    load();
  }, []);

  if (!data) {
    return (
      <div className="text-2xl text-white">
        Загрузка экспозиций...
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {data.expositions.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-[240px] w-full object-cover"
            />

            <div className="p-6">
              <div className="text-3xl font-bold text-[#f2f1e9]">
                {item.title}
              </div>

              <div className="mt-3 text-lg text-[#b9c7c2]">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <ExpositionModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}