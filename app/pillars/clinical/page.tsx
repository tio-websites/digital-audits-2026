import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


const modules = [
  { title: "Diagnosis & Treatment Planning Fundamentals", duration: "3h 20m", level: "Foundational" },
  { title: "Advanced Case Planning: Complex Presentations", duration: "4h 45m", level: "Advanced" },
  { title: "Staging Strategies for Class II & III", duration: "3h 10m", level: "Intermediate" },
  { title: "Biomechanics in Digital Aligner Treatment", duration: "2h 50m", level: "Intermediate" },
  { title: "Finishing & Retention Protocols", duration: "2h 00m", level: "Foundational" },
];

export default function ClinicalPillarPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", marginBottom: "32px", letterSpacing: "0.04em" }} className="hover:text-white/70 transition-colors">
            ← Back to pillars
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Pillar One</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "24px" }}>
            Clinical &<br />Treatment Planning
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.7 }}>
            Comprehensive case planning, diagnosis, and treatment sequencing for digital-native practices, from foundational principles to advanced case complexity.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Curriculum</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "36px" }}>
                What you'll learn
              </h2>

              <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
                {modules.map((mod) => (
                  <Link
                    key={mod.title}
                    href="/platform/courses"
                    style={{ backgroundColor: "var(--bg)", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
                    className="hover:bg-[var(--surface)] transition-colors"
                  >
                    <div>
                      <p style={{ fontSize: "15px", fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "4px" }}>{mod.title}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{mod.level} · {mod.duration}</p>
                    </div>
                    <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "32px", borderRadius: "2px", marginBottom: "20px" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "16px" }}>Pillar access</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "24px" }}>
                  Clinical & Treatment Planning content is available on Premium and Super Premium. Basic members have access to foundational modules.
                </p>
                <Link
                  href="/pricing"
                  style={{ display: "block", textAlign: "center" as const, padding: "12px 20px", backgroundColor: "var(--accent-dark)", color: "var(--white)", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  See membership
                </Link>
              </div>
              <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "2px" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
                  All clinical modules are CPD accredited through the University of York.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
