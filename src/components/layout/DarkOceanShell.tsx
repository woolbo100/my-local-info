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
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1f3a_0%,#10213d_35%,#0f172a_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.16),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.1),transparent_24%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_22%,rgba(15,23,42,0)_48%,rgba(6,12,24,0.2)_78%,rgba(3,8,18,0.36)_100%)]" />
      <div className="absolute inset-x-0 top-[-10%] h-[38rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0)_62%)] opacity-80" />
      <div className="absolute inset-x-0 bottom-[-12rem] h-[30rem] bg-[radial-gradient(ellipse_at_bottom,rgba(8,15,30,0.34),rgba(8,15,30,0)_70%)]" />
      <div className={`relative z-10 mx-auto ${className}`}>{children}</div>
    </div>
  );
}
