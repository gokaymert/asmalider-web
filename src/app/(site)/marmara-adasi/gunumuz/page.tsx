
import SanityImage from '@/components/ui/SanityImage';
import { sanityFetch } from '@/sanity/lib/live';
import { marmaraGunumuzQuery } from '@/sanity/lib/queries';

export const metadata = {
  title: 'Günümüzde Marmara Adası',
  description: 'Marmara Adası\'nın güncel durumu ve yaşamı hakkında bilgiler.',
};

import { MarmaraGunumuzData, MarmaraGunumuzRegion } from '@/types';

export default async function MarmaraAdasiGunumuzPage() {
  const { data } = await sanityFetch({ query: marmaraGunumuzQuery }) as { data: MarmaraGunumuzData };

  if (!data) return null;

  return (
    <div className="w-full pb-12 px-6 sm:px-10 md:px-16 lg:px-20">

      {/* Coğrafya (Giriş) Alanı */}
      <div className="pt-12 md:pt-16 pb-8">
        <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl prose-stone prose-headings:font-serif prose-headings:text-slate-900 prose-headings:font-bold prose-headings:text-center prose-p:text-slate-700 prose-p:leading-relaxed text-left md:text-justify">
          {data.intro?.heading && <h2>{data.intro.heading}</h2>}
          {data.intro?.content && <p>{data.intro.content}</p>}
        </div>
      </div>

      {/* Harita Görseli (Girişin hemen altında) */}
      {data.intro?.mainImage?.asset?.url && (
        <div className="pb-12 md:pb-16">
          <div className="w-11/12 md:w-5/6 max-w-4xl mx-auto relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-slate-100 group">
            <SanityImage
              image={data.intro.mainImage}
              alt={data.intro?.heading || "Giriş Görseli"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      )}

      {/* Bölgeler (Zig-Zag Düzeni) */}
      {data.regions && data.regions.length > 0 && (
        <div className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
            {data.regions.map((bolge: MarmaraGunumuzRegion, index: number) => {
              const isEven = index % 2 === 1;

              // Fotoğraf sayısına göre dergi düzeni
              const renderImages = () => {
                if (!bolge.images || bolge.images.length === 0) return null;

                if (bolge.images.length >= 3) {
                  // 3 Fotoğraf: 1 büyük üstte, 2 kare yanyana altta
                  return (
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
                        <SanityImage image={bolge.images[0]} alt={`${bolge.name} 1`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:gap-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                          <SanityImage image={bolge.images[1]} alt={`${bolge.name} 2`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                          <SanityImage image={bolge.images[2]} alt={`${bolge.name} 3`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                      </div>
                    </div>
                  );
                }
                if (bolge.images.length === 2) {
                  // 2 Fotoğraf: Yanyana diktörtgen
                  return (
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group">
                        <SanityImage image={bolge.images[0]} alt={`${bolge.name} 1`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      </div>
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group">
                        <SanityImage image={bolge.images[1]} alt={`${bolge.name} 2`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      </div>
                    </div>
                  );
                }
                // 1 Fotoğraf: Klasik geniş fotoğraf
                return (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                    <SanityImage image={bolge.images[0]} alt={bolge.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                );
              };

              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Metin İçeriği */}
                  <div className={`flex flex-col justify-center space-y-6 ${isEven ? 'md:order-last md:pl-8' : 'md:order-first md:pr-8'} order-first`}>
                    {bolge.name && (
                      <h3 className="font-serif text-4xl font-bold text-slate-900 border-b-2 border-slate-200 pb-3 inline-block self-start">
                        {bolge.name}
                      </h3>
                    )}
                    {bolge.description && (
                      <p className="text-slate-700 text-lg leading-relaxed text-left md:text-justify">
                        {bolge.description}
                      </p>
                    )}
                  </div>

                  {/* Fotoğraf Galerisi */}
                  <div className={`w-11/12 sm:w-4/5 md:w-full mx-auto ${isEven ? 'md:order-first' : 'md:order-last'} order-last`}>
                    {renderImages()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
