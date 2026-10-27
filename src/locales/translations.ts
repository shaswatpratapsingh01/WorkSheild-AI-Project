import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  workerPortal: string;
  employerPortal: string;
  construction: string;
  campus: string;
  campusSecurity: string;
  campusHousekeeping: string;
  campusMaintenance: string;
  
  // Worker Nav & Tabs
  overview: string;
  reportHazard: string;
  myReports: string;
  anonymousFeedback: string;
  skillPassport: string;
  salaryBreakdown: string;
  
  // Dashboard & Attendance
  clockIn: string;
  clockOut: string;
  weeklyHours: string;
  overtimeHours: string;
  currentShift: string;
  attendanceHistory: string;
  fatigueRisk: string;
  normalRest: string;
  moderateRisk: string;
  highRisk: string;
  severeRisk: string;
  mandatoryRestWarning: string;
  
  // Salary
  totalEarnings: string;
  regularPay: string;
  overtimePay: string;
  hazardPay: string;
  deductions: string;
  netPay: string;
  viewPaySlip: string;
  transparentPayGuarantee: string;
  
  // Safety Reporting & AI
  reportSafetyIssue: string;
  naturalLanguagePrompt: string;
  placeholderHazardText: string;
  analyzeWithAI: string;
  analyzingWithAI: string;
  categoryLabel: string;
  severityLabel: string;
  suggestedPriorityLabel: string;
  aiSuggestedCategory: string;
  aiDisclaimer: string;
  submitReport: string;
  reportSubmittedSuccess: string;
  ticketIdLabel: string;
  statusSubmitted: string;
  statusUnderReview: string;
  statusResolved: string;
  
  // Anonymous Feedback
  sendAnonymousFeedback: string;
  feedbackGuarantee: string;
  feedbackPlaceholder: string;
  submitFeedback: string;
  feedbackSubmitted: string;
  
  // Passport
  verifiedSkills: string;
  validCertificates: string;
  expiringSoon: string;
  credentialId: string;
  issuingBody: string;
  viewCredential: string;
  
  // Employer Dashboard
  employerTitle: string;
  totalActiveWorkers: string;
  openSafetyHazards: string;
  fatigueAlertsCount: string;
  feedbackTrends: string;
  safetyComplaintsTracker: string;
  updateStatus: string;
  filterByIndustry: string;
  allIndustries: string;
  demoDataLabel: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'WorkShield AI',
    tagline: 'Empowering worker safety, transparency & well-being with AI',
    workerPortal: 'Worker Portal',
    employerPortal: 'Employer Dashboard',
    construction: 'Construction Site',
    campus: 'Campus Staff',
    campusSecurity: 'Campus Security',
    campusHousekeeping: 'Housekeeping & Sanitation',
    campusMaintenance: 'Facilities & Maintenance',
    
    overview: 'Overview',
    reportHazard: 'Report Safety Hazard',
    myReports: 'My Reports',
    anonymousFeedback: 'Anonymous Voice',
    skillPassport: 'Skill Passport',
    salaryBreakdown: 'Salary & Hours',
    
    clockIn: 'Clock In',
    clockOut: 'Clock Out',
    weeklyHours: 'Weekly Hours',
    overtimeHours: 'Overtime Hours',
    currentShift: 'Current Shift',
    attendanceHistory: 'Attendance History',
    fatigueRisk: 'Fatigue Risk Level',
    normalRest: 'Well Rested',
    moderateRisk: 'Moderate Load',
    highRisk: 'High Fatigue',
    severeRisk: 'Critical Fatigue Alert',
    mandatoryRestWarning: 'Worker exceeds safe endurance limits. Mandatory 12-hour rest recommended.',
    
    totalEarnings: 'Total Earnings (Period)',
    regularPay: 'Base Wages',
    overtimePay: 'Overtime (1.5x)',
    hazardPay: 'Hazard Allowance',
    deductions: 'Transparent Deductions',
    netPay: 'Take-Home Pay',
    viewPaySlip: 'View Transparent Pay Breakdown',
    transparentPayGuarantee: '100% itemized transparency. No hidden pay deductions.',
    
    reportSafetyIssue: 'Report a Safety Hazard',
    naturalLanguagePrompt: 'Describe the hazard in your own words (or use voice/text):',
    placeholderHazardText: 'e.g. Scaffolding on 3rd floor is trembling, or exposed electric wire near water accumulation in basement...',
    analyzeWithAI: 'AI Analyze & Assist',
    analyzingWithAI: 'AI Analyzing Hazard Description...',
    categoryLabel: 'Hazard Category',
    severityLabel: 'Severity Level',
    suggestedPriorityLabel: 'Suggested Priority',
    aiSuggestedCategory: 'AI Detected Category',
    aiDisclaimer: 'AI Suggestion — Not a Verified Fact. Must be inspected by a certified safety officer.',
    submitReport: 'Submit Safety Report',
    reportSubmittedSuccess: 'Safety report registered successfully! Complaint ticket created.',
    ticketIdLabel: 'Ticket ID',
    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',
    statusResolved: 'Resolved',
    
    sendAnonymousFeedback: 'Anonymous Workplace Feedback',
    feedbackGuarantee: 'Strictly Anonymous: Zero worker ID, name, or device IP metadata stored.',
    feedbackPlaceholder: 'Share honest feedback about site conditions, shift pressure, supervisors, or equipment without fear...',
    submitFeedback: 'Submit Anonymously',
    feedbackSubmitted: 'Anonymous feedback recorded and aggregated into safety insights.',
    
    verifiedSkills: 'Verified Skill Passport',
    validCertificates: 'Active Certifications',
    expiringSoon: 'Expiring Soon',
    credentialId: 'Credential ID',
    issuingBody: 'Issuing Authority',
    viewCredential: 'View Certificate',
    
    employerTitle: 'Workforce Safety & Health Command Center',
    totalActiveWorkers: 'Active Workforce',
    openSafetyHazards: 'Active Hazard Tickets',
    fatigueAlertsCount: 'Fatigue Alerts Active',
    feedbackTrends: 'Worker Voice & Sentiment',
    safetyComplaintsTracker: 'Safety Complaints Tracker',
    updateStatus: 'Update Ticket Status',
    filterByIndustry: 'Industry / Division Filter',
    allIndustries: 'All Sites & Sectors',
    demoDataLabel: 'Demo Data Mode: Illustrative dataset for safety management.',
  },
  
  hi: {
    appName: 'वर्कशील्ड एआई (WorkShield AI)',
    tagline: 'श्रमिक सुरक्षा, पारदर्शी वेतन और कल्याण के लिए एआई',
    workerPortal: 'श्रमिक पोर्टल (Worker)',
    employerPortal: 'नियोक्ता डैशबोर्ड (Employer)',
    construction: 'निर्माण स्थल (Construction)',
    campus: 'कॉलेज/यूनिवर्सिटी स्टाफ (Campus)',
    campusSecurity: 'कैंपस सुरक्षा (Security)',
    campusHousekeeping: 'सफाई कर्मचारी (Housekeeping)',
    campusMaintenance: 'रखरखाव दल (Maintenance)',
    
    overview: 'विवरण (Overview)',
    reportHazard: 'खतरे की सूचना दें (Report Hazard)',
    myReports: 'मेरी शिकायतें (My Reports)',
    anonymousFeedback: 'गुमनाम सुझाव (Anonymous)',
    skillPassport: 'कौशल पासपोर्ट (Skills)',
    salaryBreakdown: 'वेतन और घंटे (Salary)',
    
    clockIn: 'हाजिरी शुरू (Clock In)',
    clockOut: 'हाजिरी समाप्त (Clock Out)',
    weeklyHours: 'साप्ताहिक घंटे',
    overtimeHours: 'ओवरटाइम घंटे',
    currentShift: 'वर्तमान शिफ्ट',
    attendanceHistory: 'उपस्थिति इतिहास',
    fatigueRisk: 'थकान जोखिम स्तर (Fatigue)',
    normalRest: 'सामान्य (स्वस्थ)',
    moderateRisk: 'मध्यम लोड',
    highRisk: 'उच्च थकान',
    severeRisk: 'गंभीर थकान चेतावनी!',
    mandatoryRestWarning: 'श्रमिक सुरक्षित सीमा से अधिक काम कर चुके हैं। 12 घंटे का अनिवार्य विश्राम आवश्यक है।',
    
    totalEarnings: 'कुल कमाई',
    regularPay: 'मूल वेतन',
    overtimePay: 'ओवरटाइम (1.5x)',
    hazardPay: 'जोखिम भत्ता',
    deductions: 'कटौती (पीएफ/टैक्स)',
    netPay: 'शुद्ध वेतन (हाथ में)',
    viewPaySlip: 'पारदर्शी वेतन पर्ची देखें',
    transparentPayGuarantee: '100% पारदर्शी विवरण। कोई छिपी हुई कटौती नहीं।',
    
    reportSafetyIssue: 'सुरक्षा खतरे की रिपोर्ट करें',
    naturalLanguagePrompt: 'खतरे का विवरण अपनी भाषा में लिखें:',
    placeholderHazardText: 'उदा. तीसरी मंजिल पर पाड़ (स्कैफोल्डिंग) हिल रही है, या बेसमेंट में पानी के पास खुला बिजली का तार है...',
    analyzeWithAI: 'एआई द्वारा जांचें (AI Analyze)',
    analyzingWithAI: 'एआई विवरण का विश्लेषण कर रहा है...',
    categoryLabel: 'खतरे की श्रेणी',
    severityLabel: 'गंभीरता का स्तर',
    suggestedPriorityLabel: 'सुझाई गई प्राथमिकता',
    aiSuggestedCategory: 'एआई द्वारा पहचानी गई श्रेणी',
    aiDisclaimer: 'एआई सुझाव — कोई सत्यापित तथ्य नहीं। प्रमाणित सुरक्षा अधिकारी द्वारा निरीक्षण आवश्यक है।',
    submitReport: 'रिपोर्ट दर्ज करें',
    reportSubmittedSuccess: 'सुरक्षा रिपोर्ट सफलतापूर्वक दर्ज हो गई! शिकायत टिकट तैयार है।',
    ticketIdLabel: 'शिकायत संख्या',
    statusSubmitted: 'जमा की गई (Submitted)',
    statusUnderReview: 'समीक्षाधीन (Under Review)',
    statusResolved: 'हल किया गया (Resolved)',
    
    sendAnonymousFeedback: 'गुमनाम कार्यस्थल फीडबैक',
    feedbackGuarantee: 'पूर्णतः गोपनीय: कोई कर्मचारी आईडी, नाम या स्थान सुरक्षित नहीं किया जाता।',
    feedbackPlaceholder: 'कार्यस्थल की स्थिति, वेतन, पर्यवेक्षकों के व्यवहार या उपकरणों के बारे में बिना किसी डर के लिखें...',
    submitFeedback: 'गुमनाम रूप से भेजें',
    feedbackSubmitted: 'गुमनाम फीडबैक सफलतापूर्वक दर्ज कर लिया गया।',
    
    verifiedSkills: 'सत्यापित कौशल पासपोर्ट',
    validCertificates: 'सक्रिय प्रमाणपत्र',
    expiringSoon: 'जल्द समाप्त होने वाले',
    credentialId: 'प्रमाणपत्र संख्या',
    issuingBody: 'जारीकर्ता संस्था',
    viewCredential: 'प्रमाणपत्र देखें',
    
    employerTitle: 'कार्यबल सुरक्षा एवं स्वास्थ्य नियंत्रण केंद्र',
    totalActiveWorkers: 'सक्रिय श्रमिक',
    openSafetyHazards: 'सक्रिय सुरक्षा टिकट',
    fatigueAlertsCount: 'सक्रिय थकान चेतावनियां',
    feedbackTrends: 'श्रमिक आवाज और रुझान',
    safetyComplaintsTracker: 'सुरक्षा शिकायत ट्रैकर',
    updateStatus: 'स्थिति अपडेट करें',
    filterByIndustry: 'उद्योग / विभाग फ़िल्टर',
    allIndustries: 'सभी साइट और विभाग',
    demoDataLabel: 'डेमो डेटा मोड: सुरक्षा प्रबंधन प्रदर्शन हेतु डेटा।',
  },
  
  ta: {
    appName: 'ஒர்க்ஷீல்ட் AI (WorkShield AI)',
    tagline: 'தொழிலாளர் பாதுகாப்பு, வெளிப்படையான ஊதியம் மற்றும் நலனுக்கான AI',
    workerPortal: 'தொழிலாளர் தளம் (Worker)',
    employerPortal: 'நிர்வாக டாஷ்போர்டு (Employer)',
    construction: 'கட்டுமான தளம் (Construction)',
    campus: 'கல்லூரி பணியாளர்கள் (Campus)',
    campusSecurity: 'பாதுகாப்பு பணி (Security)',
    campusHousekeeping: 'துப்புரவு பணி (Housekeeping)',
    campusMaintenance: 'பராமரிப்பு பணி (Maintenance)',
    
    overview: 'கண்ணோட்டம்',
    reportHazard: 'பாதுகாப்பு அபாயத்தை பதிவு செய்',
    myReports: 'எனது புகார்கள்',
    anonymousFeedback: 'பெயரற்ற கருத்து (Anonymous)',
    skillPassport: 'திறன் பாஸ்போர்ட்',
    salaryBreakdown: 'சம்பளம் & வேலை நேரம்',
    
    clockIn: 'பணி தொடக்கம் (Clock In)',
    clockOut: 'பணி முடிவு (Clock Out)',
    weeklyHours: 'வாராந்திர நேரம்',
    overtimeHours: 'கூடுதல் நேரம் (OT)',
    currentShift: 'தற்போதைய ஷிப்ட்',
    attendanceHistory: 'வருகை பதிவு',
    fatigueRisk: 'களைப்பு ஆபத்து நிலை',
    normalRest: 'இயல்பு (ஆரோக்கியம்)',
    moderateRisk: 'மிதமான சுமை',
    highRisk: 'அதிக களைப்பு',
    severeRisk: 'தீவிர களைப்பு எச்சரிக்கை!',
    mandatoryRestWarning: 'தொழிலாளி பாதுகாப்பு வரம்பை தாண்டி வேலை செய்துள்ளார். 12 மணி நேர கட்டாய ஓய்வு தேவை.',
    
    totalEarnings: 'மொத்த சம்பளம்',
    regularPay: 'அடிப்படை ஊதியம்',
    overtimePay: 'கூடுதல் ஊதியம் (1.5x)',
    hazardPay: 'அபாய படி',
    deductions: 'வெளிப்படையான பிடித்தங்கள்',
    netPay: 'கைக்கு வரும் ஊதியம்',
    viewPaySlip: 'முழு சம்பள விவரத்தை காண்க',
    transparentPayGuarantee: '100% வெளிப்படையானது. மறைமுக பிடித்தங்கள் ஏதுமில்லை.',
    
    reportSafetyIssue: 'பாதுகாப்பு அபாயத்தை தெரிவிக்கவும்',
    naturalLanguagePrompt: 'அபாயத்தை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும்:',
    placeholderHazardText: 'எ.கா. 3-வது தளத்தில் சாரம் ஆடுகிறது, அல்லது அடித்தளத்தில் தண்ணீர் தேங்கிய இடத்தில் திறந்த மின்கம்பி உள்ளது...',
    analyzeWithAI: 'AI ஆய்வு செய் (Analyze)',
    analyzingWithAI: 'AI தகவல்களை ஆய்வு செய்கிறது...',
    categoryLabel: 'அபாய வகை',
    severityLabel: 'தீவிர நிலை',
    suggestedPriorityLabel: 'பரிந்துரைக்கப்பட்ட முன்னுரிமை',
    aiSuggestedCategory: 'AI கண்டறிந்த வகை',
    aiDisclaimer: 'AI பரிந்துரை — உறுதிப்படுத்தப்பட்ட உண்மை அல்ல. தகுதிவாய்ந்த அதிகாரியால் ஆய்வு செய்யப்பட வேண்டும்.',
    submitReport: 'புகாரை சமர்ப்பி',
    reportSubmittedSuccess: 'பாதுகாப்பு புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    ticketIdLabel: 'புகார் எண்',
    statusSubmitted: 'சமர்ப்பிக்கப்பட்டது',
    statusUnderReview: 'ஆய்வில் உள்ளது',
    statusResolved: 'தீர்க்கப்பட்டது',
    
    sendAnonymousFeedback: 'பெயரற்ற பணிச்சூழல் கருத்து',
    feedbackGuarantee: 'முழுமையான ரகசியம்: பணியாளர் அடையாள எண் அல்லது தகவல் சேமிக்கப்படாது.',
    feedbackPlaceholder: 'பணிச்சூழல், பாதுகாப்பு உபகரணங்கள், அதிகாரிகள் பற்றி அச்சமின்றி கருத்தைப் பகிரவும்...',
    submitFeedback: 'பெயரின்றி அனுப்பு',
    feedbackSubmitted: 'உங்கள் கருத்து பதிவு செய்யப்பட்டது.',
    
    verifiedSkills: 'சரிபார்க்கப்பட்ட திறன் பாஸ்போர்ட்',
    validCertificates: 'செயலில் உள்ள சான்றிதழ்கள்',
    expiringSoon: 'விரைவில் முடிவடைகிறது',
    credentialId: 'சான்றிதழ் எண்',
    issuingBody: 'வழங்கிய அமைப்பு',
    viewCredential: 'சான்றிதழ் பார்க்க',
    
    employerTitle: 'தொழிலாளர் பாதுகாப்பு மற்றும் நல கட்டுப்பாட்டு மையம்',
    totalActiveWorkers: 'செயலில் உள்ள தொழிலாளர்கள்',
    openSafetyHazards: 'தீர்வு காணாத அபாயங்கள்',
    fatigueAlertsCount: 'களைப்பு எச்சரிக்கைகள்',
    feedbackTrends: 'தொழிலாளர் குரல் & மனநிலை',
    safetyComplaintsTracker: 'பாதுகாப்பு புகார்கள் கண்காணிப்பு',
    updateStatus: 'நிலையை மாற்று',
    filterByIndustry: 'தொழில் / பிரிவு வடிகட்டி',
    allIndustries: 'அனைத்து தளங்கள் மற்றும் பிரிவுகள்',
    demoDataLabel: 'டெமோ தரவு முறை: பயன்பாட்டை விளக்குவதற்கான மாதிரி தரவு.',
  },
};
