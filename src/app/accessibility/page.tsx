

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-6xl">

      <h1 className="mb-8 text-4xl font-bold text-[#f2f1e9]">Доступность для посетителей</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-[28px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.10),transparent_34%)]" />
          <h2 className="relative mb-4 text-2xl font-semibold text-[#f2f1e9]">Воронцовский дворец</h2>
          <ul className="relative space-y-2 text-lg text-[#b9c7c2]">
            <li>• Первый этаж частично доступен для посетителей на колясках</li>
            <li>• При входе оборудованы пандусы</li>
            <li>• Есть оборудованные туалеты</li>
            <li>• Второй этаж недоступен для маломобильных посетителей</li>
            <li>• Во дворе Хозяйственного корпуса установлен интерактивный экран</li>
            <li>• Для посетителей с нарушениями слуха доступны аудиогиды</li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.10),transparent_34%)]" />
          <h2 className="relative mb-4 text-2xl font-semibold text-[#f2f1e9]">Массандровский дворец</h2>
          <ul className="relative space-y-2 text-lg text-[#b9c7c2]">
            <li>• Экспозиции доступны для посетителей на колясках</li>
            <li>• Есть пандусы</li>
            <li>• Используется ступенькоход для подъёма на этажи</li>
            <li>• Есть оборудованные туалеты</li>
            <li>• Доступны аудиогиды с усилением звука</li>
          </ul>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[28px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.10),transparent_34%)]" />
        <h2 className="relative mb-4 text-2xl font-semibold text-[#f2f1e9]">Льготы</h2>
        <ul className="relative space-y-2 text-lg text-[#b9c7c2]">
          <li>• Бесплатный вход для инвалидов 1 и 2 группы</li>
          <li>• Бесплатный вход для сопровождающего</li>
          <li>• Экскурсионное обслуживание оплачивается отдельно</li>
          <li>• Необходимо предъявить подтверждающий документ</li>
        </ul>
      </div>
    </div>
  );
}
