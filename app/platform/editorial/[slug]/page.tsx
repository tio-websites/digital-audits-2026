import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, deptMeta } from "@/lib/articles";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const meta = deptMeta[article.deptSlug];
  const colour = meta?.colour ?? "var(--accent)";
  const related = getRelatedArticles(slug, 2);

  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* ── TOP NAV ────────────────────────────────────────────────────────── */}
      <div style={{
        padding: "18px 48px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/platform/editorial"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", textDecoration: "none" }}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={12} /> Editorial
          </Link>
          <span style={{ fontSize: "11px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>/</span>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: colour, letterSpacing: "0.06em", textTransform: "uppercase" as const, fontWeight: 600 }}>
            {article.dept}
          </span>
        </div>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
          {article.issue} · {article.date}
        </span>
      </div>

      <div style={{ display: "flex", gap: "0" }}>

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside style={{
          width: "220px", flexShrink: 0,
          position: "sticky" as const, top: 0, height: "100vh", overflowY: "auto" as const,
          padding: "40px 28px",
          borderRight: "1px solid var(--border)",
        }}>
          {/* Dept */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ width: "24px", height: "2px", backgroundColor: colour, marginBottom: "10px" }} />
            <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: colour, marginBottom: "6px" }}>
              {article.dept}
            </p>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
              {meta?.description}
            </p>
          </div>

          {/* Meta */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px", marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              <Clock size={11} /> {article.readTime} read
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              <BookOpen size={11} /> {article.issue}
            </div>
          </div>

          {/* Author */}
          <div style={{ padding: "16px", backgroundColor: "var(--surface)", borderRadius: "2px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--accent-dark)" }}>
                {article.author[0]}
              </span>
            </div>
            <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
              {article.author}
            </p>
            {article.authorRole && (
              <p style={{ fontSize: "10px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {article.authorRole}
              </p>
            )}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginBottom: "12px" }}>
                More from {article.dept}
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/platform/editorial/${r.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                    className="group"
                  >
                    <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", lineHeight: 1.5 }} className="group-hover:text-[var(--text-primary)] transition-colors">
                      {r.title}
                    </p>
                    <p style={{ fontSize: "10px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginTop: "3px" }}>{r.readTime} read</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
        <main style={{ flex: 1, padding: "56px 64px 80px", minWidth: 0 }}>

          {/* Header */}
          <div style={{ marginBottom: "40px", paddingBottom: "36px", borderBottom: `2px solid ${colour}` }}>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(26px, 3.5vw, 46px)",
              fontWeight: 300, color: "var(--text-primary)",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              marginBottom: "20px", maxWidth: "680px",
            }}>
              {article.title}
            </h1>
            <p style={{
              fontSize: "17px", color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)", lineHeight: 1.7,
              maxWidth: "600px", marginBottom: "28px",
              fontStyle: "italic",
            }}>
              {article.excerpt}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" as const }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", fontWeight: 500 }}>
                {article.author}
                {article.authorRole && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}> · {article.authorRole}</span>}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.date}</span>
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", padding: "2px 8px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", letterSpacing: "0.04em" }}>
                {article.readTime} read
              </span>
            </div>
          </div>

          {/* Body sections */}
          <div style={{ maxWidth: "660px" }}>
            {article.body.map((section, i) => {
              if (section.kind === "paragraph") {
                return (
                  <p key={i} style={{
                    fontSize: "16px", lineHeight: 1.85,
                    fontFamily: "var(--font-sans)", color: "var(--text-primary)",
                    marginBottom: "24px",
                  }}>
                    {section.text}
                  </p>
                );
              }
              if (section.kind === "heading") {
                return (
                  <h2 key={i} style={{
                    fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400,
                    color: "var(--text-primary)", lineHeight: 1.2,
                    marginTop: "44px", marginBottom: "18px", letterSpacing: "-0.01em",
                  }}>
                    {section.text}
                  </h2>
                );
              }
              if (section.kind === "pullquote") {
                return (
                  <blockquote key={i} style={{
                    margin: "36px 0",
                    padding: "24px 32px",
                    borderLeft: `3px solid ${colour}`,
                    backgroundColor: "var(--surface)",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 300,
                      color: "var(--text-primary)", lineHeight: 1.5, letterSpacing: "-0.005em",
                      fontStyle: "italic",
                    }}>
                      {section.text}
                    </p>
                  </blockquote>
                );
              }
              if (section.kind === "list" && section.items) {
                return (
                  <ul key={i} style={{ margin: "20px 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", lineHeight: 1.65 }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: colour, flexShrink: 0, marginTop: "8px" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.kind === "divider") {
                return <div key={i} style={{ height: "1px", backgroundColor: "var(--border)", margin: "40px 0" }} />;
              }
              return null;
            })}
          </div>

          {/* Bottom nav */}
          <div style={{ maxWidth: "660px", marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
            <Link
              href="/platform/editorial"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", textDecoration: "none" }}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={11} /> Back to Editorial
            </Link>
            {related[0] && (
              <Link
                href={`/platform/editorial/${related[0].slug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: colour, textDecoration: "none", textAlign: "right" as const }}
                className="hover:opacity-70 transition-opacity"
              >
                Next article <ArrowRight size={11} />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
