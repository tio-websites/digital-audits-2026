import { Play, Clock, MapPin, Lock } from "lucide-react";

const videos = [
  {
    type: "Show & Tell",
    title: "In-house manufacturing walkthrough — Cardiff practice",
    description: "A full tour of a practice that has built a complete in-house aligner production system from scratch, including printer setup, QC workflow, and team protocols.",
    duration: "42 min",
    presenter: "DrAlignWales",
    date: "May 2026",
    locked: false,
  },
  {
    type: "Factory Visit",
    title: "Behind the scenes — Scheu aligner production",
    description: "An exclusive visit to one of Europe's leading aligner manufacturers, covering material science, production tolerances, and what this means for clinical prescriptions.",
    duration: "1h 08m",
    presenter: "Finn & Okklusion Team",
    date: "Apr 2026",
    locked: false,
  },
  {
    type: "Show & Tell",
    title: "DM dashboard live — monitoring 300 active patients",
    description: "A live demonstration of how one practice manages 300 active DM patients, including triage protocols, alert handling, and team responsibilities.",
    duration: "35 min",
    presenter: "DrSmith_Ortho",
    date: "Apr 2026",
    locked: false,
  },
  {
    type: "Factory Visit",
    title: "3D printing lab tour — SprintRay facility",
    description: "Inside SprintRay's production and R&D facility — understanding the engineering behind print accuracy and what clinical implications this carries.",
    duration: "55 min",
    presenter: "Okklusion Team",
    date: "Mar 2026",
    locked: true,
  },
  {
    type: "Show & Tell",
    title: "Case review session — complex Class III with crowding",
    description: "Finn walks through the full treatment journey for a challenging Class III case, including staging decisions, mid-treatment adjustments, and outcome review.",
    duration: "1h 15m",
    presenter: "Finn",
    date: "Mar 2026",
    locked: true,
  },
  {
    type: "Show & Tell",
    title: "New practice setup — digital from day one",
    description: "A practice owner who opened 12 months ago shares the decisions they made to build a fully digital-native setup from the first day, and what they'd do differently.",
    duration: "48 min",
    presenter: "PracticeOwner_London",
    date: "Feb 2026",
    locked: true,
  },
];

const typeColours: Record<string, string> = {
  "Show & Tell": "var(--accent)",
  "Factory Visit": "var(--text-secondary)",
};

export default function ExperientialPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Platform</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "12px" }}>
          Show & Tells
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "560px" }}>
          Real practice walkthroughs, factory visits, and live demonstrations. Peer-led and practice-tested.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "36px" }}>
        {["All", "Show & Tell", "Factory Visit"].map((type, i) => (
          <button
            key={type}
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
            {type}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
        {videos.map((video) => (
          <div
            key={video.title}
            style={{
              backgroundColor: "var(--bg)",
              opacity: video.locked ? 0.7 : 1,
              display: "flex",
              flexDirection: "column" as const,
            }}
            className="group"
          >
            {/* Thumbnail */}
            <div
              style={{
                aspectRatio: "16/9",
                backgroundColor: "var(--accent-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative" as const,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {video.locked
                  ? <Lock size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
                  : <Play size={20} style={{ color: "var(--white)", marginLeft: "2px" }} />
                }
              </div>
              <span
                style={{
                  position: "absolute" as const,
                  bottom: "12px",
                  right: "12px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Clock size={10} />{video.duration}
              </span>
            </div>

            <div style={{ padding: "24px 24px 28px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, color: typeColours[video.type], display: "block", marginBottom: "10px" }}>
                {video.type}
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "10px" }}>
                {video.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "16px" }}>
                {video.description}
              </p>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{video.presenter}</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{video.date}</span>
              </div>
              {video.locked && (
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontStyle: "italic", marginTop: "12px" }}>
                  Upgrade to watch
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
