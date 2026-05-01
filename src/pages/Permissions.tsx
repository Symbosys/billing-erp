import React, { useState, useMemo } from "react";
import {
  Search, Plus, ShieldCheck, X, Trash2, Lock, Settings,
  ArrowRight, Pencil, AlertCircle, CheckCircle2, RefreshCw,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { Permission } from "../config/hooks/usePermission";
import {
  usePermissions, useCreatePermission, useUpdatePermission,
  useDeletePermission,
} from "../config/hooks/usePermission";

// ─── Toast ───────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType; }

const ToastContainer: React.FC<{ toasts: Toast[]; remove: (id: number) => void }> = ({ toasts, remove }) => (
  <div style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "12px" }}>
    {toasts.map((t) => (
      <div key={t.id} onClick={() => remove(t.id)} style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "14px 20px", borderRadius: "16px", cursor: "pointer",
        backgroundColor: t.type === "success" ? "#ecfdf5" : "#fff1f2",
        border: `1px solid ${t.type === "success" ? "#6ee7b7" : "#fecdd3"}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        animation: "fadeIn 0.3s ease",
        minWidth: "280px",
      }}>
        {t.type === "success"
          ? <CheckCircle2 size={18} color="#10b981" />
          : <AlertCircle size={18} color="#ef4444" />}
        <span style={{ fontSize: "14px", fontWeight: 600, color: t.type === "success" ? "#065f46" : "#991b1b" }}>
          {t.message}
        </span>
      </div>
    ))}
  </div>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard: React.FC<{ colors: any }> = ({ colors }) => (
  <div style={{ backgroundColor: colors.card, borderRadius: "24px", border: `1px solid ${colors.border}`, padding: "24px" }}>
    {["60%", "90%", "75%"].map((w, i) => (
      <div key={i} style={{
        height: i === 0 ? "48px" : "16px", width: w,
        backgroundColor: colors.border, borderRadius: "8px",
        marginBottom: i === 2 ? 0 : "16px",
        animation: "pulse 1.5s ease-in-out infinite",
      }} />
    ))}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  title: string; subtitle: string; onClose: () => void;
  onSubmit: (e: React.FormEvent) => void; colors: any;
  form: { name: string; description: string };
  setForm: (f: any) => void; submitting: boolean; submitLabel: string;
}
const PermissionModal: React.FC<ModalProps> = ({
  title, subtitle, onClose, onSubmit, colors, form, setForm, submitting, submitLabel,
}) => (
  <div style={{
    position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)",
    backdropFilter: "blur(8px)", display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 2000, padding: "20px", animation: "fadeIn 0.25s ease",
  }} onClick={onClose}>
    <div style={{
      backgroundColor: colors.card, borderRadius: "32px", width: "100%",
      maxWidth: "500px", border: `1px solid ${colors.border}`,
      boxShadow: "0 32px 64px rgba(0,0,0,0.2)", animation: "modalSlideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
    }} onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div style={{ padding: "28px 32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{title}</h2>
          <p style={{ fontSize: "13px", color: colors.textMuted, margin: "4px 0 0 0" }}>{subtitle}</p>
        </div>
        <button onClick={onClose} style={{ padding: "8px", borderRadius: "12px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer" }}>
          <X size={20} />
        </button>
      </div>
      {/* Body */}
      <form onSubmit={onSubmit}>
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Permission Name *
            </label>
            <div style={{ position: "relative" }}>
              <ShieldCheck size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
              <input
                required autoFocus
                placeholder="e.g. MANAGE_USERS, ADMIN_ACCESS"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "12px 14px 12px 40px",
                  borderRadius: "14px", border: `2px solid ${colors.border}`,
                  backgroundColor: colors.bg, color: colors.textMain, fontSize: "14px",
                  fontWeight: 600, outline: "none",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Brief description of what this permission allows..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{
                width: "100%", boxSizing: "border-box", padding: "12px 14px",
                borderRadius: "14px", border: `2px solid ${colors.border}`,
                backgroundColor: colors.bg, color: colors.textMain, fontSize: "14px",
                fontWeight: 500, outline: "none", resize: "vertical", fontFamily: "inherit",
              }}
            />
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding: "20px 32px", backgroundColor: colors.bg, borderTop: `1px solid ${colors.border}`, borderRadius: "0 0 32px 32px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button type="button" onClick={onClose} style={{ padding: "11px 22px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.textMuted, fontWeight: 700, cursor: "pointer", fontSize: "14px" }}>
            Cancel
          </button>
          <button type="submit" disabled={!form.name || submitting} style={{
            padding: "11px 26px", borderRadius: "14px", border: "none",
            backgroundColor: !form.name ? colors.primaryLight : colors.primaryDark,
            color: !form.name ? colors.textMuted : "white",
            fontWeight: 800, cursor: !form.name ? "not-allowed" : "pointer",
            fontSize: "14px", display: "flex", alignItems: "center", gap: "8px",
            boxShadow: form.name ? `0 8px 20px ${colors.primaryDark}40` : "none",
            transition: "all 0.2s",
          }}>
            {submitting ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={16} />}
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Permissions: React.FC = () => {
  const { colors } = useTheme();
  const { data: permissions = [], isLoading, isError, refetch } = usePermissions();
  const createMutation = useCreatePermission();
  const updateMutation = useUpdatePermission();
  const deleteMutation = useDeletePermission();

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Permission | null>(null);
  const [addForm, setAddForm] = useState({ name: "", description: "" });
  const [editForm, setEditForm] = useState({ name: "", description: "" });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };
  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const openEdit = (p: Permission) => {
    setEditTarget(p);
    setEditForm({ name: p.name, description: p.description || "" });
  };

  const filtered = useMemo(() =>
    permissions
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name)),
    [permissions, search]
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({ name: addForm.name, description: addForm.description });
      setAddOpen(false);
      setAddForm({ name: "", description: "" });
      addToast("Permission created successfully!", "success");
    } catch (err: any) {
      addToast(err?.response?.data?.message || "Failed to create permission.", "error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    try {
      await updateMutation.mutateAsync({ id: editTarget.id, name: editForm.name, description: editForm.description });
      setEditTarget(null);
      addToast("Permission updated successfully!", "success");
    } catch (err: any) {
      addToast(err?.response?.data?.message || "Failed to update permission.", "error");
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id, {
      onSuccess: () => addToast("Permission deleted.", "success"),
      onError: () => addToast("Failed to delete permission.", "error"),
    });
  };

  // ── Render States ──
  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ height: "36px", width: "240px", backgroundColor: colors.border, borderRadius: "8px", marginBottom: "8px" }} />
            <div style={{ height: "18px", width: "320px", backgroundColor: colors.border, borderRadius: "6px" }} />
          </div>
          <div style={{ height: "48px", width: "160px", backgroundColor: colors.border, borderRadius: "14px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} colors={colors} />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 0", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", backgroundColor: "#fff1f2", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
          <AlertCircle size={40} color="#ef4444" />
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, marginBottom: "12px" }}>Failed to Load Permissions</h2>
        <p style={{ color: colors.textMuted, marginBottom: "32px", maxWidth: "360px" }}>
          Could not connect to the server. Make sure the backend is running on port 3000.
        </p>
        <button onClick={() => refetch()} style={{
          padding: "12px 28px", borderRadius: "14px", border: "none",
          backgroundColor: colors.primaryDark, color: "white",
          fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "60px" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "34px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>
            System Permissions
          </h1>
          <p style={{ color: colors.textMuted, margin: "4px 0 0 0", fontWeight: 500, fontSize: "15px" }}>
            {permissions.length} permission{permissions.length !== 1 ? "s" : ""} configured across the system
          </p>
        </div>
        <button
          onClick={() => { setAddForm({ name: "", description: "" }); setAddOpen(true); }}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "13px 24px", borderRadius: "14px", border: "none",
            backgroundColor: colors.primaryDark, color: "white",
            fontWeight: 700, fontSize: "14px", cursor: "pointer",
            boxShadow: `0 8px 20px ${colors.primaryDark}40`,
            transition: "all 0.2s",
          }}
        >
          <Plus size={18} /> New Permission
        </button>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
        {[
          { label: "Total Permissions", value: permissions.length, icon: ShieldCheck, color: "#6366f1" },
          { label: "With Description", value: permissions.filter(p => p.description).length, icon: Lock, color: "#0ea5e9" },
          { label: "Search Results", value: filtered.length, icon: Search, color: "#10b981" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <p style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{value}</p>
              <p style={{ fontSize: "12px", color: colors.textMuted, margin: 0, fontWeight: 600 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div style={{ position: "relative", backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, padding: "4px 0" }}>
        <Search size={18} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search permissions by name or description..."
          style={{
            width: "100%", boxSizing: "border-box", padding: "14px 20px 14px 50px",
            border: "none", outline: "none", backgroundColor: "transparent",
            fontSize: "14px", fontWeight: 500, color: colors.textMain,
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", padding: "4px", borderRadius: "8px", border: "none", backgroundColor: colors.border, color: colors.textMuted, cursor: "pointer", display: "flex" }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((perm) => (
            <div
              key={perm.id}
              style={{
                backgroundColor: colors.card, borderRadius: "24px",
                border: `1px solid ${colors.border}`, padding: "24px",
                display: "flex", flexDirection: "column", gap: "16px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = colors.primaryDark;
                e.currentTarget.style.boxShadow = `0 12px 28px ${colors.primaryDark}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card Top */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #6366f118 0%, #818cf818 100%)", border: "1px solid #6366f120", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={24} color="#6366f1" />
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => openEdit(perm)}
                    title="Edit"
                    style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eff6ff"; e.currentTarget.style.color = "#3b82f6"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(perm.id, perm.name)}
                    title="Delete"
                    disabled={deleteMutation.isPending}
                    style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff1f2"; e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: colors.textMain, margin: "0 0 6px 0", letterSpacing: "0.02em" }}>
                  {perm.name}
                </h3>
                <p style={{ fontSize: "13px", color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>
                  {perm.description || <em>No description provided.</em>}
                </p>
              </div>

              {/* Card Footer */}
              <div style={{ paddingTop: "14px", borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 700, fontFamily: "monospace", backgroundColor: colors.bg, padding: "4px 8px", borderRadius: "6px" }}>
                  #{perm.id.slice(-8).toUpperCase()}
                </span>
                <Lock size={14} color={colors.primary} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 0", backgroundColor: colors.card, borderRadius: "32px", border: `2px dashed ${colors.border}`, textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", backgroundColor: colors.bg, borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
            <Settings size={36} color={colors.textMuted} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 800, color: colors.textMain, margin: "0 0 10px 0" }}>
            {search ? "No Matching Permissions" : "No Permissions Yet"}
          </h3>
          <p style={{ color: colors.textMuted, margin: "0 0 28px 0", maxWidth: "360px", fontSize: "14px" }}>
            {search ? "Try adjusting your search query." : "Create your first system permission to get started."}
          </p>
          <button
            onClick={() => search ? setSearch("") : setAddOpen(true)}
            style={{ padding: "12px 28px", borderRadius: "14px", border: "none", backgroundColor: colors.primaryDark, color: "white", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}
          >
            {search ? "Clear Search" : "Create First Permission"}
          </button>
        </div>
      )}

      {/* ── Create Modal ── */}
      {addOpen && (
        <PermissionModal
          title="New Permission"
          subtitle="Define a new access control level for the system."
          onClose={() => setAddOpen(false)}
          onSubmit={handleCreate}
          colors={colors}
          form={addForm}
          setForm={setAddForm}
          submitting={createMutation.isPending}
          submitLabel="Create Permission"
        />
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <PermissionModal
          title="Edit Permission"
          subtitle={`Editing: ${editTarget.name}`}
          onClose={() => setEditTarget(null)}
          onSubmit={handleUpdate}
          colors={colors}
          form={editForm}
          setForm={setEditForm}
          submitting={updateMutation.isPending}
          submitLabel="Save Changes"
        />
      )}

      {/* ── Toasts ── */}
      <ToastContainer toasts={toasts} remove={removeToast} />
    </div>
  );
};

export default Permissions;
