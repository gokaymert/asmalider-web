"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/types';

export default function Announcements({ data }: { data?: Post[] }) {
  const SLIDES = data || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === SLIDES.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? SLIDES.length - 1 : prevIndex - 1));
  };

  // Otomatik geçiş
  useEffect(() => {
    if (SLIDES.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  if (SLIDES.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-(--color-light) flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-sm font-bold tracking-widest text-(--color-primary) uppercase mb-3">Haberler & Etkinlikler</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">Güncel Duyurular</h3>
        </div>

        {/* Slider Konteyner */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group bg-gray-900">

          {/* Slaytlar */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-[450px] sm:h-[550px]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide._id} className="min-w-full h-full relative">

                {/* Arka Plan Görseli & Karartma */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${slide.mainImage?.asset ? urlFor(slide.mainImage).url() : ''}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* İçerik */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-(--color-primary) text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      Duyuru
                    </span>
                    <div className="flex items-center gap-1.5 text-sm text-gray-200 font-medium drop-shadow-md">
                      <Calendar size={16} />
                      <time dateTime={slide.publishedAt}>{slide.publishedAt ? new Date(slide.publishedAt).toLocaleDateString('tr-TR') : ''}</time>
                    </div>
                  </div>

                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg max-w-3xl leading-tight">
                    {slide.title}
                  </h4>

                  <div>
                    <Link
                      href={`/haberler/${slide.slug}`}
                      className="inline-flex items-center gap-2 text-base font-bold text-white hover:text-(--color-secondary) transition-colors group/link"
                    >
                      Haberi Oku
                      <ArrowRight size={20} className="transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sol/Sağ Oklar */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-(--color-primary) transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
            aria-label="Önceki"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-(--color-primary) transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
            aria-label="Sonraki"
          >
            <ArrowRight size={24} />
          </button>

          {/* Alt Noktalar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white"
                  }`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
