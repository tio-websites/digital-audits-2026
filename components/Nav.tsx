"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  {
    label: "Pillars",
    children: [
      { href: "/pillars/clinical", label: "Clinical & Treatment" },
      { href: "/pillars/workflow", label: "Digital Workflow" },
      { href: "/pillars/software", label: "Software & AI" },
      { href: "/pillars/community", label: "Community & Mentorship" },
    ],
  },
  { href: "/cpd", label: "CPD" },
  { href: "/blog", label: "Editorial" },
  { href: "/pricing", label: "Membership" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [pillarsOpen, setPillarsOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
      className="sticky top-0 z-50"
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
        className="flex items-center justify-between h-16"
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "var(--text-primary)",
            }}
          >
            OKKLUSION
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              fontFamily: "var(--font-sans)",
            }}
          >
            [ɔkluˈzi̯oːn]
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setPillarsOpen(true)}
                onMouseLeave={() => setPillarsOpen(false)}
              >
                <button
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.04em",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                  className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {link.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {pillarsOpen && (
                  <div
                    style={{
                      backgroundColor: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      minWidth: "220px",
                    }}
                    className="absolute top-full left-0 pt-2 mt-1"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "10px 18px",
                          fontSize: "13px",
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-sans)",
                          letterSpacing: "0.02em",
                        }}
                        className="hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.04em",
            }}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            style={{
              backgroundColor: "var(--accent-dark)",
              color: "var(--white)",
              padding: "8px 20px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              borderRadius: "2px",
              textTransform: "uppercase" as const,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Join
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text-primary)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: "var(--bg)",
            borderTop: "1px solid var(--border)",
          }}
          className="md:hidden"
        >
          <div style={{ padding: "16px 24px" }} className="flex flex-col gap-4">
            {links.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-sans)",
                      marginBottom: "8px",
                    }}
                  >
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        padding: "6px 0",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }} className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                style={{
                  backgroundColor: "var(--accent-dark)",
                  color: "var(--white)",
                  padding: "10px 20px",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  borderRadius: "2px",
                  textTransform: "uppercase" as const,
                  textAlign: "center" as const,
                  display: "block",
                }}
              >
                Join Okklusion
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
