import React from 'react';
import { Info, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { IndustryType, CampusDepartment } from '../../types';

interface DemoBannerProps {
  currentIndustry: IndustryType;
  campusDept?: CampusDepartment;
  onSwitchIndustry: (ind: IndustryType, dept?: CampusDepartment) => void;
  langText: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  currentIndustry,
  campusDept,
  onSwitchIndustry,
  langText,
}) => {
  return (
    <aside aria-label="Demo environment notification" className="bg-slate-900/90 border-b border-teal-500/30 text-xs py-2 px-4 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="flex items-center gap-1 font-semibold text-teal-400 bg-teal-950/60 border border-teal-500/40 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            DEMO MODE
          </span>
          <span>{langText}</span>
          <span className="hidden lg:inline text-slate-400">
            • AI hazard assessments are assistive suggestions, not verified facts.
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Quick Switch Context:</span>
          <button
            type="button"
            onClick={() => onSwitchIndustry('construction')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition text-xs font-medium cursor-pointer ${
              currentIndustry === 'construction'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Construction Site
          </button>

          <button
            type="button"
            onClick={() => onSwitchIndustry('campus', 'security')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition text-xs font-medium cursor-pointer ${
              currentIndustry === 'campus' && campusDept === 'security'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Campus: Security
          </button>

          <button
            type="button"
            onClick={() => onSwitchIndustry('campus', 'housekeeping')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition text-xs font-medium cursor-pointer ${
              currentIndustry === 'campus' && campusDept === 'housekeeping'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Campus: Housekeeping
          </button>

          <button
            type="button"
            onClick={() => onSwitchIndustry('campus', 'maintenance')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition text-xs font-medium cursor-pointer ${
              currentIndustry === 'campus' && campusDept === 'maintenance'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Campus: Maintenance
          </button>
        </div>
      </div>
    </aside>
  );
};
