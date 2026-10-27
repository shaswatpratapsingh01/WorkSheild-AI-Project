import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFatigueRisk } from './fatigue';
import { calculateSalaryBreakdown } from './salary';
import { classifyHazardOffline } from './hazardClassifier';

test('Fatigue Risk: returns Normal for standard 40h week with good rest', () => {
  const result = calculateFatigueRisk({
    workerId: 'W1',
    workerName: 'John Doe',
    weeklyHours: 40,
    consecutiveDays: 4,
    shiftHoursToday: 8,
    restIntervalHours: 14,
  });

  assert.equal(result.riskLevel, 'Normal');
  assert.equal(result.actionRequired, false);
  assert.ok(result.fatigueScore <= 30);
});

test('Fatigue Risk: flags Severe for excessive 65h week, 14h shift, short rest', () => {
  const result = calculateFatigueRisk({
    workerId: 'W2',
    workerName: 'Alice Smith',
    weeklyHours: 65,
    consecutiveDays: 7,
    shiftHoursToday: 14,
    restIntervalHours: 6,
  });

  assert.equal(result.riskLevel, 'Severe');
  assert.equal(result.actionRequired, true);
  assert.ok(result.fatigueScore >= 80);
  assert.equal(result.recommendedRestHours, 16);
});

test('Salary Breakdown: accurately computes regular pay, 1.5x overtime, and deductions', () => {
  const result = calculateSalaryBreakdown({
    period: 'Oct 1 - Oct 15, 2026',
    regularHours: 80,
    hourlyRate: 20, // 80 * 20 = 1600
    overtimeHours: 10, // 10 * (20 * 1.5) = 300
    hazardAllowance: 100, // gross = 2000
    currency: '$',
  });

  assert.equal(result.regularPay, 1600);
  assert.equal(result.overtimePay, 300);
  assert.equal(result.grossPay, 2000);

  // Deductions: Tax 5% = 100, Health 3% = 60, PF 6% = 120, total = 280
  assert.equal(result.deductions.tax, 100);
  assert.equal(result.deductions.healthInsurance, 60);
  assert.equal(result.deductions.providentFund, 120);
  assert.equal(result.netPay, 1720);
});

test('Hazard Classifier: identifies electrical hazard with exposed wires and sparks', () => {
  const text = 'Exposed high voltage wire sparking near the wet scaffold floor on Sector 4';
  const analysis = classifyHazardOffline(text);

  assert.equal(analysis.category, 'Electrical Hazards');
  assert.equal(analysis.severity, 'Critical');
  assert.equal(analysis.suggestedPriority, 'Critical');
  assert.ok(analysis.disclaimer.includes('AI Suggestion'));
  assert.equal(analysis.isAiGenerated, true);
});

test('Hazard Classifier: identifies falls & heights hazard for unfastened harness on scaffolding', () => {
  const text = 'Workers working on 5th floor scaffolding without harness or edge railing';
  const analysis = classifyHazardOffline(text);

  assert.equal(analysis.category, 'Falls & Heights');
  assert.ok(analysis.suggestedPriority === 'High' || analysis.suggestedPriority === 'Critical');
});

test('Hazard Classifier: identifies excessive working hours hazard', () => {
  const text = 'Night shift guards made to work 16 hours continuous double shift without sleep';
  const analysis = classifyHazardOffline(text);

  assert.equal(analysis.category, 'Excessive Working Hours');
});
