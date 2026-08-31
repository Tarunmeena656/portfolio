import { useEffect, useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCopy,
  FiDownload,
  FiFolder,
  FiGithub,
  FiHome,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSun,
  FiTool,
  FiUser,
} from "react-icons/fi";
import About from "./components/About.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Contact from "./components/Contact.jsx";
import Experience from "./components/Experience.jsx";
import Footer from "./components/Footer.jsx";
import GitHubRepos from "./components/GitHubRepos.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import ResumeAssistant from "./components/ResumeAssistant.jsx";
import Skills from "./components/Skills.jsx";
import { profile } from "./data/resume.js";
import { useTheme } from "./hooks/useTheme.js";

const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const openUrl = (url) => () => window.open(url, "_blank", "noreferrer");

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global Ctrl/Cmd + K shortcut.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const actions = useMemo(
    () => [
      { id: "top", group: "Navigate", label: "Home", icon: <FiHome />, run: scrollTo("top") },
      { id: "about", group: "Navigate", label: "About", icon: <FiUser />, run: scrollTo("about") },
      { id: "skills", group: "Navigate", label: "Skills", icon: <FiTool />, run: scrollTo("skills") },
      { id: "experience", group: "Navigate", label: "Experience", icon: <FiBriefcase />, run: scrollTo("experience") },
      { id: "projects", group: "Navigate", label: "Projects", icon: <FiFolder />, run: scrollTo("projects") },
      { id: "contact", group: "Navigate", label: "Contact", icon: <FiMail />, run: scrollTo("contact") },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        icon: <FiDownload />,
        run: openUrl(profile.resumeUrl),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <FiCopy />,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        icon: theme === "dark" ? <FiSun /> : <FiMoon />,
        run: toggleTheme,
      },
      { id: "github", group: "Links", label: "GitHub profile", hint: profile.githubUser, icon: <FiGithub />, run: openUrl(profile.github) },
      { id: "linkedin", group: "Links", label: "LinkedIn profile", icon: <FiLinkedin />, run: openUrl(profile.linkedin) },
      {
        id: "ai-agent",
        group: "Links",
        label: "AI Support Agent — source code",
        hint: "featured project",
        icon: <FiGithub />,
        run: openUrl("https://github.com/Tarunmeena656/AI-Support-Agent"),
      },
    ],
    [theme, toggleTheme]
  );

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubRepos />
        <Contact />
      </main>
      <Footer />
      <ResumeAssistant />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
    </>
  );
}
