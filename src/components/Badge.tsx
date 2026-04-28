import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  dot,
  className = "",
  style,
  ...props
}) => {
  const variants = {
    success: { backgroundColor: "var(--badge-success-bg)", color: "var(--badge-success-text)", borderColor: "var(--badge-success-text)33" },
    warning: { backgroundColor: "var(--badge-warning-bg)", color: "var(--badge-warning-text)", borderColor: "var(--badge-warning-text)33" },
    danger: { backgroundColor: "var(--badge-danger-bg)", color: "var(--badge-danger-text)", borderColor: "var(--badge-danger-text)33" },
    info: { backgroundColor: "var(--badge-info-bg)", color: "var(--badge-info-text)", borderColor: "var(--badge-info-text)33" },
    neutral: { backgroundColor: "var(--badge-neutral-bg)", color: "var(--badge-neutral-text)", borderColor: "var(--badge-neutral-text)33" },
  };

  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-indigo-500",
    neutral: "bg-slate-400",
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full border
        text-[10px] font-black uppercase tracking-[0.1em]
        transition-all duration-300
        ${className}
      `}
      style={{ ...variants[variant], ...style }}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shadow-sm animate-pulse ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
