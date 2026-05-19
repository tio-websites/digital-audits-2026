import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" as const }}>
      {/* Minimal header */}
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

          <form className="flex flex-col gap-5">
            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@practice.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
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
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px 24px",
                backgroundColor: "var(--accent-dark)",
                color: "var(--white)",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                borderRadius: "2px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              Sign in <ArrowRight size={13} />
            </button>
          </form>

          <div style={{ position: "relative", margin: "28px 0", textAlign: "center" as const }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)" }} />
            <span style={{ position: "relative", backgroundColor: "var(--bg)", padding: "0 12px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>or</span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { provider: "Google", icon: "G" },
            ].map(({ provider, icon }) => (
              <button
                key={provider}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  fontSize: "13px",
                  fontFamily: "var(--font-sans)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "14px" }}>{icon}</span>
                Continue with {provider}
              </button>
            ))}
          </div>

          <p style={{ textAlign: "center" as const, marginTop: "32px", fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
            New to Okklusion?{" "}
            <Link href="/signup" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
