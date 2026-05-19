import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, FileText, Users } from "lucide-react";

export default function CPDPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Accreditation</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "24px", maxWidth: "700px" }}>
            CPD that counts — accredited with the University of York
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.7 }}>
            Every learning hour on Okklusion is formally recognised. Build your development record while you build better systems.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>How It Works</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 3vw, 42px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "24px", letterSpacing: "-0.01em" }}>
                Structured learning that earns formal recognition
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "20px" }}>
                Okklusion's curriculum is built alongside the University of York to ensure every module meets CPD standards. As you progress through courses, your learning hours are automatically tracked and a certificate is issued on completion.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "40px" }}>
                We're also developing pathways for higher diploma and master's level programmes, with dedicated certification routes for dental nurses and orthodontic assistants.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: <BookOpen size={16} />, title: "Tracked automatically", desc: "Hours are logged as you complete modules — no manual record-keeping required." },
                  { icon: <Award size={16} />, title: "Certificates on completion", desc: "Each module issues a CPD certificate, accredited through the University of York." },
                  { icon: <FileText size={16} />, title: "Annual CPD record", desc: "Your dashboard shows a live view of hours earned across all categories." },
                  { icon: <Users size={16} />, title: "Staff pathways", desc: "Dedicated certification routes for dental nurses and orthodontic assistants." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "2px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--accent)" }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>{title}</p>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "40px", borderRadius: "2px", marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "20px" }}>
                  CPD Categories Covered
                </p>
                {[
                  ["Clinical Treatment Planning", "8–12h per year"],
                  ["Digital Workflow & Manufacturing", "10–15h per year"],
                  ["Software & Technology", "6–10h per year"],
                  ["Practice Management", "4–8h per year"],
                  ["Ethics & Communication", "2–4h per year"],
                ].map(([cat, hours]) => (
                  <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>{cat}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{hours}</span>
                  </div>
                ))}
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "16px", lineHeight: 1.55, fontStyle: "italic" }}>
                  Exact allocations depend on tier and completed modules.
                </p>
              </div>

              <div style={{ backgroundColor: "var(--accent-dark)", padding: "32px", borderRadius: "2px" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--white)", marginBottom: "12px" }}>
                  Ready to start earning CPD?
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "24px" }}>
                  All Premium and Super Premium members have full CPD certification access. Basic members earn CPD on selected content.
                </p>
                <Link
                  href="/signup"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "12px 24px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Join now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
