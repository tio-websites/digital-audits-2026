import Link from "next/link";
import { BookOpen, Clock, Award, Lock, Zap, FileText, ArrowRight, Play } from "lucide-react";

const paths = [
  {
    name: "Zero to Manufacturing",
    description: "From outsourced aligners to fully autonomous in-house production.",
    duration: "28h",
    modules: 5,
    progress: 32,
    active: true,
  },
  {
    name: "DM Native Practice",
    description: "Build a practice where Dental Monitoring is the default, not an add-on.",
    duration: "18h",
    modules: 4,
    progress: 0,
    active: false,
  },
  {
    name: "Clinical Excellence",
    description: "Advanced case planning, complex presentations, and evidence-based finishing.",
    duration: "22h",
    modules: 5,
    progress: 0,
    active: false,
  },
];

type CourseType = "Interactive Decision" | "Clinical Module" | "Video Lecture" | "Evidence Review" | "Question Bank";

const typeConfig: Record<CourseType, { icon: React.ReactNode; colour: string; bg: string; label: string }> = {
  "Interactive Decision": { icon: <Zap size={12} />, colour: "var(--accent)", bg: "rgba(200,169,106,0.08)", label: "Interactive" },
  "Clinical Module":      { icon: <BookOpen size={12} />, colour: "var(--text-secondary)", bg: "transparent", label: "Module" },
  "Video Lecture":        { icon: <Play size={12} />, colour: "#7A8C84", bg: "transparent", label: "Video" },
  "Evidence Review":      { icon: <FileText size={12} />, colour: "#848C7A", bg: "transparent", label: "Evidence" },
  "Question Bank":        { icon: <Award size={12} />, colour: "#8C8279", bg: "transparent", label: "Questions" },
};

const courses = [
  {
    title: "From Zero to Manufacturing Aligners",
    description: "A complete 12-week progression covering every stage of in-house aligner production.",
    type: "Clinical Module" as CourseType,
    pillar: "Digital Workflow",
    duration: "12h 30m",
    modules: 24,
    questions: 80,
    level: "Foundational",
    objectives: ["Set up a compliant ISO workflow", "Configure and operate an FDM printer", "Establish QC checkpoints at each production stage"],
    progress: 65,
    locked: false,
  },
  {
    title: "Choose the better trimline",
    description: "Seven scenarios. Seven clinical decisions. Identify the trimline that will perform better — and understand why.",
    type: "Interactive Decision" as CourseType,
    pillar: "Clinical",
    duration: "45 min",
    modules: 7,
    questions: 0,
    level: "Intermediate",
    objectives: ["Understand trimline biomechanical implications", "Develop clinical decision confidence"],
    progress: 0,
    locked: false,
  },
  {
    title: "ISO Process Modules: Full Series",
    description: "Quality control, documentation, and process standardisation for aligner manufacturing.",
    type: "Clinical Module" as CourseType,
    pillar: "Digital Workflow",
    duration: "8h 15m",
    modules: 16,
    questions: 60,
    level: "Intermediate",
    objectives: ["Document processes to ISO 13485 standard", "Identify and manage non-conformances", "Build audit-ready QC records"],
    progress: 30,
    locked: false,
  },
  {
    title: "Identify why the aligner is not tracking",
    description: "Real cases, real scans, real non-tracking. Diagnose the cause before reading the answer.",
    type: "Interactive Decision" as CourseType,
    pillar: "Clinical",
    duration: "1h 10m",
    modules: 9,
    questions: 0,
    level: "Intermediate",
    objectives: ["Diagnose non-tracking causes clinically", "Choose the appropriate clinical response"],
    progress: 0,
    locked: false,
  },
  {
    title: "Dental Monitoring: Remote Protocol Mastery",
    description: "Deep-dive DM integration from initial setup through to fully automated monitoring workflows.",
    type: "Clinical Module" as CourseType,
    pillar: "Software and AI",
    duration: "6h 45m",
    modules: 14,
    questions: 45,
    level: "Intermediate",
    objectives: ["Configure DM monitoring protocols", "Manage a 300+ active patient dashboard", "Triage alerts with clinical accuracy"],
    progress: 0,
    locked: false,
  },
  {
    title: "Fixed versus aligner versus hybrid: choose the approach",
    description: "Nine case presentations. No right answer given until you commit. Build clinical reasoning, not recipe following.",
    type: "Interactive Decision" as CourseType,
    pillar: "Clinical",
    duration: "1h 30m",
    modules: 9,
    questions: 0,
    level: "Advanced",
    objectives: ["Apply treatment modality decision frameworks", "Justify clinical choices with evidence"],
    progress: 0,
    locked: false,
  },
  {
    title: "Aligner Printing: Protocols and Machine Optimisation",
    description: "Printer calibration, material selection, QC checkpoints, and output validation.",
    type: "Clinical Module" as CourseType,
    pillar: "Digital Workflow",
    duration: "4h 50m",
    modules: 10,
    questions: 35,
    level: "Intermediate",
    objectives: ["Calibrate printers for aligner production", "Select appropriate materials by case type"],
    progress: 0,
    locked: false,
  },
  {
    title: "KOL Mentorship Series: Season One",
    description: "Eight sessions with leading clinicians exploring real practice implementation stories.",
    type: "Video Lecture" as CourseType,
    pillar: "Community",
    duration: "7h 00m",
    modules: 8,
    questions: 0,
    level: "All levels",
    objectives: ["Learn from implementation successes and failures", "Build a personal network of peer mentors"],
    progress: 0,
    locked: true,
  },
  {
    title: "Evidence Review: Root Resorption in Aligner Therapy",
    description: "Current literature reviewed and translated into practical clinical guidance and consent language.",
    type: "Evidence Review" as CourseType,
    pillar: "Clinical",
    duration: "1h 20m",
    modules: 4,
    questions: 20,
    level: "All levels",
    objectives: ["Understand current evidence on EARR risk", "Apply evidence to consent and treatment planning"],
    progress: 0,
    locked: true,
  },
];

