import React from 'react';

interface NavbarProps {
  isDark: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <header
      className={`w-full border-b transition-colors duration-150 ${
        isDark
          ? 'bg-[#050505]/95 border-zinc-800/80 text-zinc-100'
          : 'bg-[#FAF9F5]/95 border-zinc-200 text-zinc-900'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-display text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
        >
          Soren Lindqvist
        </a>

        {/* Zone 2: 4 concise single-line text navigation links (desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 underline-offset-8 hover:underline ${
              isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Portfolio
          </a>
          <a
            href="#journal"
            onClick={(e) => handleNavClick(e, 'journal')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 underline-offset-8 hover:underline ${
              isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Journal
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 underline-offset-8 hover:underline ${
              isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 underline-offset-8 hover:underline ${
              isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] ${
              isDark
                ? 'bg-[#F2B705] text-zinc-950 hover:bg-[#facc15]'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            Book Commission
          </button>
        </div>
      </div>

      {/* Mobile-Only Unclipped Section Links Strip */}
      <nav
        aria-label="Mobile Navigation"
        className={`flex md:hidden items-center justify-between px-4 py-2.5 border-t text-xs font-medium ${
          isDark
            ? 'border-zinc-900 text-zinc-300 bg-[#050505]'
            : 'border-zinc-200/80 text-zinc-700 bg-[#FAF9F5]'
        }`}
      >
        <a
          href="#portfolio"
          onClick={(e) => handleNavClick(e, 'portfolio')}
          className="py-1 whitespace-nowrap shrink-0 hover:underline underline-offset-4"
        >
          Portfolio
        </a>
        <a
          href="#journal"
          onClick={(e) => handleNavClick(e, 'journal')}
          className="py-1 whitespace-nowrap shrink-0 hover:underline underline-offset-4"
        >
          Journal
        </a>
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, 'about')}
          className="py-1 whitespace-nowrap shrink-0 hover:underline underline-offset-4"
        >
          About
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="py-1 whitespace-nowrap shrink-0 hover:underline underline-offset-4"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};
