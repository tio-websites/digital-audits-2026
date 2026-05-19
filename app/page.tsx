import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
          minHeight: "88vh",
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
              "radial-gradient(ellipse at 75% 30%, rgba(200,169,106,0.07) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 48px",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
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
              fontSize: "clamp(56px, 8vw, 104px)",
              lineHeight: 0.95,
              color: "var(--white)",
              letterSpacing: "-0.025em",
              marginBottom: "48px",
              maxWidth: "780px",
            }}
          >
            Build elite
            <br />
            digital orthodontic
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>
              systems.
            </em>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "var(--accent)",
                color: "var(--accent-dark)",
                padding: "15px 36px",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                borderRadius: "2px",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Join the Platform
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.65)",
                padding: "15px 36px",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                borderRadius: "2px",
              }}
              className="hover:border-white/40 hover:text-white/90 transition-colors"
            >
              View Membership
            </Link>
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
            ["CPD", "University of York"],
            ["3", "Membership Tiers"],
            ["Global", "Clinician Community"],
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

      {/* Membership Tiers */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "64px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
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
                Membership
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Choose your level
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ backgroundColor: "var(--border)" }}
          >
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
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      color: "var(--accent)",
                      textTransform: "uppercase" as const,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      marginBottom: "16px",
                    }}
                  >
                    Most Popular
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "28px",
                    fontWeight: 400,
                    color: tier.highlight ? "var(--white)" : "var(--text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "44px",
                      fontWeight: 300,
                      color: tier.highlight ? "var(--white)" : "var(--text-primary)",
                      lineHeight: 1,
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: tier.highlight ? "rgba(255,255,255,0.45)" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: tier.highlight ? "rgba(255,255,255,0.6)" : "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                    lineHeight: 1.6,
                    marginBottom: "32px",
                  }}
                >
                  {tier.description}
                </p>

                <div
                  style={{
                    borderTop: tier.highlight
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid var(--border)",
                    paddingTop: "24px",
                    marginBottom: "24px",
                  }}
                >
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span
                        style={{
                          color: "var(--accent)",
                          fontSize: "14px",
                          lineHeight: 1,
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      >
                        ·
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: tier.highlight ? "rgba(255,255,255,0.75)" : "var(--text-secondary)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                  {tier.addons.map((a) => (
                    <div key={a} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span
                        style={{
                          color: tier.highlight ? "rgba(255,255,255,0.2)" : "var(--border-strong)",
                          fontSize: "14px",
                          lineHeight: 1,
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      >
                        +
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: tier.highlight ? "rgba(255,255,255,0.35)" : "var(--text-muted)",
                          fontFamily: "var(--font-sans)",
                          fontStyle: "italic",
                        }}
                      >
                        {a}
                      </span>
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
                  <p
                    style={{
                      textAlign: "center" as const,
                      fontSize: "11px",
                      color: tier.highlight ? "rgba(255,255,255,0.25)" : "var(--text-muted)",
                      fontFamily: "var(--font-sans)",
                      marginTop: "12px",
                    }}
                  >
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" as const, marginTop: "32px" }}>
            <Link
              href="/pricing"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              className="hover:text-[var(--text-secondary)] transition-colors"
            >
              Full comparison and FAQ <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial teaser */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          padding: "100px 48px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
              flexWrap: "wrap" as const,
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
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
                  Editorial
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 300,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                From the Okklusion desk
              </h2>
            </div>
            <Link
              href="/blog"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                color: "var(--text-secondary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              All articles <ArrowRight size={12} />
            </Link>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ backgroundColor: "var(--border)" }}
          >
            {editorialItems.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "var(--bg)",
                  padding: "36px 32px",
                  cursor: "pointer",
                }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                    textTransform: "uppercase" as const,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  {item.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                    marginBottom: "14px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
