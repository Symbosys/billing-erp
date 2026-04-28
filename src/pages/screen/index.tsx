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
} from "lucide-react";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Input from "../../components/Input";
import { useTheme } from "../../context/ThemeContext";
import { useProducts, type Product } from "../../config/hooks/useProduct";



const POSScreen: React.FC = () => {
  const [cart, setCart] = useState<
    {
      id: string | number;
      name: string;
      price: number;
      qty: number;
      image?: string;
      color?: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "online"
  >("card");
  const [activeCategory, setActiveCategory] = useState("All");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1200;

  const { data: backendProducts, isLoading } = useProducts();
  const productsList = backendProducts || [];

  const categories = useMemo(() => {
    const cats = new Set(productsList.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    return productsList.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, activeCategory, productsList]);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          image: (product as any).image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
          color: (product as any).color || colors.primaryDark,
        },
      ]);
    }
  };

  const updateQty = (id: string | number, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      }),
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const { theme, colors } = useTheme();

  const styles = {
    screenContainer: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "1fr 420px",
      height: isTablet ? "auto" : "calc(100vh - 100px)",
      gap: "24px",
      animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "28px",
      overflowY: isTablet ? ("visible" as const) : ("auto" as const),
      paddingRight: isTablet ? 0 : "8px",
    },
    rightPanel: {
      backgroundColor:
        theme === "light"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(30, 41, 59, 0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "32px",
      border: `1px solid ${theme === "light" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)"}`,
      display: "flex",
      flexDirection: "column" as const,
      boxShadow:
        theme === "light"
          ? "0 20px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255,255,255,1)"
          : "0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      position: isTablet ? ("static" as const) : ("sticky" as const),
      top: "80px",
      height: isTablet ? "auto" : "100%",
      overflow: "hidden",
    },
    productCard: {
      backgroundColor: colors.card,
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      padding: "12px",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex",
      flexDirection: "column" as const,
      position: "relative" as const,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "12px",
      borderRadius: "20px",
      backgroundColor:
        theme === "light"
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(15, 23, 42, 0.6)",
      marginBottom: "12px",
      border: `1px solid ${theme === "light" ? "rgba(226, 232, 240, 0.6)" : "rgba(255, 255, 255, 0.05)"}`,
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
    },
    paymentBtn: (active: boolean) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "8px",
      padding: "16px 8px",
      borderRadius: "20px",
      border: active
        ? `2px solid ${colors.primaryDark}`
        : `2px solid transparent`,
      backgroundColor: active
        ? theme === "dark"
          ? "rgba(79, 70, 229, 0.15)"
          : "rgba(79, 70, 229, 0.05)"
        : theme === "light"
          ? "#f1f5f9"
          : "rgba(255,255,255,0.03)",
      color: active ? colors.primaryDark : colors.textMuted,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      fontWeight: 800,
      fontSize: "12px",
      boxShadow: active ? `0 8px 16px -4px ${colors.primaryDark}30` : "none",
    }),
  };

  return (
    <div style={styles.screenContainer}>
      {/* Products & Discovery */}
      <div style={styles.leftPanel} className="custom-scrollbar">
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  backgroundColor: colors.primaryDark,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 12px 24px -6px ${colors.primaryDark}60`,
                  zIndex: 2,
                  position: "relative",
                }}
              >
                <Monitor size={32} strokeWidth={2.5} />
              </div>
              <div
                className="pulse-ring"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  backgroundColor: colors.primaryDark,
                  zIndex: 1,
                }}
              ></div>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: colors.textMain,
                  letterSpacing: "-0.03em",
                  margin: "0 0 4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Terminal <span style={{ color: colors.primaryDark }}>Pro</span>
                <Sparkles
                  size={20}
                  style={{ color: "#f59e0b" }}
                  className="spin-slow"
                />
              </h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                ></div>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textMuted,
                    fontWeight: 700,
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Global Distribution Sync
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: isMobile ? "100%" : "380px" }}>
            <Input
              leftIcon={<Search size={20} strokeWidth={2.5} />}
              placeholder="Search products, brands, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "20px",
                height: "60px",
                fontSize: "15px",
                fontWeight: 600,
                backgroundColor: colors.input,
                borderColor: colors.border,
                boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
              }}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            paddingBottom: "8px",
          }}
          className="custom-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="cat-btn"
              style={{
                padding: "12px 24px",
                borderRadius: "16px",
                backgroundColor:
                  activeCategory === cat ? colors.primaryDark : colors.card,
                color: activeCategory === cat ? "white" : colors.textMuted,
                fontWeight: 800,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                border:
                  activeCategory === cat
                    ? "1px solid transparent"
                    : `1px solid ${colors.border}`,
                boxShadow:
                  activeCategory === cat
                    ? `0 8px 16px -4px ${colors.primaryDark}40`
                    : "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product, index) => {
              const productImage = (product as any).image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
              const productColor = (product as any).color || colors.primaryDark;
              
              return (
                <div
                  key={product.id}
                  style={{
                    ...styles.productCard,
                    animationDelay: `${index * 0.05}s`,
                  }}
                  className="pos-card fade-in-up"
                  onClick={() => addToCart(product)}
                >
                  <div
                    style={{
                      height: "180px",
                      width: "100%",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px",
                      backgroundColor: theme === "light" ? "#f1f5f9" : "#1e293b",
                    }}
                  >
                    <img
                      src={productImage}
                      alt={product.name}
                      className="product-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)",
                        opacity: 0.8,
                        transition: "opacity 0.3s ease",
                      }}
                      className="img-overlay"
                    />

                    {/* Badges overlaid on image */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        right: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: productColor,
                          display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Package size={18} strokeWidth={2.5} />
                  </div>
                  <Badge
                    variant={product.stock > 10 ? "neutral" : "warning"}
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "6px 10px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: product.stock > 10 ? "#0f172a" : "#d97706",
                      border: "none",
                      backdropFilter: "blur(4px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {product.stock} Left
                  </Badge>
                </div>

                {/* Quick Add Button that slides up on hover */}
                <div
                  className="quick-add"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    transform: "translateY(150%)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: productColor,
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      fontWeight: 800,
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: `0 8px 16px ${productColor}60`,
                    }}
                  >
                    <ShoppingCart size={14} strokeWidth={3} />
                    QUICK ADD
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px 8px 8px 8px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: productColor,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  {product.category}
                </p>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    color: colors.textMain,
                    margin: "0 0 16px 0",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {product.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        color: colors.textMuted,
                        fontWeight: 700,
                        margin: "0 0 2px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Unit Price
                    </p>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: 900,
                        color: colors.textMain,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="add-btn"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor:
                        theme === "light"
                          ? "#f1f5f9"
                          : "rgba(255,255,255,0.05)",
                      color: colors.textMain,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        )}
      </div>

      {/* Cart & Checkout */}
      <div style={styles.rightPanel}>
        <div
          style={{
            padding: "28px",
            borderBottom: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: colors.textMain,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor:
                      theme === "light" ? "#f1f5f9" : "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBag
                    size={20}
                    style={{ color: colors.primaryDark }}
                    strokeWidth={2.5}
                  />
                </div>
                Current Order
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: colors.textMuted,
                  }}
                ></span>
                <p
                  style={{
                    fontSize: "12px",
                    color: colors.textMuted,
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  INV-2024-8842
                </p>
              </div>
            </div>
            <button
              onClick={() => setCart([])}
              className="clear-cart-btn"
              style={{
                padding: "10px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "transparent",
                color: colors.textMuted,
                cursor: "pointer",
                display: "flex",
                transition: "all 0.2s",
              }}
            >
              <Trash2 size={20} strokeWidth={2} />
            </button>
          </div>

          <div
            className="customer-row"
            style={{
              marginTop: "24px",
              padding: "14px",
              borderRadius: "16px",
              backgroundColor: theme === "light" ? "white" : "rgba(0,0,0,0.2)",
              border: `1px dashed ${colors.border}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                flexShrink: 0,
                borderRadius: "12px",
                backgroundColor: colors.primaryDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: `0 4px 12px ${colors.primaryDark}40`,
              }}
            >
              <User size={20} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: colors.textMain,
                  margin: "0 0 2px 0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Walk-in Customer
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: colors.textMuted,
                  fontWeight: 600,
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Quick Checkout Mode
              </p>
            </div>
            <div
              style={{
                width: "28px",
                height: "28px",
                flexShrink: 0,
                borderRadius: "8px",
                backgroundColor:
                  theme === "light" ? "#f1f5f9" : "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
              }}
            >
              <ChevronRight
                size={16}
                style={{ color: colors.textMuted }}
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>

        <div
          style={{ flex: 1, overflowY: "auto", padding: "24px" }}
          className="custom-scrollbar"
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                opacity: 0.4,
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "24px",
                  backgroundColor:
                    theme === "light" ? "#f1f5f9" : "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <ShoppingBag
                  size={40}
                  strokeWidth={1.5}
                  style={{ color: colors.textMuted }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: "16px",
                  color: colors.textMain,
                  letterSpacing: "-0.01em",
                }}
              >
                Your cart is empty
              </p>
              <p
                style={{
                  marginTop: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: colors.textMuted,
                }}
              >
                Scan or select products to begin
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="cart-row fade-in-up"
                  style={{
                    ...styles.cartItem,
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      backgroundColor:
                        theme === "light" ? "#f1f5f9" : "#1e293b",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "100%",
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: colors.textMain,
                        margin: "0 0 4px 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 900,
                        color: colors.textMain,
                        margin: 0,
                      }}
                    >
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor:
                        theme === "light" ? "white" : "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: "4px",
                      border: `1px solid ${colors.border}`,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                    }}
                  >
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="qty-btn"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: colors.textMuted,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span
                      style={{
                        width: "32px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: "14px",
                        color: colors.textMain,
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="qty-btn"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: colors.textMuted,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        <div
          style={{
            padding: "28px",
            backgroundColor:
              theme === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)",
            borderTop: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              <span>Subtotal</span>
              <span style={{ color: colors.textMain }}>
                $
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              <span>Tax Rate (8%)</span>
              <span style={{ color: colors.textMain }}>
                ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: colors.border,
                margin: "8px 0",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: colors.textMuted,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 4px 0",
                  }}
                >
                  Total Amount
                </p>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 900,
                    color: colors.textMain,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
              <Badge
                variant="success"
                style={{
                  padding: "6px 12px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  fontSize: "12px",
                }}
              >
                READY
              </Badge>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
            <button
              onClick={() => setPaymentMethod("card")}
              style={styles.paymentBtn(paymentMethod === "card")}
            >
              <CreditCard size={22} strokeWidth={2} />
              CARD
            </button>
            <button
              onClick={() => setPaymentMethod("cash")}
              style={styles.paymentBtn(paymentMethod === "cash")}
            >
              <Wallet size={22} strokeWidth={2} />
              CASH
            </button>
            <button
              onClick={() => setPaymentMethod("online")}
              style={styles.paymentBtn(paymentMethod === "online")}
            >
              <Zap size={22} strokeWidth={2} />
              ONLINE
            </button>
          </div>

          <Button
            variant="primary"
            className="checkout-btn"
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              fontSize: "16px",
              fontWeight: 800,
              backgroundColor: colors.primaryDark,
              boxShadow:
                cart.length > 0
                  ? `0 16px 32px -8px ${colors.primaryDark}60, inset 0 2px 0 rgba(255,255,255,0.2)`
                  : "none",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              opacity: cart.length === 0 ? 0.5 : 1,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            disabled={cart.length === 0}
            rightIcon={<ArrowRight size={20} strokeWidth={3} />}
          >
            AUTHORIZE PAYMENT
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .pulse-ring {
          animation: pulseRing 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        .pos-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.1) !important;
          border-color: ${colors.primaryDark} !important;
        }
        .pos-card:hover .product-img {
          transform: scale(1.1) rotate(2deg);
        }
        .pos-card:hover .img-overlay {
          opacity: 0.6 !important;
        }
        .pos-card:hover .quick-add {
          transform: translateY(0) !important;
        }
        .pos-card:hover .add-btn {
          background-color: ${colors.primaryDark} !important;
          color: white !important;
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 8px 16px ${colors.primaryDark}40;
        }
        .cart-row:hover {
          transform: scale(1.02) translateX(4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.06) !important;
          border-color: ${colors.primaryDark} !important;
        }
        .qty-btn:hover {
          background-color: ${theme === "light" ? "#f1f5f9" : "rgba(255,255,255,0.1)"} !important;
          color: ${colors.primaryDark} !important;
        }
        .clear-cart-btn:hover {
          background-color: #fff1f2 !important;
          color: #e11d48 !important;
          transform: scale(1.1);
        }
        .customer-row:hover {
          border-color: ${colors.primaryDark} !important;
          background-color: ${theme === "light" ? "#f8fafc" : "rgba(255,255,255,0.05)"} !important;
        }
        .checkout-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -8px ${colors.primaryDark}80, inset 0 2px 0 rgba(255,255,255,0.2) !important;
          filter: brightness(1.1);
        }
        .checkout-btn:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 8px 16px -8px ${colors.primaryDark}80 !important;
        }
        .cat-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default POSScreen;
