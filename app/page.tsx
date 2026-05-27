import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    name: "Clinical",
    description: "Case planning, staging decisions, complex presentations, and evidence-based finishing protocols.",
    modules: 12,
  },
  {
    number: "02",
    name: "Digital Workflow",
    description: "In-house aligner manufacturing, ISO process documentation, printing and QC systems.",
    modules: 18,
  },
  {
    number: "03",
    name: "Software & AI",
    description: "Dental Monitoring integration, treatment planning software, and remote patient management.",
    modules: 9,
  },
  {
    number: "04",
    name: "Community",
    description: "KOL mentorship, practice owner roundtables, and peer implementation support.",
    modules: 7,
  },
];

const tiers = [
  {
    name: "Basic",
    price: "£49",
    period: "/month",
    description: "Core access for practitioners beginning their digital journey.",
    features: [
      "Core training module library",
      "Industry editorial and newsflow",
      "Community feed (read access)",
      "Monthly CPD content",
    ],
    addons: ["Treatment planning (add-on)", "1-to-1 mentoring (add-on)"],
    cta: "Get Started",
    href: "/signup?tier=basic",
    highlight: false,
  },
  {
    name: "Premium",
    price: "£99",
    period: "/month",
    description: "Full learning suite for practices building systematic digital workflows.",
    features: [
      "Everything in Basic",
      "All four content pillars",
      "Show and Tell video library",
      "Factory visit recordings",
      "CPD certification",
      "Select event access",
    ],
    addons: ["1-to-1 mentoring (add-on)"],
    cta: "Join Premium",
    href: "/signup?tier=premium",
    highlight: true,
  },
  {
    name: "Super Premium",
    price: "£199",
    period: "/month",
    description: "Total access for elite practitioners and DSO groups.",
    features: [
      "Everything in Premium",
      "Unlimited 1-to-1 mentoring",
      "Treatment planning included",
      "Full event access",
      "KOL network access",
      "Team and DSO licences",
    ],
    addons: [],
    cta: "Join Super Premium",
    href: "/signup?tier=super-premium",
    highlight: false,
  },
];

const editorial = [
  {
    dept: "Editor's Note",
    title: "Why the best practices are building systems, not just using tools",
    author: "Finn",
    readTime: "4 min",
    date: "27 May 2026",
  },
  {
    dept: "Case of the Week",
    title: "A Class III with severe crowding: the staging decisions that mattered",
    author: "Finn",
    readTime: "10 min",
    date: "26 May 2026",
  },
  {
    dept: "Lab Note",
    title: "Resin selection in high-throughput environments: what the data shows",
    author: "Okklusion Editorial",
    readTime: "6 min",
    date: "25 May 2026",
  },
];

