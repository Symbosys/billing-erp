import React, { useState } from "react";
import { Store, Plus, MapPin, Search, Edit, Trash2, Phone, X, Building2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface StoreData {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "Active" | "Inactive";
}

const mockStores: StoreData[] = [
  { id: "STR-001", name: "SymboSys Main Branch", address: "123 Business Avenue, Tech City", phone: "+1 (555) 123-4567", status: "Active" },
  { id: "STR-002", name: "SymboSys North", address: "456 North Mall, Uptown", phone: "+1 (555) 987-6543", status: "Active" },
  { id: "STR-003", name: "SymboSys East", address: "789 East Plaza, Downtown", phone: "+1 (555) 456-7890", status: "Inactive" },
];

const ManageStores: React.FC = () => {
  const { colors, theme } = useTheme();
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<StoreData[]>(mockStores);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [storeForm, setStoreForm] = useState<Partial<StoreData>>({ status: "Active" });

  const filteredStores = stores.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAddModal = () => {
    setEditingStoreId(null);
    setStoreForm({ status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (store: StoreData) => {
    setEditingStoreId(store.id);
    setStoreForm({ ...store });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this store?")) {
      setStores(stores.filter(s => s.id !== id));
    }
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeForm.name || !storeForm.address || !storeForm.phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingStoreId) {
      // Edit existing store
      setStores(stores.map(s => s.id === editingStoreId ? { ...s, ...storeForm } as StoreData : s));
    } else {
      // Add new store
      const nextId = `STR-00${stores.length + 1}`;
      setStores([...stores, { ...storeForm, id: nextId } as StoreData]);
    }

    setIsModalOpen(false);
    setStoreForm({ status: "Active" }); // Reset
  };

  const InputField = ({ label, value, onChange, icon, placeholder }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: colors.textMuted }}>{icon}</span>
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "12px 16px 12px 42px", borderRadius: "12px",
            border: `1.5px solid ${colors.border}`, backgroundColor: colors.bg,
            color: colors.textMain, fontSize: "14px", fontWeight: 500,
            outline: "none", transition: "all 0.2s ease",
          }}
          onFocus={(e) => e.target.style.borderColor = colors.primary}
          onBlur={(e) => e.target.style.borderColor = colors.border}
        />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Manage Stores</h1>
            <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
              View and manage all branch locations for your business.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "transform 0.2s" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <Plus size={16} /> Add New Store
          </button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, padding: "6px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <Search size={18} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores by name..."
            style={{ flex: 1, border: "none", backgroundColor: "transparent", padding: "12px", color: colors.textMain, fontSize: "15px", fontWeight: 500, outline: "none" }}
          />
        </div>

        {/* Stores List */}
        <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a" }}>
                  {["Store Details", "Location", "Contact", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "16px 24px", textAlign: "left", fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStores.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: colors.textMuted, fontWeight: 600 }}>
                      No stores found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredStores.map((store, idx) => (
                    <tr key={store.id} style={{ borderBottom: idx === filteredStores.length - 1 ? "none" : `1px solid ${colors.border}`, transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                            <Store size={20} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: colors.textMain }}>{store.name}</p>
                            <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: colors.textMuted, fontWeight: 600 }}>ID: {store.id}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textMuted }}>
                          <MapPin size={14} />
                          <span style={{ fontSize: "13px", fontWeight: 500 }}>{store.address}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textMuted }}>
                          <Phone size={14} />
                          <span style={{ fontSize: "13px", fontWeight: 500 }}>{store.phone}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center",
                          padding: "6px 12px", borderRadius: "8px",
                          backgroundColor: store.status === "Active" ? "#d1fae5" : "#fee2e2",
                          color: store.status === "Active" ? "#065f46" : "#991b1b",
                          fontSize: "12px", fontWeight: 700
                        }}>
                          {store.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => handleOpenEditModal(store)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "white", color: "#4b5563", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f3f4f6"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDelete(store.id)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #fecdd3", backgroundColor: "#fff1f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ffe4e6"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff1f2"}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Store Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <div style={{ width: "100%", maxWidth: "500px", backgroundColor: colors.card, borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden", animation: "modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)", margin: "20px" }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                  {editingStoreId ? <Edit size={20} /> : <Building2 size={20} />}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: colors.textMain }}>{editingStoreId ? "Edit Store Details" : "Add New Store"}</h2>
                  <p style={{ margin: 0, fontSize: "13px", color: colors.textMuted, fontWeight: 500 }}>{editingStoreId ? `Updating records for ${storeForm.id}` : "Create a new branch location."}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = colors.textMain} onMouseLeave={e => e.currentTarget.style.color = colors.textMuted}>
                <X size={16} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveStore} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <InputField 
                label="Store Name" 
                placeholder="e.g. SymboSys West" 
                value={storeForm.name} 
                onChange={(val: string) => setStoreForm({ ...storeForm, name: val })} 
                icon={<Store size={16} />} 
              />
              
              <InputField 
                label="Physical Address" 
                placeholder="e.g. 123 Main St, City" 
                value={storeForm.address} 
                onChange={(val: string) => setStoreForm({ ...storeForm, address: val })} 
                icon={<MapPin size={16} />} 
              />
              
              <InputField 
                label="Phone Number" 
                placeholder="e.g. +1 (555) 000-0000" 
                value={storeForm.phone} 
                onChange={(val: string) => setStoreForm({ ...storeForm, phone: val })} 
                icon={<Phone size={16} />} 
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Store Status</label>
                <select
                  value={storeForm.status}
                  onChange={(e) => setStoreForm({ ...storeForm, status: e.target.value as "Active" | "Inactive" })}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 16px", borderRadius: "12px",
                    border: `1.5px solid ${colors.border}`, backgroundColor: colors.bg,
                    color: colors.textMain, fontSize: "14px", fontWeight: 500,
                    outline: "none", appearance: "none"
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "12px 24px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: "transparent", color: colors.textMain, fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  Cancel
                </button>
                <button type="submit" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "all 0.2s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
                  {editingStoreId ? <Edit size={16} /> : <Plus size={16} />}
                  {editingStoreId ? "Save Changes" : "Create Store"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ManageStores;
