"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteArticleButton({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/cms/articles/${articleId}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button onClick={handleDelete} disabled={loading} style={{ fontSize: "11px", color: "#B91C1C", background: "none", border: "1px solid #FECACA", borderRadius: "2px", padding: "3px 8px", cursor: "pointer" }}>
          {loading ? "…" : "Delete"}
        </button>
        <button onClick={() => setConfirming(false)} style={{ fontSize: "11px", color: "#7A8C84", background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "2px", background: "none", border: "none", cursor: "pointer", color: "#B0B0A8" }}
      className="hover:bg-[#FEF2F2] hover:text-red-500 transition-colors"
      title={`Delete "${articleTitle}"`}
    >
      <Trash2 size={14} />
    </button>
  );
}
