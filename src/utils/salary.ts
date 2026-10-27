import { SalaryBreakdown } from '../types';

export interface SalaryCalculationInput {
  period: string;
  regularHours: number;
  hourlyRate: number;
  overtimeHours: number;
  overtimeMultiplier?: number; // default 1.5
  hazardAllowance?: number;
  currency?: string;
}

/**
 * Calculates a fully transparent salary breakdown
 */
export function calculateSalaryBreakdown(input: SalaryCalculationInput): SalaryBreakdown {
  const multiplier = input.overtimeMultiplier ?? 1.5;
  const currency = input.currency ?? '$';

  const regularPay = Math.round(input.regularHours * input.hourlyRate * 100) / 100;
  const overtimeRate = input.hourlyRate * multiplier;
  const overtimePay = Math.round(input.overtimeHours * overtimeRate * 100) / 100;
  const hazardAllowance = input.hazardAllowance ?? 0;

  const grossPay = Math.round((regularPay + overtimePay + hazardAllowance) * 100) / 100;

  // Transparent deductions
  const tax = Math.round(grossPay * 0.05 * 100) / 100; // 5% base withholding
  const healthInsurance = Math.round(grossPay * 0.03 * 100) / 100; // 3% medical & accident cover
  const providentFund = Math.round(grossPay * 0.06 * 100) / 100; // 6% pension / EPF
  const safetyEquipmentDeposit = 0; // Transparent zero hidden fees

  const totalDeductions = tax + healthInsurance + providentFund + safetyEquipmentDeposit;
  const netPay = Math.round((grossPay - totalDeductions) * 100) / 100;

  return {
    period: input.period,
    regularHours: input.regularHours,
    regularPay,
    overtimeHours: input.overtimeHours,
    overtimePay,
    hazardAllowance,
    grossPay,
    deductions: {
      tax,
      healthInsurance,
      providentFund,
      safetyEquipmentDeposit,
    },
    netPay,
    paymentStatus: 'Paid',
    disbursementDate: '2026-10-25',
    currency,
  };
}
