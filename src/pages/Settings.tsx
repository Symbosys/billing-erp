import React, { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Save, 
  Key, 
  Mail, 
  Smartphone,
  Check,
  ChevronRight,
  Database,
  Terminal,
  Zap,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Badge from "../components/Badge";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form States
  const [entityType, setEntityType] = useState("corp");
  const [currency, setCurrency] = useState("usd");
  const [timezone, setTimezone] = useState("pst");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const colors = {
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.7)",
    bg: "#f8fafc",
    emerald: "#10b981",
  };

  const tabs = [
    { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "billing", label: "Payment & Subscription", icon: <CreditCard size={18} /> },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? "32px" : "48px",
      paddingBottom: "60px",
      animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "32px",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "280px 1fr",
      gap: "40px",
      alignItems: "start",
    },
    sidebar: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "28px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
    },
    tabButton: (isActive: boolean) => ({
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "14px 20px",
      borderRadius: "18px",
      border: "none",
      backgroundColor: isActive ? colors.primary : "transparent",
      color: isActive ? "white" : colors.textMain,
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "14px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      textAlign: "left" as const,
      width: "100%",
    }),
    sectionCard: {
      backgroundColor: "white",
      borderRadius: "32px",
      border: `1px solid ${colors.border}`,
      padding: isMobile ? "24px" : "40px",
      boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "10px",
      marginBottom: "24px",
    },
    label: {
      fontSize: "13px",
      fontWeight: 800,
      color: colors.textMain,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
    },
    divider: {
      height: "1px",
      backgroundColor: colors.border,
      margin: "32px 0",
      border: "none",
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div style={styles.sectionCard}>
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>Business Identity</h3>
              <p style={{ color: colors.textMuted, fontWeight: 500, marginTop: "4px" }}>Manage your core organization details and regional preferences.</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Business Name</label>
                <Input defaultValue="SymboSys Enterprise" style={{ borderRadius: "14px" }} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Legal Entity Type</label>
                <Select 
                  options={[{label: "Corporation", value: "corp"}, {label: "Partnership", value: "part"}]} 
                  value={entityType}
                  onChange={(val) => setEntityType(val as string)}
                  style={{ borderRadius: "14px" }}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Headquarters Address</label>
              <Input defaultValue="124 Innovation Way, Silicon Valley, CA" style={{ borderRadius: "14px" }} />
            </div>

            <hr style={styles.divider} />

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>Localization</h3>
              <p style={{ color: colors.textMuted, fontWeight: 500, marginTop: "4px" }}>Configure currency and time tracking for your global nodes.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Primary Currency</label>
                <Select 
                  options={[{label: "USD ($)", value: "usd"}, {label: "EUR (€)", value: "eur"}]} 
                  value={currency} 
                  onChange={(val) => setCurrency(val as string)}
                  style={{ borderRadius: "14px" }} 
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Timezone</label>
                <Select 
                  options={[{label: "Pacific Standard Time (PST)", value: "pst"}, {label: "Eastern Standard Time (EST)", value: "est"}]} 
                  value={timezone} 
                  onChange={(val) => setTimezone(val as string)}
                  style={{ borderRadius: "14px" }} 
                />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
              <Button variant="primary" leftIcon={<Save size={20} />} style={{ borderRadius: "16px", padding: "16px 32px", backgroundColor: colors.primary, fontWeight: 800 }}>Save Configurations</Button>
            </div>
          </div>
        );
      case "security":
        return (
          <div style={styles.sectionCard}>
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>Authentication & Integrity</h3>
              <p style={{ color: colors.textMuted, fontWeight: 500, marginTop: "4px" }}>Enforce high-level security protocols for your administrative session.</p>
            </div>

            <div style={{ padding: "24px", backgroundColor: "rgba(79, 70, 229, 0.03)", borderRadius: "20px", border: `1px solid rgba(79, 70, 229, 0.1)`, display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: colors.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Lock size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontWeight: 800, color: colors.textMain, margin: 0 }}>Two-Factor Authentication</h5>
                <p style={{ fontSize: "13px", color: colors.textMuted, margin: "2px 0 0 0", fontWeight: 500 }}>Add an extra layer of protection to your account.</p>
              </div>
              <Button variant="ghost" style={{ color: colors.primary, fontWeight: 800 }}>Enable 2FA</Button>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Current Password</label>
              <div style={{ position: "relative" }}>
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••••••" style={{ borderRadius: "14px", paddingRight: "50px" }} />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: colors.textMuted, cursor: "pointer" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <Input type="password" placeholder="New secure password" style={{ borderRadius: "14px" }} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <Input type="password" placeholder="Repeat new password" style={{ borderRadius: "14px" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
              <Button variant="primary" style={{ borderRadius: "16px", padding: "16px 32px", backgroundColor: colors.primary, fontWeight: 800 }}>Update Credentials</Button>
            </div>
          </div>
        );
      default:
        return (
          <div style={styles.sectionCard}>
            <div style={{ height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: colors.textMuted, gap: "16px" }}>
              <Database size={48} style={{ opacity: 0.2 }} />
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, color: colors.textMain }}>{tabs.find(t => t.id === activeTab)?.label} Interface</h3>
                <p style={{ fontWeight: 500 }}>Synchronizing module parameters from the cloud...</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
            <Terminal size={16} />
            Command Center
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>System <span style={{ color: colors.primary }}>Settings</span></h1>
          <p style={{ color: colors.textMuted, marginTop: "8px", fontWeight: 500, fontSize: "16px" }}>Orchestrate your workspace environment and security infrastructure.</p>
        </div>
        {!isMobile && (
           <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 20px", backgroundColor: "white", borderRadius: "18px", border: `1px solid ${colors.border}` }}>
              <Badge variant="success" dot style={{ fontWeight: 800 }}>Server: Online</Badge>
              <div style={{ width: "1px", height: "20px", backgroundColor: colors.border }} />
              <span style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted }}>Latency: 14ms</span>
           </div>
        )}
      </div>

      {/* Main Layout */}
      <div style={styles.layout}>
        {/* Navigation Sidebar */}
        <div style={styles.sidebar}>
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={styles.tabButton(activeTab === tab.id)}
              className="group"
            >
              <div style={{ transition: "transform 0.3s ease" }} className="group-hover:scale-110">
                {tab.icon}
              </div>
              {tab.label}
              {activeTab === tab.id && <Check size={16} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
          
          <hr style={{ height: "1px", backgroundColor: colors.border, border: "none", margin: "12px 0" }} />
          
          <div style={{ padding: "12px 20px" }}>
            <p style={{ fontSize: "10px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px" }}>Quick Preferences</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.textMain }}>
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                <span style={{ fontSize: "13px", fontWeight: 700 }}>Dark Mode</span>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{ width: "44px", height: "24px", borderRadius: "12px", backgroundColor: isDarkMode ? colors.primary : "#e2e8f0", border: "none", position: "relative", cursor: "pointer", transition: "all 0.3s ease" }}
              >
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "white", position: "absolute", top: "3px", left: isDarkMode ? "23px" : "3px", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div>
          {renderTabContent()}
          
          {/* Footer Card */}
          <div style={{ marginTop: "32px", padding: "24px 32px", backgroundColor: "white", borderRadius: "28px", border: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: `${colors.emerald}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.emerald }}>
                <Zap size={16} />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: colors.textMuted }}>Configuration Engine V.4.1.0</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
               <Button variant="ghost" style={{ fontSize: "13px", fontWeight: 700 }}>Export Config</Button>
               <Button variant="ghost" style={{ fontSize: "13px", fontWeight: 700, color: "#f43f5e" }}>Reset to Default</Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Settings;
