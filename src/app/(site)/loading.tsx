export default function RootLoading() {
  return (
    <div className="w-full animate-pulse flex flex-col bg-gray-50 min-h-screen">
      {/* Slider Skeleton */}
      <div className="h-[60vh] md:h-[85vh] w-full bg-gray-200"></div>
      
      {/* News Grid Skeleton */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        {/* Başlık Alanı */}
        <div className="h-10 bg-gray-200 rounded w-64 md:w-96 mb-8 md:mb-10"></div>
        
        {/* Grid Alanı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-48 w-full bg-gray-200"></div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-4/5 mb-4"></div>
                <div className="mt-auto h-4 bg-gray-200 rounded w-20 self-end"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
