"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#1a1a2e", border: "2px solid #3d3d5c", borderBottom: "4px solid #000", padding: 40, textAlign: "center", maxWidth: 400, width: "100%" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: "#ffd700", marginBottom: 8 }}>
          ADMIN ACCESS
        </div>
        <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 32, lineHeight: 1.6 }}>
          Only the portfolio owner can enter this area.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/admin" })}
          style={{ width: "100%", background: "#e8272b", color: "#fff", border: "none", borderBottom: "4px solid #8b0000", padding: "14px 24px", fontFamily: "'Press Start 2P', monospace", fontSize: 9, cursor: "pointer" }}>
          ▶ LOGIN WITH GITHUB
        </button>
      </div>
    </main>
  );
}