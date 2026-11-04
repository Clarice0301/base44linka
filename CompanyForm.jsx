const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState } from "react";
import { Building2, Check, Upload } from "lucide-react";
import { Image } from "@/components/ui/image";

const SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

export default function CompanyForm({ initial, onSaved, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    segment: initial?.segment || "",
    site: initial?.site || "",
    city: initial?.city || "",
    size: initial?.size || "",
    description: initial?.description || "",
    culture: (initial?.culture || []).join(", "),
    contact_email: initial?.contact_email || "",
  });
  const [logoUrl, setLogoUrl] = useState(initial?.logo_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const uploadLogo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await db.integrations.Core.UploadPublicFile({ file });
      setLogoUrl(file_url);
    } catch (err) {
      setError(err?.message || "Não foi possível enviar o logo.");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name.trim()) {
      setError("Informe o nome da empresa para continuar.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        logo_url: logoUrl,
        culture: form.culture
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      const saved = initial?.id
        ? await db.entities.Company.update(initial.id, payload)
        : await db.entities.Company.create(payload);
      onSaved(saved);
    } catch (err) {
      setError(err?.message || "Não foi possível salvar os dados.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lk-card">
      <p className="lk-eyebrow">Cadastro da empresa</p>
      <p className="lk-sub">O logo e os dados ficam visíveis para quem se candidata às suas vagas.</p>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="grid shrink-0 place-items-center overflow-hidden"
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "var(--tint-blue)",
            color: "var(--ink-2)",
          }}
        >
          {logoUrl ? (
            <Image src={logoUrl} alt="Logo da empresa" fittingType="fit" className="h-full w-full" />
          ) : (
            <Building2 size={28} strokeWidth={1.7} />
          )}
        </span>
        <div className="flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadLogo}
          />
          <button
            type="button"
            className="lk-btn lk-btn-soft lk-btn-sm"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            <Upload size={16} strokeWidth={2} />
            {uploading ? "Enviando..." : logoUrl ? "Trocar logo" : "Enviar logo"}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <input className="lk-input" placeholder="Nome da empresa" value={form.name} onChange={set("name")} aria-label="Nome da empresa" />
        <input className="lk-input" placeholder="Área de atuação (ex.: Tecnologia)" value={form.segment} onChange={set("segment")} aria-label="Área de atuação" />
        <input className="lk-input" placeholder="Cidade" value={form.city} onChange={set("city")} aria-label="Cidade" />

        <div>
          <label className="lk-auth-label" htmlFor="company-size" style={{ fontSize: 13 }}>
            Tamanho da equipe
          </label>
          <select id="company-size" className="lk-input" value={form.size} onChange={set("size")}>
            <option value="">Selecione</option>
            {SIZES.map((size) => (
              <option key={size} value={size}>
                {size} pessoas
              </option>
            ))}
          </select>
        </div>

        <input className="lk-input" placeholder="Site (https://...)" value={form.site} onChange={set("site")} aria-label="Site" />
        <input className="lk-input" type="email" placeholder="E-mail de contato" value={form.contact_email} onChange={set("contact_email")} aria-label="E-mail de contato" />
        <textarea
          className="lk-textarea"
          placeholder="O que a empresa faz e como é trabalhar nela"
          value={form.description}
          onChange={set("description")}
          aria-label="Descrição da empresa"
        />
        <input className="lk-input" placeholder="Cultura: valores separados por vírgula" value={form.culture} onChange={set("culture")} aria-label="Cultura da empresa" />
      </div>

      {error ? <p className="lk-auth-error mt-3">{error}</p> : null}

      <div className="mt-4 flex gap-2">
        {onCancel ? (
          <button type="button" className="lk-btn lk-btn-soft lk-btn-sm" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
        <button type="button" className="lk-btn lk-btn-primary lk-btn-sm" onClick={save} disabled={saving || uploading}>
          <Check size={16} strokeWidth={2.4} /> {saving ? "Salvando..." : "Salvar empresa"}
        </button>
      </div>
    </div>
  );
}