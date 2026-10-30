import Link from "next/link";
import { Search, ArrowRight, Clock, RotateCcw, BookOpen, Zap, MessageSquare, Flame } from "lucide-react";

const learningPath = [
  { step: 1, title: "ISO Process Documentation and QC Systems", type: "Clinical Module", duration: "4h 20m", status: "in-progress", progress: 65 },
  { step: 2, title: "Aligner Printing: Protocols and Machine Optimisation", type: "Interactive Decision", duration: "2h 50m", status: "up-next", progress: 0 },
  { step: 3, title: "DM Protocol: Remote Monitoring Setup", type: "Video Lecture", duration: "1h 30m", status: "locked", progress: 0 },
];

const dueForReview = [
  { title: "Staging strategies for Class II correction", due: "Today", type: "Evidence Review" },
  { title: "Printer calibration checkpoints", due: "Tomorrow", type: "Question Bank" },
];

const thisWeek = [
  { dept: "Editor's Note", title: "Why the best practices are building systems, not just using tools", author: "Finn", readTime: "4 min", featured: true },
  { dept: "Case of the Week", title: "A Class III with severe crowding — the staging decisions that mattered", author: "Finn", readTime: "8 min", featured: false },
  { dept: "Lab Note", title: "Resin selection in high-throughput environments: what the data shows", author: "Okklusion Editorial", readTime: "5 min", featured: false },
  { dept: "Software Note", title: "DM 4.2 update: what changed in the monitoring algorithm", author: "Okklusion Editorial", readTime: "3 min", featured: false },
];

const trendingThreads = [
  { title: "Anyone else seeing attachment bond failures with the new Ormco trays?", replies: 34, dept: "Lab Note", time: "2h ago", hot: true },
  { title: "How are people handling the DM 4.2 compliance score changes with existing patients?", replies: 21, dept: "Software Note", time: "5h ago", hot: true },
  { title: "Best approach for staging a Class II div 2 with deep bite — share your workflows", replies: 18, dept: "Case of the Week", time: "Yesterday", hot: false },
  { title: "Pricing for in-house aligners — what are DSO members charging?", replies: 12, dept: "Practice Note", time: "Yesterday", hot: false },
];

const deptColours: Record<string, string> = {
  "Editor's Note": "var(--accent)",
  "Case of the Week": "var(--text-primary)",
  "Lab Note": "#7A8C84",
  "Software Note": "#8C8279",
  "Practice Note": "var(--text-secondary)",
};

const typeIcons: Record<string, React.ReactNode> = {
  "Clinical Module": <BookOpen size={11} />,
  "Interactive Decision": <Zap size={11} />,
  "Video Lecture": <Clock size={11} />,
  "Evidence Review": <BookOpen size={11} />,
  "Question Bank": <Zap size={11} />,
};

// CPD ring constants
const CPD_TOTAL = 30;
const CPD_DONE = 12;
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const OFFSET = CIRCUMFERENCE * (1 - CPD_DONE / CPD_TOTAL);

