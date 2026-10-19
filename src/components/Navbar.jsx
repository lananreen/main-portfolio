import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Menu } from "lucide-react";
import JellyRadio from "./JellyRadio";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "creative", label: "Creative Works" },
  { id: "certifications", label: "Certificates" },
];

const MOBILE_NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "creative", label: "Creative" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "footer", label: "Contact" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");
  const scrollTarget = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const dismissOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const dismissOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(max-width: 640px)");
    const dismissOnResize = () => { if (!media.matches) setMenuOpen(false); };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    media.addEventListener("change", dismissOnResize);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
      media.removeEventListener("change", dismissOnResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      if (scrollTarget.current && lenis?.isScrolling === "smooth") return;
      scrollTarget.current = null;
      const middle = window.innerHeight / 2;
      let active = null;

      const links = window.matchMedia("(max-width: 640px)").matches ? MOBILE_NAV_LINKS : NAV_LINKS;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom > middle) {
          active = id;
          break;
        }
      }

      if (active) setActiveSection(active);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: "-40% 0px -40% 0px"
    });

    MOBILE_NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lenis]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    if (lenis) {
      scrollTarget.current = id;
      lenis.scrollTo(el, {
        offset: 0,
        onComplete: () => { scrollTarget.current = null; },
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header ref={headerRef} className="portfolio-navbar">
      <nav className="portfolio-navbar__scroll" aria-label="Main navigation">
        <JellyRadio items={NAV_LINKS} value={activeSection} onChange={handleClick} />
      </nav>
      <nav className="portfolio-navbar__mobile" aria-label="Mobile navigation" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}>
        <button ref={toggleRef} type="button" className="portfolio-navbar__pill" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={`${MOBILE_NAV_LINKS.find(({ id }) => id === activeSection)?.label ?? "Home"}: toggle navigation`} onClick={() => setMenuOpen((open) => !open)}>
          <span>{MOBILE_NAV_LINKS.find(({ id }) => id === activeSection)?.label ?? "Home"}</span>
          <Menu size={19} aria-hidden="true" />
        </button>
        <div id="mobile-navigation" className={`portfolio-navbar__folder${menuOpen ? " portfolio-navbar__folder--open" : ""}`} inert={!menuOpen} aria-hidden={!menuOpen} data-lenis-prevent>
          <ul className="portfolio-navbar__cards">
            {MOBILE_NAV_LINKS.map(({ id, label }, index) => (
              <li key={id} style={{ "--card-rotation": `${index % 2 === 0 ? -1.4 : 1.1}deg` }}>
                <a href={`#${id}`} className="portfolio-navbar__card" aria-current={activeSection === id ? "location" : undefined} onClick={(event) => {
                  event.preventDefault();
                  handleClick(id);
                  setMenuOpen(false);
                  toggleRef.current?.focus();
                }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
