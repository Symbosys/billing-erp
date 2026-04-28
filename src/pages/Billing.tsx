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
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { useTheme } from "../context/ThemeContext";
import { useBills, useCreateBill, useDeleteBill } from "../config/hooks/useBill";
import { useCustomers } from "../config/hooks/useCustomer";
import { useProducts } from "../config/hooks/useProduct";
import { useBillItems } from "../config/hooks/useBillItem";

const Billing: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  const { data: bills = [] } = useBills();
  const createBillMutation = useCreateBill();
  const deleteBillMutation = useDeleteBill();
  
  const { data: customers = [] } = useCustomers();
  const { data: products = [] } = useProducts();
  const { data: allBillItems = [] } = useBillItems();
  
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  const [newInvoice, setNewInvoice] = useState({
    customerId: "",
    productId: "",
    quantity: 1 as number | string,
    method: "CARD" as "CASH" | "CARD" | "UPI" | "OTHER",
  });

  const invoiceList = bills.map(bill => ({
    id: bill.id,
    customer: bill.customer?.name || "Unknown",
    amount: `$${bill.totalAmount.toLocaleString()}`,
    date: new Date(bill.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Paid",
    method: bill.paymentMethod
  }));

  const handleCreateInvoice = async () => {
    const qty = Number(newInvoice.quantity);
    if (!newInvoice.customerId || !newInvoice.productId || isNaN(qty) || qty <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    
    const product = products.find(p => p.id === newInvoice.productId);
    if (!product) return;

    const totalAmount = product.price * qty;

    try {
      await createBillMutation.mutateAsync({
        customerId: newInvoice.customerId,
        totalAmount,
        paymentMethod: newInvoice.method,
        items: [{
          productId: newInvoice.productId,
          quantity: qty,
          price: product.price
        }]
      });
      setIsModalOpen(false);
      setNewInvoice({ customerId: "", productId: "", quantity: 1, method: "CARD" });
    } catch (error) {
      console.error("Failed to create bill", error);
      alert("Failed to create invoice (check stock).");
    }
  };

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteBillMutation.mutate(id);
    }
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

  const { theme, colors } = useTheme();


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
    statCard: {
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      transition: "all 0.3s ease",
      boxShadow: "var(--card-shadow)",
    },
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
      backgroundColor: colors.card,
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      boxShadow: "var(--card-shadow)",
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
      backgroundColor: colors.card,
      boxShadow: "var(--card-shadow)",
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
      backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255, 255, 255, 0.02)",
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
            style={{ borderRadius: "14px", padding: "12px", backgroundColor: colors.card, border: `1px solid ${colors.border}` }} 
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
              style={styles.statCard}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = colors.border; }}
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
          <Button variant="secondary" leftIcon={<Download size={18} />} style={{ borderRadius: "14px", padding: "12px 20px", backgroundColor: colors.card, border: `1px solid ${colors.border}`, flex: 1 }}>
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
                    <span style={{ fontWeight: 700, color: colors.textMain, fontSize: "14px" }}>{inv.id.substring(inv.id.length - 6).toUpperCase()}</span>
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
                    <IconButton icon={<FileText size={16} />} hoverColor={colors.primaryDark} onClick={() => setSelectedBillId(inv.id)} />
                    <IconButton icon={<Printer size={16} />} hoverColor={colors.primaryDark} onClick={() => handlePrintInvoice(inv.id)} />
                    <IconButton icon={<Mail size={16} />} hoverColor={colors.primaryDark} onClick={() => handleEmailInvoice(inv.id)} />
                    <IconButton icon={<Trash2 size={16} />} hoverColor={colors.danger} onClick={() => handleDeleteInvoice(inv.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255, 255, 255, 0.02)" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted }}>Displaying last 5 major transactions</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="ghost" leftIcon={<ChevronLeft size={16} />} style={{ borderRadius: "10px", fontSize: "13px" }}>Prev</Button>
            <Button variant="secondary" rightIcon={<ChevronRight size={16} />} style={{ borderRadius: "10px", fontSize: "13px", backgroundColor: colors.card, border: `1px solid ${colors.border}` }}>Next</Button>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(10px)" }} onClick={() => setIsModalOpen(false)} />
          <div style={{ position: "relative", width: "100%", maxWidth: "540px", backgroundColor: colors.card, borderRadius: "24px", border: `1px solid ${colors.border}`, boxShadow: "var(--card-shadow)", display: "flex", flexDirection: "column", animation: "modalZoomIn 0.3s ease" }}>
            <div style={{ padding: "24px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Generate New Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", display: "flex", padding: "4px", borderRadius: "8px", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}><X size={20} /></button>
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Select Customer</label>
                <Select 
                  options={[
                    { label: "Select a customer...", value: "" },
                    ...customers.map(c => ({ label: c.name, value: c.id }))
                  ]}
                  style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, border: `2px solid ${colors.border}` }} 
                  value={newInvoice.customerId}
                  onChange={(val) => setNewInvoice({...newInvoice, customerId: val as string})}
                />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Select Product</label>
                  <Select 
                    options={[
                      { label: "Select a product...", value: "" },
                      ...products.map(p => ({ label: `${p.name} ($${p.price}) - Stock: ${p.stock}`, value: p.id }))
                    ]}
                    style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, border: `2px solid ${colors.border}` }} 
                    value={newInvoice.productId}
                    onChange={(val) => setNewInvoice({...newInvoice, productId: val as string})}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Quantity</label>
                  <Input 
                    type="number" 
                    placeholder="1" 
                    style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, border: `2px solid ${colors.border}` }} 
                    value={newInvoice.quantity}
                    onChange={(e: any) => setNewInvoice({...newInvoice, quantity: e.target.value === "" ? "" : Number(e.target.value)})}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Payment Method</label>
                <Select 
                  options={[
                    { label: "Credit Card", value: "CARD" },
                    { label: "Bank Transfer (UPI)", value: "UPI" },
                    { label: "Cash", value: "CASH" },
                    { label: "Other", value: "OTHER" }
                  ]}
                  style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, border: `2px solid ${colors.border}` }} 
                  value={newInvoice.method}
                  onChange={(val) => setNewInvoice({...newInvoice, method: val as any})}
                />
              </div>
            </div>
            <div style={{ padding: "20px 32px", borderTop: `1px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255, 255, 255, 0.02)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} style={{ borderRadius: "14px", fontWeight: 700 }}>Cancel</Button>
              <Button 
                variant="primary" 
                onClick={handleCreateInvoice} 
                rightIcon={<ArrowRight size={18} />}
                style={{ 
                  borderRadius: "16px", 
                  padding: "14px 28px",
                  backgroundColor: colors.primaryDark, 
                  boxShadow: `0 8px 15px -3px ${colors.primaryDark}40`,
                  fontWeight: 800,
                  fontSize: "14px",
                  opacity: createBillMutation.isPending ? 0.7 : 1,
                  pointerEvents: createBillMutation.isPending ? "none" : "auto"
                }}
              >
                {createBillMutation.isPending ? "Generating..." : "Generate Invoice"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Items Modal */}
      {selectedBillId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(10px)" }} onClick={() => setSelectedBillId(null)} />
          <div style={{ position: "relative", width: "100%", maxWidth: "600px", backgroundColor: colors.card, borderRadius: "24px", border: `1px solid ${colors.border}`, boxShadow: "var(--card-shadow)", display: "flex", flexDirection: "column", animation: "modalZoomIn 0.3s ease" }}>
            <div style={{ padding: "24px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Invoice Items</h2>
              <button onClick={() => setSelectedBillId(null)} style={{ border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", display: "flex", padding: "4px", borderRadius: "8px", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}><X size={20} /></button>
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", paddingBottom: "12px", color: colors.textMuted, fontSize: "12px", borderBottom: `1px solid ${colors.border}` }}>Product</th>
                    <th style={{ textAlign: "center", paddingBottom: "12px", color: colors.textMuted, fontSize: "12px", borderBottom: `1px solid ${colors.border}` }}>Qty</th>
                    <th style={{ textAlign: "right", paddingBottom: "12px", color: colors.textMuted, fontSize: "12px", borderBottom: `1px solid ${colors.border}` }}>Price</th>
                    <th style={{ textAlign: "right", paddingBottom: "12px", color: colors.textMuted, fontSize: "12px", borderBottom: `1px solid ${colors.border}` }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {allBillItems.filter((i: any) => i.billId === selectedBillId).length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: colors.textMuted, fontSize: "14px" }}>No items found for this invoice.</td>
                    </tr>
                  ) : (
                    allBillItems.filter((i: any) => i.billId === selectedBillId).map((item: any) => (
                      <tr key={item.id}>
                        <td style={{ padding: "16px 0", color: colors.textMain, fontWeight: 600, fontSize: "14px", borderBottom: `1px solid ${colors.border}` }}>
                          {item.product?.name || "Unknown Product"}
                        </td>
                        <td style={{ padding: "16px 0", textAlign: "center", color: colors.textMain, fontWeight: 500, fontSize: "14px", borderBottom: `1px solid ${colors.border}` }}>
                          {item.quantity}
                        </td>
                        <td style={{ padding: "16px 0", textAlign: "right", color: colors.textMain, fontWeight: 500, fontSize: "14px", borderBottom: `1px solid ${colors.border}` }}>
                          ${item.price.toLocaleString()}
                        </td>
                        <td style={{ padding: "16px 0", textAlign: "right", color: colors.textMain, fontWeight: 700, fontSize: "14px", borderBottom: `1px solid ${colors.border}` }}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "20px 32px", borderTop: `1px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255, 255, 255, 0.02)", display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" onClick={() => setSelectedBillId(null)} style={{ borderRadius: "14px", fontWeight: 700, padding: "12px 24px", backgroundColor: colors.primaryDark }}>Close</Button>
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
