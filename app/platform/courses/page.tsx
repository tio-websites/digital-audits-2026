import { BookOpen, Clock, Award, Lock, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Clinical",
  "Digital Workflow",
  "Software & AI",
  "Community",
];

const courses = [
  {
    title: "From Zero to Manufacturing Aligners",
    description: "A complete 12-week progression covering every stage of in-house aligner production.",
    pillar: "Digital Workflow",
    duration: "12h 30m",
    modules: 24,
    level: "Foundational",
    progress: 65,
    locked: false,
  },
  {
    title: "ISO Process Modules — Full Series",
    description: "Quality control, documentation, and process standardisation for aligner manufacturing.",
    pillar: "Digital Workflow",
    duration: "8h 15m",
    modules: 16,
    level: "Intermediate",
    progress: 30,
    locked: false,
  },
  {
    title: "Dental Monitoring: Remote Protocol Mastery",
    description: "Deep-dive DM integration from initial setup through to fully automated monitoring workflows.",
    pillar: "Software & AI",
    duration: "6h 45m",
    modules: 14,
    level: "Intermediate",
    progress: 0,
    locked: false,
  },
  {
    title: "Case Planning for Complex Presentations",
    description: "Advanced treatment sequencing, staging strategies, and clinical decision frameworks.",
    pillar: "Clinical",
    duration: "10h 20m",
    modules: 20,
    level: "Advanced",
    progress: 100,
    locked: false,
  },
  {
    title: "Aligner Printing — Protocols & Optimisation",
    description: "Printer calibration, material selection, QC checkpoints, and output validation.",
    pillar: "Digital Workflow",
    duration: "4h 50m",
    modules: 10,
    level: "Intermediate",
    progress: 0,
    locked: false,
  },
  {
    title: "Building a Digital-Native Practice",
    description: "Staff onboarding, team training pathways, and operational systems for DM-native practices.",
    pillar: "Community",
    duration: "5h 30m",
    modules: 11,
    level: "Foundational",
    progress: 0,
    locked: true,
  },
  {
    title: "AI in Orthodontic Diagnostics",
    description: "Integrating AI-assisted tools into your diagnostic and triage workflow.",
    pillar: "Software & AI",
    duration: "3h 15m",
    modules: 8,
    level: "Advanced",
    progress: 0,
    locked: true,
  },
  {
    title: "KOL Mentorship Series — Season One",
    description: "Eight sessions with leading clinicians exploring real practice implementation stories.",
    pillar: "Community",
    duration: "7h 00m",
    modules: 8,
    level: "All levels",
    progress: 0,
    locked: true,
  },
];

const levelColour: Record<string, string> = {
  Foundational: "var(--accent)",
  Intermediate: "var(--text-secondary)",
  Advanced: "var(--text-primary)",
  "All levels": "var(--text-muted)",
};

export default function CoursesPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Platform</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "16px" }}>
          Training Courses
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "560px" }}>
          Structured learning paths across the four pillars. Each course is CPD-aligned and built for implementation, not just theory.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "36px", flexWrap: "wrap" as const }}>
        {categories.map((cat, i) => (
          <button
            key={cat}
            style={{
              padding: "7px 16px",
              fontSize: "12px",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.04em",
              borderRadius: "100px",
              border: "1px solid",
              borderColor: i === 0 ? "var(--accent-dark)" : "var(--border)",
              backgroundColor: i === 0 ? "var(--accent-dark)" : "transparent",
              color: i === 0 ? "var(--white)" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
        {courses.map((course) => (
          <div
            key={course.title}
            style={{
              backgroundColor: course.locked ? "var(--surface)" : "var(--bg)",
              padding: "32px 28px",
              position: "relative" as const,
              display: "flex",
              flexDirection: "column" as const,
              opacity: course.locked ? 0.75 : 1,
            }}
            className="group hover:bg-[var(--surface)] transition-colors cursor-pointer"
          >
            {course.locked && (
              <div style={{ position: "absolute" as const, top: "20px", right: "20px", color: "var(--text-muted)" }}>
                <Lock size={14} />
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600 }}>{course.pillar}</span>
              <span style={{ fontSize: "11px", color: levelColour[course.level], fontFamily: "var(--font-sans)", marginRight: course.locked ? "20px" : "0" }}>{course.level}</span>
            </div>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "10px" }}>{course.title}</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>{course.description}</p>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                <Clock size={12} />{course.duration}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                <BookOpen size={12} />{course.modules} modules
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                <Award size={12} />CPD
              </span>
            </div>

            {!course.locked && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <div style={{ flex: 1, height: "2px", backgroundColor: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${course.progress}%`, backgroundColor: course.progress === 100 ? "var(--accent)" : "var(--accent-dark)", borderRadius: "1px" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {course.progress === 100 ? "Complete" : course.progress === 0 ? "Start" : `${course.progress}%`}
                  </span>
                </div>
              </div>
            )}

            {course.locked && (
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>
                Upgrade to unlock
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
