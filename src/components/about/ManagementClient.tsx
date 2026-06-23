"use client";

import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { BoardData } from '@/types';

const FOUNDERS = [
  "Ergin KARAKAŞ",
  "Sebahattin ERDENİZ",
  "Belma BIÇAKHAN",
  "Şadan Uğur KABA",
  "Selahattin PÜSKÜL",
  "Kemal GAZİOĞLU",
  "Ali TOSUN"
];

interface ManagementClientProps {
  data?: BoardData;
}

export default function ManagementClient({ data }: ManagementClientProps) {
  const [openTerms, setOpenTerms] = useState<Record<string, boolean>>({
    "0": true // Default olarak ilk indeks açık
  });

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6; // Yatay görünümde (sm ve üzeri) her zaman 6 kişi göster

  const toggleTerm = (index: string) => {
    setOpenTerms(prev => ({
      [index]: !prev[index]
    }));
  };

  const displayPresidents = data?.presidents || [];
  const displayBoards = data?.committeePeriods || [];

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + itemsPerPage, Math.max(0, displayPresidents.length - itemsPerPage)));
  };

  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - itemsPerPage));
  };

  if (displayPresidents.length === 0 && displayBoards.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 w-full text-slate-800 font-sans">
      {/* Başkanlarımız */}
      {displayPresidents.length > 0 && (
        <section className="w-full">
          <div className="flex sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-6 md:w-8 lg:w-12 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2.5 sm:mt-0"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-800 uppercase tracking-tight leading-snug">
              Başkanlarımız
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Mobil Görünüm */}
          <div className="hidden max-[660px]:flex flex-col gap-2.5 mb-6">
            {displayPresidents.map((president, idx) => {
              const isCurrent = president.isCurrent;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-2 p-3 rounded-xl border transition-all ${isCurrent ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                  <span className={`text-[13px] font-bold leading-tight ${isCurrent ? 'text-primary' : 'text-slate-800'}`}>
                    {president.name}
                  </span>
                  <span className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${isCurrent ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {president.period}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop/Tablet Görünüm */}
          <div className="hidden min-[661px]:flex items-center w-full py-2 md:py-4 relative group">

            {/* Sol Ok */}
            {displayPresidents.length > itemsPerPage && (
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="absolute left-0 z-30 -ml-4 md:-ml-8 p-2 md:p-2.5 rounded-full bg-white border border-slate-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] text-slate-700 hover:text-white hover:bg-primary hover:border-primary disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div className="flex-1 w-full relative px-2 md:px-4 overflow-hidden">
              {/* Merkezdeki Yatay Ana Çizgi */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>

              <div
                className="flex w-full relative z-10 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${(100 / itemsPerPage) * startIndex}%)` }}
              >
                {displayPresidents.map((president, originalIndex) => {
                  const isTop = originalIndex % 2 === 0;
                  const isCurrent = president.isCurrent;

                  return (
                    <div
                      key={originalIndex}
                      className="relative flex-none flex flex-col items-center justify-center cursor-default"
                      style={{ width: `${100 / itemsPerPage}%` }}
                    >

                      {/* Üst Metin Alanı */}
                      <div className={`w-full h-16 md:h-24 flex flex-col items-center justify-end pb-3 md:pb-4 px-0.5 text-center transition-all duration-300 ${isTop ? 'opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
                        <h3 className={`text-[10px] md:text-xs lg:text-sm font-bold leading-tight mb-1 md:mb-1.5 transition-colors ${isCurrent ? 'text-primary' : 'text-slate-800'}`}>{president.name}</h3>
                        <span className={`text-[9px] md:text-[10px] lg:text-xs font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full transition-colors ${isCurrent ? 'bg-primary text-white shadow-sm' : 'text-slate-500 bg-slate-100'}`}>{president.period}</span>
                      </div>

                      {/* Çizgi Üzerindeki Nokta */}
                      <div className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-white border-[3px] md:border-[4px] lg:border-[5px] transition-all duration-300 relative z-20 hover:scale-125 hover:border-primary ${isCurrent ? 'border-primary scale-125 shadow-[0_0_15px_rgba(var(--primary),0.4)]' : 'border-slate-300'}`}></div>

                      {/* Alt Metin Alanı */}
                      <div className={`w-full h-16 md:h-24 flex flex-col items-center justify-start pt-3 md:pt-4 px-0.5 text-center transition-all duration-300 ${!isTop ? 'opacity-100 translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                        <span className={`text-[9px] md:text-[10px] lg:text-xs font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full mb-1 md:mb-1.5 transition-colors ${isCurrent ? 'bg-primary text-white shadow-sm' : 'text-slate-500 bg-slate-100'}`}>{president.period}</span>
                        <h3 className={`text-[10px] md:text-xs lg:text-sm font-bold leading-tight transition-colors ${isCurrent ? 'text-primary' : 'text-slate-800'}`}>{president.name}</h3>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sağ Ok */}
            {displayPresidents.length > itemsPerPage && (
              <button
                onClick={handleNext}
                disabled={startIndex >= displayPresidents.length - itemsPerPage}
                className="absolute right-0 z-30 -mr-4 md:-mr-8 p-2 md:p-2.5 rounded-full bg-white border border-slate-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] text-slate-700 hover:text-white hover:bg-primary hover:border-primary disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            )}

          </div>
        </section>
      )}

      {/* 2- Dönem Kurulları */}
      {displayBoards.length > 0 && (
        <section className="w-full">
          <div className="flex sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-6 md:w-8 lg:w-12 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2.5 sm:mt-0"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-800 uppercase tracking-tight leading-snug">
              Dönem Kurulları
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>
          </div>

          <div className="flex flex-col gap-3">
            {displayBoards.map((board, bIdx) => {
              const indexKey = bIdx.toString();
              const isOpen = openTerms[indexKey] || false;

              return (
                <div
                  key={indexKey}
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-slate-300 shadow-sm' : 'border-slate-200'}`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleTerm(indexKey)}
                    className={`w-full px-4 md:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors duration-300 ${isOpen ? 'bg-slate-100 hover:bg-slate-200' : 'bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <span className={`text-sm sm:text-base md:text-lg font-bold leading-tight ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                      {board.periodTitle}
                    </span>
                    <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-500'}`} size={20} />
                  </button>

                  {/* Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden bg-white">
                      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
                        {/* Ortadaki Dikey Çizgi (Sadece Desktop) */}
                        <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-px bg-slate-200 -translate-x-1/2"></div>

                        {/* Yönetim Kurulu */}
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            <h3 className="text-xl font-bold text-primary">Yönetim Kurulu</h3>
                          </div>

                          {(() => {
                            const members = [
                              ...(board.yonetimKurulu?.asilUyeler || []),
                              ...(board.yonetimKurulu?.yedekUyeler || [])
                            ];
                            if (members.length === 0) return <p className="text-sm text-slate-400 italic mb-8">Üye bilgisi bulunmuyor.</p>;

                            return (
                              <table className="w-full text-left text-sm mb-8">
                                <tbody>
                                  {members.map((member, i) => (
                                    <tr key={i} className="border-b border-slate-100/70 last:border-0 hover:bg-slate-50/50 transition-colors">
                                      <td className="py-2.5 pr-4 text-slate-500 w-1/2">{member.role}</td>
                                      <td className={`py-2.5 font-medium ${member.role?.includes('Başkan') ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>{member.name}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            );
                          })()}
                        </div>

                        {/* Denetim Kurulu */}
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            <h3 className="text-xl font-bold text-primary">Denetim Kurulu</h3>
                          </div>

                          {(() => {
                            const members = [
                              ...(board.denetimKurulu?.asilUyeler || []),
                              ...(board.denetimKurulu?.yedekUyeler || [])
                            ];
                            if (members.length === 0) return <p className="text-sm text-slate-400 italic mb-8">Üye bilgisi bulunmuyor.</p>;

                            return (
                              <table className="w-full text-left text-sm mb-8">
                                <tbody>
                                  {members.map((member, i) => (
                                    <tr key={i} className="border-b border-slate-100/70 last:border-0 hover:bg-slate-50/50 transition-colors">
                                      <td className="py-2.5 pr-4 text-slate-500 w-1/2">{member.role}</td>
                                      <td className={`py-2.5 font-medium ${member.role?.includes('Başkan') ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>{member.name}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            );
                          })()}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3- Kurucu Üyeler */}
      <section className="w-full">
        <div className="flex sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="w-6 md:w-8 lg:w-12 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2.5 sm:mt-0"></div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-800 uppercase tracking-tight leading-snug">
            Kurucu Üyelerimiz (2001)
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-5 gap-x-2 md:gap-x-4 pt-2">
          {FOUNDERS.map((founder, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 md:gap-3 group cursor-default"
            >
              {/* Madde İşareti */}
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-300 group-hover:bg-primary rounded-sm transform rotate-45 group-hover:scale-125 transition-all duration-300 flex-shrink-0"></div>

              {/* İsim */}
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-700 group-hover:text-primary transition-colors duration-300">
                {founder}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
