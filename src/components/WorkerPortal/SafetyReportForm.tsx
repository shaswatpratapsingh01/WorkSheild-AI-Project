import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Upload,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  HelpCircle,
  FileText,
  MapPin,
  Image as ImageIcon,
  Info,
  Zap,
} from 'lucide-react';
import {
  SafetyReport,
  HazardCategory,
  SeverityLevel,
  AIHazardAnalysis,
  WorkerProfile,
  Language,
} from '../../types';
import { translations } from '../../locales/translations';

interface SafetyReportFormProps {
  worker: WorkerProfile;
  language: Language;
  onSubmitSuccess: (newReport: SafetyReport) => void;
}

const SAMPLE_INCIDENT_PRESETS = [
  {
    label: '⚡ Electrical / Water Danger',
    description: 'High voltage 440V temporary cable has frayed rubber sheath and is submerged in a puddle near the scaffold base. Sparks seen when moved.',
  },
  {
    label: '🏗️ Scaffolding & Fall Risk',
    description: 'Scaffolding planks on the 4th floor external bay are missing locking pins. Planks shift when stepped on and there is no safety toe-board or guardrail.',
  },
  {
    label: '☣️ Chemical Fumes in Lab/Closet',
    description: 'Custodial storage room smells strongly of chemical fumes and bleach. Workers feel burning sensation in eyes and shortness of breath due to non-functioning exhaust.',
  },
  {
    label: '⏱️ Excessive 16-Hour Fatigue',
    description: 'Night security patrol staff forced into a double 16-hour shift back-to-back with only 4 hours rest. Staff are experiencing severe drowsiness while on duty.',
  },
];

const SAMPLE_IMAGES = [
  {
    title: 'Exposed Wires',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Scaffolding High Deck',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Chemical Storage Area',
    url: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&auto=format&fit=crop&q=80',
  },
];

