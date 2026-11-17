"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GripVertical } from "lucide-react";

type SectionKind = "paragraph" | "heading" | "pullquote" | "list";
interface Section { kind: SectionKind; text?: string; items?: string[] }

interface ArticleEditorProps {
  articleId?: string;
  initial?: {
    slug: string; dept: string; deptSlug: string; title: string; excerpt: string;
    author: string; authorRole: string; date: string; readTime: string; issue: string;
    published: boolean; body: Section[];
  };
}

const depts = [
  { label: "Editor's Note",    slug: "editors-note" },
  { label: "Case of the Week", slug: "case-of-the-week" },
  { label: "Lab Note",         slug: "lab-note" },
  { label: "Software Note",    slug: "software-note" },
  { label: "Evidence Note",    slug: "evidence-note" },
  { label: "Practice Note",    slug: "practice-note" },
];

const inputStyle = {
  width: "100%", padding: "10px 12px", boxSizing: "border-box" as const,
  backgroundColor: "#fff", border: "1px solid #D8D6D1", borderRadius: "2px",
  color: "#1A2E24", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none",
};
const labelStyle = {
  display: "block", fontSize: "10px", letterSpacing: "0.08em",
  textTransform: "uppercase" as const, color: "#7A8C84", marginBottom: "5px",
  fontFamily: "var(--font-sans)",
};

