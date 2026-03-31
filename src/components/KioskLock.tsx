"use client";

import { useEffect } from "react";

export default function KioskLock() {
  useEffect(() => {
    const preventContext = (e: Event) => e.preventDefault();
    const preventSelect = (e: Event) => e.preventDefault();

    const preventMultiTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGesture = (e: Event) => e.preventDefault();

    document.addEventListener("contextmenu", preventContext);
    document.addEventListener("selectstart", preventSelect);
    document.addEventListener("dragstart", preventSelect);

    document.addEventListener("touchstart", preventMultiTouchZoom, {
      passive: false,
    });

    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    return () => {
      document.removeEventListener("contextmenu", preventContext);
      document.removeEventListener("selectstart", preventSelect);
      document.removeEventListener("dragstart", preventSelect);

      document.removeEventListener("touchstart", preventMultiTouchZoom);

      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return null;
}