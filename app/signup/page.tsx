"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

const tiers = [
  { id: "basic", name: "Basic", price: "£49/mo", features: ["Core modules", "Editorial", "Community access"] },
  { id: "premium", name: "Premium", price: "£99/mo", features: ["All pillars", "Show & Tells", "CPD certification", "Select events"], popular: true },
  { id: "super-premium", name: "Super Premium", price: "£199/mo", features: ["Everything", "Unlimited mentoring", "Full events", "DSO licences"] },
] as const;

type PlanId = "basic" | "premium" | "super-premium";

export default function SignupPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanId>("premium");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("Please agree to the Terms of Use and Privacy Policy."); return; }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, practice, plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Account created but sign-in failed. Please go to the login page.");
        setLoading(false);
        return;
      }
      router.push("/platform/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" as const }}>
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

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "2px", marginBottom: "24px" }}>
              <AlertCircle size={14} style={{ color: "#DC2626", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#DC2626", fontFamily: "var(--font-sans)" }}>{error}</span>
            </div>
          )}

          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "14px" }}>
              Membership level
            </p>
            <div className="grid grid-cols-1 gap-3">
              {tiers.map((tier) => (
                <label
                  key={tier.id}
                  style={{ display: "flex", gap: "16px", padding: "16px 20px", border: plan === tier.id ? "1px solid var(--accent)" : "1px solid var(--border)", borderRadius: "2px", backgroundColor: plan === tier.id ? "var(--surface)" : "var(--white)", cursor: "pointer", alignItems: "center" }}
                >
                  <input type="radio" name="tier" value={tier.id} checked={plan === tier.id} onChange={() => setPlan(tier.id)} style={{ accentColor: "var(--accent-dark)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>
                        {tier.name}
                        {"popular" in tier && tier.popular && (
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>First name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" required style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" required style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@practice.com" required style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Practice name</label>
              <input type="text" value={practice} onChange={(e) => setPractice(e.target.value)} placeholder="Your practice" style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8} style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "4px" }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: "3px", accentColor: "var(--accent-dark)", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms of Use</Link>
                {" "}and{" "}
                <Link href="/privacy" style={{ color: "var(--accent-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px 24px", backgroundColor: "var(--accent-dark)", color: "var(--white)", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px" }}
            >
              {loading ? "Creating account..." : <><span>Continue to payment</span> <ArrowRight size={13} /></>}
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
