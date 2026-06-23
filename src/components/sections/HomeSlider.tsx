"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { urlFor } from "@/sanity/lib/image";
import { Post } from '@/types';

export default function HomeSlider({ posts = [] }: { posts?: Post[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slides = posts.slice(0, 5); // İlk 5 haberi slaytta göster

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-900"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Görsel */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.mainImage?.asset ? urlFor(slide.mainImage).format('webp').url() : ''}')` }}
          />
          {/* Karartma */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* İçerik */}
          <div className="absolute inset-0 flex items-end justify-center md:justify-start pb-20 md:pb-24 px-4 sm:px-12 lg:px-24">
            <Link href={`/haberler/${slide.slug}`} className="group max-w-4xl block text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-gray-200 transition-colors leading-tight">
                {slide.title}
              </h2>
              <span className="inline-flex items-center border border-white/50 text-white px-6 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                Detay &rarr;
              </span>
            </Link>
          </div>
        </div>
      ))}

      {/* Kontroller */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/30 transition-colors opacity-0 hover:opacity-100 md:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/30 transition-colors opacity-0 hover:opacity-100 md:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 transition-all rounded-full ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Slayt ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
