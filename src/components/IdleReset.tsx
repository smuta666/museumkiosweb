"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const IDLE_TIMEOUT = 3 * 60 * 1000;

export default function IdleReset() {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        if (pathname !== "/") {
          router.push("/");
        }
      }, IDLE_TIMEOUT);
    };

    const events = [
      "mousemove",
      "mousedown",
      "touchstart",
      "touchmove",
      "scroll",
      "keydown",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [pathname, router]);

  return null;
}