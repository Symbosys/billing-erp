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
  User,
} from "lucide-react";

// --- Types ---
interface NavItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  hasDropdown?: boolean;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  // --- Theme Constants (Inline CSS Tokens) ---
  const colors = {
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#e0e7ff",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    textMain: "#1e293b",
    textMuted: "#64748b",
    bg: "#ffffff",
    border: "#e2e8f0",
    activeBg: "#1e293b",
  };

  const transitions = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

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
        { 
          id: "set", 
          path: "/settings", 
          icon: <Settings size={20} />, 
          label: "Settings",
          hasDropdown: true 
        },
      ]
    },
  ];

  const settingsSubItems = [
    { id: "gen", path: "/settings?tab=general", icon: <Settings size={18} />, label: "General" },
    { id: "acc", path: "/settings?tab=account", icon: <User size={18} />, label: "Account" },
    { id: "sec", path: "/settings?tab=security", icon: <ShieldCheck size={18} />, label: "Security" },
    { id: "not", path: "/settings?tab=notifications", icon: <Bell size={18} />, label: "Notifications" },
    { id: "bil", path: "/settings?tab=billing", icon: <CreditCard size={18} />, label: "Payments" },
    { id: "logout", path: "/login", icon: <LogOut size={18} />, label: "Logout" },
  ];

  const filteredNavigation = useMemo(() => {
    if (!searchQuery) return navigation;
    return navigation.map(section => ({
      ...section,
      items: section.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  // --- Dynamic Inline Styles ---
  const sidebarWidth = "280px";

  const sidebarStyle: React.CSSProperties = {
    width: sidebarWidth,
    backgroundColor: colors.bg,
    borderRight: `1px solid ${colors.border}`,
    transition: transitions,
    display: "flex",
    flexDirection: "column",
    position: window.innerWidth < 1024 ? "fixed" : "sticky",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 1100,
    boxShadow: "1px 0 10px rgba(0, 0, 0, 0.02)",
    transform: window.innerWidth < 1024 
      ? (isMobileOpen ? "translateX(0)" : "translateX(-100%)") 
      : "translateX(0)",
  };

  const logoContainerStyle: React.CSSProperties = {
    height: "100px",
    display: "flex",
    alignItems: "center",
    padding: "0 28px",
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
        className="sidebar"
      >

        {/* Brand Header */}
        <div style={logoContainerStyle}>
          <div className="flex items-center gap-5 overflow-hidden w-full">
            <div style={brandIconStyle}>
              <Zap size={26} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
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
        <div style={{ padding: "0 24px", marginBottom: "32px" }}>
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

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }} className="custom-scrollbar">
          {filteredNavigation.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "28px" }}>
              <p style={{ 
                fontSize: "11px", 
                fontWeight: 800, 
                color: colors.textMuted, 
                textTransform: "uppercase", 
                letterSpacing: "0.12em",
                padding: "0 18px",
                marginBottom: "12px",
                opacity: 0.5
              }}>
                {section.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <div key={item.id}>
                      <NavLink
                        to={item.path}
                        onClick={(e) => {
                          if (item.hasDropdown) {
                            e.preventDefault();
                            setIsSettingsOpen(!isSettingsOpen);
                          } else if (window.innerWidth < 1024) {
                            setIsMobileOpen(false);
                          }
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "12px 18px",
                          borderRadius: "14px",
                          textDecoration: "none",
                          color: isActive ? "white" : colors.textMain,
                          backgroundColor: isActive ? colors.activeBg : "transparent",
                          transition: "all 0.2s ease",
                          justifyContent: "flex-start",
                          position: "relative",
                          boxShadow: isActive ? "0 8px 15px -5px rgba(15, 23, 42, 0.25)" : "none",
                        }}
                        className="group"
                      >
                        <div style={{ 
                          color: isActive ? "white" : colors.textMuted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease"
                        }}>
                          {item.icon}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: isActive ? 700 : 600 }}>
                          {item.label}
                        </span>
                        {item.hasDropdown && (
                          <ChevronRight 
                            size={16} 
                            style={{ 
                              marginLeft: "auto", 
                              transition: "transform 0.3s ease",
                              transform: isSettingsOpen ? "rotate(90deg)" : "none",
                              color: isActive ? "white" : colors.textMuted
                            }} 
                          />
                        )}
                        {!item.hasDropdown && item.badge && (
                          <span style={{ 
                            marginLeft: "auto",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            backgroundColor: isActive ? "rgba(255,255,255,0.15)" : `${colors.primary}15`,
                            color: isActive ? "white" : colors.primary,
                            fontSize: "10px",
                            fontWeight: 800,
                            textTransform: "uppercase"
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                      
                      {item.hasDropdown && isSettingsOpen && (
                        <div style={{ 
                          marginTop: "4px", 
                          paddingLeft: "24px", 
                          display: "flex", 
                          flexDirection: "column", 
                          gap: "4px",
                          animation: "slideIn 0.3s ease" 
                        }}>
                          {settingsSubItems.map((subItem) => (
                            <NavLink
                              key={subItem.id}
                              to={subItem.path}
                              onClick={() => window.innerWidth < 1024 && setIsMobileOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 16px",
                                borderRadius: "12px",
                                textDecoration: "none",
                                color: colors.textMuted,
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.bg;
                                e.currentTarget.style.color = colors.textMain;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = colors.textMuted;
                              }}
                            >
                              <div style={{ opacity: 0.7 }}>{subItem.icon}</div>
                              <span style={{ fontSize: "13px", fontWeight: 600 }}>{subItem.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{ padding: "24px", borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: colors.bg, borderRadius: "16px", border: `1px solid ${colors.border}` }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${colors.border}` }}>
              <ShieldCheck size={18} style={{ color: colors.primary }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain, margin: 0 }}>V.2.0.4 PRO</p>
              <p style={{ fontSize: "10px", fontWeight: 600, color: colors.textMuted, margin: 0 }}>Sync Online</p>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .sidebar {
           scrollbar-width: none;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
