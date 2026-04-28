import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  containerClassName = "",
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col gap-2.5 w-full ${containerClassName}`}>
      {label && (
        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center group">
        {leftIcon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          className={`
            w-full rounded-2xl py-4 
            text-[15px] font-medium placeholder:text-slate-400
            focus:outline-none focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5
            transition-all duration-300 shadow-sm
            ${leftIcon ? "pl-14" : "pl-6"} 
            ${(rightIcon || isPassword) ? "pr-14" : type === "number" ? "pr-12" : "pr-6"} 
            ${error ? "border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/5" : ""}
            ${className}
          `}
          style={{
            backgroundColor: "var(--input-bg)",
            border: "2px solid var(--border-color)",
            color: "var(--text-main)",
            ...props.style
          }}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors duration-300 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
              {rightIcon}
            </div>
          )
        )}
      </div>

      {error && (
        <span className="text-[11px] font-bold text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
