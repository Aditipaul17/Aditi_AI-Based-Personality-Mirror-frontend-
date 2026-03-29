# Mirror.ai — Project Structure

 **Live Demo:** Experience the AI-Based Personality Mirror in action here → [Aditi_AI-Based-Personality-Mirror](https://aditipaul17.github.io/Aditi_AI-Based-Personality-Mirror-/)


## Folder Layout

```
mirror-ai/
│
├── package.json             ← npm config; run `npm start` from here
├── README.md
│
├── frontend/
│   ├── index.html           ← SPA shell; loads all JS files in correct order
│   │
│   │   ── Page redirect stubs (each redirects to /#<page> for deep-linking) ──
│   ├── dashboard.html
│   ├── quiz.html
│   ├── quicktest.html
│   ├── journal.html
│   ├── profile.html
│   ├── history.html
│   ├── coming.html
│   │
│   │   ── JavaScript modules (loaded by index.html via Babel, order matters) ──
│   ├── data.js              ← BFS engine · AVATARS · quiz data · S styles · css
│   ├── components.js        ← TraitBar · ScaleBtn · BFSVisualiser · Sidebar
│   ├── dashboard.js         ← PageDashboard component
│   ├── quiz.js              ← PageQuiz component
│   ├── quicktest.js         ← PageQuickTest component
│   ├── journal.js           ← PageJournal component
│   ├── profile.js           ← PageProfile component
│   ├── history.js           ← PageHistory component
│   ├── coming.js            ← PageComing component
│   └── app.js               ← MirrorAI root — all state, routing, mounts to #root
│
└── backend/
    └── app.js               ← Express server; serves frontend/ as static files
```

---

## How to Run

```bash
# 1. Install the only dependency (Express)
npm install

# 2. Start the server
npm start

# 3. Open in your browser
open http://localhost:3000
```

Set `PORT` to override the default:

```bash
PORT=8080 npm start
```

---


### Script load order in `index.html`

Babel compiles each `type="text/babel"` script tag sequentially. Every file
references globals defined by earlier files, so the order is fixed:

```
data.js            BFS engine, constants, style tokens
  components.js    shared UI (TraitBar, ScaleBtn, BFSVisualiser, Sidebar)
    dashboard.js   PageDashboard
    quiz.js        PageQuiz
    quicktest.js   PageQuickTest
    journal.js     PageJournal
    profile.js     PageProfile
    history.js     PageHistory
    coming.js      PageComing
      app.js       MirrorAI root — wires all pages together, mounts to #root
```

### Deep-linking and browser navigation

Visiting `/quiz` loads `quiz.html`, which redirects to `/#quiz`. On mount,
`app.js` reads `location.hash` and sets the initial page. The `navigate()`
function calls `history.replaceState()` to keep the URL in sync without a
page reload. A `hashchange` listener handles browser back/forward buttons.

### Backend

`backend/app.js` contains zero business logic. Express serves `frontend/`
as static files, and a catch-all route returns `index.html` for any
unrecognised path so page refreshes at non-root URLs never 404.
