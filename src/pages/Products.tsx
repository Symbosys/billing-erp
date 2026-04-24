import React, { useState, useEffect, useMemo } from "react";
import { 
  Maximize2,
  X,
  ChevronRight,
  LayoutGrid,
  List as ListIcon,
  Package, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Tag, 
  Layers, 
  Box,
  MoreVertical,
  Edit,
  Trash2,
  ArrowUpRight,
  TrendingUp,
  Zap,
  DollarSign,
  Globe
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Select from "../components/Select";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Premium Wireless Headphones", price: "$299.00", category: "Electronics", brand: "Sony", stock: 45, rating: 4.8, sales: "1.2k" },
  { id: 2, name: "Ergonomic Office Chair", price: "$450.00", category: "Furniture", brand: "Herman Miller", stock: 12, rating: 4.9, sales: "840" },
  { id: 3, name: "Mechanical Gaming Keyboard", price: "$120.00", category: "Electronics", brand: "Keychron", stock: 89, rating: 4.7, sales: "2.4k" },
  { id: 4, name: "Minimalist Desk Lamp", price: "$85.00", category: "Decor", brand: "IKEA", stock: 32, rating: 4.5, sales: "560" },
  { id: 5, name: "UltraWide 4K Monitor", price: "$799.00", category: "Electronics", brand: "Dell", stock: 8, rating: 4.9, sales: "320" },
  { id: 6, name: "Leather Travel Journal", price: "$45.00", category: "Stationery", brand: "Moleskine", stock: 120, rating: 4.6, sales: "1.8k" },
];

