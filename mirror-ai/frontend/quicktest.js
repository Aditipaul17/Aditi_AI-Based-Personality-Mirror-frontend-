/* ═══════════════════ PAGE: QUICK TEST ═══════════════════ */

function PageQuickTest({ qqCurrent, setQqCurrent, qqAnswers, setQqAnswers, showAffirmation, quickResult, finishQuickTest, navigate }) {
  return (
    <div className="fade-up">
      <div style={{ padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>5-Min Mirror Check ⚡</span>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "36px 30px" }}>
        <div style={{ background: "rgba(252,92,156,.08)", border: `1px solid rgba(252,92,156,.2)`, borderRadius: 12, padding: "12px 18px", marginBottom: 24, fontSize: 12, fontWeight: 600, color: S.accent2 }}>
          ⚡ Quick Check — 5 questions · instant BFS match + personal affirmation
        </div>
        {!showAffirmation ? (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.muted, marginBottom: 10 }}>
                <span>Question {qqCurrent + 1} of {QUICK_QUESTIONS.length}</span>
                <span>{Math.round((qqCurrent + 1) / QUICK_QUESTIONS.length * 100)}% complete</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,.07)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: ((qqCurrent + 1) / QUICK_QUESTIONS.length * 100) + "%", background: `linear-gradient(90deg,${S.accent2},${S.accent})`, borderRadius: 99, transition: "width .5s ease" }} />
              </div>
            </div>
            <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 20, padding: 34, marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: S.accent2, textTransform: "uppercase", marginBottom: 12 }}>Question {QUICK_QUESTIONS[qqCurrent].n} · Quick Reflection</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700, lineHeight: 1.55, marginBottom: 30 }}>{QUICK_QUESTIONS[qqCurrent].text}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: S.muted, marginBottom: 10 }}><span>Strongly Disagree</span><span>Strongly Agree</span></div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {[1, 2, 3, 4, 5].map(v => <ScaleBtn key={v} value={v} selected={qqAnswers[qqCurrent] === v} onClick={val => setQqAnswers(a => ({ ...a, [qqCurrent]: val }))} />)}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setQqCurrent(q => Math.max(0, q - 1))} style={{ background: S.surface2, border: `1px solid ${S.border}`, color: S.muted, padding: "10px 22px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>← Previous</button>
              <button onClick={() => { if (qqCurrent < QUICK_QUESTIONS.length - 1) setQqCurrent(q => q + 1); else finishQuickTest(); }}
                style={{ background: `linear-gradient(135deg,${S.accent2},${S.accent})`, border: "none", color: "white", padding: "11px 28px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {qqCurrent === QUICK_QUESTIONS.length - 1 ? "Reveal My Mirror ✦" : "Next →"}
              </button>
            </div>
          </>
        ) : quickResult && (
          <div className="fade-up" style={{ background: `linear-gradient(135deg,rgba(124,92,252,.12),rgba(252,92,156,.08))`, border: `1px solid rgba(124,92,252,.25)`, borderRadius: 18, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>{quickResult.av.emoji}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: S.accent, marginBottom: 4 }}>{quickResult.av.mbti}</div>
            <div style={{ fontSize: 14, color: S.muted, marginBottom: 20 }}>{quickResult.av.name} · BFS matched in {quickResult.bfs.levels} levels, {quickResult.bfs.visited} nodes</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", color: S.accent, textTransform: "uppercase", marginBottom: 10 }}>✨ Your Personal Affirmation</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.6, marginBottom: 22 }}>{quickResult.av.affirmation}</div>
            <button onClick={() => navigate("profile")} style={{ background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: "13px 32px", borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}>See My Full Profile →</button>
          </div>
        )}
      </div>
    </div>
  );
}
