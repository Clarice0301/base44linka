const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import { Chip } from "@/components/linka/primitives";

export default function NewsFeed() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    let alive = true;
    db.entities.News
      .filter({}, { sort: "-created_date", limit: 3 })
      .then((page) => alive && setNews(page.items || []))
      .catch(() => alive && setNews([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="lk-card">
      <div className="flex items-center gap-2">
        <Bell size={16} strokeWidth={1.8} style={{ color: "var(--ink-2)" }} />
        <p className="lk-eyebrow">Novidades da rede</p>
        {news && !news.length ? <Chip tone="sun">demonstração</Chip> : null}
      </div>

      {news === null ? (
        <p className="lk-card-sub mt-3">Carregando novidades...</p>
      ) : news.length ? (
        <div className="mt-3 space-y-3">
          {news.map((item) => (
            <div key={item.id}>
              <strong style={{ display: "block", fontSize: 13.5, color: "var(--ink)" }}>{item.title}</strong>
              <p className="lk-card-sub">{item.body}</p>
              {item.company ? (
                <p className="lk-card-sub" style={{ opacity: 0.8 }}>
                  — {item.company}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <p className="lk-card-sub">• Catálogo novo: cursos com certificado de provedores oficiais, verificados hoje.</p>
          <p className="lk-card-sub">• Testes de habilidades com nível de 1 a 4 agora validam seu perfil.</p>
        </div>
      )}
    </div>
  );
}