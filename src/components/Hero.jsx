import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile, stats } from "../data/resume.js";
import { useCountUp } from "../hooks/useCountUp.js";
import { Reveal, useReveal } from "../hooks/useReveal.jsx";
import { useTypewriter } from "../hooks/useTypewriter.js";

function StatCard({ stat, delay }) {
  const [ref, visible] = useReveal(0.3);
  const value = useCountUp(stat.value, visible);
  return (
    <div ref={ref} className={`stat reveal ${visible ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-value">
        {value.toFixed(stat.decimals)}
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(profile.typingRoles);

  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <Reveal>
              <span className="pill">
                <span className="pulse" /> {profile.availability}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                Hi, I'm <span className="gradient-text">{profile.name}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <h2 className="typewriter">
                {typed}
                <span className="caret" />
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="lead">{profile.summary}</p>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  View my work <FiArrowRight />
                </a>
                <a href={profile.resumeUrl} className="btn btn-ghost" download>
                  <FiDownload /> Download résumé
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="socials">
                <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub">
                  <FiGithub />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href={`mailto:${profile.email}`} title="Email">
                  <FiMail />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hero-visual">
            <div className="terminal">
              <div className="terminal-bar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="terminal-title">tarun@backend ~ whoami</span>
              </div>
              <pre className="terminal-body">
                <span className="tk-key">const</span> engineer = {"{"}
                {"\n"}  name: <span className="tk-str">"{profile.name}"</span>,
                {"\n"}  role: <span className="tk-str">"{profile.role}"</span>,
                {"\n"}  experience: <span className="tk-num">3.6</span>, <span className="tk-cmt">// years</span>
                {"\n"}  stack: [<span className="tk-str">"Node.js"</span>, <span className="tk-str">"TypeScript"</span>, <span className="tk-str">"Python"</span>],
                {"\n"}  cloud: [<span className="tk-str">"AWS Lambda"</span>, <span className="tk-str">"S3"</span>, <span className="tk-str">"API Gateway"</span>],
                {"\n"}  ai: [<span className="tk-str">"RAG"</span>, <span className="tk-str">"Embeddings"</span>, <span className="tk-str">"LLM APIs"</span>],
                {"\n"}  scale: <span className="tk-str">"300M+ records"</span>,
                {"\n"}  openToWork: <span className="tk-bool">true</span>,
                {"\n"}{"}"};
                {"\n\n"}<span className="tk-cmt">// fast, observable, fails gracefully</span>
                {"\n"}<span className="tk-fn">deploy</span>(engineer);<span className="caret" />
              </pre>
            </div>
          </Reveal>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