export default function DashboardPage() {
  return (
    <div style={{ padding: "0", maxWidth: "1100px" }}>

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", padding: "40px 48px 36px", borderBottom: "1px solid rgba(250,250,248,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap" as const, gap: "16px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", marginBottom: "8px" }}>
              The Okklusion Review · Vol. 1 Issue 4
            </p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              Good morning, Member
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(250,250,248,0.45)", fontFamily: "var(--font-sans)", marginTop: "8px", lineHeight: 1.5 }}>
              Week of 27 May 2026 · 4 new articles · 2 items due for review
            </p>
          </div>
          {/* CPD ring */}
          <Link href="/cpd" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }} className="hover:opacity-80 transition-opacity">
            <div style={{ position: "relative" as const, width: "88px", height: "88px", flexShrink: 0 }}>
              <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="44" cy="44" r={RADIUS} fill="none" stroke="rgba(250,250,248,0.08)" strokeWidth="5" />
                <circle
                  cx="44" cy="44" r={RADIUS}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={OFFSET}
                />
              </svg>
              <div style={{ position: "absolute" as const, inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "var(--bg)", lineHeight: 1 }}>{CPD_DONE}</span>
                <span style={{ fontSize: "9px", color: "rgba(250,250,248,0.4)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>/ {CPD_TOTAL}h</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.35)", marginBottom: "4px" }}>CPD 2026</p>
              <p style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.6)", lineHeight: 1.4 }}>40% of annual<br />target complete</p>
              <p style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-sans)", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                View record <ArrowRight size={9} />
              </p>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(250,250,248,0.06)", border: "1px solid rgba(250,250,248,0.1)", borderRadius: "3px", padding: "13px 18px" }}>
          <Search size={15} style={{ color: "rgba(250,250,248,0.3)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Ask Okklusion anything — cases, protocols, evidence, or a clinical question"
            style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--bg)", backgroundColor: "transparent" }}
            className="placeholder:text-[rgba(250,250,248,0.3)]"
          />
          <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "rgba(250,250,248,0.25)", fontFamily: "var(--font-sans)", backgroundColor: "rgba(250,250,248,0.07)", padding: "3px 8px", borderRadius: "2px", textTransform: "uppercase" as const, flexShrink: 0 }}>AI</span>
        </div>
      </div>

      <div style={{ padding: "0 48px 48px" }}>

        {/* ── THIS WEEK ─────────────────────────────────────────────────────── */}
        <div style={{ marginTop: "40px", marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginBottom: "4px" }}>Issue 4 · 27 May 2026</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}>This week</h2>
            </div>
            <Link href="/platform/editorial" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              Full issue <ArrowRight size={10} />
            </Link>
          </div>

          {/* Featured cover card + 3 side cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {/* Cover story — spans 2 cols */}
            <Link
              href="/platform/editorial"
              style={{ backgroundColor: "var(--accent-dark)", padding: "36px 40px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", textDecoration: "none", minHeight: "240px" }}
              className="md:col-span-2 hover:opacity-95 transition-opacity group"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <div style={{ width: "24px", height: "2px", backgroundColor: "var(--accent)" }} />
                  <span style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--accent)" }}>
                    Editor&rsquo;s Note · Cover Story
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 300, color: "var(--bg)", lineHeight: 1.15, letterSpacing: "-0.01em", maxWidth: "460px" }}>
                  {thisWeek[0].title}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(250,250,248,0.1)", paddingTop: "18px", marginTop: "24px" }}>
                <p style={{ fontSize: "11px", color: "rgba(250,250,248,0.4)", fontFamily: "var(--font-sans)" }}>
                  By {thisWeek[0].author} · {thisWeek[0].readTime} read
                </p>
                <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                  Read <ArrowRight size={10} />
                </span>
              </div>
            </Link>

            {/* 3 smaller dept cards stacked */}
            <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
              {thisWeek.slice(1).map((item) => (
                <Link
                  key={item.title}
                  href="/platform/editorial"
                  style={{ backgroundColor: "var(--bg)", padding: "20px 24px", display: "block", textDecoration: "none", flex: 1 }}
                  className="hover:bg-[var(--surface)] transition-colors group"
                >
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptColours[item.dept] || "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                    {item.dept}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "15px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.35, marginBottom: "8px" }} className="group-hover:opacity-70 transition-opacity">
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.readTime} read</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRENDING + DUE row ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12" style={{ backgroundColor: "var(--border)" }}>

          {/* Trending threads — 2 cols */}
          <div style={{ backgroundColor: "var(--surface)", padding: "28px 32px" }} className="md:col-span-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)" }}>Trending this week</h2>
              <Link href="/platform/community" style={{ fontSize: "10px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
                All threads <ArrowRight size={9} />
              </Link>
            </div>
            <div className="flex flex-col" style={{ gap: "1px", backgroundColor: "var(--border)" }}>
              {trendingThreads.map((thread, i) => (
                <Link
                  key={i}
                  href="/platform/community"
                  style={{ backgroundColor: thread.hot ? "var(--bg)" : "var(--surface)", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}
                  className="hover:bg-[var(--surface-raised)] transition-colors group"
                >
                  {/* Reply count badge */}
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                    backgroundColor: thread.hot ? "rgba(200,169,106,0.12)" : "var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: thread.hot ? "1px solid rgba(200,169,106,0.25)" : "none",
                  }}>
                    {thread.hot
                      ? <Flame size={13} style={{ color: "var(--accent)" }} />
                      : <MessageSquare size={12} style={{ color: "var(--text-muted)" }} />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptColours[thread.dept] || "var(--text-muted)" }}>
                        {thread.dept}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", lineHeight: 1.4 }} className="group-hover:opacity-75 transition-opacity">
                      {thread.title}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
                    <span style={{ fontSize: "12px", fontFamily: "var(--font-serif)", color: thread.hot ? "var(--accent)" : "var(--text-muted)", fontWeight: 400 }}>{thread.replies}</span>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{thread.time}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Due for review — 1 col */}
          <div style={{ backgroundColor: "var(--bg)", padding: "28px 28px", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <RotateCcw size={13} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)" }}>Due for review</h2>
            </div>
            <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
              {dueForReview.map((item) => (
                <div key={item.title} style={{ backgroundColor: "var(--bg)", padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                    <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", lineHeight: 1.35, flex: 1 }}>{item.title}</p>
                    <span style={{
                      fontSize: "9px", fontFamily: "var(--font-sans)", letterSpacing: "0.06em",
                      color: item.due === "Today" ? "var(--accent-dark)" : "var(--text-muted)",
                      backgroundColor: item.due === "Today" ? "rgba(200,169,106,0.15)" : "var(--surface)",
                      padding: "2px 8px", borderRadius: "2px", fontWeight: 600, flexShrink: 0,
                      border: item.due === "Today" ? "1px solid rgba(200,169,106,0.3)" : "none",
                    }}>
                      {item.due}
                    </span>
                  </div>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.type}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.6, fontStyle: "italic" }}>
                Spaced repetition keeps your clinical knowledge sharp. These items are due based on your last review date.
              </p>
            </div>
          </div>
        </div>

        {/* ── LEARNING PATH ────────────────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, marginBottom: "4px" }}>AI Recommended</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}>Your learning path</h2>
            </div>
            <Link href="/platform/courses" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All courses <ArrowRight size={10} />
            </Link>
          </div>

          <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
            {learningPath.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: item.status === "up-next" ? "var(--accent-dark)" : item.status === "locked" ? "var(--surface)" : "var(--bg)",
                  padding: "22px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  opacity: item.status === "locked" ? 0.45 : 1,
                }}
              >
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 300, color: item.status === "up-next" ? "rgba(250,250,248,0.15)" : "var(--border-strong)", lineHeight: 1, flexShrink: 0, width: "28px", textAlign: "right" as const }}>
                  {item.step}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: item.status === "up-next" ? "var(--accent)" : "var(--text-muted)", fontWeight: 500, marginBottom: "6px" }}>
                    {typeIcons[item.type]}{item.type}
                  </span>
                  <p style={{ fontSize: "15px", fontFamily: "var(--font-serif)", fontWeight: 400, color: item.status === "up-next" ? "var(--bg)" : "var(--text-primary)", lineHeight: 1.25 }}>{item.title}</p>
                  {item.status === "in-progress" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                      <div style={{ flex: 1, maxWidth: "160px", height: "3px", backgroundColor: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${item.progress}%`, backgroundColor: "var(--accent-dark)", borderRadius: "2px" }} />
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.progress}% complete</span>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <span style={{ fontSize: "11px", color: item.status === "up-next" ? "rgba(250,250,248,0.35)" : "var(--text-muted)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={11} /> {item.duration}
                  </span>
                  {item.status !== "locked" && (
                    <Link
                      href={
                        item.status === "in-progress"
                          ? "/platform/courses/from-zero-to-manufacturing/what-iso-13485-means"
                          : "/platform/courses/from-zero-to-manufacturing/post-cure-protocols"
                      }
                      style={{
                        fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600,
                        color: item.status === "up-next" ? "var(--accent-dark)" : "var(--text-primary)",
                        backgroundColor: item.status === "up-next" ? "var(--accent)" : "var(--surface)",
                        border: item.status === "up-next" ? "none" : "1px solid var(--border)",
                        padding: "5px 14px", borderRadius: "2px", textDecoration: "none",
                      }}
                    >
                      {item.status === "in-progress" ? "Continue" : "Start"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
