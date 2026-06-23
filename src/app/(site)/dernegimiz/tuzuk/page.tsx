import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { tuzukQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü',
  description: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği tüzüğü.',
};

export const revalidate = 60;

import { PortableTextBlock } from 'next-sanity';

interface Article {
  articleTitle: string;
  articleBody: PortableTextBlock[];
}

interface Section {
  sectionTitle: string;
  articles: Article[];
}

export default async function TuzukPage() {
  const data = await client.fetch(tuzukQuery);
  const sections: Section[] = data?.sections || [];

  if (!data || !sections.length) {
    return null;
  }

  let globalArticleIndex = 1;

  return (
    <div className="w-full max-w-4xl mx-auto pt-4 md:pt-6">
      {/* Ana İçerik */}
      <div className="text-slate-800">
        {/* Bölümler ve Maddeler */}
        <div className="space-y-16">
          {sections.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              id={section.sectionTitle.replace(/\s+/g, '-').toLowerCase()}
            >
              {/* Bölüm Başlığı */}
              <div className="mb-6 md:mb-8 border-b border-slate-200 pb-3 text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 m-0 tracking-wider">
                  {section.sectionTitle}
                </h2>
              </div>

              {/* Maddeler */}
              <div className="space-y-8 pl-0 md:pl-2">
                {section.articles?.map((article, articleIdx) => {
                  const maddeNo = `MADDE ${globalArticleIndex++}:`;

                  return (
                    <div key={articleIdx} className="relative group">
                      <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-1 bg-slate-100 group-hover:bg-primary/20 transition-colors rounded-full"></div>

                      {/* Madde Başlığı */}
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2.5">
                        <span className="text-primary">{maddeNo}</span> {article.articleTitle}
                      </h3>

                      {/* Madde İçeriği */}
                      <div className="text-slate-700 leading-relaxed space-y-4 prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-headings:mb-2.5 prose-p:text-base prose-p:md:text-lg prose-p:text-justify prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-blue-700">
                        <PortableText value={article.articleBody} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
