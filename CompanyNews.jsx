const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

export default function CompanyNews({ companyName }) {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const me = await db.auth.me();
      const page = await db.entities.News.filter(
        { created_by_id: me.id },
        { sort: "-created_date", limit: 10 }
      );
      if (alive) setNews(page.items || []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const publish = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      setError("Escreva um título e o texto da novidade.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const created = await db.entities.News.create({
        title: form.title.trim(),
        body: form.body.trim(),
        company: companyName,
      });
      setNews((prev) => [created, ...prev]);
      setForm({ title: "", body: "" });
    } catch (err) {
      setError(err?.message || "Não foi possível publicar a novidade.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    await db.entities.News.delete(item.id);
    setNews((prev) => prev.filter((entry) => entry.id !== item.id));
  };

  return (
    <section className="lk-card">
      <h3 className="lk-card-title">Novidades</h3>
      <p className="lk-card-sub">Aparece para os candidatos na página inicial da rede.</p>

      <form className="mt-3 space-y-2" onSubmit={publish}>
        <input
          className="lk-input"
          placeholder="Título da novidade"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          aria-label="Título da novidade"
        />
        <textarea
          className="lk-textarea"
          placeholder="O que está acontecendo na sua empresa?"
          value={form.body}
          onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
          aria-label="Texto da novidade"
        />
        {error ? <p className="lk-auth-error">{error}</p> : null}
        <button type="submit" className="lk-btn lk-btn-primary lk-btn-sm" disabled={saving}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} strokeWidth={2.4} /> Publicar novidade</>}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {news.map((item) => (
          <div key={item.id} className="flex items-start gap-2" style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
            <div className="min-w-0 flex-1">
              <strong style={{ display: "block", fontSize: 13.5, color: "var(--ink)" }}>{item.title}</strong>
              <p className="lk-card-sub">{item.body}</p>
            </div>
            <button type="button" className="lk-heart" aria-label="Excluir novidade" onClick={() => remove(item)}>
              <Trash2 size={17} strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}