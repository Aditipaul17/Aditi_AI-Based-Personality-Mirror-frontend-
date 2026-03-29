/* ═══════════════════════════════════════════════════════
   BFS PERSONALITY MATCHING ENGINE
   ───────────────────────────────────────────────────────
   The user's quiz scores form a point in 5D trait-space.
   BFS explores outward from that point in discrete steps,
   visiting neighbouring trait combinations level-by-level
   until it lands on a node that matches an avatar archetype.

   Graph structure:
     Node   = { openness, conscientiousness, extraversion,
                agreeableness, neuroticism }  (each 0-100)
     Edges  = 26 neighbours per node (±STEP in each dimension,
               including diagonals in 5D)
     Goal   = any node within THRESHOLD distance of an avatar

   This is meaningful because:
   1. It guarantees the *closest* archetype is found, not just
      a greedy best-fit.
   2. The BFS frontier visualises how many "trait adjustments"
      away each archetype is — shown in the UI.
   3. It handles ambiguous answers better than raw scoring.
═══════════════════════════════════════════════════════ */

const TRAITS = ["openness","conscientiousness","extraversion","agreeableness","neuroticism"];
const BFS_STEP = 8;
const BFS_THRESHOLD = 22;
const MAX_BFS_LEVELS = 6;

function euclidean(a, b) {
  return Math.sqrt(TRAITS.reduce((s, k) => s + (a[k] - b[k]) ** 2, 0));
}

function bfsNeighbours(node) {
  const neighbours = [];
  for (const k of TRAITS) {
    for (const delta of [-BFS_STEP, BFS_STEP]) {
      const next = { ...node, [k]: Math.max(0, Math.min(100, node[k] + delta)) };
      neighbours.push(next);
    }
  }
  return neighbours;
}

function nodeKey(node) {
  return TRAITS.map(k => Math.round(node[k] / BFS_STEP)).join(",");
}

function bfsMatch(userScores, avatars) {
  const start = { ...userScores };
  const queue = [{ node: start, level: 0, path: ["start"] }];
  const visited = new Set([nodeKey(start)]);
  let visitedCount = 0;

  while (queue.length > 0) {
    const { node, level, path } = queue.shift();
    visitedCount++;

    let bestAvatar = null;
    let bestDist = Infinity;
    for (const [key, av] of Object.entries(avatars)) {
      const d = euclidean(node, av.traits);
      if (d < bestDist) { bestDist = d; bestAvatar = key; }
    }

    if (bestDist <= BFS_THRESHOLD) {
      return { matched: bestAvatar, levels: level, visited: visitedCount, path, distance: Math.round(bestDist) };
    }

    if (level >= MAX_BFS_LEVELS) continue;

    for (const nb of bfsNeighbours(node)) {
      const key = nodeKey(nb);
      if (!visited.has(key)) {
        visited.add(key);
        const changedTrait = TRAITS.find(k => nb[k] !== node[k]);
        queue.push({ node: nb, level: level + 1, path: [...path, changedTrait] });
      }
    }
  }

  let bestAvatar = null, bestDist = Infinity;
  for (const [key, av] of Object.entries(avatars)) {
    const d = euclidean(userScores, av.traits);
    if (d < bestDist) { bestDist = d; bestAvatar = key; }
  }
  return { matched: bestAvatar, levels: MAX_BFS_LEVELS, visited: visitedCount, path: [], distance: Math.round(bestDist) };
}

/* ═══════════════════ DATA ═══════════════════ */

