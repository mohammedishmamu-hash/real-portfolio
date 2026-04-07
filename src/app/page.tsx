"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Download } from "lucide-react";

const stats = [
  { num: "12+", label: "Projects" },
  { num: "3+", label: "Years XP" },
  { num: "8+", label: "Technologies" },
];

const navLinks = ["Projects", "Skills", "Contact"];

export default function Home() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<any | null>(null);

  React.useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects.map((p: any) => ({ ...p, desc: p.description }))));
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
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>Real quests completed — at work and at university.</p>

          <ProjectsWithFilter projects={projects} onSelect={setSelectedProject} />
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
              { icon: FaGithub, label: "GITHUB", href: "https://github.com/busyma" },
              { icon: FaLinkedin, label: "LINKEDIN", href: "https://linkedin.com/in/mohammad-ishmam-uddin" },
              { icon: MdEmail, label: "EMAIL", href: "mailto:mohammedishmamu@gmail.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#fff", textDecoration: "none" }}>
                <Icon size={12} />{label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      <AIChatbot />
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
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, padding: "10px 18px", background: primary ? "#e8272b" : "#ffd700", color: primary ? "#fff" : "#1a1a2e", borderBottom: `4px solid ${primary ? "#8b0000" : "#b8860b"}`, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
      {children}
    </a>
  );
}

function ProjectCard({ world, icon, title, company, type, desc, tags, stat, featured, index, onClick }: {
  world: string; icon: string; title: string; company: string; type: string;
  desc: string; tags: string[]; stat: string; featured?: boolean; index: number; onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.08 }} whileHover={{ y: -4 }}
      style={{ background: "#2d2d44", border: "2px solid #3d3d5c", borderBottom: "4px solid #1a1a2e", padding: 18, cursor: "pointer", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6b7280", marginBottom: 4 }}>{world}</div>
        <div style={{ fontSize: 28 }}>{icon}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        {/* Featured badge */}
        {featured && (
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: "#ffd70020", color: "#ffd700", border: "1px solid #ffd70040", padding: "2px 6px" }}>
            ★ FEATURED
          </div>
        )}
        {/* Work/School badge */}
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: type === "work" ? "#e8272b20" : "#5c94fc20", color: type === "work" ? "#e8272b" : "#5c94fc", border: `1px solid ${type === "work" ? "#e8272b40" : "#5c94fc40"}`, padding: "3px 8px" }}>
          {type === "work" ? "WORK" : "SCHOOL"}
        </div>
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
      <div style={{ marginTop: "auto", paddingTop: 10 }}>
        <div style={{ display: "inline-block", fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: "#ffd70015", color: "#ffd700", border: "1px solid #ffd70030", padding: "3px 8px" }}>
          ★ {stat}
        </div>
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
  const [errors, setErrors] = React.useState({ name: false, email: false, message: false });
  const [shake, setShake] = React.useState({ name: false, email: false, message: false });

  const triggerShake = (field: "name" | "email" | "message") => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => setShake((prev) => ({ ...prev, [field]: false })), 500);
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !form.name,
      email: !form.email,
      message: !form.message,
    };
    setErrors(newErrors);
    Object.keys(newErrors).forEach((f) => {
      if (newErrors[f as keyof typeof newErrors]) triggerShake(f as "name" | "email" | "message");
    });
    if (Object.values(newErrors).some(Boolean)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      res.ok ? (setStatus("success"), setForm({ name: "", email: "", message: "" }), setErrors({ name: false, email: false, message: false })) : setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#00a800", marginBottom: 8 }}>MESSAGE SENT!</div>
      <p style={{ fontSize: 12, color: "#6b7280" }}>I'll get back to you soon.</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }`}</style>
      {(["name", "email", "message"] as const).map((field) => (
        <FormField
          key={field}
          field={field}
          value={form[field]}
          error={errors[field]}
          shaking={shake[field]}
          placeholder={field === "name" ? "Your name" : field === "email" ? "your@email.com" : "What's on your mind?"}
          multiline={field === "message"}
          onChange={(val) => {
            setForm({ ...form, [field]: val });
            if (val) setErrors({ ...errors, [field]: false });
          }}
        />
      ))}
      {status === "error" && <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#e8272b" }}>✗ FAILED. TRY AGAIN.</p>}
      <button onClick={handleSubmit} disabled={status === "loading"}
        style={{ width: "100%", background: status === "loading" ? "#999" : "#e8272b", color: "#fff", border: "none", borderBottom: `4px solid ${status === "loading" ? "#666" : "#8b0000"}`, padding: "12px", fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
        {status === "loading" ? "SENDING..." : "▶ SEND MESSAGE"}
      </button>
    </div>
  );
}

function FormField({ field, value, error, shaking, placeholder, multiline, onChange }: {
  field: string; value: string; error: boolean; shaking: boolean;
  placeholder: string; multiline?: boolean; onChange: (val: string) => void;
}) {
  const inputStyle = {
    width: "100%", border: `2px solid ${error ? "#e8272b" : "#111827"}`,
    padding: "8px 12px", fontSize: 13, outline: "none",
    background: error ? "#fff5f5" : "#f9fafb", fontFamily: "inherit",
    animation: shaking ? "shake 0.5s ease" : "none",
    ...(multiline && { height: 96, resize: "none" as const }),
  };

  return (
    <div>
      {multiline
        ? <textarea style={inputStyle} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input style={inputStyle} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      }
      {error && <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#e8272b", margin: "2px 0 4px" }}>✗ {field.toUpperCase()} IS REQUIRED</p>}
    </div>
  );
}

function VisitorScore() {
  const [mounted, setMounted] = React.useState(false);
  const [count, setCount] = React.useState<number | null>(null);
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMounted(true);
    fetch("/api/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count));
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects));
  }, []);

  const score = projects.reduce((total, p) => {
    return total + (p.type === "work" ? 12 : 8);
  }, 0);

  if (!mounted) return (
    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#fff", textAlign: "right", lineHeight: 2, opacity: 0 }}>
      <div>SCORE</div>
      <div>......</div>
      <div>★ × ...</div>
      <div>👁 × ....</div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#fff", textAlign: "right", lineHeight: 2 }}
    >
      <div>SCORE</div>
      <div>{String(score).padStart(6, "0")}</div>
      <div>★ × {projects.length}</div>
      <div style={{ color: "#ffd700" }}>
        👁 × {count !== null ? String(count).padStart(4, "0") : "...."}
      </div>
    </motion.div>
  );
}

