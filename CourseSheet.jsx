import React, { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import BottomSheet from "@/components/linka/BottomSheet";
import { Chip, IconBox, ProgressBar } from "@/components/linka/primitives";
import { useLinka } from "@/context/LinkaContext";

export default function CourseSheet() {
  const { sheet, closeSheet, courses, lessons, toggleLesson } = useLinka();
  const [lastCourse, setLastCourse] = useState(null);
  const [opened, setOpened] = useState(0);

  const open = sheet?.type === "course";
  const course = courses.find((item) => item.id === sheet?.id) || null;
  const data = course || lastCourse;

  useEffect(() => {
    if (course) setLastCourse(course);
  }, [course]);

  useEffect(() => {
    if (open) setOpened(0);
  }, [open, course?.id]);

  const done = data ? lessons[data.id] || [] : [];
  const total = data?.lessons?.length || 3;
  const percent = Math.round((done.length / total) * 100);
  const complete = done.length >= total;

  return (
    <BottomSheet open={open} onClose={closeSheet} title={data?.title || "Curso"}>
      {data ? (
        <>
          <div className="flex items-start gap-3">
            <IconBox icon={data.icon} accent={data.accent} size={52} />
            <div>
              <h2 className="lk-card-title" style={{ fontSize: 18 }}>
                {data.title}
              </h2>
              <p className="lk-card-sub">
                {data.level} · {data.duration}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar value={percent} />
          </div>
          <p className="lk-card-sub mt-2">
            {done.length} de {total} lições concluídas
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {(data.skills || []).map((skill) => (
              <Chip key={skill} tone={complete ? "teal" : "blue"}>
                {complete ? <Check size={13} strokeWidth={2.6} /> : null} {skill}
              </Chip>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            {(data.lessons || []).map((lesson, index) => {
              const isDone = done.includes(index);
              const isOpen = opened === index;
              return (
                <div
                  key={lesson.title}
                  style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 18 }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 p-3 text-left"
                    onClick={() => setOpened(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className="grid place-items-center"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: isDone ? "var(--tint-teal)" : "var(--tint-blue)",
                        color: isDone ? "var(--teal-ink)" : "var(--ink-2)",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {isDone ? <Check size={14} strokeWidth={2.6} /> : index + 1}
                    </span>
                    <span className="flex-1" style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                      {lesson.title}
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      style={{
                        color: "var(--ink-2)",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  {isOpen ? (
                    <div className="px-3 pb-3" style={{ paddingLeft: 52 }}>
                      <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)" }}>{lesson.text}</p>
                      <button
                        type="button"
                        className={`lk-btn lk-btn-sm mt-3 ${isDone ? "lk-btn-soft" : "lk-btn-primary"}`}
                        onClick={() => toggleLesson(data.id, index)}
                      >
                        {isDone ? "Desmarcar lição" : "Concluir lição"}
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </BottomSheet>
  );
}