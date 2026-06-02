import React, { useState } from "react";
import { Users, Trash2, Shield, RefreshCw, AlertCircle, Search, MoreVertical } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useUsers, useUpdateUserRole, useDeleteUser } from "../config/hooks/useUser";

const ManageUsers: React.FC = () => {
  const { colors } = useTheme();
  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) => u.email.toLowerCase().includes(search.toLowerCase()));

  const handleRoleChange = async (id: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "STAFF" : "ADMIN";
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await updateRole.mutateAsync({ id, role: newRole });
      } catch (err) {
        alert("Failed to update role.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await deleteUser.mutateAsync(id);
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  if (isLoading) return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ height: "60px", backgroundColor: colors.card, borderRadius: "12px", animation: "pulse 1.5s infinite" }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );

  if (isError) return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <AlertCircle size={40} color="#dc2626" style={{ marginBottom: "16px" }} />
      <h2 style={{ fontSize: "20px", color: colors.textMain }}>Failed to Load Users</h2>
      <button onClick={() => refetch()} style={{ marginTop: "16px", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: colors.primary, color: "white", cursor: "pointer" }}>
        Retry
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "60px", animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: colors.textMain, margin: 0, letterSpacing: "-0.02em" }}>Manage Users</h1>
            <p style={{ fontSize: "15px", color: colors.textMuted, margin: "6px 0 0 0", fontWeight: 500 }}>
              View and manage system access for your team.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "12px", border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.textMain, fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}`, padding: "6px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <Search size={18} color={colors.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by email..."
            style={{ flex: 1, border: "none", backgroundColor: "transparent", padding: "12px", color: colors.textMain, fontSize: "15px", fontWeight: 500, outline: "none" }}
          />
        </div>

        {/* Users List */}
        <div style={{ backgroundColor: colors.card, borderRadius: "20px", border: `1px solid ${colors.border}`, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                  {["User Email", "Role", "Created At", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "16px 24px", textAlign: "left", fontSize: "12px", fontWeight: 800, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: colors.textMuted, fontWeight: 600 }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id} style={{ borderBottom: idx === filteredUsers.length - 1 ? "none" : `1px solid ${colors.border}` }}>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: `${colors.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                            <Users size={18} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: colors.textMain }}>{user.email}</p>
                            <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: colors.textMuted, fontFamily: "monospace" }}>ID: {user.id.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <button
                          onClick={() => handleRoleChange(user.id, user.role)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "6px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                            backgroundColor: user.role === "ADMIN" ? `${colors.primary}15` : "#f3f4f6",
                            color: user.role === "ADMIN" ? colors.primary : "#4b5563",
                            fontSize: "12px", fontWeight: 700, transition: "opacity 0.2s"
                          }}
                        >
                          <Shield size={12} /> {user.role}
                        </button>
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "13px", color: colors.textMuted, fontWeight: 500 }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <button
                          onClick={() => handleDelete(user.id)}
                          style={{
                            width: "36px", height: "36px", borderRadius: "10px", border: "1px solid #fecdd3",
                            backgroundColor: "#fff1f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.2s"
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
