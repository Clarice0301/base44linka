import React from "react";
import { ICONS, ACCENT_BG, ACCENT_INK } from "@/lib/linka/data";

export function IconBox({ icon, accent = "blue", size = 44 }) {
  const Icon = ICONS[icon] || ICONS.code;
  return (
    <span
      className="grid shrink-0 place-items-center"
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: ACCENT_BG[accent] || ACCENT_BG.blue,
        color: ACCENT_INK[accent] || "#FFFFFF",
      }}
    >
      <Icon size={22} strokeWidth={1.8} />
    </span>
  );
}

export function Chip({ children, tone = "blue", className = "" }) {
  const tones = {
    blue: "lk-chip",
    teal: "lk-chip lk-chip-teal",
    sun: "lk-chip lk-chip-sun",
  };
  return <span className={`${tones[tone] || tones.blue} ${className}`}>{children}</span>;
}

export function ProgressBar({ value }) {
  return (
    <div className="lk-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function ScreenTitle({ title, subtitle }) {
  return (
    <header className="mb-4">
      <h1 className="lk-h1">{title}</h1>
      {subtitle ? <p className="lk-sub">{subtitle}</p> : null}
    </header>
  );
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="lk-empty">
      {Icon ? (
        <span
          className="grid place-items-center"
          style={{ width: 52, height: 52, borderRadius: 18, background: "var(--tint-blue)", color: "var(--ink-2)" }}
        >
          <Icon size={24} strokeWidth={1.8} />
        </span>
      ) : null}
      <strong style={{ fontSize: 15, color: "var(--ink)" }}>{title}</strong>
      {text ? <p>{text}</p> : null}
      {action || null}
    </div>
  );
}