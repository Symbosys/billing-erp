import React, { useState, useRef } from "react";
import {
  User, Mail, Lock, Shield, Camera, Save, Eye, EyeOff,
  CheckCircle2, AlertCircle, RefreshCw, Activity, Key,
  LogOut, Smartphone, Clock, Edit2
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useUpdatePassword } from "../config/hooks/useAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface ToastItem { id: number; message: string; type: ToastType; }

// ─── Toast Component ──────────────────────────────────────────────────────────
const Toast: React.FC<{ toasts: ToastItem[]; remove: (id: number) => void }> = ({ toasts, remove }) => (
  <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px" }}>
    {toasts.map((t) => (
      <div
        key={t.id}
        onClick={() => remove(t.id)}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "14px 20px", borderRadius: "14px", cursor: "pointer", minWidth: "300px",
          backgroundColor: t.type === "success" ? "#ecfdf5" : "#fff1f2",
          border: `1px solid ${t.type === "success" ? "#34d399" : "#fca5a5"}`,
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {t.type === "success"
          ? <CheckCircle2 size={18} color="#059669" />
          : <AlertCircle size={18} color="#dc2626" />}
        <span style={{ fontSize: "14px", fontWeight: 600, color: t.type === "success" ? "#065f46" : "#991b1b" }}>
          {t.message}
        </span>
      </div>
    ))}
    <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
  </div>
);

