'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 px-6 py-24">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">

          {/* Başlıklar */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-4">
            Sistemsel Bir Sorun Oluştu
          </h2>

          {/* Açıklama */}
          <p className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed">
            İşleminizi gerçekleştirirken beklenmeyen bir sorunla karşılaştık. Lütfen sayfayı yenilemeyi deneyin.
          </p>

          {/* Buton */}
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary)]/90 hover:scale-105 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <RefreshCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500" />
            <span>Tekrar Dene</span>
          </button>

        </div>
      </main>
      <Footer />
    </>
  );
}
