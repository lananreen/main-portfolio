import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Navbar from "./components/Navbar";
import HomeSection from "./components/Home";
import AboutSection from "./components/About.jsx";
import SkillsSection from "./components/Skills";
import ProjectsSection from "./components/Projects";
import CreativeWorksSection from "./components/CreativeWorks";
import CertificationsSection from "./components/Certifications";
import Grainient from "./components/Grainient";
import Footer from "./components/Footer";
import useScrollReveal from "./components/useScrollReveal";

export default function App() {
  useScrollReveal();

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <div className="relative">
        <div style={{ position: 'fixed', inset: 0, zIndex: -10 }}>
          <div style={{ width: '100%', height: '100%' }}>
            <Grainient
              color1="#a1b6db"
              color2="#000000"
              color3="#717171"
            />
          </div>
        </div>
        <Navbar />
        <main className="relative z-10">
          <HomeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CreativeWorksSection />
          <CertificationsSection />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
