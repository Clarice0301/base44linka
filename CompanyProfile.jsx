import React from "react";
import { Building2, Globe, Mail, MapPin, PencilLine, Users } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Chip } from "@/components/linka/primitives";

export default function CompanyProfile({ company, onEdit }) {
  const site = company.site ? (company.site.startsWith("http") ? company.site : `https://${company.site}`) : "";

  return (
    <div className="lk-card">
      <div className="flex items-start gap-3">
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
          {company.logo_url ? (
            <Image src={company.logo_url} alt={`Logo da ${company.name}`} fittingType="fit" className="h-full w-full" />
          ) : (
            <Building2 size={28} strokeWidth={1.7} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="lk-card-title" style={{ fontSize: 18 }}>
            {company.name}
          </h3>
          {company.segment ? <p className="lk-card-sub">{company.segment}</p> : null}
          <div className="mt-2 flex flex-wrap gap-2">
            {company.city ? (
              <Chip tone="blue">
                <MapPin size={12} strokeWidth={2} /> {company.city}
              </Chip>
            ) : null}
            {company.size ? (
              <Chip tone="teal">
                <Users size={12} strokeWidth={2} /> {company.size} pessoas
              </Chip>
            ) : null}
          </div>
        </div>
        <button type="button" className="lk-heart" aria-label="Editar dados da empresa" onClick={onEdit}>
          <PencilLine size={18} strokeWidth={1.8} />
        </button>
      </div>

      {company.description ? (
        <p className="mt-4" style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink)" }}>
          {company.description}
        </p>
      ) : null}

      {company.culture?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {company.culture.map((item) => (
            <Chip key={item} tone="sun">
              {item}
            </Chip>
          ))}
        </div>
      ) : null}

      <div className="mt-4 space-y-2">
        {site ? (
          <a
            href={site}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
            style={{ fontSize: 13.5, color: "var(--teal-ink)", textDecoration: "none" }}
          >
            <Globe size={16} strokeWidth={1.8} /> {company.site}
          </a>
        ) : null}
        {company.contact_email ? (
          <a
            href={`mailto:${company.contact_email}`}
            className="flex items-center gap-2"
            style={{ fontSize: 13.5, color: "var(--ink-2)", textDecoration: "none" }}
          >
            <Mail size={16} strokeWidth={1.8} /> {company.contact_email}
          </a>
        ) : null}
      </div>
    </div>
  );
}