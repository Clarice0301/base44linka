import React from "react";
import { Check } from "lucide-react";
import { STAGES } from "@/lib/linka/data";

export default function StageTrack({ stage }) {
  return (
    <div className="lk-track" aria-label={`Etapa atual: ${STAGES[stage] || STAGES[0]}`}>
      {STAGES.map((label, index) => {
        const state = index < stage ? "is-done" : index === stage ? "is-current" : "is-next";
        return (
          <div key={label} className={`lk-step ${state}`}>
            <span className="lk-step-dot">
              {index < stage ? <Check size={12} strokeWidth={3} /> : index + 1}
            </span>
            <span className="lk-step-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}