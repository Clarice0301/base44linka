const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { ExternalLink, FileCheck2, Upload } from "lucide-react";

import BottomSheet from "@/components/linka/BottomSheet";
import { Chip } from "@/components/linka/primitives";
import { useLinka } from "@/context/LinkaContext";

const STATUS = {
  pending: { label: "Certificado enviado (em análise)", tone: "sun" },
  approved: { label: "Certificado aprovado", tone: "teal" },
  rejected: { label: "Certificado não aprovado", tone: "blue" },
};

export default function CatalogCourseSheet() {
  const { sheet, closeSheet, catalogCourses, notify } = useLinka();
  const [certs, setCerts] = useState([]);
  const [file, setFile] = useState(null);
  const [verification, setVerification] = useState("");
  const [sending, setSending] = useState(false);

  const open = sheet?.type === "catalogCourse";
  const data = catalogCourses.find((item) => item.id === sheet?.id) || null;

  useEffect(() => {
    if (open) {
      setFile(null);
      setVerification("");
      db.entities.Certificate.filter({}, { limit: 50 }).then((page) => setCerts(page.items || []));
    }
  }, [open, data?.id]);

  const cert = data ? certs.find((item) => item.course_title === data.title) : null;

  const submit = async () => {
    if (!file) {
      notify("Falta o arquivo.", "Anexe o PDF ou a imagem do certificado.");
      return;
    }
    setSending(true);
    try {
      const { file_uri } = await db.integrations.Core.UploadPrivateFile({ file });
      await db.entities.Certificate.create({
        course_title: data.title,
        provider: data.provider,
        skill: (data.skills || [])[0] || data.title,
        file_uri,
        verification: verification.trim(),
        status: "pending",
      });
      notify("Certificado enviado.", "Ficará em análise. Quando aprovado, a habilidade é validada.");
      setFile(null);
      setVerification("");
      const page = await db.entities.Certificate.filter({}, { limit: 50 });
      setCerts(page.items || []);
    } finally {
      setSending(false);
    }
  };

  return (
    <BottomSheet open={open} onClose={closeSheet} title={data?.title || "Curso"}>
      {data ? (
        <>
          <h2 className="lk-card-title" style={{ fontSize: 18 }}>
            {data.title}
          </h2>
          <p className="lk-card-sub">{data.provider}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip tone="blue">{data.area}</Chip>
            <Chip tone="blue">{data.level}</Chip>
            <Chip tone="teal">{data.hours}h</Chip>
            <Chip tone={data.free ? "teal" : "sun"}>{data.free ? "Gratuito" : "Pago"}</Chip>
            <Chip tone="teal">Emitir certificado: {data.cert_type}</Chip>
            <Chip tone="sun">Verificado em {data.verified_at}</Chip>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(data.skills || []).map((skill) => (
              <Chip key={skill} tone="blue">
                {skill}
              </Chip>
            ))}
          </div>

          <a href={data.url} target="_blank" rel="noreferrer" className="lk-btn lk-btn-primary mt-4">
            <ExternalLink size={16} strokeWidth={2} /> Abrir no site oficial
          </a>
          <p className="lk-card-sub mt-2">
            O Linka não hospeda o conteúdo: o curso acontece no site oficial do provedor, em nova aba.
          </p>

          {(data.materials || []).length ? (
            <div className="mt-5">
              <p className="lk-eyebrow">Materiais de apoio</p>
              <div className="mt-2 space-y-2">
                {data.materials.map((material) => (
                  <a
                    key={material.title}
                    href={material.url}
                    target="_blank"
                    rel="noreferrer"
                    className="lk-btn lk-btn-soft lk-btn-sm"
                  >
                    {material.title}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-5" style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 18, padding: 14 }}>
            <div className="flex items-center gap-2">
              <FileCheck2 size={16} strokeWidth={1.8} style={{ color: "var(--teal-ink)" }} />
              <p className="lk-eyebrow">Certificado</p>
            </div>
            {cert ? (
              <>
                <div className="mt-2">
                  <Chip tone={STATUS[cert.status]?.tone || "sun"}>{STATUS[cert.status]?.label || cert.status}</Chip>
                </div>
                {cert.verification ? <p className="lk-card-sub mt-2">Código: {cert.verification}</p> : null}
                <p className="lk-card-sub mt-2">
                  {cert.status === "approved"
                    ? `Habilidade validada: ${cert.skill || data.skills?.[0]}`
                    : "Quando o administrador aprovar, a habilidade vira 'validada' no seu perfil."}
                </p>
              </>
            ) : (
              <>
                <p className="lk-card-sub mt-2">
                  Concluiu o curso no site do provedor? Envie o certificado (PDF ou imagem) e, se houver, o
                  código ou link de verificação.
                </p>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="lk-input mt-2"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                  aria-label="Arquivo do certificado"
                />
                <input
                  className="lk-input mt-2"
                  placeholder="Código ou link de verificação (opcional)"
                  value={verification}
                  onChange={(event) => setVerification(event.target.value)}
                  aria-label="Código de verificação"
                />
                <button type="button" className="lk-btn lk-btn-primary lk-btn-sm mt-2" onClick={submit} disabled={sending}>
                  <Upload size={15} strokeWidth={2} /> {sending ? "Enviando..." : "Enviar certificado"}
                </button>
              </>
            )}
          </div>
        </>
      ) : null}
    </BottomSheet>
  );
}