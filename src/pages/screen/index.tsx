import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  Package,
  Search,
  ShoppingCart,
  User,
  CreditCard,
  Zap,
  Trash2,
  Plus,
  Minus,
  Monitor,
  ArrowRight,
  Wallet,
  ShoppingBag,
  Sparkles,
  Utensils,
  Phone,
  Printer,
  Settings,
  Bell,
  RefreshCw,
  X,
  CheckCircle,
  Clock,
  HelpCircle,
  Split,
  ChevronDown
} from "lucide-react";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Input from "../../components/Input";
import { useTheme } from "../../context/ThemeContext";
import { useProducts, type Product } from "../../config/hooks/useProduct";
import { useCustomers } from "../../config/hooks/useCustomer";
import { useDiningTables } from "../../config/hooks/useDiningTable";
import {
  useCreateBill,
  useBills,
  useUpdateKOTStatus,
  useSettleBill,
  type Bill
} from "../../config/hooks/useBill";

const POSScreen: React.FC = () => {
  const { theme, colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"order" | "kot">("order");
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [kotSearchQuery, setKotSearchQuery] = useState("");
  
  // POS Order State
  const [orderType, setOrderType] = useState<"DINE_IN" | "DELIVERY" | "PICK_UP">("DINE_IN");
  const [selectedTableId, setSelectedTableId] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  
  // Toggles & Options
  const [isBogo, setIsBogo] = useState(false);
  const [isComplimentary, setIsComplimentary] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "UPI" | "OTHER">("CASH");
  const [isPaidChecked, setIsPaidChecked] = useState(true);

  // Time ticks for KOT timers
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetching Data from API
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: customers = [] } = useCustomers();
  const { data: tables = [], isLoading: tablesLoading } = useDiningTables();
  
  // Fetch active pending orders for KOT view
  const { data: pendingBills = [], refetch: refetchBills } = useBills({ billStatus: "PENDING" });

  // Mutations
  const createBillMutation = useCreateBill();
  const updateKOTStatusMutation = useUpdateKOTStatus();
  const settleBillMutation = useSettleBill();

  // Reset order details
  const handleResetOrder = () => {
    setCart([]);
    setSelectedTableId("");
    setGuestsCount(1);
    setSelectedCustomerId("");
    setIsBogo(false);
    setIsComplimentary(false);
    setActiveTab("order");
  };

  // Categories loading
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [products]);

  // Filtered Dishes Grid
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory, products]);

  // Cart operations
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = isComplimentary ? subtotal : isBogo ? (cart.length > 0 ? Math.min(...cart.map(i => i.price)) : 0) : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.05; // 5% GST for restaurants
  const totalAmount = taxableAmount + tax;

  // Handle Send to Kitchen (KOT)
  const handleSendKOT = async (print = false) => {
    if (cart.length === 0) {
      alert("Please select dishes first.");
      return;
    }
    if (orderType === "DINE_IN" && !selectedTableId) {
      alert("Please select a dining table.");
      return;
    }

    try {
      await createBillMutation.mutateAsync({
        customerId: selectedCustomerId || null,
        totalAmount,
        paymentMethod,
        orderType,
        tableId: selectedTableId || null,
        guestsCount,
        billStatus: "PENDING",
        kotStatus: "PENDING",
        isBogo,
        isComplimentary,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
          price: item.price
        }))
      });
      
      alert(print ? "KOT Sent and Ticket Printed Successfully!" : "KOT Sent to Kitchen Successfully!");
      handleResetOrder();
      refetchBills();
    } catch (error) {
      console.error(error);
      alert("Failed to submit KOT. Ensure database is updated.");
    }
  };

  // Handle Save & Settle payment
  const handleSaveAndSettle = async (printReceipt = false) => {
    if (cart.length === 0) {
      alert("Please select dishes first.");
      return;
    }
    if (orderType === "DINE_IN" && !selectedTableId) {
      alert("Please select a dining table.");
      return;
    }

    try {
      // 1. Create order as PENDING first (or settled directly if paid)
      const bill = await createBillMutation.mutateAsync({
        customerId: selectedCustomerId || null,
        totalAmount,
        paymentMethod,
        orderType,
        tableId: selectedTableId || null,
        guestsCount,
        billStatus: isPaidChecked ? "PAID" : "PENDING",
        kotStatus: "SERVED",
        isBogo,
        isComplimentary,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
          price: item.price
        }))
      });

      // 2. If checkout is paid, settle it immediately to free table
      if (isPaidChecked && bill) {
        await settleBillMutation.mutateAsync({
          id: bill.id,
          paymentMethod
        });
      }

      alert(printReceipt ? "Receipt Generated and Printed Successfully!" : "Order Checked Out Successfully!");
      handleResetOrder();
      refetchBills();
    } catch (error) {
      console.error(error);
      alert("Failed to checkout order.");
    }
  };

  // Handle Kitchen Order Updates
  const handleKitchenReady = async (billId: string) => {
    try {
      await updateKOTStatusMutation.mutateAsync({ id: billId, status: "READY" });
      refetchBills();
    } catch (error) {
      console.error(error);
      alert("Failed to update KOT status.");
    }
  };

  const handleCancelKOT = async (billId: string) => {
    if (window.confirm("Are you sure you want to cancel this kitchen order?")) {
      try {
        await updateKOTStatusMutation.mutateAsync({ id: billId, status: "CANCELLED" });
        refetchBills();
      } catch (error) {
        console.error(error);
        alert("Failed to cancel KOT.");
      }
    }
  };

  // Filter KOT board list
  const filteredKOTs = useMemo(() => {
    return pendingBills.filter((bill) => {
      const matchSearch = bill.kotNo?.includes(kotSearchQuery) || 
        bill.table?.tableName.toLowerCase().includes(kotSearchQuery.toLowerCase()) ||
        bill.id.substring(bill.id.length - 4).includes(kotSearchQuery);
      return matchSearch;
    });
  }, [pendingBills, kotSearchQuery]);

  // Helper: format elapsed kitchen prep time
  const getElapsedTime = (createdAtStr: string) => {
    const elapsedMs = new Date().getTime() - new Date(createdAtStr).getTime();
    const totalSecs = Math.floor(elapsedMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const styles = {
    appContainer: {
      display: "flex",
      flexDirection: "column" as const,
      height: "calc(100vh - 120px)",
      gap: "16px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    },
    // Header Style
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1e293b",
      padding: "12px 24px",
      borderRadius: "18px",
      color: "white",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    },
    logo: {
      fontSize: "24px",
      fontWeight: 900,
      color: "#f97316", // Reddish Orange
      letterSpacing: "-0.5px",
      margin: 0
    },
    newOrderBtn: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 16px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.4)",
      transition: "background 0.2s"
    },
    searchBillInput: {
      backgroundColor: "#334155",
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      color: "white",
      fontSize: "13px",
      outline: "none",
      width: "120px"
    },
    supportBox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(255,255,255,0.06)",
      padding: "6px 14px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)",
      fontSize: "13px"
    },
    supportPhone: {
      fontWeight: 700,
      color: "#38bdf8"
    },
    headerIconBtn: {
      backgroundColor: "transparent",
      border: "none",
      color: "#94a3b8",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    },
    // Tabs Navigation
    tabRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: "4px",
      borderRadius: "12px",
      border: `1px solid ${colors.border}`
    },
    tabButton: (active: boolean) => ({
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: active ? (theme === "light" ? "#f1f5f9" : "#334155") : "transparent",
      color: active ? colors.primary : colors.textMuted,
      fontWeight: 700,
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s"
    }),
    backButton: {
      padding: "10px 20px",
      borderRadius: "10px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      color: colors.textMain,
      fontWeight: 700,
      cursor: "pointer"
    },
    // Grid Container
    posBody: {
      display: "grid",
      gridTemplateColumns: "220px 1fr 400px",
      gap: "16px",
      flex: 1,
      minHeight: 0
    },
    sidebarMenu: {
      backgroundColor: colors.card,
      borderRadius: "16px",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      padding: "12px",
      overflowY: "auto" as const,
      gap: "6px"
    },
    categoryBtn: (active: boolean) => ({
      width: "100%",
      textAlign: "left" as const,
      padding: "12px 16px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: active ? colors.primary : "transparent",
      color: active ? "white" : colors.textMain,
      fontWeight: active ? 700 : 500,
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s"
    }),
    dishesContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      minWidth: 0
    },
    dishesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "12px",
      overflowY: "auto" as const,
      flex: 1
    },
    dishCard: {
      backgroundColor: colors.card,
      borderRadius: "14px",
      border: `1.5px solid ${colors.border}`,
      padding: "16px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      height: "100px",
      transition: "all 0.2s",
      boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
    },
    checkoutPanel: {
      backgroundColor: colors.card,
      borderRadius: "18px",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden"
    },
    orderTypeRow: {
      display: "flex",
      borderBottom: `1px solid ${colors.border}`
    },
    orderTypeTab: (active: boolean) => ({
      flex: 1,
      padding: "14px 6px",
      textAlign: "center" as const,
      border: "none",
      backgroundColor: active ? "#f97316" : "transparent",
      color: active ? "white" : colors.textMuted,
      fontWeight: 800,
      fontSize: "12px",
      cursor: "pointer",
      transition: "all 0.2s"
    }),
    // KOT View styles
    kotLegendBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: "12px 20px",
      borderRadius: "12px",
      border: `1px solid ${colors.border}`
    },
    legendIndicator: (color: string) => ({
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "12px",
      fontWeight: 700,
      color: colors.textMuted
    }),
    legendDot: (color: string) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: color
    }),
    kotGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "16px",
      overflowY: "auto" as const,
      flex: 1
    },
    kotCard: {
      backgroundColor: colors.card,
      borderRadius: "16px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden",
      height: "fit-content"
    },
    kotHeader: (type: "DINE_IN" | "DELIVERY" | "PICK_UP") => {
      const bg = type === "DINE_IN" ? "#eab308" : type === "DELIVERY" ? "#f97316" : "#3b82f6";
      return {
        backgroundColor: bg,
        color: "white",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      };
    },
    kotItemRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderBottom: `1px solid ${colors.border}`,
      fontSize: "14px",
      fontWeight: 600,
      color: colors.textMain
    }
  };

  return (
    <div style={styles.appContainer}>
      
      {/* Top Header Section */}
      <div style={styles.header}>
        <div style={styles.logoSection}>
          <h1 style={styles.logo}>Petpooja</h1>
          <button style={styles.newOrderBtn} onClick={handleResetOrder}>New Order</button>
          <div>
            <input 
              style={styles.searchBillInput} 
              placeholder="Q Bill No" 
              value={kotSearchQuery}
              onChange={(e) => setKotSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.supportBox}>
          <Phone size={14} style={{ color: "#38bdf8" }} />
          <span>Call For Support:</span>
          <span style={styles.supportPhone}>9099912483</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button style={styles.headerIconBtn}><Printer size={18} /></button>
          <button style={styles.headerIconBtn}><Settings size={18} /></button>
          <button style={styles.headerIconBtn}><Bell size={18} /></button>
          <button 
            style={{ ...styles.headerIconBtn, color: "#ef4444" }}
            onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* View Switch Tabs */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ ...styles.tabRow, flex: 1 }}>
          <button 
            style={styles.tabButton(activeTab === "order")} 
            onClick={() => setActiveTab("order")}
          >
            <ShoppingCart size={16} /> Order View
          </button>
          <button 
            style={styles.tabButton(activeTab === "kot")} 
            onClick={() => setActiveTab("kot")}
          >
            <Utensils size={16} /> Kot View
          </button>
        </div>
        <button style={styles.backButton} onClick={() => window.history.back()}>Back</button>
      </div>

      {/* Main Content Area */}
      {activeTab === "order" ? (
        <div style={styles.posBody}>
          
          {/* 1. Left Categories Menu */}
          <div style={styles.sidebarMenu}>
            <button 
              style={styles.categoryBtn(activeCategory === "All")}
              onClick={() => setActiveCategory("All")}
            >
              All Items
            </button>
            {categories.filter(c => c !== "All").map((cat) => (
              <button 
                key={cat}
                style={styles.categoryBtn(activeCategory === cat)}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2. Middle Dishes Grid */}
          <div style={styles.dishesContainer}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <Input 
                  leftIcon={<Search size={18} />} 
                  placeholder="Search item..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: "10px", height: "46px" }}
                />
              </div>
              <input 
                placeholder="Short Code"
                style={{ 
                  width: "120px", 
                  borderRadius: "10px", 
                  border: `1.5px solid ${colors.border}`, 
                  backgroundColor: colors.card,
                  padding: "0 12px",
                  color: colors.textMain,
                  fontSize: "14px",
                  fontWeight: 600,
                  outline: "none"
                }}
              />
            </div>

            {productsLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                <RefreshCw size={24} className="animate-spin" style={{ color: colors.primary }} />
              </div>
            ) : (
              <div style={styles.dishesGrid}>
                {filteredProducts.map((dish) => (
                  <div 
                    key={dish.id} 
                    style={styles.dishCard}
                    onClick={() => addToCart(dish)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", fontWeight: 700, color: colors.textMain, lineHeight: 1.3 }}>{dish.name}</h4>
                    <span style={{ fontSize: "16px", fontWeight: 900, color: colors.primary }}>${dish.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Right POS Checkout cart */}
          <div style={styles.checkoutPanel}>
            
            {/* Dine In / Delivery Selector */}
            <div style={styles.orderTypeRow}>
              {(["DINE_IN", "DELIVERY", "PICK_UP"] as const).map((type) => (
                <button 
                  key={type}
                  style={styles.orderTypeTab(orderType === type)}
                  onClick={() => { setOrderType(type); if(type !== "DINE_IN") setSelectedTableId(""); }}
                >
                  {type.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Table / Guest selector */}
            <div style={{ padding: "14px", borderBottom: `1px solid ${colors.border}`, display: "flex", flexDirection: "column", gap: "10px" }}>
              {orderType === "DINE_IN" && (
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <select
                      value={selectedTableId}
                      onChange={(e) => setSelectedTableId(e.target.value)}
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "10px", 
                        border: `1.5px solid ${colors.border}`, 
                        backgroundColor: colors.bg,
                        color: colors.textMain,
                        fontWeight: 700,
                        outline: "none",
                        appearance: "none"
                      }}
                    >
                      <option value="">Select Table</option>
                      {tables.map(t => (
                        <option key={t.id} value={t.id} style={{ color: t.available ? colors.success : colors.danger }}>
                          {t.tableName} ({t.capacity} pax) - {t.available ? "Free" : "Occupied"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: colors.textMuted }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: colors.bg, padding: "4px 10px", borderRadius: "10px", border: `1.5px solid ${colors.border}` }}>
                    <User size={16} style={{ color: colors.textMuted }} />
                    <input 
                      type="number"
                      min={1}
                      max={12}
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Math.max(1, Number(e.target.value)))}
                      style={{ width: "36px", border: "none", backgroundColor: "transparent", textAlign: "center", fontWeight: 700, color: colors.textMain, outline: "none" }}
                    />
                  </div>
                </div>
              )}

              {/* Customer search select */}
              <div style={{ position: "relative" }}>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "10px", 
                    border: `1.5px solid ${colors.border}`, 
                    backgroundColor: colors.bg,
                    color: colors.textMain,
                    fontWeight: 700,
                    outline: "none",
                    appearance: "none"
                  }}
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                  ))}
                </select>
                <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: colors.textMuted }} />
              </div>
            </div>

            {/* Cart Table List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {cart.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.35, color: colors.textMuted }}>
                  <Utensils size={40} style={{ marginBottom: "12px" }} />
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px" }}>No Item Selected</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>Please Select Item from Left Menu Item</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      padding: "8px 10px", 
                      borderBottom: `1.5px solid ${colors.border}`,
                      backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255,255,255,0.02)",
                      borderRadius: "10px",
                      marginBottom: "6px"
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: colors.textMain, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      <span style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "2px" }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: colors.textMuted }}><Minus size={12} /></button>
                      <span style={{ fontWeight: 800, fontSize: "13px", color: colors.textMain, width: "16px", textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: colors.textMuted }}><Plus size={12} /></button>
                    </div>
                    <div style={{ width: "60px", textAlign: "right" }}>
                      <span style={{ fontWeight: 800, fontSize: "13px", color: colors.textMain }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: "none", backgroundColor: "transparent", color: "#f43f5e", cursor: "pointer", paddingLeft: "8px" }}><Trash2 size={14} /></button>
                  </div>
                ))
              )}
            </div>

            {/* Bill Pricing breakdown */}
            <div style={{ padding: "14px", borderTop: `1px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "rgba(255,255,255,0.01)" }}>
              
              {/* Restaurant Special Buttons */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <button 
                  style={{ 
                    flex: 1, 
                    border: isBogo ? "2px solid #f97316" : `1px solid ${colors.border}`,
                    borderRadius: "8px", 
                    backgroundColor: isBogo ? "rgba(249,115,22,0.1)" : colors.card,
                    color: isBogo ? "#f97316" : colors.textMuted,
                    padding: "8px 4px", 
                    fontSize: "11px", 
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                  onClick={() => { setIsBogo(!isBogo); if(isComplimentary) setIsComplimentary(false); }}
                >
                  Bogo Offer
                </button>
                <button 
                  style={{ 
                    flex: 1, 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: "8px", 
                    backgroundColor: colors.card,
                    color: colors.textMuted,
                    padding: "8px 4px", 
                    fontSize: "11px", 
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                  onClick={() => alert("Split Bill Protocol Initialized...")}
                >
                  Split
                </button>
                <button 
                  style={{ 
                    flex: 1, 
                    border: isComplimentary ? "2px solid #10b981" : `1px solid ${colors.border}`,
                    borderRadius: "8px", 
                    backgroundColor: isComplimentary ? "rgba(16,185,129,0.1)" : colors.card,
                    color: isComplimentary ? "#10b981" : colors.textMuted,
                    padding: "8px 4px", 
                    fontSize: "11px", 
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                  onClick={() => { setIsComplimentary(!isComplimentary); if(isBogo) setIsBogo(false); }}
                >
                  Complimentary
                </button>
              </div>

              {/* Payment Methods */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px", marginBottom: "12px" }}>
                {(["CASH", "CARD", "UPI", "OTHER"] as const).map(m => (
                  <button 
                    key={m} 
                    style={{ 
                      padding: "6px", 
                      fontSize: "10px", 
                      fontWeight: 800, 
                      borderRadius: "6px", 
                      border: paymentMethod === m ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
                      backgroundColor: paymentMethod === m ? `${colors.primary}10` : colors.card,
                      color: paymentMethod === m ? colors.primary : colors.textMuted,
                      cursor: "pointer"
                    }}
                    onClick={() => setPaymentMethod(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: colors.textMuted, cursor: "pointer" }}>
                  <input type="checkbox" checked={isPaidChecked} onChange={(e) => setIsPaidChecked(e.target.checked)} />
                  Order is Paid
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: colors.textMuted, cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked />
                  Send Feedback SMS
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, color: colors.textMuted, marginBottom: "4px" }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, color: colors.danger, marginBottom: "4px" }}>
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, color: colors.textMuted, marginBottom: "8px" }}>
                <span>Tax (5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 900, color: colors.textMain }}>
                <span>Total Payable:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions Footer */}
            <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", backgroundColor: colors.bg }}>
              <button 
                style={{ backgroundColor: colors.card, border: `1.5px solid ${colors.border}`, color: colors.textMain, fontWeight: 800, fontSize: "11px", padding: "12px 6px", borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleSaveAndSettle(false)}
              >
                Save
              </button>
              <button 
                style={{ backgroundColor: "#2563eb", border: "none", color: "white", fontWeight: 800, fontSize: "11px", padding: "12px 6px", borderRadius: "10px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.4)" }}
                onClick={() => handleSaveAndSettle(true)}
              >
                Save & Print
              </button>
              <button 
                style={{ backgroundColor: colors.card, border: `1.5px solid ${colors.border}`, color: colors.textMain, fontWeight: 800, fontSize: "11px", padding: "12px 6px", borderRadius: "10px", cursor: "pointer" }}
                onClick={() => alert("Order held successfully.")}
              >
                Hold
              </button>
              <button 
                style={{ gridColumn: "span 2", backgroundColor: "#f97316", border: "none", color: "white", fontWeight: 800, fontSize: "12px", padding: "12px", borderRadius: "10px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                onClick={() => handleSendKOT(false)}
              >
                <Utensils size={14} /> Send KOT
              </button>
              <button 
                style={{ backgroundColor: colors.card, border: `1.5px solid ${colors.border}`, color: colors.textMain, fontWeight: 800, fontSize: "11px", padding: "12px 6px", borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleSendKOT(true)}
              >
                KOT & Print
              </button>
            </div>

          </div>

        </div>
      ) : (
        
        // KOT View tab screen (Kitchen Order Ticket Board)
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, minHeight: 0 }}>
          
          {/* Kitchen Ticket Legend & status search */}
          <div style={styles.kotLegendBar}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={styles.legendIndicator("Dine In")}>
                <div style={styles.legendDot("#eab308")} /> Dine In
              </div>
              <div style={styles.legendIndicator("Delivery")}>
                <div style={styles.legendDot("#f97316")} /> Delivery
              </div>
              <div style={styles.legendIndicator("Pick Up")}>
                <div style={styles.legendDot("#3b82f6")} /> Pick Up
              </div>
            </div>
            
            <div style={{ width: "240px" }}>
              <Input 
                leftIcon={<Search size={16} />} 
                placeholder="Search KOT / Table..." 
                value={kotSearchQuery}
                onChange={(e) => setKotSearchQuery(e.target.value)}
                style={{ borderRadius: "8px", height: "38px", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Board Grid of Kitchen Tickets */}
          {filteredKOTs.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, opacity: 0.35, color: colors.textMuted }}>
              <Utensils size={64} style={{ marginBottom: "16px" }} />
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: "18px" }}>Kitchen Board Clear</h3>
              <p style={{ margin: "4px 0 0 0", fontSize: "13px" }}>No active kitchen orders at this moment.</p>
            </div>
          ) : (
            <div style={styles.kotGrid}>
              {filteredKOTs.map((kot) => (
                <div key={kot.id} style={styles.kotCard}>
                  
                  {/* Yellow/Green/Blue Banner depending on DINE_IN/DELIVERY/PICK_UP */}
                  <div style={styles.kotHeader(kot.orderType)}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>{kot.orderType.replace("_", " ")}</span>
                      <span style={{ fontSize: "16px", fontWeight: 900 }}>
                        {kot.orderType === "DINE_IN" ? kot.table?.tableName || "Dine In" : "Take Away"}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700 }}>KOT No: {kot.kotNo}</span>
                      <span style={{ fontSize: "14px", fontWeight: 900, display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> {getElapsedTime(kot.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* KOT items list */}
                  <div style={{ flex: 1, padding: "8px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px", fontSize: "11px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", borderBottom: `1px solid ${colors.border}` }}>
                      <span>Item</span>
                      <span>Qty</span>
                    </div>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {kot.items?.map((item: any) => (
                        <div key={item.id} style={styles.kotItemRow}>
                          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "12px" }}>
                            {item.product?.name || "Dish Item"}
                          </span>
                          <span style={{ color: colors.primary, fontWeight: 800 }}>{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KOT card actions */}
                  <div style={{ display: "flex", gap: "8px", padding: "12px", borderTop: `1px solid ${colors.border}` }}>
                    <button 
                      onClick={() => handleCancelKOT(kot.id)}
                      style={{ 
                        width: "42px", 
                        height: "42px", 
                        borderRadius: "8px", 
                        border: `1.5px solid ${colors.border}`, 
                        backgroundColor: colors.card, 
                        color: colors.danger, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        cursor: "pointer" 
                      }}
                    >
                      <X size={18} />
                    </button>
                    <button 
                      onClick={() => handleKitchenReady(kot.id)}
                      style={{ 
                        flex: 1, 
                        height: "42px", 
                        borderRadius: "8px", 
                        border: "none", 
                        backgroundColor: "#ef4444", 
                        color: "white", 
                        fontWeight: 800, 
                        fontSize: "13px", 
                        cursor: "pointer", 
                        boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <CheckCircle size={16} /> Food Is Ready
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default POSScreen;
