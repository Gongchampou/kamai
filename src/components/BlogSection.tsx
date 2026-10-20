import React, { useState } from 'react';
import { ArrowUpRight, X, BookOpen } from 'lucide-react';
import { BlogPost, filterBlogPosts } from '../utils/portfolioLogic';

interface BlogSectionProps {
  isDark: boolean;
  posts: BlogPost[];
}

const BLOG_CATEGORIES: Array<'All' | BlogPost['category']> = [
  'All',
  'Field Notes',
  'Technical Study',
  'Exhibition',
];

export const BlogSection: React.FC<BlogSectionProps> = ({ isDark, posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogPost['category']>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const visiblePosts = filterBlogPosts(posts, selectedCategory);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className={`py-14 sm:py-20 border-t ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p
              className={`text-xs font-medium tracking-wide mb-2 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              02. Field Journal &amp; Project Dispatches
            </p>
            <h2
              id="journal-heading"
              className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight ${
                isDark ? 'text-zinc-50' : 'text-zinc-950'
              }`}
            >
              Latest Project Updates
            </h2>
          </div>

          {/* Segmented Category Filter */}
          <div
            role="group"
            aria-label="Filter journal entries by topic"
            className={`flex items-center gap-1 p-1 rounded-xl border self-start md:self-auto overflow-x-auto ${
              isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
            }`}
          >
            {BLOG_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-[#F2B705] text-zinc-950 font-semibold'
                        : 'bg-white text-zinc-900 font-semibold shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {cat === 'All' ? 'All Entries' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Journal Entries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className={`group flex flex-col justify-between rounded-2xl border overflow-hidden transition-colors ${
                isDark
                  ? 'border-zinc-800/90 bg-zinc-900/30 hover:border-zinc-700'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div>
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  aria-label={`Read journal article: ${post.title}`}
                  className="relative w-full aspect-16/9 overflow-hidden bg-zinc-900 text-left cursor-pointer block"
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  />
                </button>

                <div className="p-6">
                  {/* Unboxed Metadata (Zero-Pill Rule) */}
                  <div
                    className={`flex flex-wrap items-center gap-1.5 text-xs mb-3 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-exif">{post.readTimeMinutes} min read</span>
                  </div>

                  <h3
                    className={`font-display text-xl font-semibold tracking-tight leading-snug mb-3 ${
                      isDark ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePost(post)}
                      className="text-left hover:underline underline-offset-4 cursor-pointer"
                    >
                      {post.title}
                    </button>
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div
                className={`px-6 py-4 border-t flex items-center justify-between gap-4 text-xs ${
                  isDark ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
                }`}
              >
                <span className="truncate">{post.location}</span>
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className={`inline-flex items-center gap-1 font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                    isDark ? 'text-[#F2B705] hover:underline' : 'text-zinc-900 hover:underline'
                  }`}
                >
                  <span>Read Dispatch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            className={`max-w-3xl w-full rounded-2xl border p-6 sm:p-10 max-h-[90vh] overflow-y-auto ${
              isDark
                ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                : 'bg-[#FAF9F5] border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-800/60">
              <div
                className={`flex flex-wrap items-center gap-2 text-xs ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#F2B705]" />
                <span>{activePost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activePost.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-exif">{activePost.readTimeMinutes} min read</span>
              </div>

              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label="Close article reader"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h2
              id="blog-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-balance"
            >
              {activePost.title}
            </h2>

            <p
              className={`text-xs font-mono-exif mb-6 ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Field Kit: {activePost.cameraSetup}
            </p>

            <div className="rounded-xl overflow-hidden border border-zinc-800/50 mb-8 aspect-16/9 bg-zinc-900">
              <img
                src={activePost.coverImage}
                alt={activePost.coverAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed mb-8">
              {activePost.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={isDark ? 'text-zinc-300' : 'text-zinc-700'}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900/50'
                  : 'border-zinc-200 bg-zinc-100/70'
              }`}
            >
              <h3 className="font-display text-sm font-semibold mb-3">
                Technical &amp; Production Notes
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {activePost.keyTakeaways.map((note, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2.5 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    <span className="font-mono-exif text-[#F2B705]">0{idx + 1}.</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