function ProjectsWithFilter({ projects, onSelect }: { projects: any[]; onSelect: (p: any) => void }) {
  const [filter, setFilter] = React.useState<"all" | "featured" | "work" | "school">("all");

  const filters = [
    { key: "all", label: "ALL" },
    { key: "featured", label: "★ FEATURED" },
    { key: "work", label: "WORK" },
    { key: "school", label: "SCHOOL" },
  ] as const;

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured === true;
    return p.type === filter;
  });

  return (
    <div>
      {/* Filter buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              padding: "8px 14px",
              background: filter === f.key ? "#e8272b" : "#2d2d44",
              color: filter === f.key ? "#fff" : "#9ca3af",
              border: "2px solid",
              borderColor: filter === f.key ? "#8b0000" : "#3d3d5c",
              borderBottom: `3px solid ${filter === f.key ? "#5a0000" : "#1a1a2e"}`,
              cursor: "pointer",
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Project count */}
      <p style={{ color: "#6b7280", fontSize: 11, marginBottom: 16, fontFamily: "'Press Start 2P', monospace" }}>
        {filtered.length} QUEST{filtered.length !== 1 ? "S" : ""} FOUND
      </p>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <div style={{ color: "#6b7280", fontFamily: "'Press Start 2P', monospace", fontSize: 9, padding: "32px 0" }}>
          NO QUESTS FOUND
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 960 }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id || i} {...p} index={i} onClick={() => onSelect(p)} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#1a1a2e", border: "2px solid #3d3d5c", borderBottom: "4px solid #000", padding: 32, maxWidth: 560, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>

        {/* Close button */}
        <button onClick={onClose}
          style={{ position: "absolute", top: 12, right: 12, background: "#e8272b", color: "#fff", border: "none", borderBottom: "3px solid #8b0000", width: 32, height: 32, fontFamily: "'Press Start 2P', monospace", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          x
        </button>

        {/* World + badges row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, marginTop: 32 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6b7280" }}>{project.world}</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            {project.featured && (
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: "#ffd70020", color: "#ffd700", border: "1px solid #ffd70040", padding: "2px 6px" }}>★ FEATURED</div>
            )}
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, background: project.type === "work" ? "#e8272b20" : "#5c94fc20", color: project.type === "work" ? "#e8272b" : "#5c94fc", border: `1px solid ${project.type === "work" ? "#e8272b40" : "#5c94fc40"}`, padding: "3px 8px" }}>
              {project.type === "work" ? "WORK" : "SCHOOL"}
            </div>
          </div>
        </div>

        {/* Icon + title */}
        <div style={{ fontSize: 48, marginBottom: 12 }}>{project.icon}</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: "#ffd700", lineHeight: 1.6, marginBottom: 8 }}>{project.title}</div>
        <div style={{ fontSize: 12, color: "#a78bfa", fontStyle: "italic", marginBottom: 20 }}>{project.company}</div>

        {/* Divider */}
        <div style={{ height: 1, background: "#3d3d5c", marginBottom: 20 }} />

        {/* Description */}
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6b7280", marginBottom: 10 }}>ABOUT THIS PROJECT</div>
        <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.8, marginBottom: 24 }}>{project.desc}</p>

        {/* Tags */}
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#6b7280", marginBottom: 10 }}>TECH STACK</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {project.tags.map((t: string) => (
            <span key={t} style={{ fontSize: 11, padding: "4px 12px", background: "#0f0f1a", color: "#60a5fa", border: "1px solid #3b82f620" }}>{t}</span>
          ))}
        </div>

        {/* Stat */}
        <div style={{ display: "inline-block", fontFamily: "'Press Start 2P', monospace", fontSize: 8, background: "#ffd70015", color: "#ffd700", border: "1px solid #ffd70030", padding: "6px 12px" }}>
          ★ {project.stat}
        </div>

      </motion.div>
    </motion.div>
  );
}

