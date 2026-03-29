/**
 * Mirror.ai — Backend
 *
 * A minimal Express server that serves every file in ../frontend/.
 * No business logic lives here — this file exists solely to make
 * the multi-file frontend accessible via a single `node app.js`.
 *
 * Usage:
 *   npm install express
 *   node app.js
 *
 * Then open http://localhost:3000 in your browser.
 */

const express = require("express");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

// Resolve the frontend directory relative to this file so the server
// works regardless of the working directory it is launched from.
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");

// Serve every file in frontend/ as a static asset.
// index.html is automatically served at the root URL ("/").
app.use(express.static(FRONTEND_DIR));

// Catch-all: redirect any unknown path back to the SPA root so that
// refreshing a deep-linked URL (e.g. /profile) still works.
app.get("*", (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n  Mirror.ai is running at http://localhost:${PORT}\n`);
});
