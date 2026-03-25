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
  const validBanners = useMemo(() => banners.filter((banner) => banner.imageUrl), [banners]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (validBanners.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % validBanners.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [validBanners.length]);

  useEffect(() => {
    if (index >= validBanners.length) setIndex(0);
  }, [index, validBanners.length]);

  if (validBanners.length === 0) {
    return (
      <div className="flex aspect-[16/6] items-center justify-center rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] text-3xl text-[#b9c7c2]">
        Нет активных новостей
      </div>
    );
  }

  const activeBanner = validBanners[index];

  return (
    <div className="overflow-hidden rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
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

      {validBanners.length > 1 ? (
        <div className="flex items-center justify-center gap-3 px-4 py-5">
          {validBanners.map((banner, dotIndex) => (
            <button
              key={banner.id}
              onClick={() => setIndex(dotIndex)}
              className={`h-3 rounded-full transition-all ${
                dotIndex === index ? "w-12 bg-[#f2f1e9]" : "w-3 bg-[#6f9f93]/35 hover:bg-[#8fc9c5]/70"
              }`}
              aria-label={`Перейти к баннеру ${dotIndex + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
