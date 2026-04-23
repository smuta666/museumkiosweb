type PdfViewerPageProps = {
  overline: string;
  title: string;
  description: string;
  pdfUrl: string;
};

export default function PdfViewerPage({
  overline,
  title,
  description,
  pdfUrl,
}: PdfViewerPageProps) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div className="text-sm uppercase tracking-[0.35em] text-[#8fc9c5]">
          {overline}
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-[#f2f1e9]">
          {title}
        </h1>

        <div className="text-xl text-[#b9c7c2]">
          {description}
        </div>
      </section>

      <section className="overflow-hidden rounded-[30px] border border-[#2c5a4d] bg-[#0c2a24]/95 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
        <iframe
          src={pdfUrl}
          className="h-[78vh] w-full bg-white"
          title={title}
        />
      </section>
    </div>
  );
}