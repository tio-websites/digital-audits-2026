import { ArrowRight } from "lucide-react";
import Link from "next/link";

const departments = [
  {
    dept: "Editor's Note",
    slug: "editors-note",
    description: "Finn's weekly perspective on where digital orthodontics is heading.",
    featured: {
      title: "Why the best practices are building systems, not just using tools",
      excerpt: "There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable. Only one of them runs without the principal in the room. The distinction matters more than most practitioners realise, and most find out too late.",
      author: "Finn",
      date: "27 May 2026",
      readTime: "4 min",
    },
    recent: [
      { title: "On the pressure to adopt AI before understanding it", date: "20 May 2026", readTime: "3 min" },
      { title: "What 350 orthodontists at a Berlin Saturday told us about demand", date: "13 May 2026", readTime: "5 min" },
    ],
  },
  {
    dept: "Case of the Week",
    slug: "case-of-the-week",
    description: "A clinical case dissected in full — staging decisions, mid-treatment calls, and outcomes.",
    featured: {
      title: "A Class III with severe crowding: the staging decisions that mattered",
      excerpt: "When anchorage is limited and the patient won't tolerate extractions, every staging decision carries compounding consequences. Here is how we worked through it.",
      author: "Finn",
      date: "26 May 2026",
      readTime: "10 min",
    },
    recent: [
      { title: "Unexpected root resorption at review: what we changed and why", date: "19 May 2026", readTime: "8 min" },
      { title: "A relapse case — what the retention protocol missed", date: "12 May 2026", readTime: "6 min" },
    ],
  },
  {
    dept: "Lab Note",
    slug: "lab-note",
    description: "Manufacturing, printing, materials, and quality control from the production floor.",
    featured: {
      title: "Resin selection in high-throughput environments: what the data shows",
      excerpt: "Not all resins perform equally under production pressure. We tested three materials across 400 consecutive prints and the results were not what we expected.",
      author: "Okklusion Editorial",
      date: "25 May 2026",
      readTime: "6 min",
    },
    recent: [
      { title: "Post-cure time and aligner fit: a practical review", date: "18 May 2026", readTime: "5 min" },
      { title: "Printer calibration drift: how to catch it before it reaches the patient", date: "11 May 2026", readTime: "4 min" },
    ],
  },
  {
    dept: "Software Note",
    slug: "software-note",
    description: "Updates, analysis and practical guidance on the software stack.",
    featured: {
      title: "DM 4.2 update: what changed in the monitoring algorithm",
      excerpt: "The new compliance scoring model changes how non-wear is classified. Here is what it means for how you triage your active patients.",
      author: "Okklusion Editorial",
      date: "24 May 2026",
      readTime: "4 min",
    },
    recent: [
      { title: "Treatment planning software: a practical comparison for 2026", date: "17 May 2026", readTime: "7 min" },
      { title: "When AI triage recommendations differ from your clinical instinct", date: "10 May 2026", readTime: "5 min" },
    ],
  },
  {
    dept: "Evidence Note",
    slug: "evidence-note",
    description: "Clinical research translated into practical guidance.",
    featured: {
      title: "Root resorption risk in digital aligner therapy: a review of current evidence",
      excerpt: "The literature is more nuanced than the marketing suggests. Here is what the evidence actually says and what it means for informed consent.",
      author: "Okklusion Editorial",
      date: "23 May 2026",
      readTime: "7 min",
    },
    recent: [
      { title: "Overcorrection protocols: evidence versus convention", date: "16 May 2026", readTime: "6 min" },
      { title: "Retention: what the long-term data on relapse rates tells us", date: "9 May 2026", readTime: "8 min" },
    ],
  },
  {
    dept: "Practice Note",
    slug: "practice-note",
    description: "Operations, staffing, systems, and the business of a digital practice.",
    featured: {
      title: "How to onboard a treatment coordinator onto DM in five days",
      excerpt: "Staff resistance is almost always a training and confidence problem. Here is a structured five-day onboarding that removes both.",
      author: "Okklusion Editorial",
      date: "22 May 2026",
      readTime: "5 min",
    },
    recent: [
      { title: "Pricing digital workflows: what to charge and how to explain it", date: "15 May 2026", readTime: "4 min" },
      { title: "Building a referral pipeline from digital case outcomes", date: "8 May 2026", readTime: "5 min" },
    ],
  },
];

const deptAccents: Record<string, string> = {
  "Editor's Note": "var(--accent)",
  "Case of the Week": "var(--text-primary)",
  "Lab Note": "#7A8C84",
  "Software Note": "#8C8279",
  "Evidence Note": "#848C7A",
  "Practice Note": "var(--text-secondary)",
};

