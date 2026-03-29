/* ═══════════════════ PAGE: COMING SOON ═══════════════════ */

function PageComing({ navigate }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, minHeight: "70vh", textAlign: "center", padding: 30 }}>
      <div style={{ fontSize: 54 }}>🚧</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800 }}>Coming Soon</div>
      <div style={{ color: S.muted }}>We're building something amazing. Check back soon!</div>
      <button onClick={() => navigate("dashboard")} style={{ background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: "12px 28px", borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: "pointer", marginTop: 8 }}>← Back to Dashboard</button>
    </div>
  );
}
