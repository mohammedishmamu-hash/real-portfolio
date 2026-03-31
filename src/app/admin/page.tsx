"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

type Project = {
  id: string;
  world: string;
  icon: string;
  title: string;
  company: string;
  type: string;
  description: string;
  tags: string[];
  stat: string;
  featured: boolean;
};

const emptyForm = {
  world: "", icon: "", title: "", company: "",
  type: "work", description: "", tags: "", stat: "", featured: false
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"projects" | "messages">("projects");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects);
  }

  async function fetchMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages || []);
  }

  async function handleSubmit() {
    if (!form.title || !form.description) return;
    setLoading(true);
    const payload = { ...form, tags: form.tags.split(",").map((t: string) => t.trim()) };

    if (editing) {
      await fetch(`/api/projects/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setForm(emptyForm);
    setEditing(null);
    setLoading(false);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function toggleFeatured(project: Project) {
    await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured }),
    });
    fetchProjects();
  }

  function startEdit(project: Project) {
    setEditing(project.id);
    setForm({ ...project, tags: project.tags.join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputStyle = {
    width: "100%", background: "#0f0f1a", border: "1px solid #3d3d5c",
    borderRadius: 6, padding: "8px 12px", fontSize: 13, color: "#fff",
    fontFamily: "inherit", outline: "none", marginBottom: 10
  };

  const labelStyle = {
    fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4,
    fontFamily: "'Press Start 2P', monospace"
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0f0f1a", padding: "24px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#ffd700" }}>
          ⚡ ADMIN
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })}
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, background: "transparent", color: "#ef4444", border: "1px solid #ef444440", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}>
          SIGN OUT
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {[
          { key: "projects", label: "📁 PROJECTS" },
          { key: "messages", label: "✉ MESSAGES" }
        ].map((tab) => (
          <button key={tab.key}
            onClick={() => { setView(tab.key as any); if (tab.key === "messages") fetchMessages(); }}
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, padding: "8px 16px", background: view === tab.key ? "#e8272b" : "#1a1a2e", color: view === tab.key ? "#fff" : "#6b7280", border: "1px solid", borderColor: view === tab.key ? "#8b0000" : "#3d3d5c", borderBottom: `3px solid ${view === tab.key ? "#5a0000" : "#1a1a2e"}`, cursor: "pointer" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {view === "projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, maxWidth: 1100 }}>

          {/* Form */}
          <div style={{ background: "#1a1a2e", border: "1px solid #3d3d5c", borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700", marginBottom: 20 }}>
              {editing ? "✏ EDIT PROJECT" : "+ ADD PROJECT"}
            </div>

            <label style={labelStyle}>WORLD</label>
            <input style={inputStyle} placeholder="WORK 1-1" value={form.world}
              onChange={(e) => setForm({ ...form, world: e.target.value })} />

            <label style={labelStyle}>ICON</label>
            <input style={inputStyle} placeholder="🏦" value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })} />

            <label style={labelStyle}>TITLE</label>
            <input style={inputStyle} placeholder="PROJECT TITLE" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <label style={labelStyle}>COMPANY</label>
            <input style={inputStyle} placeholder="Company · City" value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })} />

            <label style={labelStyle}>TYPE</label>
            <select style={inputStyle} value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="work">Work</option>
              <option value="school">School</option>
            </select>

            <label style={labelStyle}>DESCRIPTION</label>
            <textarea style={{ ...inputStyle, height: 80, resize: "none" }} placeholder="Project description..."
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <label style={labelStyle}>TAGS (comma separated)</label>
            <input style={inputStyle} placeholder="React, Node.js, AWS" value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })} />

            <label style={labelStyle}>STAT</label>
            <input style={inputStyle} placeholder="35% perf boost" value={form.stat}
              onChange={(e) => setForm({ ...form, stat: e.target.value })} />

            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <input type="checkbox" checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              FEATURED
            </label>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleSubmit} disabled={loading}
                style={{ flex: 1, background: "#e8272b", color: "#fff", border: "none", borderBottom: "3px solid #8b0000", padding: "10px", fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: "pointer" }}>
                {loading ? "SAVING..." : editing ? "▶ UPDATE" : "▶ ADD"}
              </button>
              {editing && (
                <button onClick={() => { setForm(emptyForm); setEditing(null); }}
                  style={{ background: "#2d2d44", color: "#9ca3af", border: "1px solid #3d3d5c", borderRadius: 6, padding: "10px 14px", fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: "pointer" }}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Projects list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700", marginBottom: 8 }}>
              {projects.length} PROJECTS
            </div>
            {projects.map((p) => (
              <div key={p.id} style={{ background: "#1a1a2e", border: "1px solid #3d3d5c", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#ffd700", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#a78bfa" }}>{p.company}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{ fontSize: 10, padding: "1px 6px", background: "#0f0f1a", color: "#60a5fa", border: "1px solid #3b82f620" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => toggleFeatured(p)}
                    style={{ fontSize: 10, padding: "4px 8px", background: p.featured ? "#ffd70020" : "#2d2d44", color: p.featured ? "#ffd700" : "#6b7280", border: `1px solid ${p.featured ? "#ffd70040" : "#3d3d5c"}`, borderRadius: 4, cursor: "pointer" }}>
                    {p.featured ? "★ FEATURED" : "☆ FEATURE"}
                  </button>
                  <button onClick={() => startEdit(p)}
                    style={{ fontSize: 10, padding: "4px 8px", background: "#2d2d44", color: "#60a5fa", border: "1px solid #3b82f620", borderRadius: 4, cursor: "pointer" }}>
                    ✏ EDIT
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    style={{ fontSize: 10, padding: "4px 8px", background: "#2d2d44", color: "#ef4444", border: "1px solid #ef444420", borderRadius: 4, cursor: "pointer" }}>
                    🗑 DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "messages" && (
        <div style={{ maxWidth: 800 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700", marginBottom: 16 }}>
            {messages.length} MESSAGES
          </div>
          {messages.length === 0 ? (
            <div style={{ color: "#6b7280", fontSize: 13 }}>No messages yet.</div>
          ) : (
            messages.map((m, i) => (
              <div key={i} style={{ background: "#1a1a2e", border: "1px solid #3d3d5c", borderRadius: 10, padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700" }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{new Date(m.created_at).toLocaleDateString()}</div>
                </div>
                <div style={{ fontSize: 12, color: "#a78bfa", marginBottom: 8 }}>{m.email}</div>
                <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>{m.message}</div>
              </div>
            ))
          )}
        </div>
      )}

    </main>
  );
}