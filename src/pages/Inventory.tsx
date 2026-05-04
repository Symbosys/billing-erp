import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  AlertTriangle,
  Layers,
  Box,
  Truck,
  Trash2,
  RefreshCw,
  MapPin,
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Select from "../components/Select";
import { useTheme } from "../context/ThemeContext";
import { useQueryClient } from "@tanstack/react-query";
import {
  useProducts,
  useDeleteProduct,
} from "../config/hooks/useProduct";
import { useInventoryStats } from "../config/hooks/useInventory";

const Inventory: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredRow, setHoveredRow] = useState<number | string | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const { theme, colors } = useTheme();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const { data: statsData, isLoading: isStatsLoading } = useInventoryStats();

  const defaultStats = [
    {
      label: "Asset Value",
      value: "---",
      trend: "---",
      icon: <Layers size={22} />,
      color: colors.primaryDark,
    },
    {
      label: "Critical Stock",
      value: "---",
      trend: "---",
      icon: <AlertTriangle size={22} />,
      color: colors.danger,
    },
    {
      label: "Inbound Flow",
      value: "---",
      trend: "---",
      icon: <Truck size={22} />,
      color: colors.info,
    },
    {
      label: "Active Nodes",
      value: "---",
      trend: "---",
      icon: <MapPin size={22} />,
      color: colors.warning,
    },
  ];

  const stats = statsData
    ? statsData.map((stat, i) => ({
        ...stat,
        icon: defaultStats[i].icon,
        color: defaultStats[i].color,
      }))
    : defaultStats;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      p.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });



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
      marginBottom: "8px",
    },
    titleSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "4px",
    },
    title: {
      fontSize: isMobile ? "28px" : "36px",
      fontWeight: 800,
      color: colors.textMain,
      letterSpacing: "-0.02em",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    subtitle: {
      color: colors.textMuted,
      margin: 0,
      fontWeight: 500,
      fontSize: isMobile ? "14px" : "16px",
    },
    statsRow: {
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
      minWidth: "260px",
    },
    statCard: (_color: string) => ({
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
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
      top: "80px", // Aligned with Navbar height
      zIndex: 10,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Inventory Matrix</h1>
          <p style={styles.subtitle}>
            Real-time oversight of global assets and inbound logistics.
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={
            <RefreshCw
              size={18}
              className={
                isProductsLoading || isStatsLoading ? "animate-spin" : ""
              }
            />
          }
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["inventoryStats"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
          }}
          style={{
            borderRadius: "14px",
            padding: "12px",
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        />
      </div>

      <div style={styles.statsRow}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCardWrapper}>
            <div
              style={styles.statCard(stat.color)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px -5px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0,0,0,0.05)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={styles.iconWrapper(stat.color)}>{stat.icon}</div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: stat.trend.startsWith("+")
                      ? colors.success
                      : stat.trend.startsWith("-")
                        ? colors.danger
                        : colors.textMuted,
                  }}
                >
                  {stat.trend}
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: colors.textMuted,
                    margin: "0 0 4px 0",
                  }}
                >
                  {stat.label}
                </p>
                <h4
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: colors.textMain,
                    margin: 0,
                  }}
                >
                  {stat.value}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>



      <div style={styles.filterBar}>
        <div style={{ position: "relative", flex: 3 }}>
          <Search
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: colors.textMuted,
            }}
            size={18}
          />
          <input
            style={{
              width: "100%",
              padding: "12px 16px 12px 48px",
              borderRadius: "14px",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bg,
              outline: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "border-color 0.2s",
            }}
            placeholder="Search assets by SKU, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 2 }}>
          <Select
            value={filterCategory}
            onChange={(val) => setFilterCategory(val as string)}
            options={[
              { label: "All Sectors", value: "all" },
              { label: "Electronics", value: "elec" },
              { label: "Furniture", value: "furn" },
              { label: "Logistics", value: "logi" },
            ]}
            style={{ borderRadius: "14px", flex: 1 }}
          />
          <Button
            variant="secondary"
            leftIcon={<Download size={18} />}
            style={{
              borderRadius: "14px",
              padding: "12px 20px",
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              flex: 1,
            }}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <Card
        style={{
          borderRadius: "32px",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                minWidth: "1000px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor:
                      theme === "light"
                        ? "#f8fafc"
                        : "rgba(255, 255, 255, 0.02)",
                  }}
                >
                  {[
                    "Asset Details",
                    "SKU Identity",
                    "Global Stock",
                    "Valuation",
                    "Status",
                    "Actions",
                  ].map((h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "16px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: colors.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => {
                  const status =
                    item.stock > 20
                      ? "In Stock"
                      : item.stock > 0
                        ? "Low Stock"
                        : "Out of Stock";
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: `1px solid ${colors.border}`,
                        transition: "background-color 0.3s ease",
                        backgroundColor:
                          hoveredRow === item.id
                            ? "rgba(79, 70, 229, 0.02)"
                            : "transparent",
                      }}
                      onMouseEnter={() => setHoveredRow(item.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={{ padding: "16px 24px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "12px",
                              backgroundColor: colors.bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: colors.primaryDark,
                            }}
                          >
                            <Box size={20} />
                          </div>
                          <div>
                            <h5
                              style={{
                                fontWeight: 700,
                                color: colors.textMain,
                                fontSize: "15px",
                                margin: 0,
                              }}
                            >
                              {item.name}
                            </h5>
                            <p
                              style={{
                                fontSize: "12px",
                                color: colors.textMuted,
                                fontWeight: 500,
                                marginTop: "2px",
                              }}
                            >
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <code
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: colors.bg,
                            padding: "4px 8px",
                            borderRadius: "6px",
                            color: colors.primaryDark,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          {item.id.slice(-6).toUpperCase()}
                        </code>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: colors.textMain,
                            }}
                          >
                            {item.stock}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: colors.textMain,
                        }}
                      >
                        ${item.price.toLocaleString()}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <Badge
                          variant={
                            status === "In Stock"
                              ? "success"
                              : status === "Low Stock"
                                ? "warning"
                                : "danger"
                          }
                          dot
                          style={{
                            padding: "4px 10px",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {status}
                        </Badge>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <div
                            onClick={() =>
                              deleteProductMutation.mutate(item.id)
                            }
                          >
                            <IconButton
                              icon={<Trash2 size={16} />}
                              hoverColor={colors.danger}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
        <div
          style={{
            padding: "24px 32px",
            borderTop: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: colors.textMuted,
            }}
          >
            Telemetric Sync: Inventory Node Active
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="ghost"
              style={{ borderRadius: "12px", fontWeight: 700 }}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              style={{
                borderRadius: "12px",
                fontWeight: 700,
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              Next Sector
            </Button>
          </div>
        </div>
      </Card>



      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Helper component for table action buttons
const IconButton: React.FC<{ icon: React.ReactNode; hoverColor: string }> = ({
  icon,
  hoverColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      style={{
        padding: "10px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: isHovered ? `${hoverColor}15` : "transparent",
        color: isHovered ? hoverColor : "#64748b",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </button>
  );
};

export default Inventory;
