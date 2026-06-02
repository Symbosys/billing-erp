import React, { useState } from "react";
import { Table as TableIcon, Plus, Store, Users, Edit, Trash2, Search, X, Hash } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import {
  useDiningTables,
  useCreateDiningTable,
  useUpdateDiningTable,
  useDeleteDiningTable,
  type DiningTable,
} from "../config/hooks/useDiningTable";

const ManageTables: React.FC = () => {
  const { colors, theme } = useTheme();
  const [search, setSearch] = useState("");
  
  // Custom API hooks
  const { data: tables = [], isLoading } = useDiningTables();
  const createTableMutation = useCreateDiningTable();
  const updateTableMutation = useUpdateDiningTable();
  const deleteTableMutation = useDeleteDiningTable();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [tableForm, setTableForm] = useState<Partial<DiningTable>>({ 
    status: "Active", 
    available: true, 
    tableName: "", 
    capacity: 2 
  });

  const filteredTables = tables.filter((t) => 
    t.tableName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingTableId(null);
    setTableForm({ status: "Active", available: true, tableName: "", capacity: 2 });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (table: DiningTable) => {
    setEditingTableId(table.id);
    setTableForm({ ...table });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this table?")) {
      try {
        await deleteTableMutation.mutateAsync(id);
      } catch (error) {
        console.error(error);
        alert("Failed to delete table.");
      }
    }
  };

  const handleSaveTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableForm.tableName || !tableForm.capacity) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editingTableId) {
        await updateTableMutation.mutateAsync({
          id: editingTableId,
          tableName: tableForm.tableName,
          capacity: Number(tableForm.capacity),
          available: tableForm.available,
          status: tableForm.status,
        });
      } else {
        await createTableMutation.mutateAsync({
          tableName: tableForm.tableName,
          capacity: Number(tableForm.capacity),
          status: tableForm.status,
        });
      }
      setIsModalOpen(false);
      setTableForm({ status: "Active", available: true, tableName: "", capacity: 2 });
    } catch (error) {
      console.error(error);
      alert("Failed to save table.");
    }
  };

  const InputField = ({ label, value, onChange, icon, placeholder, type = "text" }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: colors.textMuted }}>{icon}</span>
        <input
          type={type}
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
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Manage Tables</h1>
            <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
              Create and configure dining tables across all store branches.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "transform 0.2s" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <Plus size={16} /> Add Table
          </button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, padding: "6px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <Search size={18} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by table name..."
            style={{ flex: 1, border: "none", backgroundColor: "transparent", padding: "12px", color: colors.textMain, fontSize: "15px", fontWeight: 500, outline: "none" }}
          />
        </div>

        {/* Tables List */}
        <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.border}`, backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a" }}>
                  {["Store Branch", "Table Name", "Capacity", "Availability", "Status", "Action"].map((h) => (
                    <th key={h} style={{ padding: "16px 24px", textAlign: "left", fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: colors.textMuted, fontWeight: 600 }}>
                      Loading dining tables...
                    </td>
                  </tr>
                ) : filteredTables.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: colors.textMuted, fontWeight: 600 }}>
                      No tables found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredTables.map((table, idx) => (
                    <tr key={table.id} style={{ borderBottom: idx === filteredTables.length - 1 ? "none" : `1px solid ${colors.border}`, transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMain }}>
                          <Store size={16} color={colors.textMuted} />
                          <span style={{ fontSize: "14px", fontWeight: 600 }}>SymboSys Main Branch</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain }}>{table.tableName}</span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textMuted }}>
                          <Users size={14} />
                          <span style={{ fontSize: "14px", fontWeight: 600, color: colors.textMain }}>{table.capacity}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center",
                          padding: "6px 12px", borderRadius: "8px",
                          backgroundColor: table.available ? "#d1fae5" : "#fee2e2",
                          color: table.available ? "#065f46" : "#991b1b",
                          fontSize: "12px", fontWeight: 700
                        }}>
                          {table.available ? "Available" : "Occupied"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center",
                          padding: "6px 12px", borderRadius: "8px",
                          backgroundColor: table.status === "Active" ? `${colors.primary}20` : "#fee2e2",
                          color: table.status === "Active" ? colors.primary : "#991b1b",
                          fontSize: "12px", fontWeight: 700
                        }}>
                          {table.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => handleOpenEditModal(table)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "white", color: "#4b5563", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f3f4f6"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}>
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDelete(table.id)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #fecdd3", backgroundColor: "#fff1f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ffe4e6"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff1f2"}>
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

      {/* Add / Edit Table Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <div style={{ width: "100%", maxWidth: "500px", backgroundColor: colors.card, borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden", animation: "modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)", margin: "20px" }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                  {editingTableId ? <Edit size={20} /> : <TableIcon size={20} />}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: colors.textMain }}>{editingTableId ? "Edit Table Info" : "Add New Table"}</h2>
                  <p style={{ margin: 0, fontSize: "13px", color: colors.textMuted, fontWeight: 500 }}>{editingTableId ? `Updating records for ${tableForm.tableName}` : "Create a new table for a store."}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = colors.textMain} onMouseLeave={e => e.currentTarget.style.color = colors.textMuted}>
                <X size={16} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveTable} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Store Branch</label>
                <select
                  disabled
                  value="SymboSys Main Branch"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 16px", borderRadius: "12px",
                    border: `1.5px solid ${colors.border}`, backgroundColor: colors.bg,
                    color: colors.textMuted, fontSize: "14px", fontWeight: 500,
                    outline: "none", appearance: "none"
                  }}
                >
                  <option value="SymboSys Main Branch">SymboSys Main Branch</option>
                </select>
              </div>

              <InputField 
                label="Table Name" 
                placeholder="e.g. Table 4" 
                value={tableForm.tableName} 
                onChange={(val: string) => setTableForm({ ...tableForm, tableName: val })} 
                icon={<Hash size={16} />} 
              />
              
              <InputField 
                label="Capacity (Persons)" 
                type="number"
                placeholder="e.g. 4" 
                value={tableForm.capacity} 
                onChange={(val: string) => setTableForm({ ...tableForm, capacity: Number(val) })} 
                icon={<Users size={16} />} 
              />

              <div style={{ display: "flex", gap: "16px" }}>
                {editingTableId && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Availability</label>
                    <select
                      value={tableForm.available ? "true" : "false"}
                      onChange={(e) => setTableForm({ ...tableForm, available: e.target.value === "true" })}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        padding: "12px 16px", borderRadius: "12px",
                        border: `1.5px solid ${colors.border}`, backgroundColor: colors.bg,
                        color: colors.textMain, fontSize: "14px", fontWeight: 500,
                        outline: "none", appearance: "none"
                      }}
                    >
                      <option value="true">Available</option>
                      <option value="false">Occupied</option>
                    </select>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</label>
                  <select
                    value={tableForm.status}
                    onChange={(e) => setTableForm({ ...tableForm, status: e.target.value as "Active" | "Inactive" })}
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
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "12px 24px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: "transparent", color: colors.textMain, fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  Cancel
                </button>
                <button type="submit" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: "none", background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`, color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "all 0.2s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
                  {editingTableId ? <Edit size={16} /> : <Plus size={16} />}
                  {editingTableId ? "Save Changes" : "Create Table"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ManageTables;
