import React from 'react';
import { UserProfile, UserProgress, calculateReadinessScore, RISK_FRAMEWORK } from '../App';
import { Award, TrendingUp, Brain, Target, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

interface ReadinessScoreProps {
  userProfile: UserProfile | null;
  userProgress: UserProgress;
}

export function ReadinessScore({ userProfile, userProgress }: ReadinessScoreProps) {
  // Calculate score using the centralized function
  const totalScore = calculateReadinessScore(userProgress);
  
  // Calculate breakdown
  const breakdown = {
    knowledge: userProgress.completedCapsules.length * 10,
    simulation: userProgress.simulationCompleted ? 15 : 0,
    readinessCheck: userProgress.decisionCheckPassed ? 20 : 0,
    discipline: Math.min(userProgress.weeklyGoalsCompleted * 5, 50),
  };

  // Determine risk access based on readiness score
  const riskAccess = RISK_FRAMEWORK.map(risk => ({
    ...risk,
    accessible: totalScore >= risk.minReadinessRequired,
    pointsNeeded: Math.max(0, risk.minReadinessRequired - totalScore),
  }));

  const getScoreMeaning = (score: number) => {
    if (score >= 80) {
      return {
        level: 'High Readiness',
        color: 'green',
        description: 'You demonstrate strong investor readiness. You understand core concepts, have practiced behavioral discipline, and show consistent habits.',
        nextSteps: [
          'Continue building discipline through weekly goals',
          'Review advanced learning capsules',
          'Consider creating a formal investment plan (outside this platform)',
        ],
      };
    } else if (score >= 50) {
      return {
        level: 'Moderate Readiness',
        color: 'yellow',
        description: 'You have a good foundation but need more practice. Focus on completing remaining stages and building consistency.',
        nextSteps: [
          'Complete all learning capsules',
          'Pass the decision readiness check',
          'Build weekly discipline habits',
        ],
      };
    } else {
      return {
        level: 'Building Foundation',
        color: 'orange',
        description: 'You are in the early stages of learning. Take time to understand fundamentals before progressing.',
        nextSteps: [
          'Complete foundational learning capsules',
          'Participate in behavioral simulation',
          'Focus on understanding core concepts',
        ],
      };
    }
  };

  const scoreMeaning = getScoreMeaning(totalScore);

  // Get color for score bar based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Investor Readiness Score
        </h1>
        <p className="text-gray-600">
          Your score reflects knowledge, behavior, and discipline — not money or returns.
        </p>
      </div>

      {/* Main Score Display with Color Zones */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-300 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <Award className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Your Current Score</div>
              <div className="flex items-end gap-2">
                <div className={`text-5xl font-bold ${
                  totalScore >= 80 ? 'text-green-600' :
                  totalScore >= 60 ? 'text-yellow-600' :
                  totalScore >= 40 ? 'text-orange-600' :
                  'text-red-600'
                }`}>{totalScore}</div>
                <div className="text-2xl text-gray-500 mb-1">/100</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
              scoreMeaning.color === 'green' ? 'bg-green-100 text-green-800' :
              scoreMeaning.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {scoreMeaning.level}
            </div>
          </div>
        </div>

        {/* Progress Bar with Color Zones */}
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          {/* Color zone backgrounds */}
          <div className="absolute inset-0 flex">
            <div className="w-[40%] bg-red-100"></div>
            <div className="w-[20%] bg-orange-100"></div>
            <div className="w-[20%] bg-yellow-100"></div>
            <div className="w-[20%] bg-green-100"></div>
          </div>
          {/* Actual progress */}
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getScoreColor(totalScore)} transition-all duration-500`}
            style={{ width: `${totalScore}%` }}
          />
          {/* Threshold markers */}
          <div className="absolute top-0 left-[40%] h-full w-0.5 bg-gray-400"></div>
          <div className="absolute top-0 left-[60%] h-full w-0.5 bg-gray-600"></div>
          <div className="absolute top-0 left-[80%] h-full w-0.5 bg-gray-400"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>0</span>
          <span className="text-orange-700">40</span>
          <span className="text-yellow-700">60</span>
          <span className="text-green-700">80</span>
          <span>100</span>
        </div>
        <div className="mt-3 p-3 bg-white/70 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Zone Guide:</strong> <span className="text-red-600">0-39: Critical</span> • 
            <span className="text-orange-600"> 40-59: Developing</span> • 
            <span className="text-yellow-600"> 60-79: Ready</span> • 
            <span className="text-green-600"> 80-100: Excellent</span>
          </p>
        </div>
      </div>

      {/* Detailed Score Breakdown with Visual Components */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Score Breakdown</h2>
        
        <div className="space-y-6">
          {/* Knowledge Component */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Knowledge Foundation</div>
                  <div className="text-sm text-gray-600">Learning capsules completed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">{breakdown.knowledge}</div>
                <div className="text-xs text-gray-500">/ 80 max</div>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(breakdown.knowledge / 80) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>{userProgress.completedCapsules.length} of 8 capsules</span>
              <span className="font-semibold text-teal-600">+10 pts each</span>
            </div>
          </div>

          {/* Simulation Component */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Behavioral Testing</div>
                  <div className="text-sm text-gray-600">Simulation exercise</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">{breakdown.simulation}</div>
                <div className="text-xs text-gray-500">/ 15 max</div>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${(breakdown.simulation / 15) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className={userProgress.simulationCompleted ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                {userProgress.simulationCompleted ? '✓ Completed' : '○ Not yet completed'}
              </span>
              <span className="font-semibold text-teal-600">+15 pts</span>
            </div>
          </div>

          {/* Readiness Check Component */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Decision Readiness</div>
                  <div className="text-sm text-gray-600">Assessment checkpoint</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">{breakdown.readinessCheck}</div>
                <div className="text-xs text-gray-500">/ 20 max</div>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${(breakdown.readinessCheck / 20) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className={userProgress.decisionCheckPassed ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                {userProgress.decisionCheckPassed ? '✓ Passed' : '○ Not passed'}
              </span>
              <span className="font-semibold text-teal-600">+20 pts</span>
            </div>
          </div>

          {/* Discipline Component */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Discipline Consistency</div>
                  <div className="text-sm text-gray-600">Weekly goals achieved</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">{breakdown.discipline}</div>
                <div className="text-xs text-gray-500">/ 50 max</div>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${(breakdown.discipline / 50) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>{userProgress.weeklyGoalsCompleted} goals completed</span>
              <span className="font-semibold text-teal-600">+5 pts each</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Meaning */}
      <div className={`border-2 rounded-xl p-6 mb-8 ${
        scoreMeaning.color === 'green' ? 'bg-green-50 border-green-200' :
        scoreMeaning.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
        'bg-orange-50 border-orange-200'
      }`}>
        <div className="flex items-start gap-3 mb-4">
          <TrendingUp className={`w-6 h-6 mt-1 ${
            scoreMeaning.color === 'green' ? 'text-green-600' :
            scoreMeaning.color === 'yellow' ? 'text-yellow-600' :
            'text-orange-600'
          }`} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What This Means</h3>
            <p className="text-gray-700 mb-4">{scoreMeaning.description}</p>
            
            <h4 className="font-semibold text-gray-900 mb-2">Recommended Next Steps:</h4>
            <ul className="space-y-2">
              {scoreMeaning.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-teal-600 font-bold mt-0.5">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Access Information */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Education Access</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your readiness score determines which risk categories you can explore in the Risk Guide.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {riskAccess.map((risk, index) => (
            <div 
              key={risk.id} 
              className={`flex items-start justify-between p-3 rounded-lg border-2 ${
                risk.accessible 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {risk.accessible ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{risk.label}</div>
                  <div className="text-xs text-gray-600">{risk.description}</div>
                </div>
              </div>
              <div className="text-right ml-3">
                {risk.accessible ? (
                  <span className="text-xs font-semibold text-green-700 whitespace-nowrap">Unlocked</span>
                ) : (
                  <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                    +{risk.pointsNeeded} pts needed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> Visit the "Risk Guide" tab to learn more about each risk category. 
            Higher-risk education is locked until you build sufficient readiness to protect you from uninformed decisions.
          </p>
        </div>
      </div>

      {/* Scoring Logic Explanation */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">How Scoring Works</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-teal-600 w-16">+10pts</span>
            <span>Per learning capsule completed (up to 8 capsules = 80 points max)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-teal-600 w-16">+15pts</span>
            <span>For completing the behavioral simulation exercise</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-teal-600 w-16">+20pts</span>
            <span>For passing the decision readiness check</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-teal-600 w-16">+5pts</span>
            <span>Per weekly discipline goal completed (up to 10 goals = 50 points max)</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          <strong>Note:</strong> This scoring system uses transparent, rule-based logic to measure readiness, not financial performance.
        </p>
        <p className="text-xs text-teal-700 mt-2">
          <strong>⏱️ Time-based growth:</strong> Progress is habit-based, not instant. Each action builds your readiness systematically.
        </p>
      </div>
    </div>
  );
}