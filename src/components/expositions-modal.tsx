"use client";

type ExpositionItem = {
  id: string;
  title: string;
  description?: string | null;
  fullDescription?: string | null;
  price?: string | number | null;
  imageUrl?: string | null;
};

export default function ExpositionsModal({
  item,
  onClose,
}: {
  item: ExpositionItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1100px] overflow-hidden rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[2] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-3xl text-white"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr]">
          <div className="flex min-h-[380px] items-center justify-center bg-gradient-to-br from-[#12342d] to-[#0c2a24] p-6">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="max-h-[520px] max-w-full rounded-[24px] object-contain"
              />
            ) : (
              <div className="text-2xl text-[#b9c7c2]">Нет изображения</div>
            )}
          </div>

          <div className="p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-[#8fc9c5]">
              Экспозиция
            </div>

            <h2 className="mt-4 text-4xl font-extrabold text-[#f2f1e9]">
              {item.title}
            </h2>

            <div className="mt-6 text-xl leading-relaxed text-[#c8d6d1]">
              {item.fullDescription || item.description || "Описание появится позже"}
            </div>

            <div className="mt-8 rounded-[24px] border border-[#4b7b6c] bg-[linear-gradient(180deg,#12342d,#0f2d27)] px-6 py-5">
              <div className="text-sm uppercase tracking-[0.22em] text-[#8fc9c5]">
                Стоимость
              </div>
              <div className="mt-3 text-3xl font-bold text-[#f2f1e9]">
                {item.price ? String(item.price) : "Уточняйте в кассе"}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="kiosk-button mt-8 min-w-[180px] text-[20px]"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}