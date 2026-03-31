import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { Footer } from "../components/footer";
import ScrollToTop from "../components/ScrollToTop";
import KioskLock from "../components/KioskLock";

export const metadata: Metadata = {
  title: "Museum Kiosk Web",
  description: "Облачный музейный киоск и единый web-интерфейс",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <KioskLock />
        <div className="kiosk-shell flex min-h-screen flex-col">
          <ScrollToTop />
          <Header />

          <div className="kiosk-container flex-1 pt-[100px] pb-8">
            <main className="flex h-full flex-col">{children}</main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}