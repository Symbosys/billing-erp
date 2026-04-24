import React, { useState, useEffect } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  AlertTriangle, 
  Layers,
  ShoppingBag,
  Box,
  Truck,
  Edit,
  Trash2,
  RefreshCw,
  Archive,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  X
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";

const Inventory: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"live" | "inbound">("live");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | string | null>(null);
  const [inboundForm, setInboundForm] = useState({
    name: "",
    qty: "",
    eta: "",
    hub: "a"
  });

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
  };

  const inventoryItems = [
    { id: 1, name: "Premium Wireless Headphones", sku: "WHP-001", category: "Electronics", stock: 45, price: "$299", status: "In Stock", trend: "+12%" },
    { id: 2, name: "Ergonomic Office Chair", sku: "OFF-202", category: "Furniture", stock: 12, price: "$450", status: "Low Stock", trend: "-5%" },
    { id: 3, name: "Mechanical Gaming Keyboard", sku: "GKB-404", category: "Electronics", stock: 89, price: "$120", status: "In Stock", trend: "+18%" },
    { id: 4, name: "Minimalist Desk Lamp", sku: "LMP-303", category: "Decor", stock: 0, price: "$85", status: "Out of Stock", trend: "0%" },
    { id: 5, name: "UltraWide 4K Monitor", sku: "MON-505", category: "Electronics", stock: 8, price: "$799", status: "Low Stock", trend: "+2%" },
  ];

  const inboundStock = [
    { id: "INB-882", item: "Liquid Cooling Kit", qty: 50, source: "Shenzhen Depot", eta: "Oct 24, 2024", status: "In Transit" },
    { id: "INB-883", item: "NVIDIA RTX 4090", qty: 25, source: "Global Logistics", eta: "Oct 25, 2024", status: "Processing" },
    { id: "INB-884", item: "Studio Condenser Mic", qty: 100, source: "Austin Whse", eta: "Oct 22, 2024", status: "Delayed" },
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
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    subtitle: {
      color: colors.textMuted,
      margin: 0,
      fontWeight: 500,
      fontSize: isMobile ? "14px" : "16px"
    },
    tabGroup: {
      display: "flex",
      gap: "4px",
      padding: "4px",
      backgroundColor: "white",
      borderRadius: "16px",
      border: `1px solid ${colors.border}`,
      width: "fit-content",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    },
    tab: (isActive: boolean) => ({
      padding: "8px 20px",
      borderRadius: "12px",
      border: "none",
      backgroundColor: isActive ? colors.primary : "transparent",
      color: isActive ? "white" : colors.textMuted,
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    statsRow: {
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
    statCard: (color: string) => ({
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: "white",
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
    filterBar: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      gap: "16px",
      padding: isMobile ? "16px" : "20px",
      backgroundColor: "white",
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      position: "sticky" as const,
      top: "80px", // Aligned with Navbar height
      zIndex: 10,
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>
            Inventory Matrix
          </h1>
          <p style={styles.subtitle}>Real-time oversight of global assets and inbound logistics.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button 
            variant="secondary" 
            leftIcon={<RefreshCw size={18} />} 
            style={{ borderRadius: "14px", padding: "12px", backgroundColor: "white", border: `1px solid ${colors.border}` }} 
          />
          <Button 
            variant="primary" 
            leftIcon={<Plus size={20} />} 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              borderRadius: "14px", 
              padding: "12px 24px", 
              backgroundColor: colors.primaryDark, 
              boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", 
              fontWeight: 600 
            }}
          >
            New Inbound
          </Button>
        </div>
      </div>

      <div style={styles.statsRow}>
        {[
          { label: "Asset Value", value: "$1.4M", icon: <Layers size={22} />, color: colors.primaryDark, trend: "+8.2%" },
          { label: "Critical Stock", value: "28 SKU", icon: <AlertTriangle size={22} />, color: colors.danger, trend: "-2.1%" },
          { label: "Inbound Flow", value: "156 Unit", icon: <Truck size={22} />, color: colors.info, trend: "+12.5%" },
          { label: "Active Nodes", value: "12 Depot", icon: <MapPin size={22} />, color: colors.warning, trend: "Stable" },
        ].map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div 
              style={styles.statCard(stat.color)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: stat.trend.startsWith("+") ? colors.success : stat.trend.startsWith("-") ? colors.danger : colors.textMuted }}>{stat.trend}</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted, margin: "0 0 4px 0" }}>{stat.label}</p>
                <h4 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={styles.tabGroup}>
        <button style={styles.tab(activeTab === "live")} onClick={() => setActiveTab("live")}>
          <Layers size={16} />
          Live Inventory
        </button>
        <button style={styles.tab(activeTab === "inbound")} onClick={() => setActiveTab("inbound")}>
          <Truck size={16} />
          Inbound Stock
          <span style={{ backgroundColor: activeTab === "inbound" ? "white" : colors.warning, color: activeTab === "inbound" ? colors.primaryDark : "white", padding: "1px 6px", borderRadius: "6px", fontSize: "10px", marginLeft: "4px" }}>3</span>
        </button>
      </div>

      <div style={styles.filterBar}>
        <div style={{ position: "relative", flex: 3 }}>
          <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={18} />
          <input 
            style={{ width: "100%", padding: "12px 16px 12px 48px", borderRadius: "14px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px", fontWeight: 500, transition: "border-color 0.2s" }}
            placeholder={activeTab === "live" ? "Search assets by SKU, ID..." : "Search shipments by ID, source..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 2 }}>
          <Select 
            value={filterCategory}
            onChange={(val) => setFilterCategory(val as string)}
            options={[
              { label: "All Sectors", value: "all" }, 
              { label: "Electronics", value: "elec" }, 
              { label: "Furniture", value: "furn" },
              { label: "Logistics", value: "logi" }
            ]}
            style={{ borderRadius: "14px", flex: 1 }}
          />
          <Button variant="secondary" leftIcon={<Download size={18} />} style={{ borderRadius: "14px", padding: "12px 20px", backgroundColor: "white", border: `1px solid ${colors.border}`, flex: 1 }}>
            Export
          </Button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <Card 
        style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)", overflow: "hidden" }}
      >
        <div style={{ overflowX: "auto" }}>
          {activeTab === "live" ? (
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "1000px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  {["Asset Details", "SKU Identity", "Global Stock", "Valuation", "Status", "Actions"].map((h, i) => (
                    <th key={i} style={{ padding: "16px 24px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${colors.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr 
                    key={item.id} 
                    style={{ borderBottom: `1px solid ${colors.border}`, transition: "background-color 0.3s ease", backgroundColor: hoveredRow === item.id ? "rgba(79, 70, 229, 0.02)" : "transparent" }}
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primaryDark }}>
                          <Box size={20} />
                        </div>
                        <div>
                          <h5 style={{ fontWeight: 700, color: colors.textMain, fontSize: "15px", margin: 0 }}>{item.name}</h5>
                          <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 500, marginTop: "2px" }}>{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <code style={{ fontSize: "12px", fontWeight: 600, backgroundColor: colors.bg, padding: "4px 8px", borderRadius: "6px", color: colors.primaryDark, border: `1px solid ${colors.border}` }}>{item.sku}</code>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain }}>{item.stock}</span>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: item.trend.startsWith("+") ? colors.success : colors.danger }}>{item.trend}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "15px", fontWeight: 700, color: colors.textMain }}>{item.price}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <Badge variant={item.status === "In Stock" ? "success" : item.status === "Low Stock" ? "warning" : "danger"} dot style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 700 }}>{item.status}</Badge>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <IconButton icon={<Edit size={16} />} hoverColor={colors.primaryDark} />
                        <IconButton icon={<Trash2 size={16} />} hoverColor={colors.danger} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa", borderBottom: `1px solid ${colors.border}` }}>
                  {["Shipment ID", "Incoming Asset", "Quantity", "Source Node", "Estimated Arrival", "Current Status"].map((h, i) => (
                    <th key={i} style={{ padding: "28px 32px", textAlign: "left", fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inboundStock.map((shipment) => (
                  <tr 
                    key={shipment.id} 
                    style={{ borderBottom: `1px solid ${colors.border}`, transition: "background-color 0.3s ease", backgroundColor: hoveredRow === shipment.id ? "rgba(79, 70, 229, 0.02)" : "transparent" }}
                    onMouseEnter={() => setHoveredRow(shipment.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ padding: "24px 32px" }}>
                      <span style={{ fontWeight: 800, color: colors.textMain, fontSize: "14px" }}>{shipment.id}</span>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Truck size={18} style={{ color: colors.primary }} />
                        <span style={{ fontWeight: 800, color: colors.textMain, fontSize: "15px" }}>{shipment.item}</span>
                      </div>
                    </td>
                    <td style={{ padding: "24px 32px", fontWeight: 800, color: colors.textMain }}>{shipment.qty} Units</td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMuted, fontWeight: 600, fontSize: "13px" }}>
                        <MapPin size={14} />
                        {shipment.source}
                      </div>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMain, fontWeight: 700, fontSize: "14px" }}>
                        <Calendar size={14} />
                        {shipment.eta}
                      </div>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <Badge 
                        variant={shipment.status === "In Transit" ? "info" : shipment.status === "Processing" ? "warning" : "danger"} 
                        dot 
                        style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 900, borderRadius: "12px" }}
                      >
                        {shipment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={{ padding: "24px 32px", borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>Telemetric Sync: {activeTab === "live" ? "Inventory Node Active" : "Logistics Hub Linked"}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="ghost" style={{ borderRadius: "12px", fontWeight: 700 }}>Previous</Button>
            <Button variant="secondary" style={{ borderRadius: "12px", fontWeight: 700, backgroundColor: "white", border: `1px solid ${colors.border}` }}>Next Sector</Button>
          </div>
        </div>
      </Card>

      {/* Inbound Modal (Inline CSS) */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(10px)" }} onClick={() => setIsModalOpen(false)} />
          <div style={{ position: "relative", width: "100%", maxWidth: "540px", backgroundColor: "white", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column", animation: "modalZoomIn 0.3s ease" }}>
            <div style={{ padding: "24px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>New Inbound Shipment</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", display: "flex", padding: "4px", borderRadius: "8px", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}><X size={20} /></button>
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Product Name / SKU</label>
                <Input 
                  placeholder="e.g. Wireless Headphones" 
                  style={{ borderRadius: "12px" }} 
                  value={inboundForm.name}
                  onChange={(e) => setInboundForm({ ...inboundForm, name: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Quantity</label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    style={{ borderRadius: "12px" }} 
                    value={inboundForm.qty}
                    onChange={(e) => setInboundForm({ ...inboundForm, qty: e.target.value })}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Expected ETA</label>
                  <Input 
                    type="date" 
                    style={{ borderRadius: "12px" }} 
                    value={inboundForm.eta}
                    onChange={(e) => setInboundForm({ ...inboundForm, eta: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Storage Hub</label>
                <Select 
                  options={[{label: "Global Depot Alpha", value: "a"}, {label: "Regional Warehouse Beta", value: "b"}]} 
                  style={{ borderRadius: "12px" }} 
                  value={inboundForm.hub}
                  onChange={(val) => setInboundForm({ ...inboundForm, hub: val as string })}
                />
              </div>
            </div>
            <div style={{ padding: "20px 32px", borderTop: `1px solid ${colors.border}`, backgroundColor: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "12px", fontWeight: 600 }}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "12px", backgroundColor: colors.primaryDark, fontWeight: 600 }}>Create Shipment</Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalZoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Helper component for table action buttons
const IconButton: React.FC<{ icon: React.ReactNode, hoverColor: string }> = ({ icon, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button 
      style={{
        padding: "10px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: isHovered ? `${hoverColor}15` : "transparent",
        color: isHovered ? hoverColor : "#64748b",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </button>
  );
};

export default Inventory;
