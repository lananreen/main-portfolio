import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";
import AboutSection from "./components/About";
import SkillsSection from "./components/Skills";
import ProjectsSection from "./components/Projects";
import CertificationsSection from "./components/Certifications";
import Grainient from "./components/Grainient";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="fixed-background">
        <Grainient
          color1="#a1b6db"
          color2="#000000"
          color3="#717171"
        />
      </div>
      <ReactLenis root options={{ autoRaf: true }}>
        <div className="relative">
          <Navbar />
          <MobileSidebar />
          <main className="relative z-10">
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </>
  );
}
