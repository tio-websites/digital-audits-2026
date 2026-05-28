import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const editorial = [
  {
    dept: "Editor's Note",
    title: "Why the best practices are building systems, not just using tools",
    author: "Finn",
    readTime: "4 min",
    date: "27 May 2026",
    accentColour: "var(--accent)",
  },
  {
    dept: "Case of the Week",
    title: "A Class III with severe crowding: the staging decisions that mattered",
    author: "Finn",
    readTime: "10 min",
    date: "26 May 2026",
    accentColour: "var(--text-primary)",
  },
  {
    dept: "Lab Note",
    title: "Resin selection in high-throughput environments: what the data shows",
    author: "Okklusion Editorial",
    readTime: "6 min",
    date: "25 May 2026",
    accentColour: "#7A8C84",
  },
];

const PHOTOS: Record<string, string> = {
  cover:       "https://picsum.photos/seed/okk-cover/900/1100",
  portrait:    "https://picsum.photos/seed/okk-finn/700/875",
  pillar01:    "https://picsum.photos/seed/okk-clinical/600/600",
  pillar02:    "https://picsum.photos/seed/okk-lab/600/600",
  pillar03:    "https://picsum.photos/seed/okk-software/600/600",
  pillar04:    "https://picsum.photos/seed/okk-community/600/600",
  decision:    "https://picsum.photos/seed/okk-decision/700/900",
  editFeature: "https://picsum.photos/seed/okk-feature/900/560",
  editThumb1:  "https://picsum.photos/seed/okk-thumb1/240/240",
  editThumb2:  "https://picsum.photos/seed/okk-thumb2/240/240",
  cpd:         "https://picsum.photos/seed/okk-practice/900/400",
};

const tiers = [
  {
    name: "Basic", price: "£49", period: "/month",
    description: "Core access for practitioners beginning their digital journey.",
    features: ["Core training module library", "Industry editorial and newsflow", "Community feed (read access)", "Monthly CPD content"],
    addons: ["Treatment planning (add-on)", "1-to-1 mentoring (add-on)"],
    cta: "Get Started", href: "/signup?tier=basic", highlight: false,
  },
  {
    name: "Premium", price: "£99", period: "/month",
    description: "Full learning suite for practices building systematic digital workflows.",
    features: ["Everything in Basic", "All four content pillars", "Show and Tell video library", "Factory visit recordings", "CPD certification", "Select event access"],
    addons: ["1-to-1 mentoring (add-on)"],
    cta: "Join Premium", href: "/signup?tier=premium", highlight: true,
  },
  {
    name: "Super Premium", price: "£199", period: "/month",
    description: "Total access for elite practitioners and DSO groups.",
    features: ["Everything in Premium", "Unlimited 1-to-1 mentoring", "Treatment planning included", "Full event access", "KOL network access", "Team and DSO licences"],
    addons: [],
    cta: "Join Super Premium", href: "/signup?tier=super-premium", highlight: false,
  },
];

