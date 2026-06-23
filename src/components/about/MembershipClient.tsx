'use client';

import { useState } from 'react';
import { Landmark, Copy, Check, ChevronDown, Download, FileText } from 'lucide-react';
import { PortableText } from 'next-sanity';

import { MembershipData } from '@/types';

export default function MembershipClient({ data }: { data?: MembershipData }) {
  const [copied, setCopied] = useState(false);
  const [kvkkOpen, setKvkkOpen] = useState(false);

  const iban = data?.iban || "";

  const copyToClipboard = async () => {
    try {
      if (iban) {
        await navigator.clipboard.writeText(iban);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // sessizce geç
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-4 md:pb-6 font-sans">

      {/* Header */}
      <div className="text-center">
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Derneğimize üye olarak çalışmalarımıza, köyümüzün geleceğine maddi ve manevi katkı sağlayabilirsiniz. Üye olmak için aşağıdaki adımları takip edebilirsiniz.
        </p>
      </div>

      {/* Yatay Çizgi */}
      <hr className="my-10 border-slate-200" />

      <div className="space-y-24">

        {/* Nasıl Üye Olunur? */}
        {data?.steps && data.steps.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="text-(--color-primary)">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Nasıl Üye Olunur?</h3>
            </div>

            <div className="space-y-10 pl-2">
              {data.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-(--color-primary) font-bold shadow-sm mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">{step.title}</h4>
                    <div className="text-slate-600 leading-relaxed text-base md:text-lg prose prose-slate max-w-none prose-a:text-(--color-primary) prose-a:font-medium prose-a:no-underline hover:prose-a:underline">
                      {step.description ? <PortableText value={step.description} /> : null}
                    </div>
                    {step.formFile?.asset?.url && (
                      <div className="mt-5">
                        <a
                          href={step.formFile.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--color-primary) hover:bg-(--color-primary)/90 text-white font-medium rounded-lg transition-colors shadow-sm text-sm md:text-base"
                        >
                          <Download className="w-4 h-4" />
                          Başvuru Formunu İndir
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ücret ve Hesap Bilgileri */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="text-emerald-600">
              <Landmark className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Ücret ve Hesap Bilgileri</h3>
          </div>

          <div className="space-y-8">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Başvuru işlemi sonrasında aşağıdaki dernek hesabımıza toplam <strong className="text-slate-800 font-bold">{data?.feeAmount ? `${data.feeAmount} TL` : ""}</strong> göndermeniz gerekmektedir.
            </p>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Alıcı Adı</p>
                <p className="font-semibold text-slate-800 text-base md:text-lg leading-snug mb-8">{data?.accountName}</p>

                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">IBAN Numarası</p>
                    <code className="font-mono text-lg md:text-xl text-slate-800 font-bold tracking-tight block">
                      {iban}
                    </code>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    disabled={!iban}
                    className="flex-shrink-0 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold text-sm border border-slate-200 shadow-sm w-full sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-700">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 text-slate-500" />
                        <span>IBAN Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Alt Kısım: Açıklama */}
              <div className="p-5 md:p-8 border-t border-slate-100 bg-amber-50/50">
                <div className="md:hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100/70 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest leading-tight">Açıklama Kısmına Mutlaka Yazınız</p>
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-lg leading-snug">{data?.transferDescription ? `"${data.transferDescription}"` : ""}</p>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Başvurunuzun eşleşebilmesi için açıklama kısmını yukarıdaki gibi eksiksiz ve doğru girmeye özen gösteriniz.
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100/70 flex items-center justify-center text-amber-600 flex-shrink-0 mt-1">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1.5 leading-tight">Açıklama Kısmına Mutlaka Yazınız</p>
                    <p className="text-slate-800 font-bold text-xl leading-snug break-words">{data?.transferDescription ? `"${data.transferDescription}"` : ""}</p>
                    <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
                      Başvurunuzun eşleşebilmesi için açıklama kısmını yukarıdaki gibi eksiksiz ve doğru girmeye özen gösteriniz.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* KVKK Metni */}
        <div className="border border-slate-200 rounded-xl bg-slate-50 transition-all duration-300 hover:border-slate-300 mt-10 overflow-hidden">
          <button
            onClick={() => setKvkkOpen(!kvkkOpen)}
            className="w-full flex items-center justify-between py-4 px-5 md:py-5 md:px-6 text-left group cursor-pointer"
          >
            <span className="font-semibold text-slate-700 text-base">Kişisel Verilerin Korunması Hakkında Bilgilendirme</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${kvkkOpen ? 'bg-slate-200 text-slate-800' : 'bg-slate-200/50 text-slate-500 group-hover:bg-slate-200'}`}>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${kvkkOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <div className={`transition-all duration-300 ease-in-out ${kvkkOpen ? 'max-h-[2000px] opacity-100 bg-white border-t border-slate-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="p-5 md:p-6 text-sm text-slate-600 space-y-4 leading-relaxed">

              {data?.kvkkTopText && (
                <div className="prose prose-slate prose-sm max-w-none">
                  <PortableText value={data.kvkkTopText} />
                </div>
              )}

              {data?.kvkkList && data.kvkkList.length > 0 && (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 py-4 px-5 bg-slate-50 rounded-lg border border-slate-100 my-4">
                  {data.kvkkList.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium text-slate-700 text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {data?.kvkkBottomText && (
                <div className="prose prose-slate prose-sm max-w-none">
                  <PortableText value={data.kvkkBottomText} />
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
