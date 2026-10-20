import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDark, onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer
      className={`border-t py-12 text-xs transition-colors ${
        isDark
          ? 'border-zinc-800/80 bg-[#050505] text-zinc-400'
          : 'border-zinc-200 bg-[#FAF9F5] text-zinc-600'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <p
            className={`font-display text-sm font-semibold ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            Soren Lindqvist — Fine Art &amp; Architectural Photography
          </p>
          <p>
            © {new Date().getFullYear()} Soren Lindqvist Studio. All photographs human-captured on
            medium-format &amp; 35mm film.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav aria-label="Footer navigation" className="flex items-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => handleNav(e, 'portfolio')}
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              Portfolio
            </a>
            <a
              href="#journal"
              onClick={(e) => handleNav(e, 'journal')}
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              Journal
            </a>
            <a
              href="#about"
              onClick={(e) => handleNav(e, 'about')}
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, 'contact')}
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          <span aria-hidden="true" className="hidden sm:inline text-zinc-600">
            |
          </span>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soren Lindqvist on Instagram"
              className="inline-flex items-center gap-1 hover:underline underline-offset-4 whitespace-nowrap"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://glass.photo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soren Lindqvist on Glass Photo"
              className="inline-flex items-center gap-1 hover:underline underline-offset-4 whitespace-nowrap"
            >
              <span>Glass</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soren Lindqvist on Behance"
              className="inline-flex items-center gap-1 hover:underline underline-offset-4 whitespace-nowrap"
            >
              <span>Behance</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