const pillars = [
  { n: "01", name: "Clinical",          desc: "Case planning, staging decisions, complex presentations and evidence-based finishing.", modules: 12, photo: "pillar01", bg: "var(--bg)" },
  { n: "02", name: "Digital Workflow",  desc: "In-house aligner manufacturing, ISO documentation, printing and QC systems.",          modules: 18, photo: "pillar02", bg: "var(--surface)" },
  { n: "03", name: "Software & AI",     desc: "Dental Monitoring integration, treatment planning software, remote patient management.", modules: 9,  photo: "pillar03", bg: "var(--surface)" },
  { n: "04", name: "Community",         desc: "KOL mentorship, practice owner roundtables and peer implementation support.",           modules: 7,  photo: "pillar04", bg: "var(--bg)" },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            The Okklusion Review
          </span>
          <span className="hidden sm:block" style={{ fontSize: "10px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-sans)" }}>
            Vol. 1 · Issue 4 · 27 May 2026
          </span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--accent-dark)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "88vh" }}>

            {/* Left: cover photo — hidden on mobile */}
            <div className="hidden md:block relative" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.cover} alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.6)" }} />
              <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
                  Finn · Principal Clinician · Berlin 2026
                </p>
              </div>
            </div>

            {/* Right: headline + teasers */}
            <div className="flex flex-col justify-between px-8 md:px-14 py-16 md:py-16">
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase", fontWeight: 600 }}>
                    Digital Orthodontics Platform
                  </span>
                </div>

                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(44px, 8vw, 80px)", lineHeight: 0.95, color: "var(--white)", letterSpacing: "-0.025em", marginBottom: "36px" }}>
                  Build elite
                  <br />digital
                  <br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>orthodontic</em>
                  <br />systems.
                </h1>

                <div className="flex flex-wrap gap-3">
                  <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }} className="hover:opacity-90 transition-opacity">
                    Join the Platform <ArrowRight size={12} />
                  </Link>
                  <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }} className="hover:border-white/30 hover:text-white/75 transition-colors">
                    Membership
                  </Link>
                </div>
              </div>

              {/* In this issue */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "32px", marginTop: "40px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginBottom: "20px" }}>
                  In this issue
                </p>
                {editorial.map((item, i) => (
                  <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: i < editorial.length - 1 ? "16px" : "0", marginBottom: i < editorial.length - 1 ? "16px" : "0", borderBottom: i < editorial.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "rgba(255,255,255,0.12)", lineHeight: 1, flexShrink: 0, width: "20px" }}>{i + 1}</span>
                    <div>
                      <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: item.accentColour, display: "block", marginBottom: "4px" }}>{item.dept}</span>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE + PORTRAIT ────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">

            {/* Portrait */}
            <div className="md:border-r" style={{ borderColor: "var(--border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.portrait} alt="Finn, Principal Clinician" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", maxHeight: "480px" }} />
              <p className="px-6 py-4 md:hidden" style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>
                Finn, Principal Clinician and founder of Okklusion
              </p>
            </div>

            {/* Pull quote */}
            <div className="px-8 py-12 md:px-16 md:py-20 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>From the founder</span>
              </div>
              <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "32px" }}>
                &ldquo;There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--border-strong)" }} />
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Finn · Editor's Note · Issue 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>The Curriculum</span>
          </div>
          <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              Four pillars.<br /><em style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>One system.</em>
            </h2>
            <Link href="/pricing" className="hover:text-[var(--text-secondary)] transition-colors" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              View membership <ArrowRight size={10} />
            </Link>
          </div>

          {/* Outer 2-col grid on md+, single col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {pillars.map((p, idx) => (
              <div key={p.n} style={{ backgroundColor: p.bg }}>
                {/* Inner: image + text — side by side on sm+, stacked on xs */}
                <div className="grid grid-cols-[120px_1fr] sm:grid-cols-2">
                  {/* Image always left on sm+; on xs it's a narrow strip */}
                  {idx % 2 === 0 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PHOTOS[p.photo]} alt={p.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                      <div className="p-6 sm:p-8 flex flex-col justify-center">
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "12px" }}>{p.n}</span>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px" }}>{p.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "12px" }}>{p.desc}</p>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{p.modules} modules</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-6 sm:p-8 flex flex-col justify-center">
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "12px" }}>{p.n}</span>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "8px" }}>{p.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "12px" }}>{p.desc}</p>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{p.modules} modules</span>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PHOTOS[p.photo]} alt={p.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DECISION ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Decision card */}
            <div className="px-8 py-14 md:px-14 md:py-20 md:border-r" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Interactive Learning</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "16px" }}>
                Learn by deciding,<br />
                <em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>not by watching.</em>
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "32px" }}>
                Real cases, real scans, real decisions. Commit your answer before the rationale is revealed.
              </p>

              <div style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", padding: "24px", borderRadius: "2px", marginBottom: "24px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 600, marginBottom: "12px" }}>Case 04 of 07 · Choose the better trimline</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: "18px" }}>
                  "Aligner 8 of 22. Upper right lateral is not tracking. What do you do?"
                </p>
                <div className="flex flex-col gap-2">
                  {["Reorder from aligner 7", "Place attachment and continue", "Advance to aligner 9 and monitor", "Request mid-course refinement"].map((opt, i) => (
                    <div key={i} style={{ padding: "11px 14px", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", flexShrink: 0 }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/signup" className="hover:opacity-60 transition-opacity" style={{ fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-dark)", borderBottom: "1px solid var(--accent-dark)", paddingBottom: "2px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                See the full curriculum <ArrowRight size={11} />
              </Link>
            </div>

            {/* Clinical photo — hidden on mobile */}
            <div className="hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.decision} alt="Orthodontist reviewing a clinical case" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Masthead row */}
          <div className="flex justify-between items-end flex-wrap gap-4 pb-6 mb-10" style={{ borderBottom: "2px solid var(--text-primary)" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginBottom: "6px" }}>The Okklusion Review</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                This week's reading
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Vol. 1 · Issue 4 · May 2026</p>
              <Link href="/platform/editorial" className="hover:text-[var(--text-primary)] transition-colors" style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                All departments <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Featured story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-px" style={{ backgroundColor: "var(--border)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTOS.editFeature} alt="Editorial feature" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
            <div className="p-8 md:p-12 flex flex-col justify-end" style={{ backgroundColor: "var(--bg)" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--accent)", display: "block", marginBottom: "14px" }}>
                Editor's Note · Issue 4
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "14px" }}>
                Why the best practices are building systems, not just using tools
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "20px" }}>
                There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable.
              </p>
              <div className="flex justify-between items-center">
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Finn · 4 min read</p>
                <span style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                  Read <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </div>

          {/* Two smaller stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {editorial.slice(1).map((item, i) => (
              <div key={item.title} className="grid hover:bg-[var(--surface-raised)] transition-colors cursor-pointer" style={{ backgroundColor: "var(--surface)", gridTemplateColumns: "100px 1fr" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i === 0 ? PHOTOS.editThumb1 : PHOTOS.editThumb2} alt={item.dept} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                <div className="p-5">
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: item.accentColour, display: "block", marginBottom: "6px" }}>
                    {item.dept}
                  </span>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "8px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {item.author} · {item.readTime} read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>Membership</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "48px" }}>
            Choose your level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {tiers.map((tier) => (
              <div key={tier.name} className="flex flex-col" style={{ backgroundColor: tier.highlight ? "var(--accent-dark)" : "var(--bg)", padding: "40px 32px" }}>
                {tier.highlight && <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "14px", display: "block" }}>Most Popular</span>}
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 400, color: tier.highlight ? "var(--white)" : "var(--text-primary)", marginBottom: "8px" }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: tier.highlight ? "var(--white)" : "var(--text-primary)", lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.4)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.55)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "24px" }}>{tier.description}</p>
                <div style={{ borderTop: tier.highlight ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)", paddingTop: "20px", marginBottom: "24px" }}>
                  {tier.features.map((f) => (
                    <div key={f} className="flex gap-3 mb-2">
                      <span style={{ color: "var(--accent)", flexShrink: 0, lineHeight: 1.6 }}>·</span>
                      <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.7)" : "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{f}</span>
                    </div>
                  ))}
                  {tier.addons.map((a) => (
                    <div key={a} className="flex gap-3 mb-2">
                      <span style={{ color: tier.highlight ? "rgba(255,255,255,0.18)" : "var(--border-strong)", flexShrink: 0, lineHeight: 1.6 }}>+</span>
                      <span style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>{a}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <Link href={tier.href} className="hover:opacity-85 transition-opacity" style={{ display: "block", textAlign: "center", padding: "13px 24px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px", backgroundColor: tier.highlight ? "var(--accent)" : "transparent", color: tier.highlight ? "var(--accent-dark)" : "var(--text-primary)", border: tier.highlight ? "none" : "1px solid var(--border-strong)" }}>
                    {tier.cta}
                  </Link>
                  <p style={{ textAlign: "center", fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.22)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "10px" }}>
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-7">
            <Link href="/pricing" className="hover:text-[var(--text-secondary)] transition-colors" style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Full comparison and FAQ <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CPD TRUST STRIP ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--accent-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-8 py-16 md:px-14 md:py-20 flex flex-col justify-center md:border-r" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginBottom: "12px" }}>CPD Accreditation</p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.2, marginBottom: "24px" }}>
                University of York accredited.<br />
                <em style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>30 hours annual CPD.</em>
              </p>
              <Link href="/signup" className="hover:opacity-90 transition-opacity" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", alignSelf: "flex-start" }}>
                Join Okklusion <ArrowRight size={12} />
              </Link>
            </div>
            {/* Practice photo — hidden on mobile */}
            <div className="hidden md:block" style={{ minHeight: "360px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.cpd} alt="Orthodontic practice interior" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.55)" }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
