import React, { useState, useEffect, useMemo } from "react";
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  Activity,
  Zap,
  Target,
  BarChart3,
  MousePointer2,
  Layers,
  Bell
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";

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

  const colors = {
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    emerald: "#10b981",
    rose: "#f43f5e",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.6)",
    bg: "#f8fafc",
    glass: "rgba(255, 255, 255, 0.7)",
  };

  const stats = [
    { title: "Net Revenue", value: "$428.5k", change: "+14.2%", icon: <DollarSign size={24} />, color: colors.primary, isPositive: true, detail: "vs. last month" },
    { title: "Active Nodes", value: "2,480", change: "+8.1%", icon: <Users size={24} />, color: colors.emerald, isPositive: true, detail: "connected now" },
    { title: "System Load", value: "84.2%", change: "-2.4%", icon: <Zap size={24} />, color: colors.rose, isPositive: false, detail: "resource usage" },
    { title: "Daily Target", value: "92%", change: "+5.5%", icon: <Target size={24} />, color: colors.amber, isPositive: true, detail: "completion rate" },
  ];

  const recentTransactions = [
    { id: 1, customer: "Alexander Wright", amount: "$1,200.00", date: "Just now", status: "Completed", type: "Enterprise" },
    { id: 2, customer: "Sophia Chen", amount: "$3,450.50", date: "12 mins ago", status: "Completed", type: "Standard" },
    { id: 3, customer: "Marcus Miller", amount: "$890.00", date: "1 hour ago", status: "Processing", type: "Legacy" },
    { id: 4, customer: "Elena Rodriguez", amount: "$2,100.00", date: "3 hours ago", status: "Completed", type: "Enterprise" },
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
    titleSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
    },
    title: {
      fontSize: isMobile ? "36px" : "48px",
      fontWeight: 900,
      color: colors.textMain,
      letterSpacing: "-0.04em",
      margin: 0,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
      gap: "28px",
    },
    statCard: (color: string) => ({
      padding: "32px",
      borderRadius: "32px",
      backgroundColor: "white",
      backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${color}05 100%)`,
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      cursor: "pointer",
      position: "relative" as const,
      overflow: "hidden",
    }),
    iconBox: (color: string) => ({
      width: "52px",
      height: "52px",
      borderRadius: "16px",
      backgroundColor: `${color}10`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `inset 0 0 0 1px ${color}15`,
    }),
    mainGrid: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "1.8fr 1fr",
      gap: "32px",
    },
    chartPlaceholder: {
      height: "400px",
      backgroundColor: "#fafafa",
      borderRadius: "24px",
      border: `2px dashed ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      color: colors.textMuted,
    },
    activityRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "20px",
      transition: "all 0.3s ease",
      backgroundColor: "transparent",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            <Activity size={16} />
            Live Ecosystem
          </div>
          <h1 style={styles.title}>Operation <span style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Horizon</span></h1>
          <p style={{ color: colors.textMuted, fontWeight: 500, fontSize: "16px" }}>Core intelligence monitoring and enterprise resource management.</p>
        </div>
        <div style={{ display: "flex", gap: "16px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<Bell size={20} />} style={{ borderRadius: "18px", padding: "16px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button variant="primary" leftIcon={<Plus size={22} />} style={{ borderRadius: "18px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)", fontWeight: 800 }}>Create Report</Button>
        </div>
      </div>

      {/* Quick Access Tabs */}
      <div style={{ display: "flex", gap: "8px", padding: "6px", backgroundColor: "white", borderRadius: "20px", width: "fit-content", border: `1px solid ${colors.border}` }}>
        {["Overview", "Analytics", "Operations", "Security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              padding: "10px 24px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: activeTab === tab.toLowerCase() ? colors.primary : "transparent",
              color: activeTab === tab.toLowerCase() ? "white" : colors.textMuted,
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            style={styles.statCard(stat.color)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = `0 20px 40px -15px ${stat.color}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0, 0, 0, 0.04)";
            }}
          >
            <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${stat.color}10 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={styles.iconBox(stat.color)}>{stat.icon}</div>
                <Badge variant={stat.isPositive ? "success" : "danger"} dot style={{ fontWeight: 800, padding: "6px 12px", borderRadius: "12px" }}>
                  {stat.change}
                </Badge>
              </div>
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.title}</p>
                <h3 style={{ fontSize: "36px", fontWeight: 900, color: colors.textMain, margin: "4px 0", letterSpacing: "-0.03em" }}>{stat.value}</h3>
                <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600 }}>{stat.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div style={styles.mainGrid}>
        <Card 
          title="Performance Architecture" 
          subtitle="Real-time data flow across global distribution nodes."
          style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, padding: "32px" }}
        >
          <div style={styles.chartPlaceholder}>
            <BarChart3 size={48} style={{ opacity: 0.2 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 800, color: colors.textMain, fontSize: "18px" }}>Neural Analytics Engine</p>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Visualizing live enterprise metrics...</p>
            </div>
            <Button variant="secondary" style={{ marginTop: "16px", borderRadius: "14px", fontWeight: 700 }}>Initialize Render</Button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginTop: "32px" }}>
            {[
              { label: "Conversion", value: "3.2%", icon: <MousePointer2 size={18} /> },
              { label: "Stability", value: "99.9%", icon: <Layers size={18} /> },
              { label: "Throughput", value: "1.2GB/s", icon: <TrendingUp size={18} /> },
            ].map((m, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: "24px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                <div style={{ color: colors.primary, marginBottom: "8px" }}>{m.icon}</div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase" }}>{m.label}</p>
                <p style={{ fontSize: "20px", fontWeight: 900, color: colors.textMain }}>{m.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card 
          title="Neural Log" 
          subtitle="Latest authenticated transactions."
          style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, padding: "32px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recentTransactions.map((tx) => (
              <div 
                key={tx.id} 
                style={styles.activityRow}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: colors.primary, boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}>
                    {tx.customer[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{tx.customer}</h4>
                    <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600 }}>{tx.type} Account</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "15px", fontWeight: 900, color: colors.textMain, margin: 0 }}>{tx.amount}</p>
                  <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 700, textTransform: "uppercase" }}>{tx.date}</p>
                </div>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              rightIcon={<ArrowRight size={18} />} 
              style={{ marginTop: "24px", width: "100%", justifyContent: "center", borderRadius: "16px", fontWeight: 800, color: colors.primary, backgroundColor: `${colors.primary}05` }}
            >
              Access Global Ledger
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
