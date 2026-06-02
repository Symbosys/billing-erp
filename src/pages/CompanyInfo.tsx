import React, { useState } from "react";
import { Briefcase, MapPin, Phone, Mail, Hash, Building, Save, CheckCircle2, DollarSign, Image as ImageIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CompanyInfo: React.FC = () => {
  const { colors } = useTheme();
  
  const [formData, setFormData] = useState({
    companyName: "SymboSys Technologies",
    registrationNo: "GST-29103910XX",
    address: "123 Tech Avenue, Software Park",
    city: "San Francisco",
    country: "United States",
    zipCode: "94105",
    phone: "+1 (555) 123-4567",
    email: "contact@symbosys.com",
    currency: "USD ($)",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.email.trim()) {
      alert("Company Name and Email are required.");
      return;
    }

    // Mock API Call
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const InputField = ({ label, value, field, icon, placeholder, type = "text", options }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 calc(50% - 20px)", minWidth: "250px" }}>
      <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>{label}</label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: colors.textMuted }}>{icon}</span>
        {options ? (
          <select
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 16px 12px 42px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bg,
              color: colors.textMain, fontSize: "14px", fontWeight: 500,
              outline: "none", transition: "all 0.2s ease",
              appearance: "none",
            }}
          >
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 16px 12px 42px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bg,
              color: colors.textMain, fontSize: "14px", fontWeight: 500,
              outline: "none", transition: "all 0.2s ease",
            }}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        )}
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
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Company Information</h1>
          <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
            Manage your global business details, address, and localized settings.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "12px", backgroundColor: "#ecfdf5", border: "1px solid #34d399", animation: "fadeUp 0.3s ease" }}>
            <CheckCircle2 size={20} color="#059669" />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#065f46" }}>Company profile updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            
            {/* Logo Upload Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingBottom: "32px", marginBottom: "32px", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "16px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary, border: `2px dashed ${colors.primary}` }}>
                <ImageIcon size={32} />
              </div>
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 700, color: colors.textMain }}>Company Logo</h3>
                <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: colors.textMuted, fontWeight: 500 }}>Recommended resolution is 512x512px. Max size 2MB.</p>
                <button type="button" style={{ padding: "8px 16px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, color: colors.textMain, fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.border} onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.bg}>
                  Upload New Logo
                </button>
              </div>
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Briefcase size={20} color={colors.primary} /> General Details
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
              <InputField label="Company Name" field="companyName" value={formData.companyName} icon={<Building size={18} />} placeholder="e.g. SymboSys LLC" />
              <InputField label="Registration / Tax ID" field="registrationNo" value={formData.registrationNo} icon={<Hash size={18} />} placeholder="e.g. GST-123456" />
              <InputField label="Contact Email" field="email" type="email" value={formData.email} icon={<Mail size={18} />} placeholder="e.g. hello@company.com" />
              <InputField label="Contact Phone" field="phone" value={formData.phone} icon={<Phone size={18} />} placeholder="e.g. +1 (555) 000-0000" />
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={20} color={colors.primary} /> Address & Localization
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ flexBasis: "100%" }}>
                <InputField label="Street Address" field="address" value={formData.address} icon={<MapPin size={18} />} placeholder="e.g. 123 Tech Avenue" />
              </div>
              <InputField label="City" field="city" value={formData.city} icon={<Building size={18} />} placeholder="e.g. San Francisco" />
              <InputField label="Zip / Postal Code" field="zipCode" value={formData.zipCode} icon={<Hash size={18} />} placeholder="e.g. 94105" />
              <InputField label="Country" field="country" value={formData.country} icon={<MapPin size={18} />} placeholder="e.g. United States" />
              <InputField label="Default Currency" field="currency" value={formData.currency} icon={<DollarSign size={18} />} options={["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)"]} />
            </div>

          </div>

          {/* Save Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "14px", border: "none",
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: "white", fontSize: "15px", fontWeight: 700,
                cursor: "pointer", boxShadow: `0 8px 20px -6px ${colors.primary}80`,
                transition: "all 0.2s"
              }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Save size={18} />
              Save Company Info
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default CompanyInfo;
