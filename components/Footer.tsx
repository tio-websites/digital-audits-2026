import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--accent-dark)",
        color: "var(--white)",
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 48px 40px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "20px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  color: "var(--white)",
                }}
              >
                OKKLUSION
              </span>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-sans)",
                  marginTop: "2px",
                }}
              >
                [ɔkluˈzi̯oːn]
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: "1.7",
                fontFamily: "var(--font-sans)",
                maxWidth: "220px",
              }}
            >
              The global platform for clinicians building elite digital
              orthodontic systems.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                marginBottom: "16px",
              }}
            >
              Platform
            </p>
            <div className="flex flex-col gap-3">
              {[
                ["Training Courses", "/platform/courses"],
                ["Editorial", "/platform/editorial"],
                ["Community", "/platform/community"],
                ["Show & Tells", "/platform/experiential"],
                ["Dashboard", "/platform/dashboard"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "var(--font-sans)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                marginBottom: "16px",
              }}
            >
              Learn
            </p>
            <div className="flex flex-col gap-3">
              {[
                ["Clinical & Treatment", "/pillars/clinical"],
                ["Digital Workflow", "/pillars/workflow"],
                ["Software & AI", "/pillars/software"],
                ["Community & Mentorship", "/pillars/community"],
                ["CPD Accreditation", "/cpd"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "var(--font-sans)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                marginBottom: "16px",
              }}
            >
              Company
            </p>
            <div className="flex flex-col gap-3">
              {[
                ["About", "/about"],
                ["Membership", "/pricing"],
                ["Editorial", "/blog"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "var(--font-sans)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-sans)",
            }}
          >
            © 2026 Okklusion. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Use", "/terms"],
              ["Cookie Policy", "/cookies"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-sans)",
                }}
                className="hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
