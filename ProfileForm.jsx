const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState } from "react";
import { Check, Upload, UserRound } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function ProfileForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    headline: initial.headline || "",
    bio: initial.bio || "",
    city: initial.city || "",
    phone: initial.phone || "",
    linkedin: initial.linkedin || "",
  });
  const [photoUrl, setPhotoUrl] = useState(initial.photoUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await db.integrations.Core.UploadPublicFile({ file });
      setPhotoUrl(file_url);
    } catch (err) {
      setError(err?.message || "Não foi possível enviar a foto.");
    } finally {
      setUploading(false);
    }
  };

  const save = () => {
    onSave({
      ...form,
      name: form.name.trim(),
      headline: form.headline.trim(),
      photoUrl,
    });
  };

  return (
    <section className="lk-card">
      <div className="flex items-center gap-3">
        <span
          className="grid shrink-0 place-items-center overflow-hidden"
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            background: "var(--tint-teal)",
            color: "var(--teal-ink)",
          }}
        >
          {photoUrl ? (
            <Image src={photoUrl} alt="Foto de perfil" fittingType="fill" className="h-full w-full" />
          ) : (
            <UserRound size={26} strokeWidth={1.8} />
          )}
        </span>
        <div className="flex-1">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
          <button
            type="button"
            className="lk-btn lk-btn-soft lk-btn-sm"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            <Upload size={16} strokeWidth={2} />
            {uploading ? "Enviando..." : photoUrl ? "Trocar foto" : "Enviar foto"}
          </button>
          {photoUrl ? (
            <button
              type="button"
              className="lk-auth-mini mt-2"
              style={{ background: "none", border: 0 }}
              onClick={() => setPhotoUrl("")}
            >
              Remover foto
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <input className="lk-input" placeholder="Seu nome" value={form.name} onChange={set("name")} aria-label="Seu nome" />
        <input
          className="lk-input"
          placeholder="Sua frase de apresentação"
          value={form.headline}
          onChange={set("headline")}
          aria-label="Sua frase de apresentação"
        />
        <textarea
          className="lk-textarea"
          placeholder="Sobre você: experiência, objetivos, o que busca"
          value={form.bio}
          onChange={set("bio")}
          aria-label="Sobre você"
        />
        <div className="grid grid-cols-2 gap-2">
          <input className="lk-input" placeholder="Cidade" value={form.city} onChange={set("city")} aria-label="Cidade" />
          <input className="lk-input" placeholder="Telefone" value={form.phone} onChange={set("phone")} aria-label="Telefone" />
        </div>
        <input
          className="lk-input"
          placeholder="LinkedIn (linkedin.com/in/...)"
          value={form.linkedin}
          onChange={set("linkedin")}
          aria-label="LinkedIn"
        />
      </div>

      {error ? <p className="lk-auth-error mt-3">{error}</p> : null}

      <div className="mt-4 flex gap-2">
        <button type="button" className="lk-btn lk-btn-soft lk-btn-sm" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" className="lk-btn lk-btn-primary lk-btn-sm" onClick={save} disabled={uploading}>
          <Check size={16} strokeWidth={2.4} /> Salvar perfil
        </button>
      </div>
    </section>
  );
}