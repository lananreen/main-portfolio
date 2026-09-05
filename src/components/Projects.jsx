import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ArrowButton from "./ArrowButton";
import BrowserMockup from "./BrowserMockup";
import Reveal from "./Reveal";
import { PROJECTS } from "../data/projects";

const ANIM_MS = 250;

export default function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const [imageIndex, setImageIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [imageAnimClass, setImageAnimClass] = useState("");
  const [imageKey, setImageKey] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [lightbox, setLightbox] = useState("closed");
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId);
  const images = activeProject.images;

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

    setPhase("animating");
    setImageIndex((i) =>
      dir === "next" ? (i + 1) % images.length : (i - 1 + images.length) % images.length
    );
    setImageAnimClass(
      dir === "next" ? "animate-fade-slide-in-left" : "animate-fade-slide-in-right"
    );
    setImageKey((k) => k + 1);

    timeoutRef.current = setTimeout(() => {
      setPhase("idle");
      setImageAnimClass("");
    }, ANIM_MS);
  };

  const selectProject = (id) => {
    if (id === activeProjectId || phase !== "idle") return;
    clearTimeout(timeoutRef.current);
    setActiveProjectId(id);
    setImageIndex(0);
    setPhase("idle");
    setImageAnimClass("");
    setImageKey((k) => k + 1);
    setTextKey((k) => k + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? "next" : "prev");
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col px-6 py-20 md:px-16 border-t border-white/[0.06]"
    >

      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col gap-8 md:flex-row md:items-center md:gap-10">
        <Reveal className="flex flex-1 flex-col">
          <div
            className="flex items-center gap-2 md:gap-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="hidden md:block">
              <ArrowButton direction="left" onClick={() => navigate("prev")} disabled={phase !== "idle"} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-center text-sm text-white/60 mb-2">(click to view the full image)</p>
              <BrowserMockup url={activeProject.url}>
                <div
                  key={imageKey}
                  className={`flex h-full w-full items-center justify-center text-center text-neutral-500 text-lg ${imageAnimClass}`}
                >
                  {images[imageIndex].src ? (
                    <img
                      src={images[imageIndex].src}
                      alt={images[imageIndex].alt}
                      className="block max-h-full max-w-full cursor-pointer object-contain"
                      onClick={openLightbox}
                    />
                ) : (
                  <span>{images[imageIndex].alt}</span>
                )}
              </div>
            </BrowserMockup>
            </div>

            <div className="hidden md:block">
              <ArrowButton direction="right" onClick={() => navigate("next")} disabled={phase !== "idle"} />
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${i === imageIndex ? "bg-white/60" : "bg-white/20"}`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="flex w-full shrink-0 flex-col md:w-96" delay={200}>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => selectProject(project.id)}
                aria-pressed={project.id === activeProjectId}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  project.id === activeProjectId
                    ? "border-white/30 bg-white/20 backdrop-blur-md text-white shadow-lg"
                    : "border-white/10 bg-white/10 backdrop-blur-md text-white/60 hover:bg-white/15 hover:border-white/20"
                }`}
              >
                {project.buttonLabel}
              </button>
            ))}
          </div>

          <div key={textKey} className="animate-fade-slide-in-right">
            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xl md:text-2xl font-bold text-white transition-all hover:scale-105 inline-block underline decoration-white/30 underline-offset-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
            >
              {activeProject.name}
            </a>

            <p className="mt-4 text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {activeProject.description}
            </p>
          </div>
        </Reveal>
      </div>

      {createPortal(
        lightbox !== "closed" && (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 ${lightbox === "closing" ? "animate-fade-out" : "animate-fade-in"}`}
            onClick={closeLightbox}
          >
            <img
              src={images[imageIndex].src}
              alt={images[imageIndex].alt}
              className={`max-h-[90vh] max-w-full rounded-lg object-contain ${lightbox === "closing" ? "animate-zoom-out" : "animate-zoom-in"}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ),
        document.body
      )}
    </section>
  );
}
