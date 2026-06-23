import Link from 'next/link';

export default function Hero({ data }: { data?: { imageUrl?: string } }) {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: data?.imageUrl ? `url('${data.imageUrl}')` : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/90 to-[#1E6091]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:items-start items-center py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-4xl drop-shadow-sm">
          Marmara Adası <br className="hidden sm:block" />
          <span className="text-white/90">Asmalı Köyü&apos;ne</span> <br className="hidden sm:block" />
          Hoş Geldiniz
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
          Kültürel mirasımızı korumak, yaşatmak ve dayanışma ruhunu geleceğe taşımak için omuz omuza veriyoruz.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/hakkimizda" 
            className="inline-flex justify-center items-center px-8 py-4 text-base sm:text-lg font-semibold rounded-xl text-white bg-(--color-primary) hover:bg-(--color-primary)/90 shadow-lg shadow-(--color-primary)/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Derneğimizi Tanıyın
          </Link>
          <Link 
            href="/iletisim" 
            className="inline-flex justify-center items-center px-8 py-4 text-base sm:text-lg font-semibold rounded-xl text-white bg-transparent border-2 border-white/80 hover:bg-white hover:text-(--color-primary) transition-all duration-300 hover:-translate-y-0.5"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>
    </section>
  );
}
