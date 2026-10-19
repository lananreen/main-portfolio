import { Mail } from "lucide-react";
import FlipCard from "./FlipCard.jsx";
import "./About.css";

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/lana-noreen-tarlac-6a4636230",
    label: "LinkedIn",
    iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
  },
  {
    href: "https://github.com/lananreen",
    label: "GitHub",
    iconPath: "M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222v3.292c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297z",
  },
  {
    href: "https://www.instagram.com/lnreen",
    label: "Instagram",
    iconPath: "M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.334 4.14.63a5.88 5.88 0 0 0-2.126 1.384A5.88 5.88 0 0 0 .63 4.14C.334 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.262 2.151.558 2.913a5.88 5.88 0 0 0 1.384 2.126A5.88 5.88 0 0 0 4.14 23.37c.762.296 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.151-.262 2.913-.558a5.88 5.88 0 0 0 2.126-1.384 5.88 5.88 0 0 0 1.384-2.126c.296-.762.5-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.058-1.278-.262-2.151-.558-2.913a5.88 5.88 0 0 0-1.384-2.126A5.88 5.88 0 0 0 19.86.63c-.762-.296-1.635-.5-2.913-.558C15.667.014 15.259 0 12 0zm0 2.162c3.204 0 3.584.012 4.849.07 1.17.053 1.805.249 2.228.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.72 3.72 0 0 1-.898 1.38 3.72 3.72 0 0 1-1.38.898c-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.72 3.72 0 0 1-1.38-.898 3.72 3.72 0 0 1-.898-1.38c-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.053-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
];

export default function About() {
  return (
    <section id="about" className="about-me" aria-labelledby="about-me-heading">
      <div className="about-me__folder" data-reveal="fade-slide">
        <div className="about-me__paper">
          <div className="about-me__content">
            <h2 id="about-me-heading" className="about-me__heading">About Me</h2>
            <p>
              My name is <mark>Lana</mark>! I'm 22 years old and a recent BSIT graduate
              from the University of the Cordilleras in Baguio City. I love turning
              ideas into creative, user-centric interfaces that feel intuitive and
              go beyond the expectations of others.
            </p>
            <p>
              I'm always looking for new opportunities to learn, build and grow as
              a creative developer. My hobbies include video editing, visiting flea
              markets, and playing video games!!
            </p>

            <div className="about-me__contact">
              <h3>Contact Me</h3>
              <div className="about-me__socials" data-reveal="zoom" style={{ "--reveal-delay": "250ms" }}>
                {SOCIALS.map(({ href, label, iconPath }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <svg className="about-me__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d={iconPath} />
                    </svg>
                    {label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
              <a className="about-me__email" data-reveal="zoom" style={{ "--reveal-delay": "250ms" }} href="mailto:lananreen@gmail.com">
                <Mail className="about-me__icon" aria-hidden="true" />
                <span>Email: lananreen@gmail.com</span>
              </a>
            </div>
          </div>

          <figure className="about-me__photo">
            <FlipCard
              width={380}
              height={460}
              background="transparent"
              shadow={false}
              ariaLabel="Flip between Lana's illustration and photo"
              describedBy="about-me-photo-hint"
              front={<img className="about-me__illustration" src="/me.png" alt="An illustration of Lana" draggable="false" />}
              back={<img src="/image.jpg" alt="Lana Tarlac" draggable="false" />}
            />
            <figcaption id="about-me-photo-hint">
              click the photo to flip it <span aria-hidden="true">↻</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
