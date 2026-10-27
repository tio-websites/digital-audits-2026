import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllUsers } from "@/lib/db";
import { getMondayMembers } from "@/lib/monday";
import Link from "next/link";
import { Users, Database, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers();
  const mondayMembers = await getMondayMembers();

  const mondayConnected = !!process.env.MONDAY_API_TOKEN;

  const planCounts = users.reduce(
    (acc, u) => { acc[u.plan] = (acc[u.plan] || 0) + 1; return acc; },
    {} as Record<string, number>
  );

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "var(--accent-dark)", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, letterSpacing: "0.12em", color: "var(--white)" }}>OKKLUSION</div>
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Admin Panel</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)" }}>
            {(session?.user as { name?: string })?.name}
          </span>
          <Link href="/platform/dashboard" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={12} /> Back to Platform
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px" }}>

        <div style={{ padding: "16px 20px", borderRadius: "2px", marginBottom: "40px", display: "flex", alignItems: "center", gap: "12px", backgroundColor: mondayConnected ? "var(--surface)" : "#FFF8EC", border: mondayConnected ? "1px solid var(--border)" : "1px solid #F0C070" }}>
          {mondayConnected
            ? <CheckCircle size={16} style={{ color: "#4CAF50" }} />
            : <AlertCircle size={16} style={{ color: "#E6A817" }} />
          }
          <div>
            <span style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)" }}>
              Monday.com CRM: {mondayConnected ? "Connected" : "Not connected (placeholder mode)"}
            </span>
            {!mondayConnected && (
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", marginLeft: "12px" }}>
                Add MONDAY_API_TOKEN + MONDAY_MEMBERS_BOARD_ID + MONDAY_LEADS_BOARD_ID to environment variables to activate
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: "48px" }}>
          {[
            { label: "Total Members", value: users.length, icon: Users },
            { label: "Basic", value: planCounts["basic"] || 0, icon: Database },
            { label: "Premium", value: planCounts["premium"] || 0, icon: Database },
            { label: "Super Premium", value: planCounts["super-premium"] || 0, icon: Database },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{label}</span>
                <Icon size={14} style={{ color: "var(--text-muted)" }} />
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 300, color: "var(--text-primary)", marginBottom: "20px" }}>Members</h2>
          <div style={{ border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  {["Name", "Email", "Practice", "Plan", "Role", "Joined"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left" as const, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? "1px solid var(--border)" : "none", backgroundColor: "var(--bg)" }}>
                    <td style={{ padding: "14px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}>{user.firstName} {user.lastName}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{user.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{user.practice || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, padding: "3px 8px", borderRadius: "2px", backgroundColor: user.plan === "super-premium" ? "var(--accent-dark)" : user.plan === "premium" ? "var(--surface)" : "var(--bg)", color: user.plan === "super-premium" ? "var(--white)" : "var(--text-secondary)", border: "1px solid var(--border)" }}>
                        {user.plan}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: user.role === "admin" ? "var(--accent)" : "var(--text-muted)" }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>
                      {new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 300, color: "var(--text-primary)", marginBottom: "8px" }}>Monday.com CRM</h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            {mondayConnected ? `${mondayMembers.length} contacts synced` : "Placeholder data — connect Monday.com API token to see live data"}
          </p>
          <div style={{ border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  {["Monday ID", "Name", "Email", "Plan", "Status"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left" as const, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mondayMembers.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < mondayMembers.length - 1 ? "1px solid var(--border)" : "none", backgroundColor: "var(--bg)" }}>
                    <td style={{ padding: "14px 16px", fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontStyle: "italic" as const }}>{m.id}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}>{m.name}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{m.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{m.plan}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: m.status === "active" ? "#4CAF50" : "var(--text-muted)" }}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
