import Link from "next/link";
import { Search, ArrowRight, Clock, RotateCcw, BookOpen, Zap } from "lucide-react";

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
  { dept: "Editor's Note", title: "Why the best practices are building systems, not just using tools", author: "Finn", readTime: "4 min" },
  { dept: "Case of the Week", title: "A Class III with severe crowding — the staging decisions that mattered", author: "Finn", readTime: "8 min" },
  { dept: "Lab Note", title: "Resin selection in high-throughput environments: what the data shows", author: "Okklusion Editorial", readTime: "5 min" },
  { dept: "Software Note", title: "DM 4.2 update: what changed in the monitoring algorithm", author: "Okklusion Editorial", readTime: "3 min" },
];

const deptColours: Record<string, string> = {
  "Editor's Note": "var(--accent)",
  "Case of the Week": "var(--text-primary)",
  "Lab Note": "var(--text-secondary)",
  "Software Note": "var(--text-muted)",
};

const typeIcons: Record<string, React.ReactNode> = {
  "Clinical Module": <BookOpen size={11} />,
  "Interactive Decision": <Zap size={11} />,
  "Video Lecture": <Clock size={11} />,
  "Evidence Review": <BookOpen size={11} />,
  "Question Bank": <Zap size={11} />,
};

export default function DashboardPage() {
  return (
    <div style={{ padding: "0", maxWidth: "1100px" }}>

      {/* AI Search bar */}
      <div style={{ padding: "36px 48px 0", marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            padding: "14px 20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Ask Okklusion anything — search cases, protocols, evidence, or ask a clinical question"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontFamily: "var(--font-sans)",
              color: "var(--text-primary)",
              backgroundColor: "transparent",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontFamily: "var(--font-sans)",
              backgroundColor: "var(--surface)",
              padding: "3px 8px",
              borderRadius: "2px",
              textTransform: "uppercase" as const,
              flexShrink: 0,
            }}
          >
            AI
          </span>
        </div>
      </div>

      <div style={{ padding: "0 48px 48px" }}>

        {/* CPD + Due row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* CPD Progress */}
          <div
            style={{
              backgroundColor: "var(--accent-dark)",
              borderRadius: "3px",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap" as const,
            }}
          >
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", marginBottom: "6px" }}>CPD Progress 2026</p>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--white)", lineHeight: 1 }}>
                12 <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>/ 30 hrs</span>
              </p>
            </div>
            <div style={{ flex: 1, minWidth: "120px" }}>
              <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", marginBottom: "8px" }}>
                <div style={{ height: "100%", width: "40%", backgroundColor: "var(--accent)", borderRadius: "2px" }} />
              </div>
              <Link href="/cpd" style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-white/60 transition-colors">
                View record <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Due for review */}
          <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "3px", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <RotateCcw size={13} style={{ color: "var(--accent)" }} />
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 500 }}>Due for Review</p>
            </div>
            {dueForReview.map((item) => (
              <div key={item.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", marginBottom: "2px", lineHeight: 1.3 }}>{item.title}</p>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.type}</p>
                </div>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-sans)", color: item.due === "Today" ? "var(--accent)" : "var(--text-muted)", fontWeight: 500, flexShrink: 0, letterSpacing: "0.04em" }}>{item.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 500, marginBottom: "4px" }}>AI Recommended</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}>Your learning path</h2>
            </div>
            <Link href="/platform/courses" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All courses <ArrowRight size={10} />
            </Link>
          </div>

          <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
            {learningPath.map((item, i) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: item.status === "up-next" ? "var(--accent-dark)" : item.status === "locked" ? "var(--surface)" : "var(--bg)",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  opacity: item.status === "locked" ? 0.5 : 1,
                }}
              >
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 300, color: item.status === "up-next" ? "rgba(255,255,255,0.2)" : "var(--border-strong)", lineHeight: 1, flexShrink: 0, width: "28px" }}>
                  {item.step}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" as const }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: item.status === "up-next" ? "var(--accent)" : "var(--text-muted)", fontWeight: 500 }}>
                      {typeIcons[item.type]}{item.type}
                    </span>
                  </div>
                  <p style={{ fontSize: "15px", fontFamily: "var(--font-serif)", fontWeight: 400, color: item.status === "up-next" ? "var(--white)" : "var(--text-primary)", lineHeight: 1.25 }}>{item.title}</p>
                  {item.status === "in-progress" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                      <div style={{ width: "100px", height: "2px", backgroundColor: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${item.progress}%`, backgroundColor: "var(--accent-dark)", borderRadius: "1px" }} />
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.progress}% complete</span>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <span style={{ fontSize: "11px", color: item.status === "up-next" ? "rgba(255,255,255,0.4)" : "var(--text-muted)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={11} />{item.duration}
                  </span>
                  {item.status !== "locked" && (
                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: item.status === "up-next" ? "var(--accent)" : "var(--text-muted)", fontWeight: 500 }}>
                      {item.status === "in-progress" ? "Continue" : "Start"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This week editorial */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 400, color: "var(--text-primary)" }}>This week</h2>
            <Link href="/platform/editorial" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All departments <ArrowRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {thisWeek.map((item, i) => (
              <div
                key={item.title}
                style={{ backgroundColor: i === 0 ? "var(--surface)" : "var(--bg)", padding: "24px 28px", cursor: "pointer" }}
                className="hover:bg-[var(--surface-raised)] transition-colors"
              >
                <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: deptColours[item.dept] || "var(--text-muted)", display: "block", marginBottom: "10px" }}>
                  {item.dept}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{item.author} · {item.readTime} read</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
