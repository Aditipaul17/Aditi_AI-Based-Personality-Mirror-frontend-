# 🪞 Mirror.ai — AI-Based Personality Mirror

> *Let your words reveal who you are.*

Mirror.ai is a web application that predicts your **Big Five personality traits** and **MBTI-style type** from quiz answers or text samples — then visualises the results as beautiful, interactive dashboards and colourful personality avatars.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI Personality Analysis** | Powered by Claude (Anthropic) to analyse language patterns and predict traits |
| 📋 **Personality Quiz** | 20-question adaptive quiz covering all Big Five dimensions |
| 📝 **Text Upload** | Paste a journal entry, essay, or any writing — AI does the rest |
| 📊 **Big Five Dashboard** | Animated trait bars for Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism |
| 🪪 **MBTI-Style Typing** | Maps your results to INFJ / INTJ / ENFP etc. with rich descriptions |
| 🦉 **Personality Avatars** | Choose from 6 character archetypes that match your profile |
| 📜 **History Log** | Every analysis saved with timestamps, type, and dominant trait |
| 🔒 **Privacy First** | No text stored server-side — analysis happens in-session |

---

## 🖼️ Pages

```
dashboard.html   →  Main stats overview, Big Five snapshot, avatar picker, recent analyses
quiz.html        →  20-question personality quiz with progress tracking
upload.html      →  Text / journal upload for AI language analysis
profile.html     →  Full personality profile, insights, trait deep-dive
history.html     →  Chronological log of all past analyses
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

```bash
git clone https://github.com/your-username/mirror-ai.git
cd mirror-ai
npm install
cp .env.example .env
# Add your key: ANTHROPIC_API_KEY=your_key_here
npm run dev
```

App runs at `http://localhost:5173`

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + CSS variables |
| AI Engine | Anthropic Claude API (`claude-sonnet-4-6`) |
| State | React Context + localStorage |
| Fonts | Syne (headings) + DM Sans (body) |

---

## 🧠 How the AI Works

```
User Input (quiz answers OR text sample)
        ↓
Prompt Engineering Layer
        ↓
Claude API (claude-sonnet-4-6)
        ↓
JSON: { openness, conscientiousness, extraversion,
        agreeableness, neuroticism, mbti, avatar, insights }
        ↓
Frontend: animated bars, avatar, profile card, history entry
```

### Prompt Structure

```
Analyse the following and return JSON with:
- openness, conscientiousness, extraversion,
  agreeableness, neuroticism: each 0-100
- mbti: e.g. "INFJ"
- dominant_trait: string
- insight_strength: one sentence
- insight_growth: one sentence
- avatar: one of [sage, dreamer, flow, mystic, nurturer, spark]

Input: {user_input}
```

---

## 📁 Project Structure

```
mirror-ai/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TraitBar.jsx
│   │   ├── AvatarCard.jsx
│   │   └── RecentCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Quiz.jsx
│   │   ├── Upload.jsx
│   │   ├── Profile.jsx
│   │   └── History.jsx
│   ├── api/
│   │   └── analyse.js
│   ├── context/
│   │   └── PersonalityContext.jsx
│   └── App.jsx
├── .env.example
└── README.md
```

---

## 🎨 Design System

| Variable | Hex | Usage |
|---|---|---|
| `--accent` | `#7C5CFC` | Purple — Openness, primary CTA |
| `--accent2` | `#FC5C9C` | Pink — Conscientiousness |
| `--accent3` | `#5CF4FC` | Cyan — Extraversion |
| `--accent4` | `#FCDB5C` | Amber — Agreeableness |
| `--green` | `#5CF4A0` | Positive indicators |

---

## 🗺️ Roadmap

- [ ] Compatibility comparison between two users
- [ ] Daily streak check-ins
- [ ] Export profile as PDF
- [ ] Shareable personality card
- [ ] Group / team analysis
- [ ] Multi-language support

---

## 📄 License

MIT © 2025 Mirror.ai

---

> *"Know thyself."* — and let AI help you get there. 🪞
