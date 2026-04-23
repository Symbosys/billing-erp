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
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    emerald: "#10b981",
    rose: "#f43f5e",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.7)",
    bg: "#f8fafc",
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
    heroCard: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.violet} 100%)`,
      borderRadius: "40px",
      padding: isMobile ? "32px" : "48px",
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
      height: "300px",
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
      marginTop: "24px",
      padding: "20px 0",
    },
    bar: (height: string, opacity: number) => ({
      flex: 1,
      height: height,
      backgroundColor: "white",
      opacity: opacity,
      borderRadius: "6px 6px 0 0",
      transition: "height 1s ease-out",
    })
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
            <Activity size={16} />
            Intelligence Engine
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>Business <span style={{ color: colors.primary }}>Analytics</span></h1>
          <p style={{ color: colors.textMuted, marginTop: "8px", fontWeight: 500, fontSize: "16px" }}>Deep neural insights and predictive modeling for your enterprise growth.</p>
        </div>
        <div style={{ display: "flex", gap: "16px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<RefreshCw size={20} />} style={{ borderRadius: "18px", padding: "16px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button variant="primary" leftIcon={<Download size={22} />} style={{ borderRadius: "18px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)", fontWeight: 800 }}>Export Insights</Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div style={styles.heroCard}>
        <div style={{ zIndex: 1 }}>
          <p style={{ fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.8 }}>System Performance Index</p>
          <h2 style={{ fontSize: isMobile ? "48px" : "64px", fontWeight: 900, margin: "12px 0", letterSpacing: "-0.04em" }}>98.42%</h2>
          <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, opacity: 0.6, textTransform: "uppercase" }}>Efficiency Rate</p>
              <p style={{ fontSize: "20px", fontWeight: 900 }}>+12.4%</p>
            </div>
            <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, opacity: 0.6, textTransform: "uppercase" }}>Growth Velocity</p>
              <p style={{ fontSize: "20px", fontWeight: 900 }}>8.2x</p>
            </div>
          </div>
        </div>
        <div style={{ width: isTablet ? "100%" : "400px", height: "180px", position: "relative", zIndex: 1 }}>
           <div style={styles.chartContainer}>
             {[ "40%", "70%", "50%", "90%", "60%", "100%", "80%", "40%", "60%", "90%" ].map((h, i) => (
               <div key={i} style={styles.bar(h, 0.2 + (i * 0.08))} />
             ))}
           </div>
        </div>
        {/* Background Decorative */}
        <Globe size={300} style={{ position: "absolute", right: "-50px", bottom: "-80px", opacity: 0.05, transform: "rotate(20deg)" }} />
      </div>

      {/* Performance Grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: "28px" }}>
        {performanceMetrics.map((m, i) => (
          <Card key={i} style={{ borderRadius: "28px", border: `1px solid ${colors.border}`, padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                {m.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: m.isPositive ? colors.emerald : colors.rose, fontWeight: 800, fontSize: "13px" }}>
                {m.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {m.change}
              </div>
            </div>
            <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.label}</p>
            <h4 style={{ fontSize: "28px", fontWeight: 900, color: colors.textMain, marginTop: "4px" }}>{m.value}</h4>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.5fr 1fr", gap: "32px" }}>
        <Card title="Revenue Trajectory" subtitle="Aggregated data across all regional terminals." style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, padding: "32px" }}>
          <div style={{ height: "350px", backgroundColor: "#f9fafb", borderRadius: "24px", border: `2px dashed ${colors.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", color: colors.textMuted, justifyContent: "center" }}>
            <BarChart3 size={48} style={{ opacity: 0.2 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 800, color: colors.textMain, fontSize: "18px" }}>Temporal Revenue Analysis</p>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Live rendering is currently initializing...</p>
            </div>
          </div>
        </Card>

        <Card title="Market Allocation" subtitle="Segmented asset distribution." style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, padding: "32px" }}>
           <div style={{ height: "350px", backgroundColor: "#f9fafb", borderRadius: "24px", border: `2px dashed ${colors.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", color: colors.textMuted }}>
            <PieChart size={48} style={{ opacity: 0.2 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 800, color: colors.textMain, fontSize: "18px" }}>Sectorial Yield</p>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Processing market segments...</p>
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
