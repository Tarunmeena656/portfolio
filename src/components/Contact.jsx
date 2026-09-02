import { useState } from "react";
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { profile } from "../data/resume.js";
import { Reveal } from "../hooks/useReveal.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    { icon: <FiMail />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <FiPhone />, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: <FiLinkedin />, label: "LinkedIn", value: "in/tarun-meena--", href: profile.linkedin },
    { icon: <FiGithub />, label: "GitHub", value: profile.githubUser, href: profile.github },
    { icon: <FiMapPin />, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="section alt">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">
            Let's build something <span className="gradient-text">together</span>
          </h2>
          <p className="section-sub">
            {profile.availability}. Recruiters and hiring managers — I'm happy to walk through any project on a call.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={100}>
            <div className="channels">
              {channels.map((c) => (
                <div className="card channel" key={c.label}>
                  <span className="channel-icon">{c.icon}</span>
                  <div className="channel-text">
                    <div className="fact-label">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {c.value}
                      </a>
                    ) : (
                      <div>{c.value}</div>
                    )}
                  </div>
                  {c.label === "Email" && (
                    <button className="icon-btn" onClick={copyEmail} title="Copy email">
                      {copied ? <FiCheck /> : <FiCopy />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form className="card contact-form" onSubmit={submit}>
              <label>
                Your name
                <input
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                Your email
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows={5}
                  placeholder="Hi Tarun, we're hiring a backend engineer and…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <button className="btn btn-primary full">
                <FiSend /> Send message
              </button>
              <p className="muted small center">Opens your email client with the message pre-filled.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
