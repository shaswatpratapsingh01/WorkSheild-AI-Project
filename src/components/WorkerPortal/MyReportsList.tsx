import React, { useState } from 'react';
import {
  SafetyReport,
  ReportStatus,
  Language,
} from '../../types';
import { translations } from '../../locales/translations';
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface MyReportsListProps {
  reports: SafetyReport[];
  language: Language;
  onOpenReportForm: () => void;
}

export const MyReportsList: React.FC<MyReportsListProps> = ({
  reports,
  language,
  onOpenReportForm,
}) => {
  const t = translations[language];
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);

  const filteredReports = reports.filter((r) => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3 text-amber-400" />
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Under Review
          </span>
        );
      case 'Resolved':
        return (
          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Resolved
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Medium':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            Tracked Hazard Complaints ({reports.length})
          </h2>
          <p className="text-xs text-slate-400">
            Real-time status of your workplace safety submissions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'Submitted', 'Under Review', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  filterStatus === st
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenReportForm}
            className="px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition shadow-sm shadow-teal-500/20 cursor-pointer"
          >
            + New Report
          </button>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
          <AlertTriangle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-300">No reports found for this filter</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You currently have no complaints matching the selected filter status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-4 sm:p-5 transition shadow-sm cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {report.ticketId}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getSeverityBadge(
                      report.severity
                    )}`}
                  >
                    {report.severity} Severity
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {report.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">{report.timestamp}</span>
                  {getStatusBadge(report.status)}
                </div>
              </div>

              <div className="mt-3 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition">
                    {report.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {report.description}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="font-medium text-slate-300">Location:</span>
                    <span>{report.siteLocation}</span>
                    {report.assignedTo && (
                      <>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">Assigned: {report.assignedTo}</span>
                      </>
                    )}
                  </div>
                </div>

                {report.imageUrl && (
                  <img
                    src={report.imageUrl}
                    alt="Incident photo"
                    className="w-20 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                )}
              </div>

              {/* AI Assessment Sneak Peek */}
              {report.aiAssessment && (
                <div className="mt-3 bg-slate-950/70 border border-teal-500/20 rounded-xl p-2.5 flex items-center justify-between text-xs text-teal-300">
                  <div className="flex items-center gap-2 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="font-semibold text-slate-300 shrink-0">AI Assessment:</span>
                    <span className="truncate text-slate-400">{report.aiAssessment.summary}</span>
                  </div>
                  <span className="text-[10px] text-teal-400 uppercase font-mono tracking-wider shrink-0 ml-2">
                    {report.aiAssessment.suggestedPriority} PRIORITY
                  </span>
                </div>
              )}

              {/* Manager Resolution Notes if Resolved */}
              {report.status === 'Resolved' && report.managerNotes && (
                <div className="mt-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-2.5 text-xs text-emerald-300">
                  <span className="font-semibold">Safety Resolution Note: </span>
                  <span>{report.managerNotes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedReport.ticketId}
                  </span>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <h3 className="text-lg font-bold text-white">{selectedReport.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium mb-1">Hazard Description</span>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed text-sm">
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.imageUrl && (
                <div>
                  <span className="text-slate-400 block font-medium mb-1">Photo Evidence</span>
                  <img
                    src={selectedReport.imageUrl}
                    alt="Hazard"
                    className="w-full max-h-60 rounded-xl object-cover border border-slate-800"
                  />
                </div>
              )}

              {selectedReport.aiAssessment && (
                <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Safety Assistant Assessment</span>
                  </div>
                  <p className="text-slate-300">{selectedReport.aiAssessment.summary}</p>
                  <div className="text-emerald-300">
                    <strong>Recommended Action:</strong> {selectedReport.aiAssessment.recommendedAction}
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">
                    OSHA / Ref: {selectedReport.aiAssessment.regulationsReference}
                  </div>
                  <div className="text-[10px] text-amber-300/80 bg-slate-900 p-2 rounded border border-amber-500/20">
                    ⚠️ {selectedReport.aiAssessment.disclaimer}
                  </div>
                </div>
              )}

              {selectedReport.managerNotes && (
                <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3.5">
                  <span className="font-bold text-emerald-400 block mb-1">Manager Resolution Note</span>
                  <p className="text-slate-200">{selectedReport.managerNotes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
