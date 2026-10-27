import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  ChevronRight,
  User,
  Shield,
  Edit3,
  ExternalLink,
} from 'lucide-react';
import { SafetyReport, ReportStatus, SeverityLevel } from '../../types';

interface SafetyComplaintsManagerProps {
  reports: SafetyReport[];
  onUpdateReportStatus: (reportId: string, newStatus: ReportStatus, notes?: string, assignedTo?: string) => void;
}

export const SafetyComplaintsManager: React.FC<SafetyComplaintsManagerProps> = ({
  reports,
  onUpdateReportStatus,
}) => {
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Status edit state for modal
  const [editingStatus, setEditingStatus] = useState<ReportStatus>('Under Review');
  const [managerNotes, setManagerNotes] = useState('');
  const [assignedOfficer, setAssignedOfficer] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (severityFilter !== 'All' && r.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.ticketId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.siteLocation.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleOpenEdit = (report: SafetyReport) => {
    setSelectedReport(report);
    setEditingStatus(report.status);
    setManagerNotes(report.managerNotes || '');
    setAssignedOfficer(report.assignedTo || 'Lead Safety Officer (Dave Chen)');
    setUpdateSuccess(false);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    onUpdateReportStatus(
      selectedReport.id,
      editingStatus,
      managerNotes.trim() || undefined,
      assignedOfficer.trim() || undefined
    );

    setUpdateSuccess(true);
    setTimeout(() => {
      setSelectedReport(null);
      setUpdateSuccess(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID, title, keyword or location..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'Submitted', 'Under Review', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Severity Dropdown */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Complaints Table / Card List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold">
                <th className="py-3.5 pl-4">Ticket ID</th>
                <th className="py-3.5">Severity</th>
                <th className="py-3.5">Hazard Title & Location</th>
                <th className="py-3.5">Category</th>
                <th className="py-3.5">Reporter</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No safety complaints match the active filters.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-850/60 transition">
                    <td className="py-3 pl-4 font-mono font-bold text-teal-400">
                      {report.ticketId}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          report.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : report.severity === 'High'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                        }`}
                      >
                        {report.severity}
                      </span>
                    </td>
                    <td className="py-3 max-w-xs">
                      <div className="font-semibold text-slate-200 truncate">{report.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{report.siteLocation}</div>
                    </td>
                    <td className="py-3 text-slate-300">
                      <span className="bg-slate-950 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                        {report.category}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">
                      {report.isAnonymous ? (
                        <span className="text-teal-400/80 font-mono text-[11px]">Anonymous Worker</span>
                      ) : (
                        <span>{report.workerName}</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-mono ${
                          report.status === 'Resolved'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : report.status === 'Under Review'
                            ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(report)}
                        className="px-3 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold text-xs transition cursor-pointer"
                      >
                        Review & Update &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail / Update Status Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedReport.ticketId}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Submitted: {selectedReport.timestamp}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedReport.title}</h3>
                <p className="text-xs text-slate-400">{selectedReport.siteLocation}</p>
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
              {/* Full worker description */}
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Worker Hazard Description:</span>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed text-sm">
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.imageUrl && (
                <div>
                  <span className="text-slate-400 block font-semibold mb-1">Attached Incident Image:</span>
                  <img
                    src={selectedReport.imageUrl}
                    alt="Hazard"
                    className="w-full max-h-56 rounded-xl object-cover border border-slate-800"
                  />
                </div>
              )}

              {/* AI Assessment */}
              {selectedReport.aiAssessment && (
                <div className="bg-slate-950 border border-teal-500/40 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-teal-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      AI Hazard Assistant Analysis
                    </span>
                    <span className="font-mono uppercase text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/40">
                      Priority: {selectedReport.aiAssessment.suggestedPriority}
                    </span>
                  </div>
                  <p className="text-slate-300">{selectedReport.aiAssessment.summary}</p>
                  <p className="text-emerald-300">
                    <strong>Recommended Remediation:</strong> {selectedReport.aiAssessment.recommendedAction}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Regulatory Reference: {selectedReport.aiAssessment.regulationsReference}
                  </p>
                  <div className="text-[10px] text-amber-300/80 bg-slate-900 p-2 rounded border border-amber-500/20">
                    ⚠️ {selectedReport.aiAssessment.disclaimer}
                  </div>
                </div>
              )}

              {/* Status Update Form */}
              <form onSubmit={handleSaveStatus} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-teal-400">
                  Update Ticket Management & Resolution
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="update-ticket-status-select" className="text-slate-400 block mb-1 font-semibold">Change Status</label>
                    <select
                      id="update-ticket-status-select"
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as ReportStatus)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
                    >
                      <option value="Submitted">Submitted (Pending Triage)</option>
                      <option value="Under Review">Under Review (Inspection in Progress)</option>
                      <option value="Resolved">Resolved (Safety Clearance Certified)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="assign-safety-officer-input" className="text-slate-400 block mb-1 font-semibold">Assign Safety Inspector</label>
                    <input
                      id="assign-safety-officer-input"
                      type="text"
                      value={assignedOfficer}
                      onChange={(e) => setAssignedOfficer(e.target.value)}
                      placeholder="e.g. Dave Chen (Lead Officer)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="resolution-notes-input" className="text-slate-400 block mb-1 font-semibold">
                    Resolution Notes / Corrective Actions Taken
                  </label>
                  <textarea
                    id="resolution-notes-input"
                    rows={3}
                    value={managerNotes}
                    onChange={(e) => setManagerNotes(e.target.value)}
                    placeholder="Describe actions taken (e.g., Feeder de-energized, guardrails installed, new PPE distributed)..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-400"
                  />
                </div>

                {updateSuccess && (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-lg p-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ticket status updated successfully!</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReport(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-sm cursor-pointer"
                  >
                    Save Status Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
