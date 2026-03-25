"use client";

import { useEffect, useState } from "react";
import { QrModal } from "@/components/qr-modal";

export function Footer() {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    if (!qr) return;
    const timer = setTimeout(() => setQr(null), 15000);
    return () => clearTimeout(timer);
  }, [qr]);

  return (
    <footer className="border-t border-[#2c5a4d] bg-[#071a17]/95 px-8 py-6 backdrop-blur-xl lg:px-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <img src="/static/logo.svg" alt="Логотип музея" className="h-16 w-auto" />
          <div>
            <div className="text-lg font-semibold text-[#f2f1e9]">
              Алупкинский дворцово-парковый
            </div>
            <div className="text-lg text-[#b9c7c2]">музей-заповедник</div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <img
              src="/static/qr-review.svg"
              alt="Оценка услуг"
              className="h-28 w-28 rounded-lg border border-[#3d6c5d] bg-white p-2"
            />
            <div className="mt-2 text-sm text-[#b9c7c2]">Оценка услуг</div>
          </div>
          <div className="text-center">
            <img
              src="/static/qr-site.svg"
              alt="Сайт музея"
              className="h-28 w-28 rounded-lg border border-[#3d6c5d] bg-white p-2"
            />
            <div className="mt-2 text-sm text-[#b9c7c2]">Сайт музея</div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#2c5a4d] pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 text-[#b9c7c2]">
            <div>Телефон: +7 (3654) 722-951</div>
            <div>Email: direction@worontsovpalace.ru</div>
            <div>
              Адрес: 298676, Республика Крым, г. Ялта, г. Алупка, ул. Дворцовое шоссе, д. 18
            </div>
            <div>Режим работы: ежедневно 09:00 — 18:00</div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQr("/static/qr/qr-max.svg")}
              className="flex h-12 w-24 items-center justify-center rounded-xl border border-[#3d6c5d] bg-[#0c2a24] text-[#e8dcc7] transition hover:border-[#4fc3b3] hover:bg-[#12342d]"
            >
              MAX
            </button>
            <button
              onClick={() => setQr("/static/qr/qr-vk.svg")}
              className="flex h-12 w-24 items-center justify-center rounded-xl border border-[#3d6c5d] bg-[#0c2a24] text-[#e8dcc7] transition hover:border-[#4fc3b3] hover:bg-[#12342d]"
            >
              VK
            </button>
            <button
              onClick={() => setQr("/static/qr/qr-rutube.svg")}
              className="flex h-12 w-24 items-center justify-center rounded-xl border border-[#3d6c5d] bg-[#0c2a24] text-[#e8dcc7] transition hover:border-[#4fc3b3] hover:bg-[#12342d]"
            >
              RuTube
            </button>
          </div>
        </div>
      </div>

      <QrModal qr={qr} onClose={() => setQr(null)} />
    </footer>
  );
}