const deptAccents: Record<string, string> = {
  "Editor's Note": "var(--accent)",
  "Case of the Week": "var(--text-primary)",
  "Lab Note": "#7A8C84",
};

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--accent-dark)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 80% 20%, rgba(200,169,106,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Publication dateline */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
              Digital Orthodontics Platform
            </span>
            <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}>
              Est. 2026 · CPD Accredited · University of York
            </span>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 48px 100px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  fontSize: "clamp(52px, 7vw, 96px)",
                  lineHeight: 0.95,
                  color: "var(--white)",
                  letterSpacing: "-0.025em",
                  marginBottom: "40px",
                }}
              >
                Build elite
                <br />
                digital
                <br />
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}>
                  orthodontic
                </em>
                <br />
                systems.
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <Link
                  href="/signup"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-dark)",
                    padding: "14px 32px",
                    fontSize: "11px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    borderRadius: "2px",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Join the Platform
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/pricing"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.55)",
                    padding: "14px 32px",
                    fontSize: "11px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    borderRadius: "2px",
                  }}
                  className="hover:border-white/30 hover:text-white/80 transition-colors"
                >
                  View Membership
                </Link>
              </div>
            </div>

            {/* Right: Editorial preview */}
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "64px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "24px", fontWeight: 600 }}>
                This week in Okklusion
              </p>
              {editorial.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    paddingBottom: i < editorial.length - 1 ? "20px" : "0",
                    marginBottom: i < editorial.length - 1 ? "20px" : "0",
                    borderBottom: i < editorial.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptAccents[item.dept] || "rgba(255,255,255,0.3)", display: "block", marginBottom: "6px" }}>
                    {item.dept}
                  </span>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.35, marginBottom: "6px" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)" }}>
                    {item.author} · {item.readTime} read
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section style={{ padding: "0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ padding: "48px 48px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
                The Curriculum
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: "520px" }}>
              Four pillars. One system.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                style={{ backgroundColor: "var(--bg)", padding: "36px 32px" }}
                className="hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "48px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, marginBottom: "20px" }}>
                  {pillar.number}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.2 }}>
                  {pillar.name}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "20px" }}>
                  {pillar.description}
                </p>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                  {pillar.modules} modules
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive decision teaser — Brilliant-inspired */}
      <section style={{ backgroundColor: "var(--surface)", padding: "100px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
                  Interactive Learning
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "20px" }}>
                Learn by deciding,<br />
                <em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>not by watching.</em>
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "460px" }}>
                Real cases. Real scans. You make the call before seeing the answer. Okklusion's interactive modules are built to develop clinical judgement, not test recall.
              </p>
              <Link
                href="/signup"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "var(--accent-dark)",
                  borderBottom: "1px solid var(--accent-dark)",
                  paddingBottom: "2px",
                }}
                className="hover:opacity-70 transition-opacity"
              >
                See the curriculum <ArrowRight size={12} />
              </Link>
            </div>

            {/* Decision card mock */}
            <div style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", padding: "40px", borderRadius: "2px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 600, marginBottom: "20px" }}>
                Interactive Decision · Case 04/07
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.4, marginBottom: "28px" }}>
                "The patient is 9 weeks in. Aligner 8 of 22. Lower incisors are tracking. Upper right lateral is not. What do you do?"
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                {[
                  "Reorder from aligner 7",
                  "Place an additional attachment and continue",
                  "Advance to aligner 9 and monitor",
                  "Request a mid-course refinement",
                ].map((option, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 18px",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      fontSize: "13px",
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-secondary)",
                      cursor: "default",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", border: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "16px", fontStyle: "italic" }}>
                Commit your answer to reveal the clinical rationale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
                Membership
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Choose your level
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: tier.highlight ? "var(--accent-dark)" : "var(--bg)",
                  padding: "48px 36px",
                  display: "flex",
                  flexDirection: "column" as const,
                }}
              >
                {tier.highlight && (
                  <span style={{ display: "inline-block", fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "16px" }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: tier.highlight ? "var(--white)" : "var(--text-primary)", marginBottom: "8px" }}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, color: tier.highlight ? "var(--white)" : "var(--text-primary)", lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.45)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {tier.period}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "32px" }}>
                  {tier.description}
                </p>

                <div style={{ borderTop: tier.highlight ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)", paddingTop: "24px", marginBottom: "24px" }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ color: "var(--accent)", fontSize: "14px", lineHeight: 1, marginTop: "2px", flexShrink: 0 }}>·</span>
                      <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.75)" : "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{f}</span>
                    </div>
                  ))}
                  {tier.addons.map((a) => (
                    <div key={a} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ color: tier.highlight ? "rgba(255,255,255,0.2)" : "var(--border-strong)", fontSize: "14px", lineHeight: 1, marginTop: "2px", flexShrink: 0 }}>+</span>
                      <span style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.35)" : "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>{a}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={tier.href}
                    style={{
                      display: "block",
                      textAlign: "center" as const,
                      padding: "13px 24px",
                      fontSize: "12px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      borderRadius: "2px",
                      backgroundColor: tier.highlight ? "var(--accent)" : "transparent",
                      color: tier.highlight ? "var(--accent-dark)" : "var(--text-primary)",
                      border: tier.highlight ? "none" : "1px solid var(--border-strong)",
                    }}
                    className="hover:opacity-85 transition-opacity"
                  >
                    {tier.cta}
                  </Link>
                  <p style={{ textAlign: "center" as const, fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.25)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "12px" }}>
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" as const, marginTop: "28px" }}>
            <Link
              href="/pricing"
              style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" as const, display: "inline-flex", alignItems: "center", gap: "6px" }}
              className="hover:text-[var(--text-secondary)] transition-colors"
            >
              Full comparison and FAQ <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial — Monocle-inspired */}
      <section style={{ backgroundColor: "var(--surface)", padding: "80px 48px 100px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Masthead */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", paddingBottom: "24px", borderBottom: "2px solid var(--text-primary)", flexWrap: "wrap" as const, gap: "16px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "6px" }}>
                The Okklusion Review
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                This week's reading
              </h2>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Vol. 1 · Issue 4 · May 2026</p>
              <Link
                href="/platform/editorial"
                style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" as const, display: "inline-flex", alignItems: "center", gap: "4px" }}
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                All departments <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {editorial.map((item, i) => (
              <div
                key={item.title}
                style={{ backgroundColor: "var(--bg)", padding: "32px 28px", cursor: "pointer" }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", paddingBottom: "14px", borderBottom: `2px solid ${deptAccents[item.dept]}` }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptAccents[item.dept] }}>
                    {item.dept}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "16px" }}>
                  {item.title}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.author}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.readTime} read</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD trust strip */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "24px" }}>
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>CPD Accreditation</p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "var(--white)" }}>University of York · 30 hrs annual CPD</p>
          </div>
          <Link
            href="/signup"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, borderRadius: "2px" }}
            className="hover:opacity-90 transition-opacity"
          >
            Join Okklusion <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
