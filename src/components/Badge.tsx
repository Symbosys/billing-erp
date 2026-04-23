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
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    danger: "bg-rose-50 text-rose-600 border-rose-100",
    info: "bg-indigo-50 text-indigo-600 border-indigo-100",
    neutral: "bg-slate-50 text-slate-500 border-slate-100",
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
        ${variants[variant]} ${className}
      `}
      style={style}
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
