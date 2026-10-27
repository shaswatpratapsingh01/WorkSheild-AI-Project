import React from 'react';
import { AlertOctagon, AlertTriangle, BatteryWarning, Moon, ShieldAlert } from 'lucide-react';
import { FatigueAssessment, Language } from '../../types';
import { translations } from '../../locales/translations';

interface FatigueWarningBannerProps {
  fatigue: FatigueAssessment;
  language: Language;
}

export const FatigueWarningBanner: React.FC<FatigueWarningBannerProps> = ({
  fatigue,
  language,
}) => {
  const t = translations[language];

  if (fatigue.riskLevel === 'Normal') {
    return null;
  }

  const isSevere = fatigue.riskLevel === 'Severe';

  return (
    <aside
      aria-label="Fatigue hazard alert"
      className={`rounded-2xl p-4 sm:p-5 border transition shadow-lg ${
        isSevere
          ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-rose-950/20'
          : 'bg-amber-950/40 border-amber-500/50 text-amber-200 shadow-amber-950/20'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
              isSevere
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}
          >
            {isSevere ? (
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                {isSevere ? t.severeRisk : t.highRisk}
              </span>
              <span className="bg-slate-900/80 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                Fatigue Score: {fatigue.fatigueScore}/100
              </span>
            </div>
            <p className="text-xs mt-1 text-slate-200 leading-relaxed max-w-2xl">
              {fatigue.advisoryText}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
          <span className="text-[11px] text-slate-300 flex items-center gap-1">
            <Moon className="w-3.5 h-3.5" />
            Mandatory Rest:
          </span>
          <span className="font-mono text-sm font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/10">
            {fatigue.recommendedRestHours} Hours Required
          </span>
        </div>
      </div>
    </aside>
  );
};
