"use client";

import { AnimatePresence, motion } from "framer-motion";

export function QrModal({
  qr,
  onClose,
}: {
  qr: string | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {qr ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04110e]/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-[32px] border border-[#2c5a4d] bg-[#0c2a24]/95 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,195,179,0.12),transparent_40%)]" />
            <img
              src={qr}
              alt="QR код"
              className="relative h-72 w-72 rounded-xl bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
            />
            <div className="relative mt-6 text-center text-2xl font-semibold text-[#f2f1e9]">
              Отсканируйте QR-код
            </div>
            <div className="relative mt-2 text-center text-base text-[#b9c7c2]">
              Окно закроется автоматически
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
