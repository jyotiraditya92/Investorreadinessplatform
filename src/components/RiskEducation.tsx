import React from 'react';
import { UserProgress, calculateReadinessScore, RISK_FRAMEWORK } from '../App';
import { AlertTriangle, Lock, CheckCircle2, Shield, TrendingUp, AlertCircle } from 'lucide-react';

interface RiskEducationProps {
  userProgress: UserProgress;
}

export function RiskEducation({ userProgress }: RiskEducationProps) {
  const currentScore = calculateReadinessScore(userProgress);

  // Determine which risk categories are accessible based on readiness
  const getRiskAccessStatus = (minReadiness: number) => {
    if (currentScore >= minReadiness) {
      return { accessible: true, label: 'Unlocked', icon: CheckCircle2, color: 'green' };
    } else {
      return { 
        accessible: false, 
        label: `Locked (${minReadiness} pts required)`, 
        icon: Lock, 
        color: 'gray',
        pointsNeeded: minReadiness - currentScore 
      };
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Understanding Risk
            </h1>
            <p className="text-gray-600">
              Risk is defined as: <strong>"Probability of short-term capital loss, not bad investment."</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Current Readiness Context */}
      <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-teal-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Your Current Readiness Level</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-3xl font-bold text-teal-600">{currentScore}</div>
              <div className="text-sm text-gray-600">/ 100 points</div>
            </div>
            <p className="text-sm text-gray-700">
              Based on your readiness score, certain risk categories are locked to protect you from 
              advancing before you're prepared. Complete learning capsules, simulations, and assessments 
              to unlock higher risk education content.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <strong>Educational Guidance Only:</strong> This section provides educational information about 
            risk categories. This is NOT product advice or stock recommendations. The system uses readiness 
            scores to determine which risk levels you should learn about based on your preparation.
          </div>
        </div>
      </div>

      {/* Risk Spectrum */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Spectrum Framework</h2>
        <p className="text-gray-600 mb-4">
          The following categories help you understand different levels of investment risk. 
          Each category shows the potential short-term downside and requires different levels of readiness.
        </p>
        
        {/* Risk Clarity Reinforcement */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>📘 Important:</strong> Risk = probability of short-term loss, not failure. Higher risk means higher potential for temporary decline, not guaranteed poor results. Understanding and managing this volatility is what separates prepared investors from beginners.
          </p>
        </div>

        <div className="space-y-4">
          {RISK_FRAMEWORK.map((risk, index) => {
            const accessStatus = getRiskAccessStatus(risk.minReadinessRequired);
            const StatusIcon = accessStatus.icon;

            return (
              <div
                key={risk.id}
                className={`border-2 rounded-xl p-6 transition-all ${
                  accessStatus.accessible
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-300 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          index === 0 ? 'bg-green-100 text-green-800' :
                          index === 1 ? 'bg-blue-100 text-blue-800' :
                          index === 2 ? 'bg-yellow-100 text-yellow-800' :
                          index === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {risk.downsideRange} downside
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                          accessStatus.accessible
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {accessStatus.label}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {risk.label}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium mb-3">
                      {risk.description}
                    </p>
                  </div>
                </div>

                {accessStatus.accessible ? (
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Examples (Educational)
                      </div>
                      <p className="text-sm text-gray-700">{risk.examples}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-xs font-semibold text-blue-900 mb-1">System Note</div>
                      <p className="text-sm text-blue-800">{risk.systemNote}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>🔒 Locked until readiness improves.</strong> You need{' '}\n                          <span className="font-semibold text-amber-700">\n                            {accessStatus.pointsNeeded} more readiness points\n                          </span>{' '}\n                          to access this educational content.\n                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Action restricted to protect beginners.</strong> Complete learning capsules, simulations, and assessments to increase your readiness score.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Access Summary */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-300 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Risk Access Based on Readiness
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-24 flex-shrink-0 font-semibold text-gray-600">0-39 pts</div>
            <div className="text-gray-700">
              Access to <strong>Very Low Risk</strong> and <strong>Low Risk</strong> education only. 
              Moderate and higher risks are locked.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-24 flex-shrink-0 font-semibold text-gray-600">40-59 pts</div>
            <div className="text-gray-700">
              <strong>Moderate Risk</strong> education unlocked. High and Very High risks remain locked.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-24 flex-shrink-0 font-semibold text-gray-600">60-99 pts</div>
            <div className="text-gray-700">
              <strong>High Risk</strong> education unlocked. Very High Risk remains locked (not suitable for beginners).
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="w-24 flex-shrink-0 font-semibold text-red-700">100 pts</div>
            <div className="text-red-800">
              <strong>Very High Risk</strong> is not recommended for beginners regardless of score. 
              This category has high probability of capital loss.
            </div>
          </div>
        </div>
      </div>

      {/* Protection Principle */}
      <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Shield className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why This Protection Matters</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                The system gates higher risk education based on your readiness to protect you from making 
                uninformed decisions. This is not about controlling what you can invest in — it's about 
                ensuring you understand the risks before exploring higher volatility options.
              </p>
              <p>
                <strong>Key principle:</strong> Learning about risk without readiness is like reading about 
                swimming without understanding water safety. Knowledge alone isn't enough — you need preparation, 
                discipline, and understanding of consequences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> This is educational content only and does not constitute financial advice. 
          Risk percentages are approximate estimates for educational purposes. Actual risk varies based on specific 
          products, market conditions, and individual circumstances. This platform does not recommend specific 
          investments or promise returns. Always consult a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}