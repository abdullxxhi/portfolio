import { useState, useEffect } from 'react';
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

  // Modal Lightbox state
  const [modalItem, setModalItem] = useState<Project | Certification | null>(null);
  const [modalType, setModalType] = useState<'project' | 'certification' | null>(null);

  // Track the section currently reached while scrolling
  useEffect(() => {
    const updateActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');

      // Account for the fixed navbar
      const scrollPosition = window.scrollY + 120;

      let currentSection = 'hero';

      sections.forEach((section) => {
        const element = section as HTMLElement;

        if (element.offsetTop <= scrollPosition) {
          currentSection = element.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    showToast('Email address copied to clipboard!', 'success');
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
      {/* 1-Second Loading Screen */}
      <LoadingScreen />

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar at top */}
      <ScrollProgressBar />

      {/* Ambient Background Effects */}
      <BackgroundEffects />

      {/* Floating Back to Top Button */}
      <BackToTopButton />

      {/* Fixed Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero onCopyEmail={handleCopyEmail} />
        <About />
        <Skills />
        <Projects onOpenLightbox={handleOpenProjectLightbox} />
        <Certifications onOpenCertModal={handleOpenCertModal} />
        <Education />
        <Experience />
        <Contact
          onCopyEmail={handleCopyEmail}
          onShowToast={showToast}
        />
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
    </div>
  );
}
