import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Briefcase, FileText, GraduationCap, Home as HomeIcon, MessageSquare, UserRound } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLinka } from "@/context/LinkaContext";
import { LOGO_HEADER } from "@/lib/linka/data";
import Tour from "@/components/linka/Tour";
import JobSheet from "@/components/linka/JobSheet";
import CourseSheet from "@/components/linka/CourseSheet";
import CatalogCourseSheet from "@/components/linka/CatalogCourseSheet";

const TABS = [
  { to: "/", label: "Início", icon: HomeIcon },
  { to: "/vagas", label: "Vagas", icon: Briefcase },
  { to: "/cursos", label: "Cursos", icon: GraduationCap },
  { to: "/candidaturas", label: "Candidaturas", icon: FileText },
];

const SITE_LINKS = [
  ...TABS,
  { to: "/chat", label: "Conversas", icon: MessageSquare },
  { to: "/perfil", label: "Perfil", icon: UserRound },
];

export default function PhoneFrame() {
  const { profile, tourSeen, completeTour } = useLinka();
  const initial = profile.name ? profile.name.trim().charAt(0).toUpperCase() : null;

  return (
    <div className="lk-stage">
      <div className="lk-phone">
        <header className="lk-topbar">
          <Image src={LOGO_HEADER} alt="Linka" className="lk-logo" fittingType="fit" />
          <nav className="lk-sitenav" aria-label="Navegação do site">
            {SITE_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/chat" className="lk-iconbtn" aria-label="Conversas">
              <MessageSquare size={20} strokeWidth={1.8} />
            </Link>
            <Link to="/perfil" className="lk-avatar" style={{ overflow: "hidden" }} aria-label="Seu perfil">
              {profile.photoUrl ? (
                <Image src={profile.photoUrl} alt="Sua foto" fittingType="fill" className="h-full w-full" />
              ) : (
                initial || <UserRound size={19} strokeWidth={1.8} />
              )}
            </Link>
          </div>
        </header>

        <main className="lk-content">
          <Outlet />
        </main>

        <nav className="lk-tabbar" aria-label="Navegação principal">
          {TABS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `lk-tab${isActive ? " is-active" : ""}`}
            >
              <span className="lk-tab-icon">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <JobSheet />
        <CourseSheet />
        <CatalogCourseSheet />
        {!tourSeen ? <Tour onFinish={completeTour} /> : null}
      </div>
    </div>
  );
}