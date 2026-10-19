import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, MousePointer2, Sparkles, X } from "lucide-react";
import { CERTIFICATIONS } from "../data/certifications";
import "./Certificates.css";

export default function CertificatesSection() {
  const [selected, setSelected] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState(1);
  const dialogRef = useRef(null);
  const lenis = useLenis();
  const isViewerOpen = selected !== null;

  const navigateCertificate = (direction) => {
    if (isClosing) return;
    setNavigationDirection(direction);
    setSelected((current) => {
      if (!current) return current;
      const index = CERTIFICATIONS.indexOf(current);
      return CERTIFICATIONS[(index + direction + CERTIFICATIONS.length) % CERTIFICATIONS.length];
    });
  };

  useLayoutEffect(() => {
    if (!isViewerOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    // Compensate on the page, leaving the full-screen overlay edge-to-edge.
    document.body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      lenis?.start();
    };
  }, [isViewerOpen, lenis]);

  return (
    <section id="certifications" className="certificates" aria-labelledby="certificates-heading">
      <div className="certificates__intro" data-reveal="zoom">
        <h2 id="certificates-heading">Certificates</h2>
        <p>Proof of the learning, tucked in the drawer.</p>
      </div>

      <div className="certificates__collection" data-reveal="slide">
        <div className="certificates__tab" aria-hidden="true" />
        <div className="certificates__folder">
          <div className="certificates__folder-header">
            <p id="certificates-hint" className="certificates__hint">
              <MousePointer2 size={17} aria-hidden="true" />
              Click a certificate to view it in full
            </p>
            <p className="certificates__count">{CERTIFICATIONS.length} files</p>
          </div>
          <ul className="certificates__list" aria-describedby="certificates-hint">
            {CERTIFICATIONS.map((certificate, index) => (
              <li key={certificate.src} data-reveal="zoom" style={{ "--reveal-delay": `${180 + index * 140}ms` }}>
                <button type="button" className="certificates__label" aria-label={`View full certificate: ${certificate.alt}`} aria-haspopup="dialog" onClick={() => setSelected(certificate)}>
                  <span className="certificates__name">{certificate.alt}</span>
                  <span className="certificates__issuer">{certificate.issuer} · {certificate.year}</span>
                </button>
              </li>
            ))}
            <li className="certificates__next" data-reveal="zoom" style={{ "--reveal-delay": `${180 + CERTIFICATIONS.length * 140}ms` }}>
              <span className="certificates__name">Next up...</span>
              <span>Always something new to learn</span>
            </li>
          </ul>
          <div className="certificates__stamp" aria-hidden="true">
            <Sparkles size={22} />
            <span>Certified<br />Learner</span>
          </div>
        </div>
      </div>

      {createPortal(
        <dialog
          ref={dialogRef}
          className={`certificates__viewer${isClosing ? " certificates__viewer--closing" : ""}`}
          aria-labelledby="certificate-viewer-title"
          data-lenis-prevent
          onCancel={(event) => { event.preventDefault(); setIsClosing(true); }}
          onClick={(event) => { if (event.target === event.currentTarget) setIsClosing(true); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              navigateCertificate(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === "certificate-viewer-out" && isClosing) {
              setSelected(null);
              setIsClosing(false);
            }
          }}
        >
          <button type="button" className="certificates__close" aria-label="Close certificate viewer" onClick={() => setIsClosing(true)} autoFocus>
            <X size={24} aria-hidden="true" />
          </button>
          <button type="button" className="certificates__arrow certificates__arrow--previous" aria-label="Previous certificate" onClick={() => navigateCertificate(-1)} disabled={isClosing}>
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button type="button" className="certificates__arrow certificates__arrow--next" aria-label="Next certificate" onClick={() => navigateCertificate(1)} disabled={isClosing}>
            <ChevronRight size={24} aria-hidden="true" />
          </button>
          {selected && (
            <figure className="certificates__preview">
              <img
                key={selected.src}
                src={selected.src}
                alt={selected.alt}
                draggable={false}
                style={{ "--certificate-slide-offset": `${navigationDirection * 24}px` }}
              />
              <figcaption id="certificate-viewer-title" aria-live="polite">
                <strong>{selected.alt}</strong>
                <span>{selected.issuer} · {selected.year}</span>
                <span>{CERTIFICATIONS.indexOf(selected) + 1} / {CERTIFICATIONS.length}</span>
              </figcaption>
            </figure>
          )}
        </dialog>,
        document.body
      )}
    </section>
  );
}
