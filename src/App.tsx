import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTopButton from './components/BackToTopButton';
import LoadingScreen from './components/LoadingScreen';
import BackgroundEffects from './components/BackgroundEffects';
import Toast from './components/Toast';
import ScrollReveal from './components/ScrollReveal';

import { personalInfo } from './data/portfolioData';
import { Project, Certification } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Modal Lightbox state
  const [modalItem, setModalItem] = useState<Project | Certification | null>(null);
  const [modalType, setModalType] = useState<
    'project' | 'certification' | null
  >(null);

  // Track the section currently visible to the user
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('section[id]')
      );

      if (sections.length === 0) {
        return;
      }

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      const activationPoint =
        scrollPosition + viewportHeight * 0.3;

      let currentSection = 'hero';

      for (const section of sections) {
        const sectionTop = section.offsetTop;

        if (sectionTop <= activationPoint) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleResize);

    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    showToast(
      'Email address copied to clipboard!',
      'success'
    );
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenProjectLightbox = (project: Project) => {
    setModalItem(project);
    setModalType('project');
  };

  const handleOpenCertModal = (cert: Certification) => {
    setModalItem(cert);
    setModalType('certification');
  };

  const handleCloseModal = () => {
    setModalItem(null);
    setModalType(null);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F1E8] text-[#1D2A26] font-sans selection:bg-[#2F5D50] selection:text-white overflow-x-hidden">

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Ambient Background Effects */}
      <BackgroundEffects />

      {/* Floating Back to Top Button */}
      <BackToTopButton />

      {/* Fixed Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">

        {/* Hero */}
        <Hero onCopyEmail={handleCopyEmail} />

        {/* About */}
        <ScrollReveal>
          <About />
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal delay={0.05}>
          <Skills />
        </ScrollReveal>

        {/* Projects */}
        <ScrollReveal delay={0.05}>
          <Projects
            onOpenLightbox={handleOpenProjectLightbox}
          />
        </ScrollReveal>

        {/* Certifications */}
        <ScrollReveal delay={0.05}>
          <Certifications
            onOpenCertModal={handleOpenCertModal}
          />
        </ScrollReveal>

        {/* Education */}
        <ScrollReveal delay={0.05}>
          <Education />
        </ScrollReveal>

        {/* Experience */}
        <ScrollReveal delay={0.05}>
          <Experience />
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={0.05}>
          <Contact
            onCopyEmail={handleCopyEmail}
            onShowToast={showToast}
          />
        </ScrollReveal>

      </main>

      {/* Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Lightbox / Details Modal */}
      <LightboxModal
        item={modalItem}
        type={modalType}
        onClose={handleCloseModal}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />

      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}
