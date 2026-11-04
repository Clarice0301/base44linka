import React, { useState } from "react";
import { Check, Plus, Target } from "lucide-react";

const KEY = "lk-goals";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export default function CareerGoals() {
  const [goals, setGoals] = useState(read);
  const [text, setText] = useState("");

  const save = (next) => {
    setGoals(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const add = () => {
    const clean = text.trim();
    if (!clean) return;
    save([...goals, { id: Date.now().toString(36), text: clean, done: false }]);
    setText("");
  };

  const toggle = (id) => {
    save(goals.map((goal) => (goal.id === id ? { ...goal, done: !goal.done } : goal)));
  };

  return (
    <div className="lk-card">
      <div className="flex items-center gap-2">
        <Target size={16} strokeWidth={1.8} style={{ color: "var(--teal-ink)" }} />
        <p className="lk-eyebrow">Metas de carreira</p>
      </div>
      <div className="mt-3 space-y-2">
        {goals.map((goal) => (
          <button key={goal.id} type="button" className="flex w-full items-center gap-2 text-left" onClick={() => toggle(goal.id)}>
            <span
              className="grid place-items-center"
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                flexShrink: 0,
                background: goal.done ? "var(--tint-teal)" : "var(--tint-blue)",
                color: goal.done ? "var(--teal-ink)" : "var(--ink-2)",
              }}
            >
              <Check size={13} strokeWidth={2.6} />
            </span>
            <span
              style={{
                fontSize: 13.5,
                color: goal.done ? "var(--ink-2)" : "var(--ink)",
                textDecoration: goal.done ? "line-through" : "none",
              }}
            >
              {goal.text}
            </span>
          </button>
        ))}
        {!goals.length ? <p className="lk-card-sub">Ex.: "Concluir um curso de Excel este mês".</p> : null}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="lk-input"
          placeholder="Nova meta"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && add()}
          aria-label="Nova meta de carreira"
        />
        <button type="button" className="lk-btn lk-btn-primary lk-btn-sm" style={{ width: 52, flexShrink: 0 }} onClick={add} aria-label="Adicionar meta">
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}