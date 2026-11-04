import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { LOGO_AUTH } from "@/lib/linka/data";

export default function AuthShell({ tab, returnTo, children }) {
  const suffix =
  returnTo && returnTo !== "/" ? "?returnTo=" + encodeURIComponent(returnTo) : "";

  return (
    <div className="lk-auth">
      <div className="lk-auth-inner">
        <div className="flex justify-center">
          <Image
            src={LOGO_AUTH}
            alt="Linka"
            className="lk-auth-logo"
            fittingType="fill"
            focalPointX={0.5}
            focalPointY={0.55}
          />
        </div>
        <h1 className="lk-auth-title">Conectando talentos a oportunidades</h1>
        <p className="lk-auth-sub">
          Vagas com salário e orçamento confirmados, retorno em cada etapa e cursos
          que aumentam o seu match.
        </p>

        <div className="lk-auth-card">
          <div className="lk-auth-tabs" role="tablist" aria-label="Entrar ou criar conta">
            <Link to={"/login" + suffix} className={tab === "login" ? "is-on" : ""}>
              Entrar
            </Link>
            <Link to={"/register" + suffix} className={tab === "register" ? "is-on" : ""}>
              Criar conta
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>);

}