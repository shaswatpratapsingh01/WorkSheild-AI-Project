import { AIHazardAnalysis, HazardCategory, SeverityLevel } from '../types';

interface RuleMatch {
  category: HazardCategory;
  severity: SeverityLevel;
  keywords: string[];
  suggestedPriority: 'Critical' | 'High' | 'Medium' | 'Low';
  action: string;
  regRef: string;
}

const CATEGORY_RULES: RuleMatch[] = [
  {
    category: 'Electrical Hazards',
    severity: 'Critical',
    keywords: ['wire', 'wiring', 'cable', 'shock', 'spark', 'sparks', 'voltage', 'electrocution', 'junction box', 'breaker', 'exposed wire', 'water on plug'],
    suggestedPriority: 'Critical',
    action: 'Immediately isolate electrical main feed, tag-out circuit, and cordon off wet or energized areas.',
    regRef: 'OSHA 1926.403 (General Requirements for Electrical Safety)',
  },
  {
    category: 'Falls & Heights',
    severity: 'High',
    keywords: ['fall', 'scaffold', 'scaffolding', 'ladder', 'harness', 'roof', 'edge', 'height', 'railing', 'balcony', 'drop', 'plank'],
    suggestedPriority: 'High',
    action: 'Install standard guardrails, secure toe-boards, and mandate full body harness attachment points before work resumes.',
    regRef: 'OSHA 1926.501 (Fall Protection in Construction)',
  },
  {
    category: 'Unsafe Equipment',
    severity: 'High',
    keywords: ['crane', 'drill', 'forklift', 'blade', 'saw', 'machine', 'belt', 'brake', 'engine', 'hydraulic', 'guard missing', 'grinder', 'leak oil'],
    suggestedPriority: 'High',
    action: 'Lock-out equipment, red-tag machinery for inspection, and check protective shielding.',
    regRef: 'OSHA 1910.212 (General Requirements for Machine Guarding)',
  },
  {
    category: 'Chemical & Hazardous Materials',
    severity: 'Critical',
    keywords: ['chemical', 'acid', 'fume', 'fumes', 'toxic', 'solvent', 'gas leak', 'ammonia', 'bleach', 'asbestos', 'respiratory', 'spill'],
    suggestedPriority: 'Critical',
    action: 'Evacuate immediate perimeter, engage emergency ventilation, and refer to Safety Data Sheets (SDS) for neutralizing agents.',
    regRef: 'OSHA 1910.1200 (Hazard Communication Standard)',
  },
  {
    category: 'Excessive Working Hours',
    severity: 'Medium',
    keywords: ['overtime', '14 hours', '16 hours', '12 hours', 'double shift', 'exhausted', 'exhaustion', 'sleepy', 'fatigue', 'no rest', 'no break', 'continuous work'],
    suggestedPriority: 'High',
    action: 'Initiate immediate mandatory relief rotation and review shift scheduling compliance with labor standards.',
    regRef: 'Workforce Fatigue & Safety Standard Section 7 (Max Shift Duration)',
  },
  {
    category: 'Sanitation & Hygiene',
    severity: 'Medium',
    keywords: ['toilet', 'bathroom', 'sanitation', 'drinking water', 'mold', 'trash', 'sewage', 'smell', 'pest', 'rodent', 'ventilation', 'dust'],
    suggestedPriority: 'Medium',
    action: 'Deploy facility disinfection crew and verify portable drinking water stations and restroom hygiene standards.',
    regRef: 'OSHA 1926.51 (Sanitation Facilities for Construction & Campus Workers)',
  },
  {
    category: 'Harassment & Conduct',
    severity: 'High',
    keywords: ['harass', 'harassment', 'yell', 'bully', 'threat', 'threaten', 'abuse', 'slur', 'discriminate', 'intimidation', 'touch'],
    suggestedPriority: 'High',
    action: 'Confidential HR review, supervisor separation, and strict non-retaliation whistleblower protocol enactment.',
    regRef: 'Title VII & Workplace Psychological Safety Directives',
  },
];

/**
 * Heuristic/rule-based hazard analysis fallback
 */
export function classifyHazardOffline(text: string): AIHazardAnalysis {
  const lower = text.toLowerCase();

  let bestRule: RuleMatch | null = null;
  let highestMatchCount = 0;
  const matchedKeywords: string[] = [];

  for (const rule of CATEGORY_RULES) {
    let count = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        count++;
        matchedKeywords.push(kw);
      }
    }
    if (count > highestMatchCount) {
      highestMatchCount = count;
      bestRule = rule;
    }
  }

  // Fallback if no specific rule matched strongly
  const category: HazardCategory = bestRule ? bestRule.category : 'Other';
  let severity: SeverityLevel = bestRule ? bestRule.severity : 'Medium';

  // Severity bump if danger phrases exist
  if (lower.includes('emergency') || lower.includes('sparks') || lower.includes('collapse') || lower.includes('bleeding') || lower.includes('fire')) {
    severity = 'Critical';
  }

  const suggestedPriority = severity === 'Critical' ? 'Critical' : severity === 'High' ? 'High' : 'Medium';
  const recommendedAction = bestRule
    ? bestRule.action
    : 'Conduct safety inspection on site and secure the affected work perimeter.';
  const regulationsReference = bestRule ? bestRule.regRef : 'General Duty Clause Section 5(a)(1)';

  // Generate concise summary
  const trimmed = text.trim();
  const summary = trimmed.length > 120 ? trimmed.slice(0, 117) + '...' : trimmed;

  return {
    category,
    severity,
    confidenceScore: bestRule ? 0.88 : 0.65,
    summary: summary || 'Reported hazard at work site requiring inspection.',
    suggestedPriority,
    recommendedAction,
    regulationsReference,
    keyHazardsDetected: matchedKeywords.length > 0 ? Array.from(new Set(matchedKeywords)).slice(0, 4) : ['General Safety Condition'],
    isAiGenerated: true,
    disclaimer: 'AI Suggestion — Not a Verified Fact. Must be inspected and validated by a qualified site safety officer.',
  };
}
