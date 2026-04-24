import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreVertical, 
  Users, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  LayoutGrid, 
  List as ListIcon, 
  ChevronRight,
  Trash2,
  CalendarDays,
  ArrowUpRight,
  X,
  ShieldCheck
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";

// --- Mock Data ---
const INITIAL_CUSTOMERS = [
  { id: 1, name: "Alexander Wright", email: "alex.wright@quantum.io", phone: "+1 (555) 012-3456", location: "San Francisco, CA", status: "Active", joined: "Oct 12, 2023", revenue: 45200, avatar: "AW" },
  { id: 2, name: "Sophia Chen", email: "s.chen@nexus-tech.com", phone: "+1 (555) 012-7890", location: "New York, NY", status: "Active", joined: "Nov 05, 2023", revenue: 128400, avatar: "SC" },
  { id: 3, name: "Marcus Miller", email: "marcus.m@vortex.net", phone: "+1 (555) 012-1122", location: "Austin, TX", status: "Pending", joined: "Dec 01, 2023", revenue: 0, avatar: "MM" },
  { id: 4, name: "Elena Rodriguez", email: "elena.r@horizon.com", phone: "+1 (555) 012-3344", location: "Chicago, IL", status: "Active", joined: "Jan 15, 2024", revenue: 67900, avatar: "ER" },
  { id: 5, name: "Julian Thorne", email: "j.thorne@stellar.com", phone: "+1 (555) 012-5566", location: "Seattle, WA", status: "Inactive", joined: "Feb 20, 2024", revenue: 12400, avatar: "JT" },
  { id: 6, name: "Aria Montgomery", email: "aria.m@nebula.io", phone: "+1 (555) 012-7788", location: "Denver, CO", status: "Active", joined: "Mar 10, 2024", revenue: 89000, avatar: "AM" },
];

