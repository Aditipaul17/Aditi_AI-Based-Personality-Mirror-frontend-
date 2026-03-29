/* ═══════════════════ SHARED COMPONENTS ═══════════════════ */

function TraitBar({ value, color, label, pct, delay = 0 }) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => { const t = setTimeout(() => setW(value), 120 + delay); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{pct}</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: w + "%", background: color, borderRadius: 99, transition: "width .85s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function ScaleBtn({ value, selected, onClick }) {
  return (
    <button onClick={() => onClick(value)} style={{
      width: 48, height: 48, borderRadius: "50%",
      border: selected ? `2px solid ${S.accent}` : `2px solid ${S.border}`,
      background: selected ? "rgba(124,92,252,.22)" : S.surface2,
      color: selected ? S.text : S.muted,
      fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700,
      cursor: "pointer", transition: "all .18s",
      transform: selected ? "scale(1.18)" : "scale(1)"
    }}>{value}</button>
  );
}

/* ════════════════ BFS VISUALISER ════════════════ */
function BFSVisualiser({ result, userScores }) {
  if (!result) return null;
  const { levels, visited, distance, path, matched } = result;

  const traitColors = {
    openness: S.accent, conscientiousness: S.accent2,
    extraversion: S.green, agreeableness: S.accent4, neuroticism: S.accent3, start: S.muted
  };

  const avDists = Object.entries(AVATARS).map(([k, av]) => ({
    key: k, av, dist: Math.round(euclidean(userScores, av.traits))
  })).sort((a, b) => a.dist - b.dist);

  return (
    <div style={{
      background: "rgba(124,92,252,.06)", border: `1px solid rgba(124,92,252,.18)`,
      borderRadius: 16, padding: "22px 24px", marginTop: 20
    }} className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>🔬</span>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: S.accent }}>
            BFS Algorithm — Trait-Space Exploration
          </div>
          <div style={{ fontSize: 11, color: S.muted, marginTop: 2 }}>
            Explored <strong style={{ color: S.text }}>{visited}</strong> trait-nodes across{" "}
            <strong style={{ color: S.text }}>{levels}</strong> BFS levels — matched in{" "}
            <strong style={{ color: S.accent }}>{distance} units</strong> distance
          </div>
        </div>
      </div>

      {path.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: S.muted, textTransform: "uppercase" }}>Path:</span>
          {path.map((step, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
              background: `${traitColors[step] || S.muted}18`,
              border: `1px solid ${traitColors[step] || S.muted}44`,
              color: traitColors[step] || S.muted,
              animation: `bfsNode .35s ${i * 0.07}s both`
            }}>{step === "start" ? "📍 start" : step}</span>
          ))}
        </div>
      )}

      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".12em", color: S.muted, textTransform: "uppercase", marginBottom: 10 }}>
        BFS Distance to Each Archetype
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {avDists.map(({ key, av, dist }, i) => {
          const isMatch = key === matched;
          const barW = Math.max(8, 100 - dist);
          return (
            <div key={key} style={{
              background: isMatch ? "rgba(124,92,252,.14)" : S.surface2,
              border: `1px solid ${isMatch ? "rgba(124,92,252,.4)" : S.border}`,
              borderRadius: 10, padding: "10px 12px",
              animation: `bfsNode .4s ${i * 0.06}s both`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13 }}>{av.emoji}</span>
                {isMatch && <span style={{ fontSize: 9, fontWeight: 700, color: S.accent, background: "rgba(124,92,252,.18)", padding: "2px 7px", borderRadius: 20, border: `1px solid rgba(124,92,252,.35)` }}>MATCHED</span>}
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>{av.name}</div>
              <div style={{ fontSize: 10, color: S.muted, marginBottom: 6 }}>dist: {dist}</div>
              <div style={{ height: 3, background: "rgba(255,255,255,.05)", borderRadius: 99 }}>
                <div style={{
                  height: "100%", width: barW + "%", borderRadius: 99,
                  background: isMatch ? `linear-gradient(90deg,${S.accent},${S.accent2})` : "rgba(255,255,255,.15)",
                  transition: "width .8s ease"
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(255,255,255,.03)", borderRadius: 10, fontSize: 11, color: S.muted, lineHeight: 1.7 }}>
        <strong style={{ color: S.text }}>How BFS works here:</strong> Your trait scores form a point in 5-dimensional space.
        BFS expands outward in steps of ±{BFS_STEP} per trait, visiting {Math.pow(10, 1).toFixed(0)}+ neighbour nodes per level,
        until it finds an archetype within threshold distance {BFS_THRESHOLD}. This guarantees the <em style={{ color: S.accent }}>nearest archetype</em> is found — not just a greedy best-fit.
      </div>
    </div>
  );
}

/* ════════════════ SIDEBAR ════════════════ */
function Sidebar({ page, navigate, profile, currentAvatar, currentUser, onSignOut }) {
  const displayName = currentUser?.name || "Guest";
  const initials    = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <aside style={{
      width: 228, flexShrink: 0, background: S.surface, borderRight: `1px solid ${S.border}`,
      display: "flex", flexDirection: "column", padding: "22px 0", overflowY: "auto"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px 26px" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg,${S.accent},${S.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🪞</div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, background: `linear-gradient(90deg,${S.accent},${S.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mirror.ai</span>
      </div>

      {[
        { label: "Overview", items: [
          { icon: "⬡", text: "Dashboard", page: "dashboard" },
          { icon: "✦", text: "Take Quiz", page: "quiz" },
          { icon: "⚡", text: "5-Min Mirror Check", page: "quicktest" },
          { icon: "📓", text: "Journal Entry", page: "journal" },
        ]},
        { label: "Results", items: [
          { icon: "◈", text: "My Profile", page: "profile" },
          { icon: "◷", text: "History", page: "history" },
        ]},
        { label: "Explore", items: [
          { icon: "✳", text: "Compatibility", page: "coming" },
          { icon: "△", text: "AI Insights", page: "coming" },
        ]}
      ].map(section => (
        <div key={section.label} style={{ padding: "0 10px", marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".12em", color: S.muted, textTransform: "uppercase", padding: "6px 10px 10px" }}>{section.label}</div>
          {section.items.map(item => (
            <button key={item.text} onClick={() => navigate(item.page)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
              borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 500, width: "100%",
              textAlign: "left", border: "none",
              background: page === item.page ? "rgba(124,92,252,.15)" : "none",
              color: page === item.page ? S.accent : S.muted,
              transition: "all .16s"
            }}>
              <span style={{ width: 18, textAlign: "center" }}>{item.icon}</span> {item.text}
            </button>
          ))}
        </div>
      ))}

      {/* User footer */}
      <div style={{ marginTop: "auto", padding: "14px 12px 0", borderTop: `1px solid ${S.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 12px" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: profile
              ? `linear-gradient(135deg,${S.accent},${S.accent2})`
              : `linear-gradient(135deg,${S.accent},${S.accent2})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: profile ? 18 : 12, fontWeight: 800, color: "white",
            fontFamily: "'Syne',sans-serif",
          }}>
            {profile ? profile.emoji : initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</div>
            <div style={{ fontSize: 11, color: S.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {profile ? `${profile.mbti} · ${profile.name}` : "Pick an avatar ✦"}
            </div>
          </div>
        </div>
        <button onClick={onSignOut} style={{
          width: "100%", padding: "8px 0", borderRadius: 9, border: `1px solid ${S.border}`,
          background: "none", color: S.muted, fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
          transition: "all .16s", marginBottom: 8,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(252,92,156,.4)"; e.currentTarget.style.color = S.accent2; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.muted; }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
