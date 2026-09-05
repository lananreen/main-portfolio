import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Home, Cpu, Layout, Award } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "skills", label: "Skills & Interests", icon: Cpu },
  { id: "projects", label: "Projects", icon: Layout },
  { id: "certifications", label: "Certifications", icon: Award },
];

export default function MobileSidebar() {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");
  const [awake, setAwake] = useState(false);
  const fadeTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => clearTimeout(fadeTimer.current);
  }, []);

  const wake = () => {
    setAwake(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => setAwake(false), 1600);
  };

  const handleClick = (id) => (e) => {
    e.preventDefault();
    wake();
    const el = document.getElementById(id);
    if (!el) return;

    const elTop = el.getBoundingClientRect().top;
    if (elTop > -10 && elTop < 80) return;

    lenis?.scrollTo(el, { offset: 0 });
  };

  return (
    <nav
      aria-label="Table of contents"
      onTouchStart={wake}
      className={`fixed left-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-1.5 transition-opacity duration-300 md:hidden ${
        awake ? "opacity-100" : "opacity-30"
      }`}
    >
      {NAV_LINKS.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            onClick={handleClick(id)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 active:scale-90 ${
              isActive
                ? "scale-110 bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                : "text-white/60 hover:bg-white/10"
            }`}
          >
            <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
          </button>
        );
      })}
    </nav>
  );
}
