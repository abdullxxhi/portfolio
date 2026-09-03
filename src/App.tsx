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

import { personalInfo } from './data/portfolioData';
import { Project, Certification } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalItem, setModalItem] = useState<Project | Certification | null>(null);
  const [modalType, setModalType] = useState<
    'project' | 'certification' | null
  >(null);

  /*
   * Scroll tracking
   * Keeps the navbar active state synchronized with
   * the section currently visible on screen.
   */
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('section[id]')
      );

      if (sections.length === 0) {
        ticking = false;
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

  /*
   * Navigate to a section.
   *
   * This is deliberately handled at the App level so both:
   * - clicking navbar links
   * - opening /skills, /projects, etc. directly
   *
   * use the exact same scrolling behavior.
   */
  useEffect(() => {
    const getSectionFromPath = () => {
      const pathname =
        window.location.pathname.replace(/\/+$/, '') || '/';

      if (pathname === '/') {
        return null;
      }

      return pathname.substring(1);
    };

    const scrollToPath = (behavior: ScrollBehavior) => {
      const sectionId = getSectionFromPath();

      if (!sectionId) {
        return;
      }

      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      const navbarOffset = 88;

      const targetPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior,
      });
    };

    /*
     * Handles navigation events coming from Navbar.
     */
    const handlePortfolioNavigation = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{ path: string }>;

      if (!customEvent.detail?.path) {
        return;
      }

      window.history.pushState(
        {},
        '',
        customEvent.detail.path
      );

      scrollToPath('smooth');
    };

    /*
     * Handles browser Back / Forward.
     */
    const handlePopState = () => {
      scrollToPath('smooth');
    };

    window.addEventListener(
      'portfolio:navigate',
      handlePortfolioNavigation
    );

    window.addEventListener(
      'popstate',
      handlePopState
    );

    /*
     * Handles someone opening:
     *
     * /about
     * /skills
     * /projects
     * /contact
     *
     * directly.
     */
    const initialTimeout = window.setTimeout(() => {
      scrollToPath('auto');
    }, 150);

    return () => {
      window.removeEventListener(
        'portfolio:navigate',
        handlePortfolioNavigation
      );

      window.removeEventListener(
        'popstate',
        handlePopState
      );

      window.clearTimeout(initialTimeout);
    };
  }, []);

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToastMessage(message);
    setToastType(type);

    window.setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    showToast(
      'Email address copied to clipboard!',
      'success'
    );
  };

  const handleOpenProjectLightbox = (
    project: Project
  ) => {
    setModalItem(project);
    setModalType('project');
  };

  const handleOpenCertModal = (
    cert: Certification
  ) => {
    setModalItem(cert);
    setModalType('certification');
  };

  const handleCloseModal = () => {
    setModalItem(null);
    setModalType(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F1E8] font-sans text-[#1D2A26] selection:bg-[#2F5D50] selection:text-white">
      <LoadingScreen />

      <CustomCursor />

      <ScrollProgressBar />

      <BackgroundEffects />

      <BackToTopButton />

      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <Hero onCopyEmail={handleCopyEmail} />

        <About />

        <Skills />

        <Projects
          onOpenLightbox={handleOpenProjectLightbox}
        />

        <Certifications
          onOpenCertModal={handleOpenCertModal}
        />

        <Education />

        <Experience />

        <Contact
          onCopyEmail={handleCopyEmail}
          onShowToast={showToast}
        />
      </main>

      <Footer onCopyEmail={handleCopyEmail} />

      <LightboxModal
        item={modalItem}
        type={modalType}
        onClose={handleCloseModal}
      />

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />

      <Analytics />

      <SpeedInsights />
    </div>
  );
}
