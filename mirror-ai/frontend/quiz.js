/* ═══════════════════ PAGE: QUIZ ═══════════════════ */

function PageQuiz({ currentQ, setCurrentQ, quizAnswers, setQuizAnswers, finishQuiz }) {
  return (
    <div className="fade-up">
      <div style={{ padding: "20px 30px", background: S.surface, borderBottom: `1px solid ${S.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800 }}>Personality Quiz</span>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "36px 30px", width: "100%" }}>
        <div style={{ background: "rgba(124,92,252,.08)", border: `1px solid rgba(124,92,252,.2)`, borderRadius: 12, padding: "12px 18px", marginBottom: 24, fontSize: 12, fontWeight: 600, color: S.accent }}>
          📋 Full Quiz — 10 questions · BFS trait-space matching algorithm
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.muted, marginBottom: 10 }}>
            <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round((currentQ + 1) / QUIZ_QUESTIONS.length * 100)}% complete</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,.07)", borderRadius: 99 }}>
            <div style={{ height: "100%", width: ((currentQ + 1) / QUIZ_QUESTIONS.length * 100) + "%", background: `linear-gradient(90deg,${S.accent},${S.accent2})`, borderRadius: 99, transition: "width .5s ease" }} />
          </div>
        </div>
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 20, padding: 34, marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: S.accent, textTransform: "uppercase", marginBottom: 12 }}>Question {QUIZ_QUESTIONS[currentQ].n} · {QUIZ_QUESTIONS[currentQ].trait}</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700, lineHeight: 1.55, marginBottom: 30 }}>{QUIZ_QUESTIONS[currentQ].text}</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: S.muted, marginBottom: 10 }}><span>Strongly Disagree</span><span>Strongly Agree</span></div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {[1, 2, 3, 4, 5].map(v => <ScaleBtn key={v} value={v} selected={quizAnswers[currentQ] === v} onClick={val => setQuizAnswers(a => ({ ...a, [currentQ]: val }))} />)}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} style={{ background: S.surface2, border: `1px solid ${S.border}`, color: S.muted, padding: "10px 22px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>← Previous</button>
          <button onClick={() => { if (currentQ < QUIZ_QUESTIONS.length - 1) setCurrentQ(q => q + 1); else finishQuiz(); }}
            style={{ background: `linear-gradient(135deg,${S.accent},${S.accent2})`, border: "none", color: "white", padding: "11px 28px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            {currentQ === QUIZ_QUESTIONS.length - 1 ? "Run BFS Match ✦" : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}