const available = courses.filter(c => !c.locked);
const locked    = courses.filter(c => c.locked);
const totalCpdHours = available.filter(c => c.type !== "Question Bank").reduce((acc, c) => {
  const [h, m] = c.duration.replace("h ", ":").replace("h", ":0").replace(" min", "").split(":");
  return acc + parseInt(h) + (parseInt(m || "0") / 60);
}, 0);

// Ring helper
function Ring({ pct, size = 52 }: { pct: number; size?: number }) {
  const r = (size / 2) - 4;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative" as const, width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth="3" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--accent-dark)" strokeWidth="3"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} />
      </svg>
      <span style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", fontWeight: 500 }}>{pct}%</span>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", padding: "40px 48px 36px", borderBottom: "1px solid rgba(250,250,248,0.06)" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", marginBottom: "8px" }}>Platform</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: "24px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "var(--bg)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "12px" }}>
              Training
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(250,250,248,0.45)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "440px" }}>
              Clinical modules, interactive decisions, evidence reviews and video series. CPD-aligned throughout.
            </p>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: "32px", flexShrink: 0 }}>
            {[
              { value: `${available.length}`, label: "Courses available" },
              { value: `${Math.round(totalCpdHours)}h`, label: "CPD available" },
              { value: "32%", label: "Your progress" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "right" as const }}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--bg)", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "10px", color: "rgba(250,250,248,0.35)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 48px 64px" }}>

        {/* ── LEARNING PATHS ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" as const }}>Learning Paths</p>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {paths.map((path) => (
              <div
                key={path.name}
                style={{
                  backgroundColor: path.active ? "var(--accent-dark)" : "var(--surface)",
                  padding: "28px 32px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column" as const,
                  justifyContent: "space-between",
                  minHeight: "160px",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                <div>
                  {path.active && (
                    <span style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                      Active path
                    </span>
                  )}
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: path.active ? "var(--bg)" : "var(--text-primary)", marginBottom: "8px", lineHeight: 1.2 }}>
                    {path.name}
                  </p>
                  <p style={{ fontSize: "12px", color: path.active ? "rgba(250,250,248,0.45)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>
                    {path.description}
                  </p>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ fontSize: "11px", color: path.active ? "rgba(250,250,248,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{path.modules} modules</span>
                      <span style={{ fontSize: "11px", color: path.active ? "rgba(250,250,248,0.3)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{path.duration}</span>
                    </div>
                    {path.progress > 0 && (
                      <span style={{ fontSize: "11px", color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{path.progress}%</span>
                    )}
                  </div>
                  <div style={{ height: "2px", backgroundColor: path.active ? "rgba(250,250,248,0.1)" : "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${path.progress}%`, backgroundColor: path.active ? "var(--accent)" : "var(--accent-dark)", borderRadius: "1px", transition: "width 0.3s ease" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AVAILABLE COURSES ───────────────────────────────────────────── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" as const }}>All Courses</p>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {available.map((course) => {
              const t = typeConfig[course.type];
              const isInteractive = course.type === "Interactive Decision";
              const courseSlug =
                course.title === "From Zero to Manufacturing Aligners" ? "from-zero-to-manufacturing" :
                course.title === "Choose the better trimline" ? "choose-the-better-trimline" :
                course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <Link
                  key={course.title}
                  href={`/platform/courses/${courseSlug}`}
                  style={{
                    backgroundColor: isInteractive ? t.bg : "var(--bg)",
                    padding: "0",
                    display: "flex",
                    flexDirection: "column" as const,
                    position: "relative" as const,
                    textDecoration: "none",
                  }}
                  className="group hover:opacity-95 transition-opacity cursor-pointer"
                >
                  {/* Coloured top border */}
                  <div style={{ height: "3px", backgroundColor: t.colour, opacity: isInteractive ? 1 : 0.4 }} />

                  <div style={{ padding: "28px 32px", flex: 1, display: "flex", flexDirection: "column" as const }}>
                    {/* Type badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: t.colour }}>
                        {t.icon}{t.label}
                      </span>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
                        {course.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "10px", letterSpacing: "-0.005em" }}>
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65, marginBottom: "20px", flex: 1 }}>
                      {course.description}
                    </p>

                    {/* Objectives */}
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column" as const, gap: "5px" }}>
                      {course.objectives.map((obj, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.45 }}>
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: t.colour, flexShrink: 0, marginTop: "6px", opacity: 0.7 }} />
                          {obj}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" as const }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                          <Clock size={11} />{course.duration}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                          <BookOpen size={11} />{course.modules} modules
                        </span>
                        {course.questions > 0 && (
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                            <Award size={11} />{course.questions} Qs
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      {course.progress > 0 ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Ring pct={course.progress} size={44} />
                          <span style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--accent-dark)", backgroundColor: "var(--border)", border: "1px solid var(--border)", padding: "6px 14px", borderRadius: "2px" }}>
                            Continue
                          </span>
                        </div>
                      ) : (
                        <span style={{
                          fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const,
                          fontFamily: "var(--font-sans)", fontWeight: 600,
                          color: isInteractive ? "var(--accent-dark)" : "var(--bg)",
                          backgroundColor: isInteractive ? "var(--accent)" : "var(--accent-dark)",
                          padding: "7px 18px", borderRadius: "2px",
                        }}>
                          {isInteractive ? "Begin" : "Start"}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── LOCKED / UPGRADE ────────────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <Lock size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" as const }}>Included in Super Premium</p>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
            <Link href="/pricing" style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none", whiteSpace: "nowrap" as const }} className="hover:opacity-70 transition-opacity">
              Upgrade <ArrowRight size={9} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {locked.map((course) => {
              const t = typeConfig[course.type];
              return (
                <div key={course.title} style={{ backgroundColor: "var(--surface)", padding: "0", opacity: 0.65 }}>
                  <div style={{ height: "3px", backgroundColor: t.colour, opacity: 0.25 }} />
                  <div style={{ padding: "24px 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: t.colour }}>
                        {t.icon}{t.label}
                      </span>
                      <Lock size={11} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "8px" }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "16px" }}>
                      {course.description}
                    </p>
                    <div style={{ display: "flex", gap: "14px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        <Clock size={11} />{course.duration}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        <BookOpen size={11} />{course.modules} modules
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
