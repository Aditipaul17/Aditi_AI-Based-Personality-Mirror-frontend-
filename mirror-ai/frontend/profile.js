/* ═══════════════════ PAGE: PROFILE ═══════════════════ */

function PageProfile({ navigate, profile, bfsResult }) {
  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>My Profile</span>
      </div>
      <div style={{ padding: "26px 30px" }}>
        {!profile ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: S.muted }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🪞</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No profile yet</div>
            <div style={{ marginBottom: 20 }}>Complete a quiz or pick an avatar on the dashboard</div>
            <button onClick={() => navigate("quiz")} style={{ background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: "12px 28px", borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, cursor: "pointer" }}>Take Quiz →</button>
          </div>
        ) : (
          <>
            <div style={{ borderRadius: 20, padding: "36px 40px", marginBottom: 22, background: "linear-gradient(135deg,#1A1230 0%,#0F0F1A 60%,#1A1020 100%)", border: `1px solid rgba(124,92,252,.2)`, position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28, position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 68 }}>{profile.emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 48, fontWeight: 800, background: `linear-gradient(135deg,${S.accent},${S.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 4 }}>{profile.mbti}</div>
                  <div style={{ fontSize: 15, color: S.muted, marginBottom: 14 }}>{profile.mbtiLabel}</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {profile.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 20, border: `1px solid rgba(255,255,255,.1)`, color: S.muted }}>{t}</span>)}
                  </div>
                  {bfsResult && <div style={{ marginTop: 12, fontSize: 11, color: S.accent, fontWeight: 600 }}>🔬 BFS matched in {bfsResult.levels} levels · {bfsResult.visited} nodes explored · distance {bfsResult.distance}</div>}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
              {[
                { icon: "🎯", title: "Core Strength", text: profile.strength },
                { icon: "🌱", title: "Growth Edge",   text: profile.growth },
                { icon: "💼", title: "Career Fit",    text: profile.career },
              ].map(c => (
                <div key={c.title} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 22 }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: S.muted, lineHeight: 1.75 }}>{c.text}</div>
                </div>
              ))}
            </div>

            <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: 26, marginBottom: 22 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: S.muted, textTransform: "uppercase", marginBottom: 20 }}>Big Five Deep Dive</div>
              {TRAITS.map((t, i) => (
                <TraitBar key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} value={profile.traits[t]} pct={profile.traits[t] + "%"}
                  color={[S.accent, S.accent2, S.green, S.accent4, S.accent3][i]} delay={i * 100} />
              ))}
            </div>

            {bfsResult && <BFSVisualiser result={bfsResult} userScores={profile.traits} />}
          </>
        )}
      </div>
    </div>
  );
}
