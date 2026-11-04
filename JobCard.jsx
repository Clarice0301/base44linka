import React from "react";
import { Check, Heart } from "lucide-react";
import { Chip, IconBox } from "@/components/linka/primitives";
import { useLinka } from "@/context/LinkaContext";

export default function JobCard({ job }) {
  const { saved, toggleSaved, applications, openSheet, matchFor } = useLinka();
  const applied = applications.some((item) => item.jobId === job.id);
  const isSaved = saved.includes(job.id);

  return (
    <article className="lk-card">
      <div className="flex items-start gap-3">
        <IconBox icon={job.icon} accent={job.accent} />
        <div className="min-w-0 flex-1">
          <h3 className="lk-card-title">{job.title}</h3>
          <p className="lk-card-sub">
            {job.company}
            {job.city ? ` · ${job.city}` : ""}
          </p>
        </div>
        <button
          type="button"
          className={`lk-heart${isSaved ? " is-on" : ""}`}
          onClick={() => toggleSaved(job.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remover dos salvos" : "Salvar vaga"}
        >
          <Heart size={18} strokeWidth={1.8} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="lk-salary">{job.salary_label}</p>

      <div className="flex flex-wrap gap-2">
        <Chip tone="blue">{job.work_model}</Chip>
        {job.level ? <Chip tone="blue">{job.level}</Chip> : null}
        {job.contract ? <Chip tone="blue">{job.contract}</Chip> : null}
        <Chip tone="teal">
          <Check size={13} strokeWidth={2.4} /> Orçamento confirmado
        </Chip>
        {job.is_demo !== false ? <Chip tone="sun">Vaga de demonstração</Chip> : null}
        <Chip tone="sun">{matchFor(job)}% de match</Chip>
      </div>

      {applied ? (
        <div className="lk-chip lk-chip-teal mt-3 w-full justify-center">✓ Candidatura enviada</div>
      ) : (
        <button type="button" className="lk-btn lk-btn-primary mt-3" onClick={() => openSheet("job", job.id)}>
          Ver vaga
        </button>
      )}
    </article>
  );
}