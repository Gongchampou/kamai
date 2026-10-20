/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  PORTFOLIO_ITEMS,
  BLOG_POSTS,
  PhotoCategory,
  PortfolioItem,
  filterPortfolioItems,
  getAdjacentLightboxIndex,
} from './utils/portfolioLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { LightboxModal } from './components/LightboxModal';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sl_portfolio_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aspectFilter, setAspectFilter] = useState<'all' | '16:9' | '4:3' | '3:4'>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [preselectedWorkTitle, setPreselectedWorkTitle] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('sl_portfolio_theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [isDark]);

  const filteredItems = useMemo(
    () => filterPortfolioItems(PORTFOLIO_ITEMS, activeCategory, searchQuery, aspectFilter),
    [activeCategory, searchQuery, aspectFilter]
  );

  // Lightbox navigation list defaults to current filtered list if item is in it, else all items
  const activeLightboxPool = useMemo(() => {
    if (!lightboxItem) return PORTFOLIO_ITEMS;
    const inFiltered = filteredItems.some((i) => i.id === lightboxItem.id);
    return inFiltered && filteredItems.length > 0 ? filteredItems : PORTFOLIO_ITEMS;
  }, [lightboxItem, filteredItems]);

  const currentLightboxIndex = useMemo(() => {
    if (!lightboxItem) return -1;
    return activeLightboxPool.findIndex((i) => i.id === lightboxItem.id);
  }, [lightboxItem, activeLightboxPool]);

  const handleNextLightbox = useCallback(() => {
    if (currentLightboxIndex === -1) return;
    const nextIdx = getAdjacentLightboxIndex(
      currentLightboxIndex,
      activeLightboxPool.length,
      'next'
    );
    if (nextIdx !== -1) {
      setLightboxItem(activeLightboxPool[nextIdx]);
    }
  }, [currentLightboxIndex, activeLightboxPool]);

  const handlePrevLightbox = useCallback(() => {
    if (currentLightboxIndex === -1) return;
    const prevIdx = getAdjacentLightboxIndex(
      currentLightboxIndex,
      activeLightboxPool.length,
      'prev'
    );
    if (prevIdx !== -1) {
      setLightboxItem(activeLightboxPool[prevIdx]);
    }
  }, [currentLightboxIndex, activeLightboxPool]);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleInquirePrint = useCallback((item: PortfolioItem) => {
    setPreselectedWorkTitle(`${item.title} (Plate ${item.indexNumber})`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-150 ${
        isDark ? 'bg-[#050505] text-zinc-100' : 'bg-[#FAF9F5] text-zinc-900'
      }`}
    >
      {/* Strict 3-Zone Top Bar */}
      <Navbar isDark={isDark} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main>
        <HeroSection
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          featuredItem={PORTFOLIO_ITEMS[0]}
          onOpenLightbox={(item) => setLightboxItem(item)}
          onNavigate={handleNavigate}
        />

        <PortfolioGallery
          isDark={isDark}
          allItems={PORTFOLIO_ITEMS}
          filteredItems={filteredItems}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          aspectFilter={aspectFilter}
          onAspectFilterChange={setAspectFilter}
          onOpenLightbox={(item) => setLightboxItem(item)}
          onInquirePrint={handleInquirePrint}
        />

        <BlogSection isDark={isDark} posts={BLOG_POSTS} />

        <AboutSection isDark={isDark} />

        <ContactSection
          isDark={isDark}
          preselectedWorkTitle={preselectedWorkTitle}
          onClearPreselectedWork={() => setPreselectedWorkTitle(null)}
        />
      </main>

      <Footer isDark={isDark} onNavigate={handleNavigate} />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        currentIndex={currentLightboxIndex}
        totalItems={activeLightboxPool.length}
        onClose={() => setLightboxItem(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
        onInquirePrint={handleInquirePrint}
      />
    </div>
  );
}
