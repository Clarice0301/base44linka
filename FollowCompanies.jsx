import React, { useState } from "react";
import { Building2 } from "lucide-react";
import { Chip } from "@/components/linka/primitives";

const KEY = "lk-following";

const DEMO_COMPANIES = [
  { id: "aurora", name: "Loja Aurora", area: "Vendas" },
  { id: "nuvem", name: "Nuvem Digital", area: "Tecnologia" },
  { id: "bemviver", name: "Clínica Bem Viver", area: "Saúde" },
];

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export default function FollowCompanies() {
  const [following, setFollowing] = useState(read);

  const toggle = (id) => {
    const next = following.includes(id) ? following.filter((item) => item !== id) : [...following, id];
    setFollowing(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return (
    <div className="lk-card">
      <div className="flex items-center gap-2">
        <Building2 size={16} strokeWidth={1.8} style={{ color: "var(--ink-2)" }} />
        <p className="lk-eyebrow">Empresas para seguir</p>
        <Chip tone="sun">demonstração</Chip>
      </div>
      <div className="mt-3 space-y-2">
        {DEMO_COMPANIES.map((company) => {
          const isOn = following.includes(company.id);
          return (
            <div key={company.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <strong style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>{company.name}</strong>
                <span className="lk-card-sub">{company.area}</span>
              </div>
              <button
                type="button"
                className={`lk-btn lk-btn-sm lk-btn-sm${isOn ? " lk-btn-soft" : " lk-btn-primary"}`}
                style={{ width: 108, flexShrink: 0 }}
                onClick={() => toggle(company.id)}
                aria-pressed={isOn}
              >
                {isOn ? "Seguindo" : "Seguir"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}