import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, RefreshCw } from "lucide-react";
import { IconBox } from "@/components/linka/primitives";
import StageTrack from "@/components/linka/StageTrack";
import { useLinka } from "@/context/LinkaContext";
import { stageMessage } from "@/lib/linka/data";

export default function ApplicationCard({ application }) {
  const { advanceStage } = useLinka();
  const navigate = useNavigate();
  const finished = application.stage >= 3;

  return (
    <article className="lk-card">
      <div className="flex items-start gap-3">
        <IconBox icon={application.icon} accent={application.accent} />
        <div className="min-w-0 flex-1">
          <h3 className="lk-card-title">{application.jobTitle}</h3>
          <p className="lk-card-sub">{application.company}</p>
        </div>
      </div>

      <StageTrack stage={application.stage} />

      <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink)" }}>
        {stageMessage(application.stage, application.deadline)}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="lk-btn lk-btn-soft lk-btn-sm"
          onClick={() => navigate(`/chat/${application.id}`)}
        >
          <MessageSquare size={16} strokeWidth={1.8} /> Conversar
        </button>
        <button
          type="button"
          className="lk-btn lk-btn-primary lk-btn-sm"
          disabled={finished}
          onClick={() => advanceStage(application.id)}
        >
          <RefreshCw size={16} strokeWidth={1.8} />
          {finished ? "Encerrado" : "Simular resposta"}
        </button>
      </div>
    </article>
  );
}