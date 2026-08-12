"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type ScratchRevealProps = {
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  prompt?: string;
  finishThreshold?: number;
  brushSize?: number;
};

const GRID_SIZE = 18;

export function ScratchReveal({
  children,
  className,
  overlayClassName,
  prompt = "Scratch to reveal",
  finishThreshold = 0.6,
  brushSize = 26,
}: ScratchRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [progress, setProgress] = useState(0);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const clearedCellsRef = useRef<Set<number>>(new Set());
  const totalCells = useMemo(() => GRID_SIZE * GRID_SIZE, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, rect.width, rect.height);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "rgba(246, 238, 226, 0.96)");
    gradient.addColorStop(0.5, "rgba(234, 217, 189, 0.93)");
    gradient.addColorStop(1, "rgba(219, 197, 160, 0.96)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.save();
    context.globalAlpha = 0.22;
    context.strokeStyle = "rgba(142, 107, 55, 0.55)";
    context.lineWidth = 1;

    for (let index = -rect.height; index < rect.width + rect.height; index += 18) {
      context.beginPath();
      context.moveTo(index, 0);
      context.lineTo(index - rect.height, rect.height);
      context.stroke();
    }

    context.restore();

    context.save();
    context.strokeStyle = "rgba(255, 255, 255, 0.45)";
    context.strokeRect(10, 10, rect.width - 20, rect.height - 20);
    context.restore();
  }, []);

  useEffect(() => {
    if (isComplete) {
      return;
    }

    resizeCanvas();

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, [isComplete, resizeCanvas]);

  const markProgress = useCallback(
    (x: number, y: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const stepX = rect.width / GRID_SIZE;
      const stepY = rect.height / GRID_SIZE;
      const radiusX = Math.max(1, Math.ceil(brushSize / stepX));
      const radiusY = Math.max(1, Math.ceil(brushSize / stepY));
      const centerColumn = Math.floor(x / stepX);
      const centerRow = Math.floor(y / stepY);

      for (let row = centerRow - radiusY; row <= centerRow + radiusY; row += 1) {
        for (
          let column = centerColumn - radiusX;
          column <= centerColumn + radiusX;
          column += 1
        ) {
          if (row < 0 || row >= GRID_SIZE || column < 0 || column >= GRID_SIZE) {
            continue;
          }

          const index = row * GRID_SIZE + column;
          clearedCellsRef.current.add(index);
        }
      }

      const nextProgress = clearedCellsRef.current.size / totalCells;
      setProgress(nextProgress);

      if (nextProgress >= finishThreshold) {
        setIsComplete(true);
        isPointerDownRef.current = false;
        setIsScratching(false);
      }
    },
    [brushSize, finishThreshold, totalCells],
  );

  const eraseAtPoint = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        return;
      }

      context.globalCompositeOperation = "destination-out";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = brushSize * 1.45;

      const previousPoint = lastPointRef.current;

      if (previousPoint) {
        context.beginPath();
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(x, y);
        context.stroke();
      }

      context.beginPath();
      context.arc(x, y, brushSize, 0, Math.PI * 2);
      context.fill();

      lastPointRef.current = { x, y };
      markProgress(x, y);
    },
    [brushSize, markProgress],
  );

  const getLocalPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (isComplete) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    isPointerDownRef.current = true;
    setIsScratching(true);

    const point = getLocalPoint(event);
    eraseAtPoint(point.x, point.y);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || isComplete) {
      return;
    }

    event.preventDefault();
    const point = getLocalPoint(event);
    eraseAtPoint(point.x, point.y);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current) {
      return;
    }

    event.preventDefault();
    isPointerDownRef.current = false;
    lastPointRef.current = null;
    setIsScratching(false);
  };

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} ref={wrapperRef}>
      {children}

      <motion.div
        animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
        aria-hidden={isComplete}
        className={cn(
          "pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-center",
          overlayClassName,
        )}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-full border border-[var(--gold-border)] bg-white/65 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--gold-deep)] shadow-[0_10px_24px_rgba(86,64,42,0.09)]">
          {isScratching ? `${Math.round(progress * 100)}% revealed` : prompt}
        </div>
      </motion.div>

      <motion.canvas
        animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
        className="absolute inset-0 z-10 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        ref={canvasRef}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
