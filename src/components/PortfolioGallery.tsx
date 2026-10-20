import React from 'react';
import { Search, Maximize2, X } from 'lucide-react';
import {
  PhotoCategory,
  PortfolioItem,
  getCategoryCounts,
} from '../utils/portfolioLogic';

interface PortfolioGalleryProps {
  isDark: boolean;
  allItems: PortfolioItem[];
  filteredItems: PortfolioItem[];
  activeCategory: PhotoCategory;
  onSelectCategory: (cat: PhotoCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  aspectFilter: 'all' | '16:9' | '4:3' | '3:4';
  onAspectFilterChange: (aspect: 'all' | '16:9' | '4:3' | '3:4') => void;
  onOpenLightbox: (item: PortfolioItem) => void;
  onInquirePrint: (item: PortfolioItem) => void;
}

const CATEGORIES: PhotoCategory[] = [
  'All',
  'Architecture',
  'Monochrome',
  'Landscapes',
  'Editorial',
];

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  isDark,
  allItems,
  filteredItems,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  aspectFilter,
  onAspectFilterChange,
  onOpenLightbox,
  onInquirePrint,
}) => {
  const counts = getCategoryCounts(allItems);

  const handleResetFilters = () => {
    onSelectCategory('All');
    onSearchChange('');
    onAspectFilterChange('all');
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={`py-14 sm:py-20 border-t ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p
              className={`text-xs font-medium tracking-wide mb-2 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              01. Curated Monograph Archive
            </p>
            <h2
              id="portfolio-heading"
              className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight ${
                isDark ? 'text-zinc-50' : 'text-zinc-950'
              }`}
            >
              Selected Photographic Plates
            </h2>
          </div>

          <p
            className={`text-sm max-w-md ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Select any plate to launch the high-resolution lightbox viewer with full optical EXIF
            telemetry and archival edition notes.
          </p>
        </div>

        {/* Interactive Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Segmented Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter portfolio by category"
            className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto ${
              isDark
                ? 'bg-zinc-900/90 border-zinc-800'
                : 'bg-zinc-100 border-zinc-200'
            }`}
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#F2B705] text-zinc-950 font-semibold shadow-xs'
                        : 'bg-white text-zinc-950 font-semibold shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <span>{category === 'All' ? 'All Works' : category}</span>
                  <span
                    className={`ml-1.5 font-mono-exif text-[11px] ${
                      isActive
                        ? isDark
                          ? 'text-zinc-900'
                          : 'text-zinc-600'
                        : 'opacity-70'
                    }`}
                  >
                    ({counts[category]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Aspect Ratio Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Aspect Filter Segmented Control */}
            <div
              role="group"
              aria-label="Filter by plate format"
              className={`flex items-center gap-1 p-1 rounded-xl border ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800'
                  : 'bg-zinc-100 border-zinc-200'
              }`}
            >
              {(['all', '16:9', '4:3', '3:4'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => onAspectFilterChange(ratio)}
                  aria-pressed={aspectFilter === ratio}
                  className={`px-2.5 py-1.5 text-xs font-mono-exif rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    aspectFilter === ratio
                      ? isDark
                        ? 'bg-zinc-800 text-zinc-100 font-medium'
                        : 'bg-white text-zinc-900 font-medium shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-200'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {ratio === 'all' ? 'All Formats' : ratio}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <label htmlFor="portfolio-search" className="sr-only">
                Search works by title, location, or camera
              </label>
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              />
              <input
                id="portfolio-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search title, city, Leica..."
                className={`w-full pl-9 pr-8 py-2 text-xs rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                  isDark
                    ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-500'
                    : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div
            className={`rounded-2xl border p-12 text-center ${
              isDark
                ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700'
            }`}
          >
            <p className="font-display text-lg font-medium mb-2">
              No photographic plates match your current filter criteria.
            </p>
            <p className="text-xs text-zinc-500 mb-6">
              Try clearing your search term or switching back to all archive categories.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#F2B705] text-zinc-950 hover:bg-[#facc15]'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              Reset Gallery Filters
            </button>
          </div>
        ) : (
          /* Media-First Bento & Masonry Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isWideBento =
                item.featuredSpan &&
                activeCategory === 'All' &&
                !searchQuery &&
                aspectFilter === 'all';

              return (
                <article
                  key={item.id}
                  className={`group flex flex-col justify-between rounded-2xl border overflow-hidden transition-colors ${
                    isWideBento ? 'md:col-span-2' : 'col-span-1'
                  } ${
                    isDark
                      ? 'border-zinc-800/90 bg-zinc-900/40 hover:border-zinc-700'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  {/* Clickable Image Container for Lightbox */}
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(item)}
                    aria-label={`Open ${item.title} in fullscreen lightbox`}
                    className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-zinc-900 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F2B705]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-between p-4">
                      <span className="text-xs font-mono-exif text-zinc-200">
                        {item.exif.camera} · {item.exif.focalLength} · {item.exif.aperture} ·{' '}
                        {item.exif.shutterSpeed}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 text-zinc-950 text-xs font-medium whitespace-nowrap shrink-0">
                        <Maximize2 className="w-3 h-3" />
                        <span>Lightbox</span>
                      </span>
                    </div>
                  </button>

                  {/* Unboxed Minimalist Metadata Footer (Zero-Pill Discipline) */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <div
                        className={`flex flex-wrap items-center gap-1.5 text-xs mb-1.5 ${
                          isDark ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        <span className="font-mono-exif">Plate {item.indexNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-exif">{item.year}</span>
                      </div>

                      <h3
                        className={`font-display text-lg font-semibold tracking-tight mb-1.5 ${
                          isDark ? 'text-zinc-100' : 'text-zinc-900'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenLightbox(item)}
                          className="text-left hover:underline underline-offset-4 cursor-pointer"
                        >
                          {item.title}
                        </button>
                      </h3>

                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                      >
                        {item.caption}
                      </p>
                    </div>

                    <div
                      className={`pt-3 border-t flex items-center justify-between gap-2 text-xs ${
                        isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
                      }`}
                    >
                      <span className="font-mono-exif truncate">
                        {item.exif.focalLength} / {item.exif.aperture} / ISO {item.exif.iso}
                      </span>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => onInquirePrint(item)}
                          className={`font-medium underline-offset-4 hover:underline whitespace-nowrap cursor-pointer ${
                            isDark
                              ? 'text-zinc-300 hover:text-[#F2B705]'
                              : 'text-zinc-700 hover:text-zinc-950'
                          }`}
                        >
                          Inquire Print
                        </button>
                        <span aria-hidden="true">·</span>
                        <button
                          type="button"
                          onClick={() => onOpenLightbox(item)}
                          className={`font-semibold whitespace-nowrap cursor-pointer ${
                            isDark
                              ? 'text-[#F2B705] hover:underline'
                              : 'text-zinc-900 hover:underline'
                          }`}
                        >
                          View Plate
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
