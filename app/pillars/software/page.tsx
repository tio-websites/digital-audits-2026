import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const modules = [
  { title: "Dental Monitoring — Remote Protocol Setup & Mastery", duration: "6h 45m", level: "Foundational" },
  { title: "AI-Assisted Triage: Clinical Workflow Integration", duration: "3h 15m", level: "Intermediate" },
  { title: "Treatment Planning Software Deep-Dive", duration: "4h 00m", level: "Intermediate" },
  { title: "Automated Business Intelligence for Ortho Practices", duration: "2h 30m", level: "Advanced" },
  { title: "Future-Proofing: AI & Digital Convergence in Orthodontics", duration: "1h 45m", level: "Advanced" },
];

export default function SoftwarePillarPage() {
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
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Pillar Three</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "24px" }}>
            Software, AI<br />&amp; Integration
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", fontWeight: 300, maxWidth: "520px", lineHeight: 1.7 }}>
            Dental Monitoring protocols, AI-assisted triage, and intelligent business tools for the digital-native practice.
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
                  <div
                    key={mod.title}
                    style={{ backgroundColor: "var(--bg)", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", cursor: "pointer" }}
                    className="hover:bg-[var(--surface)] transition-colors"
                  >
                    <div>
                      <p style={{ fontSize: "15px", fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "4px" }}>{mod.title}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{mod.level} · {mod.duration}</p>
                    </div>
                    <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "32px", borderRadius: "2px" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "16px" }}>Pillar access</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "24px" }}>
                  Software, AI & Integration content is available on Premium and Super Premium.
                </p>
                <Link
                  href="/pricing"
                  style={{ display: "block", textAlign: "center" as const, padding: "12px 20px", backgroundColor: "var(--accent-dark)", color: "var(--white)", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  See membership
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