function AIChatbot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hi! I'm Mohammed's AI assistant. Ask me anything about his experience, skills, or projects! 🍄"
      }]);
    }
  }, [open]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again!" }]);
    }
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const suggestedQuestions = [
    "What's Mohammed's experience?",
    "What tech stack does he use?",
    "Is he open to work?",
  ];

  return (
    <>
      {/* Chat window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ position: "fixed", bottom: 90, right: 24, width: 340, height: 480, background: "#1a1a2e", border: "2px solid #3d3d5c", borderBottom: "4px solid #000", display: "flex", flexDirection: "column", zIndex: 999, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>

          {/* Header */}
          <div style={{ background: "#0f0f1a", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #3d3d5c" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 20 }}>🤖</div>
              <div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#ffd700" }}>ASK ME ANYTHING</div>
                <div style={{ fontSize: 10, color: "#00a800", marginTop: 2 }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              style={{ background: "#e8272b", color: "#fff", border: "none", borderBottom: "2px solid #8b0000", width: 28, height: 28, fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              x
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                maxWidth: "80%",
                padding: "8px 12px",
                background: m.role === "user" ? "#e8272b" : "#2d2d44",
                color: m.role === "assistant" ? "#ffd700" : "#fff",
                fontSize: 12,
                fontFamily: "inherit",
                lineHeight: 1.6,
                border: `1px solid ${m.role === "user" ? "#8b0000" : "#ffd70030"}`,
                borderBottom: `2px solid ${m.role === "user" ? "#5a0000" : "#ffd70015"}`,
              }}>
                {m.content}
              </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "8px 12px", background: "#2d2d44", border: "1px solid #3d3d5c", borderBottom: "2px solid #1a1a2e" }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#6b7280" }}>THINKING...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions — only show when just greeting */}
          {messages.length === 1 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
              {suggestedQuestions.map((q) => (
                <button key={q} onClick={() => { setInput(q); }}
                  style={{ background: "#0f0f1a", color: "#60a5fa", border: "1px solid #3b82f620", padding: "6px 10px", fontSize: 11, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 12, borderTop: "1px solid #3d3d5c", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Mohammed..."
              style={{ flex: 1, background: "#0f0f1a", border: "1px solid #3d3d5c", padding: "8px 10px", color: "#fff", fontSize: 12, outline: "none", fontFamily: "inherit" }}
            />
            <button onClick={sendMessage} disabled={loading}
              style={{ background: loading ? "#555" : "#e8272b", color: "#fff", border: "none", borderBottom: `2px solid ${loading ? "#333" : "#8b0000"}`, padding: "8px 12px", fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: loading ? "not-allowed" : "pointer" }}>
              ▶
            </button>
          </div>
        </motion.div>
      )}

      {/* Floating bubble button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, background: open ? "#2d2d44" : "#e8272b", border: "none", borderBottom: `4px solid ${open ? "#1a1a2e" : "#8b0000"}`, borderRadius: 0, cursor: "pointer", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
        {open ? "✕" : "🤖"}
      </motion.button>
    </>
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