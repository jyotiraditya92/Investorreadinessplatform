import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Header
  'header.title': {
    en: 'InvestEasy',
    hi: 'InvestEasy',
  },
  'header.subtitle': {
    en: 'Learn. Simulate. Build Discipline.',
    hi: 'सीखें. अनुकरण करें. अनुशासन बनाएं.',
  },
  'header.tagline': {
    en: 'Most investing apps suggest where to invest. This system decides when you are ready.',
    hi: 'अधिकांश निवेश ऐप बताते हैं कहां निवेश करें। यह प्रणाली तय करती है कि आप कब तैयार हैं।',
  },
  
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम',
  },
  'nav.buildRoadmap': {
    en: 'Build Roadmap',
    hi: 'रोडमैप बनाएं',
  },
  'nav.yourRoadmap': {
    en: 'Your Roadmap',
    hi: 'आपका रोडमैप',
  },
  'nav.readinessScore': {
    en: 'Readiness Score',
    hi: 'तत्परता स्कोर',
  },
  'nav.learning': {
    en: 'Learning',
    hi: 'सीखना',
  },
  'nav.riskGuide': {
    en: 'Risk Guide',
    hi: 'जोखिम गाइड',
  },
  'nav.nextSteps': {
    en: 'Next Steps',
    hi: 'अगले कदम',
  },
  'nav.safety': {
    en: 'Safety',
    hi: 'सुरक्षा',
  },
  'nav.futureScale': {
    en: 'Future Scale',
    hi: 'भविष्य का स्केल',
  },
  'nav.fearGreed': {
    en: 'Fear & Greed',
    hi: 'डर और लालच',
  },
  
  // Home Page
  'home.statsBanner': {
    en: '73% of first-time investors lose money in their first year',
    hi: '73% पहली बार निवेशक अपने पहले वर्ष में पैसे खो देते हैं',
  },
  'home.statsDescription': {
    en: 'Most losses come from lack of preparation, emotional decisions, and poor discipline — not market conditions.',
    hi: 'अधिकांश नुकसान तैयारी की कमी, भावनात्मक निर्णय और खराब अनुशासन से होते हैं — बाजार की स्थिति से नहीं।',
  },
  'home.source': {
    en: 'Source:',
    hi: 'स्रोत:',
  },
  'home.sourceText': {
    en: 'Behavioral Finance Research, 2023',
    hi: 'व्यवहारिक वित्त अनुसंधान, 2023',
  },
  'home.noTips': {
    en: "We don't give stock tips. We make you ready.",
    hi: 'हम स्टॉक टिप्स नहीं देते। हम आपको तैयार करते हैं।',
  },
  'home.valueProposition': {
    en: 'This platform evaluates your knowledge, tests your behavior, and builds your discipline before you risk real money.',
    hi: 'यह प्लेटफॉर्म आपके ज्ञान का मूल्यांकन करता है, आपके व्यवहार का परीक्षण करता है, और वास्तविक पैसे को जोखिम में डालने से पहले आपका अनुशासन बनाता है।',
  },
  'home.differentiation1': {
    en: 'Most investing apps suggest where to invest.',
    hi: 'अधिकांश निवेश ऐप बताते हैं कहां निवेश करें।',
  },
  'home.differentiation2': {
    en: 'This system decides when you are ready.',
    hi: 'यह प्रणाली तय करती है कि आप कब तैयार हैं।',
  },
  'home.traditionalApps': {
    en: 'Traditional Apps',
    hi: 'पारंपरिक ऐप्स',
  },
  'home.readinessSystem': {
    en: 'Readiness System',
    hi: 'तत्परता प्रणाली',
  },
  'home.traditional1': {
    en: 'Give you stocks/tips immediately',
    hi: 'तुरंत स्टॉक/टिप्स देते हैं',
  },
  'home.traditional2': {
    en: 'Focus on returns & predictions',
    hi: 'रिटर्न और भविष्यवाणियों पर ध्यान केंद्रित',
  },
  'home.traditional3': {
    en: 'No behavior assessment',
    hi: 'कोई व्यवहार मूल्यांकन नहीं',
  },
  'home.traditional4': {
    en: 'High beginner failure rate',
    hi: 'उच्च शुरुआती विफलता दर',
  },
  'home.readiness1': {
    en: 'Evaluates your preparation first',
    hi: 'पहले आपकी तैयारी का मूल्यांकन',
  },
  'home.readiness2': {
    en: 'Tests decision quality, not predictions',
    hi: 'निर्णय की गुणवत्ता का परीक्षण, भविष्यवाणियों का नहीं',
  },
  'home.readiness3': {
    en: "Locks stages until you're ready",
    hi: 'तैयार होने तक चरणों को लॉक करता है',
  },
  'home.readiness4': {
    en: 'Protects beginners from mistakes',
    hi: 'शुरुआती लोगों को गलतियों से बचाता है',
  },
  'home.heroTitle': {
    en: 'Build Investor Readiness — Even With ₹500',
    hi: 'निवेशक तत्परता बनाएं — सिर्फ ₹500 से',
  },
  'home.heroSubtitle': {
    en: 'A beginner-first system for learning, simulating, and building discipline through visible rule-based logic.',
    hi: 'दृश्यमान नियम-आधारित तर्क के माध्यम से सीखने, अनुकरण करने और अनुशासन बनाने के लिए शुरुआती-प्रथम प्रणाली।',
  },
  'home.startAssessment': {
    en: 'Start Your Assessment',
    hi: 'अपना मूल्यांकन शुरू करें',
  },
  'home.takesTime': {
    en: 'Takes 2 minutes • Get personalized roadmap instantly',
    hi: '2 मिनट लगते हैं • तुरंत व्यक्तिगत रोडमैप प्राप्त करें',
  },
  'home.chooseMode': {
    en: 'Choose Your Mode',
    hi: 'अपना मोड चुनें',
  },
  'home.explorerMode': {
    en: 'Explorer Mode',
    hi: 'एक्सप्लोरर मोड',
  },
  'home.explorerDescription': {
    en: 'Learn fundamentals and simulate scenarios without pressure. Perfect for complete beginners.',
    hi: 'बिना दबाव के मूल बातें सीखें और परिदृश्यों का अनुकरण करें। पूर्ण शुरुआती लोगों के लिए उत्तम।',
  },
  'home.explorerFeature1': {
    en: 'Educational capsules',
    hi: 'शैक्षिक कैप्सूल',
  },
  'home.explorerFeature2': {
    en: 'Risk-free simulations',
    hi: 'जोखिम-मुक्त अनुकरण',
  },
  'home.explorerFeature3': {
    en: 'No time commitments',
    hi: 'कोई समय प्रतिबद्धता नहीं',
  },
  'home.builderMode': {
    en: 'Builder Mode',
    hi: 'बिल्डर मोड',
  },
  'home.builderDescription': {
    en: 'Build discipline through structured weekly goals and consistency tracking.',
    hi: 'संरचित साप्ताहिक लक्ष्यों और निरंतरता ट्रैकिंग के माध्यम से अनुशासन बनाएं।',
  },
  'home.builderFeature1': {
    en: 'Structured micro-goals',
    hi: 'संरचित माइक्रो-लक्ष्य',
  },
  'home.builderFeature2': {
    en: 'Consistency tracking',
    hi: 'निरंतरता ट्रैकिंग',
  },
  'home.builderFeature3': {
    en: 'Habit formation focus',
    hi: 'आदत निर्माण पर ध्यान',
  },
  'home.learnFirst': {
    en: 'Learn First',
    hi: 'पहले सीखें',
  },
  'home.learnFirstDesc': {
    en: 'Understand core concepts before making any decisions. No shortcuts.',
    hi: 'कोई भी निर्णय लेने से पहले मुख्य अवधारणाओं को समझें। कोई शॉर्टकट नहीं।',
  },
  'home.simulateBehavior': {
    en: 'Simulate Behavior',
    hi: 'व्यवहार का अनुकरण',
  },
  'home.simulateBehaviorDesc': {
    en: 'See how consistency and discipline impact outcomes over time.',
    hi: 'देखें कि निरंतरता और अनुशासन समय के साथ परिणामों को कैसे प्रभावित करते हैं।',
  },
  'home.protectedPath': {
    en: 'Protected Path',
    hi: 'सुरक्षित पथ',
  },
  'home.protectedPathDesc': {
    en: "Progress blocked until you're ready. Safety over speed.",
    hi: 'तैयार होने तक प्रगति अवरुद्ध। गति से अधिक सुरक्षा।',
  },
  'home.thisIsNot': {
    en: 'This Is NOT:',
    hi: 'यह नहीं है:',
  },
  'home.not1': {
    en: 'A stock advisory or tip-giving service',
    hi: 'स्टॉक सलाहकार या टिप देने वाली सेवा',
  },
  'home.not2': {
    en: 'A platform for real money transactions',
    hi: 'वास्तविक पैसे के लेनदेन के लिए मंच',
  },
  'home.not3': {
    en: 'A get-rich-quick scheme or return-focused system',
    hi: 'जल्दी अमीर बनने की योजना या रिटर्न-केंद्रित प्रणाली',
  },
  
  // Fear & Greed
  'fearGreed.title': {
    en: 'Fear & Greed Factor',
    hi: 'डर और लालच कारक',
  },
  'fearGreed.subtitle': {
    en: 'Monitor your emotional state and market sentiment',
    hi: 'अपनी भावनात्मक स्थिति और बाजार की भावना की निगरानी करें',
  },
  'fearGreed.extremeFear': {
    en: 'Extreme Fear',
    hi: 'अत्यधिक डर',
  },
  'fearGreed.fear': {
    en: 'Fear',
    hi: 'डर',
  },
  'fearGreed.neutral': {
    en: 'Neutral',
    hi: 'तटस्थ',
  },
  'fearGreed.greed': {
    en: 'Greed',
    hi: 'लालच',
  },
  'fearGreed.extremeGreed': {
    en: 'Extreme Greed',
    hi: 'अत्यधिक लालच',
  },
  'fearGreed.currentState': {
    en: 'Current State',
    hi: 'वर्तमान स्थिति',
  },
  'fearGreed.whatThisMeans': {
    en: 'What This Means',
    hi: 'इसका क्या मतलब है',
  },
  'fearGreed.guidanceTitle': {
    en: 'Guidance for Beginners',
    hi: 'शुरुआती लोगों के लिए मार्गदर्शन',
  },
  'fearGreed.extremeFearDesc': {
    en: 'Markets are in panic mode. Investors are selling heavily out of fear.',
    hi: 'बाजार घबराहट मोड में हैं। निवेशक डर से भारी बिक्री कर रहे हैं।',
  },
  'fearGreed.fearDesc': {
    en: 'Uncertainty is high. Many investors are cautious and risk-averse.',
    hi: 'अनिश्चितता अधिक है। कई निवेशक सतर्क और जोखिम से बचने वाले हैं।',
  },
  'fearGreed.neutralDesc': {
    en: 'Market sentiment is balanced. Neither excessive fear nor greed.',
    hi: 'बाजार की भावना संतुलित है। न अत्यधिक डर न लालच।',
  },
  'fearGreed.greedDesc': {
    en: 'Optimism is building. Investors are becoming more confident.',
    hi: 'आशावाद बढ़ रहा है। निवेशक अधिक आत्मविश्वासी हो रहे हैं।',
  },
  'fearGreed.extremeGreedDesc': {
    en: 'Markets may be overheated. Excessive optimism can lead to bubbles.',
    hi: 'बाजार अधिक गर्म हो सकते हैं। अत्यधिक आशावाद बुलबुले का कारण बन सकता है।',
  },
  'fearGreed.extremeFearGuidance': {
    en: 'Avoid panic selling. This can be a good time for long-term investors, but only with proper knowledge.',
    hi: 'घबराहट में बिक्री से बचें। यह दीर्घकालिक निवेशकों के लिए अच्छा समय हो सकता है, लेकिन केवल उचित ज्ञान के साथ।',
  },
  'fearGreed.fearGuidance': {
    en: 'Stay calm and stick to your plan. Avoid making emotional decisions.',
    hi: 'शांत रहें और अपनी योजना पर टिके रहें। भावनात्मक निर्णय लेने से बचें।',
  },
  'fearGreed.neutralGuidance': {
    en: 'Good time to focus on learning and building your strategy.',
    hi: 'सीखने और अपनी रणनीति बनाने पर ध्यान केंद्रित करने का अच्छा समय।',
  },
  'fearGreed.greedGuidance': {
    en: 'Be cautious. Don\'t let optimism cloud your judgment.',
    hi: 'सावधान रहें। आशावाद को अपने निर्णय पर हावी न होने दें।',
  },
  'fearGreed.extremeGreedGuidance': {
    en: 'High risk of correction. Avoid chasing returns. Focus on discipline.',
    hi: 'सुधार का उच्च जोखिम। रिटर्न का पीछा करने से बचें। अनुशासन पर ध्यान दें।',
  },
  'fearGreed.emotionalCheck': {
    en: 'Emotional Check',
    hi: 'भावनात्मक जांच',
  },
  'fearGreed.yourDecisions': {
    en: 'Are your investment decisions driven by:',
    hi: 'क्या आपके निवेश निर्णय इससे प्रेरित हैं:',
  },
  'fearGreed.logic': {
    en: 'Logic & Research',
    hi: 'तर्क और अनुसंधान',
  },
  'fearGreed.emotions': {
    en: 'Fear or FOMO',
    hi: 'डर या एफओएमओ',
  },
  'fearGreed.remember': {
    en: 'Remember',
    hi: 'याद रखें',
  },
  'fearGreed.rememberText': {
    en: 'The best investors make decisions based on data and discipline, not market emotions.',
    hi: 'सर्वश्रेष्ठ निवेशक डेटा और अनुशासन के आधार पर निर्णय लेते हैं, बाजार की भावनाओं के आधार पर नहीं।',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}