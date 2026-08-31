import { FiCloud, FiCode, FiCpu, FiDatabase, FiLink, FiServer, FiShield, FiTool } from "react-icons/fi";
import { skills } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

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
                    <span className="chip" key={item}>
                      {item}
                    </span>
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
