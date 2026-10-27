import React, { useState } from 'react';
import {
  HardHat,
  ShieldAlert,
  Building2,
  GraduationCap,
  FileText,
  MessageSquareOff,
  Award,
  DollarSign,
  AlertTriangle,
  Info,
  PhoneCall,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  IndustryType,
  CampusDepartment,
  Language,
  SafetyReport,
  AnonymousFeedback,
  ReportStatus,
} from './types';
import {
  MOCK_WORKERS,
  MOCK_ATTENDANCE,
  MOCK_SALARY_SLIPS,
  MOCK_SAFETY_REPORTS,
  MOCK_ANONYMOUS_FEEDBACK,
  MOCK_CERTIFICATES,
  MOCK_FATIGUE_ASSESSMENTS,
} from './data/mockData';
import { calculateFatigueRisk } from './utils/fatigue';
import { translations } from './locales/translations';
import { DemoBanner } from './components/Common/DemoBanner';
import { Navbar } from './components/Common/Navbar';
import { WorkerDashboard } from './components/WorkerPortal/WorkerDashboard';
import { SafetyReportForm } from './components/WorkerPortal/SafetyReportForm';
import { MyReportsList } from './components/WorkerPortal/MyReportsList';
import { AnonymousFeedbackForm } from './components/WorkerPortal/AnonymousFeedbackForm';
import { SkillPassport } from './components/WorkerPortal/SkillPassport';
import { SalaryBreakdownModal } from './components/WorkerPortal/SalaryBreakdownModal';
import { EmployerOverview } from './components/EmployerDashboard/EmployerOverview';

