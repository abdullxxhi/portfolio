import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

const navLinks = [
  { name: 'About', path: '/about', id: 'about' },
  { name: 'Skills', path: '/skills', id: 'skills' },
  { name: 'Projects', path: '/projects', id: 'projects' },
  { name: 'Certifications', path: '/certifications', id: 'certifications' },
  { name: 'Education', path: '/education', id: 'education' },
  { name: 'Experience', path: '/experience', id: 'experience' },
  { name: 'Contact', path: '/contact', id: 'contact' },
];

const NAVBAR_OFFSET = 76;

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    setMobileMenuOpen(false);

    /*
     * Change the URL without reloading the SPA.
     * pushState does NOT move the page, so we control the scroll ourselves.
     */
    window.history.pushState({}, '', path);

    /*
     * Wait for the mobile menu to close before measuring the target.
     * Two animation frames ensure React has committed the state update.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          NAVBAR_OFFSET;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
      });
    });
  };

  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setMobileMenuOpen(false);
    window.history.pushState({}, '', '/');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#DDD6C8] bg-[#F5F1E8]/95 py-3 backdrop-blur-md'
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="/"
          onClick={goHome}
          className="group flex items-center"
        >
          <span className="font-display text-sm font-bold tracking-tight text-[#1D2A26] transition-colors duration-200 group-hover:text-[#2F5D50]">
            {personalInfo.initials}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(event) =>
                  scrollToSection(event, link.path, link.id)
                }
                className={`relative py-2 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-[#2F5D50]'
                    : 'text-[#6B7280] hover:text-[#1D2A26]'
                }`}
              >
                {link.name}

                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#2F5D50]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <a
            href="/contact"
            onClick={(event) =>
              scrollToSection(event, '/contact', 'contact')
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2F5D50] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#244A40]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/contact"
            onClick={(event) =>
              scrollToSection(event, '/contact', 'contact')
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[#2F5D50] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#244A40]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#1D2A26] transition-colors duration-200 hover:border-[#2F5D50] hover:text-[#2F5D50]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden border-t border-[#DDD6C8] bg-[#F5F1E8]/98 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="divide-y divide-[#DDD6C8] border-y border-[#DDD6C8]">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={(event) =>
                        scrollToSection(event, link.path, link.id)
                      }
                      className={`flex items-center justify-between py-3.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-[#2F5D50]'
                          : 'text-[#4B5563] hover:text-[#1D2A26]'
                      }`}
                    >
                      <span>{link.name}</span>

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2F5D50]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
