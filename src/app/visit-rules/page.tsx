import PdfViewerPage from "@/components/PdfViewerPage";

export const dynamic = "force-dynamic";

export default function VisitRulesPage() {
  return (
    <PdfViewerPage
      overline="Документ"
      title="Правила посещения"
      description="Официальные правила посещения музейного комплекса."
      pdfUrl="/docs/visit-rules.pdf"
    />
  );
}