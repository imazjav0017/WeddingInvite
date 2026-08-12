"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryImage, CoupleDetails } from "@/lib/types/invitation";
import { cn } from "@/lib/utils/cn";

const toneClasses = {
  ivory: "bg-[#f3e7df]",
  sage: "bg-[#dde2d7]",
  gold: "bg-[#eadfce]",
};

type GalleryCarouselProps = {
  gallery: GalleryImage[];
  couple: CoupleDetails;
};

export function GalleryCarousel({ gallery, couple }: GalleryCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    dragging: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    dragging: false,
  });

  const goToIndex = (index: number) => {
    setActiveIndex((index + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (prefersReducedMotion || gallery.length < 2) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % gallery.length);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, gallery.length, prefersReducedMotion]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dragging: true,
    };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.dragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    setIsDragging(false);
    dragStateRef.current.dragging = false;
    dragStateRef.current.pointerId = null;

    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goToIndex(activeIndex + 1);
      return;
    }

    goToIndex(activeIndex - 1);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    dragStateRef.current.dragging = false;
    dragStateRef.current.pointerId = null;
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        aria-label={`${couple.displayNames} photo carousel`}
        className={cn(
          "relative h-64 w-full select-none overflow-hidden rounded-xl shadow-[0_22px_60px_rgba(96,56,68,0.18)] md:h-96",
          toneClasses[gallery[activeIndex]?.tone ?? "ivory"],
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            goToIndex(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            goToIndex(activeIndex + 1);
          }
        }}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        role="region"
        style={{ touchAction: "pan-y" }}
        tabIndex={0}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            key={gallery[activeIndex].id}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              alt={gallery[activeIndex].alt}
              className="pointer-events-none object-cover"
              draggable={false}
              fill
              loading={activeIndex === 0 ? "eager" : "lazy"}
              priority={activeIndex === 0}
              sizes="(max-width: 768px) calc(100vw - 48px), 48rem"
              src={gallery[activeIndex].src}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(48,26,34,0.2)] via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(255,250,244,0.18)] to-transparent" />

        <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between text-[10px] uppercase tracking-[0.28em] text-[rgba(255,244,237,0.86)]">
          <span>{couple.displayNames}</span>
          <span>{gallery[activeIndex].label}</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2">
          {gallery.map((image, index) => (
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-4 bg-[rgb(153,96,110)]"
                  : "bg-[rgba(255,243,236,0.42)]"
              }`}
              key={image.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
