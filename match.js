// Motor de match do Linka — nota 0 a 100 com fatores explicados.
// Nunca usa idade, gênero, raça, religião, estado civil, deficiência ou foto.

export const WEIGHT_KEYS = [
  ["skills", "Habilidades"],
  ["experience", "Experiência e formação"],
  ["salary", "Salário"],
  ["location", "Modelo e local"],
  ["culture", "Valores e cultura"],
  ["courses", "Cursos exigidos"],
];

export const DEFAULT_WEIGHTS = { skills: 3, experience: 2, salary: 3, location: 3, culture: 2, courses: 2 };

// Mapa de habilidades validadas: declaradas no perfil + testes + certificados.
export function validatedMap(profile, certSkills = [], testSkills = {}) {
  const map = { ...(profile.validated || {}) };
  certSkills.forEach((skill) => (map[skill] = Math.max(map[skill] || 0, 3)));
  Object.entries(testSkills || {}).forEach(([skill, level]) => {
    map[skill] = Math.max(map[skill] || 0, level);
  });
  return map;
}

function skillScore(job, skills, validated) {
  const reqs = job.requirements || [];
  if (!reqs.length) return { score: 60, have: 0, total: 0 };
  let have = 0;
  let max = 0;
  reqs.forEach((skill) => {
    const level = validated[skill] || 0;
    max += 1.5;
    if (skills.includes(skill)) {
      have += level > 0 ? 1.5 : 1;
    }
  });
  return { score: Math.round((Math.min(have, max) / max) * 100), have, total: reqs.length };
}

export function matchJob(job, profile, pref, weightsInput, validated = {}) {
  const weights = { ...DEFAULT_WEIGHTS, ...(pref?.weights || weightsInput || {}) };
  const factors = [];
  const pros = [];
  const gaps = [];

  // Habilidades
  const sk = skillScore(job, profile.skills || [], validated);
  factors.push({ key: "skills", label: "Habilidades", score: sk.score, weight: weights.skills });
  if (sk.have === sk.total && sk.total > 0) pros.push(`Você já declara todas as ${sk.total} habilidades da vaga.`);
  else if (sk.have > 0) pros.push(`Você tem ${sk.have} de ${sk.total} habilidades pedidas.`);

  // Experiência e formação (peso neutro enquanto o currículo não existe — Etapa 3 completa)
  const expScore = (profile.headline || "").length > 10 ? 65 : 50;
  factors.push({ key: "experience", label: "Experiência e formação", score: expScore, weight: weights.experience });
  if (expScore >= 65) pros.push("Seu perfil tem título e apresentação preenchidos.");
  else gaps.push("Complete o título profissional e o 'sobre mim' para pesar mais aqui.");

  // Salário
  let salaryScore = 50;
  const min = pref?.salary_min || 0;
  const ideal = pref?.salary_ideal || 0;
  if (min && job.salary_max) {
    if (job.salary_max >= ideal && ideal) {
      salaryScore = 100;
      pros.push("O salário atinge sua faixa ideal.");
    } else if (job.salary_max >= min) {
      salaryScore = 75;
      pros.push("O salário passa do mínimo que você definiu, mas não chega ao ideal.");
    } else {
      salaryScore = 20;
      gaps.push("O salário fica abaixo do mínimo que você definiu.");
    }
  }
  factors.push({ key: "salary", label: "Salário", score: salaryScore, weight: weights.salary });

  // Modelo e local
  let locScore = 50;
  if (pref?.work_model && pref.work_model !== "Todas") {
    locScore += job.work_model === pref.work_model ? 30 : -30;
    if (job.work_model === pref.work_model) pros.push(`O modelo ${job.work_model} é o que você busca.`);
    else gaps.push(`O modelo é ${job.work_model}, mas você busca ${pref.work_model}.`);
  }
  if (pref?.city) {
    const same = (job.city || "").toLowerCase().includes(pref.city.toLowerCase());
    if (same) {
      locScore = Math.min(100, locScore + 20);
      pros.push(`A vaga fica em ${job.city}, onde você busca.`);
    } else if (job.work_model === "Remoto") {
      locScore = Math.min(100, locScore + 10);
    } else {
      gaps.push(`A vaga é em ${job.city || "outra cidade"}, fora da sua busca.`);
    }
  }
  if (pref?.contract && pref.contract !== "Todas") {
    locScore += job.contract === pref.contract ? 10 : -10;
  }
  factors.push({
    key: "location",
    label: "Modelo e local",
    score: Math.max(0, Math.min(100, locScore)),
    weight: weights.location,
  });

  // Valores e cultura
  let cultureScore = 50;
  const wanted = pref?.values || [];
  const offered = job.culture || [];
  if (wanted.length && offered.length) {
    const hits = wanted.filter((value) => offered.includes(value)).length;
    cultureScore = Math.round((hits / wanted.length) * 100);
    if (hits) pros.push(`A empresa declara valores em comum: ${wanted.filter((v) => offered.includes(v)).join(", ")}.`);
  }
  factors.push({ key: "culture", label: "Valores e cultura", score: cultureScore, weight: weights.culture });

  // Cursos exigidos pela vaga
  let courseScore = 60;
  if (job.course_hint) {
    const hasCert = validated[job.course_hint] > 0;
    courseScore = hasCert ? 100 : 35;
    if (hasCert) pros.push(`Você já validou o curso pedido: ${job.course_hint}.`);
    else gaps.push(`A vaga valoriza o curso "${job.course_hint}". Concluí-lo e enviar o certificado aumenta seu match.`);
  }
  factors.push({ key: "courses", label: "Cursos exigidos", score: courseScore, weight: weights.courses });

  // Critérios eliminatórios ("o que eu não aceito")
  const dealbreakers = pref?.dealbreakers || [];
  let eliminated = false;
  let eliminatedReason = "";
  if (dealbreakers.includes(job.work_model)) {
    eliminated = true;
    eliminatedReason = `Você não aceita vagas ${job.work_model.toLowerCase()}s.`;
  }
  if (dealbreakers.includes(job.contract)) {
    eliminated = true;
    eliminatedReason = `Você não aceita contratos ${job.contract}.`;
  }
  if (min && job.salary_max && job.salary_max < min) {
    eliminated = true;
    eliminatedReason = "O salário está abaixo do seu mínimo definido.";
  }

  const totalWeight = factors.reduce((sum, f) => sum + (f.weight || 0), 0) || 1;
  const score = Math.round(
    factors.reduce((sum, f) => sum + f.score * (f.weight || 0), 0) / totalWeight
  );

  let confidence = 45;
  if ((profile.skills || []).length >= 3) confidence += 10;
  if (pref) confidence += 10;
  if (pref?.salary_min) confidence += 10;
  if (pref?.city) confidence += 10;
  if (Object.keys(validated).length) confidence += 10;
  confidence = Math.min(95, confidence);

  return {
    score,
    eliminated,
    eliminatedReason,
    factors,
    pros,
    gaps,
    missing: (job.requirements || []).filter((skill) => !profile.skills.includes(skill)),
    confidence,
  };
}