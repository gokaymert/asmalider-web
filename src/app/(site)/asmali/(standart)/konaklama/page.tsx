import { Home, Coffee, Users, Utensils, BedDouble, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { accommodationQuery } from '@/sanity/lib/queries';

export const metadata = {
  title: 'Konaklama ve Yeme-İçme',
  description: 'Marmara Adası Asmalı Köyü konaklama imkanları, pansiyonlar ve köydeki yeme-içme mekanları.',
};

// İkon Tipi eşleştirici fonksiyon
const getIconProps = (type: string) => {
  switch (type) {
    case 'cafe':
      return {
        icon: Coffee,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200/60",
        shadow: "shadow-amber-500/20"
      };
    case 'users':
      return {
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200/60",
        shadow: "shadow-blue-500/20"
      };
    case 'restaurant':
      return {
        icon: Utensils,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200/60",
        shadow: "shadow-emerald-500/20"
      };
    default:
      return {
        icon: MapPin,
        color: "text-slate-600",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-200/60",
        shadow: "shadow-slate-500/20"
      };
  }
};

import { AccommodationData } from '@/types';

export default async function KonaklamaPage() {
  const { data } = await sanityFetch({ query: accommodationQuery });
  const accommodation: AccommodationData = data as AccommodationData || {};

  return (
    <div className="w-full pb-10">

      {/* Intro */}
      {accommodation.introText && (
        <>
          <div className="text-center">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl font-medium mx-auto">
              {accommodation.introText}
            </p>
          </div>

          <hr className="my-10 border-slate-200" />
        </>
      )}

      <div className="space-y-24">
        {/* Bölüm 1: Konaklama İmkanları */}
        <div className="space-y-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center gap-3 md:gap-4 tracking-tight mb-8">
            <BedDouble className="text-primary shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            <span>Konaklama İmkanları</span>
          </h3>

          <div className="flex flex-col gap-8 sm:gap-10">

            {accommodation.facilities?.map((facility: NonNullable<AccommodationData['facilities']>[number], index: number) => (
              <div key={index} className="flex gap-3 sm:gap-5 items-start">
                <div className="mt-2.5 sm:mt-3.5 w-4 sm:w-6 h-1 bg-primary rounded-full shrink-0"></div>
                <div className="flex flex-col flex-1">
                  <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2.5">
                    {facility.title}
                  </h4>
                  <p className={`text-slate-600 text-base md:text-lg leading-relaxed ${facility.hasLink ? 'mb-5' : ''}`}>
                    {facility.description}
                  </p>
                  {facility.hasLink && facility.buttonText && facility.buttonUrl && (
                    <div>
                      <Link href={facility.buttonUrl} className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-colors shadow-sm w-full sm:w-auto">
                        <Home size={18} />
                        {facility.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* Pansiyon İlanı Dipnot */}
          <div className="pt-4 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-600 text-sm md:text-base font-medium flex-1">
                Pansiyon sahipleri evlerini burada yayınlamak için bizimle irtibata geçebilir.
              </p>
              <Link href="/iletisim" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm shrink-0 group">
                İletişime Geç
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>


        {/* Bölüm 2: Yeme-İçme Alanları */}
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center gap-3 md:gap-4 tracking-tight mb-2">
            <Utensils className="text-primary shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            <span>Köyümüzde Yeme-İçme</span>
          </h3>

          {/* Liste Tasarımı */}
          <div className="flex flex-col">
            {accommodation.dining?.map((item: NonNullable<AccommodationData['dining']>[number], index: number) => {
              const styleProps = getIconProps(item.iconType || '');
              const IconComponent = styleProps.icon;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start py-8 group ${index < (accommodation.dining?.length || 0) - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <div className="lg:col-span-4 flex items-center gap-4 sm:gap-5 w-full">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${styleProps.bgColor} ${styleProps.color} ${styleProps.borderColor} ${styleProps.shadow}`}>
                      <IconComponent size={28} className="sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex flex-1 flex-row flex-wrap lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-x-4 gap-y-1.5">
                      <h4 className="text-xl font-extrabold text-slate-800 group-hover:text-primary transition-colors">{item.title}</h4>
                      {item.placeCount && (
                        <span className="text-sm font-bold text-slate-500 block bg-slate-100 px-2.5 py-0.5 rounded-md w-fit border border-slate-200/60 whitespace-nowrap">{item.placeCount}</span>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center h-full">
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
