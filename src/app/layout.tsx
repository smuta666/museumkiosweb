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
      <body>
        <div className="kiosk-shell">
          <ScrollToTop />
          <Header />
          <div className="kiosk-container py-8">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}