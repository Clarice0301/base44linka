import React from "react";
import { FileText } from "lucide-react";
import { Chip, EmptyState, IconBox } from "@/components/linka/primitives";
import { STAGES } from "@/lib/linka/data";
import { useLinka } from "@/context/LinkaContext";

const STAGE_TONES = ["blue", "sun", "teal", "blue"];

export default function ApplicationDashboard() {
  const { applications } = useLinka();

  const counts = STAGES.map(
    (_, stage) => applications.filter((item) => item.stage === stage).length
  );

  return (
    <section className="mt-6">
      <div className="flex items-center gap-2">
        <FileText size={16} strokeWidth={1.8} style={{ color: "var(--ink-2)" }} />
        <p className="lk-eyebrow">Minhas candidaturas</p>
      </div>

      {applications.length ? (
        <div className="lk-card mt-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <b style={{ fontSize: 26, fontWeight: 600, color: "var(--ink)" }}>
                {applications.length}
              </b>
              <p className="lk-card-sub">candidaturas enviadas</p>
            </div>
            <div className="flex flex-wrap justify-end gap-1.5">
              {STAGES.map((label, stage) =>
                counts[stage] ? (
                  <Chip key={label} tone={STAGE_TONES[stage]}>
                    {counts[stage]} {label.toLowerCase()}
                  </Chip>
                ) : null
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center gap-3"
                style={{
                  padding: "10px 12px",
                  borderRadius: 16,
                  border: "1px solid var(--line)",
                }}
              >
                <IconBox icon={application.icon} accent={application.accent} size={38} />
                <div className="min-w-0 flex-1">
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {application.jobTitle}
                  </p>
                  <p className="lk-card-sub">{application.company}</p>
                </div>
                <Chip tone={STAGE_TONES[application.stage] || "blue"}>
                  {STAGES[application.stage] || STAGES[0]}
                </Chip>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <EmptyState
            icon={FileText}
            title="Nenhuma candidatura ainda"
            text="Quando você se candidatar, acompanhe aqui o total enviado e a etapa de cada processo."
          />
        </div>
      )}
    </section>
  );
}