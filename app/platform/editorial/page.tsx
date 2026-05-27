import { ArrowRight } from "lucide-react";

const departments = [
  {
    dept: "Editor's Note",
    slug: "editors-note",
    description: "Finn's weekly perspective on where digital orthodontics is heading.",
    featured: {
      title: "Why the best practices are building systems, not just using tools",
      excerpt: "There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable. Only one of them runs without the principal in the room.",
      author: "Finn",
      date: "27 May 2026",
      readTime: "4 min",
    },
    recent: [
      { title: "On the pressure to adopt AI before understanding it", date: "20 May 2026" },
      { title: "What 350 orthodontists at a Berlin Saturday told us about demand", date: "13 May 2026" },
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
      { title: "Unexpected root resorption at review: what we changed and why", date: "19 May 2026" },
      { title: "A relapse case — what the retention protocol missed", date: "12 May 2026" },
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
      { title: "Post-cure time and aligner fit: a practical review", date: "18 May 2026" },
      { title: "Printer calibration drift: how to catch it before it reaches the patient", date: "11 May 2026" },
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
      { title: "Treatment planning software: a practical comparison for 2026", date: "17 May 2026" },
      { title: "When AI triage recommendations differ from your clinical instinct", date: "10 May 2026" },
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
      { title: "Overcorrection protocols: evidence versus convention", date: "16 May 2026" },
      { title: "Retention: what the long-term data on relapse rates tells us", date: "9 May 2026" },
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
      { title: "Pricing digital workflows: what to charge and how to explain it", date: "15 May 2026" },
      { title: "Building a referral pipeline from digital case outcomes", date: "8 May 2026" },
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
    <div style={{ padding: "40px 48px 64px", maxWidth: "1100px" }}>

      {/* Masthead */}
      <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: "16px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "8px" }}>
              The Okklusion Review
            </p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1 }}>
              Editorial
            </h1>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>Vol. 1 · Issue 4 · May 2026</p>
            <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", flexWrap: "wrap" as const }}>
              {departments.map((d) => (
                <span
                  key={d.dept}
                  style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", padding: "2px 8px", border: "1px solid var(--border)", borderRadius: "1px" }}
                >
                  {d.dept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured — Editor's Note */}
      <div
        style={{
          backgroundColor: "var(--accent-dark)",
          padding: "48px",
          marginBottom: "4px",
          cursor: "pointer",
        }}
        className="hover:opacity-95 transition-opacity"
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--accent)", display: "block", marginBottom: "20px" }}>
          Editor's Note
        </span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.1, marginBottom: "20px", maxWidth: "680px", letterSpacing: "-0.01em" }}>
          {departments[0].featured.title}
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "580px" }}>
          {departments[0].featured.excerpt}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)" }}>
            {departments[0].featured.author} · {departments[0].featured.date} · {departments[0].featured.readTime} read
          </p>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
            Read <ArrowRight size={11} />
          </span>
        </div>
      </div>

      {/* Department grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)", marginBottom: "48px" }}>
        {departments.slice(1).map((dept) => (
          <div
            key={dept.dept}
            style={{ backgroundColor: "var(--bg)", padding: "32px 36px", display: "flex", flexDirection: "column" as const }}
          >
            {/* Department header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "16px", borderBottom: `2px solid ${deptAccents[dept.dept]}` }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptAccents[dept.dept] }}>
                {dept.dept}
              </span>
            </div>

            {/* Featured piece */}
            <div
              style={{ cursor: "pointer", marginBottom: "20px", flex: 1 }}
              className="group"
            >
              <h3
                style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "10px" }}
                className="group-hover:opacity-75 transition-opacity"
              >
                {dept.featured.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "12px" }}>
                {dept.featured.excerpt}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                {dept.featured.author} · {dept.featured.readTime} read
              </p>
            </div>

            {/* Recent from this dept */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              {dept.recent.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", padding: "8px 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
                  className="hover:opacity-75 transition-opacity"
                >
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>{item.title}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", flexShrink: 0 }}>{item.date.split(" ")[0]} {item.date.split(" ")[1]}</p>
                </div>
              ))}
              <div style={{ paddingTop: "12px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: deptAccents[dept.dept], fontFamily: "var(--font-sans)", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  All {dept.dept} <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member responses */}
      <div style={{ borderTop: "2px solid var(--text-primary)", paddingTop: "28px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>
          Member Questions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {[
            { q: "At what throughput does in-house printing become cost-effective?", resp: "Finn", dept: "Lab Note" },
            { q: "How should we handle patients who disengage from DM mid-treatment?", resp: "Finn", dept: "Practice Note" },
            { q: "Is there a standard for how many attachments is too many?", resp: "Finn", dept: "Evidence Note" },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: "var(--surface)", padding: "24px 28px", cursor: "pointer" }} className="hover:bg-[var(--surface-raised)] transition-colors">
              <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginBottom: "12px" }}>{item.dept}</p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.4, marginBottom: "12px" }}>
                &ldquo;{item.q}&rdquo;
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Answered by {item.resp}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
