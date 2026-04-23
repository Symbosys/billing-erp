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
  Clock
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
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.7)",
    rose: "#f43f5e",
    emerald: "#10b981",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    bg: "#f8fafc",
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
      gap: isMobile ? "32px" : "48px",
      paddingBottom: "60px",
      animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "32px"
    },
    tabGroup: {
      display: "flex",
      gap: "8px",
      padding: "6px",
      backgroundColor: "white",
      borderRadius: "20px",
      border: `1px solid ${colors.border}`,
      width: "fit-content",
      boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
    },
    tab: (isActive: boolean) => ({
      padding: "10px 24px",
      borderRadius: "14px",
      border: "none",
      backgroundColor: isActive ? colors.primary : "transparent",
      color: isActive ? "white" : colors.textMuted,
      fontSize: "13px",
      fontWeight: 800,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    statsRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
      gap: "24px",
    },
    miniStat: (color: string) => ({
      padding: "28px",
      borderRadius: "28px",
      backgroundColor: "white",
      border: `1px solid ${colors.border}`,
      display: "flex",
      gap: "20px",
      alignItems: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(0,0,0,0.01)",
    }),
    iconBox: (color: string) => ({
      width: "56px",
      height: "56px",
      borderRadius: "18px",
      backgroundColor: `${color}10`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `inset 0 0 0 1px ${color}15`,
    }),
    filterBar: {
      display: "flex",
      flexDirection: isTablet ? ("column" as const) : ("row" as const),
      gap: "20px",
      padding: "24px",
      backgroundColor: "white",
      borderRadius: "28px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
      position: "sticky" as const,
      top: "80px",
      zIndex: 10,
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
            <Archive size={16} />
            Supply Chain Intelligence
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>Inventory <span style={{ color: colors.primary }}>Matrix</span></h1>
          <p style={{ color: colors.textMuted, marginTop: "8px", fontWeight: 500, fontSize: "16px" }}>Orchestrating global assets and inbound logistics with real-time telemetry.</p>
        </div>
        <div style={{ display: "flex", gap: "16px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<RefreshCw size={20} />} style={{ borderRadius: "18px", padding: "16px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button 
            variant="primary" 
            leftIcon={<Plus size={22} />} 
            onClick={() => setIsModalOpen(true)}
            style={{ borderRadius: "18px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)", fontWeight: 800 }}
          >
            Create Inbound
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabGroup}>
        <button style={styles.tab(activeTab === "live")} onClick={() => setActiveTab("live")}>
          <Layers size={18} />
          Live Inventory
        </button>
        <button style={styles.tab(activeTab === "inbound")} onClick={() => setActiveTab("inbound")}>
          <Truck size={18} />
          Inbound Stock
          <span style={{ backgroundColor: activeTab === "inbound" ? "white" : colors.amber, color: activeTab === "inbound" ? colors.primary : "white", padding: "2px 8px", borderRadius: "8px", fontSize: "10px" }}>3</span>
        </button>
      </div>

      {/* Stats Mini Grid */}
      <div style={styles.statsRow}>
        {[
          { label: "Asset Value", value: "$1.4M", icon: <Layers size={24} />, color: colors.primary },
          { label: "Critical Stock", value: "28 SKU", icon: <AlertTriangle size={24} />, color: colors.rose },
          { label: "Inbound Flow", value: "156 Unit", icon: <Truck size={24} />, color: colors.violet },
          { label: "Active Nodes", value: "12 Depot", icon: <MapPin size={24} />, color: colors.amber },
        ].map((stat, i) => (
          <div 
            key={i} 
            style={styles.miniStat(stat.color)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.01)"; }}
          >
            <div style={styles.iconBox(stat.color)}>{stat.icon}</div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
              <h4 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, margin: 0 }}>{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div style={styles.filterBar}>
        <div style={{ position: "relative", flex: 2 }}>
          <Search style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={20} />
          <input 
            style={{ width: "100%", padding: "16px 20px 16px 56px", borderRadius: "18px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "15px", fontWeight: 600 }}
            placeholder={activeTab === "live" ? "Search assets by SKU, ID..." : "Search shipments by ID, source..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 1 }}>
          <Select 
            value={filterCategory}
            onChange={(val) => setFilterCategory(val as string)}
            options={[
              { label: "All Sectors", value: "all" }, 
              { label: "Electronics", value: "elec" }, 
              { label: "Furniture", value: "furn" },
              { label: "Logistics", value: "logi" }
            ]}
            style={{ borderRadius: "16px" }}
          />
          <Button variant="secondary" leftIcon={<Download size={20} />} style={{ borderRadius: "16px", padding: "16px 24px", backgroundColor: "white", border: `1px solid ${colors.border}` }}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <Card 
        style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)", overflow: "hidden" }}
      >
        <div style={{ overflowX: "auto" }}>
          {activeTab === "live" ? (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
              <thead>
                <tr style={{ backgroundColor: "#fafafa", borderBottom: `1px solid ${colors.border}` }}>
                  {["Asset Details", "SKU Identity", "Global Stock", "Valuation", "Operational Status", "Actions"].map((h, i) => (
                    <th key={i} style={{ padding: "28px 32px", textAlign: "left", fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>{h}</th>
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
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                          <Box size={22} />
                        </div>
                        <div>
                          <h5 style={{ fontWeight: 800, color: colors.textMain, fontSize: "16px", margin: 0 }}>{item.name}</h5>
                          <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600, marginTop: "2px" }}>{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <code style={{ fontSize: "13px", fontWeight: 700, backgroundColor: "#f1f5f9", padding: "6px 12px", borderRadius: "8px", color: colors.primary }}>{item.sku}</code>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: colors.textMain }}>{item.stock} units</span>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: item.trend.startsWith("+") ? colors.emerald : colors.rose }}>{item.trend}</span>
                      </div>
                    </td>
                    <td style={{ padding: "24px 32px", fontSize: "18px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>{item.price}</td>
                    <td style={{ padding: "24px 32px" }}>
                      <Badge variant={item.status === "In Stock" ? "success" : item.status === "Low Stock" ? "warning" : "danger"} dot style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 900, borderRadius: "12px" }}>{item.status}</Badge>
                    </td>
                    <td style={{ padding: "24px 32px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <IconButton icon={<Edit size={18} />} hoverColor={colors.primary} />
                        <IconButton icon={<Trash2 size={18} />} hoverColor={colors.rose} />
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
          <div style={{ position: "relative", width: "100%", maxWidth: "600px", backgroundColor: "white", borderRadius: "32px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column", animation: "modalZoomIn 0.4s ease" }}>
            <div style={{ padding: "32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.04em" }}>Provision Inbound Stock</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer" }}><RefreshCw size={20} style={{ transform: "rotate(45deg)" }} /></button>
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Asset Identification</label>
                <Input 
                  placeholder="Enter product name or SKU" 
                  style={{ borderRadius: "16px" }} 
                  value={inboundForm.name}
                  onChange={(e) => setInboundForm({ ...inboundForm, name: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Units arriving</label>
                  <Input 
                    type="number" 
                    placeholder="Quantity" 
                    style={{ borderRadius: "16px" }} 
                    value={inboundForm.qty}
                    onChange={(e) => setInboundForm({ ...inboundForm, qty: e.target.value })}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Expected ETA</label>
                  <Input 
                    type="date" 
                    style={{ borderRadius: "16px" }} 
                    value={inboundForm.eta}
                    onChange={(e) => setInboundForm({ ...inboundForm, eta: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Source Logistics Hub</label>
                <Select 
                  options={[{label: "Global Depot A", value: "a"}, {label: "Regional Whse B", value: "b"}]} 
                  style={{ borderRadius: "16px" }} 
                  value={inboundForm.hub}
                  onChange={(val) => setInboundForm({ ...inboundForm, hub: val as string })}
                />
              </div>
            </div>
            <div style={{ padding: "24px 32px", borderTop: `1px solid ${colors.border}`, backgroundColor: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "14px" }}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "14px", backgroundColor: colors.primary }}>Initiate Inbound</Button>
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
