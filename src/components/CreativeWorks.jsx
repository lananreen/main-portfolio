import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import "./Projects.css";
import "./CreativeWorks.css";

const DRAWINGS = [
  { src: "/art 1.jpg", alt: "Artwork 1" },
  { src: "/art 2.png", alt: "Artwork 2" },
  { src: "/art 3.png", alt: "Artwork 3" },
  { src: "/art 4.png", alt: "Artwork 4" },
  { src: "/art 5.png", alt: "Artwork 5" },
  { src: "/art 6.png", alt: "Artwork 6" },
  { src: "/art 7.png", alt: "Artwork 7" },
];

const VIDEOS = [
  "/vid 1.mp4",
  "/vid 2.mp4",
  "/vid 3.mp4",
  "/vid 4.mp4",
  "/vid 5.mp4",
];

const TABS = ["Drawings", "Videos"];

export default function CreativeWorksSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const dialogRef = useRef(null);
  const videoDialogRef = useRef(null);
  const videoRef = useRef(null);
  const touchStart = useRef(null);
  const lenis = useLenis();
  const image = DRAWINGS[imageIndex];

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

  useEffect(() => {
    if (!videoOpen) return;
    const dialog = videoDialogRef.current;
    const video = videoRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      video.pause();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [videoOpen, lenis]);

  useEffect(() => {
    if (!videoOpen) return;
    const video = videoRef.current;
    video.currentTime = 0;
    video.play()?.catch(() => {});
  }, [videoOpen, videoIndex]);

  const openVideo = (index) => {
    setVideoIndex(index);
    setVideoOpen(true);
  };

  const navigateVideo = (direction) => {
    setVideoIndex((index) => (index + direction + VIDEOS.length) % VIDEOS.length);
  };

  const navigate = (direction) => {
    setImageIndex((index) => (index + direction + DRAWINGS.length) % DRAWINGS.length);
  };

  const handleTabKey = (event, index) => {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = (index + 1) % TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = TABS.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActiveTab(next);
    document.getElementById(`creative-tab-${next}`)?.focus();
  };

  const handleSwipe = (event) => {
    if (touchStart.current === null) return;
    const distance = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) navigate(distance > 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <section id="creative" className="projects creative-works" aria-labelledby="creative-heading">
      <div className="projects__intro" data-reveal="zoom">
        <h2 id="creative-heading">Creative Works</h2>
        <p>Drawings and edits I made as a personal hobby.</p>
      </div>

      <div className="projects__collection" data-reveal="slide">
        <div className="projects__tabs" role="tablist" aria-label="Creative works">
          {TABS.map((tab, index) => (
            <button key={tab} id={`creative-tab-${index}`} type="button" role="tab" className="projects__tab" aria-selected={activeTab === index} aria-controls="creative-panel" tabIndex={activeTab === index ? 0 : -1} onClick={() => setActiveTab(index)} onKeyDown={(event) => handleTabKey(event, index)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="projects__folder">
          <div id="creative-panel" className="creative-works__panel" role="tabpanel" aria-labelledby={`creative-tab-${activeTab}`} tabIndex={0}>
            <div className="creative-works__drawings" hidden={activeTab !== 0}>
              {DRAWINGS.map((drawing, index) => (
                <button key={drawing.src} type="button" className="creative-works__drawing" data-reveal="zoom" style={{ "--reveal-delay": `${180 + index * 140}ms` }} aria-label={`Enlarge artwork ${index + 1}`} onClick={() => { setImageIndex(index); setLightboxOpen(true); }}>
                  <img src={drawing.src} alt={drawing.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <div className="creative-works__videos-panel" hidden={activeTab !== 1}>
              <p className="creative-works__description" data-reveal="fade-slide">
                I ran an Instagram account, <mark className="creative-works__handle">@gvweasl</mark>, where I shared creative edits made for different fandoms. Here are a few of my favorites.
              </p>
              <a className="projects__link creative-works__instagram" data-reveal="zoom" style={{ "--reveal-delay": "140ms" }} href="https://www.instagram.com/gvweasl/" target="_blank" rel="noopener noreferrer">View Instagram<span className="projects__sr-only"> (opens in a new tab)</span></a>
              <div className="creative-works__videos">
                {VIDEOS.map((url, index) => (
                  <div key={url} className="creative-works__video" data-reveal="fade-slide" style={{ "--reveal-delay": `${240 + index * 140}ms` }}>
                    <video className="creative-works__video-preview" src={`${url}#t=0.1`} preload="metadata" muted playsInline aria-hidden="true" />
                    <button type="button" className="creative-works__video-link" onClick={() => openVideo(index)} aria-label={`Play video ${index + 1} in expanded viewer`}>
                      <span className="creative-works__play"><Play size={20} fill="currentColor" aria-hidden="true" /></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <dialog ref={videoDialogRef} className="projects__lightbox creative-works__video-lightbox" aria-label="Video viewer" data-lenis-prevent onCancel={() => setVideoOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setVideoOpen(false); }}>
          <button type="button" className="projects__close" aria-label="Close video viewer" onClick={() => setVideoOpen(false)} autoFocus><X size={22} aria-hidden="true" /></button>
          <video ref={videoRef} src={VIDEOS[videoIndex]} controls controlsList="nofullscreen" disablePictureInPicture playsInline preload="none" />
          <button type="button" className="projects__arrow projects__arrow--previous projects__arrow--expanded" aria-label="Previous video" onClick={() => navigateVideo(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
          <button type="button" className="projects__arrow projects__arrow--next projects__arrow--expanded" aria-label="Next video" onClick={() => navigateVideo(1)}><ChevronRight size={20} aria-hidden="true" /></button>
          <span className="projects__lightbox-counter" aria-live="polite" aria-atomic="true">{videoIndex + 1} / {VIDEOS.length}</span>
        </dialog>,
        document.body
      )}

      {createPortal(
        <dialog ref={dialogRef} className="projects__lightbox creative-works__lightbox" aria-label="Artwork viewer" data-lenis-prevent onCancel={() => setLightboxOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }} onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
          <button type="button" className="projects__close" aria-label="Close artwork viewer" onClick={() => setLightboxOpen(false)} autoFocus><X size={22} aria-hidden="true" /></button>
          <div className="projects__expanded-image" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleSwipe} onTouchCancel={() => { touchStart.current = null; }}>
            <img key={image.src} src={image.src} alt={image.alt} draggable={false} />
          </div>
          <button type="button" className="projects__arrow projects__arrow--previous projects__arrow--expanded" aria-label="Previous artwork" onClick={() => navigate(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
          <button type="button" className="projects__arrow projects__arrow--next projects__arrow--expanded" aria-label="Next artwork" onClick={() => navigate(1)}><ChevronRight size={20} aria-hidden="true" /></button>
          <span className="projects__lightbox-counter" aria-live="polite" aria-atomic="true">{imageIndex + 1} / {DRAWINGS.length}</span>
        </dialog>,
        document.body
      )}
    </section>
  );
}
