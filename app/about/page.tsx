import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* Header */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Founder</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "680px" }}>
            Dr Finn Geoghagan<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>Specialist Orthodontist</em>
          </h1>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Our Vision</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "24px", letterSpacing: "-0.01em" }}>
                Digital orthodontics has outgrown its ecosystem
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "20px" }}>
                The tools exist. The workflows are proven. But there is no central home for the education, innovation, and peer connection that practitioners need to implement them properly.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "20px" }}>
                Okklusion is that home. A global, premium ecosystem where clinicians, practices, labs, and innovators come together to build elite digital orthodontic systems, not just run aligner clinics.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
                Education that inspires and enables. Innovation driven by real workflows, not theory. Peer-led, practice-tested, and future-focused.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                ["Totally Wired", "We're not an academy or an institute. Okklusion is something the engaged professional community loves, built for curious, ambitious practitioners who want to go further."],
                ["Practice-First", "Every piece of content is designed for implementation. We build for time-poor practice owners who need to act, not just learn."],
                ["Peer-Led", "Our content is shaped by real workflows and tested by real practices. No theory without application."],
                ["Globally Connected", "A network spanning the UK, Europe, North America, Australia and New Zealand, with a shared commitment to digital-native practice excellence."],
              ].map(([title, text]) => (
                <div key={title} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "24px" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px" }}>{title}</p>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finn profile */}
      <section style={{ backgroundColor: "var(--surface)", padding: "100px 48px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-px" style={{ backgroundColor: "var(--border)" }}>
            <div style={{ backgroundColor: "var(--bg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/okk-finn/700/875" alt="Dr Finn Geoghagan" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ backgroundColor: "var(--bg)", padding: "56px 64px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Founder & Clinical Lead</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.05, marginBottom: "8px" }}>
                Dr Finn Geoghagan
              </h2>
              <p style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, fontWeight: 500, marginBottom: "32px" }}>
                Specialist Orthodontist
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.8, marginBottom: "20px" }}>
                Finn is a specialist orthodontist who built one of the UK&rsquo;s first fully in-house digital aligner practices from scratch. He designed the workflows, sourced the equipment, wrote the ISO protocols, and trained the team &mdash; without a roadmap, because one didn&rsquo;t exist.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.8, marginBottom: "20px" }}>
                Okklusion exists because the education Finn needed simply wasn&rsquo;t there when he needed it. He made expensive mistakes, wasted time on bad advice, and learned the hard way what actually works in a real practice under real pressure.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.8, marginBottom: "36px" }}>
                This platform is the resource he would have paid for at every stage of that journey &mdash; built to give other clinicians the shortcut he never had.
              </p>
              <blockquote style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "24px", fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                &ldquo;I spent years making the mistakes so you don&rsquo;t have to.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" as const }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Accreditation</span>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.01em" }}>
            CPD accredited with the University of York
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "40px" }}>
            Every learning hour on Okklusion is formally recognised through our partnership with the University of York. Higher diploma and master's level programmes are in development, alongside dedicated certification pathways for dental nurses and orthodontic assistants.
          </p>
          <Link
            href="/cpd"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent-dark)", color: "var(--white)", padding: "13px 28px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px" }}
            className="hover:opacity-90 transition-opacity"
          >
            CPD details <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
