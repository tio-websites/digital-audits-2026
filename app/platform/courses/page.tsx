import { BookOpen, Clock, Award, Lock, Zap, FileText, ChevronDown } from "lucide-react";

const paths = [
  {
    name: "Zero to Manufacturing",
    description: "From outsourced aligners to fully autonomous in-house production.",
    duration: "28h total",
    modules: 5,
    progress: 32,
  },
  {
    name: "DM Native Practice",
    description: "Build a practice where Dental Monitoring is the default, not an add-on.",
    duration: "18h total",
    modules: 4,
    progress: 0,
  },
  {
    name: "Clinical Excellence",
    description: "Advanced case planning, complex presentations, and evidence-based finishing.",
    duration: "22h total",
    modules: 5,
    progress: 0,
  },
];

const courseTypes = {
  "Interactive Decision": { icon: <Zap size={11} />, colour: "var(--accent)" },
  "Clinical Module": { icon: <BookOpen size={11} />, colour: "var(--text-secondary)" },
  "Video Lecture": { icon: <Clock size={11} />, colour: "var(--text-muted)" },
  "Evidence Review": { icon: <FileText size={11} />, colour: "#7A8C84" },
  "Question Bank": { icon: <Award size={11} />, colour: "#848C7A" },
};

const courses = [
  {
    title: "From Zero to Manufacturing Aligners",
    description: "A complete 12-week progression covering every stage of in-house aligner production.",
    type: "Clinical Module",
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
    title: "ISO Process Modules: Full Series",
    description: "Quality control, documentation, and process standardisation for aligner manufacturing.",
    type: "Clinical Module",
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
    title: "Choose the better trimline",
    description: "Seven scenarios. Seven clinical decisions. Identify the trimline that will perform better and understand why.",
    type: "Interactive Decision",
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
    title: "Identify why the aligner is not tracking",
    description: "Real cases, real scans, real non-tracking. Diagnose the cause before reading the answer.",
    type: "Interactive Decision",
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
    type: "Clinical Module",
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
    type: "Interactive Decision",
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
    type: "Clinical Module",
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
    title: "Evidence Review: Root Resorption in Aligner Therapy",
    description: "Current literature reviewed and translated into practical clinical guidance and consent language.",
    type: "Evidence Review",
    pillar: "Clinical",
    duration: "1h 20m",
    modules: 4,
    questions: 20,
    level: "All levels",
    objectives: ["Understand current evidence on EARR risk", "Apply evidence to consent and treatment planning"],
    progress: 0,
    locked: true,
  },
  {
    title: "KOL Mentorship Series: Season One",
    description: "Eight sessions with leading clinicians exploring real practice implementation stories.",
    type: "Video Lecture",
    pillar: "Community",
    duration: "7h 00m",
    modules: 8,
    questions: 0,
    level: "All levels",
    objectives: ["Learn from implementation successes and failures", "Build a personal network of peer mentors"],
    progress: 0,
    locked: true,
  },
];

export default function CoursesPage() {
  return (
    <div style={{ padding: "40px 48px 64px", maxWidth: "1100px" }}>

      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Platform</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "12px" }}>
          Training
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "520px" }}>
          Clinical modules, interactive decisions, evidence reviews and question banks. CPD-aligned throughout.
        </p>
      </div>

      {/* Learning Paths */}
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 500 }}>Learning Paths</p>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {paths.map((path, i) => (
            <div
              key={path.name}
              style={{ backgroundColor: i === 0 ? "var(--accent-dark)" : "var(--surface)", padding: "24px 28px", cursor: "pointer" }}
              className="hover:opacity-90 transition-opacity"
            >
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: i === 0 ? "var(--white)" : "var(--text-primary)", marginBottom: "8px", lineHeight: 1.2 }}>{path.name}</p>
              <p style={{ fontSize: "12px", color: i === 0 ? "rgba(255,255,255,0.5)" : "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.55, marginBottom: "16px" }}>{path.description}</p>
              <div style={{ display: "flex", gap: "14px", marginBottom: path.progress > 0 ? "12px" : "0" }}>
                <span style={{ fontSize: "11px", color: i === 0 ? "rgba(255,255,255,0.35)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{path.modules} modules</span>
                <span style={{ fontSize: "11px", color: i === 0 ? "rgba(255,255,255,0.35)" : "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{path.duration}</span>
              </div>
              {path.progress > 0 && (
                <div style={{ height: "2px", backgroundColor: i === 0 ? "rgba(255,255,255,0.1)" : "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${path.progress}%`, backgroundColor: i === 0 ? "var(--accent)" : "var(--accent-dark)", borderRadius: "1px" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Course type legend */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" as const }}>
        {Object.entries(courseTypes).map(([type, { icon, colour }]) => (
          <span key={type} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
            <span style={{ color: colour }}>{icon}</span>{type}
          </span>
        ))}
      </div>

      {/* Course list */}
      <div className="flex flex-col gap-px" style={{ backgroundColor: "var(--border)" }}>
        {courses.map((course) => {
          const typeStyle = courseTypes[course.type as keyof typeof courseTypes];
          return (
            <div
              key={course.title}
              style={{
                backgroundColor: course.locked ? "var(--surface)" : "var(--bg)",
                padding: "24px 28px",
                opacity: course.locked ? 0.6 : 1,
                position: "relative" as const,
              }}
              className="group hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              {course.locked && (
                <div style={{ position: "absolute" as const, top: "20px", right: "20px" }}>
                  <Lock size={13} style={{ color: "var(--text-muted)" }} />
                </div>
              )}

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" as const }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: typeStyle?.colour || "var(--text-muted)" }}>
                      {typeStyle?.icon}{course.type}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>·</span>
                    <span style={{ fontSize: "10px", letterSpacing: "0.04em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>{course.pillar}</span>
                    <span style={{ fontSize: "10px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>·</span>
                    <span style={{ fontSize: "10px", fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>{course.level}</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "8px" }}>{course.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "14px", maxWidth: "640px" }}>{course.description}</p>

                  {/* Learning objectives — collapsed */}
                  <details style={{ marginBottom: "14px" }}>
                    <summary style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", listStyle: "none" }}>
                      <ChevronDown size={11} /> Learning objectives
                    </summary>
                    <ul style={{ marginTop: "8px", paddingLeft: "0", listStyle: "none" }}>
                      {course.objectives.map((obj, i) => (
                        <li key={i} style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.55, padding: "4px 0 4px 12px", borderLeft: "1px solid var(--border)" }}>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" as const }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                      <Clock size={11} />{course.duration}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                      <BookOpen size={11} />{course.modules} modules
                    </span>
                    {course.questions > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        <Award size={11} />{course.questions} questions
                      </span>
                    )}
                    {course.type !== "Question Bank" && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        <Award size={11} />CPD
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress / CTA */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "8px", minWidth: "80px" }}>
                  {!course.locked && course.progress > 0 && (
                    <>
                      <div style={{ width: "56px", height: "56px", position: "relative" as const }}>
                        <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent-dark)" strokeWidth="2.5"
                            strokeDasharray={`${course.progress} ${100 - course.progress}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", fontWeight: 500 }}>{course.progress}%</span>
                      </div>
                      <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-secondary)", fontWeight: 500 }}>Continue</span>
                    </>
                  )}
                  {!course.locked && course.progress === 0 && (
                    <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 500, paddingTop: "4px" }}>Start</span>
                  )}
                  {course.locked && (
                    <span style={{ fontSize: "10px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontStyle: "italic", paddingTop: "4px" }}>Upgrade</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
