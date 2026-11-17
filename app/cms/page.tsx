import { getCmsSession } from "@/lib/cms-auth";
import { prisma } from "@/lib/prisma";
import { ensureSuperAdmin } from "@/lib/cms-auth";
import Link from "next/link";
import { FileText, Users, ArrowRight, PenLine } from "lucide-react";

export default async function CmsOverviewPage() {
  await ensureSuperAdmin();
  const session = await getCmsSession();

  const [articleCount, userCount, recentArticles] = await Promise.all([
    prisma.article.count(),
    prisma.cmsUser.count(),
    prisma.article.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  return (
    <div style={{ padding: "48px", maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A8C84", marginBottom: "6px" }}>
          Content Management
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "#1A2E24", letterSpacing: "-0.01em", lineHeight: 1 }}>
          Good {greeting()}, {session?.name.split(" ")[0]}
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "48px" }}>
        {[
          { label: "Articles", value: articleCount, icon: FileText, href: "/cms/articles" },
          { label: "CMS Users", value: userCount, icon: Users, href: "/cms/users" },
          { label: "Published", value: articleCount, icon: PenLine, href: "/cms/articles" },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "#fff", border: "1px solid #E5E3DE",
              borderRadius: "3px", padding: "24px 28px",
            }} className="hover:border-[#1A2E24] transition-colors">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A8C84" }}>{label}</span>
                <Icon size={14} style={{ color: "#7A8C84" }} />
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, color: "#1A2E24", lineHeight: 1 }}>{value}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
        <Link
          href="/cms/articles/new"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: "#1A2E24", color: "#FAFAF8",
            padding: "11px 22px", borderRadius: "2px", textDecoration: "none",
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "var(--font-sans)", fontWeight: 600,
          }}
        >
          <PenLine size={12} /> New article
        </Link>
        {session?.role === "super_admin" && (
          <Link
            href="/cms/users"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "transparent", color: "#1A2E24",
              padding: "11px 22px", borderRadius: "2px", textDecoration: "none",
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", fontWeight: 600,
              border: "1px solid #1A2E24",
            }}
          >
            <Users size={12} /> Manage users
          </Link>
        )}
      </div>

      {/* Recent articles */}
      {recentArticles.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "#1A2E24" }}>Recently updated</h2>
            <Link href="/cms/articles" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#7A8C84", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              All articles <ArrowRight size={10} />
            </Link>
          </div>
          <div style={{ border: "1px solid #E5E3DE", borderRadius: "3px", overflow: "hidden", backgroundColor: "#fff" }}>
            {recentArticles.map((a, i) => (
              <Link
                key={a.id}
                href={`/cms/articles/${a.id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 20px",
                  borderBottom: i < recentArticles.length - 1 ? "1px solid #E5E3DE" : "none",
                  textDecoration: "none",
                }}
                className="hover:bg-[#F5F4F1] transition-colors"
              >
                <div>
                  <p style={{ fontSize: "14px", color: "#1A2E24", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>{a.title}</p>
                  <p style={{ fontSize: "11px", color: "#7A8C84", fontFamily: "var(--font-sans)" }}>{a.dept} · {a.author}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "10px", color: "#7A8C84", fontFamily: "var(--font-sans)" }}>
                    {new Date(a.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "2px", backgroundColor: a.published ? "#E8F0EC" : "#F5F4F1", color: a.published ? "#2E6E45" : "#7A8C84", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                    {a.published ? "Live" : "Draft"}
                  </span>
                  <ArrowRight size={12} style={{ color: "#C8A96A" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {articleCount === 0 && (
        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "48px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "#1A2E24", marginBottom: "8px" }}>No articles yet</p>
          <p style={{ fontSize: "13px", color: "#7A8C84", marginBottom: "24px" }}>Create your first article to get started.</p>
          <Link href="/cms/articles/new" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A2E24", color: "#FAFAF8", padding: "11px 22px", borderRadius: "2px", textDecoration: "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            <PenLine size={12} /> New article
          </Link>
        </div>
      )}
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
