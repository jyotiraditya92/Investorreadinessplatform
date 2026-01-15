import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FearGreedIndexProps {
  // Can be controlled externally or use internal simulation
  value?: number;
}

export function FearGreedIndex({ value: externalValue }: FearGreedIndexProps) {
  const { t } = useLanguage();
  // Simulate a dynamic value (0-100) if not provided
  const [internalValue, setInternalValue] = useState(52);
  
  const value = externalValue ?? internalValue;

  // Simulate value changes over time (for demo purposes)
  useEffect(() => {
    if (externalValue === undefined) {
      const interval = setInterval(() => {
        setInternalValue(prev => {
          // Random walk with bounds
          const change = Math.random() * 10 - 5;
          const newValue = prev + change;
          return Math.max(0, Math.min(100, newValue));
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [externalValue]);

  // Determine sentiment and color
  const getSentiment = (val: number) => {
    if (val < 20) return { label: t('fearGreed.extremeFear'), color: '#ef4444' }; // red
    if (val < 40) return { label: t('fearGreed.fear'), color: '#f97316' }; // orange
    if (val < 60) return { label: t('fearGreed.neutral'), color: '#22c55e' }; // green (teal accent)
    if (val < 80) return { label: t('fearGreed.greed'), color: '#3b82f6' }; // blue
    return { label: t('fearGreed.extremeGreed'), color: '#8b5cf6' }; // purple
  };

  const sentiment = getSentiment(value);

  // Calculate gauge rotation (-90 to 90 degrees)
  const rotation = (value / 100) * 180 - 90;

  const getDescription = (val: number) => {
    if (val < 20) return t('fearGreed.extremeFearDesc');
    if (val < 40) return t('fearGreed.fearDesc');
    if (val < 60) return t('fearGreed.neutralDesc');
    if (val < 80) return t('fearGreed.greedDesc');
    return t('fearGreed.extremeGreedDesc');
  };

  const getGuidance = (val: number) => {
    if (val < 20) return t('fearGreed.extremeFearGuidance');
    if (val < 40) return t('fearGreed.fearGuidance');
    if (val < 60) return t('fearGreed.neutralGuidance');
    if (val < 80) return t('fearGreed.greedGuidance');
    return t('fearGreed.extremeGreedGuidance');
  };

  const getIcon = (val: number) => {
    if (val < 40) return <TrendingDown className="w-5 h-5" />;
    if (val < 60) return <AlertCircle className="w-5 h-5" />;
    return <TrendingUp className="w-5 h-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('fearGreed.title')}</h1>
        <p className="text-gray-600">{t('fearGreed.subtitle')}</p>
      </div>

      {/* Main Gauge Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <div className="flex flex-col items-center">
          {/* Gauge Container */}
          <div className="relative w-64 h-32 mb-6">
            {/* Gauge Background Arc */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="75%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              
              {/* Background arc */}
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Colored arc */}
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Needle */}
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="20"
                stroke={sentiment.color}
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  transformOrigin: '100px 90px',
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.5s ease-out',
                }}
              />
              
              {/* Center dot */}
              <circle cx="100" cy="90" r="6" fill={sentiment.color} />
            </svg>
          </div>

          {/* Score Display */}
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-gray-900 mb-2">{Math.round(value)}</div>
            <div
              className="text-xl font-semibold px-6 py-2 rounded-full"
              style={{ backgroundColor: `${sentiment.color}15`, color: sentiment.color }}
            >
              {sentiment.label}
            </div>
          </div>

          {/* Range Indicators */}
          <div className="w-full flex justify-between text-xs text-gray-500 mt-4">
            <span className="text-red-600 font-medium">0</span>
            <span className="text-orange-500">25</span>
            <span className="text-green-600">50</span>
            <span className="text-blue-500">75</span>
            <span className="text-purple-600 font-medium">100</span>
          </div>
        </div>
      </div>

      {/* Current State Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <div
            className="p-3 rounded-lg flex-shrink-0"
            style={{ backgroundColor: `${sentiment.color}15`, color: sentiment.color }}
          >
            {getIcon(value)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{t('fearGreed.currentState')}</h3>
            <p className="text-gray-700 mb-3">{getDescription(value)}</p>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">{t('fearGreed.guidanceTitle')}</div>
                  <p className="text-sm text-gray-600">{getGuidance(value)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Check Card */}
      <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">{t('fearGreed.emotionalCheck')}</h3>
        <p className="text-gray-700 mb-4">{t('fearGreed.yourDecisions')}</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border-2 border-teal-600">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-medium text-gray-900">{t('fearGreed.logic')}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-300 opacity-60">
            <div className="text-center">
              <div className="text-3xl mb-2">😰</div>
              <div className="font-medium text-gray-900">{t('fearGreed.emotions')}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-teal-200">
          <div className="flex items-start gap-2">
            <span className="text-teal-600 font-bold text-lg">💡</span>
            <div>
              <div className="font-semibold text-gray-900 mb-1">{t('fearGreed.remember')}</div>
              <p className="text-sm text-gray-700">{t('fearGreed.rememberText')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-red-600 mb-2"></div>
          <div className="text-xs text-gray-600">{t('fearGreed.extremeFear')}</div>
          <div className="text-xs text-gray-500">0-20</div>
        </div>
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-orange-500 mb-2"></div>
          <div className="text-xs text-gray-600">{t('fearGreed.fear')}</div>
          <div className="text-xs text-gray-500">20-40</div>
        </div>
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-green-600 mb-2"></div>
          <div className="text-xs text-gray-600">{t('fearGreed.neutral')}</div>
          <div className="text-xs text-gray-500">40-60</div>
        </div>
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-blue-500 mb-2"></div>
          <div className="text-xs text-gray-600">{t('fearGreed.greed')}</div>
          <div className="text-xs text-gray-500">60-80</div>
        </div>
        <div className="text-center">
          <div className="w-full h-2 rounded-full bg-purple-600 mb-2"></div>
          <div className="text-xs text-gray-600">{t('fearGreed.extremeGreed')}</div>
          <div className="text-xs text-gray-500">80-100</div>
        </div>
      </div>
    </div>
  );
}
