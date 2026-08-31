import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiImage, FiX } from "react-icons/fi";
import { projectCategories, projects } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const shots = project.screenshots || [];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && shots.length) setIndex((i) => (i + 1) % shots.length);
      if (e.key === "ArrowLeft" && shots.length) setIndex((i) => (i - 1 + shots.length) % shots.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, shots.length]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        {shots.length > 0 && (
          <div className="gallery">
            <img src={shots[index].src} alt={shots[index].caption} className="gallery-main" />
            {shots.length > 1 && (
              <>
                <button className="gallery-nav left" onClick={() => setIndex((i) => (i - 1 + shots.length) % shots.length)}>
                  <FiChevronLeft />
                </button>
                <button className="gallery-nav right" onClick={() => setIndex((i) => (i + 1) % shots.length)}>
                  <FiChevronRight />
                </button>
              </>
            )}
            <div className="gallery-caption">{shots[index].caption}</div>
            <div className="gallery-thumbs">
              {shots.map((s, i) => (
                <button key={s.src} className={i === index ? "active" : ""} onClick={() => setIndex(i)}>
                  <img src={s.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="modal-body">
          <p className="eyebrow">{projectCategories.find((c) => c.id === project.category)?.label}</p>
          <h3>{project.title}</h3>
          <p className="muted">{project.subtitle}</p>
          <p>{project.description}</p>
          <ul className="highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="chips small">
            {project.tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="modal-links">
            {project.links.github && (
              <a className="btn btn-primary" href={project.links.github} target="_blank" rel="noreferrer">
                <FiGithub /> View source
              </a>
            )}
            {project.links.live && (
              <a className="btn btn-ghost" href={project.links.live} target="_blank" rel="noreferrer">
                <FiExternalLink /> Live demo
              </a>
            )}
            {!project.links.github && !project.links.live && (
              <span className="muted small">Client / proprietary project — code not public.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text">built</span>
          </h2>
          <p className="section-sub">
            From AI content pipelines to 300M-record databases. Click any card for details and screenshots.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="filters">
            {projectCategories.map((c) => (
              <button key={c.id} className={`filter ${filter === c.id ? "active" : ""}`} onClick={() => setFilter(c.id)}>
                {c.label}
                <span className="count">
                  {c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80} className={p.featured ? "featured" : ""}>
              <article className={`card project ${p.featured ? "project-featured" : ""}`} onClick={() => setOpenProject(p)}>
                {p.featured && p.screenshots?.[0] && (
                  <div className="project-cover">
                    <img src={p.screenshots[0].src} alt={p.title} loading="lazy" />
                    <span className="featured-tag">Featured · Open source</span>
                  </div>
                )}
                <div className="project-body">
                  <div className="project-head">
                    <h3>{p.title}</h3>
                    {p.screenshots?.length ? (
                      <span className="shots-badge" title="Has screenshots">
                        <FiImage /> {p.screenshots.length}
                      </span>
                    ) : null}
                  </div>
                  <p className="project-sub">{p.subtitle}</p>
                  <p className="project-desc">{p.description}</p>
                  <div className="chips small">
                    {p.tags.slice(0, p.featured ? 7 : 4).map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                    {!p.featured && p.tags.length > 4 && <span className="chip more">+{p.tags.length - 4}</span>}
                  </div>
                  <div className="project-foot">
                    <span className="link-like">View details →</span>
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-link"
                        onClick={(e) => e.stopPropagation()}
                        title="Source on GitHub"
                      >
                        <FiGithub />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}
