import React, { useState, useEffect, useMemo } from "react";
import { 
  X,
  LayoutGrid,
  List as ListIcon,
  Package, 
  Search, 
  Plus, 
  Download, 
  Tag, 
  Layers, 
  Edit,
  Trash2,
  Zap,
  DollarSign,
  Globe,
  ArrowRight
} from "lucide-react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Input";
import Select from "../components/Select";
import { useTheme } from "../context/ThemeContext";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "../config/hooks/useProduct";

// Static products removed in favor of dynamic API data

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
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // API Data
  const { data: productList = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", price: "", category: "Electronics", brand: "", stock: "" });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      deleteProduct.mutate(id);
    }
  };

  const openEditModal = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand || "",
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
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [productList, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Product Identifier is required.");
      return;
    }
    
    const priceVal = parseFloat(formData.price);
    if (isNaN(priceVal) || priceVal <= 0) {
      alert("Valuation must be a positive number.");
      return;
    }

    const stockVal = parseInt(formData.stock);
    if (isNaN(stockVal) || stockVal < 0) {
      alert("Stock Level must be 0 or greater.");
      return;
    }

    const payload = {
      name: formData.name,
      brand: formData.brand,
      price: priceVal,
      stock: stockVal,
      category: formData.category
    };

    if (editingId) {
      updateProduct.mutate({ id: editingId, ...payload }, {
        onSuccess: () => closeModal(),
        onError: (err: any) => alert(err?.response?.data?.message || err.message || "Failed to update product")
      });
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => closeModal(),
        onError: (err: any) => alert(err?.response?.data?.message || err.message || "Failed to create product")
      });
    }
  };

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
    statCard: (_color: string) => ({
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      boxShadow: "var(--card-shadow)",
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
    productGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
      gap: isMobile ? "20px" : "24px",
    },
    productCard: {
      borderRadius: "24px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: colors.border,
      backgroundColor: colors.card,
      transition: "all 0.3s ease",
      overflow: "hidden",
      position: "relative" as const,
      cursor: "pointer",
      boxShadow: "var(--card-shadow)",
    },
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      animation: "fadeIn 0.3s ease",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: "32px",
      width: isMobile ? "95%" : "600px",
      maxHeight: "90vh",
      overflowY: "auto" as const,
      boxShadow: "var(--card-shadow)",
      border: `1px solid ${colors.border}`,
      position: "relative" as const,
      animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  };



  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Product Catalog {productList.length > 0 && <span style={{ fontSize: "20px", verticalAlign: "middle", opacity: 0.5 }}>({productList.length})</span>}</h1>
          <p style={styles.subtitle}>Curate and manage high-performance global assets and inventory.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button variant="secondary" leftIcon={<Download size={18} />} style={{ borderRadius: "14px", padding: "12px", backgroundColor: colors.card, border: `1px solid ${colors.border}` }} />
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
          { 
            label: "Total Inventory", 
            value: productList.length.toLocaleString(), 
            icon: <Package size={22} />, 
            color: colors.primary, 
            change: `${productList.filter(p => p.stock < 10).length} low stock` 
          },
          { 
            label: "Active Brands", 
            value: new Set(productList.map(p => p.brand).filter(Boolean)).size + " Assets", 
            icon: <Zap size={22} />, 
            color: colors.warning, 
            change: "Live Sync" 
          },
          { 
            label: "Stock Valuation", 
            value: `$${productList.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`, 
            icon: <DollarSign size={22} />, 
            color: colors.success, 
            change: `${productList.reduce((acc, p) => acc + p.stock, 0)} units` 
          },
          { 
            label: "Category Reach", 
            value: new Set(productList.map(p => p.category)).size + " Sectors", 
            icon: <Globe size={22} />, 
            color: colors.info, 
            change: "Operational" 
          },
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
          <Input 
            leftIcon={<Search size={18} />}
            placeholder="Search products, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
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
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "grid" ? (theme === "light" ? "white" : "rgba(255,255,255,0.1)") : "transparent", color: viewMode === "grid" ? colors.primaryDark : colors.textMuted, boxShadow: viewMode === "grid" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: viewMode === "list" ? (theme === "light" ? "white" : "rgba(255,255,255,0.1)") : "transparent", color: viewMode === "list" ? colors.primaryDark : colors.textMuted, boxShadow: viewMode === "list" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {isLoading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px 0", color: colors.textMuted }}>
            <Zap size={48} className="animate-pulse" style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ fontSize: "18px", fontWeight: 600 }}>Synchronizing Inventory...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px 0", color: colors.textMuted }}>
            <Package size={48} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ fontSize: "18px", fontWeight: 600 }}>No assets found</p>
            <p style={{ fontSize: "14px" }}>Try adjusting your search or add a new product.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
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
                  <p style={{ fontSize: "16px", fontWeight: 700, color: colors.textMain, margin: "2px 0 0 0" }}>${product.price.toFixed(2)}</p>
                </div>
                <div style={{ flex: 1, padding: "12px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", margin: 0 }}>ID</p>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: colors.textMain, margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis" }}>{product.id.slice(-6)}</p>
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
        )))}
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
                  <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Product Identifier</label>
                  <Input 
                    leftIcon={<Package size={18} />}
                    placeholder="e.g. Quantum Processor X1"
                    style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Valuation (USD)</label>
                    <Input 
                      type="number"
                      leftIcon={<DollarSign size={18} />}
                      placeholder="0.00"
                      style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Stock Level</label>
                    <Input 
                      type="number"
                      leftIcon={<Layers size={18} />}
                      placeholder="Available units"
                      style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Manufacturer / Brand</label>
                    <Input 
                      leftIcon={<Tag size={18} />}
                      placeholder="e.g. Sony / Apple"
                      style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Classification</label>
                    <Select 
                      value={formData.category}
                      onChange={(val) => setFormData({...formData, category: val as string})}
                      options={[
                        { label: "Electronics Node", value: "Electronics" },
                        { label: "Furniture Asset", value: "Furniture" },
                        { label: "Decor Module", value: "Decor" },
                        { label: "Stationery Unit", value: "Stationery" },
                      ]}
                      style={{ borderRadius: "18px", height: "54px", fontSize: "15px", backgroundColor: colors.input, borderColor: colors.border }}
                    />
                  </div>
                </div>

                <div style={{ padding: "24px 0", borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                  <Button variant="ghost" onClick={closeModal} style={{ borderRadius: "14px", fontWeight: 700 }}>Discard</Button>
                  <Button 
                    type="submit"
                    variant="primary" 
                    disabled={createProduct.isPending || updateProduct.isPending}
                    rightIcon={createProduct.isPending || updateProduct.isPending ? <Zap size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    style={{ 
                      borderRadius: "16px", 
                      padding: "14px 32px", 
                      backgroundColor: (createProduct.isPending || updateProduct.isPending) ? colors.textMuted : colors.primaryDark, 
                      fontWeight: 800, 
                      fontSize: "14px",
                      boxShadow: (createProduct.isPending || updateProduct.isPending) ? "none" : `0 8px 15px -3px ${colors.primaryDark}40`,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: (createProduct.isPending || updateProduct.isPending) ? "not-allowed" : "pointer"
                    }}
                  >
                    {createProduct.isPending || updateProduct.isPending ? "Synchronizing..." : (editingId ? "Update Asset" : "Save Asset")}
                  </Button>
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
