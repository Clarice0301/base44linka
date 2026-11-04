import React from "react";
import { TrendingUp, UserRound, UserRoundPlus } from "lucide-react";
import { useLinka } from "@/context/LinkaContext";

export default function RecruiterPanel() {
  const { jobs, applications, threads } = useLinka();

  const perJob = jobs.map((job) => {
    const apps = applications.filter((item) => item.jobId === job.id);
    const advanced = apps.filter((item) => item.stage > 0).length;
    return { job, total: apps.length, advanced };
  });

  const totalApps = applications.length;
  const advancedTotal = applications.filter((item) => item.stage > 0).length;
  const responded = applications.filter(
    (item) =>
      item.stage > 0 ||
      (threads[item.id] || []).some((message) => message.from === "company")
  ).length;
  const responseRate = totalApps ? Math.round((responded / totalApps) * 100) : 0;

  return (
    <section className="mt-4">
      <div className="grid grid-cols-3 gap-2.5">
        <div className="lk-tile">
          <b>{totalApps}</b>
          <span>candidaturas recebidas</span>
        </div>
        <div className="lk-tile">
          <b>{advancedTotal}</b>
          <span>avançaram de etapa</span>
        </div>
        <div className="lk-tile">
          <b>{responseRate}%</b>
          <span>taxa de resposta</span>
        </div>
      </div>

      <div className="lk-card mt-3">
        <div className="flex items-center gap-2">
          <UserRound size={16} strokeWidth={1.8} style={{ color: "var(--ink-2)" }} />
          <p className="lk-eyebrow">Candidatos por vaga</p>
        </div>
        <div className="mt-3 space-y-2.5">
          {perJob.map(({ job, total, advanced }) => (
            <div key={job.id}>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="min-w-0 truncate"
                  style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}
                >
                  {job.title}
                </span>
                <span
                  className="flex-none"
                  style={{ fontSize: 12, color: "var(--ink-2)" }}
                >
                  {total} candidatura(s) · {advanced} avançaram
                </span>
              </div>
              <div className="lk-progress mt-1.5" style={{ height: 6 }}>
                <i
                  style={{
                    width: total ? `${Math.round((advanced / total) * 100)}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {!totalApps ? (
          <div className="mt-3 flex items-center gap-2">
            <UserRoundPlus size={14} strokeWidth={1.8} style={{ color: "var(--ink-2)" }} />
            <p className="lk-card-sub">
              Nenhuma candidatura registrada ainda — os números aparecem aqui assim que
              chegarem.
            </p>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp size={14} strokeWidth={1.8} style={{ color: "var(--teal-ink)" }} />
            <p className="lk-card-sub">
              Taxa de resposta considera candidaturas que avançaram de etapa ou
              receberam mensagem da empresa.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}