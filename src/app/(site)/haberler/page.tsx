import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NewsListClient from '@/components/news/NewsListClient';
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Haberler",
    template: "%s | Asmalı Derneği"
  },
};

export default async function AllNewsPage() {
  // Sanity'den tüm haberleri çekiyoruz
  const posts = await client.fetch(allPostsQuery);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Parlama Efekti */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-100/50 via-blue-50/20 to-transparent pointer-events-none"></div>

      {/* Header Alanı */}
      <div className="relative z-10 pt-8 md:pt-12 pb-10 mb-8 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10 px-2">
          <Link href="/" className="hover:text-(--color-primary) transition-colors">Ana Sayfa</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gray-900">Haberler ve Duyurular</span>
        </div>

        {/* Başlık */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="flex flex-col md:flex-row lg:flex-col items-center justify-center gap-y-1 md:gap-x-3 lg:gap-y-2 font-extrabold tracking-tight mb-4 pb-2 px-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 leading-tight">
            <span className="text-4xl lg:text-7xl">Haberler ve</span>
            <span className="text-4xl lg:text-7xl">Duyurular</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
            Marmara Adası Asmalı Köyü&apos;ne ait tüm güncel haberleri, etkinlikleri ve önemli duyuruları burada bulabilirsiniz.
          </p>
        </div>
      </div>

      {/* Grid ve Pagination */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsListClient posts={posts} />
      </div>
    </main>
  );
}
