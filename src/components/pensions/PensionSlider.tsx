"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import SanityImage from '@/components/ui/SanityImage';

export default function PensionSlider({ images = [] }: { images?: string[] }) {
  const displayImages = images.length > 0 ? images : Array.from({ length: 3 }, (_, i) => i + 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-40 sm:h-48 group overflow-hidden bg-slate-100 rounded-t-[1.5rem]">
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {displayImages.map((img, idx) => (
          <div key={idx} className="min-w-full h-full flex items-center justify-center bg-slate-100 relative">
             {typeof img === 'string' ? (
                <SanityImage image={img} alt={`Fotoğraf ${idx + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
             ) : (
                <>
                   <div className="absolute inset-0 flex items-center justify-center opacity-40 bg-gradient-to-br from-slate-50 to-slate-200">
                      <Home size={64} strokeWidth={1} className="text-slate-400" />
                   </div>
                   <span className="relative z-10 text-slate-500 font-bold text-xs bg-white/60 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm border border-slate-200/50">
                     Fotoğraf {img}
                   </span>
                </>
             )}
          </div>
        ))}
      </div>
      
      {/* Controls */}
      {displayImages.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110 z-20 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110 z-20 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
          {displayImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${currentIndex === idx ? 'w-4 bg-primary' : 'w-1.5 bg-white/80 backdrop-blur-sm'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
