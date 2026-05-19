import { MessageSquare, ThumbsUp, ArrowRight, Pin } from "lucide-react";

const categories = ["All", "Cases", "Workflow", "Software", "Equipment", "Career", "Off Topic"];

const posts = [
  {
    pinned: true,
    category: "Workflow",
    title: "Welcome thread — introduce yourself and your practice",
    preview: "We'd love to know where you're based, what stage you're at in your digital journey, and what you're hoping to get from the community.",
    author: "Okklusion Team",
    replies: 47,
    likes: 82,
    time: "2 days ago",
  },
  {
    pinned: false,
    category: "Cases",
    title: "Anyone else finding Class III staging tricky with current software?",
    preview: "Running into consistent overcorrection issues in the posterior. Tried tweaking the prescription but would love to hear how others are handling this.",
    author: "DrSmith_Ortho",
    replies: 14,
    likes: 23,
    time: "4 hours ago",
  },
  {
    pinned: false,
    category: "Software",
    title: "DM remote monitoring — my 6-month review",
    preview: "I've been running full DM integration for 6 months now. Here's what's worked, what hasn't, and what I wish I'd known on day one.",
    author: "AlignPro_Cardiff",
    replies: 31,
    likes: 67,
    time: "1 day ago",
  },
  {
    pinned: false,
    category: "Equipment",
    title: "Printers comparison — Form 4 vs SprintRay for aligner production",
    preview: "Pulled data from 3 months of production runs across both machines. Accuracy, throughput, material cost — all in.",
    author: "DigitalDental_Leeds",
    replies: 22,
    likes: 54,
    time: "2 days ago",
  },
  {
    pinned: false,
    category: "Workflow",
    title: "Staff certification pathway — anyone gone through it?",
    preview: "Our treatment coordinator is keen to get formally certified. Looking at the York pathway — any experiences, timelines, or tips?",
    author: "PracticeOwner_London",
    replies: 9,
    likes: 18,
    time: "3 days ago",
  },
  {
    pinned: false,
    category: "Cases",
    title: "Unexpected root resorption mid-treatment — peer review?",
    preview: "Happy to share CBCT and staging files. Looking for a second opinion before I make the call on whether to continue or pause.",
    author: "DrPatel_Orthodontics",
    replies: 6,
    likes: 12,
    time: "5 days ago",
  },
];

export default function CommunityPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap" as const, gap: "16px" }}>
        <div>
          <p style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Platform</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Community
          </h1>
        </div>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--accent-dark)",
            color: "var(--white)",
            padding: "10px 20px",
            fontSize: "12px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            borderRadius: "2px",
            border: "none",
            cursor: "pointer",
          }}
        >
          New Post <ArrowRight size={12} />
        </button>
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

      {/* Posts */}
      <div className="flex flex-col">
        {posts.map((post, i) => (
          <div
            key={i}
            style={{
              padding: "24px 0",
              borderTop: i === 0 ? "1px solid var(--border)" : "none",
              borderBottom: "1px solid var(--border)",
              cursor: "pointer",
              backgroundColor: post.pinned ? "var(--surface)" : "transparent",
              paddingLeft: post.pinned ? "16px" : "0",
              paddingRight: post.pinned ? "16px" : "0",
              borderLeft: post.pinned ? "2px solid var(--accent)" : "none",
            }}
            className="hover:bg-[var(--surface)] transition-colors"
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" as const }}>
                  {post.pinned && (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                      <Pin size={10} /> Pinned
                    </span>
                  )}
                  <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--text-muted)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", backgroundColor: "var(--surface-raised)", padding: "2px 8px", borderRadius: "2px" }}>
                    {post.category}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "8px" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6, marginBottom: "12px" }}>
                  {post.preview}
                </p>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{post.author}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{post.time}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    <MessageSquare size={12} />{post.replies}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                    <ThumbsUp size={12} />{post.likes}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
