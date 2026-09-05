import { useEffect, useState } from "react";
import FoldText from "./FoldText";

export default function Home() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 200);
    const t3 = setTimeout(() => setStep(3), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-16"
    >
      <div className="flex flex-col items-center gap-8">
        <FoldText
          text="Lana Tarlac"
          splitBy="char"
          hinge="top"
          duration={0.65}
          stagger={0.045}
          perspective={700}
          creaseShading={0.55}
          trigger="mount"
          fontSize={36}
          fontWeight={800}
          color="#ffffff"
          className="md:text-9xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center"
        />

        <p className={`max-w-2xl text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:text-xl text-justify ${step >= 2 ? "animate-fade-slide-in-left" : "opacity-0"}`}>
          A third-year undergraduate in BSIT Web Technology at the University of the Cordilleras with an interest in UI/UX design and front-end web development.
        </p>

        <button
          onClick={() => {
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`mt-4 rounded-full border border-white/20 bg-white/10 px-10 py-4 text-base font-medium text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:border-white/30 ${step >= 3 ? "animate-fade-slide-in-down" : "opacity-0"}`}
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
