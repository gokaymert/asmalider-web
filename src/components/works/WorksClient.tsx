"use client";

import { useState } from 'react';
import { createPortal } from 'react-dom';
import SanityImage from '@/components/ui/SanityImage';
import { Calendar, X } from 'lucide-react';

import { WorkData } from '@/types';

interface WorksClientProps {
  worksData: WorkData[];
}

export default function WorksClient({ worksData }: WorksClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Fotoğraf sayısına göre grid kapsayıcısının maksimum genişliğini sınırla.
  const getGridClasses = (count: number) => {
    switch (count) {
      case 1:
        return "max-w-[300px] mx-auto grid grid-cols-1 gap-3 mt-8";
      case 2:
        return "max-w-[608px] mx-auto grid grid-cols-2 gap-3 mt-8";
      case 3:
        return "max-w-[920px] mx-auto grid grid-cols-3 gap-2 sm:gap-3 mt-8";
      case 4:
        return "max-w-[608px] mx-auto grid grid-cols-2 gap-3 mt-8";
      case 5:
        return "max-w-[920px] mx-auto grid grid-cols-6 gap-2 sm:gap-3 mt-8";
      default:
        return "max-w-[920px] mx-auto grid grid-cols-3 gap-3 mt-8";
    }
  };

  // Fotoğraf sırasına ve toplam sayıya göre her bir fotoğraf kutusunun kolon yayılımını belirle.
  const getImageClasses = (count: number, idx: number) => {
    if (count === 5) {
      if (idx < 3) {
        return "col-span-2 aspect-video";
      } else if (idx === 3) {
        return "col-start-2 col-span-2 aspect-video";
      } else {
        return "col-start-4 col-span-2 aspect-video";
      }
    }
    return "col-span-1 aspect-video";
  };

  return (
    <>
      <div className="flex flex-col gap-12 md:gap-16 relative z-10">
        {worksData.map((work) => {
          const imageUrls = work.images
            ? work.images.filter(img => img.asset?.url).map(img => img.asset!.url)
            : [];
          const displayImages = imageUrls.slice(0, 5);
          const hasImages = displayImages.length > 0;

          return (
            <div
              key={work._id}
              className="bg-white border border-slate-300 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-sm transition-shadow hover:shadow-md"
            >

              {/* 1- Başlık ve Tarih */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-6 py-5 md:px-10 md:py-[31px] bg-slate-100 border-b border-slate-200">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  {work.title}
                </h3>
                {work.displayDate && (
                  <div className="flex items-center gap-2 text-slate-600 font-medium shrink-0">
                    <Calendar size={18} className="text-(--color-primary)" />
                    <span>{work.displayDate}</span>
                  </div>
                )}
              </div>

              {/* İçerik */}
              <div className="p-6 md:p-10">
                {/* 2- Metin */}
                {work.description && (
                  <p className="text-slate-800 text-lg md:text-xl leading-relaxed font-medium mb-8">
                    {work.description}
                  </p>
                )}

                {/* 3- Fotoğraflar */}
                {hasImages && (
                  <div className={getGridClasses(displayImages.length)}>
                    {displayImages.map((img, idx) => {
                      const imageGridClass = getImageClasses(displayImages.length, idx);

                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveImage(img)}
                          className={`relative w-full rounded-xl overflow-hidden bg-slate-100 ring-1 ring-black/5 shrink-0 cursor-pointer group/img ${imageGridClass}`}
                        >
                          <SanityImage
                            image={img}
                            alt={`Çalışma Görseli ${idx + 1}`}
                            fill
                            className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                              Büyüt
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Lightbox / Overlay (Fotoğrafı büyütüp arka planı bulandırma) */}
      {activeImage && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        >
          {/* Kapat Butonu */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-2 md:p-3 text-white/90 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110 hover:rotate-90"
            aria-label="Kapat"
          >
            <X size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
          </button>

          {/* Görsel */}
          <div className="relative w-full max-w-7xl h-[85vh] px-4 md:px-28 flex flex-col items-center justify-center select-none pt-12 md:pt-0">
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
              <SanityImage
                image={activeImage}
                alt="Büyütülmüş Çalışma Görseli"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
