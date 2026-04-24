import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Target, 
  Zap, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Globe,
  Layers,
  MousePointer2,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

const Analytics: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

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
    bg: "#f8fafc",
    card: "#ffffff",
    border: "#e2e8f0",
    violet: "#8b5cf6",
  };

  const performanceMetrics = [
    { label: "Customer Acquisition", value: "2,840", change: "+14.2%", isPositive: true, icon: <Users size={20} /> },
    { label: "Conversion Rate", value: "3.24%", change: "+0.8%", isPositive: true, icon: <MousePointer2 size={20} /> },
    { label: "Retention Score", value: "94.2%", change: "-1.5%", isPositive: false, icon: <Target size={20} /> },
    { label: "Avg. Session", value: "12m 40s", change: "+24s", isPositive: true, icon: <Activity size={20} /> },
  ];

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
      marginBottom: "8px"
    },
    titleSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px"
    },
    title: {
      fontSize: isMobile ? "28px" : "36px",
      fontWeight: 800,
      color: colors.textMain,
      letterSpacing: "-0.02em",
      margin: 0,
    },
    subtitle: {
      color: colors.textMuted,
      margin: 0,
      fontWeight: 500,
      fontSize: isMobile ? "14px" : "16px"
    },
    heroCard: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.violet} 100%)`,
      borderRadius: "32px",
      padding: isMobile ? "28px" : "40px",
      color: "white",
      display: "flex",
      flexDirection: isTablet ? ("column" as const) : ("row" as const),
      justifyContent: "space-between",
      alignItems: isTablet ? "flex-start" : "center",
      gap: "32px",
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.3)",
    },
    chartContainer: {
      height: "160px",
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
      marginTop: "12px",
    },
    performanceSlider: {
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
    performanceCardWrapper: {
      flex: isMobile ? "0 0 280px" : isTablet ? "0 0 300px" : "1",
      scrollSnapAlign: "start" as const,
      minWidth: "260px"
    },
    bar: (height: string, opacity: number) => ({
      flex: 1,
      height: height,
      backgroundColor: "white",
      opacity: opacity,
      borderRadius: "4px 4px 0 0",
      transition: "height 1s ease-out",
    })
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>
            Intelligence Engine
          </h1>
          <p style={styles.subtitle}>Predictive modeling and deep neural insights for your enterprise.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button 
            variant="secondary" 
            leftIcon={<RefreshCw size={18} />} 
            style={{ borderRadius: "14px", padding: "12px", backgroundColor: "white", border: `1px solid ${colors.border}` }} 
          />
          <Button 
            variant="primary" 
            leftIcon={<Download size={20} />} 
            style={{ 
              borderRadius: "14px", 
              padding: "12px 24px", 
              backgroundColor: colors.primaryDark, 
              boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", 
              fontWeight: 600 
            }}
          >
            Export Insights
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div style={styles.heroCard}>
        <div style={{ zIndex: 1 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.9 }}>Performance Index</p>
          <h2 style={{ fontSize: isMobile ? "42px" : "56px", fontWeight: 800, margin: "8px 0", letterSpacing: "-0.03em" }}>98.42%</h2>
          <div style={{ display: "flex", gap: "24px", marginTop: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, opacity: 0.8, textTransform: "uppercase", marginBottom: "4px" }}>Efficiency</p>
              <p style={{ fontSize: "18px", fontWeight: 800 }}>+12.4%</p>
            </div>
            <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "center" }} />
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, opacity: 0.8, textTransform: "uppercase", marginBottom: "4px" }}>Velocity</p>
              <p style={{ fontSize: "18px", fontWeight: 800 }}>8.2x</p>
            </div>
          </div>
        </div>
        <div style={{ width: isTablet ? "100%" : "360px", position: "relative", zIndex: 1 }}>
           <div style={styles.chartContainer}>
             {[ "40%", "70%", "50%", "90%", "60%", "100%", "80%", "40%", "60%", "90%" ].map((h, i) => (
                <div key={i} style={styles.bar(h, 0.3 + (i * 0.07))} />
             ))}
           </div>
        </div>
        <Globe size={300} style={{ position: "absolute", right: "-60px", bottom: "-100px", opacity: 0.1, transform: "rotate(20deg)", pointerEvents: "none" }} />
      </div>

      {/* Performance Grid */}
      <div style={styles.performanceSlider}>
        {performanceMetrics.map((m, i) => (
          <div key={i} style={styles.performanceCardWrapper}>
            <Card 
              style={{ borderRadius: "24px", border: `1px solid ${colors.border}`, padding: isMobile ? "20px" : "24px", transition: "all 0.3s ease", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", height: "100%" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: `${colors.primaryDark}10`, color: colors.primaryDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {m.icon}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "2px", color: m.isPositive ? colors.success : colors.danger, fontWeight: 700, fontSize: "12px" }}>
                  {m.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {m.change}
                </div>
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: colors.secondary, margin: "0 0 4px 0" }}>{m.label}</p>
              <h4 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{m.value}</h4>
            </Card>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.5fr 1fr", gap: "24px" }}>
        <Card style={{ borderRadius: "24px", border: `1px solid ${colors.border}`, padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: 0 }}>Revenue Trajectory</h3>
              <p style={{ fontSize: "14px", color: colors.textMuted, margin: "4px 0 0 0" }}>Financial performance across all regional terminals.</p>
            </div>
            <Badge variant="success" dot>Real-time</Badge>
          </div>
          <div style={{ height: "300px", backgroundColor: colors.bg, borderRadius: "20px", border: `1px dashed ${colors.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: colors.textMuted, justifyContent: "center" }}>
            <BarChart3 size={40} style={{ opacity: 0.3 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, color: colors.textMain, fontSize: "16px", margin: 0 }}>Temporal Revenue Analysis</p>
              <p style={{ fontSize: "13px", fontWeight: 500, margin: "4px 0 0 0" }}>Live rendering is currently initializing...</p>
            </div>
          </div>
        </Card>

        <Card style={{ borderRadius: "24px", border: `1px solid ${colors.border}`, padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: 0 }}>Market Allocation</h3>
              <p style={{ fontSize: "14px", color: colors.textMuted, margin: "4px 0 0 0" }}>Segmented asset distribution.</p>
            </div>
            <Badge variant="warning" dot>Processing</Badge>
          </div>
           <div style={{ height: "300px", backgroundColor: colors.bg, borderRadius: "20px", border: `1px dashed ${colors.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: colors.textMuted }}>
            <PieChart size={40} style={{ opacity: 0.3 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, color: colors.textMain, fontSize: "16px", margin: 0 }}>Sectorial Yield</p>
              <p style={{ fontSize: "13px", fontWeight: 500, margin: "4px 0 0 0" }}>Processing market segments...</p>
            </div>
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

export default Analytics;
