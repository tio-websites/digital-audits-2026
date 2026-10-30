import Link from "next/link";
import { threads, deptColour } from "@/lib/threads";
import { Flame, Pin, MessageSquare, ThumbsUp, PenLine } from "lucide-react";

const depts = ["All", "Case Submission", "Clinical", "Lab Note", "Software", "Practice", "Evidence"];

function Avatar({ initial, isFinn }: { initial: string; isFinn?: boolean }) {
  return (
    <div style={{
      width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
      backgroundColor: isFinn ? "var(--accent)" : "var(--surface-raised)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600,
        color: isFinn ? "var(--accent-dark)" : "var(--text-muted)",
      }}>{initial}</span>
    </div>
  );
}

export default function ForumPage() {
  const pinned = threads.filter(t => t.pinned);
  const hot = threads.filter(t => t.hot && !t.pinned);
  const rest = threads.filter(t => !t.hot && !t.pinned);

  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--accent-dark)", padding: "40px 48px 36px", borderBottom: "1px solid rgba(250,250,248,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" as const }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", marginBottom: "10px" }}>
              Okklusion Forum
            </p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: "var(--bg)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "10px" }}>
              Peer discussion for<br />digital orthodontics
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(250,250,248,0.45)", fontFamily: "var(--font-sans)", lineHeight: 1.6, maxWidth: "480px" }}>
              Case questions, lab notes, software talk, and practice matters — shared across the Okklusion membership.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px", alignItems: "flex-end" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "var(--accent)", color: "var(--accent-dark)",
              padding: "11px 22px", borderRadius: "2px", border: "none", cursor: "pointer",
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const,
              fontFamily: "var(--font-sans)", fontWeight: 700,
            }}>
              <PenLine size={12} /> New post
            </button>
            <div style={{ display: "flex", gap: "24px" }}>
              {[["312", "Active members"], ["8", "Threads this week"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "right" as const }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "var(--bg)", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "10px", color: "rgba(250,250,248,0.35)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em", marginTop: "2px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dept filters */}
        <div style={{ display: "flex", gap: "6px", marginTop: "28px", flexWrap: "wrap" as const }}>
          {depts.map((d, i) => (
            <button key={d} style={{
              padding: "5px 14px", fontSize: "11px", fontFamily: "var(--font-sans)",
              letterSpacing: "0.05em", borderRadius: "100px", border: "1px solid",
              borderColor: i === 0 ? "var(--accent)" : "rgba(250,250,248,0.15)",
              backgroundColor: i === 0 ? "var(--accent)" : "transparent",
              color: i === 0 ? "var(--accent-dark)" : "rgba(250,250,248,0.45)",
              cursor: "pointer", fontWeight: i === 0 ? 700 : 400,
            }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ── THREADS ──────────────────────────────────────────────────────────── */}
      <div style={{ padding: "0 48px 64px" }}>

        {/* Pinned */}
        {pinned.length > 0 && (
          <div style={{ paddingTop: "32px", marginBottom: "4px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Pin size={10} /> Pinned
            </p>
            {pinned.map(t => <ThreadRow key={t.id} thread={t} />)}
          </div>
        )}

        {/* Hot */}
        {hot.length > 0 && (
          <div style={{ paddingTop: pinned.length ? "28px" : "32px", marginBottom: "4px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Flame size={10} style={{ color: "#C87A4A" }} /> Trending this week
            </p>
            {hot.map(t => <ThreadRow key={t.id} thread={t} />)}
          </div>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <div style={{ paddingTop: "28px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
              Recent
            </p>
            {rest.map(t => <ThreadRow key={t.id} thread={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadRow({ thread }: { thread: import("@/lib/threads").Thread }) {
  const colour = deptColour[thread.dept] ?? "var(--text-muted)";
  return (
    <Link
      href={`/platform/community/${thread.id}`}
      style={{ textDecoration: "none", display: "block" }}
      className="group"
    >
      <div
        className="hover:bg-[var(--surface)] transition-colors"
        style={{
          display: "flex", gap: "16px", alignItems: "flex-start",
          padding: "20px 20px",
          marginLeft: "-20px", marginRight: "-20px",
          borderBottom: "1px solid var(--border)",
          borderLeft: `3px solid ${colour}`,
          paddingLeft: "17px",
        }}
      >
        {/* Avatar */}
        <Avatar initial={thread.initial} />

        {/* Body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Dept + badges */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" as const }}>
            <span style={{
              fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const,
              fontFamily: "var(--font-sans)", fontWeight: 700, color: colour,
            }}>
              {thread.dept}
            </span>
            {thread.pinned && (
              <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--accent)", display: "flex", alignItems: "center", gap: "3px" }}>
                <Pin size={8} /> Pinned
              </span>
            )}
            {thread.hot && (
              <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "#C87A4A", display: "flex", alignItems: "center", gap: "3px" }}>
                <Flame size={8} /> Hot
              </span>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400,
            color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "6px",
          }} className="group-hover:text-[var(--accent-dark)] transition-colors">
            {thread.title}
          </h3>

          {/* Preview */}
          <p style={{
            fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)",
            lineHeight: 1.6, marginBottom: "12px",
            overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
          }}>
            {thread.body}
          </p>

          {/* Meta row */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" as const }}>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text-secondary)" }}>
              {thread.author}{thread.role && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}> · {thread.role}</span>}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{thread.time}</span>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginLeft: "auto" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                <MessageSquare size={12} />
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "13px" }}>{thread.replies.length}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                <ThumbsUp size={12} />
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "13px" }}>{thread.helpful}</span>
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                {thread.views} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
