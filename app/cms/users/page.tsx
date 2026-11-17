import { getCmsSession } from "@/lib/cms-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AddUserForm from "./AddUserForm";
import RemoveUserButton from "./RemoveUserButton";
import { Shield, User } from "lucide-react";

export default async function CmsUsersPage() {
  const session = await getCmsSession();
  if (session?.role !== "super_admin") redirect("/cms");

  const users = await prisma.cmsUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div style={{ padding: "48px", maxWidth: "800px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A8C84", marginBottom: "6px" }}>Admin</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "#1A2E24", letterSpacing: "-0.01em" }}>CMS Users</h1>
        <p style={{ fontSize: "13px", color: "#7A8C84", marginTop: "8px" }}>Manage who can log into the CMS. Super admins can add and remove users.</p>
      </div>

      {/* Current users */}
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "#1A2E24", marginBottom: "16px" }}>Current users</h2>
        <div style={{ border: "1px solid #E5E3DE", borderRadius: "3px", overflow: "hidden", backgroundColor: "#fff" }}>
          {users.map((u, i) => (
            <div key={u.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: i < users.length - 1 ? "1px solid #E5E3DE" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                  backgroundColor: u.role === "super_admin" ? "#1A2E24" : "#F5F4F1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {u.role === "super_admin"
                    ? <Shield size={14} style={{ color: "#C8A96A" }} />
                    : <User size={14} style={{ color: "#7A8C84" }} />
                  }
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#1A2E24", fontWeight: 500, fontFamily: "var(--font-sans)" }}>{u.name}</p>
                  <p style={{ fontSize: "12px", color: "#7A8C84", fontFamily: "var(--font-sans)" }}>{u.email}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
                  color: u.role === "super_admin" ? "#C8A96A" : "#7A8C84",
                  padding: "3px 8px", border: "1px solid",
                  borderColor: u.role === "super_admin" ? "#C8A96A" : "#E5E3DE",
                  borderRadius: "2px",
                }}>
                  {u.role === "super_admin" ? "Super Admin" : "Editor"}
                </span>
                <span style={{ fontSize: "11px", color: "#B0B0A8" }}>
                  {u.lastLoginAt
                    ? `Last login ${new Date(u.lastLoginAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
                    : "Never logged in"}
                </span>
                {u.role !== "super_admin" && (
                  <RemoveUserButton userId={u.id} userName={u.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add user form */}
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "#1A2E24", marginBottom: "16px" }}>Add a user</h2>
        <AddUserForm />
      </div>
    </div>
  );
}
