import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import WorksClient from '@/components/works/WorksClient';
import { sanityFetch } from '@/sanity/lib/live';
import { worksQuery } from '@/sanity/lib/queries';
import { WorkData } from '@/types';

export const metadata = {
  title: 'Çalışmalarımız',
  description: 'Asmalı Köyü için gerçekleştirdiğimiz projeler ve dernek çalışmalarımız.',
};

// Dinamik içerik yükleyici
async function WorksContentLoader() {
  const { data: worksData } = await sanityFetch({ query: worksQuery });

  return <WorksClient worksData={(worksData as WorkData[]) || []} />;
}

// Skeleton Yer Tutucusu
function WorksListSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white border border-slate-300 rounded-2xl p-6 md:p-10 shadow-sm space-y-6"
        >
          <div className="space-y-4">
            {/* Tarih Yer Tutucusu */}
            <div className="h-6 bg-slate-200 rounded-lg w-1/4 mb-6"></div>

            {/* Metin Satırları Yer Tutucusu */}
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
          </div>

          {/* İskelet Detay Satırları */}
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-4 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CalismalarPage() {
  const title = "Çalışmalarımız";

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
          <div className="pt-8 md:pt-10 flex items-center gap-2 text-white/80 text-sm font-medium w-full">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <span className="text-white font-bold">{title}</span>
          </div>

          {/* Title */}
          <div className="flex-1 flex flex-col items-center justify-center pb-20 md:pb-28">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight text-center drop-shadow-md">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* İçerik Konteyneri */}
      <div className="max-w-5xl mx-auto -mt-16 md:-mt-24 px-4 sm:px-6 relative z-20 min-h-[500px]">
        <Suspense fallback={<WorksListSkeleton />}>
          <WorksContentLoader />
        </Suspense>
      </div>
    </main>
  );
}
