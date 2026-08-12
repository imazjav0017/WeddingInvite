"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type ScratchRevealRenderState = {
  isComplete: boolean;
};

type ScratchRevealProps = {
  children: ReactNode | ((state: ScratchRevealRenderState) => ReactNode);
  className?: string;
  canvasClassName?: string;
  overlayLabel?: string;
  finishThreshold?: number;
  brushRadius?: number;
};

const VIEW_BOX = 100;
const GRID_SIZE = 28;
const HEART_PATH_STRING =
  "M50,96 C50,96 6,70 6,36 C6,18 20,6 32,6 C42,6 48,14 50,24 C52,14 58,6 68,6 C80,6 94,18 94,36 C94,70 50,96 50,96 Z";
const HEART_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="white" d="${HEART_PATH_STRING}"/></svg>`,
)}")`;
const HEART_CLIP_ID = "royal-heart-clip";

function getHeartPathString() {
  return HEART_PATH_STRING;
}

function createHeartPath(width: number, height: number) {
  const path = new Path2D();
  const scaleX = width / VIEW_BOX;
  const scaleY = height / VIEW_BOX;

  path.moveTo(50 * scaleX, 96 * scaleY);
  path.bezierCurveTo(50 * scaleX, 96 * scaleY, 6 * scaleX, 70 * scaleY, 6 * scaleX, 36 * scaleY);
  path.bezierCurveTo(6 * scaleX, 18 * scaleY, 20 * scaleX, 6 * scaleY, 32 * scaleX, 6 * scaleY);
  path.bezierCurveTo(42 * scaleX, 6 * scaleY, 48 * scaleX, 14 * scaleY, 50 * scaleX, 24 * scaleY);
  path.bezierCurveTo(52 * scaleX, 14 * scaleY, 58 * scaleX, 6 * scaleY, 68 * scaleX, 6 * scaleY);
  path.bezierCurveTo(80 * scaleX, 6 * scaleY, 94 * scaleX, 18 * scaleY, 94 * scaleX, 36 * scaleY);
  path.bezierCurveTo(94 * scaleX, 70 * scaleY, 50 * scaleX, 96 * scaleY, 50 * scaleX, 96 * scaleY);
  path.closePath();

  return path;
}

