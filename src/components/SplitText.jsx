import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SplitText({
  text,
  tag: Tag = "h1",
  className = "",
  splitType = "chars",
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  from = {},
  to = {},
  textAlign = "left",
}) {
  const containerRef = useRef(null);
  const configRef = useRef({ from, to, delay, duration, ease, splitType });

  configRef.current = { from, to, delay, duration, ease, splitType };

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const { from: f, to: t, delay: d, duration: dur, ease: e, splitType: st } = configRef.current;

      el.innerHTML = "";
      const elements = [];

      if (st === "chars") {
        const chars = text.split("");
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          span.textContent = char === " " ? "\u00A0" : char;
          el.appendChild(span);
          elements.push(span);
        });
      } else {
        const words = text.split(" ");
        words.forEach((word, i) => {
          const span = document.createElement("span");
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          span.textContent = word + (i < words.length - 1 ? " " : "");
          el.appendChild(span);
          elements.push(span);
        });
      }

      gsap.set(elements, f);
      gsap.to(elements, { ...t, duration: dur, ease: e, stagger: d / 1000 });
    },
    { scope: containerRef, dependencies: [text] }
  );

  return (
    <Tag ref={containerRef} className={className} style={{ textAlign }} />
  );
}
