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

// ─── Photo seeds → consistent picsum images ───────────────────────────────────
// picsum.photos/seed/[seed]/[w]/[h] always returns the same image for a given seed.
const PHOTOS: Record<string, string> = {
  cover:        "https://picsum.photos/seed/okk-cover/900/1100",
  portrait:     "https://picsum.photos/seed/okk-finn/700/875",
  pillar01:     "https://picsum.photos/seed/okk-clinical/600/600",
  pillar02:     "https://picsum.photos/seed/okk-lab/600/600",
  pillar03:     "https://picsum.photos/seed/okk-software/600/600",
  pillar04:     "https://picsum.photos/seed/okk-community/600/600",
  decision:     "https://picsum.photos/seed/okk-decision/700/900",
  editFeature:  "https://picsum.photos/seed/okk-feature/900/560",
  editThumb1:   "https://picsum.photos/seed/okk-thumb1/240/240",
  editThumb2:   "https://picsum.photos/seed/okk-thumb2/240/240",
  cpd:          "https://picsum.photos/seed/okk-practice/900/400",
};

// ─── Reusable image placeholder ──────────────────────────────────────────────
function Img({
  src,
  alt,
  aspectRatio,
  height,
  caption,
  dark = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  height?: string | number;
  caption?: string;
  dark?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, height: height === "100%" ? "100%" : undefined }}>
      <div style={{ aspectRatio, height, overflow: "hidden", position: "relative" as const, flexGrow: height === "100%" ? 1 : undefined }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: dark ? "brightness(0.55)" : "none" }}
        />
      </div>
      {caption && (
        <p style={{ fontSize: "10px", color: dark ? "rgba(255,255,255,0.25)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "8px", lineHeight: 1.5, fontStyle: "italic" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
            The Okklusion Review · Digital Orthodontics
          </span>
          <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-sans)" }}>
            Vol. 1 · Issue 4 · 27 May 2026
          </span>
        </div>
      </div>

      {/* ── HERO COVER ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--accent-dark)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

          {/* Cover grid: large photo left, headline + stories right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", minHeight: "88vh" }}>

            {/* Left: cover photo */}
            <div style={{ position: "relative" as const, borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              <Img src={PHOTOS.cover} alt="Cover — clinician portrait" height="100%" dark />
              {/* Cover caption */}
              <div style={{ position: "absolute" as const, bottom: "32px", left: "32px", right: "32px" }}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
                  Finn · Principal Clinician · Berlin 2026
                </p>
              </div>
            </div>

            {/* Right: headline + teasers */}
            <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
                  <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, fontWeight: 600 }}>
                    Digital Orthodontics Platform
                  </span>
                </div>

                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.95, color: "var(--white)", letterSpacing: "-0.025em", marginBottom: "36px" }}>
                  Build elite
                  <br />
                  digital
                  <br />
                  <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>orthodontic</em>
                  <br />
                  systems.
                </h1>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
                  <Link
                    href="/signup"
                    style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, borderRadius: "2px" }}
                    className="hover:opacity-90 transition-opacity"
                  >
                    Join the Platform <ArrowRight size={12} />
                  </Link>
                  <Link
                    href="/pricing"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" as const, borderRadius: "2px" }}
                    className="hover:border-white/30 hover:text-white/75 transition-colors"
                  >
                    Membership
                  </Link>
                </div>
              </div>

              {/* This issue */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "32px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "20px" }}>
                  In this issue
                </p>
                {editorial.map((item, i) => (
                  <div
                    key={item.title}
                    style={{ display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: i < editorial.length - 1 ? "16px" : "0", marginBottom: i < editorial.length - 1 ? "16px" : "0", borderBottom: i < editorial.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "rgba(255,255,255,0.12)", lineHeight: 1, flexShrink: 0, width: "20px" }}>{i + 1}</span>
                    <div>
                      <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: item.accentColour, display: "block", marginBottom: "4px" }}>
                        {item.dept}
                      </span>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                        {item.title}
                      </p>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0" }}>

            {/* Portrait */}
            <div style={{ borderRight: "1px solid var(--border)" }}>
              <Img src={PHOTOS.portrait} alt="Finn, Principal Clinician" aspectRatio="4/5" caption="Finn, Principal Clinician and founder of Okklusion" />
            </div>

            {/* Pull quote */}
            <div style={{ padding: "72px 64px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>
                  From the founder
                </span>
              </div>
              <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: "32px" }}>
                &ldquo;There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable.&rdquo;
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "32px", height: "1px", backgroundColor: "var(--border-strong)" }} />
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Finn · Editor's Note · Issue 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>The Curriculum</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap" as const, gap: "16px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
              Four pillars.<br /><em style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>One system.</em>
            </h2>
            <Link href="/pricing" style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "inline-flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              View membership <ArrowRight size={10} />
            </Link>
          </div>

          {/* 2-col grid: images + text */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--border)" }}>

            {/* Pillar 01: Clinical — image left */}
            <div style={{ backgroundColor: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              <Img src={PHOTOS.pillar01} alt="Clinical environment" aspectRatio="1/1" />
              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "16px" }}>01</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px" }}>Clinical</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "16px" }}>Case planning, staging decisions, complex presentations and evidence-based finishing.</p>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>12 modules</span>
              </div>
            </div>

            {/* Pillar 02: Digital Workflow — image right */}
            <div style={{ backgroundColor: "var(--surface)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "16px" }}>02</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px" }}>Digital Workflow</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "16px" }}>In-house aligner manufacturing, ISO documentation, printing and QC systems.</p>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>18 modules</span>
              </div>
              <Img src={PHOTOS.pillar02} alt="Lab and manufacturing environment" aspectRatio="1/1" />
            </div>

            {/* Pillar 03: Software & AI — image left */}
            <div style={{ backgroundColor: "var(--surface)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              <Img src={PHOTOS.pillar03} alt="Software and AI environment" aspectRatio="1/1" />
              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "16px" }}>03</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px" }}>Software & AI</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "16px" }}>Dental Monitoring integration, treatment planning software, remote patient management.</p>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>9 modules</span>
              </div>
            </div>

            {/* Pillar 04: Community — image right */}
            <div style={{ backgroundColor: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1, display: "block", marginBottom: "16px" }}>04</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px" }}>Community</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "16px" }}>KOL mentorship, practice owner roundtables and peer implementation support.</p>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>7 modules</span>
              </div>
              <Img src={PHOTOS.pillar04} alt="Community and mentorship" aspectRatio="1/1" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DECISION FEATURE ─────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--surface)", padding: "0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>

            {/* Decision card */}
            <div style={{ padding: "72px 56px", borderRight: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Interactive Learning</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "16px" }}>
                Learn by deciding,
                <br /><em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>not by watching.</em>
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "36px", maxWidth: "400px" }}>
                Real cases, real scans, real decisions. Commit your answer before the rationale is revealed. Built to develop clinical judgement, not test recall.
              </p>

              {/* Sample question */}
              <div style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", padding: "28px", borderRadius: "2px", marginBottom: "24px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 600, marginBottom: "14px" }}>Case 04 of 07 · Choose the better trimline</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: "20px" }}>
                  "Aligner 8 of 22. Upper right lateral is not tracking. What do you do?"
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
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

              <Link href="/signup" style={{ fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--accent-dark)", borderBottom: "1px solid var(--accent-dark)", paddingBottom: "2px", display: "inline-flex", alignItems: "center", gap: "6px" }} className="hover:opacity-60 transition-opacity">
                See the full curriculum <ArrowRight size={11} />
              </Link>
            </div>

            {/* Full-height clinical image */}
            <Img src={PHOTOS.decision} alt="Orthodontist reviewing a clinical case" height="100%" caption="Clinical environment — in-practice photography" />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Masthead row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "24px", marginBottom: "40px", borderBottom: "2px solid var(--text-primary)", flexWrap: "wrap" as const, gap: "16px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "6px" }}>The Okklusion Review</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                This week's reading
              </h2>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Vol. 1 · Issue 4 · May 2026</p>
              <Link href="/platform/editorial" style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" as const, display: "inline-flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-primary)] transition-colors">
                All departments <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Featured story — large with photo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--border)", marginBottom: "1px" }}>
            <Img src={PHOTOS.editFeature} alt="Editorial feature photograph" aspectRatio="16/10" caption="Photography: Finn at his practice, Berlin" />
            <div style={{ backgroundColor: "var(--bg)", padding: "48px 44px", display: "flex", flexDirection: "column" as const, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--accent)", display: "block", marginBottom: "16px" }}>
                Editor's Note · Issue 4
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "16px" }}>
                Why the best practices are building systems, not just using tools
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "24px" }}>
                There is a difference between a practice that uses digital tools and a practice that has built a digital system. Only one of them is scalable. Only one of them runs without the principal in the room.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Finn · 4 min read</p>
                <span style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                  Read <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </div>

          {/* Two smaller stories */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--border)" }}>
            {editorial.slice(1).map((item, i) => (
              <div
                key={item.title}
                style={{ backgroundColor: "var(--surface)", padding: "0", display: "grid", gridTemplateColumns: "120px 1fr", gap: "0", cursor: "pointer" }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                <Img src={i === 0 ? PHOTOS.editThumb1 : PHOTOS.editThumb2} alt={item.dept} aspectRatio="1/1" />
                <div style={{ padding: "24px 24px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: item.accentColour, display: "block", marginBottom: "8px" }}>
                    {item.dept}
                  </span>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "10px" }}>
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
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Membership</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "56px" }}>
            Choose your level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {[
              { name: "Basic", price: "£49", period: "/month", description: "Core access for practitioners beginning their digital journey.", features: ["Core training module library", "Industry editorial and newsflow", "Community feed (read access)", "Monthly CPD content"], addons: ["Treatment planning (add-on)", "1-to-1 mentoring (add-on)"], cta: "Get Started", href: "/signup?tier=basic", highlight: false },
              { name: "Premium", price: "£99", period: "/month", description: "Full learning suite for practices building systematic digital workflows.", features: ["Everything in Basic", "All four content pillars", "Show and Tell video library", "Factory visit recordings", "CPD certification", "Select event access"], addons: ["1-to-1 mentoring (add-on)"], cta: "Join Premium", href: "/signup?tier=premium", highlight: true },
              { name: "Super Premium", price: "£199", period: "/month", description: "Total access for elite practitioners and DSO groups.", features: ["Everything in Premium", "Unlimited 1-to-1 mentoring", "Treatment planning included", "Full event access", "KOL network access", "Team and DSO licences"], addons: [], cta: "Join Super Premium", href: "/signup?tier=super-premium", highlight: false },
            ].map((tier) => (
              <div key={tier.name} style={{ backgroundColor: tier.highlight ? "var(--accent-dark)" : "var(--bg)", padding: "48px 36px", display: "flex", flexDirection: "column" as const }}>
                {tier.highlight && <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "16px", display: "block" }}>Most Popular</span>}
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: tier.highlight ? "var(--white)" : "var(--text-primary)", marginBottom: "8px" }}>{tier.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, color: tier.highlight ? "var(--white)" : "var(--text-primary)", lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.4)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.55)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "28px" }}>{tier.description}</p>
                <div style={{ borderTop: tier.highlight ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)", paddingTop: "24px", marginBottom: "28px" }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0, lineHeight: 1.6 }}>·</span>
                      <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.7)" : "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{f}</span>
                    </div>
                  ))}
                  {tier.addons.map((a) => (
                    <div key={a} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ color: tier.highlight ? "rgba(255,255,255,0.18)" : "var(--border-strong)", flexShrink: 0, lineHeight: 1.6 }}>+</span>
                      <span style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>{a}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <Link href={tier.href} style={{ display: "block", textAlign: "center" as const, padding: "13px 24px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px", backgroundColor: tier.highlight ? "var(--accent)" : "transparent", color: tier.highlight ? "var(--accent-dark)" : "var(--text-primary)", border: tier.highlight ? "none" : "1px solid var(--border-strong)" }} className="hover:opacity-85 transition-opacity">
                    {tier.cta}
                  </Link>
                  <p style={{ textAlign: "center" as const, fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.22)" : "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "10px" }}>
                    Billed via GoCardless · Cancel anytime
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" as const, marginTop: "28px" }}>
            <Link href="/pricing" style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" as const, display: "inline-flex", alignItems: "center", gap: "6px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              Full comparison and FAQ <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CPD TRUST STRIP + PRACTICE PHOTO ─────────────────────────────── */}
      <section style={{ backgroundColor: "var(--accent-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column" as const, justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, marginBottom: "12px" }}>CPD Accreditation</p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300, color: "var(--white)", lineHeight: 1.2, marginBottom: "24px" }}>
                University of York accredited.<br />
                <em style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>30 hours annual CPD.</em>
              </p>
              <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "var(--accent)", color: "var(--accent-dark)", padding: "13px 28px", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, borderRadius: "2px", alignSelf: "flex-start" }} className="hover:opacity-90 transition-opacity">
                Join Okklusion <ArrowRight size={12} />
              </Link>
            </div>
            <Img src={PHOTOS.cpd} alt="Modern orthodontic practice interior" height="360px" dark caption="Practice photography — natural or architectural" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