export default function ArticleEditor({ articleId, initial }: ArticleEditorProps) {
  const router = useRouter();
  const isEdit = !!articleId;

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [dept, setDept] = useState(initial?.dept ?? "Editor's Note");
  const [deptSlug, setDeptSlug] = useState(initial?.deptSlug ?? "editors-note");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Finn");
  const [authorRole, setAuthorRole] = useState(initial?.authorRole ?? "Clinical Director, Okklusion");
  const [date, setDate] = useState(initial?.date ?? new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min");
  const [issue, setIssue] = useState(initial?.issue ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [body, setBody] = useState<Section[]>(initial?.body ?? [{ kind: "paragraph", text: "" }]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function selectDept(label: string) {
    const found = depts.find(d => d.label === label);
    setDept(label);
    setDeptSlug(found?.slug ?? "");
  }

  function slugify(val: string) {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function addSection(kind: SectionKind) {
    const newSection: Section = kind === "list"
      ? { kind, items: [""] }
      : { kind, text: "" };
    setBody(b => [...b, newSection]);
  }

  function updateSection(i: number, patch: Partial<Section>) {
    setBody(b => b.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }

  function removeSection(i: number) {
    setBody(b => b.filter((_, idx) => idx !== i));
  }

  function updateListItem(sectionIdx: number, itemIdx: number, val: string) {
    setBody(b => b.map((s, i) => {
      if (i !== sectionIdx || s.kind !== "list") return s;
      const items = [...(s.items ?? [])];
      items[itemIdx] = val;
      return { ...s, items };
    }));
  }

  function addListItem(sectionIdx: number) {
    setBody(b => b.map((s, i) => {
      if (i !== sectionIdx || s.kind !== "list") return s;
      return { ...s, items: [...(s.items ?? []), ""] };
    }));
  }

  function removeListItem(sectionIdx: number, itemIdx: number) {
    setBody(b => b.map((s, i) => {
      if (i !== sectionIdx || s.kind !== "list") return s;
      return { ...s, items: (s.items ?? []).filter((_, j) => j !== itemIdx) };
    }));
  }

  async function handleSave(asDraft = false) {
    setError(""); setSaving(true);
    const payload = { slug, dept, deptSlug, title, excerpt, author, authorRole, date, readTime, issue, published: asDraft ? false : published, body };
    try {
      const res = await fetch(isEdit ? `/api/cms/articles/${articleId}` : "/api/cms/articles", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      router.push("/cms/articles");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "2px", padding: "10px 14px", marginBottom: "20px", fontSize: "13px", color: "#B91C1C" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>

        {/* Main form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (!isEdit) setSlug(slugify(e.target.value));
              }}
              required style={{ ...inputStyle, fontSize: "18px", fontFamily: "var(--font-serif)", fontWeight: 300 }}
              placeholder="Article title…"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt / standfirst *</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              required
              rows={3}
              style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
              placeholder="1–2 sentence summary shown on the editorial index…"
            />
          </div>

          {/* Body sections */}
          <div>
            <label style={{ ...labelStyle, marginBottom: "12px" }}>Article body</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {body.map((section, i) => (
                <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", backgroundColor: "#F9F8F5", borderBottom: "1px solid #E5E3DE" }}>
                    <GripVertical size={12} style={{ color: "#B0B0A8" }} />
                    <select
                      value={section.kind}
                      onChange={e => updateSection(i, { kind: e.target.value as SectionKind })}
                      style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", border: "none", background: "none", color: "#7A8C84", cursor: "pointer", outline: "none", fontFamily: "var(--font-sans)" }}
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="heading">Heading</option>
                      <option value="pullquote">Pullquote</option>
                      <option value="list">List</option>
                    </select>
                    <div style={{ flex: 1 }} />
                    <button onClick={() => removeSection(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#B0B0A8", padding: "2px" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div style={{ padding: "12px" }}>
                    {section.kind === "list" ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {(section.items ?? []).map((item, j) => (
                          <div key={j} style={{ display: "flex", gap: "6px" }}>
                            <input
                              value={item}
                              onChange={e => updateListItem(i, j, e.target.value)}
                              style={{ ...inputStyle, flex: 1 }}
                              placeholder={`Item ${j + 1}…`}
                            />
                            <button onClick={() => removeListItem(i, j)} style={{ background: "none", border: "none", cursor: "pointer", color: "#B0B0A8", padding: "4px 8px" }}>
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addListItem(i)}
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#7A8C84", background: "none", border: "1px dashed #D8D6D1", borderRadius: "2px", padding: "6px 12px", cursor: "pointer", marginTop: "2px" }}
                        >
                          <Plus size={11} /> Add item
                        </button>
                      </div>
                    ) : (
                      <textarea
                        value={section.text ?? ""}
                        onChange={e => updateSection(i, { text: e.target.value })}
                        rows={section.kind === "paragraph" ? 4 : section.kind === "pullquote" ? 3 : 2}
                        style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.7,
                          fontStyle: section.kind === "pullquote" ? "italic" : "normal",
                          fontSize: section.kind === "heading" ? "16px" : "14px",
                          fontFamily: section.kind === "heading" || section.kind === "pullquote" ? "var(--font-serif)" : "var(--font-sans)",
                        }}
                        placeholder={
                          section.kind === "paragraph" ? "Paragraph text…" :
                          section.kind === "heading" ? "Section heading…" :
                          "Pullquote text…"
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add section buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
              {(["paragraph", "heading", "pullquote", "list"] as SectionKind[]).map(kind => (
                <button
                  key={kind}
                  onClick={() => addSection(kind)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase",
                    color: "#7A8C84", backgroundColor: "#fff", border: "1px solid #D8D6D1",
                    borderRadius: "2px", padding: "6px 12px", cursor: "pointer",
                  }}
                >
                  <Plus size={10} /> {kind}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Publish */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "20px" }}>
            <h3 style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#1A2E24", fontWeight: 600, marginBottom: "16px" }}>Publish</h3>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginBottom: "16px" }}>
              <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} style={{ width: "15px", height: "15px" }} />
              <span style={{ fontSize: "13px", color: "#1A2E24" }}>Visible on site</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                style={{ padding: "10px", backgroundColor: "#1A2E24", color: "#FAFAF8", border: "none", borderRadius: "2px", cursor: saving ? "not-allowed" : "pointer", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create article"}
              </button>
              {!isEdit && (
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  style={{ padding: "10px", backgroundColor: "transparent", color: "#7A8C84", border: "1px solid #D8D6D1", borderRadius: "2px", cursor: saving ? "not-allowed" : "pointer", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Save as draft
                </button>
              )}
            </div>
          </div>

          {/* Department */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "20px" }}>
            <h3 style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#1A2E24", fontWeight: 600, marginBottom: "16px" }}>Department</h3>
            <select value={dept} onChange={e => selectDept(e.target.value)} style={{ ...inputStyle, appearance: "none" as const }}>
              {depts.map(d => <option key={d.slug} value={d.label}>{d.label}</option>)}
            </select>
          </div>

          {/* Meta */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #E5E3DE", borderRadius: "3px", padding: "20px" }}>
            <h3 style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#1A2E24", fontWeight: 600, marginBottom: "16px" }}>Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Author</label>
                <input value={author} onChange={e => setAuthor(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Author role</label>
                <input value={authorRole} onChange={e => setAuthorRole(e.target.value)} style={inputStyle} placeholder="e.g. Clinical Director" />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input value={date} onChange={e => setDate(e.target.value)} style={inputStyle} placeholder="e.g. 1 January 2026" />
              </div>
              <div>
                <label style={labelStyle}>Read time</label>
                <input value={readTime} onChange={e => setReadTime(e.target.value)} style={inputStyle} placeholder="e.g. 5 min" />
              </div>
              <div>
                <label style={labelStyle}>Issue</label>
                <input value={issue} onChange={e => setIssue(e.target.value)} style={inputStyle} placeholder="e.g. Issue 5" />
              </div>
              <div>
                <label style={labelStyle}>URL slug</label>
                <input value={slug} onChange={e => setSlug(slugify(e.target.value))} style={{ ...inputStyle, fontFamily: "monospace", fontSize: "12px" }} placeholder="article-url-slug" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
