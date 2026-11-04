const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import {
  Atom,
  BarChart3,
  Briefcase,
  Code2,
  Compass,
  Database,
  GraduationCap,
  Headset,
  Link2,
  Megaphone,
  MessageCircle,
  PenTool,
  Sparkles,
  Terminal,
} from "lucide-react";

export const LOGO_HEADER =
  "https://media.db.com/images/public/6ac8d5f89842e8db0bf32c19/04e6ff06a_a0cbe5f4-9af2-41b5-ac1b-856a811fa4f0-removebg-preview.png";
export const LOGO_AUTH =
  "https://media.db.com/images/public/6ac8d5f89842e8db0bf32c19/8da5a68d4_Linka.png";

export const LOGO_COLOR =
  "https://media.db.com/images/public/6ac8d5f89842e8db0bf32c19/e0e431e8f_Gray_Minimalist_Name_Logo-removebg-preview.png";

export const ICONS = {
  code: Code2,
  chart: BarChart3,
  megaphone: Megaphone,
  pen: PenTool,
  headset: Headset,
  atom: Atom,
  database: Database,
  terminal: Terminal,
  message: MessageCircle,
  sparkles: Sparkles,
  link: Link2,
  briefcase: Briefcase,
  graduation: GraduationCap,
  compass: Compass,
};

export const ACCENT_BG = {
  blue: "var(--brand-navy)",
  teal: "var(--brand-teal)",
  sun: "var(--brand-sun)",
};

export const ACCENT_INK = {
  blue: "#FFFFFF",
  teal: "#FFFFFF",
  sun: "#12385D",
};

export const BASE_SKILLS = ["HTML", "CSS", "JavaScript"];

export const WORK_FILTERS = ["Todas", "Remoto", "Híbrido", "Presencial", "Salvas"];
export const COURSE_FILTERS = ["Todos", "Em andamento", "Concluídos"];

export const STAGES = ["Recebido", "Em análise", "Entrevista", "Feedback"];

export const STAGE_MESSAGES = [
  "Recebemos sua candidatura. Retorno garantido até {data}.",
  "A equipe está olhando seu perfil com carinho.",
  "Você foi chamado(a) para uma conversa rápida de alinhamento.",
  "Processo encerrado. A empresa seguiu com outro perfil e deixou um retorno para você.",
];

export const TOUR_SLIDES = [
  {
    icon: Link2,
    title: "Bem-vindo ao Linka",
    text: "Aqui você encontra vagas de verdade, com salário e prazo de resposta à vista. Sem letras miúdas.",
  },
  {
    icon: Briefcase,
    title: "Vagas transparentes",
    text: "Cada vaga mostra o orçamento confirmado e quanto do seu perfil já combina com ela.",
  },
  {
    icon: GraduationCap,
    title: "Cursos que abrem portas",
    text: "Lições curtas que somam habilidades ao seu perfil e aumentam seu match com as vagas.",
  },
];

export const WORKFLOW = [
  { n: "1", title: "Aprenda", text: "Cursos curtos somam habilidades ao seu perfil." },
  { n: "2", title: "Conecte-se", text: "Candidate-se a vagas com salário à vista." },
  { n: "3", title: "Acompanhe", text: "Veja cada etapa até o retorno final." },
];

export const THEME_OPTIONS = [
  { value: "auto", label: "Automático" },
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
];

export function deadlineFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function formatDeadline(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" }).format(date);
}

export function formatShortDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);
}

export function matchPercent(job, skills = []) {
  const requirements = job?.requirements || [];
  if (!requirements.length) return 0;
  const have = requirements.filter((item) => skills.includes(item)).length;
  return Math.round((have / requirements.length) * 100);
}

export function missingSkills(job, skills = []) {
  return (job?.requirements || []).filter((item) => !skills.includes(item));
}

export function stageMessage(stage, deadline) {
  const message = STAGE_MESSAGES[stage] || STAGE_MESSAGES[0];
  return message.replace("{data}", formatDeadline(deadline));
}