// ─── Premium Input ────────────────────────────────────────────────────────────
const InputField: React.FC<{
  label: string; value: string; onChange?: (v: string) => void;
  type?: string; placeholder?: string; readOnly?: boolean;
  colors: any; icon?: React.ReactNode; right?: React.ReactNode;
}> = ({ label, value, onChange, type = "text", placeholder, readOnly, colors, icon, right }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && (
          <span style={{ position: "absolute", left: "14px", color: focused && !readOnly ? colors.primary : colors.textMuted, transition: "color 0.2s" }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: `12px ${right ? "44px" : "16px"} 12px ${icon ? "42px" : "16px"}`,
            borderRadius: "12px",
            border: `1.5px solid ${focused && !readOnly ? colors.primary : colors.border}`,
            backgroundColor: readOnly ? colors.bg : colors.input || colors.card,
            color: colors.textMain, fontSize: "14px", fontWeight: 600,
            outline: "none", transition: "all 0.2s ease",
            cursor: readOnly ? "not-allowed" : "text",
            boxShadow: focused && !readOnly ? `0 0 0 3px ${colors.primary}20` : "none",
          }}
        />
        {right && (
          <span style={{ position: "absolute", right: "14px" }}>
            {right}
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode; colors: any }> = ({ title, subtitle, icon, children, colors }) => (
  <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
    <div style={{ padding: "20px 24px", borderBottom: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
        {icon}
      </div>
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{title}</h2>
        <p style={{ fontSize: "13px", color: colors.textMuted, margin: "2px 0 0 0", fontWeight: 500 }}>{subtitle}</p>
      </div>
    </div>
    <div style={{ padding: "24px" }}>{children}</div>
  </div>
);

// ─── Activity Data ────────────────────────────────────────────────────────────
const ACTIVITY = [
  { action: "Signed in", detail: "Chrome · Windows", time: "Just now", icon: <Activity size={16} /> },
  { action: "Password changed", detail: "Chrome · Windows", time: "2 days ago", icon: <Key size={16} /> },
  { action: "Profile updated", detail: "Firefox · Windows", time: "5 days ago", icon: <Edit2 size={16} /> },
  { action: "Mobile login", detail: "Android · SymboApp", time: "1 week ago", icon: <Smartphone size={16} /> },
];

// ─── Profile Page ─────────────────────────────────────────────────────────────
const Profile: React.FC = () => {
  const { colors, theme } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const updatePwd = useUpdatePassword();

  const stored = (() => { try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; } })();

  const [name, setName] = useState<string>(stored.name || "Admin User");
  const [email, setEmail] = useState<string>(stored.email || "admin@symbosys.io");
  const [role] = useState<string>(stored.role || "Administrator");
  const [avatar, setAvatar] = useState<string>(stored.avatar || "");
  const [saving, setSaving] = useState(false);

  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [conPwd, setConPwd] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const initials = name.split(" ").map((n: string) => n[0] || "").join("").slice(0, 2).toUpperCase();

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setAvatar(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { toast("Name and email are required.", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("user", JSON.stringify({ ...stored, name, email, avatar }));
    setSaving(false);
    toast("Profile updated successfully.", "success");
  };

  const handlePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!curPwd || !newPwd || !conPwd) { toast("All fields are required.", "error"); return; }
    if (newPwd.length < 8) { toast("Password must be at least 8 characters.", "error"); return; }
    if (newPwd !== conPwd) { toast("Passwords do not match.", "error"); return; }
    try {
      await updatePwd.mutateAsync({ currentPassword: curPwd, newPassword: newPwd });
      setCurPwd(""); setNewPwd(""); setConPwd("");
      toast("Password changed successfully.", "success");
    } catch (err: any) {
      toast(err?.response?.data?.message || "Failed to update password.", "error");
    }
  };

  const strength = (() => {
    if (!newPwd) return null;
    let s = 0;
    if (newPwd.length >= 8) s++;
    if (/[A-Z]/.test(newPwd)) s++;
    if (/[0-9]/.test(newPwd)) s++;
    if (/[^A-Za-z0-9]/.test(newPwd)) s++;
    const strMap = [
      { label: "Weak", color: "#ef4444", w: "25%" },
      { label: "Weak", color: "#ef4444", w: "25%" },
      { label: "Fair", color: "#f59e0b", w: "50%" },
      { label: "Good", color: "#0ea5e9", w: "75%" },
      { label: "Strong", color: "#10b981", w: "100%" },
    ];
    return strMap[s];
  })();

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", color: colors.textMuted, display: "flex", padding: 0 }}>
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );

  const primaryBtn = (loading: boolean, label: string, loadingLabel: string) => (
    <button type="submit" disabled={loading} style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "12px 24px", borderRadius: "12px", border: "none",
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      color: "white", fontWeight: 700, fontSize: "14px",
      cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1,
      boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "all 0.2s",
    }}>
      {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={16} />}
      {loading ? loadingLabel : label}
    </button>
  );

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        
        {/* Header Title */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>My Profile</h1>
          <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>Manage your personal information and security settings.</p>
        </div>

        {/* ─── Hero Banner / Identity Card ─── */}
        <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", border: `1px solid ${colors.border}`, backgroundColor: colors.card, boxShadow: "0 12px 24px -12px rgba(0,0,0,0.1)" }}>
          <div style={{ height: "140px", background: `linear-gradient(135deg, ${colors.primaryDark}, #8b5cf6, #ec4899)`, position: "relative" }}>
             <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          </div>
          
          <div style={{ padding: "0 32px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginTop: "-48px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
                {/* Avatar */}
                <div style={{ position: "relative" }}>
                  <div style={{ width: "100px", height: "100px", borderRadius: "24px", border: `4px solid ${colors.card}`, backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", background: avatar ? "transparent" : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})` }}>
                    {avatar ? <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "32px", fontWeight: 900, color: "white" }}>{initials}</span>}
                  </div>
                  <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "32px", height: "32px", borderRadius: "10px", backgroundColor: colors.card, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: colors.textMain, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <Camera size={14} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
                </div>
                
                <div style={{ paddingBottom: "4px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0, letterSpacing: "-0.01em" }}>{name}</h2>
                  <p style={{ fontSize: "14px", color: colors.textMuted, margin: "4px 0 8px 0", fontWeight: 500 }}>{email}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "8px", backgroundColor: `${colors.primary}15`, color: colors.primary, fontSize: "12px", fontWeight: 700 }}>
                      <Shield size={12} /> {role}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "8px", backgroundColor: "#10b98115", color: "#10b981", fontSize: "12px", fontWeight: 700 }}>
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Mini Cards */}
              <div style={{ display: "flex", gap: "12px", paddingBottom: "4px" }}>
                <div style={{ padding: "12px 20px", borderRadius: "14px", backgroundColor: colors.bg, border: `1px solid ${colors.border}`, textAlign: "center", minWidth: "90px" }}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0 }}>24</p>
                  <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 700, margin: "2px 0 0 0", textTransform: "uppercase" }}>Logins</p>
                </div>
                <div style={{ padding: "12px 20px", borderRadius: "14px", backgroundColor: colors.bg, border: `1px solid ${colors.border}`, textAlign: "center", minWidth: "90px" }}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0 }}>4</p>
                  <p style={{ fontSize: "11px", color: colors.textMuted, fontWeight: 700, margin: "2px 0 0 0", textTransform: "uppercase" }}>Devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Two Column Layout for the rest ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "start" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* General Info */}
            <SectionCard title="Personal Information" subtitle="Update your basic profile details." icon={<User size={20} />} colors={colors}>
              <form onSubmit={handleSave}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <InputField label="Full Name" value={name} onChange={setName} placeholder="John Doe" icon={<User size={16} />} colors={colors} />
                  <InputField label="Email Address" value={email} onChange={setEmail} type="email" placeholder="john@example.com" icon={<Mail size={16} />} colors={colors} />
                  <InputField label="Assigned Role" value={role} readOnly icon={<Shield size={16} />} colors={colors} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {primaryBtn(saving, "Save Changes", "Saving...")}
                </div>
              </form>
            </SectionCard>

            {/* Danger Zone */}
            <div style={{ borderRadius: "20px", border: "1px solid #fecdd3", backgroundColor: colors.card, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #fecdd3", display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#fff1f2" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626" }}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#991b1b", margin: 0 }}>Danger Zone</h2>
                  <p style={{ fontSize: "13px", color: "#b91c1c", margin: "2px 0 0 0", fontWeight: 500 }}>Sensitive actions.</p>
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>Terminate Sessions</p>
                  <p style={{ fontSize: "13px", color: colors.textMuted, margin: "2px 0 0 0" }}>Sign out of all devices immediately.</p>
                </div>
                <button
                  onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/login"; }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", border: "1px solid #fecdd3", backgroundColor: "#fff1f2", color: "#dc2626", fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <LogOut size={16} /> Sign Out All
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Password */}
            <SectionCard title="Security & Password" subtitle="Ensure your account stays secure." icon={<Lock size={20} />} colors={colors}>
              <form onSubmit={handlePwd}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <InputField label="Current Password" value={curPwd} onChange={setCurPwd} type={showCur ? "text" : "password"} placeholder="Enter current password" icon={<Lock size={16} />} right={eyeBtn(showCur, () => setShowCur(!showCur))} colors={colors} />
                  <InputField label="New Password" value={newPwd} onChange={setNewPwd} type={showNew ? "text" : "password"} placeholder="Min. 8 characters" icon={<Key size={16} />} right={eyeBtn(showNew, () => setShowNew(!showNew))} colors={colors} />
                  {strength && (
                    <div style={{ marginTop: "-4px", padding: "0 4px" }}>
                      <div style={{ display: "flex", gap: "4px", height: "4px" }}>
                        {[1, 2, 3, 4].map(idx => (
                          <div key={idx} style={{ flex: 1, borderRadius: "2px", backgroundColor: parseInt(strength.w) / 25 >= idx ? strength.color : colors.border, transition: "background-color 0.3s ease" }} />
                        ))}
                      </div>
                      <p style={{ fontSize: "12px", color: strength.color, margin: "6px 0 0 0", fontWeight: 700 }}>{strength.label} password</p>
                    </div>
                  )}
                  <InputField label="Confirm Password" value={conPwd} onChange={setConPwd} type={showCon ? "text" : "password"} placeholder="Confirm new password" icon={<Key size={16} />} right={eyeBtn(showCon, () => setShowCon(!showCon))} colors={colors} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {primaryBtn(updatePwd.isPending, "Update Password", "Updating...")}
                </div>
              </form>
            </SectionCard>

            {/* Activity Log */}
            <SectionCard title="Recent Activity" subtitle="Your latest account events." icon={<Activity size={20} />} colors={colors}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {ACTIVITY.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: i !== ACTIVITY.length - 1 ? "16px" : "0", borderBottom: i !== ACTIVITY.length - 1 ? `1px solid ${colors.border}` : "none" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: colors.bg, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{item.action}</p>
                      <p style={{ fontSize: "12px", color: colors.textMuted, margin: "2px 0 0 0", fontWeight: 500 }}>{item.detail}</p>
                    </div>
                    <span style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600 }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
          
        </div>
      </div>

      <Toast toasts={toasts} remove={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
    </>
  );
};

export default Profile;
