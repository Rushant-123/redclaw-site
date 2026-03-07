"use client";

export function ClawMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-glow-pulse ${className}`}
    >
      {/* Three diagonal claw slashes */}
      <path
        d="M40 10 C45 50, 30 120, 55 250"
        stroke="#C41E3A"
        strokeWidth="12"
        strokeLinecap="round"
        className="animate-claw-slash"
      />
      <path
        d="M95 10 C100 60, 85 130, 100 250"
        stroke="#C41E3A"
        strokeWidth="14"
        strokeLinecap="round"
        className="animate-claw-slash-2"
      />
      <path
        d="M150 10 C155 55, 140 125, 155 250"
        stroke="#C41E3A"
        strokeWidth="11"
        strokeLinecap="round"
        className="animate-claw-slash-3"
      />
      {/* Glow layer */}
      <path
        d="M40 10 C45 50, 30 120, 55 250"
        stroke="#E8344F"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
        className="animate-claw-slash"
      />
      <path
        d="M95 10 C100 60, 85 130, 100 250"
        stroke="#E8344F"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.5"
        className="animate-claw-slash-2"
      />
      <path
        d="M150 10 C155 55, 140 125, 155 250"
        stroke="#E8344F"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
        className="animate-claw-slash-3"
      />
    </svg>
  );
}
