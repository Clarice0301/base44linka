import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { LOGO_COLOR, LOGO_HEADER, TOUR_SLIDES } from "@/lib/linka/data";

export default function Tour({ onFinish }) {
  const [step, setStep] = useState(0);
  const slide = TOUR_SLIDES[step];
  const Icon = slide.icon;
  const last = step === TOUR_SLIDES.length - 1;

  return (
    <div className="lk-tour" role="dialog" aria-modal="true" aria-label="Tour de boas-vindas">
      <div className="lk-tour-card">
        {step === 0 ? (
          <>
            <Image src={LOGO_COLOR} alt="Linka" className="lk-tour-logo is-light" fittingType="fit" />
            <Image src={LOGO_HEADER} alt="Linka" className="lk-tour-logo is-dark" fittingType="fit" />
          </>
        ) : (
          <span className="lk-tour-icon">
            <Icon size={26} strokeWidth={1.8} />
          </span>
        )}
        <h2>{slide.title}</h2>
        <p>{slide.text}</p>
        <div className="lk-dots">
          {TOUR_SLIDES.map((item, index) => (
            <span key={item.title} className={index === step ? "is-on" : ""} />
          ))}
        </div>
        <div className="lk-tour-actions">
          <button type="button" className="lk-btn lk-btn-soft" onClick={onFinish}>
            Pular
          </button>
          <button
            type="button"
            className="lk-btn lk-btn-primary"
            onClick={() => (last ? onFinish() : setStep(step + 1))}
          >
            {last ? "Começar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}