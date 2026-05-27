import Image from "next/image";

export default function AuditLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white animate-pulse">
      {/* Header skeleton */}
      <header className="bg-tio-navy px-8 py-5 flex items-center justify-between">
        <Image
          src="/tio-logo.svg"
          alt="the invisible orthodontist"
          width={130}
          height={50}
          className="brightness-0 invert opacity-60"
        />
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Hero card skeleton */}
        <div className="bg-tio-navy rounded-2xl p-8">
          <div className="flex gap-6">
            {/* Score ring placeholder */}
            <div className="w-[120px] h-[120px] rounded-full bg-white/10 flex-shrink-0" />
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-6 bg-white/10 rounded-lg w-48" />
              <div className="h-4 bg-white/10 rounded-lg w-64" />
              <div className="h-4 bg-white/10 rounded-lg w-full max-w-sm" />
              <div className="h-4 bg-white/10 rounded-lg w-4/5 max-w-xs" />
            </div>
          </div>
          {/* Mini score rings */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-[72px] h-[72px] rounded-full bg-white/10" />
                <div className="h-3 bg-white/10 rounded w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Shimmer cards */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl p-6 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-40" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
