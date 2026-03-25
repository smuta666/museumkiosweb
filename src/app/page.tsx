"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomePage() {
  const images = [
    "/static/park/park1.jpg",
    "/static/park/park2.jpg",
    "/static/park/park3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[rgba(124,201,183,0.22)] bg-[#0b2620] shadow-[0_25px_60px_rgba(0,0,0,0.34)]">
      <div className="relative min-h-[70vh] overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ease-in-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,24,20,0.86),rgba(7,33,28,0.48),rgba(5,24,20,0.66))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,18,15,0.94),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(95,214,193,0.11),transparent_24%)]" />

        <div className="relative flex min-h-[70vh] flex-col justify-between p-10 lg:p-14">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-sm uppercase tracking-[0.38em] text-[#9ed5cd]">
              Алупкинский музей-заповедник
            </div>

            <h1 className="mt-6 max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f3efe4] lg:text-[78px]">
              Добро пожаловать
              <br />
              в Воронцовский дворец
            </h1>

            <p className="mt-8 max-w-3xl text-[28px] leading-[1.45] text-[#dbe3dd]">
              Откройте афишу мероприятий, узнайте стоимость билетов
              и получите актуальную информацию о музее в интерактивном формате.
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <Link
                href="/home"
                className="group relative inline-flex h-[74px] w-fit items-center justify-center rounded-[24px] border border-[rgba(132,220,204,0.28)] bg-[linear-gradient(180deg,rgba(49,163,139,0.98),rgba(28,118,100,0.98))] px-10 text-[28px] font-extrabold text-[#f4efe4] shadow-[0_14px_34px_rgba(0,0,0,0.22),0_0_24px_rgba(65,190,165,0.14),inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-[1px] hover:border-[rgba(157,234,219,0.42)] hover:bg-[linear-gradient(180deg,rgba(58,172,147,0.98),rgba(31,125,106,0.98))] hover:shadow-[0_18px_42px_rgba(0,0,0,0.24),0_0_30px_rgba(82,220,190,0.18),inset_0_1px_0_rgba(255,255,255,0.14)] active:translate-y-0"
              >
                <span className="relative z-10">Перейти</span>
                <span className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_38%)] opacity-90" />
              </Link>

              <div className="text-[22px] font-medium text-[rgba(243,239,228,0.9)]">
                Нажмите, чтобы открыть интерактивный терминал
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`transition-all duration-500 ${i === index
                      ? "h-[12px] w-[40px] rounded-full bg-[#f3efe4]"
                      : "h-[10px] w-[10px] rounded-full bg-[rgba(255,255,255,0.28)]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}