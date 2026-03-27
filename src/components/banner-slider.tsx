"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Banner = {
  id: string;
  title: string;
  imageUrl: string;
};

const SLIDE_INTERVAL_MS = 5000;

export function BannerSlider({ banners }: { banners: Banner[] }) {
  const validBanners = useMemo(
    () => banners.filter((banner) => banner.imageUrl),
    [banners]
  );

  const [index, setIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (validBanners.length <= 1 || isPreviewOpen) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % validBanners.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [validBanners.length, isPreviewOpen]);

  useEffect(() => {
    if (index >= validBanners.length) setIndex(0);
  }, [index, validBanners.length]);

  useEffect(() => {
    if (!isPreviewOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen]);

  if (validBanners.length === 0) {
    return (
      <div className="flex aspect-[16/6] items-center justify-center rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] text-3xl text-[#b9c7c2]">
        Нет активных новостей
      </div>
    );
  }

  const activeBanner = validBanners[index];

  return (
    <>
      <div className="overflow-hidden rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="block w-full text-left"
          aria-label={`Открыть баннер: ${activeBanner.title}`}
        >
          <div className="relative aspect-[16/6] w-full overflow-hidden bg-[#0c2a24]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeBanner.id}
                src={activeBanner.imageUrl}
                alt={activeBanner.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.65 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,23,0.88),rgba(12,42,36,0.52),rgba(7,26,23,0.72))]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,26,23,0.94),transparent_45%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeBanner.id}-title`}
                className="absolute bottom-0 left-0 right-0 p-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="max-w-5xl text-5xl font-bold leading-tight text-[#f2f1e9] drop-shadow-xl">
                  {activeBanner.title}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </button>

        {validBanners.length > 1 ? (
          <div className="flex items-center justify-center gap-3 px-4 py-5">
            {validBanners.map((banner, dotIndex) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setIndex(dotIndex)}
                className={`h-3 rounded-full transition-all ${
                  dotIndex === index
                    ? "w-12 bg-[#f2f1e9]"
                    : "w-3 bg-[#6f9f93]/35 hover:bg-[#8fc9c5]/70"
                }`}
                aria-label={`Перейти к баннеру ${dotIndex + 1}`}
              />
            ))}
          </div>
        ) : null}</div>

      <AnimatePresence>
        {isPreviewOpen ? (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => setIsPreviewOpen(false)}
              aria-label="Закрыть предпросмотр"
            />

            <motion.div
              className="relative z-[201] flex max-h-[92vh] w-full max-w-[1800px] items-center justify-center rounded-[28px] border border-[rgba(143,201,197,0.2)] bg-[rgba(8,24,21,0.96)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="absolute right-4 top-4 z-[202] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 text-3xl leading-none text-white transition hover:bg-black/65"
                aria-label="Закрыть"
              >
                ×
              </button>

              <img
                src={activeBanner.imageUrl}
                alt={activeBanner.title}
                className="max-h-[84vh] max-w-full rounded-[22px] object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}