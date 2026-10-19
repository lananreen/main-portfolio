import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import FolderFloat from "./FolderFloat";
import StickerPeel from "./StickerPeel";
import "./Home.css";

const ROLES = ["Web Developer", "UI/UX Designer", "Video Editor", "AI Automation"];
const TEXT_COLOR = "#3A3428";

export default function Home() {
  const lenis = useLenis();
  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
  const stickerAreaRef = useRef(null);
  const [stickerArea, setStickerArea] = useState(null);
  const stickerWidth = stickerArea ? Math.min(195, stickerArea.width * 0.13) : 0;

  useEffect(() => {
    const area = stickerAreaRef.current;
    if (!area) return;
    const observer = new ResizeObserver(([entry]) => {
      setStickerArea({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const updateMobile = (event) => setMobile(event.matches);
    query.addEventListener("change", updateMobile);
    return () => query.removeEventListener("change", updateMobile);
  }, []);

  const handleNavigate = (event, id) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) {
      lenis.scrollTo(target, { immediate: reducedMotion });
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    }
  };

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 250);
    const t3 = setTimeout(() => setStep(3), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-6 pt-32 pb-24 md:px-16"
      style={{ backgroundColor: "#FFF8E2" }}
    >
      <div
        ref={stickerAreaRef}
        className="home-sticker-area"
        style={{ "--sticker-width": `${stickerWidth}px` }}
      >
        {!mobile && stickerArea && (
          <>
            <StickerPeel
              imageSrc="/art%203.png"
              width={stickerWidth}
              rotate={-12}
              finish="matte"
              lightingIntensity={0}
              followPointer={false}
              initialPosition={{
                x: -stickerArea.width / 2 + 6 + stickerWidth * 0.63,
                y: stickerArea.height / 2 - 6 - stickerWidth * 0.75,
              }}
              aria-label="Flower character sticker. Hold and drag to move it around."
              aria-describedby="home-sticker-hint"
            >
              <span id="home-sticker-hint" className="home-sticker-hint">
                Hold and drag<br />to move me
              </span>
            </StickerPeel>
          </>
        )}
      </div>

      <div data-reveal="zoom" style={{ "--reveal-delay": "100ms" }}>
        <FolderFloat
          items={ROLES}
          label="Current Roles"
          trigger={mobile ? "click" : "hover"}
          spread={mobile ? 140 : 180}
          folderColor="#8EB1D1"
          frontColor="#8EB1D1"
          paperColor="#FFFFFF"
          itemColor="#FFFFFF"
          itemTextColor="#2B2620"
          labelColor="#24425E"
        />
      </div>

      <div className="flex max-w-3xl flex-col items-center gap-5 text-center">
        <h1
          className={`text-4xl font-bold tracking-tight md:text-5xl ${step >= 2 ? "animate-fade-slide-in-down" : "opacity-0"}`}
          style={{ color: TEXT_COLOR }}
        >
          Hi! My name is Lana
        </h1>

        <p
          className={`text-base leading-relaxed md:text-lg ${step >= 3 ? "animate-fade-in" : "opacity-0"}`}
          style={{ color: TEXT_COLOR }}
        >
          I am a recent graduate with a degree in Bachelor of Science in Information
          Technology, specializing in Web-Technology. I am interested in front-end development and creating user-centric
          prototypes to bridge the gap between functional and intuitive web design.
        </p>

        <div className="home-actions" data-reveal="zoom" style={{ "--reveal-delay": "400ms" }}>
          <a
            className="home-actions__button home-actions__button--projects"
            href="#projects"
            onClick={(event) => handleNavigate(event, "projects")}
          >
            See my projects
          </a>
          <a
            className="home-actions__button home-actions__button--hello"
            href="#footer"
            onClick={(event) => handleNavigate(event, "footer")}
          >
            Say hello
          </a>
        </div>
      </div>
    </section>
  );
}
