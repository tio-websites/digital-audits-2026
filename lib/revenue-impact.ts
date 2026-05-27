/**
 * Revenue impact estimator.
 *
 * Converts an audit score into an estimated "patients per month you're
 * missing" figure, suitable for use in a sales conversation.
 *
 * Assumptions:
 *  - Monthly website traffic: 500 visitors (conservative orthodontic practice)
 *  - CVR scales linearly: 0.8% (score 0) → 2.8% (score 100)
 *  - Avg patient lifetime value: AUD $4,500
 *
 * The absolute figures are illustrative — the gap between current and
 * benchmark is what matters for the conversation.
 */

const DEFAULT_MONTHLY_TRAFFIC = 500;
const MIN_CVR = 0.008; // 0.8% — poor site
const MAX_CVR = 0.028; // 2.8% — top performer
const AVG_PATIENT_VALUE = 4500; // AUD

export interface RevenueImpact {
  missed_patients: number;
  missed_revenue: number;
  current_cvr_pct: number;
  benchmark_cvr_pct: number;
  monthly_traffic: number;
}

export function calcRevenueImpact(
  overallScore: number,
  monthlyTraffic = DEFAULT_MONTHLY_TRAFFIC
): RevenueImpact {
  // CVR scales linearly with score
  const currentCvr = MIN_CVR + (overallScore / 100) * (MAX_CVR - MIN_CVR);
  const benchmarkCvr = MAX_CVR;

  const missedPatients = Math.max(
    0,
    Math.round(monthlyTraffic * (benchmarkCvr - currentCvr))
  );
  const missedRevenue = missedPatients * AVG_PATIENT_VALUE;

  return {
    missed_patients: missedPatients,
    missed_revenue: missedRevenue,
    current_cvr_pct: Math.round(currentCvr * 1000) / 10, // 1dp
    benchmark_cvr_pct: Math.round(benchmarkCvr * 1000) / 10,
    monthly_traffic: monthlyTraffic,
  };
}
