import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Layers } from 'lucide-react';
import { PortfolioItem } from '../utils/portfolioLogic';

interface LightboxModalProps {
  item: PortfolioItem | null;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onInquirePrint: (item: PortfolioItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
  onInquirePrint,
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 overflow-y-auto"
    >
      {/* Top Bar inside Lightbox */}
      <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-exif">
          <span>
            Plate {currentIndex + 1} of {totalItems}
          </span>
          <span aria-hidden="true">·</span>
          <span>Series: {item.series}</span>
          <span aria-hidden="true">·</span>
          <span>{item.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photograph"
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photograph"
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox viewer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ml-2"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center High-Resolution Media Frame */}
      <div className="max-w-[1360px] w-full mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800/90 overflow-hidden p-2 sm:p-4">
          <img
            src={item.imageUrl}
            alt={item.alt}
            referrerPolicy="no-referrer"
            className="max-h-[68vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Right Inspection & EXIF Dossier Column */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-exif mb-2">
              <span>Archive No. {item.indexNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{item.year}</span>
            </div>

            <h2
              id="lightbox-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
            >
              {item.title}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">{item.caption}</p>

            {/* Optical & EXIF Telemetry Table */}
            <div className="border-t border-b border-zinc-800 py-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F2B705]" />
                  Location
                </span>
                <span className="text-zinc-100 font-medium">{item.location}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400 inline-flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#F2B705]" />
                  Camera Body
                </span>
                <span className="font-mono-exif text-zinc-100">{item.exif.camera}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400">Optics</span>
                <span className="font-mono-exif text-zinc-100">{item.exif.lens}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400">Exposure Settings</span>
                <span className="font-mono-exif text-zinc-100">
                  {item.exif.focalLength} · {item.exif.aperture} · {item.exif.shutterSpeed} · ISO{' '}
                  {item.exif.iso}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400 inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F2B705]" />
                  Medium
                </span>
                <span className="text-zinc-200">{item.exif.filmStockOrSensor}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400">Publication / Client</span>
                <span className="text-zinc-200 text-right">{item.clientOrPublication}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400">Archival Edition</span>
                <span className="text-zinc-200 text-right">{item.editionInfo}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onInquirePrint(item);
                onClose();
              }}
              className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#F2B705] text-zinc-950 hover:bg-[#facc15] transition-colors whitespace-nowrap cursor-pointer"
            >
              Inquire About Archival Print or License
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Keyboard Hint Bar */}
      <div className="max-w-[1360px] w-full mx-auto pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono-exif">
        <span>Use ArrowLeft / ArrowRight keys to navigate plates · Press ESC to exit</span>
        <span>© Soren Lindqvist Studio Archive</span>
      </div>
    </div>
  );
};
