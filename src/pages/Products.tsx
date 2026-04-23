import React, { useState, useEffect, useMemo } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Tag, 
  Layers, 
  Box,
  Image as ImageIcon,
  MoreVertical,
  Edit,
  Trash2,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  List as ListIcon,
  Maximize2
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Select from "../components/Select";

const Products: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

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
    bg: "#f8fafc",
  };

  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: "$299.00", category: "Electronics", brand: "Sony", stock: 45, rating: 4.8, sales: "1.2k" },
    { id: 2, name: "Ergonomic Office Chair", price: "$450.00", category: "Furniture", brand: "Herman Miller", stock: 12, rating: 4.9, sales: "840" },
    { id: 3, name: "Mechanical Gaming Keyboard", price: "$120.00", category: "Electronics", brand: "Keychron", stock: 89, rating: 4.7, sales: "2.4k" },
    { id: 4, name: "Minimalist Desk Lamp", price: "$85.00", category: "Decor", brand: "IKEA", stock: 32, rating: 4.5, sales: "560" },
    { id: 5, name: "UltraWide 4K Monitor", price: "$799.00", category: "Electronics", brand: "Dell", stock: 8, rating: 4.9, sales: "320" },
    { id: 6, name: "Leather Travel Journal", price: "$45.00", category: "Stationery", brand: "Moleskine", stock: 120, rating: 4.6, sales: "1.8k" },
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
    filterBar: {
      display: "flex",
      flexDirection: isTablet ? ("column" as const) : ("row" as const),
      gap: "20px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "28px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
      alignItems: "center",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
      gap: "32px",
    },
    productCard: {
      borderRadius: "32px",
      border: `1px solid ${colors.border}`,
      backgroundColor: "white",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      overflow: "hidden",
      position: "relative" as const,
      cursor: "pointer",
    },
    imageSection: {
      height: "240px",
      backgroundColor: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative" as const,
      borderBottom: `1px solid ${colors.border}`,
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: colors.primary, fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
            <Box size={16} />
            Master Catalog
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.04em", margin: 0 }}>Product <span style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Architecture</span></h1>
          <p style={{ color: colors.textMuted, marginTop: "8px", fontWeight: 500, fontSize: "16px" }}>Curating and managing high-performance global assets and inventory.</p>
        </div>
        <div style={{ display: "flex", gap: "16px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<Download size={20} />} style={{ borderRadius: "18px", padding: "16px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button variant="primary" leftIcon={<Plus size={22} />} style={{ borderRadius: "18px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)", fontWeight: 800 }}>New Asset</Button>
        </div>
      </div>

      {/* Filter & View Bar */}
      <div style={styles.filterBar}>
        <div style={{ position: "relative", flex: 1, width: "100%" }}>
          <Search style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={20} />
          <input 
            style={{ width: "100%", padding: "16px 20px 16px 56px", borderRadius: "20px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "15px", fontWeight: 600 }}
            placeholder="Query products by name, brand, or sector identity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div style={{ display: "flex", gap: "12px", width: isTablet ? "100%" : "auto", justifyContent: "space-between" }}>
          <div style={{ width: isMobile ? "100%" : "200px" }}>
            <Select 
              value="all"
              onChange={() => {}}
              options={[{ label: "All Sectors", value: "all" }, { label: "Premium", value: "p" }, { label: "Standard", value: "s" }]}
              style={{ borderRadius: "16px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px", padding: "6px", backgroundColor: colors.bg, borderRadius: "16px", border: `1px solid ${colors.border}` }}>
            <button 
              onClick={() => setViewMode("grid")}
              style={{ padding: "10px", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "grid" ? "white" : "transparent", color: viewMode === "grid" ? colors.primary : colors.textMuted, boxShadow: viewMode === "grid" ? "0 4px 10px rgba(0,0,0,0.05)" : "none", transition: "all 0.3s ease" }}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              style={{ padding: "10px", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "list" ? "white" : "transparent", color: viewMode === "list" ? colors.primary : colors.textMuted, boxShadow: viewMode === "list" ? "0 4px 10px rgba(0,0,0,0.05)" : "none", transition: "all 0.3s ease" }}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={styles.productCard}
            className="group"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-12px)";
              e.currentTarget.style.boxShadow = "0 30px 60px -20px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = colors.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            {/* Image Placeholder */}
            <div style={styles.imageSection}>
              <ImageIcon size={64} style={{ color: "#e2e8f0" }} />
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <Badge variant="neutral" style={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: "8px 16px", borderRadius: "12px", fontWeight: 800 }}>
                  {product.category}
                </Badge>
              </div>
              <div style={{ position: "absolute", top: "20px", left: "20px" }}>
                <div style={{ padding: "8px", borderRadius: "12px", backgroundColor: "white", color: colors.primary, display: "flex", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>

            <div style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em", margin: 0 }}>{product.name}</h3>
                  <p style={{ fontSize: "14px", color: colors.textMuted, fontWeight: 600, marginTop: "4px" }}>by {product.brand}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
                <div style={{ flex: 1, padding: "16px", borderRadius: "20px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Market Price</p>
                  <p style={{ fontSize: "20px", fontWeight: 900, color: colors.textMain, marginTop: "4px" }}>{product.price}</p>
                </div>
                <div style={{ flex: 1, padding: "16px", borderRadius: "20px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Asset Volume</p>
                  <p style={{ fontSize: "20px", fontWeight: 900, color: colors.textMain, marginTop: "4px" }}>{product.sales}</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge 
                    variant={product.stock > 20 ? "success" : "warning"} 
                    dot 
                    style={{ padding: "8px 16px", borderRadius: "12px", fontSize: "12px", fontWeight: 800 }}
                  >
                    {product.stock} Units Stocked
                  </Badge>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ padding: "12px", borderRadius: "14px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => {e.currentTarget.style.color = colors.primary}} onMouseLeave={(e) => {e.currentTarget.style.color = colors.textMuted}}><Edit size={20} /></button>
                  <button style={{ padding: "12px", borderRadius: "14px", border: "none", backgroundColor: "#fff1f2", color: colors.rose, cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => {e.currentTarget.style.transform = "scale(1.1)"}} onMouseLeave={(e) => {e.currentTarget.style.transform = "scale(1)"}}><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Products;
