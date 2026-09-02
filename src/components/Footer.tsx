import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onCopyEmail: () => void;
}

export default function Footer({ onCopyEmail }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#DDD6C8] bg-[#F5F1E8] text-[#4B5563]">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">

        {/* Main Footer Row */}
        <div className="flex flex-col gap-8 border-b border-[#DDD6C8] pb-10 md:flex-row md:items-end md:justify-between">

          {/* Identity */}
          <div>
            <h4 className="font-display text-base font-bold text-[#1D2A26]">
              {personalInfo.name}
            </h4>

            <p className="mt-1 text-xs text-[#6B7280]">
              {personalInfo.role}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[#6B7280] transition-colors hover:text-[#2F5D50]"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-[#6B7280] transition-colors hover:text-[#2F5D50]"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={onCopyEmail}
              aria-label="Copy Email"
              className="text-[#6B7280] transition-colors hover:text-[#2F5D50]"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>

          {/* Back To Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 self-start text-xs font-mono font-semibold text-[#2F5D50] transition-colors hover:text-[#1D2A26] md:self-auto"
          >
            <span>Back to top</span>

            <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col gap-4 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 font-mono text-[#6B7280]">
            <span>Built with React</span>

            <Heart className="h-3.5 w-3.5 text-[#D97745]" />

            <span>& Framer Motion</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
