

export default function PushkinCardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="mb-3 text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">Информация для посетителей</div>
        <h1 className="text-5xl font-bold text-[#f2f1e9]">Пушкинская карта</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
          <h2 className="mb-5 text-2xl font-semibold text-[#f2f1e9]">Посещение по Пушкинской карте</h2>
          <div className="space-y-4 text-xl leading-9 text-[#b9c7c2]">
            <p>
              Приобретайте билеты в музей по программе «Пушкинская карта» и посещайте культурные
              события с удобной оплатой через специальный сервис.
            </p>
            <p>
              Отсканируйте QR-код, чтобы быстро перейти к оформлению билета или получить подробную
              информацию о посещении по Пушкинской карте.
            </p>
            <p>Перед покупкой убедитесь, что выбранное событие участвует в программе.</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
          <div className="mb-5 text-center text-sm uppercase tracking-[0.3em] text-[#8fc9c5]">Сканируйте QR-код</div>
          <img
            src="/static/qr/pushkin-card-qr.png"
            alt="QR-код Пушкинская карта"
            className="h-72 w-72 rounded-2xl border border-[#3d6c5d] bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          />
          <div className="mt-5 text-center text-lg text-[#b9c7c2]">Наведите камеру телефона</div>
        </div>
      </div>
    </div>
  );
}
