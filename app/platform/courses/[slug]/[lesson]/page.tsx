import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getCourse, getAdjacentLessons, getAllLessons } from "@/lib/courses";
import { CheckCircle, Circle, Play, BookOpen, Zap, ChevronLeft, ChevronRight, Award } from "lucide-react";

const typeColour: Record<string, string> = {
  text: "var(--text-muted)",
  video: "#7A8C84",
  interactive: "var(--accent)",
};

export default function LessonPage({ params }: { params: { slug: string; lesson: string } }) {
  const result = getLesson(params.slug, params.lesson);
  if (!result) notFound();

  const { course, lesson, module: mod } = result;
  const { prev, next } = getAdjacentLessons(course, lesson.id);
  const allLessons = getAllLessons(course);
  const completedCount = allLessons.filter(l => l.completed).length;
  const colour = typeColour[lesson.type];

  return (
    <div style={{ display: "flex", maxWidth: "1100px", minHeight: "100vh" }}>

      {/* ── CURRICULUM SIDEBAR ──────────────────────────────────────────────── */}
      <aside style={{
        width: "260px",
        flexShrink: 0,
        borderRight: "1px solid var(--border)",
        position: "sticky" as const,
        top: 0,
        height: "100vh",
        overflowY: "auto" as const,
        backgroundColor: "var(--surface)",
      }}>
        {/* Course title */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)" }}>
          <Link href={`/platform/courses/${course.slug}`} style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none", marginBottom: "10px" }} className="hover:text-[var(--text-secondary)] transition-colors">
            <ChevronLeft size={10} /> Course overview
          </Link>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "15px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3 }}>
            {course.title}
          </p>
          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{completedCount}/{allLessons.length} complete</span>
              <span style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{course.progress}%</span>
            </div>
            <div style={{ height: "2px", backgroundColor: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${course.progress}%`, backgroundColor: "var(--accent)", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* Module + lesson list */}
        <nav style={{ padding: "8px 0" }}>
          {course.modules.map((m, mi) => (
            <div key={m.id}>
              <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 600, padding: "10px 20px 4px" }}>
                {String(mi + 1).padStart(2, "0")} {m.title}
              </p>
              {m.lessons.map((l) => {
                const active = l.id === lesson.id;
                return (
                  <Link
                    key={l.id}
                    href={`/platform/courses/${course.slug}/${l.id}`}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "9px",
                      padding: "9px 20px",
                      backgroundColor: active ? "var(--bg)" : "transparent",
                      borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                      textDecoration: "none",
                    }}
                    className="hover:bg-[var(--bg)] transition-colors"
                  >
                    <span style={{ color: l.completed ? "var(--accent)" : "var(--border-strong)", flexShrink: 0, marginTop: "1px" }}>
                      {l.completed ? <CheckCircle size={12} /> : <Circle size={12} />}
                    </span>
                    <span style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: active ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.4, fontWeight: active ? 500 : 400 }}>
                      {l.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── LESSON CONTENT ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" as const }}>

        {/* Top nav bar */}
        <div style={{ padding: "14px 40px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--bg)", position: "sticky" as const, top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: colour }}>
              {lesson.type === "video" && <Play size={11} />}
              {lesson.type === "text" && <BookOpen size={11} />}
              {lesson.type === "interactive" && <Zap size={11} />}
              {lesson.type === "interactive" ? "Interactive" : lesson.type === "video" ? "Video" : "Reading"}
            </span>
            <span style={{ fontSize: "10px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>·</span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{lesson.duration}</span>
            <span style={{ fontSize: "10px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>·</span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{mod.title}</span>
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {prev ? (
              <Link href={`/platform/courses/${course.slug}/${prev.id}`} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "2px" }} className="hover:text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-colors">
                <ChevronLeft size={12} /> Prev
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/platform/courses/${course.slug}/${next.id}`} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--accent-dark)", backgroundColor: "var(--accent)", textDecoration: "none", borderRadius: "2px", fontWeight: 600, letterSpacing: "0.04em" }} className="hover:opacity-90 transition-opacity">
                Next <ChevronRight size={12} />
              </Link>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 14px", fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--bg)", backgroundColor: "var(--accent-dark)", borderRadius: "2px", fontWeight: 600, cursor: "pointer" }}>
                <Award size={11} /> Complete course
              </span>
            )}
          </div>
        </div>

        {/* Lesson body */}
        <div style={{ flex: 1, padding: "48px 56px 80px", maxWidth: "740px" }}>

          {/* Title */}
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: "32px" }}>
            {lesson.title}
          </h1>

          {/* VIDEO LESSON */}
          {lesson.type === "video" && lesson.video && (
            <div>
              {/* Video player */}
              <div style={{ borderRadius: "3px", overflow: "hidden", marginBottom: "32px", position: "relative" as const, aspectRatio: "16/9", backgroundColor: lesson.video.posterBg }}>
                <div style={{ position: "absolute" as const, inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "16px" }}>
                  <div style={{ width: "68px", height: "68px", borderRadius: "50%", backgroundColor: "rgba(250,250,248,0.1)", border: "1px solid rgba(250,250,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} className="hover:bg-[rgba(250,250,248,0.18)] transition-colors">
                    <Play size={26} style={{ color: "var(--bg)", marginLeft: "3px" }} />
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(250,250,248,0.35)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
                    {lesson.video.duration}
                  </p>
                </div>
                {/* Progress bar at bottom */}
                <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "3px", backgroundColor: "rgba(250,250,248,0.1)" }}>
                  <div style={{ height: "100%", width: "0%", backgroundColor: "var(--accent)" }} />
                </div>
              </div>

              {/* Transcript */}
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "3px", padding: "24px 28px" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontWeight: 600, marginBottom: "16px" }}>
                  Transcript
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "14px" }}>
                  {lesson.video.transcript.map((para, i) => (
                    <p key={i} style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEXT LESSON */}
          {lesson.type === "text" && lesson.content && (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
              {lesson.content.body.map((section, i) => {
                if (section.kind === "paragraph") {
                  return (
                    <p key={i} style={{ fontSize: "16px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.85, marginBottom: "24px" }}>
                      {section.text}
                    </p>
                  );
                }
                if (section.kind === "heading") {
                  return (
                    <h2 key={i} style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "16px", marginTop: "40px", letterSpacing: "-0.01em" }}>
                      {section.text}
                    </h2>
                  );
                }
                if (section.kind === "pullquote") {
                  return (
                    <blockquote key={i} style={{ margin: "32px 0", padding: "24px 32px", borderLeft: "3px solid var(--accent)", backgroundColor: "var(--surface)" }}>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.4, letterSpacing: "-0.005em", fontStyle: "italic" }}>
                        &ldquo;{section.text}&rdquo;
                      </p>
                    </blockquote>
                  );
                }
                if (section.kind === "list" && section.items) {
                  return (
                    <ul key={i} style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                      {section.items.map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.65 }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--accent)", flexShrink: 0, marginTop: "9px" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          )}

          {/* INTERACTIVE LESSON */}
          {lesson.type === "interactive" && (
            <div>
              <div style={{ backgroundColor: "rgba(200,169,106,0.06)", border: "1px solid rgba(200,169,106,0.2)", borderRadius: "3px", padding: "32px 36px", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Zap size={16} style={{ color: "var(--accent)" }} />
                  <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--accent)" }}>
                    Interactive scenario
                  </p>
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "24px" }}>
                  You will be presented with two trimline options for this clinical scenario. Study both, consider the biomechanical implications, and commit to your choice before the rationale is revealed.
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
                  There is no right answer until you commit. The learning is in the decision process, not the outcome.
                </p>
              </div>

              {/* Placeholder scenario UI */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                {["Option A", "Option B"].map((opt) => (
                  <div key={opt} style={{ border: "2px solid var(--border)", borderRadius: "3px", padding: "32px 28px", cursor: "pointer", textAlign: "center" as const, backgroundColor: "var(--bg)" }} className="hover:border-[var(--accent)] hover:bg-[rgba(200,169,106,0.04)] transition-all">
                    <div style={{ width: "100%", aspectRatio: "3/2", backgroundColor: "var(--surface)", borderRadius: "2px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Trimline diagram</p>
                    </div>
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>{opt}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textAlign: "center" as const, fontStyle: "italic" }}>
                Select an option to reveal the clinical rationale
              </p>
            </div>
          )}

          {/* Mark complete / next action */}
          <div style={{ marginTop: "56px", paddingTop: "32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={16} style={{ color: lesson.completed ? "var(--accent)" : "var(--border-strong)" }} />
              <span style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: lesson.completed ? "var(--accent)" : "var(--text-muted)" }}>
                {lesson.completed ? "Marked complete" : "Mark as complete"}
              </span>
            </div>
            {next && (
              <Link
                href={`/platform/courses/${course.slug}/${next.id}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--accent-dark)", color: "var(--bg)", padding: "11px 22px", borderRadius: "2px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, textDecoration: "none" }}
                className="hover:opacity-90 transition-opacity"
              >
                Next lesson <ChevronRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
