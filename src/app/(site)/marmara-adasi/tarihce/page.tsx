
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/lib/live';
import { marmaraTarihceQuery } from '@/sanity/lib/queries';
import { ReactNode } from 'react';
import { MarmaraTarihceData } from '@/types';

export const metadata = {
  title: 'Marmara Adası Tarihçesi',
  description: 'Marmara Adası\'nın zengin tarihi, kültürel mirası ve coğrafi önemi hakkında detaylı bilgiler.',
};

export default async function MarmaraAdasiTarihcePage() {
  const { data } = await sanityFetch({ query: marmaraTarihceQuery }) as { data: MarmaraTarihceData };

  if (!data || !data.content) {
    return null;
  }

  const components = {
    block: {
      normal: ({ children }: { children?: ReactNode }) => <p className="mb-6">{children}</p>,
      h2: ({ children }: { children?: ReactNode }) => <h2 className="border-b border-slate-200 pb-2 mb-4 mt-12 first:mt-0 text-left">{children}</h2>,
      blockquote: ({ children }: { children?: ReactNode }) => (
        <blockquote className="border-l-4 border-slate-300 pl-4 py-1 mb-6 text-slate-600 italic bg-slate-50 rounded-r-md">
          {children}
        </blockquote>
      ),
    }
  };

  return (
    <div className="w-full pt-8 md:pt-12">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pb-20">
        <div className="prose prose-lg md:prose-xl max-w-none prose-stone prose-headings:font-sans prose-headings:text-slate-900 prose-headings:font-bold prose-headings:text-3xl md:prose-headings:text-4xl prose-headings:text-left font-sans prose-p:text-slate-700 prose-p:leading-relaxed text-left md:text-justify mx-auto">
          <PortableText value={data.content} components={components} />
        </div>
      </div>
    </div>
  );
}
