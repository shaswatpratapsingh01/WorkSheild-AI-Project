import React from 'react';
import {
  X,
  FileCheck2,
  DollarSign,
  Clock,
  ShieldCheck,
  AlertCircle,
  Download,
  Info,
} from 'lucide-react';
import { SalaryBreakdown, WorkerProfile } from '../../types';

interface SalaryBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  salary: SalaryBreakdown;
  worker: WorkerProfile;
}

export const SalaryBreakdownModal: React.FC<SalaryBreakdownModalProps> = ({
  isOpen,
  onClose,
  salary,
  worker,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-teal-950/40">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Itemized Transparent Pay Statement</h2>
              <p className="text-xs text-slate-400">
                Disbursement Period: {salary.period} • Verified by WorkShield Audit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Worker details summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Worker Name</span>
              <span className="font-semibold text-slate-200">{worker.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Badge Number</span>
              <span className="font-mono font-medium text-teal-400">{worker.employeeBadgeNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Base Hourly Rate</span>
              <span className="font-semibold text-slate-200">${worker.hourlyRate.toFixed(2)}/hr</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Overtime Multiplier</span>
              <span className="font-semibold text-teal-300">{worker.overtimeMultiplier}x Standard</span>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              1. Gross Earnings Breakdown
            </h3>
            <div className="space-y-2 text-sm bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                <div>
                  <span className="font-medium text-slate-200">Regular Working Hours</span>
                  <p className="text-xs text-slate-400">{salary.regularHours} hours @ ${worker.hourlyRate.toFixed(2)}/hr</p>
                </div>
                <span className="font-mono font-semibold text-slate-100">${salary.regularPay.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                <div>
                  <span className="font-medium text-slate-200">Overtime Hours</span>
                  <p className="text-xs text-slate-400">
                    {salary.overtimeHours} hours @ ${(worker.hourlyRate * worker.overtimeMultiplier).toFixed(2)}/hr (1.5x Overtime Rate)
                  </p>
                </div>
                <span className="font-mono font-semibold text-teal-300">+${salary.overtimePay.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-medium text-slate-200">Hazard & Height Duty Allowance</span>
                  <p className="text-xs text-slate-400">High-risk environment certified safety differential</p>
                </div>
                <span className="font-mono font-semibold text-teal-300">+${salary.hazardAllowance.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-700/60 font-semibold text-slate-100">
                <span>Total Gross Earnings</span>
                <span className="font-mono text-base text-teal-400">${salary.grossPay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Transparent Deductions Breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2. Itemized Deductions (Transparent & Regulated)
            </h3>
            <div className="space-y-2 text-sm bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                <div>
                  <span className="text-slate-300">Standard Income Withholding Tax (5%)</span>
                  <p className="text-xs text-slate-400">Government statutory deduction</p>
                </div>
                <span className="font-mono text-slate-400">-${salary.deductions.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                <div>
                  <span className="text-slate-300">Group Medical & Occupational Accident Cover (3%)</span>
                  <p className="text-xs text-slate-400">Comprehensive site trauma & hospitalization policy</p>
                </div>
                <span className="font-mono text-slate-400">-${salary.deductions.healthInsurance.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                <div>
                  <span className="text-slate-300">Provident Fund / Retirement Pension (6%)</span>
                  <p className="text-xs text-slate-400">Worker retirement trust fund deposit</p>
                </div>
                <span className="font-mono text-slate-400">-${salary.deductions.providentFund.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-1 text-emerald-400 text-xs">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mandatory PPE / Equipment Deposit Fee
                </span>
                <span className="font-mono font-semibold">$0.00 (Employer Covered - No Hidden Charge)</span>
              </div>
            </div>
          </div>

          {/* Net Pay Callout */}
          <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-cyan-950/70 border border-teal-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase text-teal-400">Net Take-Home Pay</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                ${salary.netPay.toFixed(2)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Disbursed to Bank Account ending in •••• 4019 on {salary.disbursementDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Paid
              </span>
            </div>
          </div>

          {/* Guarantee Footer */}
          <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p>
              WorkShield Transparency Guarantee: Every hour clocked via NFC/digital attendance is locked against unauthorized deductions. If your overtime hours do not match, submit a ticket in the Worker Portal for instant labor audit review.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
          >
            Close Statement
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition shadow-md shadow-teal-500/20 cursor-pointer font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            Print / Save Pay Slip
          </button>
        </div>
      </div>
    </div>
  );
};
