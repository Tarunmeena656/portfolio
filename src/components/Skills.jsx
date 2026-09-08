import {
  FiBox,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitMerge,
  FiGlobe,
  FiGrid,
  FiKey,
  FiLayers,
  FiLink,
  FiLock,
  FiMessageSquare,
  FiSearch,
  FiServer,
  FiShield,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { asset, skills } from "../data/resume.js";
import { SKILL_ICONS } from "../data/skillIcons.js";
import { Reveal } from "../hooks/useReveal.jsx";

// Generic glyphs for skills that are concepts rather than products.
const GLYPHS = {
  globe: <FiGlobe />,
  grid: <FiGrid />,
  search: <FiSearch />,
  layers: <FiLayers />,
  prompt: <FiMessageSquare />,
  box: <FiBox />,
  pipeline: <FiGitMerge />,
  database: <FiDatabase />,
  users: <FiUsers />,
  lock: <FiLock />,
  key: <FiKey />,
  cloud: <FiCloud />,
  cpu: <FiCpu />,
  server: <FiServer />,
};

function SkillChip({ name }) {
  const meta = SKILL_ICONS[name];
  return (
    <span className="chip skill-chip" title={name}>
      {meta?.src ? (
        <img className={`skill-logo${meta.mono ? " mono" : ""}`} src={asset(`skills/${meta.src}`)} alt="" width="16" height="16" loading="lazy" />
      ) : (
        <span className="skill-logo glyph" aria-hidden="true">
          {GLYPHS[meta?.glyph] ?? <FiCode />}
        </span>
      )}
      {name}
    </span>
  );
}

const ICONS = {
  code: <FiCode />,
  server: <FiServer />,
  brain: <FiCpu />,
  database: <FiDatabase />,
  cloud: <FiCloud />,
  shield: <FiShield />,
  plug: <FiLink />,
  tools: <FiTool />,
};

export default function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">
            The <span className="gradient-text">toolbox</span> I build with
          </h2>
          <p className="section-sub">
            Backend-first, cloud-native, and increasingly AI-shaped. These are the technologies I've used in
            production, not just tutorials.
          </p>
        </Reveal>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 60}>
              <div className="card skill-card">
                <div className="skill-head">
                  <span className="skill-icon">{ICONS[group.icon]}</span>
                  <h3>{group.category}</h3>
                </div>
                <div className="chips">
                  {group.items.map((item) => (
                    <SkillChip key={item} name={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
