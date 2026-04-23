import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Receipt,
  LogOut,
  LayoutGrid,
  ChevronLeft,
  Settings,
  PieChart,
  Bell,
  Search,
  ChevronRight,
  Zap,
  Menu,
  X,
  ShieldCheck,
  CreditCard,
  Monitor,
} from "lucide-react";

// --- Types ---
interface NavItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // --- Theme Constants (Inline CSS Tokens) ---
  const colors = {
    primary: "#4f46e5", // Indigo 600
    primaryLight: "#818cf8", // Indigo 400
    bg: "rgba(255, 255, 255, 0.95)",
    textMain: "#1e293b", // Slate 800
    textMuted: "#64748b", // Slate 500
    border: "rgba(226, 232, 240, 0.7)", // Slate 200 with alpha
    activeBg: "rgba(15, 23, 42, 0.95)", // Slate 900
  };

  const transitions = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";

  // --- Configuration ---
  const navigation: NavSection[] = [
    {
      title: "Navigation",
      items: [
        { id: "dash", path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { id: "pos", path: "/screen", icon: <Monitor size={20} />, label: "Terminal", badge: "New" },
        { id: "inv", path: "/inventory", icon: <Package size={20} />, label: "Inventory", badge: "Live" },
        { id: "pro", path: "/products", icon: <LayoutGrid size={20} />, label: "Products" },
        { id: "cus", path: "/customers", icon: <Users size={20} />, label: "Customers" },
      ]
    },
    {
      title: "Finance",
      items: [
        { id: "bill", path: "/billing", icon: <Receipt size={20} />, label: "Billing" },
        { id: "rep", path: "/reports", icon: <PieChart size={20} />, label: "Analytics" },
      ]
    },
    {
      title: "System",
      items: [
        { id: "set", path: "/settings", icon: <Settings size={20} />, label: "Settings" },
        { id: "sec", path: "/security", icon: <ShieldCheck size={20} />, label: "Security" },
      ]
    },
  ];

  const filteredNavigation = useMemo(() => {
    if (!searchQuery) return navigation;
    return navigation.map(section => ({
      ...section,
      items: section.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  // --- Dynamic Inline Styles ---
  const sidebarWidth = isCollapsed ? "100px" : "300px";

  const sidebarStyle: React.CSSProperties = {
    width: sidebarWidth,
    backgroundColor: colors.bg,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${colors.border}`,
    transition: transitions,
    display: "flex",
    flexDirection: "column",
    // Position fixed for mobile, but relative for desktop so it pushes content
    position: window.innerWidth < 1024 ? "fixed" : "relative",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 1100,
    boxShadow: "10px 0 50px rgba(0, 0, 0, 0.02)",
    // On mobile, use translate to hide/show
    transform: window.innerWidth < 1024 
      ? (isMobileOpen ? "translateX(0)" : "translateX(-100%)") 
      : "translateX(0)",
  };

  const logoContainerStyle: React.CSSProperties = {
    height: "120px",
    display: "flex",
    alignItems: "center",
    padding: isCollapsed ? "0 28px" : "0 36px",
    transition: transitions,
  };

  const brandIconStyle: React.CSSProperties = {
    width: "52px",
    height: "52px",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)",
    flexShrink: 0,
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[1000] animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside 
        style={sidebarStyle}
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      >
        {/* Collapse Toggle (Desktop only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
          style={{
            position: "absolute",
            right: "-16px",
            top: "40px",
            width: "32px",
            height: "32px",
            backgroundColor: "white",
            border: `1px solid ${colors.border}`,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textMuted,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            zIndex: 100,
            transition: transitions,
            transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
        >
          <ChevronLeft size={16} strokeWidth={3} />
        </button>

        {/* Brand Header */}
        <div style={logoContainerStyle}>
          <div className="flex items-center gap-5 overflow-hidden w-full">
            <div style={brandIconStyle}>
              <Zap size={26} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              opacity: isCollapsed ? 0 : 1,
              transform: isCollapsed ? "translateX(-20px)" : "translateX(0)",
              transition: transitions,
              whiteSpace: "nowrap"
            }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-1px" }}>
                Symbo<span style={{ color: colors.primary }}>Sys</span>
              </span>
              <span style={{ fontSize: "10px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "2px" }}>
                Enterprise ERP
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div style={{ padding: "0 28px", marginBottom: "32px" }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={16} />
              <input 
                type="text"
                placeholder="Find Module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  borderRadius: "16px",
                  border: `1px solid ${colors.border}`,
                  backgroundColor: "rgba(241, 245, 249, 0.5)",
                  fontSize: "13px",
                  fontWeight: 600,
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                className="focus:bg-white focus:border-indigo-400 focus:shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }} className="custom-scrollbar">
          {filteredNavigation.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "32px" }}>
              {!isCollapsed && (
                <p style={{ 
                  fontSize: "11px", 
                  fontWeight: 800, 
                  color: colors.textMuted, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em",
                  padding: "0 18px",
                  marginBottom: "16px",
                  opacity: 0.6
                }}>
                  {section.title}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && setIsMobileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: isCollapsed ? "16px" : "14px 18px",
                        borderRadius: "16px",
                        textDecoration: "none",
                        color: isActive ? "white" : colors.textMain,
                        backgroundColor: isActive ? colors.activeBg : "transparent",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        position: "relative",
                        boxShadow: isActive ? "0 10px 20px -5px rgba(15, 23, 42, 0.3)" : "none",
                      }}
                      className="group"
                    >
                      <div style={{ 
                        color: isActive ? colors.primaryLight : colors.textMuted,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease"
                      }} className="group-hover:scale-110">
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <span style={{ fontSize: "14px", fontWeight: isActive ? 800 : 600 }}>
                          {item.label}
                        </span>
                      )}
                      {!isCollapsed && item.badge && (
                        <span style={{ 
                          marginLeft: "auto",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          backgroundColor: isActive ? "rgba(255,255,255,0.1)" : `${colors.primary}10`,
                          color: isActive ? "white" : colors.primary,
                          fontSize: "10px",
                          fontWeight: 900,
                          textTransform: "uppercase"
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{ padding: "28px", borderTop: `1px solid ${colors.border}` }}>
          {!isCollapsed ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "20px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
                <ShieldCheck size={20} style={{ color: colors.primary }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textMain, margin: 0 }}>V.2.0.4 PRO</p>
                <p style={{ fontSize: "10px", fontWeight: 600, color: colors.textMuted, margin: 0 }}>Sync Status: Online</p>
              </div>
            </div>
          ) : (
             <div style={{ display: "flex", justifyContent: "center" }}>
               <LogOut size={20} style={{ color: colors.textMuted }} />
             </div>
          )}
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .sidebar {
           scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
