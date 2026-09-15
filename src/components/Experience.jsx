import { FiCalendar, FiMapPin } from "react-icons/fi";
import { experience } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

/** "Jan 2023 – Oct 2025" -> "2 yrs 10 mos" (inclusive of both months, the way LinkedIn counts). */
function tenure(period) {
  const [from, to] = period.split("–").map((s) => s.trim());
  const parse = (s) => {
    if (/present/i.test(s)) return new Date();
    const [mon, year] = s.split(" ");
    return new Date(Number(year), MONTHS[mon] ?? 0, 1);
  };
  const a = parse(from);
  const b = parse(to);
  const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
  if (!Number.isFinite(months) || months <= 0) return null;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : null, m ? `${m} mo${m > 1 ? "s" : ""}` : null].filter(Boolean).join(" ");
}

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
          {experience.map((org, i) => {
            const total = tenure(org.period);
            return (
              <Reveal key={org.company} delay={i * 100} className="timeline-item">
                <div className={`timeline-dot ${org.current ? "current" : ""}`} />
                <div className="card job">
                  <div className="job-head">
                    <div>
                      <h3>{org.company}</h3>
                      <div className="job-company">
                        {org.roles.length > 1 ? `${org.roles.length} roles` : org.roles[0].title}
                        {total && <span className="job-tenure"> · {total}</span>}
                      </div>
                    </div>
                    <div className="job-meta">
                      <span>
                        <FiCalendar /> {org.period}
                      </span>
                      <span>
                        <FiMapPin /> {org.location}
                      </span>
                      {org.current && <span className="badge-current">Current</span>}
                    </div>
                  </div>

                  <div className="job-roles">
                    {org.roles.map((role) => (
                      <div className={`job-role ${role.current ? "current" : ""}`} key={role.title}>
                        <div className="role-head">
                          <h4>{role.title}</h4>
                          <span className="role-period">
                            {role.period}
                            {tenure(role.period) && <span className="muted"> · {tenure(role.period)}</span>}
                          </span>
                        </div>
                        <ul className="job-bullets">
                          {role.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="chips small">
                    {org.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
