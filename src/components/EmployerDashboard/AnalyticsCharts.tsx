import React from 'react';
import { BarChart3, PieChart, ShieldCheck, Clock, Zap, AlertTriangle } from 'lucide-react';
import { SafetyReport } from '../../types';

interface AnalyticsChartsProps {
  reports: SafetyReport[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ reports }) => {
  // Category counts
  const categoryCounts: Record<string, number> = {
    'Electrical Hazards': 0,
    'Falls & Heights': 0,
    'Unsafe Equipment': 0,
    'Sanitation & Hygiene': 0,
    'Chemical & Hazardous': 0,
    'Excessive Hours': 0,
  };

  reports.forEach((r) => {
    if (r.category.includes('Electrical')) categoryCounts['Electrical Hazards']++;
    else if (r.category.includes('Falls')) categoryCounts['Falls & Heights']++;
    else if (r.category.includes('Equipment')) categoryCounts['Unsafe Equipment']++;
    else if (r.category.includes('Sanitation')) categoryCounts['Sanitation & Hygiene']++;
    else if (r.category.includes('Chemical')) categoryCounts['Chemical & Hazardous']++;
    else if (r.category.includes('Excessive')) categoryCounts['Excessive Hours']++;
    else categoryCounts['Unsafe Equipment']++;
  });

  const maxCatCount = Math.max(...Object.values(categoryCounts), 1);

  // Status stats
  const totalReports = reports.length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;
  const underReviewCount = reports.filter((r) => r.status === 'Under Review').length;
  const submittedCount = reports.filter((r) => r.status === 'Submitted').length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Distribution by Category */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-400" />
                Hazard Incidents by Category
              </h4>
              <p className="text-xs text-slate-400">
                Frequency distribution across Construction and Campus operations
              </p>
            </div>
            <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              Demo Data
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / maxCatCount) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat}</span>
                    <span className="font-mono text-teal-400 font-bold">{count} tickets</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(10, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolution Rate & Safety Performance KPIs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Safety Ticket Resolution Pipeline
                </h4>
                <p className="text-xs text-slate-400">
                  Tracking response velocity and hazard mitigation
                </p>
              </div>
              <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                Demo Data
              </span>
            </div>

            {/* Circular / Large Rate Indicator */}
            <div className="flex items-center gap-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/40 flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-extrabold text-teal-400 font-mono">
                  {resolutionRate}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                  Resolved
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Mean Time to Remediation: 3.4 Hours</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Complaints are prioritized dynamically by the AI Safety Assistant based on OSHA risk levels and immediately dispatched to on-site supervisors.
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">SUBMITTED</span>
              <span className="text-lg font-bold text-amber-400 font-mono">{submittedCount}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">IN REVIEW</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">{underReviewCount}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">RESOLVED</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{resolvedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
