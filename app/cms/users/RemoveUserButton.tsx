"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function RemoveUserButton({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);
    try {
      await fetch(`/api/cms/users/${userId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "#B91C1C", fontFamily: "var(--font-sans)" }}>Remove {userName}?</span>
        <button
          onClick={handleRemove}
          disabled={loading}
          style={{ fontSize: "11px", color: "#B91C1C", background: "none", border: "1px solid #FECACA", borderRadius: "2px", padding: "3px 10px", cursor: "pointer" }}
        >
          {loading ? "…" : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          style={{ fontSize: "11px", color: "#7A8C84", background: "none", border: "none", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      style={{ background: "none", border: "none", cursor: "pointer", color: "#B0B0A8", padding: "4px" }}
      className="hover:text-red-500 transition-colors"
      title={`Remove ${userName}`}
    >
      <Trash2 size={14} />
    </button>
  );
}
