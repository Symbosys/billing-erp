import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30 active:scale-[0.98]",
    secondary: "text-slate-600 border active:scale-[0.98]",
    danger:
      "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 active:scale-[0.98]",
    outline:
      "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-[0.98]",
    ghost: "bg-transparent active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-5 text-base",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2.5 font-bold rounded-2xl 
        transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      style={{
        backgroundColor:
          variant === "secondary"
            ? "var(--bg-main)"
            : variant === "ghost"
              ? "transparent"
              : undefined,
        borderColor:
          variant === "secondary" ? "var(--border-color)" : undefined,
        color:
          variant === "secondary"
            ? "var(--text-main)"
            : variant === "ghost"
              ? "var(--text-muted)"
              : undefined,
        ...props.style,
      }}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
