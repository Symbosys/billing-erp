import React, { useState, useEffect, useMemo } from "react";
import { 
  Settings,
  X,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List as ListIcon,
  Maximize2,
  Package,
  Search,
  ShoppingCart,
  User,
  CreditCard,
  Banknote,
  Zap,
  Trash2,
  Plus,
  Minus,
  Monitor,
  ShieldCheck,
  ArrowRight,
  Wallet
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
    screenContainer: {
      display: "grid",
      gridTemplateColumns: isTablet ? ("1fr" as const) : ("1fr 400px" as const),
      height: isTablet ? ("auto" as const) : ("calc(100vh - 100px)" as const),
      gap: "24px",
      animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
      overflowY: isTablet ? ("visible" as const) : ("auto" as const),
      paddingRight: isTablet ? 0 : ("8px" as const),
    },
    rightPanel: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      position: isTablet ? ("static" as const) : ("sticky" as const),
      top: "80px",
      height: isTablet ? ("auto" as const) : ("100%" as const),
      overflow: "hidden",
    },
    productCard: {
      backgroundColor: "white",
      borderRadius: "20px",
      border: `1px solid ${colors.border}`,
      padding: "20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      borderRadius: "16px",
      backgroundColor: colors.bg,
      marginBottom: "12px",
      border: `1px solid ${colors.border}`,
      transition: "all 0.2s ease",
    },
    paymentBtn: (active: boolean) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "8px",
      padding: "16px",
      borderRadius: "16px",
      border: active ? `2px solid ${colors.primaryDark}` : `1px solid ${colors.border}`,
      backgroundColor: active ? `${colors.primaryDark}08` : "white",
      color: active ? colors.primaryDark : colors.textMuted,
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontWeight: 700,
      fontSize: "11px",
      textTransform: "uppercase" as const,
    })
  };

  return (
    <div style={styles.screenContainer}>
      {/* Products & Discovery */}
      <div style={styles.leftPanel} className="custom-scrollbar">
        {/* Header Bar */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", backgroundColor: colors.primaryDark, color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 10px 15px -3px ${colors.primaryDark}40` }}>
              <Monitor size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 800, color: colors.textMain, letterSpacing: "-0.02em", margin: 0 }}>Terminal <span style={{ color: colors.primaryDark }}>Point</span></h1>
              <p style={{ fontSize: "13px", color: colors.textMuted, fontWeight: 500, margin: 0 }}>Authenticated Session: Global Distribution</p>
            </div>
          </div>
          <div style={{ position: "relative", width: isMobile ? "100%" : "360px" }}>
            <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={18} />
            <input 
              style={{ width: "100%", padding: "12px 16px 12px 48px", borderRadius: "14px", border: `1px solid ${colors.border}`, backgroundColor: "white", outline: "none", fontSize: "14px", fontWeight: 500, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}
              placeholder="Search products or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = colors.primaryDark}
              onBlur={(e) => e.target.style.borderColor = colors.border}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }} className="custom-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ 
                padding: "8px 20px", 
                borderRadius: "12px", 
                backgroundColor: activeCategory === cat ? colors.primaryDark : "white", 
                color: activeCategory === cat ? "white" : colors.textMuted,
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                border: activeCategory === cat ? "none" : `1px solid ${colors.border}`
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr", gap: "20px" }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              style={styles.productCard} 
              onClick={() => addToCart(product)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = colors.primaryDark; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = colors.border; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: `${product.color}10`, color: product.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Package size={20} />
                </div>
                <Badge variant={product.stock > 10 ? "neutral" : "warning"} style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "8px" }}>
                  {product.stock} Units
                </Badge>
              </div>
              <div style={{ marginTop: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{product.name}</h3>
                <p style={{ fontSize: "12px", color: colors.textMuted, marginTop: "2px", fontWeight: 500 }}>{product.category}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain }}>${product.price.toLocaleString()}</span>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", backgroundColor: colors.primaryDark, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div style={styles.rightPanel}>
        <div style={{ padding: "24px", borderBottom: `1px solid ${colors.border}`, backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                <ShoppingCart size={22} style={{ color: colors.primaryDark }} />
                Current Invoice
              </h2>
              <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 600, marginTop: "2px" }}>REF: #INV-2024-8842</p>
            </div>
            <button 
              onClick={() => setCart([])}
              style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: "#fff1f2", color: colors.danger, cursor: "pointer", display: "flex" }}
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div style={{ marginTop: "20px", padding: "12px", borderRadius: "14px", backgroundColor: colors.bg, border: `1px dashed ${colors.border}`, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: colors.primaryDark, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              <User size={18} />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: colors.textMain, margin: 0 }}>Guest Customer</p>
              <p style={{ fontSize: "10px", color: colors.textMuted, fontWeight: 500, margin: 0 }}>Quick Checkout Mode</p>
            </div>
            <ChevronRight size={16} style={{ marginLeft: "auto", color: colors.textMuted }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }} className="custom-scrollbar">
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.2 }}>
              <ShoppingCart size={64} strokeWidth={1.5} />
              <p style={{ marginTop: "16px", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" }}>Cart Empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{item.name}</h4>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: colors.primaryDark, marginTop: "2px" }}>${item.price.toLocaleString()}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: "10px", padding: "4px", border: `1px solid ${colors.border}` }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ border: "none", backgroundColor: "transparent", padding: "2px", cursor: "pointer", color: colors.textMuted }}><Minus size={14} /></button>
                    <span style={{ width: "28px", textAlign: "center", fontWeight: 700, fontSize: "13px", color: colors.textMain }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ border: "none", backgroundColor: "transparent", padding: "2px", cursor: "pointer", color: colors.textMuted }}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div style={{ padding: "24px", backgroundColor: "#f8fafc", borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>
              <span>Subtotal Balance</span>
              <span style={{ color: colors.textMain }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>
              <span>Tax (8%)</span>
              <span style={{ color: colors.textMain }}>${tax.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "28px", fontWeight: 800, color: colors.textMain, marginTop: "8px", letterSpacing: "-0.03em" }}>
              <span>Total</span>
              <span style={{ color: colors.primaryDark }}>${total.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            <button onClick={() => setPaymentMethod("card")} style={styles.paymentBtn(paymentMethod === "card")}>
              <CreditCard size={20} />
              Card
            </button>
            <button onClick={() => setPaymentMethod("cash")} style={styles.paymentBtn(paymentMethod === "cash")}>
              <Wallet size={20} />
              Cash
            </button>
            <button onClick={() => setPaymentMethod("online")} style={styles.paymentBtn(paymentMethod === "online")}>
              <Zap size={20} />
              Online
            </button>
          </div>

          <Button 
            variant="primary" 
            style={{ width: "100%", padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: 700, backgroundColor: colors.primaryDark, boxShadow: `0 8px 15px -3px ${colors.primaryDark}40`, display: "flex", justifyContent: "center", gap: "10px" }}
            disabled={cart.length === 0}
            rightIcon={<ArrowRight size={18} />}
          >
            Authorize Payment
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
          width: 4px;
          height: 4px;
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
