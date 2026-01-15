import React, { useState } from 'react';
import { UserProfile, RISK_FRAMEWORK } from '../App';
import { ArrowRight, AlertTriangle } from 'lucide-react';

interface RoadmapBuilderProps {
  onSubmit: (profile: UserProfile) => void;
}

export function RoadmapBuilder({ onSubmit }: RoadmapBuilderProps) {
  const [capital, setCapital] = useState<number>(500);
  const [riskCategoryId, setRiskCategoryId] = useState<string>('low');
  const [horizon, setHorizon] = useState<'short' | 'medium' | 'long'>('medium');
  const [mode, setMode] = useState<'explorer' | 'builder'>('explorer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ capital, riskCategoryId, horizon, mode });
  };

  // Only show beginner-appropriate risk categories in roadmap builder
  const beginnerRiskCategories = RISK_FRAMEWORK.filter(r => 
    r.id !== 'very-high' // Exclude very high risk from initial selection
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Build Your Personalized Roadmap
        </h1>
        <p className="text-gray-600">
          Answer these questions to receive a customized learning and discipline path.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 space-y-8">
        {/* Starting Capital */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Starting Capital
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[500, 1000, 2000, 5000].map(amount => (
              <button
                key={amount}
                type="button"
                onClick={() => setCapital(amount)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  capital === amount
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold">₹{amount}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Category Selection with Quantified Risk */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Risk Comfort Level
          </label>
          <p className="text-xs text-gray-600 mb-4">
            Risk = probability of short-term capital loss. Select based on your comfort with volatility.
          </p>
          <div className="space-y-3">
            {beginnerRiskCategories.map((risk, index) => (
              <button
                key={risk.id}
                type="button"
                onClick={() => setRiskCategoryId(risk.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  riskCategoryId === risk.id
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-semibold text-gray-900">{risk.label}</div>
                      <div
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          index === 0 ? 'bg-green-100 text-green-700' :
                          index === 1 ? 'bg-blue-100 text-blue-700' :
                          index === 2 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {risk.downsideRange}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{risk.description}</div>
                    <div className="text-xs text-gray-500">Examples: {risk.examples}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> Very High Risk options (Intraday, F&O, Crypto) are not suitable for 
                beginners and are excluded from roadmap recommendations. Visit the Risk Guide to learn more.
              </p>
            </div>
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Time Horizon
          </label>
          <div className="grid md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setHorizon('short')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                horizon === 'short'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Short-term</div>
              <div className="text-sm text-gray-600">6 months - 1 year</div>
            </button>
            <button
              type="button"
              onClick={() => setHorizon('medium')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                horizon === 'medium'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Medium-term</div>
              <div className="text-sm text-gray-600">1 - 3 years</div>
            </button>
            <button
              type="button"
              onClick={() => setHorizon('long')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                horizon === 'long'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Long-term</div>
              <div className="text-sm text-gray-600">3+ years</div>
            </button>
          </div>
        </div>

        {/* Learning Mode */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Preferred Mode
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('explorer')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                mode === 'explorer'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Explorer Mode</div>
              <div className="text-sm text-gray-600">Learn and simulate at your pace</div>
            </button>
            <button
              type="button"
              onClick={() => setMode('builder')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                mode === 'builder'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">Builder Mode</div>
              <div className="text-sm text-gray-600">Structured discipline and goals</div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            Generate My Roadmap
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Your roadmap will be customized based on these inputs using rule-based logic. 
          This is a demonstration of how the system adapts to different user profiles.
        </p>
      </div>
    </div>
  );
}