import { Metadata } from 'next';
import ScrollRevealWrapper from '@/components/ui/ScrollRevealWrapper';
import { aboutUsQuery } from '@/sanity/lib/queries';
import { AboutUsData } from '@/types';
import { ReactNode } from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import { PortableText } from '@portabletext/react';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği tarihçesi ve vizyonu.',
};

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="text-lg text-slate-600 leading-relaxed mb-6">{children}</p>
    ),
  },
};

export default async function AboutUsPage() {
  const { data: pageData } = await sanityFetch({ query: aboutUsQuery }) as { data: AboutUsData };

  if (!pageData) return null;

  const titleString = pageData.title || "";
  const titleParts = titleString.split(' ');
  const firstWord = titleParts.length > 0 ? titleParts[0] : '';
  const restOfTitle = titleParts.length > 1 ? titleParts.slice(1).join(' ') : '';

  return (
    <div className="max-w-4xl mx-auto pb-12 sm:pb-16 px-0 sm:px-4">
      {/* Başlık */}
      {titleString && (
        <div className="mb-10 text-center flex flex-col items-center">
          <span className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-medium mb-1">
            {firstWord}
          </span>
          {restOfTitle && (
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-widest sm:tracking-[0.2em] leading-tight">
              {restOfTitle}
            </h2>
          )}
          <div className="w-24 h-1 bg-(--color-primary)/30 mt-4 sm:mt-6 rounded-full"></div>
        </div>
      )}

      {/* Makale Düzeni */}
      <ScrollRevealWrapper>
        <div className="prose prose-lg prose-slate max-w-none [&>p:first-child]:text-xl [&>p:first-child]:text-slate-700 [&>p:first-child]:font-medium">

          {pageData?.content && (
            <PortableText value={pageData.content} components={portableTextComponents} />
          )}

          {pageData?.visionTitle && pageData?.visionContent && (
            <div className="bg-slate-50 border-l-4 border-(--color-primary) px-6 pb-6 pt-3 my-10 rounded-r-xl">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{pageData.visionTitle}</h3>
              <div className="[&>p]:text-lg [&>p]:text-slate-600 [&>p]:leading-relaxed [&>p]:mb-0">
                <PortableText value={pageData.visionContent} components={portableTextComponents} />
              </div>
            </div>
          )}
        </div>
      </ScrollRevealWrapper>

    </div>
  );
}
