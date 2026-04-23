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
      className={`bg-white border border-slate-50 rounded-[32px] shadow-xl shadow-slate-200/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60 ${className}`}
      style={style}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-8 py-7 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
          <div>
            {title && <h3 className="text-xl font-black text-[#1e293b] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm font-medium text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={`p-8 ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
