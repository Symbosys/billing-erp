import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  subtitle, 
  headerAction, 
  footer, 
  className = "",
  bodyClassName = "",
  style,
  ...props
}) => {
  return (
    <div 
      className={`overflow-hidden transition-all duration-500 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "32px",
        boxShadow: "var(--card-shadow)",
        ...style
      }}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div 
          className="px-8 py-7 border-b flex items-center justify-between backdrop-blur-sm"
          style={{ borderBottomColor: "var(--border-color)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
        >
          <div>
            {title && <h3 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>{title}</h3>}
            {subtitle && <p className="text-sm font-medium mt-1" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={`p-8 ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div 
          className="px-8 py-6 border-t"
          style={{ borderTopColor: "var(--border-color)", backgroundColor: "rgba(255, 255, 255, 0.01)" }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