export default function EditorialPage() {
  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* ── MASTHEAD ──────────────────────────────────────────────────────── */}
      <div style={{ padding: "48px 48px 0" }}>
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "8px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
              The Okklusion Review
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              Vol. 1 · Issue 4 · 27 May 2026
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: "24px", paddingBottom: "40px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.025em", lineHeight: 0.9, marginBottom: "16px" }}>
              Editorial
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "440px" }}>
              Weekly dispatches from the intersection of clinical practice and digital orthodontics. Every piece written by practitioners, for practitioners.
            </p>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", flexWrap: "wrap" as const }}>
              {departments.map((d) => (
                <span
                  key={d.dept}
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    fontFamily: "var(--font-sans)",
                    color: deptAccents[d.dept],
                    padding: "3px 10px",
                    border: `1px solid ${deptAccents[d.dept]}`,
                    borderRadius: "1px",
                    opacity: 0.7,
                  }}
                >
                  {d.dept}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "3px", backgroundColor: "var(--text-primary)", marginBottom: "0" }} />
      </div>

      {/* ── FEATURED — EDITOR'S NOTE ──────────────────────────────────────── */}
      <div style={{ padding: "0 48px" }}>
        <Link
          href="/signup"
          style={{ display: "block", textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "var(--accent-dark)",
              padding: "56px 64px",
              marginBottom: "4px",
              borderBottom: "4px solid var(--accent)",
            }}
            className="hover:opacity-95 transition-opacity"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{ width: "36px", height: "2px", backgroundColor: "var(--accent)" }} />
              <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--accent)" }}>
                Editor&rsquo;s Note · Cover Story · Issue 4
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.05, marginBottom: "24px", maxWidth: "720px", letterSpacing: "-0.02em" }}>
              {departments[0].featured.title}
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "600px" }}>
              {departments[0].featured.excerpt}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>
                  By {departments[0].featured.author}
                </p>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)" }}>·</span>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>
                  {departments[0].featured.date}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", backgroundColor: "rgba(255,255,255,0.07)", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", borderRadius: "2px", letterSpacing: "0.04em" }}>
                  {departments[0].featured.readTime} read
                </span>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                Read this issue <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── DEPARTMENT GRID ───────────────────────────────────────────────── */}
      <div style={{ padding: "4px 48px 0" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {departments.slice(1).map((dept) => {
            const accent = deptAccents[dept.dept];
            return (
              <div
                key={dept.dept}
                style={{ backgroundColor: "var(--bg)", padding: "40px 44px 36px", display: "flex", flexDirection: "column" as const }}
              >
                {/* Department header with colored rule */}
                <div style={{ marginBottom: "28px" }}>
                  <div style={{ height: "2px", backgroundColor: accent, marginBottom: "14px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: accent }}>
                      {dept.dept}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.5, maxWidth: "220px", textAlign: "right" as const, fontStyle: "italic" }}>
                      {dept.description}
                    </span>
                  </div>
                </div>

                {/* Featured piece */}
                <Link href="/signup" style={{ display: "block", textDecoration: "none", flex: 1 }} className="group">
                  <div style={{ marginBottom: "24px" }}>
                    <h3
                      style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "12px", letterSpacing: "-0.005em" }}
                      className="group-hover:opacity-70 transition-opacity"
                    >
                      {dept.featured.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "14px" }}>
                      {dept.featured.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        {dept.featured.author} · {dept.featured.date}
                      </p>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", borderRadius: "2px", letterSpacing: "0.04em" }}>
                        {dept.featured.readTime} read
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Separator */}
                <div style={{ borderTop: "1px solid var(--border)", marginBottom: "20px" }} />

                {/* Recent articles */}
                <div>
                  {dept.recent.map((item, i) => (
                    <Link
                      key={i}
                      href="/signup"
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", padding: "10px 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none", textDecoration: "none" }}
                      className="hover:opacity-70 transition-opacity group"
                    >
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.5, flex: 1 }}>{item.title}</p>
                      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                        <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.date.split(" ")[0]} {item.date.split(" ")[1]}</p>
                        <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 6px", backgroundColor: "var(--surface)", fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", borderRadius: "2px" }}>
                          {item.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <div style={{ paddingTop: "16px" }}>
                    <Link
                      href="/signup"
                      style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: accent, fontFamily: "var(--font-sans)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      All {dept.dept} <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── LETTERS PAGE — MEMBER QUESTIONS ──────────────────────────────── */}
      <div style={{ padding: "0 48px 64px" }}>
        <div style={{ marginTop: "4px", backgroundColor: "var(--surface)", padding: "48px 52px" }}>
          {/* Letters header */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px", paddingBottom: "24px", borderBottom: "2px solid var(--text-primary)" }}>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginBottom: "4px" }}>
                Letters · Vol. 1 Issue 4
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.01em" }}>
                Member Questions
              </p>
            </div>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
            <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic", maxWidth: "200px", textAlign: "right" as const, lineHeight: 1.5 }}>
              Selected questions answered by Finn each issue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {[
              { q: "At what throughput does in-house printing become cost-effective?", resp: "Finn", dept: "Lab Note" },
              { q: "How should we handle patients who disengage from DM mid-treatment?", resp: "Finn", dept: "Practice Note" },
              { q: "Is there a standard for how many attachments is too many?", resp: "Finn", dept: "Evidence Note" },
            ].map((item, i) => (
              <Link
                key={i}
                href="/signup"
                style={{ display: "block", backgroundColor: "var(--bg)", padding: "32px 36px", textDecoration: "none" }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: deptAccents[item.dept] }}>
                    {item.dept}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: "20px", letterSpacing: "-0.005em" }}>
                  &ldquo;{item.q}&rdquo;
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>
                    Answered by {item.resp}
                  </p>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "4px" }}>
                    Read <ArrowRight size={9} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