const Customers: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const itemsPerPage = 8;

  // Responsive Hooks
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  // Filter & Sort Logic
  const filteredCustomers = useMemo(() => {
    return customers
      .filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "revenue") return b.revenue - a.revenue;
        return b.id - a.id;
      });
  }, [customers, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "Active"
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = {
      ...formData,
      id: customers.length + 1,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      revenue: 0,
      avatar: formData.name.split(" ").map(n => n[0]).join("").toUpperCase()
    };
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", phone: "", location: "", status: "Active" });
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const colors = {
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#e0e7ff",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    textMain: "#1e293b",
    textMuted: "#64748b",
    bg: "#f8fafc",
    card: "#ffffff",
    border: "#e2e8f0",
  };

  const shadows = {
    soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    premium: "0 20px 40px -12px rgba(79, 70, 229, 0.25)",
  };

  const stats = [
    { title: "Active Network", value: "1,284", icon: <Users size={24} />, color: colors.primary, change: "+12.5%" },
    { title: "Net Growth", value: "$4.2M", icon: <TrendingUp size={24} />, color: colors.success, change: "+18.2%" },
    { title: "Retention", value: "98.4%", icon: <ShieldCheck size={24} />, color: colors.warning, change: "+0.5%" },
    { title: "Avg Session", value: "24m", icon: <Clock size={24} />, color: colors.danger, change: "-2.1%" },
  ];

  // --- Inline Styles ---
  const styles = {
    pageContainer: {
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
      fontSize: isMobile ? "14px" : "16px"
    },
    statsGrid: {
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
      minWidth: "260px"
    },
    statCard: (color: string) => ({
      padding: isMobile ? "20px" : "24px",
      borderRadius: "24px",
      backgroundColor: "white",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      transition: "all 0.3s ease",
      position: "relative" as const,
      overflow: "hidden",
    }),
    statIconBox: (color: string) => ({
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
      backgroundColor: "white",
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      position: "sticky" as const,
      top: "80px",
      zIndex: 10,
    },
    searchContainer: {
      position: "relative" as const,
      flex: 3,
    },
    searchInput: {
      width: "100%",
      padding: "12px 16px 12px 48px",
      borderRadius: "14px",
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      outline: "none",
      fontSize: "14px",
      fontWeight: 500,
      transition: "border-color 0.2s",
    },
    customerGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
      gap: isMobile ? "20px" : "24px",
    },
    customerCard: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
      position: "relative" as const,
      cursor: "pointer",
    },
    avatar: {
      width: "56px",
      height: "56px",
      borderRadius: "16px",
      backgroundColor: colors.primaryLight,
      color: colors.primaryDark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: 800,
    },
    pagination: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "28px",
      paddingTop: "48px",
    },
    pageBtn: (isActive: boolean) => ({
      width: "52px",
      height: "52px",
      borderRadius: "18px",
      border: isActive ? "none" : `1px solid ${colors.border}`,
      backgroundColor: isActive ? colors.primary : "white",
      color: isActive ? "white" : colors.textMain,
      fontWeight: 900,
      fontSize: "15px",
      cursor: "pointer",
      boxShadow: isActive ? shadows.premium : "none",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      animation: "fadeIn 0.3s ease-out",
      padding: "20px",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "32px",
      width: "100%",
      maxWidth: "600px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      overflow: "hidden",
      animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Client Network</h1>
          <p style={styles.subtitle}>Architecting global relationships through advanced data visualization.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", width: isMobile ? "100%" : "auto" }}>
          <Button 
            variant="secondary" 
            style={{ borderRadius: "14px", padding: "12px", backgroundColor: "white", border: `1px solid ${colors.border}` }}
            leftIcon={<Download size={18} />}
          />
          <Button 
            variant="primary" 
            style={{ borderRadius: "14px", padding: "12px 24px", backgroundColor: colors.primaryDark, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)", fontWeight: 600 }} 
            leftIcon={<Plus size={20} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            New Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} style={styles.statCardWrapper}>
            <div 
              style={styles.statCard(stat.color)} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={styles.statIconBox(stat.color)}>{stat.icon}</div>
                <Badge variant={stat.change.startsWith('+') ? "success" : "danger"} style={{ fontWeight: 700, fontSize: "10px" }}>
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.textMuted, margin: "0 0 4px 0" }}>{stat.title}</p>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & View Controls */}
      <div style={styles.filterBar}>
        <div style={styles.searchContainer}>
          <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={18} />
          <input 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            onFocus={(e) => e.target.style.borderColor = colors.primaryDark}
            onBlur={(e) => e.target.style.borderColor = colors.border}
            placeholder="Search by name, email, or location..." 
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", width: isMobile ? "100%" : "auto", justifyContent: "space-between" }}>
          <Select 
            value={sortBy}
            onChange={(val) => setSortBy(val as string)}
            options={[
              { label: "Newest First", value: "latest" },
              { label: "Alphabetical", value: "name" },
              { label: "High Revenue", value: "revenue" },
            ]}
            style={{ borderRadius: "12px", width: isMobile ? "100%" : "180px" }}
          />

          <div style={{ display: "flex", gap: "4px", padding: "4px", backgroundColor: colors.bg, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
            <button 
              onClick={() => setView("grid")}
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: view === "grid" ? "white" : "transparent", color: view === "grid" ? colors.primaryDark : colors.textMuted, boxShadow: view === "grid" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView("list")}
              style={{ padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer", display: "flex", backgroundColor: view === "list" ? "white" : "transparent", color: view === "list" ? colors.primaryDark : colors.textMuted, boxShadow: view === "list" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s ease" }}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {paginatedCustomers.length > 0 ? (
        view === "grid" ? (
          <div style={styles.customerGrid}>
            {paginatedCustomers.map((customer) => (
              <div 
                key={customer.id} 
                style={styles.customerCard} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = colors.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={styles.avatar}>{customer.avatar}</div>
                    <Badge 
                      variant={customer.status === 'Active' ? 'success' : customer.status === 'Pending' ? 'warning' : 'neutral'}
                      dot
                      style={{ padding: "4px 10px", fontSize: "11px", fontWeight: 700 }}
                    >
                      {customer.status}
                    </Badge>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: colors.textMain, margin: 0 }}>{customer.name}</h3>
                    <p style={{ fontSize: "13px", color: colors.textMuted, fontWeight: 500, marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={14} style={{ color: colors.primaryDark }} />
                      {customer.location}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", padding: "16px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMain, fontSize: "13px", fontWeight: 600 }}>
                      <Mail size={14} style={{ color: colors.secondary }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{customer.email}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMain, fontSize: "13px", fontWeight: 600 }}>
                      <Phone size={14} style={{ color: colors.secondary }} />
                      {customer.phone}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", margin: 0 }}>Revenue</p>
                      <p style={{ fontSize: "18px", fontWeight: 800, color: colors.textMain, margin: "2px 0 0 0" }}>${customer.revenue.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      style={{ padding: "8px", borderRadius: "10px", border: "none", backgroundColor: colors.primaryLight, color: colors.primaryDark, cursor: "pointer", display: "flex", transition: "all 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark + '20'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primaryLight}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ backgroundColor: "white", borderRadius: "40px", border: `1px solid ${colors.border}`, boxShadow: shadows.soft, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }} className="custom-scrollbar">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1100px" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: "rgba(248, 250, 252, 0.8)" }}>
                    {["Entity Profile", "Digital Access", "Geographic Region", "Status Log", "Revenue Flow", "Actions"].map((th, i) => (
                      <th key={i} style={{ padding: "28px 40px", fontSize: "12px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.2em", textAlign: th === "Revenue Flow" ? "right" : "left" }}>
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} style={{ borderBottom: `1px solid ${colors.border}`, transition: "background-color 0.3s ease" }} className="hover:bg-slate-50/50">
                      <td style={{ padding: "24px 40px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                          <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: "white", color: colors.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: `1px solid ${colors.primary}10` }}>
                            {customer.avatar}
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 900, color: colors.textMain, fontSize: "16px", margin: 0 }}>{customer.name}</h4>
                            <p style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600, marginTop: "2px" }}>#CUST-ID-2024-0{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "24px 40px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: colors.textMain }}>{customer.email}</span>
                          <span style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 600 }}>{customer.phone}</span>
                        </div>
                      </td>
                      <td style={{ padding: "24px 40px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMain, fontSize: "14px", fontWeight: 700 }}>
                          <MapPin size={16} style={{ color: colors.primaryLight }} />
                          {customer.location}
                        </div>
                      </td>
                      <td style={{ padding: "24px 40px" }}>
                        <Badge 
                          variant={customer.status === 'Active' ? 'success' : customer.status === 'Pending' ? 'warning' : 'neutral'}
                          dot
                          style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 900, borderRadius: "12px" }}
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td style={{ padding: "24px 40px", textAlign: "right" }}>
                        <span style={{ fontSize: "18px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.02em" }}>${customer.revenue.toLocaleString()}</span>
                      </td>
                      <td style={{ padding: "24px 40px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                          <button 
                            onClick={() => setSelectedCustomer(customer)}
                            style={{ padding: "10px", borderRadius: "14px", border: "none", backgroundColor: colors.primaryLight, color: colors.primaryDark, cursor: "pointer" }}
                          >
                            <Search size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(customer.id)}
                            style={{ padding: "10px", borderRadius: "14px", border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff1f2"; e.currentTarget.style.color = colors.danger; e.currentTarget.style.transform = "scale(1.1)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.transform = "scale(1)"; }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 0", backgroundColor: "white", borderRadius: "40px", textAlign: "center", border: `2px dashed ${colors.border}` }}>
          <div style={{ width: "100px", height: "100px", backgroundColor: colors.bg, borderRadius: "40px", display: "flex", alignItems: "center", justifyContent: "center", color: colors.textMuted, marginBottom: "32px", transform: "rotate(-10deg)" }}>
            <Search size={50} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: 900, color: colors.textMain }}>Neural Query: No Match</h3>
          <Button 
            variant="primary" 
            style={{ marginTop: "40px", borderRadius: "18px", padding: "16px 40px", backgroundColor: colors.primary }} 
            onClick={() => setSearchQuery("")}
          >
            Reset Intelligence Nodes
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <div style={styles.pagination}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "white", padding: "12px 24px", borderRadius: "24px", border: `1px solid ${colors.border}`, boxShadow: shadows.soft }}>
            <p style={{ fontSize: "14px", fontWeight: 800, color: colors.textMuted, margin: 0 }}>
              Segment <span style={{ color: colors.primary, fontWeight: 900 }}>{currentPage}</span> / {totalPages}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              style={styles.pageBtn(false)}
            >
              <ChevronRight size={24} style={{ transform: "rotate(180deg)" }} />
            </button>
            <div style={{ display: "flex", gap: "12px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button 
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={styles.pageBtn(p === currentPage)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              style={styles.pageBtn(false)}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsAddModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: colors.textMain, margin: 0 }}>Register Client</h2>
                <p style={{ fontSize: "14px", color: colors.textMuted, margin: "4px 0 0 0", fontWeight: 500 }}>Enter the new entity details below.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                style={{ padding: "8px", borderRadius: "12px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "32px" }}>
              <form style={{ display: "flex", flexDirection: "column", gap: "24px" }} onSubmit={handleAddCustomer}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Client Name</label>
                    <div style={{ position: "relative" }}>
                      <Users size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="John Doe / Acme Corp"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Email Address</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        type="email"
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Phone Number</label>
                    <div style={{ position: "relative" }}>
                      <Phone size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Location</label>
                    <div style={{ position: "relative" }}>
                      <MapPin size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                      <input 
                        style={{ width: "100%", padding: "12px 12px 12px 42px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.bg, outline: "none", fontSize: "14px" }}
                        placeholder="New York, USA"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: colors.textMain }}>Client Status</label>
                  <Select 
                    value={formData.status}
                    onChange={(val) => setFormData({...formData, status: val as string})}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Pending", value: "Pending" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                    style={{ borderRadius: "12px" }}
                  />
                </div>
              </form>
            </div>

            <div style={{ padding: "24px 32px", backgroundColor: colors.bg, borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                style={{ padding: "10px 20px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: "white", color: colors.textMuted, fontWeight: 700, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCustomer}
                style={{ padding: "10px 24px", borderRadius: "12px", border: "none", backgroundColor: colors.primaryDark, color: "white", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)" }}
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div style={styles.modalOverlay} onClick={() => setSelectedCustomer(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "32px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ ...styles.avatar, width: "48px", height: "48px", fontSize: "16px" }}>{selectedCustomer.avatar}</div>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, color: colors.textMain, margin: 0 }}>{selectedCustomer.name}</h2>
                  <p style={{ fontSize: "12px", color: colors.textMuted, margin: "2px 0 0 0", fontWeight: 600 }}>#CUST-ID-2024-0{selectedCustomer.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                style={{ padding: "8px", borderRadius: "12px", border: "none", backgroundColor: colors.bg, color: colors.textMuted, cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Revenue Generated</label>
                  <p style={{ fontSize: "28px", fontWeight: 800, color: colors.textMain, margin: "8px 0 0 0" }}>${selectedCustomer.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Onboarding Date</label>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: colors.textMain, margin: "8px 0 0 0" }}>{selectedCustomer.joined}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <Mail size={20} style={{ color: colors.primaryDark }} />
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: colors.textMuted, margin: 0 }}>Primary Email</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: colors.textMain, margin: 0 }}>{selectedCustomer.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <Phone size={20} style={{ color: colors.primaryDark }} />
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: colors.textMuted, margin: 0 }}>Phone Number</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: colors.textMain, margin: 0 }}>{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}>
                  <MapPin size={20} style={{ color: colors.primaryDark }} />
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: colors.textMuted, margin: 0 }}>Main Office</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: colors.textMain, margin: 0 }}>{selectedCustomer.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: "24px 32px", backgroundColor: colors.bg, borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                onClick={() => setSelectedCustomer(null)}
                style={{ padding: "10px 24px", borderRadius: "12px", border: "none", backgroundColor: colors.primaryDark, color: "white", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)" }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Customers;
