"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function TogglePublishButton({ articleId, published }: { articleId: string; published: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch(`/api/cms/articles/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "2px", background: "none", border: "none", cursor: loading ? "not-allowed" : "pointer", color: "#B0B0A8" }}
      className="hover:bg-[#F5F4F1] hover:text-[#1A2E24] transition-colors"
      title={published ? "Unpublish" : "Publish"}
    >
      {published ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
  );
}
