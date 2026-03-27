import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { Footer } from "../components/footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Museum Kiosk Web",
  description: "Облачный музейный киоск и единый web-интерфейс",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <div className="kiosk-shell flex min-h-screen flex-col">
          <ScrollToTop />
          <Header />

          <div className="kiosk-container flex-1 py-8">
            <main className="flex h-full flex-col">{children}</main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}