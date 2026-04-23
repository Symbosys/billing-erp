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
  ArrowUpRight
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
  const itemsPerPage = 6;

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
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    primaryGhost: "rgba(79, 70, 229, 0.05)",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "#f1f5f9",
    bg: "#f8fafc",
    cardBg: "rgba(255, 255, 255, 0.8)",
    emerald: "#10b981",
    rose: "#f43f5e",
    amber: "#f59e0b",
  };

  const shadows = {
    soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
    premium: "0 20px 40px -12px rgba(79, 70, 229, 0.25)",
  };

  const stats = [
    { title: "Active Network", value: "1,284", icon: <Users size={24} />, color: colors.primary, change: "+12.5%" },
    { title: "Net Growth", value: "$4.2M", icon: <TrendingUp size={24} />, color: colors.emerald, change: "+18.2%" },
    { title: "Retention", value: "98.4%", icon: <ShieldCheck size={24} />, color: colors.amber, change: "+0.5%" },
    { title: "Avg Session", value: "24m", icon: <Clock size={24} />, color: colors.rose, change: "-2.1%" },
  ];

  // --- Inline Styles ---
  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? "32px" : "48px",
      paddingBottom: "60px",
      animation: "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      alignItems: isMobile ? ("flex-start" as const) : ("center" as const),
      justifyContent: "space-between",
      gap: "32px",
      position: "relative" as const,
    },
    titleSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    title: {
      fontSize: isMobile ? "36px" : "56px",
      fontWeight: 900,
      color: colors.textMain,
      letterSpacing: "-0.05em",
      lineHeight: 0.95,
      margin: 0,
    },
    subtitle: {
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: 500,
      color: colors.textMuted,
      maxWidth: "640px",
      lineHeight: 1.5,
    },
    actionButtons: {
      display: "flex",
      gap: "16px",
      width: isMobile ? "100%" : "auto",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
      gap: "28px",
    },
    statCard: (color: string) => ({
      padding: "32px",
      borderRadius: "36px",
      backgroundColor: "white",
      backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${color}08 100%)`,
      border: `1px solid ${colors.border}`,
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
      position: "relative" as const,
      overflow: "hidden",
      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
    }),
    statIconBox: (color: string) => ({
      width: "56px",
      height: "56px",
      borderRadius: "20px",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: color,
      boxShadow: `0 8px 20px -6px ${color}30, inset 0 0 0 1px ${color}10`,
    }),
    filterBar: {
      padding: isMobile ? "20px" : "28px",
      borderRadius: "32px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
      display: "flex",
      flexDirection: isTablet ? ("column" as const) : ("row" as const),
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      position: "sticky" as const,
      top: "80px",
      zIndex: 10,
    },
    searchContainer: {
      position: "relative" as const,
      flex: 1,
      width: "100%",
      maxWidth: isTablet ? "none" : "640px",
    },
    searchInput: {
      width: "100%",
      backgroundColor: "rgba(248, 250, 252, 0.8)",
      border: "1px solid rgba(226, 232, 240, 0.8)",
      borderRadius: "22px",
      padding: "18px 24px 18px 60px",
      fontSize: "16px",
      fontWeight: 600,
      color: colors.textMain,
      outline: "none",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
    },
    customerGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
      gap: isMobile ? "28px" : "40px",
    },
    customerCard: {
      backgroundColor: "white",
      borderRadius: "40px",
      border: `1px solid ${colors.border}`,
      boxShadow: "0 15px 35px -12px rgba(0, 0, 0, 0.05)",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
      position: "relative" as const,
    },
    avatar: {
      width: "72px",
      height: "72px",
      borderRadius: "28px",
      backgroundColor: "white",
      color: colors.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: 900,
      boxShadow: shadows.soft,
      border: `1px solid ${colors.primary}10`,
      position: "relative" as const,
      zIndex: 2,
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
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: colors.primary, fontWeight: 900, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: colors.primary, boxShadow: `0 0 12px ${colors.primary}` }} />
            Intelligence Hub
          </div>
          <h1 style={styles.title}>
            Client <span style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Network</span>
          </h1>
          <p style={styles.subtitle}>
            Architecting global relationships through advanced data visualization and predictive behavioral analytics.
          </p>
        </div>
        <div style={styles.actionButtons}>
          <Button 
            variant="secondary" 
            style={{ borderRadius: "20px", padding: "16px 32px", backgroundColor: "white", border: `1px solid ${colors.border}`, fontWeight: 800, fontSize: "15px", color: colors.textMain }}
            leftIcon={<Download size={20} />}
          >
            Export
          </Button>
          <Button 
            variant="primary" 
            style={{ borderRadius: "20px", padding: "16px 32px", backgroundColor: colors.primary, boxShadow: shadows.premium, fontWeight: 800, fontSize: "15px" }} 
            leftIcon={<Plus size={22} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            New Enterprise
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            style={styles.statCard(stat.color)} 
            className="group"
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={styles.statIconBox(stat.color)}>
              {stat.icon}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>{stat.title}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "6px" }}>
                <h3 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, letterSpacing: "-0.03em" }}>{stat.value}</h3>
                <span style={{ fontSize: "12px", fontWeight: 900, color: colors.emerald, backgroundColor: `${colors.emerald}10`, padding: "4px 10px", borderRadius: "10px", border: `1px solid ${colors.emerald}20` }}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & View Controls */}
      <div style={styles.filterBar}>
        <div style={styles.searchContainer}>
          <Search style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} size={22} />
          <input 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Query node by name, encrypted ID, or territory..." 
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px", width: isTablet ? "100%" : "auto", justifyContent: "space-between" }}>
          <div style={{ width: isMobile ? "100%" : "220px" }}>
            <Select 
              value={sortBy}
              onChange={(val) => setSortBy(val as string)}
              options={[
                { label: "Sort: Chronological", value: "latest" },
                { label: "Sort: Lexicographical", value: "name" },
                { label: "Sort: Capitalization", value: "revenue" },
              ]}
              style={{ borderRadius: "18px" }}
            />
          </div>

          {!isMobile && <div style={{ width: "2px", height: "40px", backgroundColor: colors.border, opacity: 0.5 }} />}

          <div style={{ display: "flex", gap: "10px", padding: "8px", backgroundColor: "white", borderRadius: "20px", border: `1px solid ${colors.border}`, boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.03)" }}>
            <button 
              onClick={() => setView("grid")}
              style={{ padding: "12px", borderRadius: "14px", border: "none", cursor: "pointer", display: "flex", backgroundColor: view === "grid" ? colors.primary : "transparent", color: view === "grid" ? "white" : colors.textMuted, boxShadow: view === "grid" ? shadows.premium : "none", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <LayoutGrid size={22} />
            </button>
            <button 
              onClick={() => setView("list")}
              style={{ padding: "12px", borderRadius: "14px", border: "none", cursor: "pointer", display: "flex", backgroundColor: view === "list" ? colors.primary : "transparent", color: view === "list" ? "white" : colors.textMuted, boxShadow: view === "list" ? shadows.premium : "none", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <ListIcon size={22} />
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
                className="group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(79, 70, 229, 0.15)";
                  e.currentTarget.style.borderColor = `${colors.primary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 35px -12px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryLight})`, opacity: 0, transition: "opacity 0.4s ease" }} className="group-hover:opacity-100" />
                
                <div style={{ padding: "40px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                    <div style={styles.avatar}>
                      <div style={{ position: "absolute", inset: "-4px", borderRadius: "32px", border: `2px solid ${colors.primary}15`, zIndex: 1 }} />
                      {customer.avatar}
                    </div>
                    <Badge 
                      variant={customer.status === 'Active' ? 'success' : customer.status === 'Pending' ? 'warning' : 'neutral'}
                      dot
                      style={{ padding: "10px 20px", fontSize: "12px", fontWeight: 900, borderRadius: "16px", letterSpacing: "0.05em" }}
                    >
                      {customer.status}
                    </Badge>
                  </div>

                  <div style={{ marginBottom: "32px" }}>
                    <h3 style={{ fontSize: "24px", fontWeight: 900, color: colors.textMain, display: "flex", alignItems: "center", gap: "10px", letterSpacing: "-0.02em" }}>
                      {customer.name}
                      <ArrowUpRight size={20} style={{ color: colors.primary, opacity: 0.3 }} />
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: colors.textMuted, fontSize: "14px", marginTop: "8px", fontWeight: 700 }}>
                      <MapPin size={16} style={{ color: colors.primaryLight }} />
                      {customer.location}
                    </div>
                  </div>

                  <div style={{ padding: "24px 0", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", color: colors.textMain, fontSize: "14px", fontWeight: 700 }}>
                      <div style={{ width: "36px", height: "36px", backgroundColor: colors.bg, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: colors.primary }}><Mail size={16} /></div>
                      {customer.email}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", color: colors.textMain, fontSize: "14px", fontWeight: 700 }}>
                      <div style={{ width: "36px", height: "36px", backgroundColor: colors.bg, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: colors.primary }}><Phone size={16} /></div>
                      {customer.phone}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.12em" }}>Net Capital</p>
                      <p style={{ fontSize: "22px", fontWeight: 900, color: colors.textMain }}>${customer.revenue.toLocaleString()}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "11px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.12em" }}>Onboard Date</p>
                      <p style={{ fontSize: "16px", fontWeight: 800, color: colors.textMain }}>{customer.joined}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  style={{ width: "100%", padding: "24px", border: "none", borderTop: `1px solid ${colors.border}`, backgroundColor: "rgba(248, 250, 252, 0.5)", color: colors.primary, fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.25em", cursor: "pointer", transition: "all 0.4s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(248, 250, 252, 0.5)";
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  Access Deep Analytics
                </button>
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
                            onClick={() => handleDelete(customer.id)}
                            style={{ padding: "10px", borderRadius: "14px", border: "none", backgroundColor: "transparent", color: colors.textMuted, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff1f2"; e.currentTarget.style.color = colors.rose; e.currentTarget.style.transform = "scale(1.1)"; }}
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
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Initialize Global Account"
        size="lg"
        footer={
          <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", width: "100%", padding: "24px" }}>
            <Button variant="ghost" style={{ borderRadius: "18px", fontWeight: 800, padding: "14px 28px" }} onClick={() => setIsAddModalOpen(false)}>Discard</Button>
            <Button variant="primary" style={{ borderRadius: "18px", fontWeight: 800, backgroundColor: colors.primary, boxShadow: shadows.premium, padding: "14px 32px" }} onClick={handleAddCustomer}>Confirm Deployment</Button>
          </div>
        }
      >
        <div style={{ padding: "8px" }}>
          <form style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }} onSubmit={handleAddCustomer}>
            <Input 
              label="Enterprise Entity Name" 
              placeholder="e.g. Global Tech Solutions" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              leftIcon={<Users size={20} />}
              required
            />
            <Input 
              label="Primary Access Node (Email)" 
              type="email" 
              placeholder="node@enterprise.io" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              leftIcon={<Mail size={20} />}
              required
            />
            <Input 
              label="Secure Communication Port" 
              placeholder="+1 000 000 0000" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              leftIcon={<Phone size={20} />}
            />
            <Input 
              label="Geographic Territory" 
              placeholder="City, National Region" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              leftIcon={<MapPin size={20} />}
            />
            <div style={{ gridColumn: isMobile ? "span 1" : "span 2" }}>
              <Select 
                label="Current Operational Protocol"
                value={formData.status}
                onChange={(val) => setFormData({...formData, status: val as string})}
                options={[
                  { label: "Active Operational Mode", value: "Active" },
                  { label: "Deployment In Progress", value: "Pending" },
                  { label: "Protocol Hibernation", value: "Inactive" },
                ]}
              />
            </div>
          </form>
        </div>
      </Modal>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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

const ShieldCheck = ({ size, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Customers;
