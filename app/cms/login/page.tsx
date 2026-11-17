"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CmsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      router.push("/cms");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0F1E18",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 400, letterSpacing: "0.18em", color: "#FAFAF8", marginBottom: "4px" }}>
            OKKLUSION
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#C8A96A", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            Content Management
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: "#1A2E24", border: "1px solid rgba(250,250,248,0.08)", borderRadius: "3px", padding: "36px" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 300, color: "#FAFAF8", marginBottom: "28px", lineHeight: 1 }}>
              CMS Login
            </h1>

            {error && (
              <div style={{ backgroundColor: "rgba(200,80,80,0.12)", border: "1px solid rgba(200,80,80,0.3)", borderRadius: "2px", padding: "10px 14px", marginBottom: "20px", fontSize: "13px", color: "#F08080", fontFamily: "var(--font-sans)" }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.45)", marginBottom: "6px" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{
                  width: "100%", padding: "10px 12px",
                  backgroundColor: "rgba(250,250,248,0.05)",
                  border: "1px solid rgba(250,250,248,0.12)",
                  borderRadius: "2px", color: "#FAFAF8",
                  fontSize: "14px", fontFamily: "var(--font-sans)",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", color: "rgba(250,250,248,0.45)", marginBottom: "6px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: "100%", padding: "10px 12px",
                  backgroundColor: "rgba(250,250,248,0.05)",
                  border: "1px solid rgba(250,250,248,0.12)",
                  borderRadius: "2px", color: "#FAFAF8",
                  fontSize: "14px", fontFamily: "var(--font-sans)",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "12px",
                backgroundColor: "#C8A96A", color: "#1A2E24",
                border: "none", borderRadius: "2px", cursor: loading ? "not-allowed" : "pointer",
                fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: "var(--font-sans)", fontWeight: 700,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "rgba(250,250,248,0.2)", fontFamily: "var(--font-sans)" }}>
          This login is for CMS administrators only
        </p>
      </div>
    </div>
  );
}
