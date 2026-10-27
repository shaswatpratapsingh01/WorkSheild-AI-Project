import React, { useState } from 'react';
import {
  Clock,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Play,
  Square,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  WorkerProfile,
  AttendanceRecord,
  SalaryBreakdown,
  FatigueAssessment,
  Language,
} from '../../types';
import { translations } from '../../locales/translations';
import { FatigueWarningBanner } from './FatigueWarningBanner';

interface WorkerDashboardProps {
  worker: WorkerProfile;
  attendance: AttendanceRecord[];
  salary: SalaryBreakdown;
  fatigue: FatigueAssessment;
  language: Language;
  onOpenSalaryModal: () => void;
  onNavigateToReport: () => void;
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  worker,
  attendance,
  salary,
  fatigue,
  language,
  onOpenSalaryModal,
  onNavigateToReport,
  onUpdateAttendance,
}) => {
  const t = translations[language];

  // Clock in state
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockActionMsg, setClockActionMsg] = useState<string | null>(null);

  const handleToggleClock = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockActionMsg('Clocked out successfully at ' + new Date().toLocaleTimeString());
    } else {
      setIsClockedIn(true);
      setClockActionMsg('Clocked in successfully at ' + new Date().toLocaleTimeString());
    }
    setTimeout(() => setClockActionMsg(null), 3500);
  };

  const totalWeeklyHours = attendance.reduce((acc, curr) => acc + curr.regularHours + curr.overtimeHours, 0);
  const totalOvertime = attendance.reduce((acc, curr) => acc + curr.overtimeHours, 0);

  return (
    <div className="space-y-6">
      {/* Worker Hero Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/40 shadow-lg shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{worker.name}</h1>
                <span className="bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
                  {worker.employeeBadgeNumber}
                </span>
                <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full capitalize">
                  {worker.industry === 'construction' ? 'Construction Site' : `Campus: ${worker.department || 'Staff'}`}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-medium">{worker.role}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <span>Active Worksite:</span>
                <span className="text-slate-400 font-semibold">{worker.siteName}</span>
              </p>
            </div>
          </div>

          {/* Clock In / Out action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleToggleClock}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${
                isClockedIn
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-extrabold shadow-emerald-500/20'
              }`}
            >
              {isClockedIn ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{t.clockOut} (Shift Active)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.clockIn} (Start Shift)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onNavigateToReport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.reportHazard}</span>
            </button>
          </div>
        </div>

        {clockActionMsg && (
          <div className="mt-4 bg-teal-950/40 border border-teal-500/40 rounded-xl p-2.5 text-xs text-teal-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
            <span>{clockActionMsg}</span>
          </div>
        )}
      </div>

      {/* Fatigue Alert Warning (if elevated) */}
      <FatigueWarningBanner fatigue={fatigue} language={language} />

      {/* 4 Core Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weekly Hours */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.weeklyHours}</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {totalWeeklyHours.toFixed(1)} <span className="text-xs text-slate-400 font-sans font-normal">hrs</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all ${
                  totalWeeklyHours > 52 ? 'bg-rose-400' : totalWeeklyHours > 44 ? 'bg-amber-400' : 'bg-teal-400'
                }`}
                style={{ width: `${Math.min(100, (totalWeeklyHours / 60) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Standard ceiling: 48.0 hrs / week
            </span>
          </div>
        </div>

        {/* Overtime Hours */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.overtimeHours}</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono">
            {totalOvertime.toFixed(1)} <span className="text-xs text-slate-400 font-sans font-normal">hrs</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Paid at 1.5x base rate (${(worker.hourlyRate * 1.5).toFixed(2)}/hr)
          </p>
        </div>

        {/* Fatigue Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.fatigueRisk}</span>
            <AlertTriangle className={`w-4 h-4 ${fatigue.fatigueScore > 50 ? 'text-rose-400' : 'text-teal-400'}`} />
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xl font-extrabold font-mono ${
                fatigue.riskLevel === 'Severe'
                  ? 'text-rose-400'
                  : fatigue.riskLevel === 'High'
                  ? 'text-amber-400'
                  : 'text-teal-300'
              }`}
            >
              {fatigue.riskLevel}
            </span>
            <span className="text-xs text-slate-400 font-mono">({fatigue.fatigueScore}/100)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 truncate">
            {fatigue.consecutiveDays} consecutive shifts logged
          </p>
        </div>

        {/* Transparent Salary Preview */}
        <div className="bg-gradient-to-br from-slate-900 to-teal-950/30 border border-teal-500/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{t.totalEarnings}</span>
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-extrabold text-teal-400 font-mono">
              ${salary.netPay.toFixed(2)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gross: ${salary.grossPay.toFixed(2)} • Net Take-Home
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenSalaryModal}
            className="mt-3 text-xs text-teal-300 hover:text-teal-200 font-bold underline flex items-center gap-1 cursor-pointer"
          >
            {t.viewPaySlip} &rarr;
          </button>
        </div>
      </div>

      {/* Attendance & Working Hours Log */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              {t.attendanceHistory}
            </h3>
            <p className="text-xs text-slate-400">
              Shift hours verified by digital biometric & NFC log
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            Base Wage: ${worker.hourlyRate.toFixed(2)}/hr
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Shift</th>
                <th className="pb-3">Clock In</th>
                <th className="pb-3">Clock Out</th>
                <th className="pb-3">Regular Hrs</th>
                <th className="pb-3">Overtime</th>
                <th className="pb-3 pr-2">Fatigue Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {attendance.map((att) => (
                <tr key={att.id} className="hover:bg-slate-850/60 transition">
                  <td className="py-3 pl-2 text-slate-200">{att.date}</td>
                  <td className="py-3">
                    <span className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                      {att.shiftType}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-slate-300">{att.clockIn}</td>
                  <td className="py-3 font-mono text-slate-300">{att.clockOut}</td>
                  <td className="py-3 font-mono text-slate-300">{att.regularHours}h</td>
                  <td className="py-3 font-mono">
                    {att.overtimeHours > 0 ? (
                      <span className="text-amber-400 font-bold">+{att.overtimeHours}h OT</span>
                    ) : (
                      <span className="text-slate-500">0h</span>
                    )}
                  </td>
                  <td className="py-3 pr-2">
                    {att.fatigueFlag ? (
                      <span className="bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Overtime Flagged
                      </span>
                    ) : (
                      <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Compliant
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