const Products: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Electronics",
    brand: "",
    stock: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productList, setProductList] = useState(INITIAL_PRODUCTS);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", price: "", category: "Electronics", brand: "", stock: "" });
  };

  const handleDeleteProduct = (id: number) => {
    setProductList(productList.filter(p => p.id !== id));
  };

  const openEditModal = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price.replace('$', ''),
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString()
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const filteredProducts = useMemo(() => {
    return productList.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productList, searchQuery]);

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
    statsSlider: {
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
    productGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
      gap: isMobile ? "20px" : "24px",
    },
    productCard: {
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      backgroundColor: "white",
      transition: "all 0.3s ease",
      overflow: "hidden",
      position: "relative" as const,
      cursor: "pointer",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    },
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      animation: "fadeIn 0.3s ease",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "32px",
      width: isMobile ? "95%" : "600px",
      maxHeight: "90vh",
      overflowY: "auto" as const,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      position: "relative" as const,
      animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProductList(productList.map(p => 
        p.id === editingId 
          ? { ...p, ...formData, price: `$${formData.price}`, stock: parseInt(formData.stock) } 
          : p
      ));
    } else {
      const newProduct = {
        id: Math.max(0, ...productList.map(p => p.id)) + 1,
        ...formData,
        price: `$${formData.price}`,
        stock: parseInt(formData.stock),
        rating: 5.0,
        sales: "0"
      };
      setProductList([newProduct, ...productList]);
    }
    closeModal();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Product Catalog</h1>
          <p style={styles.subtitle}>Curate and manage high-performance global assets and inventory.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<Download size={18} />} style={{ borderRadius: "14px", padding: "12px", backgroundColor: "white", border: `1px solid ${colors.border}` }} />
          <Button 
            variant="primary" 
            leftIcon={<Plus size={20} />} 
            onClick={() => setIsModalOpen(true)}
            style={{ borderRadius: "14px", padding: "12px 24px", backgroundColor: colors.primaryDark, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", fontWeight: 600 }}
          >
            New Asset
          </Button>
        </div>
      </div>

      {/* Product Stats Slider */}
      <div style={styles.statsSlider}>
        {[
          { label: "Total Inventory", value: "4,280", icon: <Package size={22} />, color: colors.primary, change: "+120 today" },
          { label: "Active Brands", value: "18 Global", icon: <Zap size={22} />, color: colors.warning, change: "Live Sync" },
          { label: "Stock Valuation", value: "$840,200", icon: <DollarSign size={22} />, color: colors.success, change: "+14.2%" },
          { label: "Market Reach", value: "92 Countries", icon: <Globe size={22} />, color: colors.info, change: "Expanding" },
        ].map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div 
              style={styles.statCard(stat.color)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <Badge variant={i === 1 ? "warning" : "success"} style={{ fontSize: "10px", fontWeight: 700 }}>{stat.change}</Badge>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted, margin: "0 0 4px 0" }}>{stat.label}</p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & View Bar */}
      <div style={styles.filterBar}>
        <div style={styles.searchInputWrapper}>
          <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={18} />
          <input 
            style={styles.searchInput}
            placeholder="Search products, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        </div>
        
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto", justifyContent: "space-between" }}>
          <Select 
            value="all"
            onChange={() => {}}
            options={[{ label: "All Sectors", value: "all" }, { label: "Premium", value: "p" }, { label: "Standard", value: "s" }]}
            style={{ borderRadius: "12px", width: isMobile ? "100%" : "160px" }}
          />

          <div style={{ display: "flex", gap: "4px", padding: "4px", backgroundColor: colors.bg, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
            <button 
              onClick={() => setViewMode("grid")}
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "grid" ? "white" : "transparent", color: viewMode === "grid" ? colors.primaryDark : colors.textMuted, boxShadow: viewMode === "grid" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "list" ? "white" : "transparent", color: viewMode === "list" ? colors.primaryDark : colors.textMuted, boxShadow: viewMode === "list" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {filteredProducts.map((product) => (
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
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{product.name}</h3>
                  <p style={{ fontSize: "13px", color: colors.textMuted, fontWeight: 500, marginTop: "2px" }}>{product.brand}</p>
                </div>
                <Badge variant="neutral" style={{ backgroundColor: colors.bg, padding: "4px 12px", borderRadius: "10px", fontWeight: 700, fontSize: "10px" }}>
                  {product.category}
                </Badge>
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                <div style={{ flex: 1, padding: "12px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", margin: 0 }}>Price</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: "2px 0 0 0" }}>{product.price}</p>
                </div>
                <div style={{ flex: 1, padding: "12px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", margin: 0 }}>Sales</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: "2px 0 0 0" }}>{product.sales}</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: `1px solid ${colors.border}` }}>
                <Badge 
                  variant={product.stock > 20 ? "success" : "warning"} 
                  dot 
                  style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 700 }}
                >
                  {product.stock} in stock
                </Badge>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openEditModal(product); }}
                    style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer", transition: "all 0.2s ease" }} 
                    onMouseEnter={(e) => {e.currentTarget.style.color = colors.primaryDark; e.currentTarget.style.backgroundColor = colors.primaryLight}} 
                    onMouseLeave={(e) => {e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.backgroundColor = colors.bg}}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                    style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: "#fff1f2", color: colors.danger, cursor: "pointer", transition: "all 0.2s ease" }} 
                    onMouseEnter={(e) => {e.currentTarget.style.transform = "scale(1.05)"}} 
                    onMouseLeave={(e) => {e.currentTarget.style.transform = "scale(1)"}}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{editingId ? "Modify Asset" : "Register New Asset"}</h2>
                <p style={{ fontSize: "14px", color: colors.textMuted, margin: "4px 0 0 0", fontWeight: 500 }}>{editingId ? "Updating existing product records." : "Global inventory synchronization enabled."}</p>
              </div>
              <button 
                onClick={closeModal}
                style={{ padding: "8px", borderRadius: "12px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "32px" }}>
              <form style={{ display: "flex", flexDirection: "column", gap: "24px" }} onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Product Identifier</label>
                  <div style={{ position: "relative" }}>
                    <Package size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                    <input 
                      style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                      placeholder="e.g. Quantum Processor X1"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Valuation (USD)</label>
                    <div style={{ position: "relative" }}>
                      <DollarSign size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        type="number"
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Stock Level</label>
                    <div style={{ position: "relative" }}>
                      <Layers size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        type="number"
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="Available units"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Manufacturer / Brand</label>
                    <div style={{ position: "relative" }}>
                      <Tag size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="e.g. Sony / Apple"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Classification</label>
                    <Select 
                      value={formData.category}
                      onChange={(val) => setFormData({...formData, category: val as string})}
                      options={[
                        { label: "Electronics", value: "Electronics" },
                        { label: "Furniture", value: "Furniture" },
                        { label: "Decor", value: "Decor" },
                        { label: "Stationery", value: "Stationery" },
                      ]}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                </div>

                <div style={{ padding: "24px 0", borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                  <button 
                    type="button"
                    onClick={closeModal}
                    style={{ padding: "12px 24px", borderRadius: "14px", border: `1px solid ${colors.border}`, backgroundColor: "white", color: colors.textMuted, fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    style={{ padding: "12px 32px", borderRadius: "14px", border: "none", backgroundColor: colors.primaryDark, color: "white", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {editingId ? "Apply Changes" : "Deploy Asset"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Products;
