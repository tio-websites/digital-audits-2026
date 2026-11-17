import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ArticleEditor from "../ArticleEditor";

export default function NewArticlePage() {
  return (
    <div style={{ padding: "48px", maxWidth: "1200px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Link
          href="/cms/articles"
          style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A8C84", textDecoration: "none", marginBottom: "16px" }}
        >
          <ChevronLeft size={12} /> Articles
        </Link>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "#1A2E24", letterSpacing: "-0.01em" }}>
          New article
        </h1>
      </div>
      <ArticleEditor />
    </div>
  );
}
