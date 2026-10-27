import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  Moon,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  HeartPulse,
} from 'lucide-react';
import { FatigueAssessment } from '../../types';

interface FatigueHealthInsightsProps {
  fatigueAssessments: FatigueAssessment[];
}

export const FatigueHealthInsights: React.FC<FatigueHealthInsightsProps> = ({
  fatigueAssessments,
}) => {
  const [reliefNotified, setReliefNotified] = useState<Record<string, boolean>>({});

  const highRiskWorkers = fatigueAssessments.filter(
    (f) => f.riskLevel === 'High' || f.riskLevel === 'Severe'
  );

  const handleNotifyRelief = (workerId: string) => {
    setReliefNotified((prev) => ({ ...prev, [workerId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with AI Workplace Health Insights */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6 text-teal-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Proactive Workforce Fatigue & Ergonomic Risk Radar
                </h3>
                <span className="bg-teal-500/10 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-teal-500/30 font-semibold">
                  AI HEALTH PREDICTIVE ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                WorkShield AI analyzes consecutive shift logs, night rotations, and overtime duration to predict cognitive fatigue, preventing falls, vehicular mishaps, and industrial accidents before they happen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-center min-w-[120px]">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Fatigued Staff</span>
              <span className="text-xl font-extrabold text-rose-400 font-mono">
                {highRiskWorkers.length} Flagged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Proactive Recommendations Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            AI Recommendation: Construction Rigging Sector
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Metro Station Sector 4 rigging specialists have logged <strong>32.5 collective overtime hours</strong> in 4 days. Micro-sleep probability increases by <strong>3.8x</strong> above 54 weekly hours.
          </p>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-teal-300">
            <strong>Suggested Intervention:</strong> Enforce 12-hour mandatory off-site recovery break before hoisting precast concrete segments.
          </div>
        </div>

        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            AI Recommendation: Campus Security Night Patrol
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            University night security roster shows <strong>Marcus Vance</strong> has completed 7 consecutive 14-hour overnight shifts. Reaction times may be degraded by up to <strong>45%</strong>.
          </p>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-rose-300">
            <strong>Mandatory Protocol:</strong> Authorize emergency temporary contractor relief and cap shifts at maximum 10 hours.
          </div>
        </div>
      </div>

      {/* Flagged Worker Cards Grid */}
      <div>
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-400" />
          Monitored Workers Fatigue Spectrum
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fatigueAssessments.map((item) => {
            const isSevere = item.riskLevel === 'Severe';
            const isHigh = item.riskLevel === 'High';
            const isNotified = reliefNotified[item.workerId];

            return (
              <div
                key={item.workerId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="text-sm font-bold text-white">{item.workerName}</h5>
                      <span className="text-[11px] font-mono text-teal-400">{item.workerId}</span>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono ${
                        isSevere
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : isHigh
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.riskLevel} Fatigue ({item.fatigueScore}/100)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs mb-3">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Weekly Hours</span>
                      <span className="font-mono font-bold text-slate-200">{item.weeklyHours}h</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Today's Shift</span>
                      <span className="font-mono font-bold text-slate-200">{item.shiftHoursToday}h</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Consecutive</span>
                      <span className="font-mono font-bold text-slate-200">{item.consecutiveDays} days</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.advisoryText}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-teal-400" />
                    Recommended Rest: <strong>{item.recommendedRestHours} hrs</strong>
                  </span>

                  {item.actionRequired && (
                    <button
                      type="button"
                      onClick={() => handleNotifyRelief(item.workerId)}
                      disabled={isNotified}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isNotified
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                          : 'bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold shadow-sm'
                      }`}
                    >
                      {isNotified ? 'Relief Dispatched ✓' : 'Dispatch Relief Shift'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
