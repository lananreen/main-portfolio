import LogoLoop from "./LogoLoop";
import Reveal from "./Reveal";
import SpecularOutline from "./SpecularOutline";

const LOGOS = Array.from({ length: 11 }, (_, i) => ({
  src: `/logo-${i + 1}.png`,
  alt: `Logo ${i + 1}`,
}));

const CATEGORIES = [
  {
    id: "technical",
    label: "Technical",
    items: [
      { bold: "Front-end languages:", text: "HTML, CSS, JavaScript" },
      { bold: "Programming languages:", text: "Python, TypeScript" },
      { bold: "Framework & Libraries:", text: "Laravel, React, TailwindCSS" },
      { bold: "Development tools:", text: "Firebase, Git, Github, Figma" },
    ],
  },
  {
    id: "soft",
    label: "Soft",
    items: [
      { text: "Adaptability to new technologies and fast-paced developments." },
      { text: "Collaboration with teams to align technical deliverables with business goals." },
      { text: "Determination to perform tasks and optimize workflows." },
      { text: "Proactive Communication & Feedback." },
    ],
  },
  {
    id: "interests",
    label: "Interests",
    items: [
      { text: "Reading romance novels" },
      { text: "Hobby hunting" },
      { text: "Exploring new restaurants and cafes" },
      { text: "Collecting Pop Mart figures" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-16 border-t border-white/[0.06]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 w-full max-w-7xl mx-auto mb-16">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 150}>
            <SpecularOutline
              radius={16}
              className="rounded-2xl bg-black p-5 sm:p-8 md:p-10 min-h-[300px] sm:min-h-[420px] md:min-h-[480px] flex flex-col transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-7 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
                {cat.label}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-white/40" />
                    <span>
                      {item.bold && <strong className="text-white">{item.bold} </strong>}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </SpecularOutline>
          </Reveal>
        ))}
      </div>

      <Reveal className="absolute bottom-0 left-0 right-0 w-full" delay={450}>
        <LogoLoop
          logos={LOGOS}
          speed={60}
          logoHeight="clamp(64px, 12vw, 100px)"
          gap={64}
          scaleOnHover
          ariaLabel="Skills & Interests logos"
        />
      </Reveal>
    </section>
  );
}
