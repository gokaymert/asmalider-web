import { ArrowLeft } from "lucide-react";

export default function LoadingNewsDetail() {
  return (
    <main className="min-h-screen bg-(--color-light) py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        
        {/* Geri Dön Butonu İskeleti */}
        <div className="mb-8 flex items-center gap-2 text-gray-400">
          <ArrowLeft size={16} />
          <div className="h-5 bg-gray-200 rounded w-32"></div>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Hero Görseli İskeleti (Geniş gri dikdörtgen) */}
          <div className="w-full h-[300px] md:h-[400px] bg-gray-200"></div>

          <div className="p-6 md:p-10 lg:p-12">
            
            {/* Başlık İskeleti (Kalın gri satırlar) */}
            <div className="h-10 md:h-12 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded w-3/4 mb-6"></div>
            
            {/* Meta Bilgileri İskeleti */}
            <div className="flex gap-4 mb-10 pb-10 border-b border-gray-100">
              <div className="h-8 bg-gray-200 rounded-full w-24"></div>
              <div className="h-8 bg-gray-200 rounded-full w-32"></div>
            </div>

            {/* Paragraflar İskeleti (İnce gri satırlar) */}
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-11/12"></div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            </div>
            
            <div className="space-y-4 mt-8">
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-10/12"></div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
            </div>

          </div>
        </article>

      </div>
    </main>
  );
}
