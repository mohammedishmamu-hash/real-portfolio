"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, ExternalLink, Download } from "lucide-react";

const stats = [
  { num: "12+", label: "Projects" },
  { num: "3+", label: "Years XP" },
  { num: "8+", label: "Technologies" },
];

const navLinks = ["Projects", "Skills", "Contact"];

export default function Home() {
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects));
  }, []);
  
  return (
    <main style={{ minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background: "#5c94fc", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 32, left: 64, opacity: 0.9 }}><Cloud /></div>
        <div style={{ position: "absolute", top: 56, right: 96, opacity: 0.8 }}><Cloud /></div>
        <div style={{ position: "absolute", top: 24, left: "50%", opacity: 0.7 }}><Cloud /></div>

        <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#fff", textShadow: "2px 2px 0 #000" }}>
            MIU.
          </motion.div>
          <div style={{ display: "flex", gap: 32 }}>
            {navLinks.map((link) => (
              <motion.a key={link} href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ color: "#fff", fontSize: 10, textDecoration: "none", cursor: "pointer", fontFamily: "'Press Start 2P', monospace", textShadow: "1px 1px 0 #000" }}>
                {link}
              </motion.a>
            ))}
          </div>
          <VisitorScore />
        </nav>

        <div style={{ position: "relative", zIndex: 10, padding: "24px 32px 0", display: "flex", alignItems: "flex-end", gap: 24 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 64, marginBottom: 4, userSelect: "none" }}>🧑‍💻
          </motion.div>
          <div style={{ flex: 1, paddingBottom: 24 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#fff", marginBottom: 8 }}>
              PLAYER 1 — 
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 22, color: "#ffd700", textShadow: "2px 2px 0 #b8860b, 4px 4px 0 #000", lineHeight: 1.5, marginBottom: 12 }}>
              Mohammed Ishmam Uddin
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ color: "#fff", fontSize: 13, marginBottom: 24, lineHeight: 1.6, maxWidth: 500 }}>
              Full-Stack Developer · PHP · Laravel · Vue.js · AWS · C#<br />
              Surrey, BC · Always ready to code 🍄
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <PixelButton href="#projects" primary>▶ VIEW WORK</PixelButton>
              <PixelButton href="/cv.pdf">
                <Download size={12} style={{ display: "inline", marginRight: 4 }} />DOWNLOAD RESUME
              </PixelButton>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 12, padding: "12px 32px", background: "#c84b11", borderTop: "4px solid #e8722a" }}>
          {["?", "🧱", "?", "?", "🧱", "?"].map((b, i) => (
            <Block key={i} question={b === "?"} label={b} />
          ))}
          <span style={{ color: "#fff", fontSize: 12, marginLeft: 8, opacity: 0.7 }}>Scroll to explore ↓</span>
          <div style={{ display: "flex", gap: 24, marginLeft: "auto" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: "#ffd700" }}>{s.num}</div>
                <div style={{ color: "#fff", fontSize: 11, opacity: 0.7, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ background: "#1a1a2e", padding: "64px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, background: "#e8272b", color: "#fff", display: "inline-block", padding: "4px 12px", marginBottom: 12, borderBottom: "3px solid #8b0000" }}>
            WORLD SELECT
          </div>
          <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#ffd700", textShadow: "1px 1px 0 #000", marginBottom: 6 }}>
            PROJECTS
          </h2>
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 32 }}>Real quests completed — at work and at university.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 960 }}>
            {projects.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
          </div>
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: "#0f0f1a", padding: "64px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#ffd700", marginBottom: 6 }}>SKILL TREE</h2>
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 32 }}>Every block is a power-up I've collected.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 80px)", gap: 10, marginBottom: 40 }}>
            {skills.map((s, i) => <SkillBlock key={i} {...s} />)}
          </div>
          <div style={{ maxWidth: 440 }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#6b7280", marginBottom: 16 }}>XP LEVELS</div>
            {xpBars.map((x, i) => <XPBar key={i} {...x} />)}
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "#5c94fc", padding: "64px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 480 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#fff", marginBottom: 8 }}>INSERT COIN TO CONTINUE</div>
          <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#ffd700", marginBottom: 24 }}>SEND A MESSAGE</h2>
          <div style={{ background: "#fff", padding: 24, border: "3px solid #1a1a2e", boxShadow: "4px 4px 0 #1a1a2e" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "#e8272b", marginBottom: 4 }}>NEW MESSAGE</div>
            <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 20 }}>Got a project? A job offer? Just say hi.</p>
            <ContactForm />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
            {[
              { icon: GitBranch, label: "GITHUB", href: "https://github.com/busyma" },
              { icon: ExternalLink, label: "LINKEDIN", href: "https://linkedin.com/in/mohammad-ishmam-uddin" },
              { icon: ExternalLink, label: "EMAIL", href: "mailto:mohammedishmamu@gmail.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#fff", textDecoration: "none" }}>
                <Icon size={12} />{label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

    </main>
  );
}

