import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`py-14 sm:py-20 border-t ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Artist Statement & Philosophy */}
          <div className="lg:col-span-6 space-y-5">
            <p
              className={`text-xs font-medium tracking-wide ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              03. Practice &amp; Archival Methodology
            </p>

            <h2
              id="about-heading"
              className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance ${
                isDark ? 'text-zinc-50' : 'text-zinc-950'
              }`}
            >
              Committed to unhurried optical craft and physical print permanence.
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Working between Copenhagen and Oslo, Soren Lindqvist collaborates with architectural
              practices, cultural foundations, and monograph publishers worldwide. Trained in
              large-format architectural photography at the Royal Danish Academy, his practice
              centers on how structures weather and inhabit extreme northern climates.
            </p>

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Every photograph in this archive is strictly human-generated—captured on location
              using medium-format digital backs or dedicated monochrome rangefinders, and printed in
              our Copenhagen darkroom on museum-grade cotton rag and silver baryta papers.
            </p>

            {/* Social Media & Portfolio Links */}
            <div className="pt-4">
              <p
                className={`text-xs font-medium mb-3 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Direct Channels &amp; Visual Feeds
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 underline-offset-4 hover:underline whitespace-nowrap ${
                    isDark ? 'text-zinc-200 hover:text-[#F2B705]' : 'text-zinc-800 hover:text-black'
                  }`}
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true" className="text-zinc-500">
                  ·
                </span>
                <a
                  href="https://glass.photo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 underline-offset-4 hover:underline whitespace-nowrap ${
                    isDark ? 'text-zinc-200 hover:text-[#F2B705]' : 'text-zinc-800 hover:text-black'
                  }`}
                >
                  <span>Glass Photo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true" className="text-zinc-500">
                  ·
                </span>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 underline-offset-4 hover:underline whitespace-nowrap ${
                    isDark ? 'text-zinc-200 hover:text-[#F2B705]' : 'text-zinc-800 hover:text-black'
                  }`}
                >
                  <span>Behance Monograph</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true" className="text-zinc-500">
                  ·
                </span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 underline-offset-4 hover:underline whitespace-nowrap ${
                    isDark ? 'text-zinc-200 hover:text-[#F2B705]' : 'text-zinc-800 hover:text-black'
                  }`}
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Exhibitions & Primary Optical Kit */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className={`rounded-2xl border p-6 ${
                isDark ? 'border-zinc-800/90 bg-zinc-900/30' : 'border-zinc-200 bg-white'
              }`}
            >
              <h3
                className={`font-display text-base font-semibold mb-4 ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                Selected Exhibitions
              </h3>
              <ul className="space-y-4 text-xs leading-relaxed">
                <li>
                  <p className="font-mono-exif text-[#F2B705]">2026 · Kunsthall Oslo</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    North of Seventy-Eight Degrees (Solo)
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">2025 · Danish Architecture Center</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Monolith &amp; Coastline: Contemporary Nordic Concrete
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">2024 · Fotomuseum Winterthur</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    New Topographics of the High Arctic
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">2023 · Tokyo Photographic Art Museum</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Timber, Rain &amp; Shadow: Kyoto Architectural Studies
                  </p>
                </li>
              </ul>
            </div>

            <div
              className={`rounded-2xl border p-6 ${
                isDark ? 'border-zinc-800/90 bg-zinc-900/30' : 'border-zinc-200 bg-white'
              }`}
            >
              <h3
                className={`font-display text-base font-semibold mb-4 ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                Optical &amp; Archival Kit
              </h3>
              <ul className="space-y-4 text-xs leading-relaxed">
                <li>
                  <p className="font-mono-exif text-zinc-500">Medium Format Digital</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Hasselblad X2D 100C · XCD 38V, 45P, 55V, 90V
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">True Monochrome Rangefinder</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Leica M11 Monochrom · APO-Summicron 35mm &amp; 50mm
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">Perspective Control</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Arca-Swiss Rm3di Technical Camera · Rodenstock 32mm HR
                  </p>
                </li>
                <li>
                  <p className="font-mono-exif text-zinc-500">Archival Print Finishing</p>
                  <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Hahnemühle Photo Rag Baryta 315g &amp; Silver Gelatin Fiber
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
