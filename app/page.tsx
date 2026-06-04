import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PHOTOS: Record<string, string> = {
  cover:      "https://picsum.photos/seed/okk-cover/900/1100",
  portrait:   "https://picsum.photos/seed/okk-finn/700/875",
  featured:   "https://picsum.photos/seed/okk-feature/900/560",
  article1:   "https://picsum.photos/seed/okk-thumb1/600/400",
  article2:   "https://picsum.photos/seed/okk-thumb2/600/400",
  article3:   "https://picsum.photos/seed/okk-lab/600/400",
  article4:   "https://picsum.photos/seed/okk-software/600/400",
  article5:   "https://picsum.photos/seed/okk-community/600/400",
  pillar01:   "https://picsum.photos/seed/okk-clinical/600/600",
  pillar02:   "https://picsum.photos/seed/okk-lab2/600/600",
  pillar03:   "https://picsum.photos/seed/okk-software2/600/600",
  pillar04:   "https://picsum.photos/seed/okk-community2/600/600",
};

const departments = [
  { name: "Editor's Note",    colour: "var(--accent)" },
  { name: "Case of the Week", colour: "var(--text-primary)" },
  { name: "Lab Note",         colour: "#7A8C84" },
  { name: "Software Note",    colour: "#8C8279" },
  { name: "Evidence Note",    colour: "#848C7A" },
  { name: "Practice Note",    colour: "var(--text-secondary)" },
];

const articles = [
  {
    dept: "Case of the Week",
    colour: "var(--text-primary)",
    title: "A Class III with severe crowding: the staging decisions that mattered",
    excerpt: "When anchorage is limited and the patient won't tolerate extractions, every staging decision carries compounding consequences. Here is how we worked through it.",
    author: "Finn",
    readTime: "10 min",
    date: "26 May 2026",
    photo: "article1",
  },
  {
    dept: "Lab Note",
    colour: "#7A8C84",
    title: "Resin selection in high-throughput environments: what the data shows",
    excerpt: "Not all resins perform equally under production pressure. We tested three materials across 400 consecutive prints and the results were not what we expected.",
    author: "Okklusion Editorial",
    readTime: "6 min",
    date: "25 May 2026",
    photo: "article2",
  },
  {
    dept: "Software Note",
    colour: "#8C8279",
    title: "DM 4.2 update: what changed in the monitoring algorithm",
    excerpt: "The new compliance scoring model changes how non-wear is classified. Here is what it means for how you triage your active patients.",
    author: "Okklusion Editorial",
    readTime: "4 min",
    date: "24 May 2026",
    photo: "article3",
  },
  {
    dept: "Evidence Note",
    colour: "#848C7A",
    title: "Root resorption risk in digital aligner therapy: a review of current evidence",
    excerpt: "The literature is more nuanced than the marketing suggests. Here is what the evidence actually says and what it means for informed consent.",
    author: "Okklusion Editorial",
    readTime: "7 min",
    date: "23 May 2026",
    photo: "article4",
  },
  {
    dept: "Practice Note",
    colour: "var(--text-secondary)",
    title: "How to onboard a treatment coordinator onto DM in five days",
    excerpt: "Staff resistance is almost always a training and confidence problem. Here is a structured five-day onboarding that removes both.",
    author: "Okklusion Editorial",
    readTime: "5 min",
    date: "22 May 2026",
    photo: "article5",
  },
];

