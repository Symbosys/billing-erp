import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md"
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`
        relative w-full ${sizes[size]} bg-white rounded-[32px] shadow-2xl shadow-slate-900/40 
        overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-500
      `}>
        {/* Header */}
        <div className="px-8 py-7 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#1e293b] tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar font-medium text-slate-600">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
