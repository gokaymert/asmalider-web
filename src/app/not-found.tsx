import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 px-6 py-24">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">
          {/* Başlıklar */}
          <h1 className="text-7xl md:text-9xl font-black text-slate-200 tracking-tighter mb-4 select-none">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-4">
            Sayfa Bulunamadı
          </h2>
          
          {/* Açıklama */}
          <p className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed">
            Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak erişilemiyor olabilir.
          </p>

          {/* Buton */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary)]/90 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
          >
            <span>Ana Sayfaya Dön</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
