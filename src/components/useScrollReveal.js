import { useLayoutEffect } from "react";
import "./ScrollReveal.css";

// Animate existing elements directly so grid placement and hover transforms stay intact.
export default function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.dataset.revealState = "entering";
        observer.unobserve(target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    elements.forEach((element) => {
      element.dataset.revealState = "pending";
      observer.observe(element);
    });

    const finish = (event) => {
      if (event.animationName?.startsWith("scroll-reveal-")) {
        event.target.dataset.revealState = "complete";
      }
    };
    const revealFocused = (event) => {
      let element = event.target.closest("[data-reveal]");
      while (element) {
        element.dataset.revealState = "complete";
        observer.unobserve(element);
        element = element.parentElement?.closest("[data-reveal]");
      }
    };
    const disableMotion = () => {
      if (!motionPreference.matches) return;
      observer.disconnect();
      elements.forEach((element) => { element.dataset.revealState = "complete"; });
    };

    document.addEventListener("animationend", finish);
    document.addEventListener("focusin", revealFocused);
    motionPreference.addEventListener("change", disableMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("animationend", finish);
      document.removeEventListener("focusin", revealFocused);
      motionPreference.removeEventListener("change", disableMotion);
      elements.forEach((element) => { delete element.dataset.revealState; });
    };
  }, []);
}
