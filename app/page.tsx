import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Users, Zap, Award, ChevronRight } from "lucide-react";

const pillars = [
  {
    icon: <BookOpen size={20} />,
    title: "Clinical & Treatment Planning",
    description:
      "Comprehensive case planning, diagnosis, and treatment sequencing for digital-native practices.",
    href: "/pillars/clinical",
  },
  {
    icon: <Zap size={20} />,
    title: "Digital Workflow & Manufacturing",
    description:
      "ISO process modules, aligner printing protocols, and quality control systems built for scale.",
    href: "/pillars/workflow",
  },
  {
    icon: <FileText size={20} />,
    title: "Software, AI & Integration",
    description:
      "Dental Monitoring protocols, AI-assisted triage, and intelligent business tools.",
    href: "/pillars/software",
  },
  {
    icon: <Users size={20} />,
    title: "Community & Mentorship",
    description:
      "Peer connection, KOL networks, and implementation support for practices at every stage.",
    href: "/pillars/community",
  },
];

const tiers = [
  {
    name: "Basic",
    price: "£49",
    period: "/month",
    description: "Core access for practitioners beginning their digital journey.",
    features: [
      "Access to core training modules",
      "Industry editorial & newsflow",
      "Community feed access",
      "Monthly CPD content",
    ],
    addons: ["Treatment planning services (add-on)", "1-to-1 mentoring (add-on)"],
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
      "Show & Tell video library",
      "Factory visit recordings",
      "Priority CPD certification",
      "Event access (select)",
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
      "Direct KOL network access",
      "Early access to new content",
      "Team/DSO licences available",
    ],
    addons: [],
    cta: "Join Super Premium",
    href: "/signup?tier=super-premium",
    highlight: false,
  },
];

const editorialItems = [
  {
    tag: "Opinion",
    title: "Digital orthodontics has outgrown its ecosystem",
    excerpt:
      "The tools exist. The workflows are proven. What's missing is the infrastructure to teach them properly.",
  },
  {
    tag: "News",
    title: "University of York CPD accreditation: what it means for your practice",
    excerpt:
      "Formal recognition for digital workflow education is arriving. Here's what the accreditation pathway looks like.",
  },
  {
    tag: "Case Study",
    title: "From zero to in-house aligner manufacturing in 12 weeks",
    excerpt:
      "A step-by-step account of one practice's transition from outsourced to fully autonomous production.",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--accent-dark)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
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
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 48px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "40px",
              }}
            >
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase" as const,
                  fontWeight: 500,
                }}
              >
                Digital Orthodontics Platform
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(52px, 7vw, 88px)",
                lineHeight: 1.0,
                color: "var(--white)",
                letterSpacing: "-0.02em",
                marginBottom: "32px",
              }}
            >
              Build elite
              <br />
              digital orthodontic
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                systems.
              </em>
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                maxWidth: "540px",
                marginBottom: "48px",
              }}
            >
              Okklusion brings together the education, community, and tools that
              digital-native practices need, in one premium, CPD-accredited
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-dark)",
                  padding: "14px 32px",
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  borderRadius: "2px",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Join the Platform
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  padding: "14px 32px",
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  borderRadius: "2px",
                }}
                className="hover:border-white hover:text-white transition-colors"
              >
                View Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]"
        >
          {[
            ["4", "Content Pillars"],
            ["CPD", "Accredited, Uni of York"],
            ["3", "Membership Tiers"],
            ["Global", "Community of Clinicians"],
          ].map(([value, label]) => (
            <div key={label} style={{ padding: "28px 40px" }} className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.03em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Four Pillars */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "72px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase" as const,
                }}
              >
                Core Curriculum
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 300,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                maxWidth: "520px",
              }}
            >
              Four pillars of digital mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                style={{ backgroundColor: "var(--bg)", padding: "40px 32px", display: "block" }}
                className="group hover:bg-[var(--surface)] transition-colors"
              >
                <div style={{ color: "var(--accent)", marginBottom: "20px" }}>{p.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-sans)",
                    marginBottom: "24px",
                  }}
                >
                  {p.description}
                </p>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--accent)",
                    fontFamily: "var(--font-sans)",
                    textTransform: "uppercase" as const,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Explore <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          padding: "120px 48px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-sans)",
                    textTransform: "uppercase" as const,
                  }}
                >
                  What's Inside
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 3.5vw, 48px)",
                  fontWeight: 300,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                  letterSpacing: "-0.01em",
                }}
              >
                Not just another academy.
                <br />
                <em style={{ fontStyle: "italic" }}>Something the nerds love.</em>
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-sans)",
                  marginBottom: "40px",
                  maxWidth: "480px",
                }}
              >
                Okklusion is built for time-poor practice owners and clinicians
                who want to implement, not just watch. Every piece of content is
                peer-tested, practice-proven, and CPD-aligned.
              </p>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  color: "var(--accent-dark)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
                className="hover:opacity-70 transition-opacity"
              >
                About the platform <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {[
                ["Training Courses", "ISO modules, aligner printing and DM protocols. Structured 12-week progressions."],
                ["Show & Tells", "Real practice walkthroughs, live demonstrations, and peer case reviews."],
                ["Factory Visits", "Behind-the-scenes access to manufacturing workflows and digital labs."],
                ["Editorial Layer", "Opinion, news, and analysis from the sharpest minds in digital orthodontics."],
                ["CPD Certification", "University of York accredited. Every learning hour counts towards your development."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    padding: "20px 24px",
                    borderRadius: "2px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <Award size={16} style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>{title}</p>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Membership</span>
              <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 54px)",
                fontWeight: 300,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
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
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: tier.highlight ? "var(--white)" : "var(--text-primary)", marginBottom: "8px" }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, color: tier.highlight ? "var(--white)" : "var(--text-primary)", lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.5)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "32px" }}>{tier.description}</p>

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
                  <p style={{ textAlign: "center" as const, fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "12px" }}>
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial preview */}
      <section style={{ backgroundColor: "var(--surface)", padding: "120px 48px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap" as const, gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Editorial</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                From the Okklusion desk
              </h2>
            </div>
            <Link href="/blog" style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "6px" }} className="hover:text-[var(--text-primary)] transition-colors">
              All articles <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {editorialItems.map((item) => (
              <div key={item.title} style={{ backgroundColor: "var(--bg)", padding: "36px 32px", cursor: "pointer" }} className="hover:bg-[var(--surface-raised)] transition-colors">
                <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "16px" }}>{item.tag}</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "16px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65, fontFamily: "var(--font-sans)" }}>{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD Banner */}
      <section style={{ backgroundColor: "var(--bg)", padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "12px" }}>Accreditation</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15 }}>
              CPD accredited in partnership<br />with the University of York
            </h2>
          </div>
          <Link
            href="/cpd"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent-dark)", color: "var(--white)", padding: "13px 28px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px", flexShrink: 0 }}
            className="hover:opacity-90 transition-opacity"
          >
            Learn about CPD <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "120px 48px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Ready to build<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>something different?</em>
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "48px" }}>
            Join the practitioners who are turning digital technology into scalable, systematic practice excellence.
          </p>
          <Link
            href="/signup"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "16px 40px", fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
            className="hover:opacity-90 transition-opacity"
          >
            Join Okklusion <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
