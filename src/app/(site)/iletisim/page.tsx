import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import MapInteractive from '@/components/contact/MapInteractive';
import ContactForm from '@/components/forms/ContactForm';
import { sanityFetch } from '@/sanity/lib/live';
import { contactQuery } from '@/sanity/lib/queries';

export const metadata = {
  title: 'İletişim',
  description: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği iletişim bilgileri ve formu.',
};

// Skeleton Yapısı
function IletisimSkeleton() {
  return (
    <div className="animate-pulse flex flex-col space-y-8 p-8 md:p-12 lg:p-16">
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5"></div>
      </div>

      <div className="space-y-4 pt-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3 mb-6"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export interface ContactData {
  address?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

function IletisimContent({ data }: { data?: ContactData }) {
  const address = data?.address;
  const phone = data?.phone;
  const phoneLink = phone ? phone.replace(/\s+/g, '') : '';
  const email = data?.email;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative">
      {/* Sol Kolon - İletişim Bilgileri ve Harita */}
      <div className="bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 h-full">
        <div className="p-8 md:p-12 flex flex-col h-fit">
          {/* Başlık */}
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Bize Ulaşın</h2>

          <div className="space-y-6 mb-8">
            {/* Adres */}
            {address && (
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Adres</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>
            )}

            {/* Telefon */}
            {phone && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Telefon</h3>
                  <p className="text-slate-600 mt-1">
                    <a href={`tel:${phoneLink}`} className="hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* E-posta */}
            {email && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">E-posta</h3>
                  <p className="text-slate-600 mt-1">
                    <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Sosyal Medya */}
            {(data?.facebookUrl || data?.instagramUrl) && (
              <div className="pt-4 pb-2 flex items-center justify-center gap-6 w-full">
                {data?.facebookUrl && (
                  <a href={data.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1877F2] opacity-70 hover:opacity-100 transition-opacity font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    <span>Facebook</span>
                  </a>
                )}

                {data?.facebookUrl && data?.instagramUrl && (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                )}

                {data?.instagramUrl && (
                  <a href={data.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                      Instagram
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* İnteraktif Harita Bileşeni */}
          {data?.mapUrl && <MapInteractive mapUrl={data.mapUrl} />}
        </div>
      </div>

      {/* Sağ Kolon - İletişim Formu */}
      <div className="p-8 md:p-12 bg-white flex flex-col h-full">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Mesaj Gönderin</h2>
        <p className="text-slate-500 mb-8 text-sm text-center">
          Derneğimizle ilgili soru, öneri veya taleplerinizi aşağıdaki formu doldurarak bize iletebilirsiniz.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}

async function IletisimContentLoader() {
  const { data } = await sanityFetch({ query: contactQuery });
  return <IletisimContent data={data as ContactData} />;
}

// Ana Sayfa Bileşeni
export default function IletisimPage() {
  const title = "İletişim";

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
          <div className="pt-8 md:pt-10 flex items-center gap-2 text-white/80 text-sm font-medium w-full">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <span className="text-white font-bold">{title}</span>
          </div>

          {/* Title */}
          <div className="flex-1 flex flex-col items-center justify-center pb-20 md:pb-28">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight text-center drop-shadow-md">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="max-w-5xl mx-auto -mt-20 md:-mt-28 px-4 sm:px-6 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden min-h-[500px]">
          <Suspense fallback={<IletisimSkeleton />}>
            <IletisimContentLoader />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
