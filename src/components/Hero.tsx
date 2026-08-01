import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onCopyEmail: () => void;
}

export default function Hero({ onCopyEmail }: HeroProps) {
  // Role typing effect
  const roles = [
    'Data Analyst',
    'Workflow Automation',
    'Google Workspace',
    'AI Automation'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div>
          
          {/* Main Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 text-left"
          >
            {/* Role Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4E8D66] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#4E8D66]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
                AI AUTOMATION & DATA ANALYTICS
              </span>
            </div>

            {/* Title & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#1D2A26] tracking-tight leading-[1.1]">
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D50] via-[#3d7263] to-[#D97745]">
                  {personalInfo.name}
                </span>
              </h1>

              {/* Typing Animation Role Subtitle */}
              <div className="h-8 flex items-center space-x-2 text-lg sm:text-xl font-mono text-[#2F5D50]">
                <span className="text-[#D97745]">&gt;</span>
                <span className="font-semibold text-[#1D2A26]">{displayedText}</span>
                <span className="w-2 h-5 bg-[#D97745] animate-pulse" />
              </div>
            </div>

            {/* One-line bio */}
            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
              {personalInfo.aboutHeadline}
            </p>

            {/* Buttons & CTA */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="px-6 py-3.5 rounded-2xl bg-[#2F5D50] text-white font-semibold text-sm flex items-center space-x-2.5 shadow-[0_8px_25px_rgba(47,93,80,0.25)] hover:bg-[#244A40] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-6 py-3.5 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#1D2A26] hover:text-[#2F5D50] hover:border-[#2F5D50] font-semibold text-sm flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#D97745]" />
                <span>Let's Talk</span>
              </a>
            </div>

            {/* Small Social Icons & Quick Contact */}
            <div className="pt-4 flex items-center space-x-4 text-[#6B7280]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">Connect:</span>
              
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={onCopyEmail}
                aria-label="Copy Email"
                title="Copy Email"
                className="p-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </button>

              <a
                href={`tel:${personalInfo.phone}`}
                aria-label="Call Phone"
                title={personalInfo.phone}
                className="p-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
