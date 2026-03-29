/* ═══════════════════ ROOT APP — State & Routing ═══════════════════ */

function MirrorAI() {
  const { useState, useEffect, useRef, useCallback } = React;

  /* ── Auth state ── */
  const [currentUser, setCurrentUser] = useState(null);

  function handleAuth(user) {
    setCurrentUser(user);
    history.replaceState(null, "", "./");
    setPage("dashboard");
  }

  function handleSignOut() {
    setCurrentUser(null);
    setCurrentAvatar(null);
    setCurrentProfile(null);
    setBfsResult(null);
    setHistoryLog([]);
    history.replaceState(null, "", "./");
  }

  // Support deep-linking via URL hash (e.g. /#quiz, /#profile).
  // The per-page .html stubs redirect here with the correct hash.
  const validPages = ["dashboard","quiz","quicktest","journal","profile","history","coming"];
  const hashPage = location.hash.replace(/^#/, "");
  const [page, setPage] = useState(validPages.includes(hashPage) ? hashPage : "dashboard");
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [historyLog, setHistoryLog] = useState([]);
  const [bfsResult, setBfsResult] = useState(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const [qqCurrent, setQqCurrent] = useState(0);
  const [qqAnswers, setQqAnswers] = useState({});
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [quickResult, setQuickResult] = useState(null);

  const [journalText, setJournalText] = useState("");
  const [journalAnalysis, setJournalAnalysis] = useState(null);

  const [histFilter, setHistFilter] = useState("all");
  const [histSearch, setHistSearch] = useState("");

  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2800);
  }

  function navigate(p) {
    setPage(p);
    // Keep the browser URL hash in sync so bookmarking and the
    // back-button work correctly without a server round-trip.
    history.replaceState(null, "", p === "dashboard" ? "./" : "#" + p);
    if (p === "quiz") { setCurrentQ(0); setQuizAnswers({}); }
    if (p === "quicktest") { setQqCurrent(0); setQqAnswers({}); setShowAffirmation(false); setQuickResult(null); }
  }

  // Sync page state when the user clicks the browser back/forward buttons.
  useEffect(() => {
    function onHashChange() {
      const validPages = ["dashboard","quiz","quicktest","journal","profile","history","coming"];
      const h = location.hash.replace(/^#/, "");
      setPage(validPages.includes(h) ? h : "dashboard");
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function nowTime() {
    return new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function computeScoresFromAnswers(answers, questions) {
    const scores = { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 };
    const counts = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 };
    questions.forEach((q, i) => {
      const key = q.trait?.toLowerCase() || "openness";
      if (scores[key] !== undefined) {
        scores[key] += ((answers[i] || 3) - 1) * 12.5;
        counts[key]++;
      }
    });
    for (const k in scores) scores[k] = Math.min(97, Math.max(20, Math.round(scores[k])));
    return scores;
  }

  function applyAvatarToGlobal(avKey, avData, bfs, histEntry) {
    setCurrentAvatar(avKey);
    setCurrentProfile(avData);
    setBfsResult(bfs);
    setHistoryLog(prev => {
      const next = [{ ...histEntry, date: new Date() }, ...prev];
      return next;
    });
    showToast(`${avData.emoji} ${avData.name} · ${avData.mbti} — BFS matched in ${bfs.levels} levels!`);
  }

  function finishQuiz() {
    const userScores = computeScoresFromAnswers(quizAnswers, QUIZ_QUESTIONS);
    const bfs = bfsMatch(userScores, AVATARS);
    const av = AVATARS[bfs.matched];
    const merged = {};
    for (const k of TRAITS) merged[k] = Math.round((av.traits[k] + userScores[k]) / 2);
    const result = { ...av, traits: merged };
    applyAvatarToGlobal(bfs.matched, result, bfs, {
      type: "quiz", icon: "📋", badgeClass: "quiz", badgeLabel: "Quiz",
      title: "Personality Quiz", meta: nowTime() + " · 10 questions · BFS matched",
      mbti: av.mbti, trait: av.dominant, traitPct: merged[av.dominant.toLowerCase()] || av.dominantPct
    });
    setPage("profile");
  }

  function finishQuickTest() {
    const vals = Object.values(qqAnswers);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
    const userScores = {
      openness: avg >= 3.5 ? 80 : 50,
      conscientiousness: avg >= 3.0 ? 65 : 45,
      extraversion: avg <= 2.5 ? 35 : 60,
      agreeableness: avg >= 3.5 ? 82 : 55,
      neuroticism: avg >= 4.0 ? 60 : 38
    };
    const bfs = bfsMatch(userScores, AVATARS);
    const av = AVATARS[bfs.matched];
    setQuickResult({ av, bfs });
    setShowAffirmation(true);
    applyAvatarToGlobal(bfs.matched, av, bfs, {
      type: "quick", icon: "⚡", badgeClass: "quick", badgeLabel: "Quick Test",
      title: "5-Min Mirror Check", meta: nowTime() + " · 5 questions · BFS matched",
      mbti: av.mbti, trait: av.dominant, traitPct: av.dominantPct
    });
  }

  function analyseJournal() {
    const text = journalText.trim();
    if (text.length < 40) { showToast("✏️ Please write a bit more — aim for 50+ words!"); return; }
    const lower = text.toLowerCase();
    const sc = { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 };
    if (/wonder|imagine|dream|creat|art|beauty|explor|curious|discover|inspir|new|learn|read/.test(lower)) sc.openness += 22;
    if (/plan|goal|work|focus|organis|accomplish|finish|deadline|schedule|responsib|complet/.test(lower)) sc.conscientiousness += 22;
    if (/friend|party|talk|laugh|social|people|fun|energy|excit|crowd|meet|gather/.test(lower)) sc.extraversion += 22;
    if (/alone|quiet|tired|exhaust|solitud|peace|rest|recharge|introvert/.test(lower)) sc.extraversion -= 15;
    if (/care|help|kind|love|family|grateful|hug|support|understand|listen|compas/.test(lower)) sc.agreeableness += 22;
    if (/anxious|worry|stress|fear|sad|overwhelm|cry|upset|nervous|fail|lost|mistak/.test(lower)) sc.neuroticism += 22;
    if (/calm|peace|happy|joy|content|relax|grateful|fine|good|okay|bliss/.test(lower)) sc.neuroticism -= 12;
    for (const k in sc) sc[k] = Math.min(97, Math.max(20, sc[k]));
    const bfs = bfsMatch(sc, AVATARS);
    const av = AVATARS[bfs.matched];
    const merged = {};
    for (const k of TRAITS) merged[k] = Math.round((av.traits[k] + sc[k]) / 2);
    setJournalAnalysis({ av: { ...av, traits: merged }, bfs, userScores: sc });
  }

  function saveJournalAndGoToProfile() {
    if (!journalAnalysis) return;
    const { av, bfs } = journalAnalysis;
    const words = journalText.trim().split(/\s+/).length;
    applyAvatarToGlobal(bfs.matched, av, bfs, {
      type: "journal", icon: "📓", badgeClass: "journal", badgeLabel: "Journal",
      title: "Journal Entry", meta: nowTime() + " · " + words + " words · BFS matched",
      mbti: av.mbti, trait: av.dominant, traitPct: av.traits[av.dominant.toLowerCase()] || av.dominantPct
    });
    setJournalText(""); setJournalAnalysis(null);
    setPage("profile");
  }

  function selectAvatar(key) {
    const av = AVATARS[key];
    const bfs = bfsMatch(av.traits, AVATARS);
    applyAvatarToGlobal(key, av, bfs, {
      type: "quiz", icon: "🪞", badgeClass: "quiz", badgeLabel: "Manual",
      title: "Avatar Selected: " + av.name, meta: nowTime() + " · manual pick",
      mbti: av.mbti, trait: av.dominant, traitPct: av.dominantPct
    });
  }

  const profile = currentProfile || (currentAvatar ? AVATARS[currentAvatar] : null);

  /* ── Auth gate ── */
  if (!currentUser) return <PageAuth onAuth={handleAuth} />;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: S.bg }}>
      <style>{css}</style>

      <Sidebar page={page} navigate={navigate} profile={profile} currentAvatar={currentAvatar} currentUser={currentUser} onSignOut={handleSignOut} />

      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: S.bg }}>

        {page === "dashboard" && (
          <PageDashboard
            navigate={navigate}
            profile={profile}
            currentAvatar={currentAvatar}
            bfsResult={bfsResult}
            historyLog={historyLog}
            selectAvatar={selectAvatar}
          />
        )}

        {page === "quiz" && (
          <PageQuiz
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            finishQuiz={finishQuiz}
          />
        )}

        {page === "quicktest" && (
          <PageQuickTest
            qqCurrent={qqCurrent}
            setQqCurrent={setQqCurrent}
            qqAnswers={qqAnswers}
            setQqAnswers={setQqAnswers}
            showAffirmation={showAffirmation}
            quickResult={quickResult}
            finishQuickTest={finishQuickTest}
            navigate={navigate}
          />
        )}

        {page === "journal" && (
          <PageJournal
            journalText={journalText}
            setJournalText={setJournalText}
            journalAnalysis={journalAnalysis}
            analyseJournal={analyseJournal}
            saveJournalAndGoToProfile={saveJournalAndGoToProfile}
          />
        )}

        {page === "profile" && (
          <PageProfile
            navigate={navigate}
            profile={profile}
            bfsResult={bfsResult}
          />
        )}

        {page === "history" && (
          <PageHistory
            navigate={navigate}
            historyLog={historyLog}
            histFilter={histFilter}
            setHistFilter={setHistFilter}
            histSearch={histSearch}
            setHistSearch={setHistSearch}
          />
        )}

        {page === "coming" && (
          <PageComing navigate={navigate} />
        )}

      </main>

      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          background: S.surface, border: `1px solid rgba(124,92,252,.4)`,
          borderRadius: 14, padding: "14px 22px", fontSize: 13, fontWeight: 600, color: S.text,
          zIndex: 999, whiteSpace: "nowrap", animation: "fadeUp .4s ease both",
          boxShadow: "0 8px 32px rgba(0,0,0,.4)"
        }}>{toast}</div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MirrorAI />);
