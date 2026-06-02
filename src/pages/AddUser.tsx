import React, { useState } from "react";
import { UserPlus, Mail, Lock, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCreateUser } from "../config/hooks/useUser";

const AddUser: React.FC = () => {
  const { colors } = useTheme();
  const createUser = useCreateUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STAFF");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setMessage({ text: "All fields are required.", type: "error" });
      return;
    }
    if (password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters long.", type: "error" });
      return;
    }
    
    try {
      await createUser.mutateAsync({ email, password, role });
      setMessage({ text: "User created successfully!", type: "success" });
      setEmail("");
      setPassword("");
      setRole("STAFF");
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: err?.response?.data?.message || "Failed to create user.", type: "error" });
    }
  };

  const InputField = ({ label, value, onChange, type = "text", placeholder, icon }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: colors.textMuted }}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "12px 16px 12px 42px",
            borderRadius: "12px",
            border: `1.5px solid ${colors.border}`,
            backgroundColor: colors.card,
            color: colors.textMain, fontSize: "14px", fontWeight: 600,
            outline: "none", transition: "all 0.2s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Add User</h1>
          <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
            Create a new account for your team members.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "12px", backgroundColor: message.type === "success" ? "#ecfdf5" : "#fff1f2", border: `1px solid ${message.type === "success" ? "#34d399" : "#fca5a5"}` }}>
            {message.type === "success" ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#dc2626" />}
            <span style={{ fontSize: "14px", fontWeight: 600, color: message.type === "success" ? "#065f46" : "#991b1b" }}>{message.text}</span>
          </div>
        )}

        {/* Form Card */}
        <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", maxWidth: "600px" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
              <UserPlus size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: colors.textMain, margin: 0 }}>User Details</h2>
              <p style={{ fontSize: "13px", color: colors.textMuted, margin: "2px 0 0 0", fontWeight: 500 }}>Enter the credentials for the new user.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <InputField label="Email Address" value={email} onChange={setEmail} type="email" placeholder="user@example.com" icon={<Mail size={16} />} />
            
            <InputField label="Password" value={password} onChange={setPassword} type="password" placeholder="Min. 8 characters" icon={<Lock size={16} />} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Assigned Role
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{ position: "absolute", left: "14px", color: colors.textMuted }}><Shield size={16} /></span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 16px 12px 42px",
                    borderRadius: "12px",
                    border: `1.5px solid ${colors.border}`,
                    backgroundColor: colors.card,
                    color: colors.textMain, fontSize: "14px", fontWeight: 600,
                    outline: "none", appearance: "none",
                  }}
                >
                  <option value="STAFF">STAFF</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
              <button type="submit" disabled={createUser.isPending} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "12px 24px", borderRadius: "12px", border: "none",
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: "white", fontWeight: 700, fontSize: "14px",
                cursor: createUser.isPending ? "not-allowed" : "pointer", opacity: createUser.isPending ? 0.8 : 1,
                boxShadow: `0 8px 16px -4px ${colors.primary}60`, transition: "all 0.2s",
              }}>
                <UserPlus size={16} /> {createUser.isPending ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
