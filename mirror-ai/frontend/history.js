/* ═══════════════════ PAGE: HISTORY ═══════════════════ */

function PageHistory({ navigate, historyLog, histFilter, setHistFilter, histSearch, setHistSearch }) {
  return (
    <div className="fade-up">
      <div style={{ padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>History</span>
      </div>
      <div style={{ padding: "26px 30px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
          {["all","quiz","journal","quick"].map(f => (
            <button key={f} onClick={() => setHistFilter(f)} style={{
              padding: "8px 16px", borderRadius: 99, border: `1px solid ${histFilter === f ? "rgba(124,92,252,.5)" : S.border}`,
              background: histFilter === f ? "rgba(124,92,252,.12)" : S.surface,
              color: histFilter === f ? S.accent : S.muted, fontSize: 12, fontWeight: 600, cursor: "pointer"
            }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
          <input value={histSearch} onChange={e => setHistSearch(e.target.value.toLowerCase())} placeholder="🔍  Search analyses…"
            style={{ marginLeft: "auto", background: S.surface, border: `1px solid ${S.border}`, borderRadius: 10, padding: "8px 16px", color: S.text, fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", width: 200 }} />
        </div>
        {historyLog.filter(e => (histFilter === "all" || e.type === histFilter) && (!histSearch || JSON.stringify(e).toLowerCase().includes(histSearch))).length === 0 ? (
          <div style={{ textAlign: "center", padding: 48, color: S.muted }}><div style={{ fontSize: 36, marginBottom: 12 }}>◷</div>No analyses yet!</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {historyLog.filter(e => (histFilter === "all" || e.type === histFilter) && (!histSearch || JSON.stringify(e).toLowerCase().includes(histSearch))).map((e, i) => {
              const typeColor = { quiz: S.accent, journal: S.accent3, quick: S.accent2 };
              return (
                <div key={i} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 14, padding: "18px 22px", display: "grid", gridTemplateColumns: "48px 1fr auto", alignItems: "center", gap: 18, cursor: "pointer", transition: "all .18s" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(124,92,252,.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{e.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: "rgba(124,92,252,.18)", color: S.accent, display: "inline-block", marginBottom: 5 }}>{e.badgeLabel}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: S.muted }}>{e.meta}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: typeColor[e.type] || S.accent }}>{e.mbti}</div>
                    <div style={{ fontSize: 11, color: S.muted }}>{e.traitPct}% {e.trait}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
