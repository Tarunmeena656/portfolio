import { useEffect, useState } from "react";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { SiMedium } from "react-icons/si";
import { profile } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!profile.mediumUser) return undefined;
    const controller = new AbortController();
    fetch(`/api/medium?user=${encodeURIComponent(profile.mediumUser)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => setPosts((data.posts || []).slice(0, 6)))
      .catch((e) => {
        if (e?.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, []);

  // No handle configured, or nothing published yet: the section stays out of the page.
  if (!profile.mediumUser || (posts && posts.length === 0)) return null;

  return (
    <section id="blog" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Writing</p>
          <h2 className="section-title">
            Latest on <span className="gradient-text">Medium</span>
          </h2>
          <p className="section-sub">Build logs and explainers from real projects — pulled from my Medium feed as I publish.</p>
        </Reveal>

        <div className="blog-grid">
          {!posts && !error && [0, 1, 2].map((i) => <div key={i} className="card post skeleton" />)}

          {error && (
            <div className="card post">
              <div className="post-body">
                <p className="muted">Couldn't load posts right now.</p>
                <a className="btn btn-ghost" href={profile.medium} target="_blank" rel="noreferrer">
                  <SiMedium /> Read on Medium
                </a>
              </div>
            </div>
          )}

          {posts?.map((p, i) => (
            <Reveal key={p.link} delay={i * 60}>
              <a className="card post" href={p.link} target="_blank" rel="noreferrer">
                {p.thumbnail ? (
                  <div className="post-thumb">
                    <img src={p.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="post-thumb placeholder" aria-hidden="true">
                    <SiMedium />
                    <span>{p.categories?.[0] || "article"}</span>
                  </div>
                )}
                <div className="post-body">
                  <div className="post-meta">
                    <span>{fmtDate(p.pubDate)}</span>
                    {p.readMinutes && (
                      <span>
                        <FiClock /> {p.readMinutes} min read
                      </span>
                    )}
                  </div>
                  <h3 className="post-title">{p.title}</h3>
                  <p className="post-excerpt">{p.excerpt}</p>
                  {p.categories?.length > 0 && (
                    <div className="chips small">
                      {p.categories.slice(0, 3).map((c) => (
                        <span key={c} className="chip">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="post-read">
                    Read on Medium <FiArrowUpRight />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {posts && (
          <Reveal>
            <div className="center">
              <a className="btn btn-ghost" href={profile.medium} target="_blank" rel="noreferrer">
                <SiMedium /> All posts on Medium
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
