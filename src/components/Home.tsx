import React, { useState } from 'react';
import { ArrowRight, Compass, Hammer, AlertTriangle, Shield, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onStartRoadmap: () => void;
}

export function Home({ onStartRoadmap }: HomeProps) {
  const { t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<'explorer' | 'builder'>('explorer');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Statistics Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {t('home.statsBanner')}
            </div>
            <p className="text-gray-700 mb-3">
              {t('home.statsDescription')}
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span className="font-semibold">{t('home.source')}</span> {t('home.sourceText')}
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-8 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {t('home.noTips')}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {t('home.valueProposition')}
            </p>
            
            {/* EXPLICIT DIFFERENTIATION STATEMENT */}
            <div className="bg-white rounded-xl p-6 mb-4 border-2 border-teal-400 shadow-sm">
              <p className="text-lg text-gray-900 leading-relaxed">
                <strong className="text-teal-700">{t('home.differentiation1')}</strong><br/>
                <strong className="text-teal-700">{t('home.differentiation2')}</strong>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-teal-200">
                <div className="font-semibold text-gray-900 mb-1">{t('home.traditionalApps')}</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t('home.traditional1')}</li>
                  <li>• {t('home.traditional2')}</li>
                  <li>• {t('home.traditional3')}</li>
                  <li>• {t('home.traditional4')}</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-teal-200">
                <div className="font-semibold text-gray-900 mb-1">{t('home.readinessSystem')}</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ {t('home.readiness1')}</li>
                  <li>✓ {t('home.readiness2')}</li>
                  <li>✓ {t('home.readiness3')}</li>
                  <li>✓ {t('home.readiness4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          {t('home.heroTitle')}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('home.heroSubtitle')}
        </p>
        <button
          onClick={onStartRoadmap}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors text-lg font-semibold shadow-lg"
        >
          {t('home.startAssessment')}
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-gray-500 mt-3">
          {t('home.takesTime')}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {t('home.chooseMode')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Explorer Mode */}
          <button
            onClick={() => setSelectedMode('explorer')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              selectedMode === 'explorer'
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-teal-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Compass className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('home.explorerMode')}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('home.explorerDescription')}
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• {t('home.explorerFeature1')}</li>
                  <li>• {t('home.explorerFeature2')}</li>
                  <li>• {t('home.explorerFeature3')}</li>
                </ul>
              </div>
            </div>
          </button>

          {/* Builder Mode */}
          <button
            onClick={() => setSelectedMode('builder')}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              selectedMode === 'builder'
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-teal-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Hammer className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('home.builderMode')}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('home.builderDescription')}
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• {t('home.builderFeature1')}</li>
                  <li>• {t('home.builderFeature2')}</li>
                  <li>• {t('home.builderFeature3')}</li>
                </ul>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('home.learnFirst')}</h3>
          <p className="text-sm text-gray-600">
            {t('home.learnFirstDesc')}
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('home.simulateBehavior')}</h3>
          <p className="text-sm text-gray-600">
            {t('home.simulateBehaviorDesc')}
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🛡️</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t('home.protectedPath')}</h3>
          <p className="text-sm text-gray-600">
            {t('home.protectedPathDesc')}
          </p>
        </div>
      </div>

      {/* What This Is NOT */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t('home.thisIsNot')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">✗</span>
            <span>{t('home.not1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">✗</span>
            <span>{t('home.not2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">✗</span>
            <span>{t('home.not3')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}