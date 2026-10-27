export type IndustryType = 'construction' | 'campus';

export type CampusDepartment = 'security' | 'housekeeping' | 'maintenance';

export type Language = 'en' | 'hi' | 'ta';

export type ReportStatus = 'Submitted' | 'Under Review' | 'Resolved';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type HazardCategory =
  | 'Electrical Hazards'
  | 'Unsafe Equipment'
  | 'Falls & Heights'
  | 'Sanitation & Hygiene'
  | 'Harassment & Conduct'
  | 'Excessive Working Hours'
  | 'Chemical & Hazardous Materials'
  | 'Other';

export interface WorkerProfile {
  id: string;
  name: string;
  industry: IndustryType;
  department?: CampusDepartment;
  siteName: string;
  role: string;
  avatar: string;
  hourlyRate: number; // in currency units (e.g. $ or ₹)
  overtimeMultiplier: number; // typically 1.5x
  phoneMasked: string;
  joinDate: string;
  employeeBadgeNumber: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  status: 'present' | 'late' | 'overtime_flagged' | 'leave';
  shiftType: 'Day' | 'Night' | 'Overnight';
  fatigueFlag: boolean;
}

export interface SalaryBreakdown {
  period: string;
  regularHours: number;
  regularPay: number;
  overtimeHours: number;
  overtimePay: number;
  hazardAllowance: number;
  grossPay: number;
  deductions: {
    tax: number;
    healthInsurance: number;
    providentFund: number;
    safetyEquipmentDeposit: number;
  };
  netPay: number;
  paymentStatus: 'Paid' | 'Processing' | 'Scheduled';
  disbursementDate: string;
  currency: string;
}

export interface AIHazardAnalysis {
  category: HazardCategory;
  severity: SeverityLevel;
  confidenceScore: number;
  summary: string;
  suggestedPriority: 'Critical' | 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  regulationsReference: string;
  keyHazardsDetected: string[];
  isAiGenerated: boolean;
  disclaimer: string;
}

export interface SafetyReport {
  id: string;
  ticketId: string; // e.g. "WS-C-8491"
  workerId: string;
  workerName: string;
  isAnonymous: boolean;
  industry: IndustryType;
  department?: CampusDepartment;
  siteLocation: string;
  category: HazardCategory;
  severity: SeverityLevel;
  title: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
  status: ReportStatus;
  aiAssessment?: AIHazardAnalysis;
  managerNotes?: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface AnonymousFeedback {
  id: string;
  industry: IndustryType;
  department?: CampusDepartment;
  siteLocation: string;
  sentiment: 'critical' | 'neutral' | 'positive';
  category: 'Wages & Compensation' | 'Safety Gear' | 'Management & Respect' | 'Work Environment' | 'Rest & Facilities';
  message: string;
  timestamp: string;
  upvotes: number;
  status: 'Received' | 'Investigating' | 'Action Taken';
}

export interface SkillCertificate {
  id: string;
  workerId: string;
  title: string;
  issuingBody: string;
  credentialId: string;
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
  industry: IndustryType;
  skills: string[];
  verified: boolean;
}

export interface FatigueAssessment {
  workerId: string;
  workerName: string;
  weeklyHours: number;
  consecutiveDays: number;
  shiftHoursToday: number;
  restIntervalHours: number;
  fatigueScore: number; // 0-100
  riskLevel: 'Normal' | 'Moderate' | 'High' | 'Severe';
  recommendedRestHours: number;
  actionRequired: boolean;
  advisoryText: string;
}