const AVATARS = {
  sage:     { emoji:"🦉", name:"The Sage",     mbti:"INFJ", mbtiLabel:"The Advocate · The Sage",
    tags:["Introvert","Intuitive","Feeling","Judging","Highly Creative","Empathetic"],
    dominant:"Openness", dominantPct:84, consistency:91,
    traits:{openness:84,conscientiousness:71,extraversion:38,agreeableness:79,neuroticism:45},
    strength:"You possess rare insight into human behaviour, often understanding others' motivations before they do.",
    growth:"Learning to set firm boundaries and prioritise your own needs will unlock sustained energy and creativity.",
    career:"Counselling, writing, design, teaching, or strategy — roles blending creativity with purpose.",
    affirmation:"Your wisdom is a gift the world needs. Trust the quiet knowing inside you — it has never been wrong." },
  dreamer:  { emoji:"🦋", name:"The Dreamer",  mbti:"INFP", mbtiLabel:"The Mediator · The Dreamer",
    tags:["Introvert","Intuitive","Feeling","Perceiving","Imaginative","Idealistic"],
    dominant:"Openness", dominantPct:91, consistency:78,
    traits:{openness:91,conscientiousness:52,extraversion:34,agreeableness:82,neuroticism:58},
    strength:"Your imagination and emotional depth allow you to create meaning and beauty where others see only the ordinary.",
    growth:"Building consistent routines will help your brilliant ideas become real, tangible things in the world.",
    career:"Writing, art, music, counselling, UX design — roles where authenticity and creativity lead the way.",
    affirmation:"Your dreams are not a distraction — they are your compass. Keep imagining the world you want to build." },
  flow:     { emoji:"🌊", name:"The Flow",     mbti:"ISFP", mbtiLabel:"The Adventurer · The Flow",
    tags:["Introvert","Sensing","Feeling","Perceiving","Adaptable","Grounded"],
    dominant:"Agreeableness", dominantPct:88, consistency:83,
    traits:{openness:72,conscientiousness:60,extraversion:45,agreeableness:88,neuroticism:40},
    strength:"Your calm adaptability and sensory awareness let you thrive in the present moment with effortless grace.",
    growth:"Expressing your needs and opinions more openly will deepen your relationships and personal fulfilment.",
    career:"Art, craft, nature-based work, physical therapy, photography, or any role requiring hands-on presence.",
    affirmation:"You are the calm in every storm. Your presence alone heals — never underestimate that power." },
  mystic:   { emoji:"🔮", name:"The Mystic",   mbti:"INTJ", mbtiLabel:"The Architect · The Mystic",
    tags:["Introvert","Intuitive","Thinking","Judging","Strategic","Independent"],
    dominant:"Conscientiousness", dominantPct:89, consistency:95,
    traits:{openness:80,conscientiousness:89,extraversion:30,agreeableness:55,neuroticism:35},
    strength:"Your strategic mind and visionary thinking allow you to see complex systems and long-term patterns with rare clarity.",
    growth:"Allowing space for emotional vulnerability will unlock connections that strategies alone cannot build.",
    career:"Research, engineering, architecture, strategy, data science — any field requiring deep independent thought.",
    affirmation:"Your mind is a universe unto itself. The visions you hold are the blueprints of tomorrow." },
  nurturer: { emoji:"🌿", name:"The Nurturer", mbti:"ENFJ", mbtiLabel:"The Protagonist · The Nurturer",
    tags:["Extravert","Intuitive","Feeling","Judging","Warm","Inspiring"],
    dominant:"Agreeableness", dominantPct:92, consistency:87,
    traits:{openness:75,conscientiousness:78,extraversion:72,agreeableness:92,neuroticism:42},
    strength:"Your natural empathy and ability to inspire others makes you a magnetic force for positive change.",
    growth:"Remembering to nourish yourself as generously as you nourish others is your most important practice.",
    career:"Teaching, leadership, social work, HR, community organising, healthcare — anywhere people need a champion.",
    affirmation:"The love you pour into others is never wasted. You are the reason people believe in themselves." },
  spark:    { emoji:"⚡", name:"The Spark",    mbti:"ENTP", mbtiLabel:"The Debater · The Spark",
    tags:["Extravert","Intuitive","Thinking","Perceiving","Bold","Energetic"],
    dominant:"Extraversion", dominantPct:86, consistency:80,
    traits:{openness:88,conscientiousness:48,extraversion:86,agreeableness:60,neuroticism:50},
    strength:"Your infectious energy and quick wit generate momentum and enthusiasm wherever you go.",
    growth:"Channelling your many ideas into fewer, deeper commitments will multiply your real-world impact.",
    career:"Entrepreneurship, marketing, law, innovation consulting, or any fast-moving creative field.",
    affirmation:"Your spark ignites rooms. Your ideas change minds. The world moves faster because you are in it." }
};

const QUIZ_QUESTIONS = [
  {n:"01",trait:"Openness",        text:"I regularly seek out new ideas and creative experiences just for the joy of discovery."},
  {n:"02",trait:"Conscientiousness",text:"I plan ahead carefully and feel genuinely uncomfortable leaving important things to chance."},
  {n:"03",trait:"Extraversion",    text:"Being around people gives me energy — I feel most alive in social, busy settings."},
  {n:"04",trait:"Agreeableness",   text:"When I sense someone is struggling, I naturally put their needs before mine."},
  {n:"05",trait:"Neuroticism",     text:"My mind often replays conversations or events long after they've passed."},
  {n:"06",trait:"Openness",        text:"I'm drawn to deep philosophical or spiritual questions about life and existence."},
  {n:"07",trait:"Conscientiousness",text:"I hold myself to high standards and feel restless when my work falls short of them."},
  {n:"08",trait:"Extraversion",    text:"I find it easy to spark conversations with strangers and rarely feel socially awkward."},
  {n:"09",trait:"Agreeableness",   text:"I trust that most people are genuinely good at heart, even when they let me down."},
  {n:"10",trait:"Neuroticism",     text:"My emotions run deep — I feel both joy and sorrow more intensely than others seem to."}
];

const QUICK_QUESTIONS = [
  {n:"01", text:"My ideal weekend involves quiet solitude or one-on-one time more than crowds."},
  {n:"02", text:"I follow my gut and values over pure logic when making big decisions."},
  {n:"03", text:"I feel most fulfilled when helping, creating, or understanding — not competing."},
  {n:"04", text:"My friends would describe me as someone who thinks deeply before speaking."},
  {n:"05", text:"I often sense the mood or tension in a room without anyone saying a word."}
];

/* ═══════════════════ STYLES ═══════════════════ */
const S = {
  bg: "#0A0A0F", surface: "#12121A", surface2: "#1A1A26",
  border: "rgba(255,255,255,0.07)", accent: "#7C5CFC", accent2: "#FC5C9C",
  accent3: "#5CF4FC", accent4: "#FCDB5C", text: "#F0EEF8", muted: "#7A7890",
  green: "#5CF4A0",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:${S.bg};color:${S.text};font-family:'DM Sans',sans-serif;min-height:100vh}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${S.surface}}::-webkit-scrollbar-thumb{background:rgba(124,92,252,.3);border-radius:99px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes popIn{0%{opacity:0;transform:scale(.7)}70%{transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}
  @keyframes bfsNode{0%{opacity:0;transform:scale(0) rotate(-30deg)}60%{transform:scale(1.15) rotate(5deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .fade-up{animation:fadeUp .38s ease both}
  .pop-in{animation:popIn .45s cubic-bezier(.34,1.56,.64,1) both}
`;
