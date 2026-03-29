/* ═══════════════════ PAGE: DASHBOARD ═══════════════════ */

function PageDashboard({ navigate, profile, currentAvatar, bfsResult, historyLog, selectAvatar }) {
  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>Dashboard</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ background: "rgba(124,92,252,.18)", color: S.accent, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: `1px solid rgba(124,92,252,.3)` }}>BFS Powered</span>
          <button onClick={() => navigate("quiz")} style={{ background: S.text, color: S.bg, border: "none", padding: "9px 18px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>New Analysis ✦</button>
        </div>
      </div>
      <div style={{ padding: "26px 30px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { label: "Analyses Done", value: historyLog.length || "0", color: S.accent, sub: historyLog.length ? `↑ ${historyLog.length} total` : "Start your first analysis" },
            { label: "Dominant Trait", value: profile?.dominant || "—", color: S.accent2, sub: profile ? `${profile.dominantPct}% score` : "pick an avatar" },
            { label: "Personality Type", value: profile?.mbti || "—", color: S.accent3, sub: profile?.name || "pick an avatar" },
            { label: "BFS Levels", value: bfsResult ? `L${bfsResult.levels}` : "—", color: S.accent4, sub: bfsResult ? `${bfsResult.visited} nodes explored` : "pick an avatar" },
          ].map((s, i) => (
            <div key={i} className="pop-in" style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22 }}>
              <div style={{ fontSize: 11, color: S.muted, fontWeight: 500, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 5 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: S.muted }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Mid grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14, marginBottom: 22 }}>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: S.muted, textTransform: "uppercase", marginBottom: 18 }}>Big Five Snapshot</div>
            {profile ? TRAITS.map((t, i) => (
              <TraitBar key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} value={profile.traits[t]} pct={profile.traits[t] + "%"}
                color={[S.accent, S.accent2, S.green, S.accent4, S.accent3][i]} delay={i * 100} />
            )) : (
              <div style={{ color: S.muted, fontSize: 13, textAlign: "center", padding: "24px 0" }}>Complete a quiz or pick an avatar to see your Big Five traits</div>
            )}
          </div>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: S.muted, textTransform: "uppercase", marginBottom: 16 }}>Choose Your Avatar</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
              {Object.entries(AVATARS).map(([key, av]) => (
                <div key={key} onClick={() => selectAvatar(key)} style={{
                  background: currentAvatar === key ? "rgba(124,92,252,.1)" : S.surface2,
                  border: `1px solid ${currentAvatar === key ? S.accent : S.border}`,
                  borderRadius: 14, padding: "14px 10px", textAlign: "center", cursor: "pointer", transition: "all .18s"
                }}>
                  <div style={{ fontSize: 30, marginBottom: 7 }}>{av.emoji}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{av.name}</div>
                  <div style={{ fontSize: 10, color: S.muted }}>{av.dominant}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BFS Visualiser */}
        {bfsResult && profile && <BFSVisualiser result={bfsResult} userScores={profile.traits} />}

        {/* Recent */}
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22, marginTop: 22 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: S.muted, textTransform: "uppercase", marginBottom: 16 }}>Recent Analyses</div>
          {historyLog.length === 0 ? (
            <div style={{ color: S.muted, fontSize: 13, textAlign: "center", padding: "20px 0" }}>No analyses yet — take a quiz, quick check, or write a journal entry ✦</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {historyLog.slice(0, 3).map((e, i) => (
                <div key={i} onClick={() => navigate("history")} style={{
                  background: S.surface2, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, cursor: "pointer", transition: "all .18s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>{e.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: `rgba(124,92,252,.18)`, color: S.accent }}>{e.badgeLabel}</span>
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: S.muted }}>{e.mbti} · {e.traitPct}% {e.trait}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
