import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJECTS } from "../data/projects";
import "./Projects.css";

export default function ProjectsSection() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const lenis = useLenis();
  const project = PROJECTS[projectIndex];
  const image = project.images[imageIndex];

  useEffect(() => {
    if (!lightboxOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [lightboxOpen, lenis]);

  const navigate = (direction) => {
    setImageDirection(direction);
    setImageIndex((index) => (index + direction + project.images.length) % project.images.length);
  };

  const selectImage = (index) => {
    setImageDirection(index >= imageIndex ? 1 : -1);
    setImageIndex(index);
  };

  const selectProject = (index) => {
    setProjectIndex(index);
    setImageDirection(1);
    setImageIndex(0);
  };

  const handleTabKey = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % PROJECTS.length;
    if (event.key === "ArrowLeft") next = (index - 1 + PROJECTS.length) % PROJECTS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = PROJECTS.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectProject(next);
    document.getElementById(`project-tab-${PROJECTS[next].id}`)?.focus();
  };

  const handleSwipe = (event) => {
    if (touchStart.current === null) return;
    const distance = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) navigate(distance > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const arrows = (expanded = false) => (
    <>
      <button type="button" className={`projects__arrow projects__arrow--previous${expanded ? " projects__arrow--expanded" : ""}`} aria-label="Previous screenshot" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button type="button" className={`projects__arrow projects__arrow--next${expanded ? " projects__arrow--expanded" : ""}`} aria-label="Next screenshot" onClick={() => navigate(1)}>
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </>
  );

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="projects__intro" data-reveal="zoom">
        <h2 id="projects-heading">Projects</h2>
        <p>A few things I've built and designed. Flip through the tabs to open each one.</p>
      </div>

      <div className="projects__collection" data-reveal="fade-slide">
        <div className="projects__tabs" role="tablist" aria-label="Projects">
          {PROJECTS.map((item, index) => (
            <button key={item.id} id={`project-tab-${item.id}`} type="button" role="tab" aria-selected={index === projectIndex} aria-controls="project-panel" tabIndex={index === projectIndex ? 0 : -1} className="projects__tab" onClick={() => selectProject(index)} onKeyDown={(event) => handleTabKey(event, index)}>
              <span className="projects__tab-name">{item.buttonLabel}</span>
              <span className="projects__tab-number" aria-hidden="true">{index + 1}</span>
              <span className="projects__sr-only projects__tab-mobile-label">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="projects__folder">
          <div id="project-panel" className="projects__card" role="tabpanel" aria-labelledby={`project-tab-${project.id}`} tabIndex={0}>
            <div key={project.id} className="projects__details">
              <span className="projects__label">{project.label}</span>
              <h3>{project.name}</h3>
              <p className="projects__description">{project.description}</p>
              <h4 className="projects__stack-heading">Tech stack used</h4>
              <ul className="projects__stack">
                {project.techStack.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <a className="projects__link" href={project.url} target="_blank" rel="noopener noreferrer">
                View project <ArrowRight size={18} aria-hidden="true" />
                <span className="projects__sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="projects__gallery" aria-label={`${project.name} screenshots`}>
              <div className="projects__preview" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleSwipe} onTouchCancel={() => { touchStart.current = null; }}>
                <button type="button" className="projects__image-button" onClick={() => setLightboxOpen(true)} aria-label={`Enlarge ${image.alt}`}>
                  <img key={image.src} src={image.src} alt={image.alt} className="projects__image" draggable={false} style={{ "--image-offset": `${imageDirection * 16}px` }} />
                </button>
                {arrows()}
                <span className="projects__counter" aria-live="polite" aria-atomic="true">{imageIndex + 1} / {project.images.length}</span>
              </div>
              <div className="projects__dots" aria-label="Choose a screenshot">
                {project.images.map((item, index) => (
                  <button key={item.src} type="button" className="projects__dot" aria-label={`Show screenshot ${index + 1}`} aria-pressed={index === imageIndex} onClick={() => selectImage(index)} />
                ))}
              </div>
              <p className="projects__hint">Click an image to take a closer look</p>
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <dialog ref={dialogRef} className="projects__lightbox" aria-label={`${project.name} image viewer`} data-lenis-prevent onCancel={() => setLightboxOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }} onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
          <button type="button" className="projects__close" aria-label="Close image viewer" onClick={() => setLightboxOpen(false)} autoFocus><X size={22} aria-hidden="true" /></button>
          <div className="projects__expanded-image" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleSwipe}>
            <img key={image.src} src={image.src} alt={image.alt} draggable={false} style={{ "--image-offset": `${imageDirection * 16}px` }} />
          </div>
          {arrows(true)}
          <span className="projects__lightbox-counter" aria-live="polite" aria-atomic="true">{imageIndex + 1} / {project.images.length}</span>
        </dialog>,
        document.body
      )}
    </section>
  );
}
