import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const sectionId = href.replace('#', '');
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    // Close the mobile menu first.
    setMobileMenuOpen(false);

    // Wait until React/browser has processed the menu state change
    // before calculating the target's position.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const navOffset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navOffset;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });

        // Keep the URL hash in sync without causing the browser
        // to perform its own jump.
        window.history.replaceState(null, '', href);
      });
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#F5F1E8]/90 backdrop-blur-xl border-b border-[#DDD6C8] shadow-[0_4px_20px_rgba(47,93,80,0.08)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Name */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex flex-col group cursor-pointer"
        >
          <span className="font-display font-bold text-sm tracking-tight text-[#1D2A26] group-hover:text-[#2F5D50] transition-colors">
            Build. Automate. Analyze.
          </span>
        </a>

        {/* Center: Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-[#FCFAF6]/90 backdrop-blur-md border border-[#DDD6C8] shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#4B5563] hover:text-[#1D2A26]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#2F5D50] rounded-full -z-10 shadow-[0_2px_10px_rgba(47,93,80,0.25)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Primary CTA "Hire Me" */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-xs focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#2F5D50] via-[#D97745] to-[#2F5D50]" />

            <span className="relative px-5 py-2 rounded-full bg-[#2F5D50] flex items-center space-x-1.5 text-white group-hover:bg-[#244A40] transition-all duration-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D97745] group-hover:text-white" />

              <span className="font-semibold">Hire Me</span>

              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-3.5 py-1.5 rounded-full bg-[#2F5D50] text-white text-xs font-semibold shadow-sm sm:hidden"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#1D2A26] hover:text-[#2F5D50] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#F5F1E8]/98 backdrop-blur-2xl border-b border-[#DDD6C8] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#2F5D50] text-white'
                        : 'text-[#4B5563] hover:text-[#1D2A26] hover:bg-[#FCFAF6]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full py-3 rounded-xl bg-[#2F5D50] text-white text-center font-semibold text-sm flex items-center justify-center space-x-2 shadow-md hover:bg-[#244A40]"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
