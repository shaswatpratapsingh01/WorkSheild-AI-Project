import React from 'react';
import { Building2, GraduationCap, Shield, Sparkles, Layers } from 'lucide-react';
import { IndustryType, CampusDepartment } from '../../types';

export type FilterValue = 'all' | 'construction' | 'campus-security' | 'campus-housekeeping' | 'campus-maintenance';

interface IndustryFilterProps {
  currentFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const IndustryFilter: React.FC<IndustryFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
      <button
        type="button"
        onClick={() => onFilterChange('all')}
        className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
          currentFilter === 'all'
            ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        All Industries & Sites
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('construction')}
        className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
          currentFilter === 'construction'
            ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
        }`}
      >
        <Building2 className="w-3.5 h-3.5" />
        Construction Sites
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('campus-security')}
        className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
          currentFilter === 'campus-security'
            ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
        }`}
      >
        <Shield className="w-3.5 h-3.5" />
        Campus: Security Staff
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('campus-housekeeping')}
        className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
          currentFilter === 'campus-housekeeping'
            ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
        }`}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        Campus: Housekeeping
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('campus-maintenance')}
        className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
          currentFilter === 'campus-maintenance'
            ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
        }`}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        Campus: Maintenance
      </button>
    </div>
  );
};
