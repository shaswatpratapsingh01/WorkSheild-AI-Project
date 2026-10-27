import React from 'react';
import {
  MessageSquareOff,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { AnonymousFeedback } from '../../types';

interface AnonymousFeedbackTrendsProps {
  feedbacks: AnonymousFeedback[];
  onUpdateFeedbackStatus: (id: string, newStatus: AnonymousFeedback['status']) => void;
}

export const AnonymousFeedbackTrends: React.FC<AnonymousFeedbackTrendsProps> = ({
  feedbacks,
  onUpdateFeedbackStatus,
}) => {
  const criticalCount = feedbacks.filter((f) => f.sentiment === 'critical').length;
  const neutralCount = feedbacks.filter((f) => f.sentiment === 'neutral').length;
  const positiveCount = feedbacks.filter((f) => f.sentiment === 'positive').length;

  // Compute category frequency
  const categoriesCount: Record<string, number> = {};
  feedbacks.forEach((f) => {
    categoriesCount[f.category] = (categoriesCount[f.category] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Sentiment Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Critical Grievances</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-300 font-mono">{criticalCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Requires supervisor review</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Neutral / Suggestions</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-200 font-mono">{neutralCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Continuous improvement points</p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Positive Feedback</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300 font-mono">{positiveCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Safety culture appreciation</p>
        </div>
      </div>

      {/* Top Recurring Issue Themes */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Top Recurring Workforce Concern Themes
        </h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoriesCount).map(([cat, count]) => (
            <div
              key={cat}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-2"
            >
              <span className="text-xs font-medium text-slate-200">{cat}</span>
              <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                {count} reports
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Feed with Status Action */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquareOff className="w-4 h-4 text-teal-400" />
              Live Anonymous Worker Voice Feed ({feedbacks.length})
            </h4>
            <p className="text-xs text-slate-400">
              Aggregated from workers with identity and metadata stripped
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {fb.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      fb.sentiment === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : fb.sentiment === 'positive'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {fb.sentiment}
                  </span>
                  <span className="text-[11px] text-slate-500">{fb.siteLocation}</span>
                  <span className="text-[11px] text-slate-600">•</span>
                  <span className="text-[11px] text-slate-500">{fb.timestamp}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{fb.message}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <ThumbsUp className="w-3.5 h-3.5 text-teal-400" />
                  <span>{fb.upvotes} workers endorsed</span>
                </div>

                <select
                  value={fb.status}
                  onChange={(e) => onUpdateFeedbackStatus(fb.id, e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
                >
                  <option value="Received">Status: Received</option>
                  <option value="Investigating">Status: Investigating</option>
                  <option value="Action Taken">Status: Action Taken</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
