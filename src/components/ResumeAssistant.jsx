import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { profile } from "../data/resume.js";
import { answer, SUGGESTIONS } from "../lib/assistant.js";

const INTRO = {
  role: "bot",
  text: `Hi! I'm ${profile.firstName}'s résumé assistant. Ask me about his experience, skills, projects, or how to get in touch — I answer instantly from his résumé, right here in your browser.`,
};

export default function ResumeAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INTRO]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const ask = (text) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    // Small delay so the reply feels conversational rather than instantaneous.
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: answer(q) }]);
      setTyping(false);
    }, 450 + Math.min(900, q.length * 12));
  };

  return (
    <>
      <button className={`assistant-fab ${open ? "hidden" : ""}`} onClick={() => setOpen(true)} aria-label="Ask my résumé">
        <FiMessageCircle />
        <span>Ask my résumé</span>
      </button>

      {open && (
        <div className="assistant" role="dialog" aria-label="Résumé assistant">
          <div className="assistant-head">
            <div>
              <div className="assistant-title">Ask my résumé</div>
              <div className="assistant-sub">
                <span className="pulse" /> Instant answers · runs in your browser
              </div>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close">
              <FiX />
            </button>
          </div>

          <div className="assistant-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="bubble bot typing-dots">
                <span />
                <span />
                <span />
              </div>
            )}
            {messages.length <= 2 && (
              <div className="suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="assistant-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What's your AWS experience?"
            />
            <button className="btn btn-primary" disabled={!input.trim() || typing} aria-label="Send">
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
