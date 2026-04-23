import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  ShoppingCart, 
  User, 
  CreditCard, 
  Banknote, 
  Zap, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight,
  Monitor,
  X,
  History,
  LayoutGrid,
  List as ListIcon,
  ShieldCheck,
  Package,
  ArrowRight,
  Wallet,
  Settings
} from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "Premium Wireless Headphones", price: 299, category: "Electronics", color: "#4f46e5", stock: 45 },
  { id: 2, name: "Ergonomic Office Chair", price: 450, category: "Furniture", color: "#10b981", stock: 12 },
  { id: 3, name: "Mechanical Gaming Keyboard", price: 120, category: "Electronics", color: "#f43f5e", stock: 89 },
  { id: 4, name: "Minimalist Desk Lamp", price: 85, category: "Decor", color: "#f59e0b", stock: 32 },
  { id: 5, name: "UltraWide 4K Monitor", price: 799, category: "Electronics", color: "#8b5cf6", stock: 8 },
  { id: 6, name: "Leather Journal", price: 35, category: "Stationery", color: "#ec4899", stock: 120 },
  { id: 7, name: "Bluetooth Speaker", price: 150, category: "Electronics", color: "#06b6d4", stock: 54 },
  { id: 8, name: "Standing Desk", price: 550, category: "Furniture", color: "#10b981", stock: 15 },
];

