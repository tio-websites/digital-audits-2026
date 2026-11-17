import Link from "next/link";
import { getCmsSession } from "@/lib/cms-auth";
import { redirect } from "next/navigation";
import { FileText, Users, LayoutDashboard, LogOut } from "lucide-react";

const nav = [
  { href: "/cms", icon: LayoutDashboard, label: "Overview" },
  { href: "/cms/articles", icon: FileText, label: "Articles" },
  { href: "/cms/users", icon: Users, label: "CMS Users" },
];

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const session = await getCmsSession();
  if (!session) redirect("/cms/login");

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F4F1", fontFamily: "var(--font-sans)" }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px", flexShrink: 0,
        backgroundColor: "#1A2E24",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(250,250,248,0.08)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, letterSpacing: "0.14em", color: "#FAFAF8" }}>OKKLUSION</div>
          <div style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#C8A96A", textTransform: "uppercase", marginTop: "2px" }}>CMS</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "3px", marginBottom: "2px",
                fontSize: "13px", color: "rgba(250,250,248,0.6)",
                textDecoration: "none",
              }}
              className="hover:bg-[rgba(250,250,248,0.07)] hover:text-[#FAFAF8] transition-colors"
            >
              <item.icon size={15} style={{ opacity: 0.5 }} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: "14px 10px", borderTop: "1px solid rgba(250,250,248,0.08)" }}>
          <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#C8A96A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#1A2E24" }}>{session.name[0]}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "12px", color: "rgba(250,250,248,0.85)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.name}</p>
              <p style={{ fontSize: "10px", color: "rgba(250,250,248,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{session.role === "super_admin" ? "Super Admin" : "Editor"}</p>
            </div>
          </div>
          <form action="/api/cms/auth" method="POST" style={{ marginTop: "4px" }}>
            <input type="hidden" name="_action" value="logout" />
            <button type="submit" style={{
              width: "100%", padding: "7px 12px", display: "flex", alignItems: "center", gap: "8px",
              background: "none", border: "none", cursor: "pointer",
              fontSize: "12px", color: "rgba(250,250,248,0.3)", borderRadius: "3px",
            }} className="hover:text-[rgba(250,250,248,0.6)] hover:bg-[rgba(250,250,248,0.06)] transition-colors">
              <LogOut size={13} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", height: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
