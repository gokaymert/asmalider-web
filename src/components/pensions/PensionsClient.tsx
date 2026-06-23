"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Phone, User } from 'lucide-react';
import PensionSlider from '@/components/pensions/PensionSlider';
import ScrollRevealWrapper from '@/components/ui/ScrollRevealWrapper';

type SanityPension = {
  _id: string;
  title?: string;
  ownerName?: string;
  description?: string;
  phone?: string;
  images?: {
    asset?: {
      url: string;
    };
  }[];
};

export default function PensionsClient({ pensions = [] }: { pensions: SanityPension[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(8); // 4 kolon, 2 satır (8 ilan)
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(6); // 3 kolon, 2 satır (6 ilan)
      } else {
        setItemsPerPage(4); // 2 kolon, 2 satır (4 ilan) | 1 kolon, 4 satır (4 ilan)
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(pensions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPensions = pensions.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page === currentPage || isLoading) return;
    setIsLoading(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Parlama efekti */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-100/50 via-blue-50/20 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 pt-8 md:pt-12 pb-12 mb-4">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-gray-500 mb-10 px-2">
            <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <Link href="/asmali/konaklama" className="hover:text-primary transition-colors whitespace-nowrap">Konaklama</Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="font-semibold text-gray-900 whitespace-nowrap">Tüm Pansiyonlar</span>
          </div>

          {/* Başlık */}
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="flex flex-col md:flex-row lg:flex-col items-center justify-center gap-y-1 md:gap-x-3 lg:gap-y-2 font-extrabold tracking-tight mb-4 pb-2 px-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 leading-tight">
              <span className="text-4xl lg:text-7xl">Köyümüzdeki</span>
              <span className="text-4xl lg:text-7xl">Pansiyonlar</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              Köyümüzde evlerini pansiyon olarak misafirlerimize açan köylülerimizin ilanlarını inceleyin, beğendiğiniz yerin sahibiyle doğrudan iletişime geçin.
            </p>
          </div>

          {/* Yatay Çizgi */}
          <div className="w-full h-px bg-slate-200 mt-12"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {pensions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <p className="text-xl md:text-2xl text-slate-700 font-extrabold tracking-tight mb-3">Şu an için güncel ilan bulunmamaktadır.</p>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-6">Pansiyon ilanınızı burada yayınlamak için bizimle iletişime geçebilirsiniz.</p>
            <Link href="/iletisim" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-sm">
              İletişime Geç
            </Link>
          </div>
        ) : (
          <ScrollRevealWrapper trigger={isLoading}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col animate-pulse h-[400px]"
                  >
                    <div className="h-48 w-full bg-slate-200"></div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="h-5 bg-slate-300 rounded w-2/3 mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                    </div>
                  </div>
                ))
              ) : (
                currentPensions.map(pension => {
                  const imageUrls = pension.images?.map(img => img?.asset?.url).filter(Boolean) as string[] || [];
                  const phoneLink = pension.phone ? pension.phone.replace(/\s+/g, '') : '';

                  return (
                    <div key={pension._id} className="scroll-animate-card opacity-0 translate-y-12 bg-white border border-slate-200/80 rounded-[1.5rem] hover:border-primary/40 transition-all duration-500 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 group flex flex-col overflow-hidden">

                      {/* Görsel Slider Alanı */}
                      <div className="relative border-b border-slate-100">
                        <PensionSlider images={imageUrls} />
                      </div>

                      {/* İçerik */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h5 className="text-lg font-extrabold text-slate-800 group-hover:text-primary transition-colors mb-3 line-clamp-1">
                          {pension.title || 'İsimsiz Pansiyon'}
                        </h5>

                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-600">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
                            <User size={12} />
                          </div>
                          {pension.ownerName || 'Bilinmiyor'}
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed mb-4 font-medium flex-grow line-clamp-3">
                          {pension.description || 'Açıklama bulunmuyor.'}
                        </p>

                        {/* Footer CTA */}
                        {pension.phone && (
                          <div className="pt-3 border-t border-slate-100 mt-auto flex justify-end">
                            <a href={`tel:${phoneLink}`} className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors shadow-sm w-fit group-hover:shadow-md group-hover:shadow-emerald-500/20">
                              <Phone size={14} />
                              {pension.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollRevealWrapper>
        )}

        {/* Pagination */}
        {pensions.length > 0 && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
              className="p-2 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Önceki</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  disabled={isLoading}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold cursor-pointer disabled:opacity-70 disabled:cursor-wait transition-all duration-300 ${currentPage === page
                      ? "bg-primary text-white shadow-md scale-105 pointer-events-none"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-primary"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || isLoading}
              className="p-2 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Sonraki</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
