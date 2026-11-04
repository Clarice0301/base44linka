const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function CompanyRoute() {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    let alive = true;
    db.auth
      .me()
      .then((me) => {
        if (!alive) return;
        setAllowed(me?.role === "admin" || me?.account_type === "empresa");
      })
      .catch(() => alive && setAllowed(false));
    return () => {
      alive = false;
    };
  }, []);

  if (allowed === null) {
    return (
      <div className="lk-card" style={{ textAlign: "center" }}>
        <p className="lk-card-sub">Verificando seu acesso...</p>
      </div>
    );
  }

  if (!allowed) return <Navigate to="/" replace />;

  return <Outlet />;
}