/* ── COMPONENTS ── */

function Cloud() {
  return (
    <div style={{ position: "relative", userSelect: "none", pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 60, height: 20, background: "white", borderRadius: 4, top: 10, left: 10 }} />
      <div style={{ position: "absolute", width: 30, height: 20, background: "white", borderRadius: 4, top: 0, left: 15 }} />
      <div style={{ position: "absolute", width: 25, height: 20, background: "white", borderRadius: 4, top: 2, left: 30 }} />
      <div style={{ width: 80, height: 30 }} />
    </div>
  );
}

function Block({ question, label }: { question: boolean; label: string }) {
  return (
    <motion.div whileHover={{ y: -4 }}
      style={{ width: 34, height: 34, background: question ? "#ffd700" : "#e8a020", border: "2px solid", borderColor: question ? "#b8860b" : "#c87810", borderBottom: `4px solid ${question ? "#7a5c00" : "#8b5a00"}`, borderRight: `3px solid ${question ? "#b8860b" : "#c87810"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Press Start 2P', monospace", fontSize: 12, cursor: "pointer", userSelect: "none", flexShrink: 0 }}>
      {label}
    </motion.div>
  );
}

function PixelButton({ children, href, primary }: { children: React.ReactNode; href?: string; primary?: boolean }) {
  return (
    <a href={href}
      download={href === "/cv.pdf" ? "Mohammed_Ishmam_Uddin_CV.pdf" : undefined}
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, padding: "10px 18px", background: primary ? "#e8272b" : "#ffd700", color: primary ? "#fff" : "#1a1a2e", borderBottom: `4px solid ${primary ? "#8b0000" : "#b8860b"}`, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
      {children}
    </a>
  );
}

function ProjectCard({ world, icon, title, company, type, desc, tags, stat, index }: {
  world: string; icon: string; title: string; company: string; type: string; desc: string; tags: string[]; stat: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.08 }} whileHover={{ y: -4 }}
      style={{ background: "#2d2d44", border: "2px solid #3d3d5c", borderBottom: "4px solid #1a1a2e", padding: 18, cursor: "pointer", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6b7280", marginBottom: 4 }}>{world}</div>
          <div style={{ fontSize: 28 }}>{icon}</div>
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: type === "work" ? "#e8272b20" : "#5c94fc20", color: type === "work" ? "#e8272b" : "#5c94fc", border: `1px solid ${type === "work" ? "#e8272b40" : "#5c94fc40"}`, padding: "3px 8px" }}>
          {type === "work" ? "WORK" : "SCHOOL"}
        </div>
      </div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#ffd700", marginBottom: 4, lineHeight: 1.6 }}>{title}</div>
      <div style={{ fontSize: 11, color: "#a78bfa", marginBottom: 8, fontStyle: "italic" }}>{company}</div>
      <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12, lineHeight: 1.6 }}>{desc}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {tags.map((t) => (
          <span key={t} style={{ fontSize: 10, padding: "2px 8px", background: "#1a1a2e", color: "#60a5fa", border: "1px solid #3b82f620" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "inline-block", fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: "#ffd70015", color: "#ffd700", border: "1px solid #ffd70030", padding: "3px 8px" }}>
        ★ {stat}
      </div>
    </motion.div>
  );
}

function SkillBlock({ icon, name, color }: { icon: string; name: string; color: string }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.05 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 6px", cursor: "pointer", textAlign: "center", background: color, border: "2px solid rgba(0,0,0,0.3)", borderBottom: "4px solid rgba(0,0,0,0.4)" }}>
      <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#fff", lineHeight: 1.4 }}>{name}</div>
    </motion.div>
  );
}

function XPBar({ name, value }: { name: string; value: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <span style={{ color: "#d1d5db", fontSize: 12, minWidth: 130 }}>{name}</span>
      <div style={{ flex: 1, height: 10, background: "#2d2d44", border: "1px solid #3d3d5c" }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }} style={{ height: "100%", background: "#ffd700" }} />
      </div>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#ffd700", minWidth: 30 }}>{value}%</span>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#00a800", marginBottom: 8 }}>
          MESSAGE SENT!
        </div>
        <p style={{ fontSize: 12, color: "#6b7280" }}>I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        style={{ width: "100%", border: "2px solid #111827", padding: "8px 12px", fontSize: 13, outline: "none", background: "#f9fafb", fontFamily: "inherit" }}
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={{ width: "100%", border: "2px solid #111827", padding: "8px 12px", fontSize: 13, outline: "none", background: "#f9fafb", fontFamily: "inherit" }}
        placeholder="your@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        style={{ width: "100%", border: "2px solid #111827", padding: "8px 12px", fontSize: 13, outline: "none", background: "#f9fafb", height: 96, resize: "none", fontFamily: "inherit" }}
        placeholder="What's on your mind?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {status === "error" && (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#e8272b" }}>
          ✗ FAILED. TRY AGAIN.
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        style={{ width: "100%", background: status === "loading" ? "#999" : "#e8272b", color: "#fff", border: "none", borderBottom: `4px solid ${status === "loading" ? "#666" : "#8b0000"}`, padding: "12px", fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
        {status === "loading" ? "SENDING..." : "▶ SEND MESSAGE"}
      </button>
    </div>
  );
}

function VisitorScore() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#fff", textAlign: "right", lineHeight: 2 }}
    >
      <div>SCORE</div>
      <div>008450</div>
      <div>★ × 12</div>
      <div style={{ color: "#ffd700" }}>
        👁 × {count !== null ? String(count).padStart(4, "0") : "...."}
      </div>
    </motion.div>
  );
}

/* ── DATA ── */

const skills = [
  { icon: "🐘", name: "PHP", color: "#7c3aed" },
  { icon: "🔶", name: "LARAVEL", color: "#e8272b" },
  { icon: "💚", name: "VUE.JS", color: "#00a800" },
  { icon: "⚛️", name: "REACT", color: "#e8a020" },
  { icon: "🔷", name: "C#", color: "#5c94fc" },
  { icon: "🐍", name: "PYTHON", color: "#e8a020" },
  { icon: "☁️", name: "AWS", color: "#e8722a" },
  { icon: "🗄️", name: "SQL", color: "#5c94fc" },
  { icon: "🐙", name: "GIT", color: "#00a800" },
  { icon: "🔥", name: "CI/CD", color: "#e8272b" },
];

const xpBars = [
  { name: "PHP / Laravel", value: 90 },
  { name: "Vue.js", value: 85 },
  { name: "C# / .NET", value: 78 },
  { name: "Python / ML", value: 74 },
  { name: "AWS / Cloud", value: 70 },
  { name: "SQL", value: 82 },
];