type Props = {
  overline: string;
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageIntro({ overline, title, subtitle, badge }: Props) {
  return (
    <div className="mb-10 flex items-start justify-between gap-8">
      <div>
        <div className="kiosk-title-overline">{overline}</div>
        <h1 className="mt-3 kiosk-title-xl">{title}</h1>
        {subtitle ? <div className="mt-3 kiosk-subtitle">{subtitle}</div> : null}
      </div>

      {badge ? <div className="kiosk-chip shrink-0 text-[20px]">{badge}</div> : null}
    </div>
  );
}