import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills & Interests" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");

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

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const elTop = el.getBoundingClientRect().top;
    if (elTop > -10 && elTop < 80) return;

    lenis?.scrollTo(el, { offset: 0 });
  };

  const activeLabel = NAV_LINKS.find((l) => l.id === activeSection)?.label;

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-3xl rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center px-4 py-3 md:w-[calc(100%-2rem)] md:justify-between md:px-6 md:py-4">

      <nav className="hidden md:flex flex-wrap justify-center gap-3">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={handleClick(link.id)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-md transition-all hover:scale-110 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <span
        key={activeSection}
        className="flex-1 md:flex-none text-center md:text-left animate-fade-slide-in-down text-sm md:text-base font-medium text-white/80"
      >
        {activeLabel}
      </span>
    </header>
  );
}