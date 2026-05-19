import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--accent-dark)", padding: "100px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--accent)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "var(--font-sans)", textTransform: "uppercase" as const }}>Contact</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Get in touch
          </h1>
        </div>
      </section>

      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "24px", letterSpacing: "-0.01em" }}>
                We'd love to hear from you
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", lineHeight: 1.75, marginBottom: "40px" }}>
                Whether you have a question about membership, want to explore a DSO licence, or are interested in contributing content, we'd love to hear from you.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { label: "General Enquiries", value: "hello@okklusion.com" },
                  { label: "Membership & Billing", value: "members@okklusion.com" },
                  { label: "Content & Editorial", value: "editorial@okklusion.com" },
                  { label: "DSO & Enterprise", value: "enterprise@okklusion.com" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "6px" }}>{label}</p>
                    <p style={{ fontSize: "15px", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>First name</label>
                    <input type="text" style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last name</label>
                    <input type="text" style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Email</label>
                  <input type="email" style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Subject</label>
                  <select style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none", appearance: "none" as const }}>
                    <option>Membership enquiry</option>
                    <option>DSO / Enterprise</option>
                    <option>Content contribution</option>
                    <option>Technical support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-muted)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Message</label>
                  <textarea
                    rows={5}
                    style={{ width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-primary)", outline: "none", resize: "vertical" as const }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "var(--accent-dark)", color: "var(--white)", padding: "13px 24px", fontSize: "12px", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "2px", border: "none", cursor: "pointer" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Send message <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
