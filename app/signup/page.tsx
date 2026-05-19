import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const tiers = [
  { id: "basic", name: "Basic", price: "£49/mo", features: ["Core modules", "Editorial", "Community access"] },
  { id: "premium", name: "Premium", price: "£99/mo", features: ["All pillars", "Show & Tells", "CPD certification", "Select events"], popular: true },
  { id: "super-premium", name: "Super Premium", price: "£199/mo", features: ["Everything", "Unlimited mentoring", "Full events", "DSO licences"] },
];

export default function SignupPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" as const }}>
      {/* Minimal header */}
      <header style={{ borderBottom: "1px solid var(--border)", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="flex flex-col leading-none">
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, letterSpacing: "0.12em", color: "var(--text-primary)" }}>OKKLUSION</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.05em", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>[ɔkluˈzi̯oːn]</span>
        </Link>
        <Link href="/login" style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }} className="hover:text-[var(--text-primary)] transition-colors">
          Already a member? <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>Sign in</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "64px 24px" }}>
        <div style={{ width: "100%", maxWidth: "560px" }}>
          <div style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "44px", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: "8px", lineHeight: 1.1 }}>
              Join Okklusion
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
              Build your account and choose your membership level.
            </p>
          </div>

          {/* Tier selector */}
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "14px" }}>
              Membership level
            </p>
            <div className="grid grid-cols-1 gap-3">
              {tiers.map((tier) => (
                <label
                  key={tier.id}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "16px 20px",
                    border: tier.popular ? "1px solid var(--accent)" : "1px solid var(--border)",
                    borderRadius: "2px",
                    backgroundColor: tier.popular ? "var(--surface)" : "var(--white)",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <input type="radio" name="tier" value={tier.id} defaultChecked={tier.popular} style={{ accentColor: "var(--accent-dark)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>
                        {tier.name}
                        {tier.popular && (
                          <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", fontWeight: 600, marginLeft: "10px" }}>
                            Popular
                          </span>
                        )}
                      </span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "16px", color: "var(--text-secondary)" }}>{tier.price}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
                      {tier.features.map((f) => (
                        <span key={f} style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Check size={9} style={{ color: "var(--accent)" }} />{f}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                  First name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Smith"
                  style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@practice.com"
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                Practice name
              </label>
              <input
                type="text"
                placeholder="Your practice"
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "4px" }}>
              <input type="checkbox" style={{ marginTop: "3px", accentColor: "var(--accent-dark)", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms of Use</Link>
                {" "}and{" "}
                <Link href="/privacy" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 24px",
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
              Continue to payment <ArrowRight size={13} />
            </button>

            <p style={{ textAlign: "center" as const, fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              Payment processed securely via GoCardless
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
