import { useCallback, useEffect, useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import Reveal from "./Reveal";
import { CERTIFICATIONS } from "../data/certifications";

const ANIM_MS = 250;

export default function CertificationsSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [imageAnimClass, setImageAnimClass] = useState("");
  const [titleAnimClass, setTitleAnimClass] = useState("");
  const [imageKey, setImageKey] = useState(0);
  const [titleKey, setTitleKey] = useState(0);
  const [lightbox, setLightbox] = useState("closed");
  const timeoutRef = useRef(null);
  const touchStartRef = useRef(null);

  const images = CERTIFICATIONS;

  useEffect(() => {
    CERTIFICATIONS.forEach((cert) => {
      if (cert.src) {
        const img = new Image();
        img.src = cert.src;
      }
    });
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const closeLightbox = useCallback(() => {
    if (lightbox !== "open") return;
    setLightbox("closing");
    timeoutRef.current = setTimeout(() => setLightbox("closed"), 250);
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightbox === "open") {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  const openLightbox = () => {
    if (images[imageIndex].src) setLightbox("open");
  };

  const navigate = (dir) => {
    if (phase !== "idle") return;

    const newIndex = dir === "next"
      ? (imageIndex + 1) % images.length
      : (imageIndex - 1 + images.length) % images.length;
    const animClass = dir === "next"
      ? "animate-fade-slide-in-right"
      : "animate-fade-slide-in-left";

    setPhase("exiting");

    timeoutRef.current = setTimeout(() => {
      setImageIndex(newIndex);
      setTitleIndex(newIndex);
      setImageAnimClass(animClass);
      setTitleAnimClass(animClass);
      setImageKey((k) => k + 1);
      setTitleKey((k) => k + 1);
      setPhase("entering");

      timeoutRef.current = setTimeout(() => {
        setPhase("idle");
        setImageAnimClass("");
        setTitleAnimClass("");
      }, ANIM_MS);
    }, ANIM_MS);
  };

  const onTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    touchStartRef.current = null;
    if (Math.abs(diff) < 50) return;
    navigate(diff > 0 ? "next" : "prev");
  };

  return (
    <section
      id="certifications"
      className="relative flex min-h-[50vh] md:min-h-screen flex-col items-center justify-center px-4 py-16 md:px-16 md:py-20 border-t border-white/[0.06]"
    >

      <Reveal className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6">
        <h2 key={titleKey} className={`${phase === "exiting" ? "animate-fade-out" : titleAnimClass} text-lg md:text-3xl font-bold text-white text-center`}>
          {images[titleIndex].alt}
        </h2>

        <div className="flex w-full items-center gap-2 md:gap-4">
          <div className="hidden md:flex">
            <ArrowButton direction="left" onClick={() => navigate("prev")} disabled={phase !== "idle"} />
          </div>

          <div
            className="flex-1 overflow-hidden rounded-xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              key={imageKey}
              className={`flex items-center justify-center text-white/50 text-lg ${phase === "exiting" ? "animate-fade-out" : imageAnimClass}`}
            >
              {images[imageIndex].src ? (
                <img
                  src={images[imageIndex].src}
                  alt={images[imageIndex].alt}
                  className="max-w-full max-h-[65vh] md:max-h-[70vh] cursor-pointer rounded-xl object-contain"
                  onClick={openLightbox}
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-xl bg-white/[0.04]">
                  <span>{images[imageIndex].alt}</span>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex">
            <ArrowButton direction="right" onClick={() => navigate("next")} disabled={phase !== "idle"} />
          </div>
        </div>

        <div className="flex justify-center gap-1.5 md:gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full md:h-2.5 md:w-2.5 ${i === imageIndex ? "bg-white/60" : "bg-white/20"}`}
            />
          ))}
        </div>
      </Reveal>

      {lightbox !== "closed" && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 ${lightbox === "closing" ? "animate-fade-out" : "animate-fade-in"}`}
          onClick={closeLightbox}
        >
          <img
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            className={`max-h-[90vh] max-w-full rounded-lg object-contain ${lightbox === "closing" ? "animate-zoom-out" : "animate-zoom-in"}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
