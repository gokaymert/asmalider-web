import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/lib/live';
import { tarihceQuery } from '@/sanity/lib/queries';
import { TarihceData } from '@/types';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asmalı Tarihçesi',
  description: 'Asmalı Köyü\'nün köklü tarihi ve geçmişten bugüne kültürel mirası hakkında bilgiler.',
};

interface InlineImage {
  url?: string;
  alt?: string;
}

export default async function AsmaliTarihcePage() {
  // Sanity'den güncel veriyi çekiyoruz
  const { data } = await sanityFetch({ query: tarihceQuery }) as { data: TarihceData };

  // Eğer Sanity üzerinde içerik henüz oluşturulmamışsa boş sayfa döner
  if (!data || !data.content) {
    return null;
  }

  // Custom PortableText bileşen ayarları
  const components = {
    types: {
      image: ({ value }: { value: InlineImage }) => {
        if (!value?.url) return null;
        return (
          <div className="w-11/12 md:w-5/6 mx-auto relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md mt-16 mb-6 md:mb-10 group last:mb-0">
            <img
              src={value.url}
              alt={value.alt || "Asmalı Tarihçesi Görseli"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        );
      },
    },
    block: {
      normal: ({ children }: { children?: ReactNode }) => <p className="mb-8 last:mb-0">{children}</p>,
      h1: ({ children }: { children?: ReactNode }) => <h1 className="text-3xl font-bold mb-6 mt-10 font-sans text-left">{children}</h1>,
      h2: ({ children }: { children?: ReactNode }) => <h2 className="text-2xl font-bold mb-4 mt-8 font-sans text-left">{children}</h2>,
      h3: ({ children }: { children?: ReactNode }) => <h3 className="text-xl font-bold mb-3 mt-6 font-sans text-left">{children}</h3>,
      blockquote: ({ children }: { children?: ReactNode }) => (
        <blockquote className="border-l-4 border-slate-300 pl-4 py-1 my-8 text-slate-600 italic bg-slate-50 rounded-r-md">
          {children}
        </blockquote>
      ),
    }
  };

  return (
    <div className="w-full pb-2 md:pb-4 pt-4 md:pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-slate-700 leading-relaxed text-lg md:text-xl font-sans text-left md:text-justify">

          {/* Sadece PortableText kullanıyoruz, statik metinler Sanity'den gelecek */}
          <PortableText value={data.content} components={components} />

        </div>
      </div>
    </div>
  );
}
