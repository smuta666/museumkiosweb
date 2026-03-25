import Link from "next/link";

type SectionCardProps = {
  href: string;
  title: string;
  subtitle: string;
  caption: string;
  gradient?: string;
};

export function SectionCard({
  href,
  title,
  subtitle,
  caption,
  gradient,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      scroll
      className={`group relative block min-h-[220px] overflow-hidden rounded-[28px] border border-[rgba(142,214,198,0.22)] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-1 hover:border-[rgba(175,245,230,0.34)] ${
        gradient ?? "bg-[linear-gradient(135deg,rgba(34,87,79,0.96),rgba(53,121,109,0.92))]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08))]" />

      <div className="relative flex h-full flex-col">
        <div className="text-sm uppercase tracking-[0.32em] text-[rgba(233,244,240,0.78)]">
          {caption}
        </div>

        <div className="mt-8 whitespace-pre-line text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#f5f0e6]">
          {title}
        </div>

        <div className="mt-auto pt-6 text-[22px] leading-snug text-[rgba(239,245,241,0.84)]">
          {subtitle}
        </div>
      </div>
    </Link>
  );
}