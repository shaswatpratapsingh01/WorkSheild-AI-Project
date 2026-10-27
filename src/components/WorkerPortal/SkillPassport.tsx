import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  Clock,
  ShieldCheck,
  FileCheck,
  ExternalLink,
  QrCode,
  Calendar,
  Sparkles,
  Download,
  AlertCircle,
} from 'lucide-react';
import { SkillCertificate, WorkerProfile, Language } from '../../types';
import { translations } from '../../locales/translations';

interface SkillPassportProps {
  worker: WorkerProfile;
  certificates: SkillCertificate[];
  language: Language;
}

export const SkillPassport: React.FC<SkillPassportProps> = ({
  worker,
  certificates,
  language,
}) => {
  const t = translations[language];
  const [selectedCert, setSelectedCert] = useState<SkillCertificate | null>(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Passport Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/50 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{t.verifiedSkills}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/40 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED PASSPORT
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Portable digital credential wallet for {worker.name} • {worker.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Total Verified</span>
              <span className="text-base font-extrabold text-teal-400 font-mono">
                {certificates.length} Certs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => {
          const isExpiring = cert.status === 'Expiring Soon';

          return (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 transition shadow-sm cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {cert.credentialId}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      cert.status === 'Valid'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : isExpiring
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {cert.status === 'Valid' ? (
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Clock className="w-3 h-3 text-amber-400" />
                    )}
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{cert.issuingBody}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Expires: {cert.expiryDate}
                </span>
                <span className="text-teal-400 font-semibold group-hover:underline flex items-center gap-1 text-[11px]">
                  {t.viewCredential} &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              ✕
            </button>

            {/* Certificate Header Stamp */}
            <div className="text-center pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400 block">
                WorkShield Digital Credential Record
              </span>
              <h3 className="text-base font-bold text-white mt-1">{selectedCert.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedCert.issuingBody}</p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Issued To:</span>
                <span className="font-semibold text-slate-200">{worker.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Credential ID:</span>
                <span className="font-mono font-medium text-teal-300">{selectedCert.credentialId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Issue Date:</span>
                <span className="text-slate-200">{selectedCert.issueDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Expiration Date:</span>
                <span className="text-slate-200">{selectedCert.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Verification Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Cryptographically Verified
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Competencies & Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Registry ID: WS-PASS-{worker.id}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
