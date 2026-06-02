import React, { useState, useMemo } from "react";
import { Search, Package, Tag, BarChart2, ChevronDown, RefreshCw, Layers, Box, CircleDollarSign } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useProducts } from "../config/hooks/useProduct";
import { useQueryClient } from "@tanstack/react-query";

const Category: React.FC = () => {
  const { colors, theme } = useTheme();
  const queryClient = useQueryClient();
  const { data: products = [], isLoading, isError } = useProducts();

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Derive categories from products
  const categories = useMemo(() => {
    const map = new Map<string, { name: string; products: typeof products }>();
    products.forEach((p) => {
      const key = p.category?.trim() || "Uncategorized";
      if (!map.has(key)) map.set(key, { name: key, products: [] });
      map.get(key)!.products.push(p);
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filtered = useMemo(() =>
    categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    ), [categories, search]);

  const totalProducts  = products.length;
  const totalCategories = categories.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  // ── Loading State ──
  if (isLoading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ height: "100px", flex: 1, backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, animation: "pulse 1.5s ease-in-out infinite" }} />
        ))}
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={`row-${i}`} style={{ height: "70px", backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );

  // ── Error State ──
  if (isError) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "24px", backgroundColor: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
        <Package size={32} color="#dc2626" />
      </div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: "0 0 8px 0" }}>Failed to Load Categories</h2>
      <p style={{ fontSize: "14px", color: colors.textMuted, margin: "0 0 24px 0", maxWidth: "300px" }}>There was a problem fetching the inventory data. Please try again.</p>
      <button onClick={() => queryClient.invalidateQueries({ queryKey: ["products"] })} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: "none", backgroundColor: colors.primaryDark, color: "white", fontWeight: 700, cursor: "pointer", fontSize: "14px", boxShadow: `0 8px 16px -4px ${colors.primary}60` }}>
        <RefreshCw size={16} /> Try Again
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes expandDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Product Categories</h1>
            <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
              Dynamic catalog grouped from your live inventory data.
            </p>
          </div>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["products"] })}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.textMain, fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = colors.bg; e.currentTarget.style.borderColor = colors.primary; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = colors.card; e.currentTarget.style.borderColor = colors.border; }}
          >
            <RefreshCw size={15} /> Sync Data
          </button>
        </div>

        {/* ── Summary Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {[
            { label: "Total Categories", value: totalCategories, icon: <Layers size={22} />, color: colors.primary, bg: `linear-gradient(135deg, ${colors.primary}15, ${colors.primaryDark}15)` },
            { label: "Active Products",  value: totalProducts,   icon: <Box size={22} />, color: "#10b981", bg: "linear-gradient(135deg, #10b98115, #05966915)" },
            { label: "Total Asset Value",value: `$${totalValue.toLocaleString()}`, icon: <CircleDollarSign size={22} />, color: "#f59e0b", bg: "linear-gradient(135deg, #f59e0b15, #d9770615)" },
          ].map(({ label, value, icon, color, bg }) => (
            <div key={label} style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: "20px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: bg, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: color, flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <p style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>{value}</p>
                <p style={{ fontSize: "13px", color: colors.textMuted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search & Filter Bar ── */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, padding: "6px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <Search size={18} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            style={{ flex: 1, border: "none", backgroundColor: "transparent", padding: "12px", color: colors.textMain, fontSize: "15px", fontWeight: 500, outline: "none" }}
          />
        </div>

        {/* ── Category List ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", backgroundColor: colors.card, borderRadius: "24px", border: `2px dashed ${colors.border}` }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "20px", backgroundColor: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Tag size={28} color={colors.textMuted} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: colors.textMain, margin: "0 0 8px 0" }}>No Categories Found</h3>
            <p style={{ fontSize: "14px", fontWeight: 500, color: colors.textMuted, margin: 0 }}>
              {search ? "We couldn't find anything matching your search." : "Your inventory is currently empty."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((cat) => {
              const isOpen = expanded === cat.name;
              const totalStock = cat.products.reduce((s, p) => s + p.stock, 0);
              const catValue   = cat.products.reduce((s, p) => s + p.price * p.stock, 0);

              return (
                <div key={cat.name} style={{ backgroundColor: colors.card, border: `1px solid ${isOpen ? colors.primary : colors.border}`, borderRadius: "20px", overflow: "hidden", transition: "all 0.3s ease", boxShadow: isOpen ? `0 8px 24px -8px ${colors.primary}40` : "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
                  
                  {/* Category Header Row */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : cat.name)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: isOpen ? `${colors.primary}08` : "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}
                  >
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: isOpen ? colors.primary : colors.bg, border: `1px solid ${isOpen ? colors.primaryDark : colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: isOpen ? "white" : colors.textMuted, transition: "all 0.3s" }}>
                      <Tag size={20} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: "0 0 4px 0" }}>{cat.name}</h3>
                      <p style={{ fontSize: "13px", color: colors.textMuted, margin: 0, fontWeight: 500 }}>
                        {cat.products.length} registered item{cat.products.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                      <div style={{ textAlign: "right", display: window.innerWidth < 640 ? "none" : "block" }}>
                        <p style={{ fontSize: "15px", fontWeight: 800, color: colors.textMain, margin: "0 0 2px 0" }}>{totalStock}</p>
                        <p style={{ fontSize: "11px", color: colors.textMuted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Stock</p>
                      </div>
                      <div style={{ textAlign: "right", display: window.innerWidth < 480 ? "none" : "block" }}>
                        <p style={{ fontSize: "15px", fontWeight: 800, color: colors.textMain, margin: "0 0 2px 0" }}>${catValue.toLocaleString()}</p>
                        <p style={{ fontSize: "11px", color: colors.textMuted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Net Value</p>
                      </div>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: isOpen ? `${colors.primary}20` : colors.bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                         <ChevronDown size={18} color={isOpen ? colors.primary : colors.textMuted} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Product Table */}
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${colors.border}`, padding: "20px 24px", backgroundColor: colors.bg, animation: "expandDown 0.3s ease" }}>
                      <div style={{ overflowX: "auto", borderRadius: "14px", border: `1px solid ${colors.border}`, backgroundColor: colors.card }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                          <thead>
                            <tr style={{ backgroundColor: theme === "light" ? "#f8fafc" : "#0f172a", borderBottom: `2px solid ${colors.border}` }}>
                              {["Product Name", "Brand", "Unit Price", "In Stock", "Status"].map((h) => (
                                <th key={h} style={{ padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {cat.products.map((p, i) => {
                              const status = p.stock > 20 ? "Optimal" : p.stock > 0 ? "Low Stock" : "Depleted";
                              const statusColor = p.stock > 20 ? "#10b981" : p.stock > 0 ? "#f59e0b" : "#ef4444";
                              return (
                                <tr key={p.id} style={{ borderBottom: i === cat.products.length - 1 ? "none" : `1px solid ${colors.border}`, transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.bg} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                                  <td style={{ padding: "16px 20px" }}>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{p.name}</p>
                                    <p style={{ fontSize: "11px", color: colors.textMuted, margin: "4px 0 0 0", fontFamily: "monospace" }}>#{p.id.slice(-6).toUpperCase()}</p>
                                  </td>
                                  <td style={{ padding: "16px 20px", fontSize: "14px", color: colors.textMuted, fontWeight: 500 }}>{p.brand || "—"}</td>
                                  <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: colors.textMain }}>${p.price.toLocaleString()}</td>
                                  <td style={{ padding: "16px 20px" }}>
                                    <span style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain }}>{p.stock}</span>
                                  </td>
                                  <td style={{ padding: "16px 20px" }}>
                                    <span style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: 800, color: statusColor, backgroundColor: `${statusColor}15`, border: `1px solid ${statusColor}30`, padding: "4px 10px", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                      {status}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
