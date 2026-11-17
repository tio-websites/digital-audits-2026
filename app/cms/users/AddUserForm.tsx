"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      const res = await fetch("/api/cms/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to create user"); return; }
      setSuccess(`${name} has been added.`);
      setName(""); setEmail(""); setPassword(""); setRole("editor");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "10px 12px", boxSizing: "border-box" as const,
    backgroundColor: "#fff", border: "1px solid #D8D6D1",
    borderRadius: "2px", color: "#1A2E24",
    fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none",
  };
  const labelStyle = {
    display: "block", fontSize: "10px", letterSpacing: "0.08em",
    textTransform: "uppercase" as const, color: "#7A8C84",
    marginBottom: "5px", fontFamily: "var(--font-sans)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "28px 32px" }}>
      {error && (
        <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "2px", padding: "10px 14px", marginBottom: "20px", fontSize: "13px", color: "#B91C1C" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "2px", padding: "10px 14px", marginBottom: "20px", fontSize: "13px", color: "#166534" }}>
          {success}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required style={inputStyle} placeholder="Dr Jane Smith" />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="jane@practice.com" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={inputStyle} placeholder="Min. 8 characters" />
        </div>
        <div>
          <label style={labelStyle}>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ ...inputStyle, appearance: "none" as const }}>
            <option value="editor">Editor</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 24px", backgroundColor: "#1A2E24", color: "#FAFAF8",
          border: "none", borderRadius: "2px", cursor: loading ? "not-allowed" : "pointer",
          fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: "var(--font-sans)", fontWeight: 600, opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Adding…" : "Add user"}
      </button>
    </form>
  );
}