export default function App() {
  // Global App State
  const [role, setRole] = useState<'worker' | 'employer'>('worker');
  const [industry, setIndustry] = useState<IndustryType>('construction');
  const [campusDept, setCampusDept] = useState<CampusDepartment | undefined>(undefined);
  const [language, setLanguage] = useState<Language>('en');

  // Worker Navigation
  const [workerTab, setWorkerTab] = useState<'dashboard' | 'report' | 'my-reports' | 'feedback' | 'passport'>('dashboard');

  // Modals
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

  // Data State (mutable during session)
  const [reports, setReports] = useState<SafetyReport[]>(MOCK_SAFETY_REPORTS);
  const [feedbacks, setFeedbacks] = useState<AnonymousFeedback[]>(MOCK_ANONYMOUS_FEEDBACK);
  const [attendanceMap, setAttendanceMap] = useState(MOCK_ATTENDANCE);

  // Active Worker Profile
  const getActiveWorkerKey = () => {
    if (industry === 'construction') return 'construction_lead';
    if (campusDept === 'security') return 'campus_security';
    if (campusDept === 'housekeeping') return 'campus_housekeeping';
    if (campusDept === 'maintenance') return 'campus_maintenance';
    return 'campus_security';
  };

  const activeWorker = MOCK_WORKERS[getActiveWorkerKey()];
  const activeAttendance = attendanceMap[activeWorker.id] || MOCK_ATTENDANCE['W-CONST-101'];
  const activeSalary = MOCK_SALARY_SLIPS[activeWorker.id] || MOCK_SALARY_SLIPS['W-CONST-101'];
  const activeCertificates = MOCK_CERTIFICATES[activeWorker.id] || MOCK_CERTIFICATES['W-CONST-101'];

  // Calculate live fatigue for active worker
  const activeFatigue = calculateFatigueRisk({
    workerId: activeWorker.id,
    workerName: activeWorker.name,
    weeklyHours: activeAttendance.reduce((a, b) => a + b.regularHours + b.overtimeHours, 0),
    consecutiveDays: activeAttendance.length,
    shiftHoursToday: activeAttendance[0] ? activeAttendance[0].regularHours + activeAttendance[0].overtimeHours : 8,
    restIntervalHours: activeWorker.id === 'W-CAMP-201' ? 7.0 : 9.5,
  });

  // Toast / notification banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleSwitchIndustry = (ind: IndustryType, dept?: CampusDepartment) => {
    setIndustry(ind);
    setCampusDept(dept);
    showToast(`Switched context to: ${ind === 'construction' ? 'Construction Site' : `Campus (${dept || 'General'})`}`);
  };

  const handleAddNewReport = (newReport: SafetyReport) => {
    setReports((prev) => [newReport, ...prev]);
    showToast(`Safety complaint ticket ${newReport.ticketId} created successfully!`);
  };

  const handleUpdateReportStatus = (
    reportId: string,
    newStatus: ReportStatus,
    notes?: string,
    assignedTo?: string
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: newStatus,
              managerNotes: notes !== undefined ? notes : r.managerNotes,
              assignedTo: assignedTo !== undefined ? assignedTo : r.assignedTo,
              resolvedAt: newStatus === 'Resolved' ? new Date().toLocaleString() : r.resolvedAt,
            }
          : r
      )
    );
    showToast(`Ticket status updated to "${newStatus}"`);
  };

  const handleAddAnonymousFeedback = (newFb: AnonymousFeedback) => {
    setFeedbacks((prev) => [newFb, ...prev]);
    showToast('Anonymous feedback submitted without worker metadata.');
  };

  const handleUpdateFeedbackStatus = (id: string, newStatus: AnonymousFeedback['status']) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    );
    showToast(`Feedback status updated to ${newStatus}`);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* 1. Demo Mode Notification Banner */}
      <DemoBanner
        currentIndustry={industry}
        campusDept={campusDept}
        onSwitchIndustry={handleSwitchIndustry}
        langText={t.demoDataLabel}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        currentRole={role}
        onRoleChange={setRole}
        language={language}
        onLanguageChange={setLanguage}
        currentIndustry={industry}
        campusDept={campusDept}
        workerProfile={activeWorker}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <aside
          aria-label="Status notification"
          className="fixed bottom-6 right-6 z-50 bg-teal-950 border border-teal-500/50 text-teal-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-teal-400/60 hover:text-teal-200 ml-2"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {role === 'worker' ? (
          <div className="space-y-6">
            {/* Worker Sub-navigation Tabs */}
            <nav aria-label="Worker Portal Sections" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-1.5 flex items-center justify-between overflow-x-auto gap-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setWorkerTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    workerTab === 'dashboard'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{t.overview}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkerTab('report')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    workerTab === 'report'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{t.reportHazard}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkerTab('my-reports')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    workerTab === 'my-reports'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.myReports}</span>
                  <span className="bg-slate-950 text-slate-300 px-1.5 py-0.2 rounded text-[10px]">
                    {reports.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkerTab('feedback')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    workerTab === 'feedback'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <MessageSquareOff className="w-3.5 h-3.5" />
                  <span>{t.anonymousFeedback}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkerTab('passport')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    workerTab === 'passport'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.skillPassport}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded text-[10px]">
                    {activeCertificates.length}
                  </span>
                </button>
              </div>

              {/* Pay slip quick button */}
              <button
                type="button"
                onClick={() => setIsSalaryModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-teal-500/30 text-teal-300 text-xs font-semibold transition cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                <span>{t.viewPaySlip}</span>
              </button>
            </nav>

            {/* Worker Views */}
            {workerTab === 'dashboard' && (
              <WorkerDashboard
                worker={activeWorker}
                attendance={activeAttendance}
                salary={activeSalary}
                fatigue={activeFatigue}
                language={language}
                onOpenSalaryModal={() => setIsSalaryModalOpen(true)}
                onNavigateToReport={() => setWorkerTab('report')}
                onUpdateAttendance={(newAtt) =>
                  setAttendanceMap((prev) => ({ ...prev, [activeWorker.id]: newAtt }))
                }
              />
            )}

            {workerTab === 'report' && (
              <SafetyReportForm
                worker={activeWorker}
                language={language}
                onSubmitSuccess={handleAddNewReport}
              />
            )}

            {workerTab === 'my-reports' && (
              <MyReportsList
                reports={reports}
                language={language}
                onOpenReportForm={() => setWorkerTab('report')}
              />
            )}

            {workerTab === 'feedback' && (
              <AnonymousFeedbackForm
                feedbacks={feedbacks}
                industry={industry}
                department={campusDept}
                siteLocation={activeWorker.siteName}
                language={language}
                onAddFeedback={handleAddAnonymousFeedback}
              />
            )}

            {workerTab === 'passport' && (
              <SkillPassport
                worker={activeWorker}
                certificates={activeCertificates}
                language={language}
              />
            )}
          </div>
        ) : (
          /* Employer View */
          <EmployerOverview
            reports={reports}
            feedbacks={feedbacks}
            fatigueAssessments={MOCK_FATIGUE_ASSESSMENTS}
            language={language}
            onUpdateReportStatus={handleUpdateReportStatus}
            onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
          />
        )}
      </main>

      {/* Salary Breakdown Transparent Modal */}
      <SalaryBreakdownModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        salary={activeSalary}
        worker={activeWorker}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold text-xs">
              WS
            </div>
            <span>
              <strong>WorkShield AI</strong> — Make work fairer, safer, and more transparent.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              24/7 Site Safety Hotline: 1800-SAFE-WORK
            </span>
            <span>•</span>
            <span>OSHA & Fair Labor Standards Aligned</span>
            <span>•</span>
            <span>AI Assessments are Recommendations, Not Verified Facts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
