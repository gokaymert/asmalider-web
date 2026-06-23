"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowDown, Loader2 } from 'lucide-react';

type SanityPhoto = {
  image?: {
    asset?: {
      url: string;
    };
  };
};

export default function GalleryClient({ photos }: { photos: SanityPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Spinner'ı gecikmeli gösterme
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isImageLoading) {
      // Eğer resim 150ms içinde yüklenmezse spinner'ı göster
      timer = setTimeout(() => setShowSpinner(true), 150);
    } else {
      setShowSpinner(false);
    }
    return () => clearTimeout(timer);
  }, [isImageLoading]);

  // Hero Animasyon State'i
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    // Sayfa yüklendikten 100ms sonra hero animasyonunu tetikle
    const heroTimer = setTimeout(() => setIsHeroLoaded(true), 100);

    // 3.5 saniye sonra galeri gridine kaydır
    const scrollTimer = setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 3500);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Geçerli resimleri filtrele
  const validPhotos = photos?.filter(p => p?.image?.asset?.url) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [validPhotos]);

  const changeImage = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setIsImageLoading(true);
      setLightboxIndex(newIndex);
      setIsFading(false);
    }, 250);
  };

  const handlePrev = (e?: React.MouseEvent | Event) => {
    if (e && 'stopPropagation' in e) (e as React.MouseEvent).stopPropagation();
    if (lightboxIndex !== null && !isFading) {
      changeImage(lightboxIndex > 0 ? lightboxIndex - 1 : validPhotos.length - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent | Event) => {
    if (e && 'stopPropagation' in e) (e as React.MouseEvent).stopPropagation();
    if (lightboxIndex !== null && !isFading) {
      changeImage(lightboxIndex < validPhotos.length - 1 ? lightboxIndex + 1 : 0);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || isFading) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') changeImage(lightboxIndex > 0 ? lightboxIndex - 1 : validPhotos.length - 1);
      if (e.key === 'ArrowRight') changeImage(lightboxIndex < validPhotos.length - 1 ? lightboxIndex + 1 : 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, isFading, validPhotos.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen bg-slate-950 w-full overflow-hidden">

      {/* Sinematik Karşılama */}
      <section className="relative w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">

        <div className={`absolute inset-0 z-0 transition-opacity duration-2000 ease-in-out ${isHeroLoaded ? 'opacity-50' : 'opacity-0'}`}>
          <Image
            src="/images/bg-asmali.jpg"
            alt="Hero Background"
            fill
            className="object-cover blur-[2px] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ease-out transform ${isHeroLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-sm mb-4 block drop-shadow-md">
            Marmara Adası
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tighter drop-shadow-2xl">
            Asmalı Köyü <br /> Galerisi
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full opacity-80"></div>
        </div>

        <div
          className={`absolute bottom-12 z-10 cursor-pointer transition-all duration-1000 delay-700 ${isHeroLoaded ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
          title="Galeriye İn"
        >
          <ArrowDown size={36} className="text-white drop-shadow-lg animate-bounce" />
        </div>
      </section>

      {/* Çerçevesiz Grid */}
      <section ref={gridRef} className="w-full bg-slate-950 min-h-screen py-24 md:py-32 px-6 sm:px-8 md:px-16 lg:px-32">
        {validPhotos.length === 0 ? null : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {validPhotos.map((img, index) => {
              const isPortrait = index % 3 === 1;
              const aspectClass = isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]';
              const originalUrl = img.image!.asset!.url;
              const gridUrl = `${originalUrl}?w=800&fm=webp&q=80`;

              return (
                <div
                  key={index}
                  className="scroll-animate opacity-0 translate-y-12 transition-all duration-700 ease-out break-inside-avoid relative cursor-pointer group"
                  onClick={() => {
                    setIsImageLoading(true);
                    setLightboxIndex(index);
                  }}
                  style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                >
                  <div className={`relative w-full overflow-hidden rounded-lg transition-all duration-500 ${aspectClass}`}>
                    <Image
                      src={gridUrl}
                      alt="Asmalı Köyü"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && validPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndHandler}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-8 right-6 md:top-8 md:right-8 z-50 p-2 md:p-3 text-white/90 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110 hover:rotate-90"
            aria-label="Kapat"
          >
            <X size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
          </button>

          <button
            onClick={handlePrev}
            className="hidden md:block absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 text-white/90 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110 hover:-translate-x-1"
            aria-label="Önceki"
          >
            <ChevronLeft size={32} className="md:w-10 md:h-10" strokeWidth={1.5} />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:block absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 text-white/90 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full transition-all duration-300 focus:outline-none cursor-pointer hover:scale-110 hover:translate-x-1"
            aria-label="Sonraki"
          >
            <ChevronRight size={32} className="md:w-10 md:h-10" strokeWidth={1.5} />
          </button>

          <div className="relative w-full max-w-7xl h-[85vh] md:h-[90vh] px-0 md:px-28 flex flex-col items-center justify-center select-none pt-12 md:pt-0">
            {showSpinner && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-white animate-spin opacity-80" />
              </div>
            )}
            <Image
              src={`${validPhotos[lightboxIndex].image!.asset!.url}?w=1920&fm=webp&q=80`}
              alt="Büyütülmüş Görsel"
              width={1920}
              height={1080}
              className={`w-auto h-auto max-w-full max-h-[85vh] object-contain transition-all duration-300 ease-out ${isFading || isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              priority
              onLoad={() => setIsImageLoading(false)}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Preload Next Image */}
            {validPhotos.length > 1 && (
              <link
                rel="preload"
                as="image"
                href={`${validPhotos[(lightboxIndex + 1) % validPhotos.length].image!.asset!.url}?w=1920&fm=webp&q=80`}
              />
            )}

            {/* Preload Prev Image */}
            {validPhotos.length > 1 && (
              <link
                rel="preload"
                as="image"
                href={`${validPhotos[(lightboxIndex > 0 ? lightboxIndex - 1 : validPhotos.length - 1)].image!.asset!.url}?w=1920&fm=webp&q=80`}
              />
            )}
          </div>
        </div>
      )}

    </main>
  );
}
