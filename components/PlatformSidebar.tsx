"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Video,
  Award,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const nav = [
  { href: "/platform/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  { href: "/platform/courses", icon: <BookOpen size={16} />, label: "Courses" },
  { href: "/platform/editorial", icon: <FileText size={16} />, label: "Editorial" },
  { href: "/platform/experiential", icon: <Video size={16} />, label: "Show & Tells" },
  { href: "/platform/community", icon: <Users size={16} />, label: "Community" },
];

const secondary = [
  { href: "/cpd", icon: <Award size={16} />, label: "CPD Records" },
  { href: "/platform/settings", icon: <Settings size={16} />, label: "Settings" },
];

export default function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "var(--accent-dark)",
        display: "flex",
        flexDirection: "column" as const,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" className="flex flex-col leading-none">
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, letterSpacing: "0.12em", color: "var(--white)" }}>OKKLUSION</span>
          <span style={{ fontSize: "8px", letterSpacing: "0.05em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", marginTop: "2px" }}>[ɔkluˈzi̯oːn]</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", padding: "8px 12px", marginBottom: "4px" }}>
          Platform
        </p>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "3px",
                fontSize: "13px",
                fontFamily: "var(--font-sans)",
                color: active ? "var(--white)" : "rgba(255,255,255,0.55)",
                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                marginBottom: "2px",
                transition: "all 0.15s ease",
              }}
              className="hover:bg-white/[0.06] hover:text-white"
            >
              <span style={{ color: active ? "var(--accent)" : "rgba(255,255,255,0.35)" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" as const, fontFamily: "var(--font-sans)", padding: "8px 12px", marginBottom: "4px", marginTop: "20px" }}>
          Account
        </p>
        {secondary.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "3px",
                fontSize: "13px",
                fontFamily: "var(--font-sans)",
                color: active ? "var(--white)" : "rgba(255,255,255,0.55)",
                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                marginBottom: "2px",
              }}
              className="hover:bg-white/[0.06] hover:text-white"
            >
              <span style={{ color: active ? "var(--accent)" : "rgba(255,255,255,0.35)" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>M</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12px", fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.8)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>Member</p>
            <p style={{ fontSize: "11px", fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>Premium</p>
          </div>
          <button style={{ color: "rgba(255,255,255,0.25)", cursor: "pointer", background: "none", border: "none", padding: 0 }} className="hover:text-white/60 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
