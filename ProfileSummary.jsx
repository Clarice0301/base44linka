import React from "react";
import { Check, Globe, MapPin, PencilLine, Phone, UserRound } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Chip } from "@/components/linka/primitives";

export default function ProfileSummary({ profile, onEdit }) {
  const linkedin = profile.linkedin
    ? profile.linkedin.startsWith("http")
      ? profile.linkedin
      : `https://${profile.linkedin}`
    : "";

  return (
    <section className="lk-card">
      <div className="flex items-start gap-3">
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
          {profile.photoUrl ? (
            <Image src={profile.photoUrl} alt="Foto de perfil" fittingType="fill" className="h-full w-full" />
          ) : profile.name ? (
            <strong style={{ fontSize: 22 }}>{profile.name.trim().charAt(0).toUpperCase()}</strong>
          ) : (
            <UserRound size={26} strokeWidth={1.8} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="lk-card-title">{profile.name || "Seu perfil no Linka"}</h3>
          <p className="lk-card-sub">{profile.headline}</p>
        </div>
        <button type="button" className="lk-heart" aria-label="Editar perfil" onClick={onEdit}>
          <PencilLine size={18} strokeWidth={1.8} />
        </button>
      </div>

      {profile.bio ? (
        <p className="mt-3" style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink)" }}>
          {profile.bio}
        </p>
      ) : null}

      {profile.city || profile.phone || linkedin ? (
        <div className="mt-3 space-y-1.5">
          {profile.city ? (
            <p className="lk-card-sub flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.8} /> {profile.city}
            </p>
          ) : null}
          {profile.phone ? (
            <p className="lk-card-sub flex items-center gap-2">
              <Phone size={15} strokeWidth={1.8} /> {profile.phone}
            </p>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="lk-card-sub flex items-center gap-2"
              style={{ color: "var(--teal-ink)", textDecoration: "none" }}
            >
              <Globe size={15} strokeWidth={1.8} /> LinkedIn
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <Chip key={skill} tone="teal">
            <Check size={13} strokeWidth={2.6} /> {skill}
          </Chip>
        ))}
      </div>
    </section>
  );
}