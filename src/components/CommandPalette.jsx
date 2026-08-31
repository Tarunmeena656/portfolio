import { useEffect, useMemo, useRef, useState } from "react";
import { FiCornerDownLeft, FiSearch } from "react-icons/fi";

export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.hint || ""} ${a.group}`.toLowerCase().includes(q));
  }, [query, actions]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  const run = (action) => {
    onClose();
    action.run();
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && filtered[cursor]) {
      run(filtered[cursor]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()} onKeyDown={onKey} role="dialog" aria-modal="true">
        <div className="palette-search">
          <FiSearch />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, open a link, toggle theme…"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list">
          {filtered.length === 0 && <li className="palette-empty">No matches</li>}
          {filtered.map((a, i) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <li key={a.id}>
                {showGroup && <div className="palette-group">{a.group}</div>}
                <button
                  className={`palette-item ${i === cursor ? "active" : ""}`}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => run(a)}
                >
                  <span className="palette-icon">{a.icon}</span>
                  <span className="palette-label">{a.label}</span>
                  {a.hint && <span className="palette-hint">{a.hint}</span>}
                  {i === cursor && <FiCornerDownLeft className="palette-enter" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
