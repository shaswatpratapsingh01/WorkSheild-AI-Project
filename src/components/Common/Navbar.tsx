import React from 'react';
import {
  ShieldAlert,
  HardHat,
  Building,
  Globe,
  UserCheck,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { Language, IndustryType, CampusDepartment, WorkerProfile } from '../../types';
import { translations } from '../../locales/translations';

interface NavbarProps {
  currentRole: 'worker' | 'employer';
  onRoleChange: (role: 'worker' | 'employer') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentIndustry: IndustryType;
  campusDept?: CampusDepartment;
  workerProfile: WorkerProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  currentIndustry,
  campusDept,
  workerProfile,
}) => {
  const t = translations[language];

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-[37px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Mission */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20 ring-1 ring-white/20">
              <ShieldAlert className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                  Work<span className="text-teal-400">Shield</span>
                </span>
                <span className="bg-teal-500/10 text-teal-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-teal-500/30 font-mono">
                  AI v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Fair • Safe • Transparent Workforce Intelligence
              </p>
            </div>
          </div>

          {/* Center: Portal Selector (Worker vs Employer) */}
          <nav aria-label="Portal Mode" className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => onRoleChange('worker')}
              aria-label="Switch to Worker Portal"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentRole === 'worker'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>{t.workerPortal}</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('employer')}
              aria-label="Switch to Employer Dashboard"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentRole === 'employer'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t.employerPortal}</span>
            </button>
          </nav>

          {/* Right: Language Selector & User Profile Snippet */}
          <div className="flex items-center gap-3">
            {/* Language Picker */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="language-select" className="sr-only">Select Language</label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-slate-900 text-slate-200">English</option>
                <option value="hi" className="bg-slate-900 text-slate-200">हिंदी (Hindi)</option>
                <option value="ta" className="bg-slate-900 text-slate-200">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Profile badge (Worker mode) or Management badge (Employer mode) */}
            {currentRole === 'worker' ? (
              <div className="hidden md:flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5">
                <img
                  src={workerProfile.avatar}
                  alt={workerProfile.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-teal-500/50"
                />
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-200 leading-tight">
                    {workerProfile.name}
                  </div>
                  <div className="text-[10px] text-teal-400 font-mono">
                    {workerProfile.employeeBadgeNumber}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 bg-teal-950/40 border border-teal-500/30 rounded-xl px-2.5 py-1.5 text-xs text-teal-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>Operations Center</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
