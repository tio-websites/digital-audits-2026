import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    tag: "Opinion",
    title: "Digital orthodontics has outgrown its ecosystem",
    excerpt: "The tools exist. The workflows are proven. What's missing is the infrastructure to teach them properly.",
    author: "Finn",
    date: "12 May 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    tag: "News",
    title: "University of York CPD accreditation: what it means for your practice",
    excerpt: "Formal recognition for digital workflow education is arriving. Here's the pathway.",
    author: "Okklusion Editorial",
    date: "8 May 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    tag: "Case Study",
    title: "From zero to in-house aligner manufacturing in 12 weeks",
    excerpt: "A step-by-step account of one practice's transition from outsourced to fully autonomous production.",
    author: "Finn",
    date: "1 May 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    tag: "Analysis",
    title: "What MasterClass got right that dental education gets wrong",
    excerpt: "Production quality, pacing, personality. The entertainment-first learning model has lessons for every professional platform.",
    author: "Okklusion Editorial",
    date: "24 Apr 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    tag: "Innovation",
    title: "AI in triage: where the clinical evidence actually stands",
    excerpt: "Cutting through the noise around AI-assisted orthodontic diagnostics.",
    author: "Finn",
    date: "18 Apr 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    tag: "Opinion",
    title: "Why practice owners are the only audience that matters",
    excerpt: "Education without implementation is entertainment. Only mortgage-paying owners can change how a practice operates.",
    author: "Okklusion Editorial",
    date: "10 Apr 2026",
    readTime: "5 min",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Editorial</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            From the Okklusion desk
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Featured */}
          {featured && (
            <div
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "48px", marginBottom: "56px", borderRadius: "2px", cursor: "pointer" }}
              className="hover:bg-[var(--surface-raised)] transition-colors"
            >
              <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "20px" }}>
                {featured.tag} · Featured
              </span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "16px", maxWidth: "680px" }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "600px" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.author}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.date}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.readTime} read</span>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--accent-dark)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {rest.map((article) => (
              <div
                key={article.title}
                style={{ backgroundColor: "var(--bg)", padding: "32px 28px", cursor: "pointer", display: "flex", flexDirection: "column" as const }}
                className="hover:bg-[var(--surface)] transition-colors"
              >
                <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "14px" }}>
                  {article.tag}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "12px", flex: 1 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "20px" }}>
                  {article.excerpt}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.author}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.date}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.readTime} read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
