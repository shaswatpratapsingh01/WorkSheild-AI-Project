import { FatigueAssessment } from '../types';

export interface FatigueInput {
  workerId: string;
  workerName: string;
  weeklyHours: number;
  consecutiveDays: number;
  shiftHoursToday: number;
  restIntervalHours: number; // rest before current shift
}

/**
 * Calculates a fatigue risk assessment from working hours and rest metrics.
 * 0 - 30: Normal
 * 31 - 55: Moderate
 * 56 - 79: High
 * 80 - 100: Severe
 */
export function calculateFatigueRisk(input: FatigueInput): FatigueAssessment {
  let score = 10;

  // 1. Weekly hours penalty (Standard is 40-48h)
  if (input.weeklyHours > 60) {
    score += 35;
  } else if (input.weeklyHours > 52) {
    score += 25;
  } else if (input.weeklyHours > 48) {
    score += 15;
  } else if (input.weeklyHours > 40) {
    score += 5;
  }

  // 2. Daily shift duration penalty (Standard is 8h)
  if (input.shiftHoursToday >= 14) {
    score += 35;
  } else if (input.shiftHoursToday >= 12) {
    score += 25;
  } else if (input.shiftHoursToday >= 10) {
    score += 15;
  } else if (input.shiftHoursToday > 8) {
    score += 5;
  }

  // 3. Consecutive days penalty
  if (input.consecutiveDays >= 7) {
    score += 20;
  } else if (input.consecutiveDays >= 6) {
    score += 12;
  } else if (input.consecutiveDays >= 5) {
    score += 5;
  }

  // 4. Short rest interval penalty (Standard minimum recommended rest between shifts is 11 hours)
  if (input.restIntervalHours < 8) {
    score += 25;
  } else if (input.restIntervalHours < 11) {
    score += 15;
  }

  // Cap score between 0 and 100
  score = Math.min(100, Math.max(0, score));

  let riskLevel: 'Normal' | 'Moderate' | 'High' | 'Severe' = 'Normal';
  let recommendedRestHours = 8;
  let actionRequired = false;
  let advisoryText = 'Normal alertness levels. Proceed with standard operating precautions.';

  if (score >= 80) {
    riskLevel = 'Severe';
    recommendedRestHours = 16;
    actionRequired = true;
    advisoryText =
      'CRITICAL FATIGUE WARNING: Worker has exceeded safe endurance thresholds. Immediate relief from safety-critical duties is mandated by workforce health guidelines.';
  } else if (score >= 56) {
    riskLevel = 'High';
    recommendedRestHours = 12;
    actionRequired = true;
    advisoryText =
      'HIGH FATIGUE ALERT: Reaction times may be degraded by up to 40%. Mandatory 30-minute recovery break and rotation off high-risk machinery advised.';
  } else if (score >= 31) {
    riskLevel = 'Moderate';
    recommendedRestHours = 10;
    actionRequired = false;
    advisoryText =
      'ELEVATED WORKLOAD: Approaching overtime limit. Ensure scheduled hydration and avoid back-to-back night shifts.';
  }

  return {
    workerId: input.workerId,
    workerName: input.workerName,
    weeklyHours: input.weeklyHours,
    consecutiveDays: input.consecutiveDays,
    shiftHoursToday: input.shiftHoursToday,
    restIntervalHours: input.restIntervalHours,
    fatigueScore: score,
    riskLevel,
    recommendedRestHours,
    actionRequired,
    advisoryText,
  };
}
