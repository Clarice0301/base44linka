import React from "react";
import { Check } from "lucide-react";
import { Chip, IconBox, ProgressBar } from "@/components/linka/primitives";
import { useLinka } from "@/context/LinkaContext";

export default function CourseCard({ course }) {
  const { lessons, openSheet } = useLinka();
  const done = lessons[course.id] || [];
  const total = course.lessons?.length || 3;
  const percent = Math.round((done.length / total) * 100);
  const complete = done.length >= total;

  return (
    <article className="lk-card">
      <div className="flex items-start gap-3">
        <IconBox icon={course.icon} accent={course.accent} />
        <div className="min-w-0 flex-1">
          <h3 className="lk-card-title">{course.title}</h3>
          <p className="lk-card-sub">
            {course.level} · {course.duration}
          </p>
        </div>
        {complete ? (
          <Chip tone="teal">
            <Check size={13} strokeWidth={2.6} /> Concluído
          </Chip>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(course.skills || []).map((skill) => (
          <Chip key={skill} tone="blue">
            {skill}
          </Chip>
        ))}
      </div>

      <div className="mt-4">
        <ProgressBar value={percent} />
      </div>
      <p className="lk-card-sub mt-2">
        {done.length} de {total} lições
      </p>

      <button
        type="button"
        className="lk-btn lk-btn-soft lk-btn-sm mt-3"
        onClick={() => openSheet("course", course.id)}
      >
        {done.length && !complete ? "Continuar curso" : complete ? "Rever curso" : "Começar curso"}
      </button>
    </article>
  );
}