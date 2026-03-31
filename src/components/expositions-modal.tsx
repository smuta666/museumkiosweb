"use client";

type Props = {
  item: {
    title: string;
    fullDescription?: string;
    price?: string;
    imageUrl?: string;
  };
  onClose: () => void;
};

export default function ExpositionModal({ item, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-[420px] w-full object-cover"
          />
        )}

        <div className="p-8">
          <div className="text-4xl font-bold text-[#f2f1e9]">
            {item.title}
          </div>

          <div className="mt-4 text-xl leading-relaxed text-[#b9c7c2]">
            {item.fullDescription}
          </div>

          {item.price && (
            <div className="mt-6 text-3xl font-bold text-[#8fc9c5]">
              Стоимость: {item.price}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-8 rounded-[18px] border border-[#4b7b6c] px-8 py-4 text-xl font-bold text-white"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}