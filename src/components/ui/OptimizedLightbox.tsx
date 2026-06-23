"use client";

import { useEffect, useState, useCallback } from 'react';
import SanityImage from '@/components/ui/SanityImage';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryImage = {
  id: number;
  title: string;
  url: string;
  aspectRatio: string;
};

interface OptimizedLightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function OptimizedLightbox({ images, initialIndex, onClose }: OptimizedLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Klavye Kontrolleri
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrevious, handleNext]);

  // Arka plan kaydırmayı engelle
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Dokunmatik Ekran (Swipe) Kontrolleri
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Kaydırma hassasiyeti

    if (distance > minSwipeDistance) handleNext(); // Sola kaydırma -> Sonraki
    if (distance < -minSwipeDistance) handlePrevious(); // Sağa kaydırma -> Önceki

    setTouchStart(null);
  };

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Kapat Butonu */}
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 md:right-8 md:top-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Kapat"
      >
        <X size={24} />
      </button>

      {/* Navigasyon Okları (Desktop) */}
      <button 
        onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 text-white hover:bg-black/90 hover:scale-110 transition-all border border-white/10 hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Önceki Görsel"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 text-white hover:bg-black/90 hover:scale-110 transition-all border border-white/10 hidden md:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Sonraki Görsel"
      >
        <ChevronRight size={32} />
      </button>

      {/* Görsel Container */}
      <div 
        className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4 md:p-12 flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()} // Resme tıklandığında modalı kapatmayı engeller
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <SanityImage 
            key={currentImage.id}
            image={currentImage.url} 
            alt={currentImage.title}
            fill
            sizes="100vw"
            className="object-contain drop-shadow-2xl transition-opacity duration-300"
            priority
          />
        </div>
        
        {/* Fotoğraf İsimliği ve Sayaç */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="px-8 py-2.5 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-center shadow-xl">
            <h4 className="text-lg md:text-xl font-bold text-white tracking-wide whitespace-nowrap">{currentImage.title}</h4>
          </div>
          <span className="text-white/70 text-sm font-semibold tracking-widest bg-black/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
