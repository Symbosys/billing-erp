import React, { useState, useEffect } from "react";
import { 
  Receipt, 
  Search, 
  Plus, 
  Download, 
  DollarSign, 
  FileText, 
  Clock, 
  AlertCircle, 
  Printer, 
  Mail, 
  Trash2, 
  RefreshCw,
  Zap
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";

const Billing: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    amount: "",
    method: "Credit Card",
    status: "Pending"
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
    emerald: "#10b981",
    rose: "#f43f5e",
    amber: "#f59e0b",
    bg: "#f8fafc",
  };

  const invoices = [
    { id: "INV-2024-001", customer: "Alexander Wright", amount: "$1,200.00", date: "Oct 12, 2024", status: "Paid", method: "Credit Card" },
    { id: "INV-2024-002", customer: "Sophia Chen", amount: "$3,450.50", date: "Oct 14, 2024", status: "Pending", method: "Bank Transfer" },
    { id: "INV-2024-003", customer: "Marcus Miller", amount: "$890.00", date: "Oct 15, 2024", status: "Overdue", method: "PayPal" },
    { id: "INV-2024-004", customer: "Elena Rodriguez", amount: "$2,100.00", date: "Oct 16, 2024", status: "Paid", method: "Credit Card" },
    { id: "INV-2024-005", customer: "David Kim", amount: "$560.25", date: "Oct 18, 2024", status: "Pending", method: "Apple Pay" },
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
    statsRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
      gap: "24px",
    },
    statCard: {
      padding: "28px",
      borderRadius: "28px",
      backgroundColor: "white",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
    },
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
    },
    searchInputWrapper: {
      position: "relative" as const,
      flex: 2,
    },
    searchInput: {
      width: "100%",
      padding: "16px 20px 16px 56px",
      borderRadius: "18px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      outline: "none",
      fontSize: "15px",
      fontWeight: 600,
      transition: "all 0.3s ease",
    },
    tableHeader: {
      backgroundColor: "#fafafa",
      borderBottom: `1px solid ${colors.border}`,
    },
    th: {
      padding: "28px 32px",
      textAlign: "left" as const,
      fontSize: "12px",
      fontWeight: 900,
      color: colors.textMuted,
      textTransform: "uppercase" as const,
      letterSpacing: "0.15em",
    },
    tr: (isHovered: boolean) => ({
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: isHovered ? "rgba(79, 70, 229, 0.02)" : "transparent",
      transition: "all 0.3s ease",
    }),
    td: {
      padding: "24px 32px",
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
            <FileText size={16} />
            Financial Ledger
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>Billing & <span style={{ color: colors.primary }}>Invoices</span></h1>
          <p style={{ color: colors.textMuted, marginTop: "8px", fontWeight: 500, fontSize: "16px" }}>Manage enterprise transactions, generate smart invoices, and track global revenue.</p>
        </div>
        <div style={{ display: "flex", gap: "16px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<RefreshCw size={20} />} style={{ borderRadius: "18px", padding: "16px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button 
            variant="primary" 
            leftIcon={<Plus size={22} />} 
            onClick={() => setIsModalOpen(true)}
            style={{ borderRadius: "18px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)", fontWeight: 800 }}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Analytics Snapshot */}
      <div style={styles.statsRow}>
        {[
          { label: "Gross Revenue", value: "$124,500", icon: <DollarSign size={24} />, color: colors.primary, change: "+12.5%" },
          { label: "Active Invoices", value: "48", icon: <FileText size={24} />, color: colors.emerald, change: "+4" },
          { label: "Outstanding", value: "$8,240", icon: <Clock size={24} />, color: colors.amber, change: "-2.1%" },
          { label: "Overdue Claims", value: "$1,120", icon: <AlertCircle size={24} />, color: colors.rose, change: "+0.5%" },
        ].map((stat, i) => (
          <div key={i} style={styles.statCard}>
             <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: `${stat.color}05` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={styles.iconBox(stat.color)}>{stat.icon}</div>
              <Badge variant={stat.change.startsWith("+") ? "success" : "danger"} style={{ fontSize: "10px", fontWeight: 900, borderRadius: "10px" }}>{stat.change}</Badge>
            </div>
            <div style={{ marginTop: "12px" }}>
              <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
              <h3 style={{ fontSize: "28px", fontWeight: 900, color: colors.textMain, margin: "4px 0", letterSpacing: "-0.02em" }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <div style={styles.searchInputWrapper}>
          <Search style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={20} />
          <input 
            style={styles.searchInput}
            placeholder="Search by invoice number or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 1 }}>
          <Select 
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as string)}
            options={[
              { label: "All Status", value: "all" }, 
              { label: "Paid", value: "paid" }, 
              { label: "Pending", value: "pending" },
              { label: "Overdue", value: "overdue" }
            ]}
            style={{ borderRadius: "16px" }}
          />
          <Button variant="secondary" leftIcon={<Download size={20} />} style={{ borderRadius: "16px", padding: "16px 24px", backgroundColor: "white", border: `1px solid ${colors.border}` }}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <Card 
        style={{ borderRadius: "32px", border: `1px solid ${colors.border}`, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)", overflow: "hidden" }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
            <thead>
              <tr style={styles.tableHeader}>
                {["Invoice ID", "Customer Entity", "Valuation", "Issued Date", "Status Protocol", "Actions"].map((h, i) => (
                  <th key={i} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr 
                  key={inv.id} 
                  style={styles.tr(hoveredRow === inv.id)}
                  onMouseEnter={() => setHoveredRow(inv.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                        <Receipt size={18} />
                      </div>
                      <span style={{ fontWeight: 800, color: colors.textMain, fontSize: "14px" }}>{inv.id}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div>
                      <h5 style={{ fontWeight: 800, color: colors.textMain, fontSize: "15px", margin: 0 }}>{inv.customer}</h5>
                      <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 700, textTransform: "uppercase", marginTop: "2px" }}>{inv.method}</p>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "17px", fontWeight: 900, color: colors.textMain }}>{inv.amount}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>{inv.date}</span>
                  </td>
                  <td style={styles.td}>
                    <Badge 
                      variant={inv.status === "Paid" ? "success" : inv.status === "Pending" ? "warning" : "danger"} 
                      dot
                      style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 900, borderRadius: "12px" }}
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <IconButton icon={<Printer size={18} />} hoverColor={colors.primary} />
                      <IconButton icon={<Mail size={18} />} hoverColor={colors.primary} />
                      <IconButton icon={<Trash2 size={18} />} hoverColor={colors.rose} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "24px 32px", borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>Sync: Global Financial Node Active</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="ghost" style={{ borderRadius: "12px", fontWeight: 700 }}>Previous</Button>
            <Button variant="secondary" style={{ borderRadius: "12px", fontWeight: 700, backgroundColor: "white", border: `1px solid ${colors.border}` }}>Next Cycle</Button>
          </div>
        </div>
      </Card>

      {/* Create Invoice Modal (Pure Inline CSS Implementation) */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "16px" : "40px",
          animation: "modalFadeIn 0.3s ease-out",
        }}>
          {/* Backdrop */}
          <div 
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Card */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            borderRadius: "32px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "32px",
              borderBottom: `1px solid ${colors.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>Generate New Invoice</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ padding: "10px", borderRadius: "14px", border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", transition: "all 0.2s ease" }}
              >
                <RefreshCw size={20} style={{ transform: "rotate(45deg)" }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "32px", maxHeight: "70vh", overflowY: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Customer Entity</label>
                  <Input 
                    placeholder="Enter customer name or organization" 
                    value={newInvoice.customer}
                    onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                    style={{ borderRadius: "16px", padding: "16px 20px" }}
                  />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Billing Amount ($)</label>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                      style={{ borderRadius: "16px", padding: "16px 20px" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Payment Method</label>
                    <Select 
                      options={[
                        { label: "Credit Card", value: "Credit Card" },
                        { label: "Bank Transfer", value: "Bank Transfer" },
                        { label: "PayPal", value: "PayPal" },
                        { label: "Apple Pay", value: "Apple Pay" }
                      ]}
                      value={newInvoice.method}
                      onChange={(val) => setNewInvoice({...newInvoice, method: val as string})}
                      style={{ borderRadius: "16px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Initial Status Protocol</label>
                  <Select 
                    options={[
                      { label: "Pending Execution", value: "Pending" },
                      { label: "Authenticated (Paid)", value: "Paid" }
                    ]}
                    value={newInvoice.status}
                    onChange={(val) => setNewInvoice({...newInvoice, status: val as string})}
                    style={{ borderRadius: "16px" }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "24px 32px",
              backgroundColor: "#f8fafc",
              borderTop: `1px solid ${colors.border}`,
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
            }}>
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                style={{ borderRadius: "14px", fontWeight: 800, padding: "14px 28px" }}
              >
                Abort
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setIsModalOpen(false)} 
                style={{ backgroundColor: colors.primary, borderRadius: "14px", fontWeight: 800, padding: "14px 28px", boxShadow: `0 10px 20px -5px ${colors.primary}40` }}
              >
                Generate Invoice
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalZoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Helper component for table action buttons to handle inline hover
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

export default Billing;
