import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  CreditCard,
  Save,
  Database,
  Terminal,
  Zap,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  LogOut,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Badge from "../components/Badge";
import { useTheme } from "../context/ThemeContext";
import { useUpdatePassword } from "../config/hooks/useAuth";

const Settings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "general");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const { theme, colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const [entityType, setEntityType] = useState("corp");
  const [currency, setCurrency] = useState("usd");
  const [timezone, setTimezone] = useState("pst");
  const [businessName, setBusinessName] = useState("SymboSys Enterprise");
  const [headquartersAddress, setHeadquartersAddress] = useState("124 Innovation Way, Silicon Valley, CA");
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const handleSaveConfig = () => {
    setIsSavingConfig(true);
    setTimeout(() => {
      setIsSavingConfig(false);
      alert("System configurations synchronized to cloud successfully!");
    }, 1200);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordMutation = useUpdatePassword();

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await updatePasswordMutation.mutateAsync({ currentPassword, newPassword });
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;



  const tabs = [
    { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    {
      id: "billing",
      label: "Payment & Subscription",
      icon: <CreditCard size={18} />,
    },
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
      display: "flex",
      flexDirection: "column" as const,
      gap: "40px",
    },
    quickPrefs: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 16px",
      backgroundColor: colors.card,
      borderRadius: "14px",
      border: `1px solid ${colors.border}`,
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
      backgroundColor: colors.card,
      borderRadius: "32px",
      border: `1px solid ${colors.border}`,
      padding: isMobile ? "24px" : "40px",
      boxShadow: "var(--card-shadow)",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "10px",
      marginBottom: "24px",
    },
    label: {
      fontSize: "12px",
      fontWeight: 800,
      color: colors.textMuted,
      textTransform: "uppercase" as const,
      letterSpacing: "0.15em",
      marginBottom: "2px",
      marginLeft: "4px"
    },
    divider: {
      height: "1px",
      backgroundColor: colors.border,
      margin: "32px 0",
      border: "none",
    },
    statsSlider: {
      display: "flex",
      overflowX: "auto" as const,
      gap: isMobile ? "16px" : "24px",
      padding: "4px 4px 16px 4px",
      margin: "0 -4px",
      scrollbarWidth: "none" as const,
      msOverflowStyle: "none" as const,
      scrollSnapType: "x mandatory" as const,
      WebkitOverflowScrolling: "touch" as const,
    },
    statCardWrapper: {
      flex: isMobile ? "0 0 280px" : isTablet ? "0 0 300px" : "1",
      scrollSnapAlign: "start" as const,
      minWidth: "260px",
    },
    statCard: (_color: string) => ({
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      height: "100%",
    }),
    iconWrapper: (color: string) => ({
      width: "48px",
      height: "48px",
      borderRadius: "14px",
      backgroundColor: `${color}10`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div style={styles.sectionCard}>
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: colors.textMain,
                  letterSpacing: "-0.02em",
                }}
              >
                Business Identity
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                Manage your core organization details and regional preferences.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "24px",
              }}
            >
              <div style={styles.inputGroup}>
                <label style={styles.label}>Business Name</label>
                <Input
                  value={businessName}
                  onChange={(e: any) => setBusinessName(e.target.value)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Legal Entity Type</label>
                <Select
                  options={[
                    { label: "Corporation", value: "corp" },
                    { label: "Partnership", value: "part" },
                  ]}
                  value={entityType}
                  onChange={(val) => setEntityType(val as string)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Headquarters Address</label>
              <Input
                value={headquartersAddress}
                onChange={(e: any) => setHeadquartersAddress(e.target.value)}
                style={{ 
                  borderRadius: "18px", 
                  height: "54px", 
                  fontSize: "15px",
                  backgroundColor: colors.input,
                  border: `2px solid ${colors.border}`
                }}
              />
            </div>

            <hr style={styles.divider} />

            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: colors.textMain,
                  letterSpacing: "-0.02em",
                }}
              >
                Localization
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                Configure currency and time tracking for your global nodes.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "24px",
              }}
            >
              <div style={styles.inputGroup}>
                <label style={styles.label}>Primary Currency</label>
                <Select
                  options={[
                    { label: "USD ($)", value: "usd" },
                    { label: "EUR (€)", value: "eur" },
                  ]}
                  value={currency}
                  onChange={(val) => setCurrency(val as string)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Timezone</label>
                <Select
                  options={[
                    { label: "Pacific Standard Time (PST)", value: "pst" },
                    { label: "Eastern Standard Time (EST)", value: "est" },
                  ]}
                  value={timezone}
                  onChange={(val) => setTimezone(val as string)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
              }}
            >
              <Button
                variant="primary"
                leftIcon={isSavingConfig ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                style={{
                  borderRadius: "16px",
                  padding: "16px 32px",
                  backgroundColor: colors.primary,
                  fontWeight: 800,
                  opacity: isSavingConfig ? 0.7 : 1,
                  pointerEvents: isSavingConfig ? "none" : "auto",
                  transition: "all 0.3s ease"
                }}
              >
                {isSavingConfig ? "Synchronizing..." : "Save Configurations"}
              </Button>
            </div>
          </div>
        );
      case "security":
        return (
          <div style={styles.sectionCard}>
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: colors.textMain,
                  letterSpacing: "-0.02em",
                }}
              >
                Authentication & Integrity
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                Enforce high-level security protocols for your administrative
                session.
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                backgroundColor: "rgba(79, 70, 229, 0.03)",
                borderRadius: "20px",
                border: `1px solid rgba(79, 70, 229, 0.1)`,
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: colors.primary,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lock size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h5
                  style={{ fontWeight: 800, color: colors.textMain, margin: 0 }}
                >
                  Two-Factor Authentication
                </h5>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textMuted,
                    margin: "2px 0 0 0",
                    fontWeight: 500,
                  }}
                >
                  Add an extra layer of protection to your account.
                </p>
              </div>
              <Button
                variant="ghost"
                style={{ color: colors.primary, fontWeight: 800 }}
              >
                Enable 2FA
              </Button>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Current Password</label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px",
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`,
                    paddingRight: "50px"
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: colors.textMuted,
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "24px",
              }}
            >
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <Input
                  type="password"
                  placeholder="New secure password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <Input
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ 
                    borderRadius: "18px", 
                    height: "54px", 
                    fontSize: "15px", 
                    backgroundColor: colors.input,
                    border: `2px solid ${colors.border}`
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
              }}
            >
              <Button
                variant="primary"
                onClick={handleUpdatePassword}
                style={{
                  borderRadius: "16px",
                  padding: "16px 32px",
                  backgroundColor: colors.primary,
                  fontWeight: 800,
                  opacity: updatePasswordMutation.isPending ? 0.7 : 1,
                  pointerEvents: updatePasswordMutation.isPending ? "none" : "auto"
                }}
              >
                {updatePasswordMutation.isPending ? "Updating..." : "Update Credentials"}
              </Button>
            </div>
          </div>
        );
      case "account":
        return (
          <div style={styles.sectionCard}>
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: colors.textMain,
                  letterSpacing: "-0.02em",
                }}
              >
                Account Management
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                Manage your active session and account status.
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                backgroundColor: "rgba(244, 63, 94, 0.03)",
                borderRadius: "20px",
                border: `1px solid rgba(244, 63, 94, 0.1)`,
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#f43f5e",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogOut size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h5
                  style={{ fontWeight: 800, color: colors.textMain, margin: 0 }}
                >
                  Terminate Session
                </h5>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textMuted,
                    margin: "2px 0 0 0",
                    fontWeight: 500,
                  }}
                >
                  Securely sign out of the administrative dashboard. You will need your credentials to log back in.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleLogout}
                style={{ 
                  backgroundColor: "#f43f5e", 
                  fontWeight: 800,
                  borderRadius: "14px",
                  padding: "12px 24px"
                }}
              >
                Sign Out Securely
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div style={styles.sectionCard}>
            <div
              style={{
                height: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: colors.textMuted,
                gap: "16px",
              }}
            >
              <Database size={48} style={{ opacity: 0.2 }} />
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, color: colors.textMain }}>
                  {tabs.find((t) => t.id === activeTab)?.label} Interface
                </h3>
                <p style={{ fontWeight: 500 }}>
                  Synchronizing module parameters from the cloud...
                </p>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: colors.primary,
              fontWeight: 900,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "8px",
            }}
          >
            <Terminal size={16} />
            Command Center
          </div>
          <h1
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: 900,
              color: colors.textMain,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            System <span style={{ color: colors.primary }}>Settings</span>
          </h1>
          <p
            style={{
              color: colors.textMuted,
              marginTop: "8px",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Orchestrate your workspace environment and security infrastructure.
          </p>
        </div>

      </div>

      {/* System Health Slider */}
      <div style={styles.statsSlider}>
        {[
          {
            label: "Cloud Sync",
            value: "Real-time",
            icon: <RefreshCw size={22} />,
            color: "#10b981",
            change: "Active",
          },
          {
            label: "Server Latency",
            value: "14ms",
            icon: <Zap size={22} />,
            color: "#4f46e5",
            change: "Optimal",
          },
          {
            label: "Security Level",
            value: "Tier 4",
            icon: <Shield size={22} />,
            color: "#818cf8",
            change: "Encrypted",
          },
          {
            label: "Storage Load",
            value: "42.8%",
            icon: <Database size={22} />,
            color: theme === "dark" ? "#94a3b8" : "#64748b",
            change: "Healthy",
          },
        ].map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div
              style={styles.statCard(stat.color)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px -5px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0,0,0,0.05)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <Badge
                  variant={i === 2 ? "success" : "neutral"}
                  dot
                  style={{ fontSize: "10px", fontWeight: 700 }}
                >
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#94a3b8" : "#64748b",
                    margin: "0 0 4px 0",
                  }}
                >
                  {stat.label}
                </p>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: theme === "dark" ? "#f8fafc" : "#1e293b",
                    margin: 0,
                  }}
                >
                  {stat.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div style={styles.layout}>
        {/* Content Area */}
        <div>
          {renderTabContent()}

          {/* Footer Card */}
          <div
            style={{
              marginTop: "32px",
              padding: "24px 32px",
              backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
              borderRadius: "28px",
              border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10b981",
                }}
              >
                <Zap size={16} />
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: colors.textMuted,
                }}
              >
                Configuration Engine V.4.1.0
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="ghost"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                Export Config
              </Button>
              <Button
                variant="ghost"
                style={{ fontSize: "13px", fontWeight: 700, color: "#f43f5e" }}
              >
                Reset to Default
              </Button>
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
