import React, { useState, useMemo } from "react";
import { Search, Plus, Trash2, Edit, ShoppingCart, X, DollarSign, Truck, ArrowRight, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { usePurchases, useCreatePurchase, useUpdatePurchase, useDeletePurchase } from "../config/hooks/usePurchase";
import { useSuppliers } from "../config/hooks/useSupplier";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

const PurchasePage: React.FC = () => {
  const { theme, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    supplierId: "",
    total: "",
  });

  const { data: purchases = [], isLoading } = usePurchases();
  const { data: suppliers = [] } = useSuppliers();
  const createPurchase = useCreatePurchase();
  const updatePurchase = useUpdatePurchase();
  const deletePurchase = useDeletePurchase();

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024;

  const supplierMap = useMemo(() => {
    const map: Record<string, string> = {};
    suppliers.forEach((s) => {
      map[s.id] = s.name;
    });
    return map;
  }, [suppliers]);

  const filteredPurchases = useMemo(() => {
    return purchases.filter((p) => {
      const supplierName = supplierMap[p.supplierId]?.toLowerCase() || "";
      return supplierName.includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [purchases, searchQuery, supplierMap]);

  const openEditModal = (purchase: any) => {
    setFormData({
      supplierId: purchase.supplierId,
      total: purchase.total.toString(),
    });
    setEditingId(purchase.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ supplierId: "", total: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.supplierId) return alert("Please select a supplier.");
    const totalVal = parseFloat(formData.total);
    if (isNaN(totalVal) || totalVal <= 0) return alert("Total must be a positive number.");

    const payload = {
      supplierId: formData.supplierId,
      total: totalVal,
    };

    if (editingId) {
      updatePurchase.mutate({ id: editingId, ...payload }, {
        onSuccess: () => closeModal(),
        onError: (err: any) => alert(err?.response?.data?.message || "Failed to update purchase")
      });
    } else {
      createPurchase.mutate(payload, {
        onSuccess: () => closeModal(),
        onError: (err: any) => alert(err?.response?.data?.message || "Failed to log purchase")
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this purchase record?")) {
      deletePurchase.mutate(id);
    }
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
      fontSize: "16px"
    },
    filterBar: {
      display: "flex",
      gap: "16px",
      padding: "20px",
      backgroundColor: colors.card,
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      boxShadow: "var(--card-shadow)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
      gap: "24px",
    },
    card: {
      borderRadius: "24px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: colors.border,
      backgroundColor: colors.card,
      transition: "all 0.3s ease",
      overflow: "hidden",
      position: "relative" as const,
      boxShadow: "var(--card-shadow)",
      padding: "24px"
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
      width: isMobile ? "95%" : "500px",
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
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Purchases {purchases.length > 0 && <span style={{ fontSize: "20px", verticalAlign: "middle", opacity: 0.5 }}>({purchases.length})</span>}</h1>
          <p style={styles.subtitle}>Track incoming stock purchases and expenses.</p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<Plus size={20} />} 
          onClick={() => setIsModalOpen(true)}
          style={{ borderRadius: "14px", padding: "12px 24px", backgroundColor: colors.primaryDark, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", fontWeight: 600 }}
        >
          Log Purchase
        </Button>
      </div>

      <div style={styles.filterBar}>
        <div style={{ flex: 1, position: "relative" }}>
          <Input 
            leftIcon={<Search size={18} />}
            placeholder="Search purchases by supplier or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "16px", height: "50px", backgroundColor: colors.input, borderColor: colors.border }}
          />
        </div>
      </div>

      <div style={styles.grid}>
        {isLoading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px 0", color: colors.textMuted }}>
            <Zap size={48} className="animate-pulse" style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ fontSize: "18px", fontWeight: 600 }}>Loading Purchases...</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px 0", color: colors.textMuted }}>
            <ShoppingCart size={48} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ fontSize: "18px", fontWeight: 600 }}>No purchases found</p>
          </div>
        ) : (
          filteredPurchases.map((purchase) => (
            <div 
              key={purchase.id} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 30px 60px -20px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = colors.primaryLight;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--card-shadow)";
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: `${colors.primary}15`, color: colors.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: colors.textMain, margin: 0 }}>
                      {supplierMap[purchase.supplierId] || "Unknown Supplier"}
                    </h3>
                    <p style={{ fontSize: "12px", color: colors.textMuted, fontFamily: "monospace", marginTop: "2px" }}>ID: {purchase.id.slice(-8)}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", padding: "16px", backgroundColor: colors.bg, borderRadius: "16px", border: `1px solid ${colors.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMuted }}>
                     <DollarSign size={16} />
                     <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Cost</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain }}>${purchase.total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", paddingTop: "16px", borderTop: `1px solid ${colors.border}` }}>
                <button 
                  onClick={() => openEditModal(purchase)}
                  style={{ padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer", fontWeight: 600, transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => {e.currentTarget.style.color = colors.primaryDark; e.currentTarget.style.backgroundColor = colors.primaryLight}} 
                  onMouseLeave={(e) => {e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.backgroundColor = colors.bg}}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Edit size={14} /> Edit</div>
                </button>
                <button 
                  onClick={() => handleDelete(purchase.id)}
                  style={{ padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: "#fff1f2", color: colors.danger, cursor: "pointer", fontWeight: 600, transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => {e.currentTarget.style.transform = "scale(1.05)"}} 
                  onMouseLeave={(e) => {e.currentTarget.style.transform = "scale(1)"}}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Trash2 size={14} /> Remove</div>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "24px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{editingId ? "Edit Purchase" : "Log Purchase"}</h2>
              </div>
              <button onClick={closeModal} style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Supplier</label>
                  <Select 
                    value={formData.supplierId}
                    onChange={(val) => setFormData({...formData, supplierId: val as string})}
                    options={[
                      { label: "Select a Supplier", value: "" },
                      ...suppliers.map(s => ({ label: s.name, value: s.id }))
                    ]}
                    style={{ borderRadius: "14px", height: "50px", backgroundColor: colors.input, borderColor: colors.border }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Cost (USD)</label>
                  <Input 
                    type="number"
                    leftIcon={<DollarSign size={18} />}
                    placeholder="0.00"
                    value={formData.total}
                    onChange={(e) => setFormData({...formData, total: e.target.value})}
                    style={{ borderRadius: "14px", height: "50px", backgroundColor: colors.input, borderColor: colors.border }}
                  />
                </div>
                
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px", paddingTop: "20px", borderTop: `1px solid ${colors.border}` }}>
                  <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={createPurchase.isPending || updatePurchase.isPending}
                    rightIcon={createPurchase.isPending || updatePurchase.isPending ? <Zap size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    style={{ borderRadius: "14px", padding: "12px 24px" }}
                  >
                    {editingId ? "Update Purchase" : "Log Purchase"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;
