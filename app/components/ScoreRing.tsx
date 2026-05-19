"use client";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  large?: boolean;
}

function scoreColour(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function ScoreRing({
  score,
  size = 96,
  strokeWidth = 8,
  label,
  sublabel,
  large = false,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const colour = scoreColour(score);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colour}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color: colour }}
        >
          <span className={large ? "text-3xl font-bold" : "text-lg font-bold"}>
            {score}
          </span>
          {large && <span className="text-sm text-gray-400 font-normal">/100</span>}
        </div>
      </div>
      {label && (
        <span className="text-xs font-semibold text-gray-600 text-center leading-tight">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-xs text-gray-400 text-center">{sublabel}</span>
      )}
    </div>
  );
}
