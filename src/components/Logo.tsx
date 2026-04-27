export function Logo({ variant = "dark", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const color = variant === "light" ? "var(--ivory)" : "var(--primary)";
  return (
    <span
      className={`font-display text-2xl tracking-[0.18em] ${className}`}
      style={{ color }}
    >
      BIYOUU
    </span>
  );
}
