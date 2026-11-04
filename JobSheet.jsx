import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, ThumbsDown } from "lucide-react";
import BottomSheet from "@/components/linka/BottomSheet";
import { Chip, IconBox, ProgressBar } from "@/components/linka/primitives";
import { useLinka } from "@/context/LinkaContext";
import { matchJob, validatedMap } from "@/lib/linka/match";

const REJECT_REASONS = ["Não é minha área", "Salário abaixo do que busco", "Local ou modelo ruim para mim", "Não curti a empresa"];

export default function JobSheet() {
  const {
    sheet, closeSheet, jobs, applications, applyToJob, courses, catalogCourses,
    openSheet, missingFor, profile, preferences, addRejected, notify,
  } = useLinka();
  const [message, setMessage] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [lastJob, setLastJob] = useState(null);
  const navigate = useNavigate();

  const open = sheet?.type === "job";
  const job = jobs.find((item) => item.id === sheet?.id) || null;
  const data = job || lastJob;

  useEffect(() => {
    if (job) setLastJob(job);
  }, [job]);

  useEffect(() => {
    if (open) {
      setMessage("");
      setRejecting(false);
    }
  }, [open, job?.id]);

  const applied = data ? applications.some((item) => item.jobId === data.id) : false;
  const result = data ? matchJob(data, profile, preferences, null, validatedMap(profile)) : null;
  const missing = data ? missingFor(data) : [];
  const internalRelated = data
    ? courses.filter((course) => (course.skills || []).some((skill) => missing.includes(skill)))
    : [];
  const catalogRelated = data
    ? catalogCourses.filter((course) => (course.skills || []).some((skill) => missing.includes(skill))).slice(0, 3)
    : [];

  const handleApply = () => {
    applyToJob(data, message);
    closeSheet();
    navigate("/candidaturas");
  };

  const handleReject = (reason) => {
    addRejected(data.id, reason);
    notify("Ok, anotado.", "Vamos mostrar menos vagas como essa.");
    setRejecting(false);
    closeSheet();
  };

  return (
    <BottomSheet
      open={open}
      onClose={closeSheet}
      title={data?.title || "Vaga"}
      footer={
        data ? (
          applied ? (
            <button type="button" className="lk-btn lk-btn-primary" disabled>
              ✓ Candidatura enviada
            </button>
          ) : (
            <button type="button" className="lk-btn lk-btn-primary" onClick={handleApply}>
              Candidatar-se
            </button>
          )
        ) : null
      }
    >
      {data ? (
        <>
          <div className="flex items-start gap-3">
            <IconBox icon={data.icon} accent={data.accent} size={52} />
            <div>
              <h2 className="lk-card-title" style={{ fontSize: 18 }}>
                {data.title}
              </h2>
              <p className="lk-card-sub">
                {data.company}
                {data.city ? ` · ${data.city}` : ""}
              </p>
            </div>
          </div>

          <p className="lk-salary" style={{ fontSize: 18 }}>
            {data.salary_label}
          </p>

          <div className="flex flex-wrap gap-2">
            <Chip tone="blue">{data.work_model}</Chip>
            {data.level ? <Chip tone="blue">{data.level}</Chip> : null}
            {data.contract ? <Chip tone="blue">{data.contract}</Chip> : null}
            <Chip tone="teal">
              <Check size={13} strokeWidth={2.4} /> Orçamento confirmado
            </Chip>
            <Chip tone="sun">
              <Clock size={13} strokeWidth={2} /> Resposta em até {data.sla_days || data.response_days || 5} dias
            </Chip>
            {data.is_demo !== false ? <Chip tone="sun">Vaga de demonstração</Chip> : null}
          </div>

          <div className="mt-6">
            <p className="lk-eyebrow">Como é a rotina</p>
            <p className="lk-sub" style={{ marginTop: 8 }}>
              {data.description}
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="lk-eyebrow">Seu match e por quê</p>
              <strong style={{ fontSize: 15, color: "var(--teal-ink)" }}>{result.score}%</strong>
            </div>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={result.score} />
            </div>
            <div className="mt-3 space-y-2">
              {result.factors.map((factor) => (
                <div key={factor.key} className="flex items-center gap-2">
                  <span style={{ width: 132, fontSize: 12, color: "var(--ink-2)", flexShrink: 0 }}>{factor.label}</span>
                  <div style={{ flex: 1 }}>
                    <ProgressBar value={factor.score} />
                  </div>
                  <span style={{ fontSize: 11.5, color: "var(--ink-2)", width: 36, textAlign: "right" }}>
                    {factor.score}%
                  </span>
                </div>
              ))}
            </div>
            <p className="lk-card-sub mt-2">
              Confiança do match: <strong>{result.confidence >= 75 ? "alta" : result.confidence >= 60 ? "média" : "baixa"}</strong> —
              complete "O que eu busco" e seu currículo para aumentá-la.
            </p>
            {result.eliminated ? (
              <p className="lk-card-sub mt-2" style={{ color: "var(--sun-ink)" }}>
                Critério eliminatório aplicado: {result.eliminatedReason}
              </p>
            ) : null}
            {result.pros.length ? (
              <div className="mt-3">
                <p className="lk-card-sub" style={{ fontWeight: 600, color: "var(--teal-ink)" }}>A seu favor</p>
                {result.pros.map((pro) => (
                  <p key={pro} className="lk-card-sub">✓ {pro}</p>
                ))}
              </div>
            ) : null}
            {result.gaps.length ? (
              <div className="mt-2">
                <p className="lk-card-sub" style={{ fontWeight: 600, color: "var(--sun-ink)" }}>O que falta</p>
                {result.gaps.map((gap) => (
                  <p key={gap} className="lk-card-sub">• {gap}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            <p className="lk-eyebrow">O que a vaga pede</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(data.requirements || []).map((skill) => {
                const has = !missing.includes(skill);
                return (
                  <Chip key={skill} tone={has ? "teal" : "sun"}>
                    {has ? <Check size={13} strokeWidth={2.6} /> : null} {skill}
                  </Chip>
                );
              })}
            </div>
          </div>

          {internalRelated.length || catalogRelated.length ? (
            <div className="mt-6">
              <p className="lk-eyebrow">Cursos que ensinam o que falta</p>
              <div className="mt-2 space-y-2">
                {internalRelated.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    className="lk-btn lk-btn-soft lk-btn-sm"
                    onClick={() => openSheet("course", course.id)}
                  >
                    {course.title} · Linka
                  </button>
                ))}
                {catalogRelated.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    className="lk-btn lk-btn-soft lk-btn-sm"
                    onClick={() => openSheet("catalogCourse", course.id)}
                  >
                    {course.title} · {course.provider}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {!applied ? (
            <div className="mt-6">
              <label className="lk-eyebrow" htmlFor="job-message">
                Mensagem (opcional)
              </label>
              <textarea
                id="job-message"
                className="lk-textarea mt-2"
                placeholder="Conte em uma frase por que essa vaga combina com você."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              {rejecting ? (
                <div className="mt-3">
                  <p className="lk-eyebrow">Por que não tenho interesse?</p>
                  <div className="mt-2 space-y-2">
                    {REJECT_REASONS.map((reason) => (
                      <button key={reason} type="button" className="lk-btn lk-btn-soft lk-btn-sm" onClick={() => handleReject(reason)}>
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2"
                  style={{ color: "var(--ink-2)", fontSize: 13.5, fontWeight: 500 }}
                  onClick={() => setRejecting(true)}
                >
                  <ThumbsDown size={14} strokeWidth={1.8} /> Não tenho interesse nesta vaga
                </button>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </BottomSheet>
  );
}