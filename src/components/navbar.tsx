import React, { useState } from "react";
import { Search, Menu, Globe, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme, toggleTheme, colors } = useTheme();

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navbarColors = {
    ...colors,
    headerBg:
      theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.8)",
    white: theme === "light" ? "#ffffff" : "#1e293b",
    emerald: "#10b981",
  };

  const styles = {
    header: {
      height: "80px",
      backgroundColor: navbarColors.headerBg,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${navbarColors.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      position: "sticky" as const,
      top: 0,
      zIndex: 800,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
    },
    searchContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      padding: "0 24px",
      maxWidth: "700px",
      margin: "0 auto",
    },
    searchWrapper: {
      width: "100%",
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
      transition: "all 0.3s ease",
    },
    searchInput: {
      width: "100%",
      backgroundColor: isSearchFocused
        ? navbarColors.white
        : theme === "light"
          ? "rgba(241, 245, 249, 0.6)"
          : "rgba(255, 255, 255, 0.05)",
      border: `1px solid ${isSearchFocused ? navbarColors.primary : isSearchHovered ? (theme === "light" ? "#cbd5e1" : "rgba(255,255,255,0.2)") : "transparent"}`,
      borderRadius: "16px",
      padding: "12px 16px 12px 48px",
      fontSize: "14px",
      fontWeight: 600,
      color: navbarColors.textMain,
      outline: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: isSearchFocused
        ? `0 0 0 4px ${navbarColors.primary}10`
        : "none",
    },
    searchIcon: {
      position: "absolute" as const,
      left: "16px",
      color: isSearchFocused ? navbarColors.primary : navbarColors.textMuted,
      transition: "all 0.3s ease",
      transform: isSearchFocused ? "scale(1.1)" : "scale(1)",
      pointerEvents: "none" as const,
    },
    shortcutHint: {
      position: "absolute" as const,
      right: "16px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "4px 8px",
      backgroundColor: navbarColors.white,
      border: `1px solid ${navbarColors.border}`,
      borderRadius: "8px",
      fontSize: "10px",
      fontWeight: 800,
      color: navbarColors.textMuted,
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      pointerEvents: "none" as const,
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    statusBadge: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 16px",
      backgroundColor: navbarColors.bg,
      borderRadius: "12px",
      border: `1px solid rgba(226, 232, 240, 0.5)`,
    },
    profileWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      padding: "4px",
      borderRadius: "14px",
      transition: "all 0.2s ease",
    },
  };

  return (
    <header style={styles.header}>
      {/* Left: Menu Toggle (Logo removed as requested) */}
      <div style={{ display: "flex", alignItems: "center", width: "240px" }}>
        <button
          onClick={onMenuClick}
          style={{
            padding: "10px",
            color: navbarColors.textMuted,
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            display: windowWidth < 1024 ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme === "light"
                ? "rgba(99, 102, 241, 0.08)"
                : "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.color = navbarColors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = navbarColors.textMuted;
          }}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Center: Restructured Search Box */}
      <div style={styles.searchContainer}>
        <div
          style={styles.searchWrapper}
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search financial records, invoices or assets..."
            style={styles.searchInput}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div style={styles.shortcutHint}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* Status Protocol */}
        <div style={styles.statusBadge}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ position: "relative", width: "8px", height: "8px" }}>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: navbarColors.emerald,
                  borderRadius: "50%",
                }}
              ></div>
              <div
                className="ping-animation"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: navbarColors.emerald,
                  borderRadius: "50%",
                  opacity: 0.6,
                }}
              ></div>
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: navbarColors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Live Sync
            </span>
          </div>
          <div
            style={{
              width: "1px",
              height: "12px",
              backgroundColor: navbarColors.border,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: navbarColors.primary,
            }}
          >
            <Globe size={12} className="spin-animation" />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Global
            </span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "10px",
            color: navbarColors.textMuted,
            backgroundColor: navbarColors.white,
            border: `1px solid ${navbarColors.border}`,
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = navbarColors.bg;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = navbarColors.white;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {theme === "light" ? (
            <Moon
              size={20}
              fill={navbarColors.textMuted}
              fillOpacity={0.1}
              className="theme-icon"
            />
          ) : (
            <Sun
              size={20}
              fill={navbarColors.textMuted}
              fillOpacity={0.1}
              className="theme-icon"
            />
          )}
        </button>

        {/* Profile */}
        <div style={styles.profileWrapper} className="profile-group">
          <div
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: navbarColors.textMain,
              }}
            >
              Alexander W.
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: navbarColors.textMuted,
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Master Admin
            </span>
          </div>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              backgroundColor: navbarColors.bg,
              border: `2px solid ${navbarColors.white}`,
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <ChevronDown size={14} style={{ color: colors.textMuted }} />
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .ping-animation {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 10s linear infinite;
        }
        @keyframes rotate-in {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        .theme-icon {
          animation: rotate-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .profile-group:hover {
           background-color: ${theme === "light" ? "rgba(99, 102, 241, 0.05)" : "rgba(255, 255, 255, 0.03)"};
        }
      `}</style>
    </header>
  );
};

export default Navbar;
