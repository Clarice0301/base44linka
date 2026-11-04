const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { applyTheme, clearState, readState, readTheme, writeState, writeTheme } from "@/lib/linka/storage";
import { BASE_SKILLS, STAGES, deadlineFromToday, formatDeadline, missingSkills } from "@/lib/linka/data";
import { matchJob, validatedMap } from "@/lib/linka/match";

const LinkaContext = createContext(null);

const DEFAULT_PROFILE = {
  name: "",
  headline: "Dando o próximo passo na carreira",
  photoUrl: "",
  bio: "",
  city: "",
  phone: "",
  linkedin: "",
  skills: [...BASE_SKILLS],
};

function hydrate() {
  const stored = readState() || {};
  const profile = { ...DEFAULT_PROFILE, ...(stored.profile || {}) };
  if (!Array.isArray(profile.skills)) profile.skills = [...BASE_SKILLS];
  return {
    profile,
    lessons: stored.lessons || {},
    applications: stored.applications || [],
    saved: stored.saved || [],
    threads: stored.threads || {},
    events: stored.events || [],
    rejected: stored.rejected || [],
    tourSeen: Boolean(stored.tourSeen),
  };
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function LinkaProvider({ children }) {
  const { toast } = useToast();
  const [state, setState] = useState(hydrate);
  const [theme, setTheme] = useState(() => readTheme() || "auto");
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [catalogCourses, setCatalogCourses] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    writeState(state);
  }, [state]);

  useEffect(() => {
    applyTheme(theme);
    writeTheme(theme);
  }, [theme]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [jobPage, coursePage, catalogPage, prefPage] = await Promise.all([
        db.entities.Job.filter({}, { sort: "order", limit: 50 }),
        db.entities.Course.filter({}, { sort: "order", limit: 50 }),
        db.entities.CatalogCourse.filter({ active: true }, { sort: "title", limit: 100 }),
        db.entities.Preference.filter({}, { limit: 1 }),
      ]);
      if (!alive) return;
      setJobs(jobPage.items || []);
      setCourses(coursePage.items || []);
      setCatalogCourses(catalogPage.items || []);
      setPreferences(prefPage.items?.[0] || null);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const notify = useCallback(
    (title, description) => {
      toast({ title, description, className: "border-0 bg-[#12385D] text-white" });
    },
    [toast]
  );

  const skills = state.profile.skills;

  const matchFor = useCallback(
    (job) => matchJob(job, state.profile, preferences, null, validatedMap(state.profile)).score,
    [state.profile, preferences]
  );
  const missingFor = useCallback((job) => missingSkills(job, skills), [skills]);

  const openSheet = useCallback((type, id) => setSheet({ type, id }), []);
  const closeSheet = useCallback(() => setSheet(null), []);

  const savePreferences = useCallback(
    (data) => {
      setPreferences(data);
      if (data.id) {
        return db.entities.Preference.update(data.id, data);
      }
      return db.entities.Preference.create(data).then((created) => {
        setPreferences(created);
        return created;
      });
    },
    []
  );

  const addRejected = useCallback((jobId, reason) => {
    setState((prev) => ({
      ...prev,
      rejected: [{ jobId, reason, at: new Date().toISOString() }, ...(prev.rejected || [])],
    }));
  }, []);

  const completeTour = useCallback(() => setState((prev) => ({ ...prev, tourSeen: true })), []);

  const updateProfile = useCallback((patch) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const toggleSaved = useCallback((jobId) => {
    setState((prev) => ({
      ...prev,
      saved: prev.saved.includes(jobId)
        ? prev.saved.filter((id) => id !== jobId)
        : [...prev.saved, jobId],
    }));
  }, []);

  const applyToJob = useCallback(
    (job, message) => {
      const deadline = deadlineFromToday(job.response_days || 5);
      const at = new Date().toISOString();
      const application = {
        id: uid(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        icon: job.icon,
        accent: job.accent,
        stage: 0,
        deadline,
        message: message || "",
        createdAt: at,
      };
      setState((prev) => ({
        ...prev,
        applications: [application, ...prev.applications],
        events: [
          {
            id: uid(),
            type: "apply",
            text: `Candidatura enviada para ${job.title} na ${job.company}.`,
            at,
          },
          ...prev.events,
        ],
      }));
      notify(
        "Candidatura enviada.",
        `Você receberá retorno até ${formatDeadline(deadline)}.`
      );
    },
    [notify]
  );

  const advanceStage = useCallback(
    (applicationId) => {
      const application = state.applications.find((item) => item.id === applicationId);
      if (!application || application.stage >= 3) return;
      const stage = application.stage + 1;
      setState((prev) => ({
        ...prev,
        applications: prev.applications.map((item) =>
          item.id === applicationId ? { ...item, stage } : item
        ),
        events: [
          {
            id: uid(),
            type: "stage",
            text: `Etapa "${STAGES[stage]}" em ${application.jobTitle} na ${application.company}.`,
            at: new Date().toISOString(),
          },
          ...prev.events,
        ],
      }));
      notify(`Nova etapa: ${STAGES[stage]}`, application.jobTitle);
    },
    [state.applications, notify]
  );

  const toggleLesson = useCallback(
    (courseId, index) => {
      const course = courses.find((item) => item.id === courseId);
      const done = state.lessons[courseId] || [];
      const already = done.includes(index);
      const nextDone = already
        ? done.filter((item) => item !== index)
        : [...done, index].sort((a, b) => a - b);
      const total = course?.lessons?.length || 3;
      const finished = !already && course && nextDone.length >= total;
      const gained = finished
        ? (course.skills || []).filter((skill) => !state.profile.skills.includes(skill))
        : [];

      setState((prev) => ({
        ...prev,
        lessons: { ...prev.lessons, [courseId]: nextDone },
        profile: gained.length
          ? { ...prev.profile, skills: [...prev.profile.skills, ...gained] }
          : prev.profile,
        events: finished
          ? [
              {
                id: uid(),
                type: "course",
                text: `Curso concluído: ${course.title}. Habilidades novas: ${(course.skills || []).join(", ")}.`,
                at: new Date().toISOString(),
              },
              ...prev.events,
            ]
          : prev.events,
      }));

      if (finished) {
        notify(
          "Curso concluído!",
          `Nova habilidade: ${(course.skills || []).join(", ")}. Seus matches foram atualizados.`
        );
      }
    },
    [courses, state.lessons, state.profile.skills, notify]
  );

  const sendMessage = useCallback((applicationId, text, from = "me") => {
    const clean = (text || "").trim();
    if (!clean) return;
    setState((prev) => ({
      ...prev,
      threads: {
        ...prev.threads,
        [applicationId]: [
          ...(prev.threads[applicationId] || []),
          { id: uid(), from, text: clean, at: new Date().toISOString() },
        ],
      },
    }));
  }, []);

  const resetAll = useCallback(() => {
    clearState();
    setState({
      profile: { ...DEFAULT_PROFILE, skills: [...BASE_SKILLS] },
      lessons: {},
      applications: [],
      saved: [],
      threads: {},
      events: [],
      rejected: [],
      tourSeen: true,
    });
    notify("Tudo limpo.", "Você pode recomeçar do zero.");
  }, [notify]);

  const value = useMemo(
    () => ({
      jobs,
      courses,
      catalogCourses,
      preferences,
      savePreferences,
      addRejected,
      loading,
      sheet,
      openSheet,
      closeSheet,
      profile: state.profile,
      lessons: state.lessons,
      applications: state.applications,
      saved: state.saved,
      threads: state.threads,
      events: state.events,
      rejected: state.rejected || [],
      tourSeen: state.tourSeen,
      completeTour,
      theme,
      setTheme,
      matchFor,
      missingFor,
      toggleSaved,
      applyToJob,
      advanceStage,
      toggleLesson,
      sendMessage,
      updateProfile,
      resetAll,
      notify,
    }),
    [
      jobs,
      courses,
      catalogCourses,
      preferences,
      savePreferences,
      addRejected,
      loading,
      sheet,
      openSheet,
      closeSheet,
      state,
      completeTour,
      theme,
      matchFor,
      missingFor,
      toggleSaved,
      applyToJob,
      advanceStage,
      toggleLesson,
      sendMessage,
      updateProfile,
      resetAll,
      notify,
    ]
  );

  return <LinkaContext.Provider value={value}>{children}</LinkaContext.Provider>;
}

export function useLinka() {
  const context = useContext(LinkaContext);
  if (!context) throw new Error("useLinka precisa estar dentro de LinkaProvider");
  return context;
}