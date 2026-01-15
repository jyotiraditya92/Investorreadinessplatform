import React, { useState } from 'react';
import { Home } from './components/Home';
import { RoadmapBuilder } from './components/RoadmapBuilder';
import { PersonalizedRoadmap } from './components/PersonalizedRoadmap';
import { ReadinessScore } from './components/ReadinessScore';
import { LearningCapsules } from './components/LearningCapsules';
import { SafetyTransparency } from './components/SafetyTransparency';
import { PracticePlatforms } from './components/PracticePlatforms';
import { FutureScale } from './components/FutureScale';
import { RiskEducation } from './components/RiskEducation';
import { FearGreedIndex } from './components/FearGreedIndex';
import { BookOpen, Target, Map, Award, GraduationCap, Shield, Rocket, Sparkles, AlertTriangle, Activity } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider, useLanguage, Language } from './contexts/LanguageContext';

// Risk categories with quantified downside percentages
export interface RiskCategory {
  id: string;
  label: string;
  downsideRange: string;
  description: string;
  examples: string;
  systemNote: string;
  minReadinessRequired: number;
}

export const RISK_FRAMEWORK: RiskCategory[] = [
  {
    id: 'very-low',
    label: 'Very Low Risk (0–5% downside)',
    downsideRange: '0–5%',
    description: 'Capital Protection Layer',
    examples: 'Savings Accounts, Recurring Deposits, Liquid Funds',
    systemNote: 'Stability-focused, minimal volatility. Suitable for emergency funds and short-term goals.',
    minReadinessRequired: 0,
  },
  {
    id: 'low',
    label: 'Low Risk (5–10% downside)',
    downsideRange: '5–10%',
    description: 'Stability with mild movement',
    examples: 'Short-term Debt Funds, Digital Gold',
    systemNote: 'Low volatility with slightly better potential than savings. Suitable for conservative investors.',
    minReadinessRequired: 0,
  },
  {
    id: 'moderate',
    label: 'Moderate Risk (10–20% downside)',
    downsideRange: '10–20%',
    description: 'Long-term growth with short-term volatility',
    examples: 'Index Funds (NIFTY 50, SENSEX)',
    systemNote: 'Important: Losses are usually temporary if time horizon ≥ 5 years. Requires patience and discipline.',
    minReadinessRequired: 40,
  },
  {
    id: 'high',
    label: 'High Risk (20–40% downside)',
    downsideRange: '20–40%',
    description: 'Requires emotional discipline',
    examples: 'Direct Equity (Individual Stocks)',
    systemNote: 'Significant short-term volatility. Requires strong understanding, research ability, and emotional control.',
    minReadinessRequired: 60,
  },
  {
    id: 'very-high',
    label: 'Very High Risk (40–100% downside)',
    downsideRange: '40–100%',
    description: 'Not suitable for beginners',
    examples: 'Intraday Trading, Futures & Options, Crypto Speculation',
    systemNote: 'High probability of capital loss. Not recommended for beginners. Requires extensive experience and risk management.',
    minReadinessRequired: 100, // Effectively locked for beginners
  },
];

export interface UserProfile {
  capital: number;
  riskCategoryId: string; // Changed from generic 'low/medium/high' to specific risk category ID
  horizon: 'short' | 'medium' | 'long';
  mode: 'explorer' | 'builder';
}

export interface UserProgress {
  completedCapsules: string[];
  simulationCompleted: boolean;
  weeklyGoalsCompleted: number;
  decisionCheckPassed: boolean;
}

// Calculate dynamic readiness score based on user progress
export function calculateReadinessScore(progress: UserProgress): number {
  let score = 0;
  
  // Knowledge component: +10 points per capsule (max 80 for 8 capsules)
  const knowledgeScore = progress.completedCapsules.length * 10;
  score += knowledgeScore;
  
  // Simulation component: +15 points
  if (progress.simulationCompleted) {
    score += 15;
  }
  
  // Decision check: +20 points
  if (progress.decisionCheckPassed) {
    score += 20;
  }
  
  // Discipline component: +5 points per weekly goal (max 50 for 10 goals)
  const disciplineScore = Math.min(progress.weeklyGoalsCompleted * 5, 50);
  score += disciplineScore;
  
  return Math.min(score, 100); // Cap at 100
}

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedCapsules: [],
    simulationCompleted: false,
    weeklyGoalsCompleted: 0,
    decisionCheckPassed: false,
  });

  // Listen for navigation events
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    window.addEventListener('navigateToTab', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigateToTab', handleNavigate as EventListener);
    };
  }, []);

  const tabs = [
    { id: 'home', label: t('nav.home'), icon: BookOpen },
    { id: 'builder', label: t('nav.buildRoadmap'), icon: Target },
    { id: 'roadmap', label: t('nav.yourRoadmap'), icon: Map },
    { id: 'score', label: t('nav.readinessScore'), icon: Award },
    { id: 'capsules', label: t('nav.learning'), icon: GraduationCap },
    { id: 'risk', label: t('nav.riskGuide'), icon: AlertTriangle },
    { id: 'platforms', label: t('nav.nextSteps'), icon: Rocket },
    { id: 'safety', label: t('nav.safety'), icon: Shield },
    { id: 'future', label: t('nav.futureScale'), icon: Sparkles },
    { id: 'feargreed', label: t('nav.fearGreed'), icon: Activity },
  ];

  const handleStartRoadmap = () => {
    setActiveTab('builder');
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveTab('roadmap');
  };

  const handleCapsuleComplete = (capsuleId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedCapsules: [...prev.completedCapsules, capsuleId],
    }));
  };

  const handleSimulationComplete = () => {
    setUserProgress(prev => ({ ...prev, simulationCompleted: true }));
  };

  const handleDecisionCheckPass = (passed: boolean) => {
    setUserProgress(prev => ({ ...prev, decisionCheckPassed: passed }));
  };

  const handleWeeklyGoalComplete = () => {
    setUserProgress(prev => ({
      ...prev,
      weeklyGoalsCompleted: prev.weeklyGoalsCompleted + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{t('header.title')}</h1>
              <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
              <p className="text-xs text-teal-700 font-medium mt-1">
                {t('header.tagline')}
              </p>
            </div>
            {/* Language Switcher */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  language === 'hi'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                हिं
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-200 bg-white sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <Home onStartRoadmap={handleStartRoadmap} />}
        {activeTab === 'builder' && <RoadmapBuilder onSubmit={handleProfileSubmit} />}
        {activeTab === 'roadmap' && (
          <PersonalizedRoadmap
            userProfile={userProfile}
            userProgress={userProgress}
            onSimulationComplete={handleSimulationComplete}
            onDecisionCheckPass={handleDecisionCheckPass}
            onWeeklyGoalComplete={handleWeeklyGoalComplete}
          />
        )}
        {activeTab === 'score' && (
          <ReadinessScore userProfile={userProfile} userProgress={userProgress} />
        )}
        {activeTab === 'capsules' && (
          <LearningCapsules
            completedCapsules={userProgress.completedCapsules}
            onCapsuleComplete={handleCapsuleComplete}
          />
        )}
        {activeTab === 'risk' && (
          <RiskEducation userProgress={userProgress} />
        )}
        {activeTab === 'platforms' && (
          <PracticePlatforms userProfile={userProfile} userProgress={userProgress} />
        )}
        {activeTab === 'safety' && <SafetyTransparency />}
        {activeTab === 'future' && <FutureScale userProgress={userProgress} />}
        {activeTab === 'feargreed' && <FearGreedIndex />}
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}