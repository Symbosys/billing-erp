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
  Zap,
  X,
  ChevronRight,
  ChevronLeft
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

  const [invoiceList, setInvoiceList] = useState([
    { id: "INV-2024-001", customer: "Alexander Wright", amount: "$1,200.00", date: "Oct 12, 2024", status: "Paid", method: "Credit Card" },
    { id: "INV-2024-002", customer: "Sophia Chen", amount: "$3,450.50", date: "Oct 14, 2024", status: "Pending", method: "Bank Transfer" },
    { id: "INV-2024-003", customer: "Marcus Miller", amount: "$890.00", date: "Oct 15, 2024", status: "Overdue", method: "PayPal" },
    { id: "INV-2024-004", customer: "Elena Rodriguez", amount: "$2,100.00", date: "Oct 16, 2024", status: "Paid", method: "Credit Card" },
    { id: "INV-2024-005", customer: "David Kim", amount: "$560.25", date: "Oct 18, 2024", status: "Pending", method: "Apple Pay" },
  ]);

  const handleCreateInvoice = () => {
    if (!newInvoice.customer || !newInvoice.amount) return;
    
    const nextId = `INV-2024-${String(invoiceList.length + 1).padStart(3, '0')}`;
    const newEntry = {
      id: nextId,
      customer: newInvoice.customer,
      amount: `$${parseFloat(newInvoice.amount).toLocaleString()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: newInvoice.status,
      method: newInvoice.method
    };

    setInvoiceList([newEntry, ...invoiceList]);
    setIsModalOpen(false);
    setNewInvoice({ customer: "", amount: "", method: "Credit Card", status: "Pending" });
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoiceList(invoiceList.filter(inv => inv.id !== id));
  };

  const handlePrintInvoice = (id: string) => {
    alert(`Initializing print protocol for ${id}...`);
  };

  const handleEmailInvoice = (id: string) => {
    alert(`Despatching digital invoice ${id} to customer email...`);
  };

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
      top: "80px",
      zIndex: 10,
    },
    searchInputWrapper: {
      position: "relative" as const,
      flex: 3,
    },
    searchInput: {
      width: "100%",
      padding: "12px 16px 12px 48px",
      borderRadius: "14px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      outline: "none",
      fontSize: "14px",
      fontWeight: 500,
      transition: "border-color 0.2s",
    },
    tableContainer: {
      overflowX: "auto" as const,
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      backgroundColor: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    },
    table: {
      width: "100%",
      borderCollapse: "separate" as const,
      borderSpacing: 0,
      minWidth: "1000px",
    },
    th: {
      padding: "16px 24px",
      textAlign: "left" as const,
      fontSize: "12px",
      fontWeight: 700,
      color: colors.textMuted,
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: "#f8fafc",
    },
    tr: (isHovered: boolean) => ({
      backgroundColor: isHovered ? "rgba(79, 70, 229, 0.02)" : "transparent",
      transition: "all 0.2s ease",
    }),
    td: {
      padding: "16px 24px",
      borderBottom: `1px solid ${colors.border}`,
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>
            Billing & Invoices
          </h1>
          <p style={styles.subtitle}>Manage enterprise transactions, generate smart invoices, and track revenue.</p>
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
            New Invoice
          </Button>
        </div>
      </div>

      <div style={styles.statsRow}>
        {[
          { label: "Gross Revenue", value: "$124,500", icon: <DollarSign size={22} />, color: colors.primaryDark, change: "+12.5%" },
          { label: "Active Invoices", value: "48", icon: <FileText size={22} />, color: colors.success, change: "+4" },
          { label: "Outstanding", value: "$8,240", icon: <Clock size={22} />, color: colors.warning, change: "-2.1%" },
          { label: "Overdue Claims", value: "$1,120", icon: <AlertCircle size={22} />, color: colors.danger, change: "+0.5%" },
        ].map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div 
              style={styles.statCard(stat.color)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <Badge variant={stat.change.startsWith("+") ? "success" : stat.change.startsWith("-") ? "danger" : "warning"} style={{ fontSize: "10px", fontWeight: 700 }}>{stat.change}</Badge>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted, margin: "0 0 4px 0" }}>{stat.label}</p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.filterBar}>
        <div style={styles.searchInputWrapper}>
          <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={18} />
          <input 
            style={styles.searchInput}
            placeholder="Search by invoice number or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 2 }}>
          <Select 
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as string)}
            options={[
              { label: "All Status", value: "all" }, 
              { label: "Paid", value: "paid" }, 
              { label: "Pending", value: "pending" },
              { label: "Overdue", value: "overdue" }
            ]}
            style={{ borderRadius: "14px", flex: 1 }}
          />
          <Button variant="secondary" leftIcon={<Download size={18} />} style={{ borderRadius: "14px", padding: "12px 20px", backgroundColor: "white", border: `1px solid ${colors.border}`, flex: 1 }}>
            Export
          </Button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Invoice ID", "Customer Entity", "Valuation", "Issued Date", "Status", "Actions"].map((h, i) => (
                <th key={i} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((inv) => (
              <tr 
                key={inv.id} 
                style={styles.tr(hoveredRow === inv.id)}
                onMouseEnter={() => setHoveredRow(inv.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primaryDark }}>
                      <Receipt size={16} />
                    </div>
                    <span style={{ fontWeight: 700, color: colors.textMain, fontSize: "14px" }}>{inv.id}</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div>
                    <h5 style={{ fontWeight: 700, color: colors.textMain, fontSize: "15px", margin: 0 }}>{inv.customer}</h5>
                    <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 600, marginTop: "2px" }}>{inv.method}</p>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: colors.textMain }}>{inv.amount}</span>
                </td>
                <td style={styles.td}>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: colors.textMuted }}>{inv.date}</span>
                </td>
                <td style={styles.td}>
                  <Badge 
                    variant={inv.status === "Paid" ? "success" : inv.status === "Pending" ? "warning" : "danger"} 
                    dot
                    style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 700 }}
                  >
                    {inv.status}
                  </Badge>
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <IconButton icon={<Printer size={16} />} hoverColor={colors.primaryDark} onClick={() => handlePrintInvoice(inv.id)} />
                    <IconButton icon={<Mail size={16} />} hoverColor={colors.primaryDark} onClick={() => handleEmailInvoice(inv.id)} />
                    <IconButton icon={<Trash2 size={16} />} hoverColor={colors.danger} onClick={() => handleDeleteInvoice(inv.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted }}>Displaying last 5 major transactions</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="ghost" leftIcon={<ChevronLeft size={16} />} style={{ borderRadius: "10px", fontSize: "13px" }}>Prev</Button>
            <Button variant="secondary" rightIcon={<ChevronRight size={16} />} style={{ borderRadius: "10px", fontSize: "13px", backgroundColor: "white", border: `1px solid ${colors.border}` }}>Next</Button>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(10px)" }} onClick={() => setIsModalOpen(false)} />
          <div style={{ position: "relative", width: "100%", maxWidth: "540px", backgroundColor: "white", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column", animation: "modalZoomIn 0.3s ease" }}>
            <div style={{ padding: "24px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Generate New Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", display: "flex", padding: "4px", borderRadius: "8px", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}><X size={20} /></button>
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Customer Name / Entity</label>
                <Input 
                  placeholder="e.g. Alexander Wright" 
                  style={{ borderRadius: "12px" }} 
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Billing Amount ($)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    style={{ borderRadius: "12px" }} 
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Payment Method</label>
                  <Select 
                    options={[
                      { label: "Credit Card", value: "Credit Card" },
                      { label: "Bank Transfer", value: "Bank Transfer" },
                      { label: "PayPal", value: "PayPal" },
                      { label: "Apple Pay", value: "Apple Pay" }
                    ]}
                    style={{ borderRadius: "12px" }} 
                    value={newInvoice.method}
                    onChange={(val) => setNewInvoice({...newInvoice, method: val as string})}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain }}>Status Protocol</label>
                <Select 
                  options={[
                    { label: "Pending Execution", value: "Pending" },
                    { label: "Authenticated (Paid)", value: "Paid" }
                  ]}
                  style={{ borderRadius: "12px" }} 
                  value={newInvoice.status}
                  onChange={(val) => setNewInvoice({...newInvoice, status: val as string})}
                />
              </div>
            </div>
            <div style={{ padding: "20px 32px", borderTop: `1px solid ${colors.border}`, backgroundColor: "#f8fafc", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "12px", fontWeight: 600 }}>Cancel</Button>
              <Button variant="primary" onClick={handleCreateInvoice} style={{ borderRadius: "12px", backgroundColor: colors.primaryDark, fontWeight: 600 }}>Generate Invoice</Button>
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
const IconButton: React.FC<{ icon: React.ReactNode, hoverColor: string, onClick?: () => void }> = ({ icon, hoverColor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
    >
      {icon}
    </button>
  );
};

export default Billing;
