import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileCheck2,
  HeartPulse,
  MessageSquareOff,
  BarChart3,
  Building2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import {
  SafetyReport,
  AnonymousFeedback,
  FatigueAssessment,
  ReportStatus,
  Language,
} from '../../types';
import { IndustryFilter, FilterValue } from './IndustryFilter';
import { SafetyComplaintsManager } from './SafetyComplaintsManager';
import { FatigueHealthInsights } from './FatigueHealthInsights';
import { AnonymousFeedbackTrends } from './AnonymousFeedbackTrends';
import { AnalyticsCharts } from './AnalyticsCharts';
import { translations } from '../../locales/translations';

interface EmployerOverviewProps {
  reports: SafetyReport[];
  feedbacks: AnonymousFeedback[];
  fatigueAssessments: FatigueAssessment[];
  language: Language;
  onUpdateReportStatus: (reportId: string, newStatus: ReportStatus, notes?: string, assignedTo?: string) => void;
  onUpdateFeedbackStatus: (id: string, newStatus: AnonymousFeedback['status']) => void;
}

export const EmployerOverview: React.FC<EmployerOverviewProps> = ({
  reports,
  feedbacks,
  fatigueAssessments,
  language,
  onUpdateReportStatus,
  onUpdateFeedbackStatus,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'complaints' | 'fatigue' | 'feedback' | 'analytics'>('complaints');
  const [industryFilter, setIndustryFilter] = useState<FilterValue>('all');

  // Filter reports by selected industry
  const filteredReports = reports.filter((r) => {
    if (industryFilter === 'all') return true;
    if (industryFilter === 'construction') return r.industry === 'construction';
    if (industryFilter === 'campus-security') return r.industry === 'campus' && r.department === 'security';
    if (industryFilter === 'campus-housekeeping') return r.industry === 'campus' && r.department === 'housekeeping';
    if (industryFilter === 'campus-maintenance') return r.industry === 'campus' && r.department === 'maintenance';
    return true;
  });

  // Filter feedback
  const filteredFeedback = feedbacks.filter((f) => {
    if (industryFilter === 'all') return true;
    if (industryFilter === 'construction') return f.industry === 'construction';
    if (industryFilter === 'campus-security') return f.industry === 'campus' && f.department === 'security';
    if (industryFilter === 'campus-housekeeping') return f.industry === 'campus' && f.department === 'housekeeping';
    if (industryFilter === 'campus-maintenance') return f.industry === 'campus' && f.department === 'maintenance';
    return true;
  });

  // Compute metrics
  const openHazardsCount = filteredReports.filter((r) => r.status !== 'Resolved').length;
  const criticalHazardsCount = filteredReports.filter((r) => r.severity === 'Critical' && r.status !== 'Resolved').length;
  const highFatigueCount = fatigueAssessments.filter((f) => f.riskLevel === 'High' || f.riskLevel === 'Severe').length;

  return (
    <div className="space-y-6">
      {/* Employer Command Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              Cross-Industry Workforce Health Command Center
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              WorkShield Management Hub
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Monitoring workforce safety, overtime compliance, and anonymous worker voice across Construction and University Campus sites.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-teal-500/30 rounded-xl p-3 text-xs text-teal-300 font-medium">
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>AI Real-time Safety Triage Active</span>
          </div>
        </div>

        {/* Industry Filter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Filter Operations:</span>
            <IndustryFilter currentFilter={industryFilter} onFilterChange={setIndustryFilter} />
          </div>

          <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            {filteredReports.length} reports in scope
          </span>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Workers */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.totalActiveWorkers}</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">148</div>
          <p className="text-[11px] text-slate-400 mt-2">
            Construction: 86 • Campus: 62
          </p>
        </div>

        {/* Open Safety Hazards */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.openSafetyHazards}</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-300 font-mono">
              {openHazardsCount}
            </span>
            {criticalHazardsCount > 0 && (
              <span className="text-xs font-bold text-rose-400 font-mono">
                ({criticalHazardsCount} Critical!)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {filteredReports.filter((r) => r.status === 'Resolved').length} resolved this cycle
          </p>
        </div>

        {/* Fatigue Alerts */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.fatigueAlertsCount}</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">
            {highFatigueCount} Workers
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Immediate shift rotation recommended
          </p>
        </div>

        {/* Anonymous Worker Voice */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.feedbackTrends}</span>
            <MessageSquareOff className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-teal-300 font-mono">
            {filteredFeedback.length} Concerns
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Top topic: Safety Gear & Overtime Pay
          </p>
        </div>
      </div>

      {/* Main Subtabs Navigation */}
      <div className="border-b border-slate-800 flex gap-2 overflow-x-auto text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('complaints')}
          className={`flex items-center gap-2 pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeTab === 'complaints'
              ? 'border-teal-400 text-teal-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Safety Complaints & Triage</span>
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[10px]">
            {filteredReports.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fatigue')}
          className={`flex items-center gap-2 pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeTab === 'fatigue'
              ? 'border-teal-400 text-teal-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>Fatigue & Health Insights</span>
          {highFatigueCount > 0 && (
            <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded text-[10px] font-bold">
              {highFatigueCount} Alert
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('feedback')}
          className={`flex items-center gap-2 pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeTab === 'feedback'
              ? 'border-teal-400 text-teal-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquareOff className="w-4 h-4" />
          <span>Anonymous Voice & Sentiment</span>
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[10px]">
            {filteredFeedback.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 pb-3 px-3 font-semibold transition border-b-2 cursor-pointer ${
            activeTab === 'analytics'
              ? 'border-teal-400 text-teal-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Incident Analytics & Metrics</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'complaints' && (
          <SafetyComplaintsManager
            reports={filteredReports}
            onUpdateReportStatus={onUpdateReportStatus}
          />
        )}

        {activeTab === 'fatigue' && (
          <FatigueHealthInsights fatigueAssessments={fatigueAssessments} />
        )}

        {activeTab === 'feedback' && (
          <AnonymousFeedbackTrends
            feedbacks={filteredFeedback}
            onUpdateFeedbackStatus={onUpdateFeedbackStatus}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCharts reports={filteredReports} />
        )}
      </div>
    </div>
  );
};
