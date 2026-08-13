import { cn } from "@/lib/utils/cn";

type DecorativeHeartIconProps = {
  className?: string;
  size?: number;
};

export function DecorativeHeartIcon({
  className,
  size = 10,
}: DecorativeHeartIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.8L10.84 19.75C5.24 14.67 2 11.73 2 8.12C2 5.18 4.3 3 7.15 3C8.76 3 10.31 3.77 11.28 4.98C11.66 5.45 12.34 5.45 12.72 4.98C13.69 3.77 15.24 3 16.85 3C19.7 3 22 5.18 22 8.12C22 11.73 18.76 14.67 13.16 19.75L12 20.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type DecorativeDividerProps = {
  className?: string;
  heartClassName?: string;
  heartSize?: number;
  leftLineClassName?: string;
  rightLineClassName?: string;
};

export function DecorativeDivider({
  className,
  heartClassName,
  heartSize = 10,
  leftLineClassName,
  rightLineClassName,
}: DecorativeDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className={cn("h-px w-16 bg-current/30", leftLineClassName)} />
      <DecorativeHeartIcon
        className={cn("text-current opacity-50", heartClassName)}
        size={heartSize}
      />
      <span className={cn("h-px w-16 bg-current/30", rightLineClassName)} />
    </div>
  );
}
