import { useEffect, useState } from "react";
import { FiExternalLink, FiGitBranch, FiGithub, FiStar } from "react-icons/fi";
import { profile } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

function timeAgo(iso) {
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const list = data
          .filter((r) => !r.fork)
          .sort((a, b) => {
            // Pin the flagship project first, then by stars, then by recency.
            if (a.name === "AI-Support-Agent") return -1;
            if (b.name === "AI-Support-Agent") return 1;
            return b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at);
          })
          .slice(0, 6);
        setRepos(list);
      })
      .catch(() => setError(true));
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Open source</p>
          <h2 className="section-title">
            Live from <span className="gradient-text">GitHub</span>
          </h2>
          <p className="section-sub">Pulled from the GitHub API in real time — what I'm actually pushing to.</p>
        </Reveal>

        <div className="repos-grid">
          {!repos && !error && [0, 1, 2].map((i) => <div key={i} className="card repo skeleton" />)}

          {error && (
            <div className="card repo">
              <p className="muted">Couldn't load repositories right now (GitHub API rate limit or offline).</p>
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
                <FiGithub /> Open my GitHub
              </a>
            </div>
          )}

          {repos?.map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <a className="card repo" href={r.html_url} target="_blank" rel="noreferrer">
                <div className="repo-head">
                  <FiGitBranch />
                  <span className="repo-name">{r.name}</span>
                  <FiExternalLink className="repo-ext" />
                </div>
                <p className="repo-desc">{r.description || "No description yet."}</p>
                <div className="repo-meta">
                  {r.language && (
                    <span>
                      <span className="lang-dot" style={{ background: LANG_COLORS[r.language] || "#8b949e" }} />
                      {r.language}
                    </span>
                  )}
                  <span>
                    <FiStar /> {r.stargazers_count}
                  </span>
                  <span className="muted">updated {timeAgo(r.pushed_at)}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {repos && (
          <Reveal>
            <div className="center">
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
                <FiGithub /> See all repositories
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
