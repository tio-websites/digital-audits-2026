import Link from "next/link";
import { BookOpen, FileText, Users, Video, Award, ArrowRight, Clock } from "lucide-react";

const recentCourses = [
  { title: "ISO Process Module — Aligner QC", progress: 65, pillar: "Digital Workflow", duration: "4h 20m" },
  { title: "DM Protocol: Remote Monitoring Setup", progress: 30, pillar: "Software & AI", duration: "2h 45m" },
  { title: "Case Planning for Complex Class II", progress: 100, pillar: "Clinical", duration: "3h 10m" },
];

const recentEditorial = [
  { tag: "Opinion", title: "Digital orthodontics has outgrown its ecosystem", date: "12 May 2026" },
  { tag: "News", title: "York CPD accreditation — everything you need to know", date: "8 May 2026" },
  { tag: "Case Study", title: "Zero to in-house manufacturing in 12 weeks", date: "1 May 2026" },
];

const quickLinks = [
  { href: "/platform/courses", icon: <BookOpen size={18} />, label: "All Courses", sub: "Browse the full library" },
  { href: "/platform/editorial", icon: <FileText size={18} />, label: "Editorial", sub: "Articles & opinion" },
  { href: "/platform/experiential", icon: <Video size={18} />, label: "Show & Tells", sub: "Video walkthroughs" },
  { href: "/platform/community", icon: <Users size={18} />, label: "Community", sub: "Peer discussion" },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px" }}>
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
          Welcome back
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
          Your dashboard
        </h1>
      </div>

      {/* CPD Progress */}
      <div style={{ backgroundColor: "var(--accent-dark)", borderRadius: "3px", padding: "28px 32px", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" as const }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", marginBottom: "6px" }}>CPD Progress — 2026</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "36px", fontWeight: 300, color: "var(--white)", lineHeight: 1 }}>
            12 <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sans)", fontWeight: 300 }}>/ 30 hours</span>
          </p>
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "40%", backgroundColor: "var(--accent)", borderRadius: "2px" }} />
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-sans)", marginTop: "8px" }}>40% of annual target</p>
        </div>
        <Link
          href="/cpd"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", fontWeight: 500, flexShrink: 0 }}
          className="hover:opacity-80 transition-opacity"
        >
          View records <ArrowRight size={11} />
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)", marginBottom: "40px" }}>
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ backgroundColor: "var(--surface)", padding: "24px 20px", display: "block" }}
            className="hover:bg-[var(--surface-raised)] transition-colors"
          >
            <div style={{ color: "var(--accent)", marginBottom: "12px" }}>{link.icon}</div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>{link.label}</p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{link.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue learning */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>Continue learning</h2>
            <Link href="/platform/courses" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All courses <ArrowRight size={10} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentCourses.map((course) => (
              <div
                key={course.title}
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "18px 20px", borderRadius: "2px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ flex: 1, marginRight: "12px" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 500, marginBottom: "4px" }}>{course.pillar}</p>
                    <p style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontWeight: 500, lineHeight: 1.35 }}>{course.title}</p>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", flexShrink: 0 }}>
                    <Clock size={11} />{course.duration}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ flex: 1, height: "3px", backgroundColor: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${course.progress}%`, backgroundColor: course.progress === 100 ? "var(--accent)" : "var(--accent-dark)", borderRadius: "2px" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", flexShrink: 0 }}>{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent editorial */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, color: "var(--text-primary)" }}>Latest editorial</h2>
            <Link href="/platform/editorial" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: "4px" }} className="hover:text-[var(--text-secondary)] transition-colors">
              All articles <ArrowRight size={10} />
            </Link>
          </div>
          <div className="flex flex-col">
            {recentEditorial.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 0",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                }}
                className="hover:bg-[var(--surface)] transition-colors"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, display: "block", marginBottom: "6px" }}>{item.tag}</span>
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3 }}>{item.title}</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px" }} />
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginTop: "8px" }}>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
