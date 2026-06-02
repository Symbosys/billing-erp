import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ProductWiseReport: React.FC = () => {
  const { colors, theme } = useTheme();
  const [selectedYear, setSelectedYear] = useState("2018");

  // Mock Data mimicking the screenshot
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const reportData = [
    { month: "01", name: "January", amount: 0 },
    { month: "02", name: "February", amount: 0 },
    { month: "03", name: "March", amount: 67.97 },
    { month: "04", name: "April", amount: 0 },
    { month: "05", name: "May", amount: 0 },
    { month: "06", name: "June", amount: 0 },
    { month: "07", name: "July", amount: 0 },
    { month: "08", name: "August", amount: 0 },
    { month: "09", name: "September", amount: 0 },
    { month: "10", name: "October", amount: 0 },
    { month: "11", name: "November", amount: 0 },
    { month: "12", name: "December", amount: 0 },
  ];

  const maxAmount = 80; // For chart scaling

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .chart-bar:hover .tooltip { opacity: 1; visibility: visible; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Reports</h1>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", border: `1px solid ${colors.border}`, borderRadius: "8px", overflow: "hidden", backgroundColor: colors.card }}>
            <span style={{ padding: "8px 12px", fontSize: "14px", fontWeight: 700, color: colors.textMain, backgroundColor: colors.bg, borderRight: `1px solid ${colors.border}` }}>Year</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ padding: "8px 16px", border: "none", outline: "none", backgroundColor: "transparent", color: colors.textMain, fontSize: "14px", fontWeight: 500, appearance: "none" }}
            >
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <button style={{ padding: "8px 20px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, color: colors.textMain, fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.border} onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.bg}>
            Submit
          </button>
        </div>

        {/* Chart Card */}
        <div style={{ backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: 0 }}>Total Paid Orders - Report</h2>
          </div>
          <div style={{ padding: "32px 24px 24px 24px" }}>
            <div style={{ display: "flex", height: "300px", position: "relative" }}>
              
              {/* Y-Axis Labels */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: "16px", borderRight: `1px solid ${colors.border}`, color: colors.textMuted, fontSize: "12px", fontWeight: 600, textAlign: "right", width: "30px" }}>
                {[70, 60, 50, 40, 30, 20, 10, 0].map(val => (
                  <span key={val}>{val}</span>
                ))}
              </div>

              {/* Chart Area */}
              <div style={{ flex: 1, position: "relative", marginLeft: "16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                
                {/* Horizontal Grid Lines */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 0, pointerEvents: "none" }}>
                   {[...Array(8)].map((_, i) => (
                    <div key={i} style={{ width: "100%", height: "1px", backgroundColor: colors.border, opacity: i === 7 ? 0 : 0.5 }} />
                  ))}
                </div>

                {/* Bars */}
                {reportData.map((data) => (
                  <div key={data.month} className="chart-bar" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, zIndex: 1, position: "relative", height: "100%", justifyContent: "flex-end" }}>
                    
                    {/* Tooltip */}
                    {data.amount > 0 && (
                      <div className="tooltip" style={{ position: "absolute", top: `calc(${100 - (data.amount / maxAmount) * 100}% - 35px)`, backgroundColor: "#111827", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", opacity: 1, transition: "opacity 0.2s", zIndex: 10 }}>
                        {data.name}: {data.amount}
                        <div style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #111827" }} />
                      </div>
                    )}

                    {/* Bar */}
                    <div style={{ 
                      width: "40%", 
                      maxWidth: "40px", 
                      minWidth: "20px",
                      height: `${(data.amount / maxAmount) * 100}%`, 
                      backgroundColor: data.amount > 0 ? "#10b981" : "transparent",
                      borderBottom: data.amount === 0 ? `2px solid #10b981` : "none",
                      transition: "height 0.5s ease"
                    }} />

                    {/* X-Axis Label */}
                    <span style={{ marginTop: "12px", fontSize: "11px", fontWeight: 600, color: colors.textMuted }}>
                      {data.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div style={{ backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: 0 }}>Total Paid Orders - Report Data</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a" }}>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: 800, color: colors.textMain }}>Month - Year</th>
                  <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "13px", fontWeight: 800, color: colors.textMain }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((data, idx) => (
                  <tr key={data.month} style={{ borderBottom: idx === reportData.length - 1 ? "none" : `1px solid ${colors.border}`, backgroundColor: theme === "light" ? (idx % 2 === 0 ? "transparent" : "#f8fafc") : (idx % 2 === 0 ? "transparent" : "#0f172a") }}>
                    <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 500, color: colors.textMuted }}>
                      {selectedYear}-{data.month}
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 600, color: colors.textMain }}>
                      ${data.amount === 0 ? "0" : data.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWiseReport;
