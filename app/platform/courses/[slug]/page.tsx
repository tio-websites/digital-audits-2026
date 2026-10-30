import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getAllLessons } from "@/lib/courses";
import { BookOpen, Clock, Award, CheckCircle, Circle, Play, Zap, ArrowRight, Lock } from "lucide-react";

const typeIcon: Record<string, React.ReactNode> = {
  text: <BookOpen size={13} />,
  video: <Play size={13} />,
  interactive: <Zap size={13} />,
};

const typeColour: Record<string, string> = {
  text: "var(--text-muted)",
  video: "#7A8C84",
  interactive: "var(--accent)",
};

const COMPLETED_CUTOFF = 5; // lessons treated as completed for mock data

// Ring component
function Ring({ pct, size = 64 }: { pct: number; size?: number }) {
  const r = (size / 2) - 5;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative" as const, width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(250,250,248,0.1)" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--accent)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} />
      </svg>
      <span style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontFamily: "var(--font-sans)", color: "var(--bg)", fontWeight: 500 }}>{pct}%</span>
    </div>
  );
}

export default async function CourseOverviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const allLessons = getAllLessons(course);
  const completedCount = allLessons.filter(l => l.completed).length;
  const nextLesson = allLessons.find(l => !l.completed) ?? allLessons[0];

  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", padding: "40px 48px 36px", borderBottom: "1px solid rgba(250,250,248,0.06)" }}>
        <Link href="/platform/courses" style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.35)", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", marginBottom: "20px" }} className="hover:text-[rgba(250,250,248,0.6)] transition-colors">
          ← All courses
        </Link>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" as const }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" as const }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--accent)" }}>
                {course.type}
              </span>
              <span style={{ fontSize: "9px", color: "rgba(250,250,248,0.25)", fontFamily: "var(--font-sans)" }}>·</span>
              <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.35)" }}>{course.pillar}</span>
              <span style={{ fontSize: "9px", color: "rgba(250,250,248,0.25)", fontFamily: "var(--font-sans)" }}>·</span>
              <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.35)" }}>{course.level}</span>
            </div>

            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 300, color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "16px", maxWidth: "600px" }}>
              {course.title}
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(250,250,248,0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "28px" }}>
              {course.description}
            </p>

            {/* Objectives */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column" as const, gap: "7px" }}>
              {course.objectives.map((obj, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "rgba(250,250,248,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--accent)", flexShrink: 0, marginTop: "6px" }} />
                  {obj}
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" as const }}>
              {[
                { icon: <Clock size={13} />, label: course.duration },
                { icon: <BookOpen size={13} />, label: `${allLessons.length} lessons` },
                { icon: <Award size={13} />, label: `${course.cpdHours} CPD hours` },
              ].map(({ icon, label }) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(250,250,248,0.4)", fontFamily: "var(--font-sans)" }}>
                  {icon}{label}
                </span>
              ))}
            </div>
          </div>

          {/* Progress + CTA */}
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "20px", flexShrink: 0 }}>
            {course.progress > 0 && <Ring pct={course.progress} size={72} />}
            <Link
              href={`/platform/courses/${course.slug}/${nextLesson.id}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "var(--accent)", color: "var(--accent-dark)",
                padding: "12px 24px", borderRadius: "2px",
                fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {course.progress > 0 ? "Continue course" : "Start course"} <ArrowRight size={11} />
            </Link>
            {course.progress > 0 && (
              <p style={{ fontSize: "11px", color: "rgba(250,250,248,0.3)", fontFamily: "var(--font-sans)", textAlign: "center" as const }}>
                {completedCount} of {allLessons.length} lessons complete
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── CURRICULUM ──────────────────────────────────────────────────────── */}
      <div style={{ padding: "40px 48px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 400, color: "var(--text-primary)", marginBottom: "24px" }}>
          Course curriculum
        </h2>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
          {course.modules.map((mod, mi) => {
            const modCompleted = mod.lessons.filter(l => l.completed).length;
            return (
              <div key={mod.id}>
                {/* Module header */}
                <div style={{ backgroundColor: "var(--surface)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 300, color: "var(--border-strong)", lineHeight: 1 }}>
                      {String(mi + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.02em" }}>{mod.title}</h3>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    {modCompleted}/{mod.lessons.length} complete
                  </span>
                </div>

                {/* Lessons */}
                {mod.lessons.map((lesson, li) => {
                  const colour = typeColour[lesson.type];
                  return (
                    <Link
                      key={lesson.id}
                      href={`/platform/courses/${course.slug}/${lesson.id}`}
                      style={{
                        display: "flex", alignItems: "center", gap: "16px",
                        padding: "15px 24px 15px 52px",
                        backgroundColor: lesson.completed ? "var(--bg)" : "var(--bg)",
                        borderBottom: "1px solid var(--border)",
                        textDecoration: "none",
                      }}
                      className="hover:bg-[var(--surface)] transition-colors group"
                    >
                      {/* Complete/incomplete indicator */}
                      <span style={{ color: lesson.completed ? "var(--accent)" : "var(--border-strong)", flexShrink: 0 }}>
                        {lesson.completed ? <CheckCircle size={15} /> : <Circle size={15} />}
                      </span>

                      {/* Type icon */}
                      <span style={{ color: colour, flexShrink: 0 }}>{typeIcon[lesson.type]}</span>

                      {/* Title */}
                      <span style={{ flex: 1, fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text-primary)", lineHeight: 1.4 }} className="group-hover:opacity-80 transition-opacity">
                        {lesson.title}
                      </span>

                      {/* Meta */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <span style={{ fontSize: "10px", color: colour, fontFamily: "var(--font-sans)", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontWeight: 600 }}>
                          {lesson.type === "interactive" ? "Interactive" : lesson.type === "video" ? "Video" : "Reading"}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{lesson.duration}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
