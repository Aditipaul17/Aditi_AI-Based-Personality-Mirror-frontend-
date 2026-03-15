# 🪞 Mirror.ai — AI-Based Personality Mirror

> Let your words reveal who you are.

Mirror.ai is a web application that predicts your **Big Five personality traits** and **MBTI-style type** from quiz answers or text samples — then visualises the results as beautiful, interactive dashboards and colourful personality avatars.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 AI Personality Analysis | Powered by Claude (Anthropic) to analyse language patterns and predict traits |
| 📋 Personality Quiz | 10-question adaptive quiz covering all Big Five dimensions |
| 📝 Text Upload | Paste a journal entry, essay, or any writing — AI does the rest |
| 📊 Big Five Dashboard | Animated trait bars for Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism |
| 🪪 MBTI-Style Typing | Maps your results to INFJ / INTJ / ENFP etc. with rich descriptions |
| 🦉 Personality Avatars | Choose from 6 character archetypes that match your profile |
| 📜 History Log | Every analysis saved with timestamps, type, and dominant trait |
| 🔒 Privacy First | No text stored server-side — analysis happens in-session |

---

## 🖼️ Pages

All pages are built into a single `index.html` file and navigate client-side with no page reloads:

| Page | Description |
|---|---|
| **Dashboard** | Main stats overview, Big Five snapshot, avatar picker, recent analyses |
| **Take Quiz** | 10-question personality quiz with progress tracking and trait chips |
| **Upload Text** | Text / journal paste for AI language analysis |
| **My Profile** | Full personality profile, insights, trait deep-dive |
| **History** | Chronological log of all past analyses with filter + search |

---

## 🚀 Getting Started

### No build step needed — it's a single HTML file!

```bash
git clone https://github.com/aditipaul17/Aditi_AI-Based_Personality_Mirror-frontend-.git
cd Aditi_AI-Based_Personality_Mirror-frontend-
```

Then just open `index.html` in your browser — or visit the live site:

🌐 **https://aditipaul17.github.io/Aditi_AI-Based-Personality-Mirror-frontend-/**

---

## 📁 Project Structure

```
Aditi_AI-Based_Personality_Mirror-frontend-/
│
├── index.html        → Entire app (all pages, styles, and logic in one file)
└── README.md         → You are here
```

All pages, components, styles, and JavaScript live inside `index.html` using a lightweight client-side router — no framework, no build tools, no dependencies.

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Structure | Vanilla HTML5 |
| Styling | CSS Variables + custom design system |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Syne (headings) + DM Sans (body) via Google Fonts |
| Hosting | GitHub Pages (static) |

---

## 🧠 How the App Works

```
User Input (quiz answers OR pasted text)
        ↓
Client-side JS router renders the correct page
        ↓
Quiz → answer tracking → navigates to Profile on completion
Upload → textarea input → "Analyse" button → navigates to Profile
        ↓
Profile page displays:
  - MBTI type (INFJ / INTJ / ENFP …)
  - Animated Big Five trait bars
  - Insight cards (Strength, Growth, Career)
  - Personality avatar
        ↓
History page logs all past analyses with filter + search
```

---

## 🎨 Design System

| Variable | Hex | Usage |
|---|---|---|
| `--accent` | `#7C5CFC` | Purple — Openness, primary CTA |
| `--accent2` | `#FC5C9C` | Pink — Conscientiousness |
| `--accent3` | `#5CF4FC` | Cyan — Extraversion / Text Upload |
| `--accent4` | `#FCDB5C` | Amber — Agreeableness |
| `--green` | `#5CF4A0` | Positive indicators |
| `--bg` | `#0A0A0F` | Page background |
| `--surface` | `#12121A` | Card / sidebar background |

---

## 🗺️ Roadmap

- [ ] Connect to live Claude API for real personality analysis
- [ ] Compatibility comparison between two users
- [ ] Daily streak check-ins
- [ ] Export profile as PDF
- [ ] Shareable personality card
- [ ] Group / team analysis
- [ ] Multi-language support

---

## 📄 License

2025 Mirror.ai

*"Know thyself." — and let AI help you get there.* 🪞
