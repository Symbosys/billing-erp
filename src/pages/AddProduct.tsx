import React, { useState } from "react";
import { Package, Tag, DollarSign, Layers, Plus, Save, CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCreateProduct } from "../config/hooks/useProduct";

const AddProduct: React.FC = () => {
  const { colors } = useTheme();
  const createProduct = useCreateProduct();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Electronics",
    brand: "",
    stock: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.stock) {
      alert("Please fill in all required fields (Name, Price, Stock).");
      return;
    }

    const priceVal = parseFloat(formData.price);
    const stockVal = parseInt(formData.stock, 10);

    if (isNaN(priceVal) || priceVal <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    if (isNaN(stockVal) || stockVal < 0) {
      alert("Stock must be a non-negative integer.");
      return;
    }

    createProduct.mutate(
      {
        name: formData.name,
        price: priceVal,
        category: formData.category,
        brand: formData.brand,
        stock: stockVal,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setFormData({ name: "", price: "", category: "Electronics", brand: "", stock: "" });
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: () => {
          alert("Failed to add product. Please try again.");
        }
      }
    );
  };

  const InputField = ({ label, value, field, icon, type = "text", placeholder, options }: any) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 250px" }}>
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
              backgroundColor: colors.card,
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
              backgroundColor: colors.card,
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
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Add Product</h1>
          <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
            Create a new product to add to your inventory list.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "12px", backgroundColor: "#ecfdf5", border: "1px solid #34d399", animation: "fadeUp 0.3s ease" }}>
            <CheckCircle2 size={20} color="#059669" />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#065f46" }}>Product created successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, padding: "28px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Package size={20} color={colors.primary} /> Product Information
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <InputField label="Product Name" field="name" value={formData.name} icon={<Tag size={18} />} placeholder="e.g. Wireless Mouse" />
              <InputField label="Brand" field="brand" value={formData.brand} icon={<Package size={18} />} placeholder="e.g. Logitech" />
              <div style={{ flexBasis: "100%" }} /> {/* Line break */}
              <InputField label="Price" field="price" type="number" value={formData.price} icon={<DollarSign size={18} />} placeholder="e.g. 29.99" />
              <InputField label="Stock Quantity" field="stock" type="number" value={formData.stock} icon={<Layers size={18} />} placeholder="e.g. 100" />
              <div style={{ flexBasis: "100%" }} /> {/* Line break */}
              <InputField 
                label="Category" 
                field="category" 
                value={formData.category} 
                icon={<Tag size={18} />} 
                options={["Electronics", "Furniture", "Clothing", "Food", "Other"]}
              />
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={createProduct.isPending}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "14px", border: "none",
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: "white", fontSize: "15px", fontWeight: 700,
                cursor: createProduct.isPending ? "not-allowed" : "pointer",
                opacity: createProduct.isPending ? 0.8 : 1,
                boxShadow: `0 8px 20px -6px ${colors.primary}80`,
                transition: "all 0.2s"
              }}
            >
              <Save size={18} />
              {createProduct.isPending ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default AddProduct;
