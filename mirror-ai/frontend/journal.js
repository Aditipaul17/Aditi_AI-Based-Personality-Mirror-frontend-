/* ═══════════════════ PAGE: JOURNAL ═══════════════════ */

function PageJournal({ journalText, setJournalText, journalAnalysis, analyseJournal, saveJournalAndGoToProfile }) {
  return (
    <div className="fade-up">
      <div style={{ padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>Journal Entry</span>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "36px 30px" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Write freely. We listen. ✦</h2>
        <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.75, marginBottom: 24 }}>Write today's journal entry in your own words. Our BFS algorithm explores your word patterns to find your nearest personality archetype in trait-space.</p>
        <textarea value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="Dear journal… Write freely about your day, thoughts, feelings, or anything on your mind…" rows={8}
          style={{ width: "100%", background: S.surface, border: `1px solid ${S.border}`, borderRadius: 14, padding: 18, color: S.text, fontFamily: "'DM Sans',sans-serif", fontSize: 14, resize: "vertical", outline: "none", lineHeight: 1.75 }} />
        <div style={{ textAlign: "right", fontSize: 11, color: S.muted, marginTop: 6, marginBottom: 22 }}>
          {journalText.length} chars · {journalText.trim() ? journalText.trim().split(/\s+/).length : 0} words
        </div>
        <button onClick={analyseJournal} style={{ width: "100%", background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: 14, borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 4 }}>
          Run BFS Analysis ✦
        </button>
        {journalAnalysis && (
          <div className="fade-up" style={{ background: S.surface, border: `1px solid rgba(124,92,252,.22)`, borderRadius: 16, padding: 24, marginTop: 22 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: S.accent, marginBottom: 16 }}>✦ BFS Journal Analysis</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: S.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>Detected Type</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: S.accent }}>{journalAnalysis.av.mbti}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: S.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>BFS Info</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: S.accent2 }}>Level {journalAnalysis.bfs.levels} · {journalAnalysis.bfs.visited} nodes</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.75, marginBottom: 18 }}>{journalAnalysis.av.strength}</div>
            <BFSVisualiser result={journalAnalysis.bfs} userScores={journalAnalysis.userScores} />
            <button onClick={saveJournalAndGoToProfile} style={{ width: "100%", background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: 13, borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 18 }}>
              Save & View Full Profile →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
