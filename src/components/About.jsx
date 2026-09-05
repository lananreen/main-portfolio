import { useEffect, useState } from "react";
import SplitText from "./SplitText"; // adjust path to wherever you save the component
import TiltedCard from "./TiltedCard";

const DESKTOP_HEIGHT = "384px";
const DESKTOP_WIDTH = "320px";
const MOBILE_HEIGHT = "280px";
const MOBILE_WIDTH = "240px";

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function About() {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
  );

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 200);
    const t3 = setTimeout(() => setStep(3), 300);
    const t4 = setTimeout(() => setStep(4), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    function handleChange(e) {
      setIsMobile(e.matches);
    }
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const SOCIALS = [
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/lana-noreen-tarlac-6a4636230", label: "LinkedIn" },
    { icon: GithubIcon, href: "https://github.com/lananreen", label: "GitHub" },
    { icon: InstagramIcon, href: "https://www.instagram.com/lnreen", label: "Instagram" },
    { icon: FacebookIcon, href: "https://www.facebook.com/share/18apdpLb4x/?mibextid=wwXIfr", label: "Facebook" },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col px-6 py-20 md:px-16"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 md:flex-row md:items-center">
        <div className="shrink-0">
          <div className={`transition-transform duration-500 ${step >= 1 ? "animate-zoom-in" : "opacity-0"}`}>
            <TiltedCard
              imageSrc="/image.jpg"
              altText="Lana Tarlac"
              rotateAmplitude={6}
              containerHeight={isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT}
              containerWidth={isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH}
              imageHeight={isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT}
              imageWidth={isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH}
              showMobileWarning={false}
              showTooltip={false}
              enableTilt={!isMobile}
            />
          </div>
        </div>

        <div className="flex-1">
          <SplitText
            text="Hi I'm Lana Tarlac!"
            tag="h1"
            className="text-4xl font-bold text-white md:text-6xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            splitType="chars"
            delay={40}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
          />

          <p className={`mt-4 max-w-xl text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${step >= 2 ? "animate-fade-slide-in-left" : "opacity-0"}`}>
            I am currently a student at the University of the Cordilleras taking up 
            Bachelor of Science in Information Technology, specializing in Web-Technology. I am interested in 
            front-end development and creating user-centric prototypes to bridge the gap between functional and 
            intuitive web design. 

          </p>

          <p className={`mt-4 max-w-xl text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${step >= 3 ? "animate-fade-slide-in-left" : "opacity-0"}`}>
            In my spare time, you can find me either on my desk playing video games, reading, or outside exploring new places with my partner. I also enjoy collecting Pop Mart figures to display on my shelf.
          </p>

          <div className={`mt-6 flex gap-3 ${step >= 4 ? "animate-fade-slide-in-left" : "opacity-0"}`}>
            {SOCIALS.map((social, i) =>
              social.icon ? (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/10 backdrop-blur-md text-white/70 transition-all hover:scale-125 hover:text-white hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <social.icon size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              ) : (
                <div key={i} className="h-9 w-9 rounded-md border border-white/10 bg-white/[0.04]" />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}