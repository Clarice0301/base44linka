import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BottomSheet({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="lk-sheet-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="lk-sheet-backdrop" aria-label="Fechar" onClick={onClose} />
          <motion.section
            className="lk-sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
          >
            <div className="lk-sheet-head">
              <span className="lk-grabber" />
              <button className="lk-close" onClick={onClose} aria-label="Fechar">
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <div className="lk-sheet-body">{children}</div>
            {footer ? <div className="lk-sheet-foot">{footer}</div> : null}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}