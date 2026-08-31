import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/resume.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="logo">
            <span className="logo-mark">TM</span>
            <span className="logo-text">{profile.name}</span>
          </div>
          <p className="muted small">
            © {new Date().getFullYear()} {profile.name}. Built with React + Vite. Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to
            navigate.
          </p>
        </div>
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
          <a href="#top" title="Back to top" className="to-top">
            <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
