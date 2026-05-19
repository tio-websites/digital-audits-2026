import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "£49",
    annual: "£470",
    period: "/month",
    description: "Core access for practitioners beginning their digital journey.",
    features: [
      "Core training module library",
      "Industry editorial & newsflow",
      "Opinion pieces & analysis",
      "Community feed (read access)",
      "Monthly CPD content",
      "Member newsletter",
    ],
    addons: [
      "Treatment planning services",
      "1-to-1 mentoring sessions",
      "In-person event access",
    ],
    cta: "Get Started",
    href: "/signup?tier=basic",
    highlight: false,
  },
  {
    name: "Premium",
    price: "£99",
    annual: "£950",
    period: "/month",
    description: "Full learning suite for practices building systematic digital workflows.",
    features: [
      "Everything in Basic",
      "All four content pillars, fully unlocked",
      "Show & Tell video library",
      "Factory visit recordings",
      "Priority CPD certification pathway",
      "Community: post and contribute",
      "Select event access included",
      "ISO process module library",
      "DM protocol deep-dives",
    ],
    addons: ["1-to-1 mentoring sessions"],
    cta: "Join Premium",
    href: "/signup?tier=premium",
    highlight: true,
  },
  {
    name: "Super Premium",
    price: "£199",
    annual: "£1,910",
    period: "/month",
    description: "Total access for elite practitioners and DSO groups.",
    features: [
      "Everything in Premium",
      "Unlimited 1-to-1 mentoring",
      "Treatment planning services included",
      "Full event access",
      "Direct KOL network access",
      "Early access to all new content",
      "Team & DSO licence options",
      "Priority support",
      "Annual practice review session",
    ],
    addons: [],
    cta: "Join Super Premium",
    href: "/signup?tier=super-premium",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Can I change my membership tier?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect from the next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a one-month introductory period on Basic. No card required to start.",
  },
  {
    q: "How is payment handled?",
    a: "All memberships are billed via GoCardless. You can pay monthly or save with an annual plan.",
  },
  {
    q: "What are add-on services?",
    a: "On Basic and Premium, treatment planning and 1-to-1 mentoring are available as optional extras at an additional fee. Super Premium includes them in full.",
  },
  {
    q: "Are there team or DSO licences?",
    a: "Yes. Super Premium includes options for multi-seat licences. Contact us to discuss DSO pricing.",
  },
  {
    q: "How does CPD accreditation work?",
    a: "Learning hours on Okklusion count toward your CPD record, accredited through the University of York. Certificates are issued per module on Premium and above.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* Header */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
              Membership
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "20px" }}>
            Choose your level
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.7 }}>
            All plans are billed via GoCardless. Annual billing saves two months.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 400, color: tier.highlight ? "var(--white)" : "var(--text-primary)", marginBottom: "8px" }}>{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "48px", fontWeight: 300, color: tier.highlight ? "var(--white)" : "var(--text-primary)", lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.45)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.35)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                  or {tier.annual}/year (save 2 months)
                </p>
                <p style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "32px" }}>{tier.description}</p>

                <div style={{ borderTop: tier.highlight ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)", paddingTop: "24px", marginBottom: "16px" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: tier.highlight ? "rgba(255,255,255,0.35)" : "var(--text-muted)", marginBottom: "14px" }}>Included</p>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                      <Check size={13} style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.75)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.45 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {tier.addons.length > 0 && (
                  <div style={{ marginBottom: "32px" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: tier.highlight ? "rgba(255,255,255,0.25)" : "var(--text-muted)", marginBottom: "12px" }}>Add-ons available</p>
                    {tier.addons.map((a) => (
                      <div key={a} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                        <span style={{ color: tier.highlight ? "rgba(255,255,255,0.2)" : "var(--border-strong)", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>+</span>
                        <span style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={tier.href}
                    style={{
                      display: "block",
                      textAlign: "center" as const,
                      padding: "14px 24px",
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
                  <p style={{ textAlign: "center" as const, fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.25)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "10px" }}>
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "var(--surface)", padding: "100px 48px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>FAQ</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "56px", letterSpacing: "-0.01em" }}>
            Common questions
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "28px 0",
                }}
              >
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.3 }}>{faq.q}</p>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                Still have questions?{" "}
                <Link href="/contact" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "80px 48px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "20px" }}>
            Not sure which tier?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "36px" }}>
            Start with Basic, free for one month. Upgrade any time.
          </p>
          <Link
            href="/signup"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "14px 36px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
            className="hover:opacity-90 transition-opacity"
          >
            Start free <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
