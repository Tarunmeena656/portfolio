/**
 * "Ask my résumé" — a tiny in-browser Q&A engine over the résumé data.
 *
 * No server, no API key: every fact from resume.js becomes a searchable
 * document, questions are tokenized and scored against tags (weighted) and
 * text, and the top-scoring facts are returned. Intent shortcuts handle
 * greetings, contact requests, and availability.
 */
import { education, experience, profile, projects, skills } from "../data/resume.js";

const STOP = new Set(
  "a an the is are was were be been of to in on at for with and or what which who how does do did has have had his her their tell me about you your can i please give show list any some more".split(" ")
);

const tokenize = (s) =>
  (s.toLowerCase().match(/[a-z0-9+#.]+/g) || []).filter((t) => !STOP.has(t) && t.length > 1);

function buildFacts() {
  const facts = [];

  facts.push({
    tags: "summary overview background who experience years profile introduction",
    text: profile.summary,
  });
  facts.push({
    tags: "summary impact results achievements delivered domains industries",
    text: profile.summaryExtra,
  });
  facts.push({
    tags: "contact email phone reach linkedin github location based where live city remote",
    text: `You can reach ${profile.firstName} at ${profile.email} or ${profile.phone}. LinkedIn: ${profile.linkedin} · GitHub: ${profile.github}. He's based in ${profile.location}.`,
  });
  facts.push({
    tags: "available availability hire hiring open work opportunities job looking notice relocate remote",
    text: `${profile.firstName} is ${profile.availability.toLowerCase()}. The fastest way to reach him is ${profile.email}.`,
  });

  skills.forEach((c) =>
    facts.push({
      tags: `skills stack technologies tools know ${c.category} ${c.items.join(" ")}`,
      text: `${c.category}: ${c.items.join(", ")}.`,
    })
  );

  experience.forEach((e) =>
    facts.push({
      tags: `experience work job role company career ${e.company} ${e.title} ${e.period} ${e.stack.join(" ")}`,
      text: `${e.title} at ${e.company} (${e.period}, ${e.location}). ${e.bullets.join(" ")}`,
    })
  );

  projects.forEach((p) =>
    facts.push({
      tags: `project projects built portfolio ${p.title} ${p.subtitle} ${p.tags.join(" ")} ${p.category}`,
      text: `${p.title}: ${p.description} ${p.highlights.join(" ")}${p.links.github ? ` Code: ${p.links.github}` : ""}`,
    })
  );

  facts.push({
    tags: "education degree college university mca gpa studied qualification graduate",
    text: `${education.degree} from ${education.school}, ${education.location} (${education.period}) with a GPA of ${education.gpa}.`,
  });

  return facts.map((f) => ({ ...f, tagTokens: tokenize(f.tags), textTokens: tokenize(f.text) }));
}

const FACTS = buildFacts();

export const SUGGESTIONS = [
  "What's your experience with AI and LLMs?",
  "Tell me about the AI Support Agent project",
  "Which databases and cloud services do you use?",
  "How can I contact you?",
  "What did you do at Bigscal?",
  "Are you open to new roles?",
];

const GREETING = /^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/i;
const THANKS = /\b(thanks|thank you|cheers)\b/i;

export function answer(question) {
  const q = question.trim();
  if (!q) return "Ask me anything about Tarun's experience, skills, or projects.";
  if (GREETING.test(q)) {
    return `Hi! I'm ${profile.firstName}'s résumé assistant. Ask about his experience, skills, projects, or how to get in touch.`;
  }
  if (THANKS.test(q)) return "You're welcome! Anything else you'd like to know?";

  const qTokens = tokenize(q);
  if (qTokens.length === 0) {
    return "Could you rephrase that? Try asking about skills, projects, experience, or contact details.";
  }

  const scored = FACTS.map((f) => {
    let score = 0;
    for (const t of qTokens) {
      if (f.tagTokens.includes(t)) score += 3;
      if (f.textTokens.includes(t)) score += 1;
      // light prefix matching: "database" ~ "databases", "scrap" ~ "scraping"
      if (f.tagTokens.some((x) => x.startsWith(t) || t.startsWith(x)) && t.length > 3) score += 1;
    }
    return { fact: f, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return `I don't have that in the résumé. I can tell you about ${profile.firstName}'s skills, work experience, projects, education, or how to contact him.`;
  }

  const top = scored.slice(0, 2).filter((s, i) => i === 0 || s.score >= scored[0].score * 0.6);
  return top.map((s) => s.fact.text).join("\n\n");
}
