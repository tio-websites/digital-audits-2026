import { ArrowRight } from "lucide-react";

const tags = ["All", "News", "Opinion", "Analysis", "Case Study", "Innovation"];

const articles = [
  {
    tag: "Opinion",
    title: "Digital orthodontics has outgrown its ecosystem",
    excerpt: "The tools exist. The workflows are proven. What's missing is the infrastructure to teach them properly, and the community to hold each other accountable.",
    author: "Finn",
    date: "12 May 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    tag: "News",
    title: "University of York CPD accreditation: what it means for your practice",
    excerpt: "Formal recognition for digital workflow education is arriving. Here's what the accreditation pathway looks like, and how it affects your continuing education obligations.",
    author: "Okklusion Editorial",
    date: "8 May 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    tag: "Case Study",
    title: "From zero to in-house aligner manufacturing in 12 weeks",
    excerpt: "A step-by-step account of one practice's transition from outsourced to fully autonomous production: the decisions, the challenges, and the results.",
    author: "Finn",
    date: "1 May 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    tag: "Analysis",
    title: "What MasterClass got right that dental education gets wrong",
    excerpt: "Production quality, pacing, personality. The entertainment-first model of learning has lessons for every professional education platform.",
    author: "Okklusion Editorial",
    date: "24 Apr 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    tag: "Innovation",
    title: "AI in triage: where the clinical evidence actually stands",
    excerpt: "Cutting through the noise around AI-assisted orthodontic diagnostics with a clear-eyed look at what's proven, what's promising, and what's hype.",
    author: "Finn",
    date: "18 Apr 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    tag: "Opinion",
    title: "Why practice owners are the only audience that matters",
    excerpt: "Education without implementation is entertainment. The only people who can change how a practice operates are the people who own it.",
    author: "Okklusion Editorial",
    date: "10 Apr 2026",
    readTime: "5 min",
    featured: false,
  },
];

export default function EditorialPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Platform</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
          Editorial
        </h1>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" as const }}>
        {tags.map((tag, i) => (
          <button
            key={tag}
            style={{
              padding: "7px 16px",
              fontSize: "12px",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.04em",
              borderRadius: "100px",
              border: "1px solid",
              borderColor: i === 0 ? "var(--accent-dark)" : "var(--border)",
              backgroundColor: i === 0 ? "var(--accent-dark)" : "transparent",
              color: i === 0 ? "var(--white)" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured && (
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "40px",
            marginBottom: "32px",
            borderRadius: "2px",
            cursor: "pointer",
          }}
          className="hover:bg-[var(--surface-raised)] transition-colors"
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "16px" }}>
            {featured.tag} · Featured
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "16px" }}>
            {featured.title}
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "640px" }}>
            {featured.excerpt}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.author}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.date}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{featured.readTime} read</span>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--accent-dark)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
              Read article <ArrowRight size={13} />
            </span>
          </div>
        </div>
      )}

      {/* Article list */}
      <div className="flex flex-col">
        {rest.map((article, i) => (
          <div
            key={i}
            style={{
              padding: "24px 0",
              borderTop: i === 0 ? "1px solid var(--border)" : "none",
              borderBottom: "1px solid var(--border)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "24px",
            }}
            className="hover:bg-[var(--surface)] transition-colors"
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                {article.tag}
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "8px" }}>
                {article.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
                {article.excerpt}
              </p>
              <div style={{ display: "flex", gap: "14px", marginTop: "12px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.author}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.date}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{article.readTime} read</span>
              </div>
            </div>
            <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
