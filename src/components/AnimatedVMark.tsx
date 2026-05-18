import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";

/**
 * VWV "Velocity Field" V mark — motion-driven.
 *
 * Composition:
 *  - 7 horizontal stripes of increasing weight, clipped to an asymmetric V triangle.
 *  - Stripes draw in left → right with stagger on mount.
 *  - On hover, stripe weights ripple (1.5 → 4 cycle).
 *  - On scroll, the V mask itself shifts subtly (parallax wink).
 *  - Auto-replays the draw-in every interval seconds (default 6) for "alive" feel.
 *
 * Honors prefers-reduced-motion: collapses to a static mark.
 */

type Props = {
  size?: number;
  className?: string;
  title?: string;
  /** Auto-replay interval in seconds. 0 disables auto-replay. */
  interval?: number;
  /** Scroll-link to a target element. Pass a ref to that section. */
  scrollLink?: boolean;
  /** Whether to enable hover ripple interaction. */
  interactive?: boolean;
};

const STRIPES = [
  { y: 24, w: 1.5 },
  { y: 33, w: 2 },
  { y: 42, w: 2.5 },
  { y: 51, w: 3 },
  { y: 60, w: 3.5 },
  { y: 69, w: 4 },
  { y: 78, w: 4 },
];

const stripeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.9,
        delay: 0.06 * i,
        ease: [0.16, 1, 0.3, 1], // expo.out — brand ease
      },
      opacity: {
        duration: 0.3,
        delay: 0.06 * i,
      },
    },
  }),
  hover: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.4,
        delay: 0.04 * i,
        ease: [0.85, 0, 0.15, 1], // snap
        repeat: 1,
        repeatType: "reverse" as const,
      },
    },
  }),
};

export function AnimatedVMark({
  size = 96,
  className,
  title = "VWV",
  interval = 6,
  scrollLink = false,
  interactive = true,
}: Props) {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0);

  // Scroll-link: when the wrapper enters/leaves the viewport, the V mask
  // path subtly tilts via skew on the wrapping <g>.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  // Auto-replay
  useAutoReplay(interval, () => {
    if (reduced) return;
    setCycle((c) => c + 1);
  });

  const animate = reduced ? "visible" : hovered ? "hover" : "visible";

  return (
    <span
      ref={wrapperRef}
      className={`inline-flex ${className ?? ""}`}
      style={{ width: size, height: size }}
      onMouseEnter={interactive ? () => setHovered(true) : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
    >
    {/* Tightened square viewBox: V occupies x=14..86 (w=72), y=16..82 (h=66).
        Using a 72x72 box centered vertically removes whitespace so the mark
        fills its bounding box at any size. */}
    <motion.svg
      viewBox="14 13 72 72"
      width={size}
      height={size}
      role="img"
      aria-label={title}
    >
      <defs>
        <clipPath id={`vmark-mask-motion-${cycle}`}>
          <motion.path
            d="M 14 16 L 50 82 L 86 16 Z"
            style={
              scrollLink && !reduced
                ? { skewY: skew, y: translateY }
                : undefined
            }
          />
        </clipPath>
      </defs>
      <motion.g
        clipPath={`url(#vmark-mask-motion-${cycle})`}
        stroke="currentColor"
        strokeLinecap="square"
        initial="hidden"
        animate={animate}
        key={cycle}
      >
        {STRIPES.map((s, i) => (
          <motion.line
            key={`${cycle}-${i}`}
            x1="0"
            y1={s.y}
            x2="100"
            y2={s.y}
            strokeWidth={s.w}
            custom={i}
            variants={stripeVariants}
          />
        ))}
      </motion.g>

      {/* Subtle apex glow — only visible during hover */}
      <motion.circle
        cx="50"
        cy="20"
        r="1.5"
        fill="currentColor"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: hovered && !reduced ? 0.8 : 0,
          scale: hovered && !reduced ? 1 : 0.5,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
    </span>
  );
}

// Tiny interval hook — replays a callback every `seconds` seconds.
import { useEffect } from "react";
function useAutoReplay(seconds: number, cb: () => void) {
  useEffect(() => {
    if (!seconds) return;
    const id = window.setInterval(cb, seconds * 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);
}
