import { FiCalendar, FiMapPin } from "react-icons/fi";
import { experience } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">
            Where I've <span className="gradient-text">shipped</span>
          </h2>
        </Reveal>

        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.period}`} delay={i * 100} className="timeline-item">
              <div className={`timeline-dot ${job.current ? "current" : ""}`} />
              <div className="card job">
                <div className="job-head">
                  <div>
                    <h3>{job.title}</h3>
                    <div className="job-company">{job.company}</div>
                  </div>
                  <div className="job-meta">
                    <span>
                      <FiCalendar /> {job.period}
                    </span>
                    <span>
                      <FiMapPin /> {job.location}
                    </span>
                    {job.current && <span className="badge-current">Current</span>}
                  </div>
                </div>
                <ul className="job-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="chips small">
                  {job.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
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
