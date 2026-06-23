"use client";

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { urlFor } from "@/sanity/lib/image";
import { Post } from '@/types';

export default function NewsGrid({ posts = [] }: { posts?: Post[] }) {
  // DRY Hook
  useScrollReveal();

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 8); // Ana sayfada maksimum 8 haber göster

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık */}
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-(--color-primary) pl-4">
            Güncel Haberler ve Duyurular
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayPosts.map((news, index) => {
            let displayClass = "flex";
            if (index >= 4 && index < 6) {
              displayClass = "hidden lg:flex"; // md/sm'de gizle (toplam 4), lg/xl'de göster
            } else if (index >= 6) {
              displayClass = "hidden xl:flex"; // lg/md/sm'de gizle (toplam 6), sadece xl'de göster (toplam 8)
            }

            return (
              <Link
                key={news._id}
                href={`/haberler/${news.slug}`}
                className={`scroll-animate-card opacity-0 translate-y-12 group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-700 ease-out overflow-hidden ${displayClass} flex-col border border-gray-200`}
              >
                {/* Resim ve Kategori */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {news.mainImage?.asset ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${urlFor(news.mainImage).format('webp').url()}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Görsel Yok</div>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-medium">
                    <Calendar size={14} />
                    <time>{new Date(news.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-(--color-primary) transition-colors line-clamp-3 leading-snug">
                    {news.title}
                  </h3>
                  <div className="mt-auto pt-4 flex justify-end">
                    <span className="text-sm italic text-gray-500 group-hover:text-(--color-primary) transition-colors flex items-center gap-1">
                      Haberi oku <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tümünü Gör Butonu */}
        {posts.length >= 8 && (
          <div className="mt-12 text-center">
            <Link
              href="/haberler"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-xl text-white bg-(--color-primary) hover:bg-(--color-primary)/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Tüm Haber ve Duyuruları Gör
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
