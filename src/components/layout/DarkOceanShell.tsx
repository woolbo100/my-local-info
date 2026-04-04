import React from "react";

interface DarkOceanShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function DarkOceanShell({
  children,
  className = "",
}: DarkOceanShellProps) {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1f3a_0%,#0f172a_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(96,165,250,0.12),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(180deg,rgba(14,25,48,0)_0%,rgba(9,19,37,0.3)_45%,rgba(7,15,28,0.55)_100%)]" />
      <div
        className={`relative z-10 mx-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
