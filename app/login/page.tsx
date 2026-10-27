"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/platform/dashboard");
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" as const }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="flex flex-col leading-none">
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, letterSpacing: "0.12em", color: "var(--text-primary)" }}>OKKLUSION</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.05em", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>[ɔkluˈzi̯oːn]</span>
        </Link>
        <Link href="/signup" style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }} className="hover:text-[var(--text-primary)] transition-colors">
          No account? <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>Join Okklusion</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "8px" }}>
              Sign in
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Access your Okklusion platform
            </p>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "2px", marginBottom: "20px" }}>
              <AlertCircle size={14} style={{ color: "#DC2626", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#DC2626", fontFamily: "var(--font-sans)" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@practice.com"
                required
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }} className="hover:text-[var(--text-secondary)] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px 24px", backgroundColor: "var(--accent-dark)", color: "var(--white)", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px" }}
            >
              {loading ? "Signing in..." : <><span>Sign in</span> <ArrowRight size={13} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center" as const, marginTop: "32px", fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
            New to Okklusion?{" "}
            <Link href="/signup" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Create an account
            </Link>
          </p>

          <div style={{ marginTop: "40px", padding: "16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Demo credentials</p>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
              Admin: admin@okklusion.com / okklusion-admin-2024<br />
              Member: demo@okklusion.com / demo1234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
