import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const faqs = [
  {
    section: "Membership",
    items: [
      { q: "What's included in each membership tier?", a: "Basic includes core training modules, editorial, and community access. Premium adds all four content pillars, Show & Tells, factory visits, and CPD certification. Super Premium adds unlimited mentoring, treatment planning, full events, and DSO licences. See the full comparison on our pricing page." },
      { q: "Can I change tiers?", a: "Yes — upgrade or downgrade at any time. Changes take effect from the next billing cycle. No penalties." },
      { q: "Is there a free trial?", a: "We offer a one-month introductory period on Basic. No payment details required to start." },
      { q: "What are add-on services?", a: "Treatment planning and 1-to-1 mentoring sessions can be added to Basic and Premium tiers at an additional fee. Super Premium includes both in full." },
    ],
  },
  {
    section: "Payment",
    items: [
      { q: "How is payment handled?", a: "All memberships are billed via GoCardless. You can pay monthly or annually. Annual billing saves the equivalent of two months." },
      { q: "Can I cancel?", a: "Yes — cancel at any time from your account settings. Your access continues until the end of your paid period." },
      { q: "Are there team or DSO licences?", a: "Yes. Super Premium includes team licence options. Contact us for DSO group pricing — we offer bespoke arrangements for larger organisations." },
    ],
  },
  {
    section: "CPD & Accreditation",
    items: [
      { q: "How does CPD accreditation work?", a: "Learning hours are tracked automatically as you complete modules. Certificates are issued per module on Premium and above, accredited through the University of York." },
      { q: "Which membership tiers include CPD?", a: "All tiers include some CPD content. Full certification — certificates per module and your CPD record — is available on Premium and Super Premium." },
      { q: "Is there a pathway for dental nurses and orthodontic assistants?", a: "Yes — we're developing dedicated staff certification pathways. These will be available via Super Premium team licences." },
    ],
  },
  {
    section: "Platform & Content",
    items: [
      { q: "Can I access the platform on mobile?", a: "Yes — Okklusion is fully responsive and accessible on any device." },
      { q: "How often is new content added?", a: "New courses, articles, and Show & Tells are added continuously. Premium and Super Premium members get early access to new content." },
      { q: "What is the community?", a: "A peer discussion space for Okklusion members — cases, workflow questions, equipment discussions, and career topics. Premium members can post and contribute; Basic members have read access." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>FAQ</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Frequently asked questions
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {faqs.map((section) => (
            <div key={section.section} style={{ marginBottom: "64px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "28px" }}>
                {section.section}
              </p>
              {section.items.map((item, i) => (
                <div key={i} style={{ borderTop: "1px solid var(--border)", padding: "24px 0" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.3 }}>{item.q}</p>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>
          ))}

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px", textAlign: "center" as const }}>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
              Didn't find what you're looking for?
            </p>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent-dark)", color: "var(--white)", padding: "12px 24px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
              className="hover:opacity-90 transition-opacity"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
