import React, { useState } from 'react';
import {
  MessageSquareOff,
  ShieldCheck,
  Send,
  ThumbsUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  HelpCircle,
} from 'lucide-react';
import { AnonymousFeedback, IndustryType, CampusDepartment, Language } from '../../types';
import { translations } from '../../locales/translations';

interface AnonymousFeedbackFormProps {
  feedbacks: AnonymousFeedback[];
  industry: IndustryType;
  department?: CampusDepartment;
  siteLocation: string;
  language: Language;
  onAddFeedback: (fb: AnonymousFeedback) => void;
}

export const AnonymousFeedbackForm: React.FC<AnonymousFeedbackFormProps> = ({
  feedbacks,
  industry,
  department,
  siteLocation,
  language,
  onAddFeedback,
}) => {
  const t = translations[language];

  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<AnonymousFeedback['category']>('Safety Gear');
  const [sentiment, setSentiment] = useState<'critical' | 'neutral' | 'positive'>('critical');
  const [submitted, setSubmitted] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFb: AnonymousFeedback = {
      id: `fb-${Date.now()}`,
      industry,
      department,
      siteLocation,
      sentiment,
      category,
      message: message.trim(),
      timestamp: 'Just now',
      upvotes: 1,
      status: 'Received',
    };

    onAddFeedback(newFb);
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleToggleUpvote = (id: string) => {
    setUpvotedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Whistleblower Guarantee Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{t.sendAnonymousFeedback}</h2>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-teal-500/40 font-semibold">
                  100% ANONYMOUS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t.feedbackGuarantee} Speak freely about delayed overtime wages, equipment conditions, or unfair supervisor treatment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Zero Metadata Logged</span>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md">
        {submitted && (
          <div className="mb-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3.5 flex items-center gap-2 text-xs text-emerald-300 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{t.feedbackSubmitted}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="feedback-category-select" className="block text-xs font-semibold text-slate-300 mb-1">Feedback Topic</label>
              <select
                id="feedback-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                <option value="Safety Gear">Safety Gear & PPE Quality</option>
                <option value="Wages & Compensation">Wages & Overtime Transparency</option>
                <option value="Management & Respect">Supervisor Behavior & Retaliation</option>
                <option value="Rest & Facilities">Drinking Water, Toilets & Break Rooms</option>
                <option value="Work Environment">Heat Stress, Lighting & Ventilation</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback-sentiment-select" className="block text-xs font-semibold text-slate-300 mb-1">Tone / Severity</label>
              <select
                id="feedback-sentiment-select"
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                <option value="critical">Critical Issue (Urgent Attention)</option>
                <option value="neutral">Constructive Suggestion</option>
                <option value="positive">Positive Recognition</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="feedback-text" className="block text-xs font-semibold text-slate-300 mb-1">
              Your Anonymous Message <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="feedback-text"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.feedbackPlaceholder}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.submitFeedback}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Community Voice Board */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Worker Community Voices ({feedbacks.length})
          </h3>
          <span className="text-xs text-slate-400">Upvote issues that affect your crew</span>
        </div>

        <div className="space-y-2.5">
          {feedbacks.map((fb) => {
            const isUpvoted = upvotedIds[fb.id];
            const upvoteCount = fb.upvotes + (isUpvoted ? 1 : 0);

            return (
              <div
                key={fb.id}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {fb.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        fb.sentiment === 'critical'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          : fb.sentiment === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {fb.sentiment}
                    </span>
                    <span className="text-[11px] text-slate-500">{fb.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pt-1">{fb.message}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:self-center">
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Status: {fb.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(fb.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isUpvoted
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{upvoteCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
