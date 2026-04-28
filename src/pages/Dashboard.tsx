import React, { useState, useEffect } from "react";
import { 
  Layers,
  Bell,
  Activity,
  Zap,
  Target,
  MousePointer2,
  Users,
  DollarSign,
  ArrowRight,
  Plus
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { useTheme } from "../context/ThemeContext";
import { useDashboard } from "../config/hooks/useDashboard";

const Dashboard: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const { theme, colors } = useTheme();
  
  const { data } = useDashboard();

  const stats = data?.stats.map((stat, i) => ({
    ...stat,
    icon: [<DollarSign size={22} />, <Users size={22} />, <Zap size={22} />, <Target size={22} />][i],
    color: [colors.primary, colors.success, colors.danger, colors.warning][i]
  })) || [];

  const recentTransactions = data?.recentTransactions || [];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? "24px" : "32px",
      paddingBottom: "60px",
      animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "24px",
    },
    titleSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px",
    },
    title: {
      fontSize: isMobile ? "28px" : "36px",
      fontWeight: 800,
      color: colors.textMain,
      letterSpacing: "-0.02em",
      margin: 0,
    },
    statsGrid: {
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
      minWidth: "260px"
    },
    statCard: {
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      boxShadow: "var(--card-shadow)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      transition: "all 0.3s ease",
      position: "relative" as const,
      overflow: "hidden",
    },
    iconWrapper: (color: string) => ({
      width: "48px",
      height: "48px",
      borderRadius: "14px",
      backgroundColor: `${color}15`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    mainGrid: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "1.8fr 1fr",
      gap: "24px",
    },
    chartPlaceholder: {
      height: "300px",
      backgroundColor: colors.bg,
      borderRadius: "20px",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      color: colors.textMuted,
    },
    activityRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderRadius: "14px",
      transition: "all 0.2s ease",
      backgroundColor: "transparent",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>System Overview</h1>
          <p style={{ color: colors.textMuted, fontWeight: 500, fontSize: isMobile ? "14px" : "16px", margin: 0 }}>Core intelligence monitoring and enterprise resource management.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<Bell size={18} />} style={{ borderRadius: "14px", padding: "12px", backgroundColor: colors.card, border: `1px solid ${colors.border}` }} />
          <Button variant="primary" leftIcon={<Plus size={20} />} style={{ borderRadius: "14px", padding: "12px 24px", backgroundColor: colors.primaryDark, boxShadow: theme === "light" ? "0 10px 15px -3px rgba(79, 70, 229, 0.3)" : "none", fontWeight: 600 }}>New Project</Button>
        </div>
      </div>

      {/* Quick Access Tabs */}
      <div style={{ display: "flex", gap: "6px", padding: "4px", backgroundColor: colors.card, borderRadius: "16px", width: "fit-content", border: `1px solid ${colors.border}` }}>
        {["Overview", "Analytics", "Operations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              padding: "8px 20px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === tab.toLowerCase() ? colors.primaryDark : "transparent",
              color: activeTab === tab.toLowerCase() ? "white" : colors.textMuted,
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div 
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <Badge variant={stat.isPositive ? "success" : "danger"} style={{ fontWeight: 700, fontSize: "10px" }}>
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted, margin: "0 0 4px 0" }}>{stat.title}</p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{stat.value}</h3>
                <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 500, marginTop: "4px" }}>{stat.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div style={styles.mainGrid}>
        <Card 
          title="Performance Architecture" 
          subtitle="Real-time data flow across distribution nodes."
          style={{ borderRadius: "24px", border: `1px solid ${colors.border}`, padding: isMobile ? "20px" : "24px" }}
        >
          <div style={styles.chartPlaceholder}>
            <Activity size={40} style={{ opacity: 0.15, color: colors.primaryDark }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, color: colors.textMain, fontSize: "16px", margin: "0 0 4px 0" }}>System Analytics Engine</p>
              <p style={{ fontSize: "13px", fontWeight: 500 }}>Synchronizing live enterprise metrics...</p>
            </div>
            <Button variant="secondary" style={{ marginTop: "12px", borderRadius: "12px", fontWeight: 600, fontSize: "13px" }}>Refresh Data</Button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "16px", marginTop: "24px" }}>
            {[
              { label: "Conversion", value: "3.2%", icon: <MousePointer2 size={16} /> },
              { label: "Stability", value: "99.9%", icon: <Layers size={16} /> },
              { label: "Throughput", value: "1.2GB/s", icon: <Zap size={16} /> },
            ].map((m, i) => (
              <div key={i} style={{ padding: "16px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ color: colors.primaryDark }}>{m.icon}</div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: colors.textMuted, margin: 0 }}>{m.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card 
          title="Recent Activity" 
          subtitle="Latest authenticated transactions."
          style={{ borderRadius: "24px", border: `1px solid ${colors.border}`, padding: isMobile ? "20px" : "24px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {recentTransactions.map((tx) => (
              <div 
                key={tx.id} 
                style={styles.activityRow}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: colors.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: colors.primaryDark }}>
                    {tx.customer[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{tx.customer}</h4>
                    <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 500, margin: 0 }}>{tx.type}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{tx.amount}</p>
                  <p style={{ fontSize: "10px", color: colors.textMuted, fontWeight: 600 }}>{tx.date}</p>
                </div>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              rightIcon={<ArrowRight size={16} />} 
              style={{ marginTop: "16px", width: "100%", justifyContent: "center", borderRadius: "12px", fontWeight: 600, color: colors.primaryDark, backgroundColor: `${colors.primaryDark}08`, fontSize: "13px" }}
            >
              View Full Log
            </Button>
          </div>
        </Card>
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

export default Dashboard;
