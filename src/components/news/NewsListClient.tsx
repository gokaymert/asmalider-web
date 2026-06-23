"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import ScrollRevealWrapper from '@/components/ui/ScrollRevealWrapper';
import { urlFor } from "@/sanity/lib/image";
import { Post } from '@/types';

export default function NewsListClient({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Ekran genişliğini dinleyerek dinamik sayfalama ayarı
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(8); // 2 satır x 4 sütun
      } else if (window.innerWidth >= 1024) { // lg
        setItemsPerPage(6); // 2 satır x 3 sütun
      } else {
        setItemsPerPage(4); // 2 satır x 2 sütun (veya 4 satır x 1 sütun)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = posts.slice(startIndex, startIndex + itemsPerPage);

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

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Henüz hiç haber yayınlanmamış.</p>
      </div>
    );
  }

  return (
    <>
      <ScrollRevealWrapper trigger={isLoading}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {currentNews.map((news) => (
            <Link
              key={news._id}
              href={`/haberler/${news.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                {news.mainImage?.asset ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${urlFor(news.mainImage).format('webp').url()}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">Görsel Yok</div>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                  <Calendar size={16} />
                  <time>{new Date(news.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-(--color-primary) transition-colors line-clamp-3 mb-4 leading-snug">
                  {news.title}
                </h3>

                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm font-semibold text-(--color-primary) group-hover:text-(--color-primary)/80 transition-colors flex items-center gap-1">
                    Devamını Oku
                    <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollRevealWrapper>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:border-(--color-primary) hover:text-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                disabled={isLoading}
                className={`w-12 h-12 rounded-xl text-sm font-bold transition-all cursor-pointer ${currentPage === i + 1
                  ? "bg-(--color-primary) text-white shadow-md shadow-blue-500/20 pointer-events-none"
                  : "border border-gray-200 text-gray-600 hover:border-(--color-primary) hover:text-(--color-primary)"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:border-(--color-primary) hover:text-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
