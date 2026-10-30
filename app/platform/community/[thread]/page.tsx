import Link from "next/link";
import { notFound } from "next/navigation";
import { getThread, deptColour } from "@/lib/threads";
import { ArrowLeft, ThumbsUp, MessageSquare, Pin, Flame } from "lucide-react";

function Avatar({ initial, size = 36, isFinn }: { initial: string; size?: number; isFinn?: boolean }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      backgroundColor: isFinn ? "var(--accent)" : "var(--surface-raised)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        fontSize: size * 0.36, fontFamily: "var(--font-sans)", fontWeight: 600,
        color: isFinn ? "var(--accent-dark)" : "var(--text-muted)",
      }}>{initial}</span>
    </div>
  );
}

export default async function ThreadPage({ params }: { params: Promise<{ thread: string }> }) {
  const { thread: threadId } = await params;
  const thread = getThread(threadId);
  if (!thread) notFound();

  const colour = deptColour[thread.dept] ?? "var(--text-muted)";

  return (
    <div style={{ maxWidth: "860px", padding: "0 0 80px" }}>

      {/* ── TOP BAR ──────────────────────────────────────────────────────────── */}
      <div style={{ padding: "24px 48px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/platform/community"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", textDecoration: "none" }}
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={12} /> Forum
        </Link>
        <span style={{ fontSize: "11px", color: "var(--border-strong)", fontFamily: "var(--font-sans)" }}>/</span>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: colour, letterSpacing: "0.06em", textTransform: "uppercase" as const, fontWeight: 600 }}>
          {thread.dept}
        </span>
        {thread.pinned && <Pin size={11} style={{ color: "var(--accent)" }} />}
        {thread.hot && <Flame size={11} style={{ color: "#C87A4A" }} />}
      </div>

      {/* ── OP ───────────────────────────────────────────────────────────────── */}
      <div style={{ padding: "36px 48px 32px", borderBottom: "2px solid var(--border)", borderLeft: `4px solid ${colour}` }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "20px" }}>
          {thread.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Avatar initial={thread.initial} size={38} isFinn={false} />
          <div>
            <p style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>
              {thread.author}
            </p>
            {thread.role && (
              <p style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-muted)", marginTop: "2px" }}>{thread.role}</p>
            )}
          </div>
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{thread.time}</span>
        </div>

        <div style={{ fontSize: "15px", color: "var(--text-primary)", fontFamily: "var(--font-sans)", lineHeight: 1.8, maxWidth: "680px" }}>
          {thread.body.split(". ").reduce<string[]>((acc, s, i, arr) => {
            if (i === arr.length - 1) return [...acc, s];
            return [...acc, s + ". "];
          }, []).join("")}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "7px 14px", borderRadius: "2px", border: "1px solid var(--border)",
            backgroundColor: "transparent", cursor: "pointer",
            fontSize: "11px", fontFamily: "var(--font-sans)", color: "var(--text-muted)",
          }} className="hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors">
            <ThumbsUp size={12} />
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "14px" }}>{thread.helpful}</span>
            <span style={{ letterSpacing: "0.04em" }}>Helpful</span>
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
            <MessageSquare size={12} />
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "14px" }}>{thread.replies.length}</span>
            {thread.replies.length === 1 ? "reply" : "replies"}
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
            {thread.views} views
          </span>
        </div>
      </div>

      {/* ── REPLIES ──────────────────────────────────────────────────────────── */}
      <div style={{ padding: "0 48px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", color: "var(--text-muted)", padding: "24px 0 16px" }}>
          {thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}
        </p>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
          {thread.replies.map((reply, i) => (
            <div
              key={reply.id}
              style={{
                padding: "24px",
                backgroundColor: reply.isFinn ? "var(--accent-dark)" : "var(--surface)",
                borderLeft: reply.isFinn ? "3px solid var(--accent)" : "3px solid transparent",
                borderRadius: "2px",
                position: "relative" as const,
              }}
            >
              {/* Finn badge */}
              {reply.isFinn && (
                <div style={{
                  position: "absolute" as const, top: "16px", right: "20px",
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  fontFamily: "var(--font-sans)", fontWeight: 700,
                  color: "var(--accent)", display: "flex", alignItems: "center", gap: "4px",
                }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--accent)", display: "inline-block" }} />
                  Clinical Director
                </div>
              )}

              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <Avatar initial={reply.initial} size={34} isFinn={reply.isFinn} />
                <div>
                  <p style={{
                    fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: 600, lineHeight: 1,
                    color: reply.isFinn ? "var(--bg)" : "var(--text-primary)",
                  }}>
                    {reply.author}
                  </p>
                  {reply.role && (
                    <p style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: reply.isFinn ? "rgba(250,250,248,0.45)" : "var(--text-muted)", marginTop: "2px" }}>
                      {reply.role}
                    </p>
                  )}
                </div>
                <span style={{ marginLeft: "auto", fontSize: "11px", fontFamily: "var(--font-sans)", color: reply.isFinn ? "rgba(250,250,248,0.35)" : "var(--text-muted)" }}>
                  {reply.time}
                </span>
              </div>

              {/* Body */}
              <p style={{
                fontSize: "14px", lineHeight: 1.75, fontFamily: "var(--font-sans)",
                color: reply.isFinn ? "rgba(250,250,248,0.85)" : "var(--text-primary)",
                maxWidth: "660px",
              }}>
                {reply.body}
              </p>

              {/* Helpful */}
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "5px 10px", borderRadius: "2px", border: "1px solid",
                  borderColor: reply.isFinn ? "rgba(250,250,248,0.15)" : "var(--border)",
                  backgroundColor: "transparent", cursor: "pointer",
                  fontSize: "11px", fontFamily: "var(--font-sans)",
                  color: reply.isFinn ? "rgba(250,250,248,0.4)" : "var(--text-muted)",
                }} className="hover:border-[var(--border-strong)] transition-colors">
                  <ThumbsUp size={11} />
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "13px" }}>{reply.helpful}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reply box */}
        <div style={{ marginTop: "32px", padding: "24px", backgroundColor: "var(--surface)", borderRadius: "2px", border: "1px solid var(--border)" }}>
          <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "0.02em" }}>
            Add a reply
          </p>
          <textarea
            placeholder="Share your experience, ask a follow-up question, or add context…"
            style={{
              width: "100%", minHeight: "100px", padding: "12px 14px",
              backgroundColor: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: "2px", fontSize: "13px", fontFamily: "var(--font-sans)",
              color: "var(--text-primary)", lineHeight: 1.6, resize: "vertical" as const,
              outline: "none",
            }}
          />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              backgroundColor: "var(--accent-dark)", color: "var(--bg)",
              padding: "9px 20px", borderRadius: "2px", border: "none", cursor: "pointer",
              fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const,
              fontFamily: "var(--font-sans)", fontWeight: 600,
            }}>
              Post reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