const POSScreen: React.FC = () => {
  const [cart, setCart] = useState<{ id: number, name: string, price: number, qty: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "online">("card");
  const [activeCategory, setActiveCategory] = useState("All");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1200;

  const categories = ["All", "Electronics", "Furniture", "Decor", "Stationery"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      (activeCategory === "All" || p.category === activeCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory]);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const colors = {
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.7)",
    bg: "#f8fafc",
    cardBg: "#ffffff",
    indigo: "#6366f1",
    emerald: "#10b981",
    rose: "#f43f5e",
    amber: "#f59e0b",
  };

  const styles = {
    screenContainer: {
      display: "grid",
      gridTemplateColumns: isTablet ? ("1fr" as const) : ("1fr 440px" as const),
      height: isTablet ? ("auto" as const) : ("calc(100vh - 120px)" as const),
      gap: "32px",
      animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "32px",
      overflowY: isTablet ? ("visible" as const) : ("auto" as const),
      paddingRight: isTablet ? 0 : ("12px" as const),
    },
    rightPanel: {
      backgroundColor: "white",
      borderRadius: "40px",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      boxShadow: "0 20px 50px -20px rgba(0,0,0,0.08)",
      position: isTablet ? ("static" as const) : ("sticky" as const),
      top: "80px",
      height: isTablet ? ("auto" as const) : ("100%" as const),
      overflow: "hidden",
    },
    productCard: (color: string) => ({
      backgroundColor: "white",
      borderRadius: "28px",
      border: `1px solid ${colors.border}`,
      padding: "24px",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      position: "relative" as const,
      overflow: "hidden",
    }),
    cartItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "24px",
      backgroundColor: colors.bg,
      marginBottom: "16px",
      border: `1px solid ${colors.border}`,
      transition: "all 0.3s ease",
    },
    paymentBtn: (active: boolean) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "10px",
      padding: "20px",
      borderRadius: "20px",
      border: active ? `2px solid ${colors.primary}` : `2px solid ${colors.border}`,
      backgroundColor: active ? `${colors.primary}05` : "white",
      color: active ? colors.primary : colors.textMuted,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      fontWeight: 900,
      fontSize: "12px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
    })
  };

  return (
    <div style={styles.screenContainer}>
      {/* Products & Discovery */}
      <div style={styles.leftPanel} className="custom-scrollbar">
        {/* Header Bar */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "20px", backgroundColor: colors.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -8px ${colors.primary}60` }}>
              <Monitor size={32} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.emerald, fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                <ShieldCheck size={14} />
                Secure Terminal
              </div>
              <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: "2px 0" }}>Point of <span style={{ color: colors.primary }}>Sale</span></h1>
            </div>
          </div>
          <div style={{ position: "relative", width: isMobile ? "100%" : "420px" }}>
            <Search style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={22} />
            <input 
              style={{ width: "100%", padding: "18px 24px 18px 60px", borderRadius: "24px", border: `1px solid ${colors.border}`, backgroundColor: "white", outline: "none", fontSize: "16px", fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
              placeholder="Search assets by name or SKU code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px" }} className="custom-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ 
                padding: "12px 28px", 
                borderRadius: "16px", 
                backgroundColor: activeCategory === cat ? colors.primary : "white", 
                color: activeCategory === cat ? "white" : colors.textMuted,
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: activeCategory === cat ? `0 8px 20px -6px ${colors.primary}40` : "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                border: activeCategory === cat ? "none" : `1px solid ${colors.border}`
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr", gap: "28px" }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              style={styles.productCard(product.color)} 
              onClick={() => addToCart(product)}
              className="pos-card"
            >
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: `${product.color}05`, pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: `${product.color}10`, color: product.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `inset 0 0 0 1px ${product.color}15` }}>
                    <Package size={24} />
                  </div>
                  <Badge variant={product.stock > 10 ? "neutral" : "warning"} style={{ fontSize: "11px", padding: "6px 12px", borderRadius: "10px" }}>
                    {product.stock} in stock
                  </Badge>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>{product.name}</h3>
                  <p style={{ fontSize: "13px", color: colors.textMuted, marginTop: "4px", fontWeight: 600 }}>{product.category}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "16px" }}>
                  <span style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.03em" }}>${product.price.toLocaleString()}</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: colors.primary, color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 16px -4px ${colors.primary}40` }}>
                    <Plus size={22} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div style={styles.rightPanel}>
        <div style={{ padding: "32px", borderBottom: `1px solid ${colors.border}`, backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, display: "flex", alignItems: "center", gap: "12px", letterSpacing: "-0.04em" }}>
                <ShoppingCart size={26} style={{ color: colors.primary }} />
                Current Invoice
              </h2>
              <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600, marginTop: "4px" }}>Order Reference: #INV-2024-8842</p>
            </div>
            <button 
              onClick={() => setCart([])}
              style={{ padding: "10px", borderRadius: "12px", border: "none", backgroundColor: "#fff1f2", color: colors.rose, cursor: "pointer", display: "flex" }}
            >
              <Trash2 size={20} />
            </button>
          </div>
          
          <div style={{ marginTop: "24px", padding: "16px", borderRadius: "20px", backgroundColor: colors.bg, border: `1px dashed ${colors.border}`, display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary, boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}>
              <User size={20} />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: colors.textMain }}>Assign Customer</p>
              <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 600 }}>Guest Account Mode</p>
            </div>
            <ChevronRight size={18} style={{ marginLeft: "auto", color: colors.textMuted }} />
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }} className="custom-scrollbar">
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.15 }}>
              <ShoppingCart size={80} strokeWidth={1} />
              <p style={{ marginTop: "20px", fontWeight: 900, fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Terminal Idle</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.cartItem} className="cart-row">
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.01em" }}>{item.name}</h4>
                  <p style={{ fontSize: "13px", fontWeight: 800, color: colors.primary, marginTop: "4px" }}>${item.price.toLocaleString()}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: "12px", padding: "6px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", border: `1px solid ${colors.border}` }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ border: "none", backgroundColor: "transparent", padding: "4px", cursor: "pointer", color: colors.textMuted }}><Minus size={16} /></button>
                    <span style={{ width: "36px", textAlign: "center", fontWeight: 900, fontSize: "14px", color: colors.textMain }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ border: "none", backgroundColor: "transparent", padding: "4px", cursor: "pointer", color: colors.textMuted }}><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div style={{ padding: "32px", backgroundColor: "#fafafa", borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, color: colors.textMuted }}>
              <span>Subtotal Balance</span>
              <span style={{ color: colors.textMain }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, color: colors.textMuted }}>
              <span>Taxation Protocol (8%)</span>
              <span style={{ color: colors.textMain }}>${tax.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "32px", fontWeight: 900, color: colors.textMain, marginTop: "12px", letterSpacing: "-0.04em" }}>
              <span>Payable</span>
              <span style={{ color: colors.primary }}>${total.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <button onClick={() => setPaymentMethod("card")} style={styles.paymentBtn(paymentMethod === "card")}>
              <CreditCard size={24} />
              Network Card
            </button>
            <button onClick={() => setPaymentMethod("cash")} style={styles.paymentBtn(paymentMethod === "cash")}>
              <Wallet size={24} />
              Liquid Asset
            </button>
            <button onClick={() => setPaymentMethod("online")} style={styles.paymentBtn(paymentMethod === "online")}>
              <Zap size={24} />
              Flash Transfer
            </button>
          </div>

          <Button 
            variant="primary" 
            style={{ width: "100%", padding: "24px", borderRadius: "24px", fontSize: "18px", fontWeight: 900, backgroundColor: colors.primary, boxShadow: `0 12px 30px -10px ${colors.primary}60`, display: "flex", justifyContent: "center", gap: "12px" }}
            disabled={cart.length === 0}
            rightIcon={<ArrowRight size={22} />}
          >
            Authorize Settlement
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pos-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.15) !important;
          border-color: #4f46e5 !important;
        }
        .cart-row:hover {
          background-color: white !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transform: scale(1.02);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default POSScreen;