const pillars = [
  { n: "01", name: "Clinical",         desc: "Case planning, staging decisions, complex presentations and evidence-based finishing.", modules: 12, photo: "pillar01", bg: "var(--bg)" },
  { n: "02", name: "Digital Workflow", desc: "In-house aligner manufacturing, ISO documentation, printing and QC systems.",          modules: 18, photo: "pillar02", bg: "var(--surface)" },
  { n: "03", name: "Software & AI",    desc: "Dental Monitoring integration, treatment planning software, remote patient management.", modules: 9,  photo: "pillar03", bg: "var(--surface)" },
  { n: "04", name: "Community",        desc: "KOL mentorship, practice owner roundtables and peer implementation support.",           modules: 7,  photo: "pillar04", bg: "var(--bg)" },
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
      <section style={{ backgroundColor: "var(--accent-dark)" }}>

        {/* Mobile: image banner */}
        <div className="md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS.cover} alt="Cover" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", objectPosition: "center top", display: "block", filter: "brightness(0.6)" }} />
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "88vh" }}>

            {/* Left col: photo — desktop only */}
            <div className="hidden md:block relative" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.cover} alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.6)" }} />
              <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
                  Finn · Principal Clinician · Berlin 2026
                </p>
              </div>
            </div>

            {/* Right col: headline */}
            <div className="flex flex-col justify-between px-8 md:px-14 py-12 md:py-16">
              <div>
                <div className="flex items-center gap-3 mb-8 md:mb-10">
                  <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase", fontWeight: 600 }}>
                    Digital Orthodontics Platform
                  </span>
                </div>

                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 0.95, color: "var(--white)", letterSpacing: "-0.025em", marginBottom: "32px" }}>
                  Build elite
                  <br />digital
                  <br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>orthodontic</em>
                  <br />systems.
                </h1>

                <div className="flex flex-wrap gap-3">
                  <Link href="/platform/editorial" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }} className="hover:opacity-90 transition-opacity">
                    Read this issue <ArrowRight size={12} />
                  </Link>
                  <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }} className="hover:border-white/30 hover:text-white/75 transition-colors">
                    Join from £49
                  </Link>
                </div>
              </div>

              {/* In this issue */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px", marginTop: "36px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginBottom: "18px" }}>
                  In this issue
                </p>
                {[
                  { dept: "Editor's Note", colour: "var(--accent)", title: "Why the best practices are building systems, not just using tools" },
                  { dept: "Case of the Week", colour: "var(--text-primary)", title: "A Class III with severe crowding: the staging decisions that mattered" },
                  { dept: "Lab Note", colour: "#7A8C84", title: "Resin selection in high-throughput environments: what the data shows" },
                ].map((item, i) => (
                  <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: i < 2 ? "14px" : "0", marginBottom: i < 2 ? "14px" : "0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "rgba(255,255,255,0.12)", lineHeight: 1, flexShrink: 0, width: "20px" }}>{i + 1}</span>
                    <div>
                      <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: item.colour, display: "block", marginBottom: "3px" }}>{item.dept}</span>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS BAR ──────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface)", overflowX: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex items-stretch px-6 md:px-12" style={{ gap: "0" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase", padding: "14px 0", marginRight: "24px", flexShrink: 0, display: "flex", alignItems: "center" }}>
              Departments
            </span>
            {departments.map((d, i) => (
              <Link
                key={d.name}
                href="/platform/editorial"
                style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: d.colour, padding: "14px 20px", flexShrink: 0, borderLeft: "1px solid var(--border)", display: "flex", alignItems: "center", letterSpacing: "0.02em", whiteSpace: "nowrap" as const }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED STORY ───────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTOS.featured} alt="Editor's Note" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            <div className="flex flex-col justify-end px-8 py-10 md:px-14 md:py-16" style={{ backgroundColor: "var(--bg)", borderLeft: "1px solid var(--border)" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--accent)", display: "block", marginBottom: "12px" }}>
                Editor's Note · Issue 4
              </span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "18px" }}>
                Why the best practices are building systems, not just using tools
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.8, marginBottom: "28px" }}>
                There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable. Only one of them runs without the principal in the room. The distinction matters more than most practitioners realise, and most find out too late.
              </p>
              <div className="flex justify-between items-center">
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Finn · 27 May 2026 · 4 min read</p>
                <Link href="/platform/editorial" style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-primary)] transition-colors">
                  Read <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE GRID ─────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Row 1: three equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {articles.slice(0, 3).map((a) => (
              <article key={a.title} style={{ backgroundColor: "var(--bg)", cursor: "pointer" }} className="hover:bg-[var(--surface)] transition-colors group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTOS[a.photo]} alt={a.dept} style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }} />
                <div className="p-7">
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: a.colour, display: "block", marginBottom: "10px" }}>
                    {a.dept}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "10px" }} className="group-hover:opacity-80 transition-opacity">
                    {a.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "16px" }}>
                    {a.excerpt}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {a.author} · {a.readTime} read
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Row 2: two wider cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {articles.slice(3).map((a) => (
              <article key={a.title} style={{ backgroundColor: "var(--surface)", cursor: "pointer", display: "grid", gridTemplateColumns: "200px 1fr" }} className="hover:bg-[var(--surface-raised)] transition-colors group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTOS[a.photo]} alt={a.dept} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="p-7">
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600, color: a.colour, display: "block", marginBottom: "10px" }}>
                    {a.dept}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "10px" }} className="group-hover:opacity-80 transition-opacity">
                    {a.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "14px" }}>
                    {a.excerpt}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {a.author} · {a.readTime} read
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Browse all */}
          <div style={{ padding: "20px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
            <Link href="/platform/editorial" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All departments <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
            <div className="md:border-r" style={{ borderColor: "var(--border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS.portrait} alt="Finn" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", maxHeight: "480px" }} />
            </div>
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
      <section className="px-6 md:px-12 py-14 md:py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>The Platform</span>
          </div>
          <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              Four pillars.<br /><em style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>One system.</em>
            </h2>
            <Link href="/pricing" className="hover:text-[var(--text-secondary)] transition-colors" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              View membership <ArrowRight size={10} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {pillars.map((p, idx) => (
              <div key={p.n} style={{ backgroundColor: p.bg }}>
                <div className="grid grid-cols-[100px_1fr] sm:grid-cols-2">
                  {idx % 2 === 0 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PHOTOS[p.photo]} alt={p.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                      <div className="p-6 sm:p-8 flex flex-col justify-center">
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "10px" }}>{p.n}</span>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "6px" }}>{p.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "10px" }}>{p.desc}</p>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{p.modules} modules</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-6 sm:p-8 flex flex-col justify-center">
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "10px" }}>{p.n}</span>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "6px" }}>{p.name}</h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "10px" }}>{p.desc}</p>
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

      {/* ── MEMBERSHIP QUIET STRIP ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--accent-dark)", padding: "48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginBottom: "8px" }}>
              Membership · CPD accredited · University of York
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.3 }}>
              Basic £49 · Premium £99 · Super Premium £199 <span style={{ color: "rgba(255,255,255,0.3)" }}>per month</span>
            </p>
          </div>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "12px 24px", fontSize: "11px", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }} className="hover:border-white/50 hover:text-white transition-colors">
            See plans <ArrowRight size={11} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
