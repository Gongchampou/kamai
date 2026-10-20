import React from 'react';
import { Sun, Moon, ArrowUpRight, Maximize2 } from 'lucide-react';
import { PortfolioItem } from '../utils/portfolioLogic';

interface HeroSectionProps {
  isDark: boolean;
  onToggleTheme: () => void;
  featuredItem: PortfolioItem;
  onOpenLightbox: (item: PortfolioItem) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  onToggleTheme,
  featuredItem,
  onOpenLightbox,
  onNavigate,
}) => {
  return (
    <section id="top" className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16">
      {/* Workspace Utility Strip below the Top Bar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b text-xs ${
          isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-200 text-zinc-600'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span>Copenhagen &amp; Oslo Studio</span>
          <span aria-hidden="true">·</span>
          <span>Architectural, Editorial &amp; High-Latitude Monograph Archive</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-exif">55.6761° N, 12.5683° E</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Paper Mode' : 'Switch to Darkroom Mode'}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isDark
                ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800'
                : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-100'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F2B705]" />
                <span>Light Paper Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-zinc-700" />
                <span>Darkroom Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Split-Screen Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Typographic Hierarchy */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <p
              className={`text-xs font-medium tracking-wide mb-4 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Selected Works 2019–2026 · Medium Format &amp; Silver Gelatin
            </p>

            <h1
              className={`font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.08] mb-6 text-balance ${
                isDark ? 'text-zinc-50' : 'text-zinc-950'
              }`}
            >
              Quiet geometry in Nordic stone, timber, and polar light.
            </h1>

            <p
              className={`text-base leading-relaxed mb-8 max-w-[60ch] ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Soren Lindqvist is an architectural and fine-art landscape photographer documenting
              monolithic structures, coastal concrete, and high-latitude landforms across
              Scandinavia, Japan, and the North Atlantic. Every image is captured optically on
              medium-format digital and monochrome film without synthetic manipulation.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'bg-[#F2B705] text-zinc-950 hover:bg-[#facc15]'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('journal')}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700'
                    : 'border-zinc-300 text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                <span>Read Field Journal</span>
              </button>
            </div>

            <div
              className={`pt-4 border-t text-xs ${
                isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-200 text-zinc-600'
              }`}
            >
              <span>Current Exhibition: </span>
              <strong className={isDark ? 'text-zinc-200 font-medium' : 'text-zinc-900 font-medium'}>
                North of Seventy-Eight Degrees
              </strong>
              <span> · Kunsthall Oslo · Nov 2026 – Jan 2027</span>
            </div>
          </div>
        </div>

        {/* Right Column: Matching Height Featured Visual Plate */}
        <div className="lg:col-span-7 flex flex-col">
          <button
            type="button"
            onClick={() => onOpenLightbox(featuredItem)}
            aria-label={`Inspect featured plate: ${featuredItem.title} in fullscreen lightbox`}
            className={`group relative w-full h-full min-h-[320px] sm:min-h-[440px] rounded-2xl overflow-hidden border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705] ${
              isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-100'
            }`}
          >
            <img
              src={featuredItem.imageUrl}
              alt={featuredItem.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]"
            />

            {/* Measured Contrast Scrim for Media Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300 font-mono-exif mb-1.5">
                    <span>Plate {featuredItem.indexNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredItem.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredItem.exif.camera}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {featuredItem.exif.focalLength} at {featuredItem.exif.aperture}
                    </span>
                  </div>
                  <h2 className="font-serif-editorial italic text-2xl sm:text-3xl text-white font-medium">
                    {featuredItem.title}
                  </h2>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-xs text-white text-xs font-medium whitespace-nowrap shrink-0 group-hover:bg-[#F2B705] group-hover:text-zinc-950 transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Plate</span>
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Full-Width 4-Column Archive Metrics Row Below Split */}
      <div
        className={`mt-10 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}
      >
        <div>
          <p
            className={`font-mono-exif text-2xl sm:text-3xl font-semibold tracking-tight ${
              isDark ? 'text-[#F2B705]' : 'text-amber-700'
            }`}
          >
            14 Years
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Architectural &amp; High-Latitude Field Documentation (2012–2026)
          </p>
        </div>

        <div>
          <p
            className={`font-mono-exif text-2xl sm:text-3xl font-semibold tracking-tight ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            48 Commissions
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Completed for Nordic Cultural Institutions &amp; Architectural Studios
          </p>
        </div>

        <div>
          <p
            className={`font-mono-exif text-2xl sm:text-3xl font-semibold tracking-tight ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            100% Optical
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Human-Crafted Exposures on Medium Format CMOS &amp; Silver Gelatin Film
          </p>
        </div>

        <div>
          <p
            className={`font-mono-exif text-2xl sm:text-3xl font-semibold tracking-tight ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            9 Solo Shows
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Exhibited in Copenhagen, Oslo, Zürich, Tokyo &amp; Reykjavík
          </p>
        </div>
      </div>
    </section>
  );
};
