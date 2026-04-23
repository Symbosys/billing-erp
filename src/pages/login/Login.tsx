import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Activity,
  Globe,
  Loader2
} from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STAFF">("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth latency
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const colors = {
    primary: "#4f46e5",
    primaryLight: "#818cf8",
    violet: "#8b5cf6",
    textMain: "#0f172a",
    textMuted: "#64748b",
    border: "rgba(226, 232, 240, 0.5)",
    glass: "rgba(255, 255, 255, 0.8)",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `radial-gradient(circle at top left, #f1f5f9 0%, #e2e8f0 100%)`,
      padding: "24px",
      position: "relative" as const,
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    },
    backgroundDecoration: {
      position: "absolute" as const,
      width: "600px",
      height: "600px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
      top: "-200px",
      right: "-100px",
      zIndex: 0,
    },
    loginCard: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: colors.glass,
      backdropFilter: "blur(24px)",
      borderRadius: "40px",
      border: "1px solid white",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
      padding: isMobile ? "32px" : "56px",
      zIndex: 1,
      animation: "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    brandContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      marginBottom: "48px",
    },
    brandLogo: {
      width: "64px",
      height: "64px",
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.violet})`,
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      boxShadow: "0 15px 30px rgba(79, 70, 229, 0.3)",
      marginBottom: "20px",
    },
    title: {
      fontSize: "32px",
      fontWeight: 900,
      color: colors.textMain,
      letterSpacing: "-0.04em",
      margin: 0,
    },
    subtitle: {
      fontSize: "15px",
      fontWeight: 500,
      color: colors.textMuted,
      marginTop: "8px",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "28px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "10px",
    },
    label: {
      fontSize: "12px",
      fontWeight: 900,
      color: colors.textMuted,
      textTransform: "uppercase" as const,
      letterSpacing: "0.15em",
      marginLeft: "4px",
    },
    inputWrapper: {
      position: "relative" as const,
    },
    input: {
      width: "100%",
      backgroundColor: "white",
      border: `2px solid #f1f5f9`,
      borderRadius: "18px",
      padding: "16px 16px 16px 56px",
      fontSize: "15px",
      fontWeight: 600,
      color: colors.textMain,
      outline: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.01)",
    },
    icon: {
      position: "absolute" as const,
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.textMuted,
      transition: "color 0.3s ease",
    },
    roleToggle: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      padding: "6px",
      backgroundColor: "#f1f5f9",
      borderRadius: "18px",
      border: "1px solid #e2e8f0",
    },
    roleButton: (isActive: boolean) => ({
      padding: "12px",
      borderRadius: "14px",
      border: "none",
      backgroundColor: isActive ? "white" : "transparent",
      color: isActive ? colors.primary : colors.textMuted,
      fontSize: "11px",
      fontWeight: 900,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
    }),
    submitButton: {
      width: "100%",
      padding: "18px",
      borderRadius: "18px",
      border: "none",
      background: `linear-gradient(to right, ${colors.primary}, ${colors.violet})`,
      color: "white",
      fontSize: "16px",
      fontWeight: 800,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.4)",
      transition: "all 0.3s ease",
      marginTop: "12px",
    },
    statusProtocol: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginTop: "40px",
      padding: "16px",
      backgroundColor: "rgba(0,0,0,0.02)",
      borderRadius: "20px",
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundDecoration} />
      <div style={{ ...styles.backgroundDecoration, bottom: "-200px", left: "-100px", top: "auto", right: "auto", background: `radial-gradient(circle, ${colors.violet}08 0%, transparent 70%)` }} />
      
      <div style={styles.loginCard}>
        <div style={styles.brandContainer}>
          <div style={styles.brandLogo}>
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 style={styles.title}>Symbo<span style={{ color: colors.primary }}>Sys</span></h1>
          <p style={styles.subtitle}>Enter your administrative credentials.</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          {/* Role Toggle */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Access Protocol</label>
            <div style={styles.roleToggle}>
              <button 
                type="button" 
                style={styles.roleButton(role === "ADMIN")} 
                onClick={() => setRole("ADMIN")}
              >
                Administrator
              </button>
              <button 
                type="button" 
                style={styles.roleButton(role === "STAFF")} 
                onClick={() => setRole("STAFF")}
              >
                Operations
              </button>
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>System ID / Email</label>
            <div style={styles.inputWrapper}>
              <Mail style={styles.icon} size={20} />
              <input 
                type="email" 
                placeholder="admin@symbosys.com" 
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label style={styles.label}>Security Key</label>
              <span style={{ fontSize: "11px", fontWeight: 700, color: colors.primary, cursor: "pointer" }}>Recovery Mode</span>
            </div>
            <div style={styles.inputWrapper}>
              <Lock style={styles.icon} size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••" 
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: colors.textMuted, cursor: "pointer" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              ...styles.submitButton, 
              opacity: isLoading ? 0.7 : 1,
              transform: isLoading ? "scale(0.98)" : "scale(1)"
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(79, 70, 229, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 30px -10px rgba(79, 70, 229, 0.4)";
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Validating Access...
              </>
            ) : (
              <>
                Authenticate Session
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Global Protocol Status */}
        <div style={styles.statusProtocol}>
           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="relative flex items-center justify-center">
                <Activity size={14} className="text-emerald-500" />
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
              </div>
              <span style={{ fontSize: "10px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nodes: Active</span>
           </div>
           <div style={{ width: "1px", height: "12px", backgroundColor: "#e2e8f0" }} />
           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={14} style={{ color: colors.primary }} />
              <span style={{ fontSize: "10px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>SSL: Secure</span>
           </div>
           <div style={{ width: "1px", height: "12px", backgroundColor: "#e2e8f0" }} />
           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={14} style={{ color: colors.textMuted }} />
              <span style={{ fontSize: "10px", fontWeight: 900, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Global v2.4</span>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