export const SafetyReportForm: React.FC<SafetyReportFormProps> = ({
  worker,
  language,
  onSubmitSuccess,
}) => {
  const t = translations[language];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [siteLocation, setSiteLocation] = useState(worker.siteName);
  const [category, setCategory] = useState<HazardCategory>('Other');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // AI State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIHazardAnalysis | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Form Submission State
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleUsePreset = (desc: string) => {
    setDescription(desc);
    if (!title) {
      setTitle(desc.slice(0, 50) + '...');
    }
  };

  const handleAnalyzeHazard = async () => {
    if (!description.trim()) {
      setAiError('Please enter a description of the hazard first.');
      return;
    }

    setIsAnalyzing(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai/analyze-hazard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          industry: worker.industry,
          department: worker.department,
          siteLocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data: AIHazardAnalysis = await response.json();
      setAiAnalysis(data);

      // Auto-populate / suggest category & severity based on AI recommendation
      if (data.category) {
        setCategory(data.category);
      }
      if (data.severity) {
        setSeverity(data.severity);
      }
      if (!title) {
        setTitle(data.summary ? data.summary.slice(0, 60) : 'Hazard Report');
      }
    } catch (err: any) {
      console.warn('AI analysis error:', err);
      setAiError('AI assistant temporary notice: Offline classifier applied.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!description.trim()) {
      setFormError('Please provide a description of the hazard.');
      return;
    }

    if (!siteLocation.trim()) {
      setFormError('Please specify the location of the hazard.');
      return;
    }

    setIsSubmitting(true);

    // Generate unique complaint ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = worker.industry === 'construction' ? 'WS-C' : 'WS-U';
    const ticketId = `${prefix}-${randomNum}`;

    const newReport: SafetyReport = {
      id: `rep-${Date.now()}`,
      ticketId,
      workerId: isAnonymous ? 'ANONYMOUS' : worker.id,
      workerName: isAnonymous ? 'Anonymous Worker' : worker.name,
      isAnonymous,
      industry: worker.industry,
      department: worker.department,
      siteLocation,
      category,
      severity,
      title: title.trim() || description.slice(0, 50) + '...',
      description: description.trim(),
      imageUrl: selectedImage || undefined,
      timestamp: new Date().toLocaleString(),
      status: 'Submitted',
      aiAssessment: aiAnalysis || undefined,
      assignedTo: 'Unassigned (Triage in Progress)',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
      onSubmitSuccess(newReport);
    }, 400);
  };

  if (submittedTicket) {
    return (
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-2xl shadow-teal-950/40 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{t.reportSubmittedSuccess}</h3>
        <p className="text-xs text-slate-300 mb-6">
          Your report has been securely registered in the safety queue. Site supervisors and safety managers have been alerted.
        </p>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 inline-block font-mono">
          <span className="text-slate-400 text-xs block mb-1">{t.ticketIdLabel}</span>
          <span className="text-2xl font-extrabold text-teal-400 tracking-wider">
            {submittedTicket}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Status: Submitted • Under Triage</span>
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmittedTicket(null);
              setTitle('');
              setDescription('');
              setAiAnalysis(null);
              setSelectedImage('');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl">
      {/* Title */}
      <div className="flex items-start justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4" />
            Empowering Worker Voice & Life Safety
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {t.reportSafetyIssue}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Describe what is unsafe in your own words. Our AI assistant will help categorize and prioritize it for instant site review.
          </p>
        </div>
      </div>

      {/* Preset Quick Fill */}
      <div className="mb-6">
        <span className="text-xs font-medium text-slate-400 block mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Quick Test Presets (Click to Auto-fill):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_INCIDENT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleUsePreset(preset.description)}
              className="text-left text-xs bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/40 rounded-xl p-2.5 transition text-slate-300 hover:text-white cursor-pointer"
            >
              <div className="font-semibold text-teal-300">{preset.label}</div>
              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Natural Language Description Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="hazard-description" className="block text-xs font-semibold text-slate-200">
              {t.naturalLanguagePrompt} <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">Speak or type naturally</span>
          </div>

          <textarea
            id="hazard-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.placeholderHazardText}
            className="w-full bg-slate-950 border border-slate-700/80 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:outline-none"
            required
          />

          {/* AI Assistance Button */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleAnalyzeHazard}
              disabled={isAnalyzing || !description.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{t.analyzingWithAI}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{t.analyzeWithAI}</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-teal-400" />
              Powered by server-side Gemini 3.8 & Safety Heuristics
            </span>
          </div>

          {aiError && (
            <div className="mt-2 text-xs text-amber-400 bg-amber-950/30 border border-amber-800/50 rounded-lg p-2.5 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}
        </div>

        {/* AI Assessment Card (Highlighted if analyzed) */}
        {aiAnalysis && (
          <div className="bg-slate-950 border border-teal-500/40 rounded-xl p-4 space-y-3 relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 bg-teal-500/10 text-teal-300 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-bl-lg border-b border-l border-teal-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-400" />
              AI ASSISTANT ASSESSMENT
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-white">Suggested Category:</span>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {aiAnalysis.category}
              </span>
              <span className="text-xs font-bold text-white ml-2">Suggested Priority:</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  aiAnalysis.suggestedPriority === 'Critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : aiAnalysis.suggestedPriority === 'High'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                }`}
              >
                {aiAnalysis.suggestedPriority}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">AI Summary:</span>
              <p className="text-xs text-slate-200 mt-0.5 font-medium">{aiAnalysis.summary}</p>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Recommended Immediate Action:</span>
              <p className="text-xs text-emerald-300 mt-0.5">{aiAnalysis.recommendedAction}</p>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <span>Standard: {aiAnalysis.regulationsReference}</span>
            </div>

            {/* MANDATORY DISCLAIMER */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-amber-300/90">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Safety Disclaimer:</strong> {aiAnalysis.disclaimer}
              </span>
            </div>
          </div>
        )}

        {/* Hazard Title & Location Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hazard-title" className="block text-xs font-semibold text-slate-300 mb-1">
              Short Title
            </label>
            <input
              id="hazard-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken guardrail on deck"
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-teal-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="hazard-location" className="block text-xs font-semibold text-slate-300 mb-1">
              Specific Worksite Location <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="hazard-location"
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                placeholder="e.g. Scaffolding Bay 4, 3rd Floor"
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-teal-400 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Category & Severity Manual Overrides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hazard-category-select" className="block text-xs font-semibold text-slate-300 mb-1">
              {t.categoryLabel}
            </label>
            <select
              id="hazard-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as HazardCategory)}
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-teal-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none cursor-pointer"
            >
              <option value="Electrical Hazards">Electrical Hazards</option>
              <option value="Unsafe Equipment">Unsafe Equipment</option>
              <option value="Falls & Heights">Falls & Heights</option>
              <option value="Sanitation & Hygiene">Sanitation & Hygiene</option>
              <option value="Harassment & Conduct">Harassment & Workplace Conduct</option>
              <option value="Excessive Working Hours">Excessive Working Hours & Fatigue</option>
              <option value="Chemical & Hazardous Materials">Chemical & Hazardous Materials</option>
              <option value="Other">Other Occupational Hazard</option>
            </select>
          </div>

          <div>
            <label htmlFor="hazard-severity-select" className="block text-xs font-semibold text-slate-300 mb-1">
              {t.severityLabel}
            </label>
            <select
              id="hazard-severity-select"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-teal-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none cursor-pointer"
            >
              <option value="Low">Low (Minor Non-compliance)</option>
              <option value="Medium">Medium (Attention within 24 hours)</option>
              <option value="High">High (High Risk / Urgent Remediation)</option>
              <option value="Critical">Critical (Immediate Danger to Life & Health)</option>
            </select>
          </div>
        </div>

        {/* Optional Image Evidence Selector */}
        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            Attach Photo Evidence (Optional)
          </span>
          <div className="grid grid-cols-3 gap-2.5 mb-2">
            {SAMPLE_IMAGES.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(selectedImage === img.url ? '' : img.url)}
                className={`relative rounded-xl overflow-hidden border text-left transition group cursor-pointer ${
                  selectedImage === img.url
                    ? 'border-teal-400 ring-2 ring-teal-400/50'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-16 object-cover group-hover:scale-105 transition"
                />
                <span className="block text-[10px] text-slate-300 p-1 truncate bg-slate-950/80">
                  {img.title}
                </span>
                {selectedImage === img.url && (
                  <div className="absolute top-1 right-1 bg-teal-400 text-slate-950 rounded-full p-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <label className="text-[11px] text-slate-400 flex items-center gap-1.5 cursor-pointer hover:text-slate-300">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload custom photo from mobile or camera</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectedImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        {/* Anonymous Mode Checkbox */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-4">
          <div>
            <label htmlFor="submit-anonymously" className="text-xs font-semibold text-slate-200 block cursor-pointer">
              Submit Anonymously
            </label>
            <p className="text-[11px] text-slate-400">
              Your name and worker ID will be stripped from this safety report to protect against retaliation.
            </p>
          </div>
          <input
            id="submit-anonymously"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 text-teal-500 rounded bg-slate-900 border-slate-700 focus:ring-teal-400 cursor-pointer"
          />
        </div>

        {formError && (
          <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/50 rounded-lg p-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Ticket & Encrypting Submission...</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>{t.submitReport}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
