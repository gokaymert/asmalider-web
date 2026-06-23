"use client";

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Loading from './loading';

const TITLES: Record<string, string> = {
  '/dernegimiz/hakkinda': 'Hakkımızda',
  '/dernegimiz/yonetim': 'Başkan ve Kurullar',
  '/dernegimiz/tuzuk': 'Dernek Tüzüğü',
  '/dernegimiz/uyelik': 'Üyelik İşlemleri',
};

export default function AssociationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = TITLES[pathname as string] || 'Sayfa';
  
  const parentCategory = "Derneğimiz";

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
          <div className="flex-1 flex flex-col items-center justify-center pb-20 md:pb-28 w-full px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight text-center drop-shadow-md leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
      
      {/* İçerik */}
      <div className="max-w-5xl mx-auto -mt-20 md:-mt-28 px-4 sm:px-6 relative z-20">
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 px-5 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 min-h-[500px] relative">
          <Suspense key={pathname} fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
