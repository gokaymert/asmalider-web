export default function LoadingAllNews() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık İskeleti */}
        <div className="mb-12 border-b border-gray-200 pb-8 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-12 bg-gray-300 rounded w-3/4 max-w-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full max-w-2xl"></div>
        </div>

        {/* Grid İskeleti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div 
              key={item} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse"
            >
              {/* Resim Alanı İskeleti */}
              <div className="h-52 w-full bg-gray-200"></div>
              
              {/* Metin Alanı İskeleti */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-4/5 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
