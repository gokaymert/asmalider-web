import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Link as LinkIcon } from "lucide-react";
import { sanityFetch } from '@/sanity/lib/live';
import { supportersQuery } from '@/sanity/lib/queries';
import SanityImage from '@/components/ui/SanityImage';
import { SupportersData, SupporterItem } from '@/types';

export const metadata: Metadata = {
  title: "Destekçilerimiz",
  description: "Asmalı Derneği'ne katkıda bulunan değerli destekçilerimiz, gönüllü emekçilerimiz ve iş birlikçilerimiz."
};

const SupporterRow = ({ item }: { item: SupporterItem }) => {
  const hasValidUrl = !!item.url;

  const content = (
    <div className={`group flex items-center justify-between gap-3 md:gap-4 py-3 md:py-4 border-b border-slate-100 transition-all duration-300 ${hasValidUrl ? 'hover:bg-slate-50 cursor-pointer px-3 -mx-3 rounded-xl' : 'px-3 -mx-3'}`}>
      <div className="flex items-center gap-3 md:gap-3.5 min-w-0 flex-1">
        <div className="w-10 h-10 md:w-12 md:h-12 relative shrink-0 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-1 md:p-1.5 group-hover:border-[var(--color-primary)]/30 transition-colors">
          {item.avatarType === 'custom' && item.image ? (
            <SanityImage image={item.image} alt={item.company || item.name} fill className="object-contain p-1 md:p-1.5" />
          ) : (
            <Image src={`/supporters/${item.avatarType}.svg`} alt={item.name} fill className="object-contain p-1 md:p-1.5 opacity-80" unoptimized />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-[12px] sm:text-[13px] lg:text-[14px] leading-snug ${hasValidUrl ? 'text-slate-800 group-hover:text-[var(--color-primary)] transition-colors' : 'text-slate-800'}`}>
            {item.name}
          </h3>
          {item.company && (
            <span className="text-[9.5px] sm:text-[10px] lg:text-[11px] text-slate-500 mt-0.5 lg:mt-1 block">
              {item.company}
            </span>
          )}
        </div>
      </div>
      {hasValidUrl && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)]/70 group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 transition-colors shrink-0">
          <LinkIcon className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  if (hasValidUrl) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default async function DestekcilerimizPage() {
  const { data: pageData } = await sanityFetch({ query: supportersQuery }) as { data: SupportersData | null };

  const degerliDestekciler = pageData?.degerliDestekciler || [];
  const isBirlikciler = pageData?.isBirlikciler || [];
  const gonulluEmekciler = pageData?.gonulluEmekciler || [];

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
          <div className="pt-8 md:pt-10 flex flex-wrap items-center gap-2 text-white/80 text-xs sm:text-sm font-medium w-full">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Ana Sayfa</Link>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="text-white font-bold whitespace-nowrap">Destekçilerimiz</span>
          </div>

          {/* Title */}
          <div className="flex-1 flex flex-col items-center justify-center pb-20 md:pb-28">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight text-center drop-shadow-md">
              Destekçilerimiz
            </h1>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-5xl mx-auto -mt-20 md:-mt-28 px-4 sm:px-6 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 min-h-[500px]">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              Derneğimizin çalışmalarına katkıda bulunan, vizyonumuza ortak olan tüm destekçilerimize ve gönüllü emekçilerimize sonsuz teşekkürlerimizi sunarız.
            </p>
          </div>

          <div className="space-y-20 md:space-y-24">
            
            {degerliDestekciler.length > 0 && (
              <section>
                <div className="mb-4 md:mb-5 pb-4 border-b border-slate-200 flex items-center">
                  <div className="w-1.5 h-8 bg-[var(--color-primary)] rounded-full mr-4"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                    Değerli Destekçilerimiz
                  </h2>
                </div>
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-12 lg:gap-x-16">
                  {degerliDestekciler.map((item, idx) => (
                    <SupporterRow key={item._key || idx} item={item} />
                  ))}
                </div>
              </section>
            )}

            {isBirlikciler.length > 0 && (
              <section>
                <div className="mb-4 md:mb-5 pb-4 border-b border-slate-200 flex items-center">
                  <div className="w-1.5 h-8 bg-[var(--color-primary)] rounded-full mr-4"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                    İş Birlikçilerimiz
                  </h2>
                </div>
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-12 lg:gap-x-16">
                  {isBirlikciler.map((item, idx) => (
                    <SupporterRow key={item._key || idx} item={item} />
                  ))}
                </div>
              </section>
            )}

            {gonulluEmekciler.length > 0 && (
              <section>
                <div className="mb-4 md:mb-5 pb-4 border-b border-slate-200 flex items-center">
                  <div className="w-1.5 h-8 bg-[var(--color-primary)] rounded-full mr-4"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                    Gönüllü Emekçilerimiz
                  </h2>
                </div>
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-12 lg:gap-x-16">
                  {gonulluEmekciler.map((item, idx) => (
                    <SupporterRow key={item._key || idx} item={item} />
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
