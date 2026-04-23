import PdfViewerPage from "@/components/PdfViewerPage";

export const dynamic = "force-dynamic";

export default function MuseumPricePage() {
  return (
    <PdfViewerPage
      overline="Документ"
      title="Стоимость посещения"
      description="Актуальная стоимость билетов и посещения."
      pdfUrl="/docs/museum-price.pdf"
    />
  );
}