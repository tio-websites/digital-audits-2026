import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PenLine, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import DeleteArticleButton from "./DeleteArticleButton";
import TogglePublishButton from "./TogglePublishButton";

const deptColour: Record<string, string> = {
  "Editor's Note":    "#C8A96A",
  "Case of the Week": "#1A2E24",
  "Lab Note":         "#7A8C84",
  "Software Note":    "#8C8279",
  "Evidence Note":    "#848C7A",
  "Practice Note":    "#6A7A8C",
};

export default async function CmsArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });

  const byDept = articles.reduce((acc, a) => {
    if (!acc[a.dept]) acc[a.dept] = [];
    acc[a.dept].push(a);
    return acc;
  }, {} as Record<string, typeof articles>);

  return (
    <div style={{ padding: "48px", maxWidth: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A8C84", marginBottom: "6px" }}>Editorial</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "#1A2E24", letterSpacing: "-0.01em" }}>Articles</h1>
          <p style={{ fontSize: "13px", color: "#7A8C84", marginTop: "6px" }}>{articles.length} article{articles.length !== 1 ? "s" : ""} total</p>
        </div>
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
          <Plus size={13} /> New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "64px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "#1A2E24", marginBottom: "8px" }}>No articles yet</p>
          <p style={{ fontSize: "13px", color: "#7A8C84", marginBottom: "24px" }}>Create your first article to get started.</p>
          <Link href="/cms/articles/new" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A2E24", color: "#FAFAF8", padding: "11px 22px", borderRadius: "2px", textDecoration: "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            <Plus size={12} /> New article
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {Object.entries(byDept).map(([dept, deptArticles]) => {
            const colour = deptColour[dept] ?? "#7A8C84";
            return (
              <div key={dept}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "12px", height: "2px", backgroundColor: colour }} />
                  <h2 style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: colour, fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                    {dept}
                  </h2>
                  <span style={{ fontSize: "11px", color: "#B0B0A8" }}>{deptArticles.length}</span>
                </div>
                <div style={{ border: "1px solid #E5E3DE", borderRadius: "3px", overflow: "hidden", backgroundColor: "#fff" }}>
                  {deptArticles.map((a, i) => (
                    <div key={a.id} style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      padding: "14px 20px",
                      borderBottom: i < deptArticles.length - 1 ? "1px solid #E5E3DE" : "none",
                    }}>
                      {/* Title + meta */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "14px", color: "#1A2E24", fontFamily: "var(--font-sans)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {a.title}
                        </p>
                        <p style={{ fontSize: "11px", color: "#7A8C84", marginTop: "2px" }}>
                          {a.author} · {a.issue} · {a.readTime} read
                        </p>
                      </div>

                      {/* Status */}
                      <span style={{
                        fontSize: "9px", padding: "2px 8px", borderRadius: "2px",
                        backgroundColor: a.published ? "#E8F0EC" : "#F5F4F1",
                        color: a.published ? "#2E6E45" : "#7A8C84",
                        letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {a.published ? "Live" : "Draft"}
                      </span>

                      {/* Updated */}
                      <span style={{ fontSize: "11px", color: "#B0B0A8", flexShrink: 0 }}>
                        {new Date(a.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>

                      {/* Actions */}
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                        <TogglePublishButton articleId={a.id} published={a.published} />
                        <Link
                          href={`/cms/articles/${a.id}`}
                          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "2px", color: "#7A8C84", textDecoration: "none" }}
                          className="hover:bg-[#F5F4F1] hover:text-[#1A2E24] transition-colors"
                          title="Edit"
                        >
                          <PenLine size={14} />
                        </Link>
                        <DeleteArticleButton articleId={a.id} articleTitle={a.title} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
