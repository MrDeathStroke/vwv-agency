// VWV "Velocity Field" V mark — striated field clipped to an asymmetric V.
// currentColor — drop into any context.

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

export function VMark({ size = 64, className, title = "VWV" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <clipPath id="vmark-mask">
          <path d="M 14 16 L 50 82 L 86 16 Z" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#vmark-mask)"
        stroke="currentColor"
        strokeLinecap="square"
      >
        <line x1="0" y1="24" x2="100" y2="24" strokeWidth="1.5" />
        <line x1="0" y1="33" x2="100" y2="33" strokeWidth="2" />
        <line x1="0" y1="42" x2="100" y2="42" strokeWidth="2.5" />
        <line x1="0" y1="51" x2="100" y2="51" strokeWidth="3" />
        <line x1="0" y1="60" x2="100" y2="60" strokeWidth="3.5" />
        <line x1="0" y1="69" x2="100" y2="69" strokeWidth="4" />
        <line x1="0" y1="78" x2="100" y2="78" strokeWidth="4" />
      </g>
    </svg>
  );
}
