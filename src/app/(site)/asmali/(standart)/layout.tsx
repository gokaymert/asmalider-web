"use client";

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Loading from './loading';

const TITLES: Record<string, string> = {
  '/asmali/tarihce': 'Tarihçe',
  '/asmali/ulasim': 'Ulaşım',
  '/asmali/konaklama': 'Konaklama',
};

const BANNER_TITLES: Record<string, string> = {
  '/asmali/tarihce': "Asmalı'nın Tarihçesi",
};

export default function AsmaliStandardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = TITLES[pathname as string] || 'Sayfa';
  const bannerTitle = BANNER_TITLES[pathname as string] || title;
  
  const parentCategory = "Asmalı";

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <div 
        className="h-[350px] md:h-[450px] w-full relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-asmali.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full relative z-10 flex flex-col">
          {/* Breadcrumb */}
          <div className="pt-8 md:pt-10 flex flex-wrap items-center gap-2 text-white/80 text-xs sm:text-sm font-medium w-full">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Ana Sayfa</Link>
            <ChevronRight size={14} className="flex-shrink-0" />
            {parentCategory && (
              <>
                <span className="whitespace-nowrap">{parentCategory}</span>
                <ChevronRight size={14} className="flex-shrink-0" />
              </>
            )}
            <span className="text-white font-bold whitespace-nowrap">{title}</span>
          </div>
          
          {/* Title */}
          <div className="flex-1 flex flex-col items-center justify-center pb-20 md:pb-28">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight text-center drop-shadow-md">
              {bannerTitle}
            </h1>
          </div>
        </div>
      </div>
      
      {/* İçerik */}
      <div className="max-w-5xl mx-auto -mt-20 md:-mt-28 px-4 sm:px-6 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-6 lg:px-10 lg:py-8 min-h-[500px]">
          <Suspense key={pathname} fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
