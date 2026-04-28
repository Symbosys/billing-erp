import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
  const { theme, colors } = useTheme();

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

  const maxWidth = {
    sm: "448px",
    md: "576px",
    lg: "768px",
    xl: "1024px",
  }[size];

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Backdrop */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        style={{
          position: "relative",
          width: "100%",
          maxWidth: maxWidth,
          backgroundColor: colors.card,
          borderRadius: "32px",
          border: `1px solid ${colors.border}`,
          boxShadow: "var(--card-shadow)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "28px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
          <button 
            onClick={onClose}
            style={{
              padding: "10px",
              color: colors.textMuted,
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.bg; e.currentTarget.style.color = colors.primaryDark; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div 
          className="custom-scrollbar"
          style={{ 
            padding: "32px", 
            overflowY: "auto", 
            maxHeight: "70vh", 
            fontWeight: 500, 
            color: colors.textMuted,
            fontSize: "15px"
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: "24px 32px", backgroundColor: theme === "light" ? "rgba(248, 250, 252, 0.5)" : "rgba(255, 255, 255, 0.02)", borderTop: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Modal;
