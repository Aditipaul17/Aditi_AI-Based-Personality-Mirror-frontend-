/* ═══════════════════ PAGE: AUTH (Login / Sign Up) ═══════════════════
   Standalone auth gate rendered before the main SPA.
   State managed by MirrorAI root via props:
     - authMode   : "login" | "signup"
     - setAuthMode: toggle between the two forms
     - onAuth     : called with { name, email } when form submits
                    (no real backend — simulates auth in-memory)
═══════════════════════════════════════════════════════════════════ */

function PageAuth({ onAuth }) {
  const [mode, setMode]           = React.useState("login");   // "login" | "signup"
  const [name, setName]           = React.useState("");
  const [email, setEmail]         = React.useState("");
  const [password, setPassword]   = React.useState("");
  const [showPass, setShowPass]   = React.useState(false);
  const [error, setError]         = React.useState("");
  const [loading, setLoading]     = React.useState(false);
  const [focusField, setFocusField] = React.useState(null);

  /* ── Simulated in-memory user store ── */
  const STORAGE_KEY = "mirrorai_users";
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  }
  function saveUser(u) {
    const users = getUsers();
    users[u.email.toLowerCase()] = u;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (mode === "signup" && !name.trim()) return "Your name is required.";
    return null;
  }

  function handleSubmit() {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const users = getUsers();
      const key   = email.toLowerCase();

      if (mode === "signup") {
        if (users[key]) {
          setError("An account with this email already exists. Try logging in.");
          setLoading(false);
          return;
        }
        const user = { name: name.trim(), email: key };
        saveUser(user);
        onAuth(user);
      } else {
        const user = users[key];
        if (!user) {
          setError("No account found. Sign up first!");
          setLoading(false);
          return;
        }
        onAuth(user);
      }
      setLoading(false);
    }, 820); // brief simulated network delay
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  /* ── Input style helper ── */
  function inputStyle(field) {
    return {
      width: "100%",
      background: focusField === field ? "rgba(124,92,252,.08)" : S.surface2,
      border: `1.5px solid ${focusField === field ? S.accent : error && !field ? "rgba(252,92,156,.5)" : S.border}`,
      borderRadius: 12,
      padding: "13px 16px",
      color: S.text,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      outline: "none",
      transition: "all .2s",
      WebkitAppearance: "none",
    };
  }

  const orbs = [
    { size: 340, top: "-80px",  left: "-100px", color: "rgba(124,92,252,.13)" },
    { size: 260, bottom: "-60px", right: "-60px", color: "rgba(252,92,156,.10)" },
    { size: 180, top: "40%",   left: "55%",    color: "rgba(92,244,252,.07)" },
  ];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: S.bg, padding: 20, position: "relative", overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          top: o.top, left: o.left, right: o.right, bottom: o.bottom,
          pointerEvents: "none",
        }} />
      ))}

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(124,92,252,.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,92,252,.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />

      {/* Card */}
      <div className="fade-up" style={{
        width: "100%", maxWidth: 420, position: "relative", zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 16, marginBottom: 14,
            background: `linear-gradient(135deg, ${S.accent}, ${S.accent2})`,
            fontSize: 26, boxShadow: `0 8px 32px rgba(124,92,252,.4)`,
          }}>🪞</div>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800,
            background: `linear-gradient(90deg, ${S.accent}, ${S.accent2})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 6,
          }}>Mirror.ai</div>
          <div style={{ fontSize: 13, color: S.muted }}>
            {mode === "login" ? "Welcome back — your reflection awaits." : "Discover who you truly are."}
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 20,
          padding: "32px 30px",
          boxShadow: "0 24px 64px rgba(0,0,0,.5)",
        }}>
          {/* Tab switcher */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            background: S.surface2, borderRadius: 12, padding: 4, marginBottom: 28,
          }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
                fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                transition: "all .2s",
                background: mode === m ? `linear-gradient(135deg,${S.accent},${S.accent2})` : "transparent",
                color: mode === m ? "white" : S.muted,
                boxShadow: mode === m ? `0 4px 14px rgba(124,92,252,.35)` : "none",
              }}>{m === "login" ? "Sign In" : "Sign Up"}</button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {mode === "signup" && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: "uppercase", letterSpacing: ".09em", display: "block", marginBottom: 7 }}>
                  Full Name
                </label>
                <input
                  type="text" placeholder="Alex Chen" value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocusField("name")}
                  onBlur={() => setFocusField(null)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle("name")}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: "uppercase", letterSpacing: ".09em", display: "block", marginBottom: 7 }}>
                Email Address
              </label>
              <input
                type="email" placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField(null)}
                onKeyDown={handleKeyDown}
                style={inputStyle("email")}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: S.muted, textTransform: "uppercase", letterSpacing: ".09em" }}>
                  Password
                </label>
                {mode === "login" && (
                  <span style={{ fontSize: 11, color: S.accent, cursor: "pointer", fontWeight: 600 }}>
                    Forgot password?
                  </span>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder={mode === "signup" ? "Min. 6 characters" : "••••••••"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusField("password")}
                  onBlur={() => setFocusField(null)}
                  onKeyDown={handleKeyDown}
                  style={{ ...inputStyle("password"), paddingRight: 44 }}
                />
                <button onClick={() => setShowPass(v => !v)} style={{
                  position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: S.muted, fontSize: 15, lineHeight: 1, padding: 2,
                }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="fade-up" style={{
                background: "rgba(252,92,156,.08)", border: "1px solid rgba(252,92,156,.25)",
                borderRadius: 10, padding: "10px 14px", fontSize: 12, color: S.accent2, fontWeight: 500,
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading} style={{
              marginTop: 6, width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
              background: loading ? "rgba(124,92,252,.4)" : `linear-gradient(135deg,${S.accent},${S.accent2})`,
              color: "white", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : `0 6px 24px rgba(124,92,252,.38)`,
              transition: "all .22s",
            }}>
              {loading
                ? "Verifying…"
                : mode === "login" ? "Sign In →" : "Create Account ✦"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
            <div style={{ flex: 1, height: 1, background: S.border }} />
            <span style={{ fontSize: 11, color: S.muted }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: S.border }} />
          </div>

          {/* Social placeholders */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "G", label: "Google",  color: "#EA4335" },
              { icon: "⌘", label: "Apple",   color: S.text   },
            ].map(p => (
              <button key={p.label} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "11px 0", borderRadius: 11,
                background: S.surface2, border: `1px solid ${S.border}`,
                color: S.text, fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "border-color .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.18)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = S.border}
              >
                <span style={{ fontWeight: 800, color: p.color, fontSize: 14 }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", fontSize: 11, color: S.muted, marginTop: 20, lineHeight: 1.7 }}>
          By continuing you agree to our{" "}
          <span style={{ color: S.accent, cursor: "pointer" }}>Terms</span> &amp;{" "}
          <span style={{ color: S.accent, cursor: "pointer" }}>Privacy Policy</span>.
          <br/>Accounts are stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
