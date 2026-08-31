import { FiAward, FiBriefcase, FiCpu, FiMapPin } from "react-icons/fi";
import { education, profile } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

const facts = [
  { icon: <FiMapPin />, label: "Based in", value: "Bhopal, India · Remote-friendly" },
  { icon: <FiBriefcase />, label: "Currently", value: "Backend Developer @ Rootlex Technology" },
  { icon: <FiCpu />, label: "Focus", value: "Scalable APIs · AWS serverless · AI/LLM systems" },
  { icon: <FiAward />, label: "Education", value: `${education.degree.split(" (")[0]} · GPA ${education.gpa}` },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="section-title">
            Backend engineer who ships <span className="gradient-text">production AI systems</span>
          </h2>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100} className="about-text">
            <p>{profile.summary}</p>
            <p>{profile.summaryExtra}</p>
            <p>
              Most recently I've been building AI-driven pipelines — content generation from long-form media,
              order extraction from messy WhatsApp input, and retrieval-augmented assistants — where the
              interesting problems are less about calling a model and more about grounding, confidence,
              cost, and what happens when the AI is wrong.
            </p>
          </Reveal>

          <Reveal delay={200} className="about-side">
            <div className="card facts">
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <span className="fact-icon">{f.icon}</span>
                  <div>
                    <div className="fact-label">{f.label}</div>
                    <div className="fact-value">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card edu">
              <div className="edu-degree">{education.degree}</div>
              <div className="edu-school">{education.school}</div>
              <div className="edu-meta">
                <span>{education.location}</span>
                <span>{education.period}</span>
                <span className="edu-gpa">GPA {education.gpa}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
