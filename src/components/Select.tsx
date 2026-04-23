import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  error,
  className = "",
  style,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      className={`flex flex-col gap-2.5 w-full relative ${className}`} 
      ref={containerRef}
      style={style}
      {...props}
    >
      {label && (
        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full bg-slate-50/50 border-2 border-slate-50 rounded-2xl py-4 px-6
          text-[15px] font-bold transition-all duration-300 shadow-sm outline-none
          ${isOpen ? "bg-white border-indigo-500/20 ring-4 ring-indigo-500/5" : "hover:bg-slate-100/50"}
          ${error ? "border-rose-500/50" : ""}
          ${selectedOption ? "text-slate-700" : "text-slate-400"}
        `}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-900/10 py-3 z-[1500] animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold transition-all
                  ${option.value === value ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}
                `}
              >
                {option.label}
                {option.value === value && <Check size={18} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <span className="text-[11px] font-bold text-rose-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
