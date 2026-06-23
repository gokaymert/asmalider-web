
import { Anchor, Bus, MapPin, ArrowRight, Info, Clock } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/live';
import { transportationQuery } from '@/sanity/lib/queries';

export const metadata = {
  title: 'Ulaşım',
  description: 'Marmara Adası Asmalı Köyü\'ne ulaşım rehberi, feribot seferleri ve ada içi ulaşım bilgileri.',
};


// İçerik Bileşeni
function UlasimContent({ data }: { data?: TransportationData }) {
  const sortedBoats = data?.boatRoutes ? [...data.boatRoutes].sort((a, b) => a.mil - b.mil) : [];
  const timelineDotColors = ['bg-slate-800', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];

  return (
    <div className="w-full pb-4">

      {/* Intro */}
      <div className="text-center">
        {data?.introText && (
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl font-medium mx-auto">
            {data.introText}
          </p>
        )}
      </div>

      <hr className="my-10 border-slate-200" />

      <div className="space-y-24">
        {/* Feribot Firmaları */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
            <Anchor className="text-primary" size={32} />
            Feribot Seferleri
          </h3>
          <div className="flex flex-col gap-6">
            {data?.ferries?.map((ferry) => (
              <a
                key={ferry._key}
                href={ferry.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 p-4 sm:p-6 bg-slate-100/60 shadow-sm border border-slate-200 rounded-[1.25rem] sm:rounded-2xl hover:bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 w-full md:w-auto flex-1">
                  {/* İkon ve Mobil Başlık */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors shrink-0 shadow-sm">
                      <Anchor className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <h4 className="sm:hidden text-lg font-extrabold text-slate-800 group-hover:text-primary transition-colors">{ferry.companyName}</h4>
                  </div>

                  {/* Rotalar ve Bilgiler */}
                  <div className="flex-1 w-full mt-1 sm:mt-0">
                    <h4 className="hidden sm:block text-xl font-extrabold text-slate-800 group-hover:text-primary transition-colors mb-2.5">{ferry.companyName}</h4>

                    <div className="flex flex-col gap-3.5 sm:gap-3">
                      {ferry.routes?.map((route) => (
                        <div key={route._key} className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-1.5 min-[420px]:gap-3 w-full">
                          <div className="flex items-center gap-2 shrink-0 min-[420px]:w-40">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-primary/60 transition-colors"></div>
                            <span className="text-slate-600 font-bold text-[0.85rem] sm:text-sm whitespace-nowrap">{route.routeName}</span>
                          </div>

                          <div className="flex items-center shrink-0 pl-3.5 min-[420px]:pl-0">
                            <span className="inline-flex items-center gap-1 text-[0.7rem] sm:text-xs font-bold bg-slate-200/80 text-slate-700 px-2.5 py-1 rounded-md whitespace-nowrap">
                              <Clock size={12} className="text-slate-500" /> {route.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Buton */}
                <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-end shrink-0">
                  <span className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 md:px-5 md:py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 group-hover:bg-blue-600 group-hover:shadow-primary/40 shrink-0">
                    <Anchor size={16} className="shrink-0 hidden md:block" /> Sefer Saatleri <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform shrink-0" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Ada İçi Ulaşım Rotaları */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
            <Bus className="text-primary" size={32} />
            Ada İçi Ulaşım ve İskeleler
          </h3>

          <div className="bg-slate-50/80 border border-slate-200 rounded-[2rem] p-5 sm:p-10 shadow-sm mt-4">
            <div className="relative pl-5 sm:pl-8 border-l-[3px] border-slate-200 space-y-10 sm:space-y-12 ml-4 sm:ml-8">

              {data?.localTransport?.map((item, idx) => {
                const dotColor = timelineDotColors[idx % timelineDotColors.length];
                return (
                  <div key={item._key} className="relative">
                    <div className={`absolute -left-[31.5px] sm:-left-[45.5px] top-1 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] sm:border-4 border-white ${dotColor} shadow-sm transition-all`}></div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-800">{item.title}</h4>
                    <p className="text-slate-600 mt-2 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">{item.description}</p>

                    {item.distance && (
                      <div className="mt-4 inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 border border-slate-200 shadow-sm">
                        <MapPin size={16} className="text-slate-600 shrink-0" /> Asmalı&apos;ya Uzaklık: {item.distance}
                      </div>
                    )}

                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 group block w-fit"
                      >
                        <Bus size={16} className="shrink-0" /> {item.linkLabel || "İncele"} <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Özel Tekne Rotaları & Kooperatif */}
        <div>
          <div className="mb-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <MapPin className="text-primary" size={32} />
              Özel Tekne Rotaları
            </h3>
            <p className="text-slate-500 mt-3 font-medium max-w-3xl leading-relaxed">Asmalı&apos;ya özel tekne ile gelmek isteyenler için en yakın kara parçası ve çevre lokasyonlara olan mesafeler:</p>
          </div>

          {/* Deniz Rotaları */}
          <div className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {sortedBoats.map(boat => (
                <div key={boat._key} className="bg-slate-50/80 p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center gap-2.5 sm:gap-4">
                  <span className="font-extrabold text-slate-800 text-sm sm:text-lg leading-tight">{boat.location}</span>
                  <span className="bg-primary text-white font-mono font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-sm">
                    {boat.mil} mil
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Kooperatif */}
          {data?.cooperativeContact && (
            <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 shadow-lg relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

              {/* Sol Kısım: Başlık ve Açıklama */}
              <div className="relative z-10 flex flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/10 text-blue-300 rounded-xl max-[400px]:hidden flex items-center justify-center shrink-0 border border-white/5 mt-1 sm:mt-0">
                  <Info size={24} className="lg:scale-110" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-1.5 leading-tight">S.S. Asmalı Köyü Su Ürünleri Kooperatifi</h3>
                  <p className="text-slate-300 text-[0.75rem] sm:text-sm lg:text-base font-medium leading-relaxed max-w-xl">Liman durumu hakkında bilgi almak için kooperatifimizle görüşebilirsiniz.</p>
                </div>
              </div>

              {/* Sağ Kısım: İletişim */}
              <div className="relative z-10 shrink-0 w-full lg:w-auto flex justify-center sm:justify-end mt-4 sm:mt-2 lg:mt-0">
                <a
                  href={`tel:${data.cooperativeContact.phone.replace(/[\s-]/g, '')}`}
                  className="inline-flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 bg-slate-900/60 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-900/80 p-3 sm:px-5 sm:py-3 rounded-xl transition-all duration-300 group max-w-full"
                >
                  <div className="flex flex-col text-center sm:text-left shrink-0">
                    <span className="text-slate-400 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider leading-tight mb-0.5">{data.cooperativeContact.title}</span>
                    <span className="text-white font-extrabold text-sm sm:text-base group-hover:text-blue-400 transition-colors leading-none">{data.cooperativeContact.name}</span>
                  </div>

                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-blue-400 font-bold text-sm sm:text-base tracking-wide group-hover:text-blue-300 transition-colors whitespace-nowrap">
                      {data.cooperativeContact.phone}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

// Ana Sayfa Bileşeni
import { TransportationData } from '@/types';

export default async function UlasimPage() {
  const { data } = await sanityFetch({ query: transportationQuery });

  return <UlasimContent data={data as TransportationData} />;
}
