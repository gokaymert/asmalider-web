export default function PageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse flex flex-col space-y-8 ${className}`.trim()}>
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