function drawGlitterHeart(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const heartPath = createHeartPath(width, height);

  context.clearRect(0, 0, width, height);
  context.save();
  context.clip(heartPath);

  const baseGradient = context.createLinearGradient(0, 0, width, height);
  baseGradient.addColorStop(0, "#b87483");
  baseGradient.addColorStop(0.45, "#d4a0ab");
  baseGradient.addColorStop(1, "#8f5462");
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, width, height);

  const glowGradient = context.createRadialGradient(
    width * 0.38,
    height * 0.24,
    width * 0.04,
    width * 0.38,
    height * 0.24,
    width * 0.42,
  );
  glowGradient.addColorStop(0, "rgba(255, 243, 244, 0.95)");
  glowGradient.addColorStop(0.35, "rgba(255, 231, 235, 0.36)");
  glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = glowGradient;
  context.fillRect(0, 0, width, height);

  const shadowGradient = context.createLinearGradient(0, height * 0.2, width, height);
  shadowGradient.addColorStop(0, "rgba(126, 79, 91, 0.08)");
  shadowGradient.addColorStop(1, "rgba(68, 21, 34, 0.26)");
  context.fillStyle = shadowGradient;
  context.fillRect(0, 0, width, height);

  const areaScale = (width * height) / 90000;
  const smallGlitterCount = Math.floor(1200 * areaScale);
  const brightGlitterCount = Math.floor(240 * areaScale);

  for (let index = 0; index < smallGlitterCount; index += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    if (!context.isPointInPath(heartPath, x, y)) {
      continue;
    }

    const radius = Math.random() * 1.6 + 0.25;
    const alpha = Math.random() * 0.45 + 0.08;

    context.beginPath();
    context.fillStyle = `rgba(255, 248, 245, ${alpha})`;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  for (let index = 0; index < brightGlitterCount; index += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    if (!context.isPointInPath(heartPath, x, y)) {
      continue;
    }

    const radius = Math.random() * 2.4 + 0.9;
    const alpha = Math.random() * 0.55 + 0.25;

    context.save();
    context.shadowBlur = 10;
    context.shadowColor = `rgba(255,255,255,${alpha})`;
    context.beginPath();
    context.fillStyle = `rgba(255, 253, 248, ${alpha})`;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  context.restore();
}

export function ScratchReveal({
  children,
  className,
  canvasClassName,
  finishThreshold = 0.6,
  brushRadius = 22,
}: ScratchRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotionEnabled = Boolean(prefersReducedMotion);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isComplete, setIsComplete] = useState(reducedMotionEnabled);
  const [isCanvasAvailable, setIsCanvasAvailable] = useState(true);
  const [, setProgress] = useState(0);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const activeCellsRef = useRef<Set<number>>(new Set());
  const validCellsRef = useRef<number[]>([]);
  const pendingProgressFrameRef = useRef<number | null>(null);
  const progressValueRef = useRef(0);

  const scheduleProgressUpdate = useCallback(
    (nextProgress: number) => {
      progressValueRef.current = nextProgress;

      if (pendingProgressFrameRef.current !== null) {
        return;
      }

      pendingProgressFrameRef.current = window.requestAnimationFrame(() => {
        pendingProgressFrameRef.current = null;
        setProgress(progressValueRef.current);

        if (progressValueRef.current >= finishThreshold) {
          setIsComplete(true);
          isPointerDownRef.current = false;
        }
      });
    },
    [finishThreshold],
  );

  const buildCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;

    if (!canvas || !host) {
      return;
    }

    const rect = host.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");

    if (!context) {
      setIsCanvasAvailable(false);
      return;
    }

    setIsCanvasAvailable(true);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawGlitterHeart(context, rect.width, rect.height);

    const validCells: number[] = [];
    const heartPath = createHeartPath(rect.width, rect.height);

    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let column = 0; column < GRID_SIZE; column += 1) {
        const x = ((column + 0.5) / GRID_SIZE) * rect.width;
        const y = ((row + 0.5) / GRID_SIZE) * rect.height;

        if (context.isPointInPath(heartPath, x, y)) {
          validCells.push(row * GRID_SIZE + column);
        }
      }
    }

    validCellsRef.current = validCells;
  }, []);

  useEffect(() => {
    if (reducedMotionEnabled || isComplete) {
      return;
    }

    buildCanvas();

    const resizeObserver = new ResizeObserver(() => {
      buildCanvas();
    });

    if (hostRef.current) {
      resizeObserver.observe(hostRef.current);
    }

    return () => {
      resizeObserver.disconnect();

      if (pendingProgressFrameRef.current !== null) {
        window.cancelAnimationFrame(pendingProgressFrameRef.current);
      }
    };
  }, [buildCanvas, isComplete, reducedMotionEnabled]);

  const getLocalPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const markProgress = useCallback(
    (x: number, y: number, width: number, height: number) => {
      const stepX = width / GRID_SIZE;
      const stepY = height / GRID_SIZE;
      const radiusX = Math.max(1, Math.ceil((brushRadius * 1.3) / stepX));
      const radiusY = Math.max(1, Math.ceil((brushRadius * 1.3) / stepY));
      const centerColumn = Math.floor(x / stepX);
      const centerRow = Math.floor(y / stepY);
      const validCells = validCellsRef.current;
      const validCellSet = new Set(validCells);

      for (let row = centerRow - radiusY; row <= centerRow + radiusY; row += 1) {
        for (
          let column = centerColumn - radiusX;
          column <= centerColumn + radiusX;
          column += 1
        ) {
          const index = row * GRID_SIZE + column;

          if (validCellSet.has(index)) {
            activeCellsRef.current.add(index);
          }
        }
      }

      const totalScratchableCells = validCells.length || 1;
      const nextProgress = activeCellsRef.current.size / totalScratchableCells;
      scheduleProgressUpdate(nextProgress);
    },
    [brushRadius, scheduleProgressUpdate],
  );

  const erase = useCallback(
    (x: number, y: number, width: number, height: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        return;
      }

      context.globalCompositeOperation = "destination-out";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = brushRadius * 2;

      const previousPoint = lastPointRef.current;

      if (previousPoint) {
        context.beginPath();
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(x, y);
        context.stroke();
      }

      context.beginPath();
      context.arc(x, y, brushRadius, 0, Math.PI * 2);
      context.fill();

      lastPointRef.current = { x, y };
      markProgress(x, y, width, height);
    },
    [brushRadius, markProgress],
  );

  const pointIsInHeart = useCallback((x: number, y: number, width: number, height: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      return false;
    }

    return context.isPointInPath(createHeartPath(width, height), x, y);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (isComplete || !isCanvasAvailable) {
      return;
    }

    const point = getLocalPoint(event);

    if (!pointIsInHeart(point.x, point.y, point.width, point.height)) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    isPointerDownRef.current = true;
    erase(point.x, point.y, point.width, point.height);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || isComplete || !isCanvasAvailable) {
      return;
    }

    event.preventDefault();
    const point = getLocalPoint(event);
    erase(point.x, point.y, point.width, point.height);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current) {
      return;
    }

    event.preventDefault();
    isPointerDownRef.current = false;
    lastPointRef.current = null;
  };

  const revealWithoutCanvas = () => {
    setIsComplete(true);
  };

  const resolvedChildren =
    typeof children === "function" ? children({ isComplete }) : children;

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col items-center">
        <motion.h3
          className="mb-3 font-[var(--font-script)] text-4xl leading-none text-[rgb(139,35,55)] md:text-5xl"
          initial={reducedMotionEnabled ? false : { opacity: 0, y: 16 }}
          transition={{ duration: reducedMotionEnabled ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={reducedMotionEnabled ? undefined : { opacity: 1, y: 0 }}
        >
          Scratch to Reveal
        </motion.h3>

        <motion.div
          className="my-6 flex items-center justify-center gap-3 text-[rgb(201,138,152)]"
          initial={reducedMotionEnabled ? false : { opacity: 0, scaleX: 0.9 }}
          transition={{ duration: reducedMotionEnabled ? 0.01 : 0.45, delay: 0.08 }}
          viewport={{ once: true }}
          whileInView={reducedMotionEnabled ? undefined : { opacity: 1, scaleX: 1 }}
        >
          <span className="h-px w-16 bg-current/30" />
          <span className="text-[10px] opacity-50">{"\u2665"}</span>
          <span className="h-px w-16 bg-current/30" />
        </motion.div>

        <motion.div
          className="mt-1"
          initial={reducedMotionEnabled ? false : { opacity: 0, y: 22, scale: 0.97 }}
          transition={{ duration: reducedMotionEnabled ? 0.01 : 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={reducedMotionEnabled ? undefined : { opacity: 1, y: 0, scale: 1 }}
        >
          <div
            className="relative mx-auto h-[240px] w-[260px]"
          >
            <svg aria-hidden="true" className="absolute h-0 w-0 w-0">
              <defs>
                <clipPath clipPathUnits="objectBoundingBox" id={HEART_CLIP_ID}>
                  <path d="M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "transparent",
                clipPath: `url(#${HEART_CLIP_ID})`,
                filter: "drop-shadow(rgba(70, 20, 35, 0.3) 0px 10px 18px)",
              }}
            />

            <div
              className="absolute inset-0 overflow-hidden"
              ref={hostRef}
              style={{
                clipPath: `url(#${HEART_CLIP_ID})`,
                WebkitMaskImage: HEART_MASK_URL,
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskImage: HEART_MASK_URL,
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "100% 100%",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgb(249, 236, 238)",
                  backgroundImage: `
                    radial-gradient(
                      rgba(253, 247, 248, 0.9) 0%,
                      rgba(240, 219, 223, 0.5) 70%,
                      rgba(228, 200, 206, 0.6) 100%
                    ),
                    radial-gradient(
                      circle at 1px 1px,
                      rgba(99, 29, 43, 0.1) 1px,
                      transparent 1.5px
                    ),
                    repeating-linear-gradient(
                      45deg,
                      rgba(0, 0, 0, 0.04) 0px,
                      rgba(0, 0, 0, 0.04) 1px,
                      transparent 1px,
                      transparent 8px
                    ),
                    repeating-linear-gradient(
                      -45deg,
                      rgba(0, 0, 0, 0.03) 0px,
                      rgba(0, 0, 0, 0.03) 1px,
                      transparent 1px,
                      transparent 10px
                    )
                  `,
                  backgroundSize: "auto, 12px 12px, auto, auto",
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                {resolvedChildren}
              </div>

              {!reducedMotionEnabled && isCanvasAvailable && !isComplete ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.canvas
                    animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
                    className={cn("absolute inset-0 z-10 h-full w-full cursor-pointer touch-none", canvasClassName)}
                    onPointerCancel={handlePointerUp}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    ref={canvasRef}
                    style={{ touchAction: "none" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              ) : null}

              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "radial-gradient(rgba(0, 0, 0, 0) 78%, rgba(20, 8, 0, 0.55) 92%, rgba(10, 4, 0, 0.85) 100%)",
                  mixBlendMode: "multiply",
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background:
                    "radial-gradient(at 38% 22%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 32%)",
                }}
              />

            </div>

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              focusable="false"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d={getHeartPathString()}
                fill="none"
                opacity="0.7"
                stroke="hsl(348, 58%, 34%)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: isComplete ? 0.7 : 0 }}
              />
            </svg>
          </div>
        </motion.div>

        {!isCanvasAvailable ? (
          <button
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(196,141,155,0.45)] bg-white/70 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-[#8e5e69]"
            onClick={revealWithoutCanvas}
            type="button"
          >
            Reveal Date
          </button>
        ) : null}
      </div>
    </div>
  );
}
