import PdfViewerPage from "@/components/PdfViewerPage";

export const dynamic = "force-dynamic";

export default function PhotoVideoPage() {
  return (
    <PdfViewerPage
      overline="Документ"
      title="Фото и видеосъемка"
      description="Порядок рассмотрения фото- и видеосъемки на территории музея."
      pdfUrl="/docs/photo-video.pdf"
    />
  );
}