"use client";

interface RevenueImpact {
  missed_patients: number;
  missed_revenue: number;
  current_cvr_pct: number;
  benchmark_cvr_pct: number;
  monthly_traffic: number;
}

interface Props {
  revenueImpact: RevenueImpact;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function RevenueImpactCard({ revenueImpact }: Props) {
  const { missed_patients, missed_revenue, current_cvr_pct, benchmark_cvr_pct, monthly_traffic } = revenueImpact;

  // Bar chart: widths as percentage of benchmark (capped at 100%)
  const maxCvr = Math.max(benchmark_cvr_pct, current_cvr_pct, 0.01);
  const currentBarWidth = Math.min((current_cvr_pct / maxCvr) * 100, 100);
  const benchmarkBarWidth = 100;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-5">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-lg">
          ⚠️
        </div>
        <div>
          <h2 className="text-base font-semibold text-amber-900 leading-tight">
            Estimated{" "}
            <span className="text-amber-700">
              {missed_patients.toLocaleString()} patient{missed_patients === 1 ? "" : "s"}/month
            </span>{" "}
            you&apos;re missing out on
          </h2>
          <p className="text-sm text-amber-800 mt-1">
            Potential revenue gap:{" "}
            <strong className="text-amber-900">{formatCurrency(missed_revenue)}/month</strong>
            {" "}based on {monthly_traffic.toLocaleString()} monthly visitors
          </p>
        </div>
      </div>

      {/* CVR comparison */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
          Conversion rate comparison
        </p>

        {/* Current CVR bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-amber-700 font-medium">This practice</span>
            <span className="text-xs font-bold text-amber-900 tabular-nums">
              {current_cvr_pct.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden border border-amber-200">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${currentBarWidth}%` }}
            />
          </div>
        </div>

        {/* Benchmark CVR bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-amber-700 font-medium">Industry benchmark</span>
            <span className="text-xs font-bold text-amber-900 tabular-nums">
              {benchmark_cvr_pct.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden border border-amber-200">
            <div
              className="h-full bg-tio-navy rounded-full transition-all duration-700"
              style={{ width: `${benchmarkBarWidth}%` }}
            />
          </div>
        </div>

        {/* Gap callout */}
        {benchmark_cvr_pct > current_cvr_pct && (
          <div className="flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-xs text-amber-800">
              A{" "}
              <strong>{(benchmark_cvr_pct - current_cvr_pct).toFixed(1)} percentage point</strong>{" "}
              gap separates this practice from the industry benchmark.
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-amber-600 leading-relaxed border-t border-amber-200 pt-4">
        Estimates based on industry conversion benchmarks. Actual results depend on traffic volume and local market.
      </p>
    </div>
  );
}
