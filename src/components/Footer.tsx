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
    <footer className="border-t border-[#DDD6C8] bg-[#F5F1E8] relative z-10 pt-16 pb-12 text-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#DDD6C8]">
          
          {/* Left: Info */}
          <div>
            <h4 className="text-base font-bold font-display text-[#1D2A26]">
              {personalInfo.name}
            </h4>
            <p className="text-xs text-[#6B7280]">
              {personalInfo.role}
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={onCopyEmail}
              aria-label="Copy Email"
              className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shadow-sm"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#2F5D50] hover:text-[#1D2A26] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-1.5 font-mono">
            <span>Built with React</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>& Framer Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
