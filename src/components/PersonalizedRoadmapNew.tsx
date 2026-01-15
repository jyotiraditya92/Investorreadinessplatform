import React, { useState } from 'react';
import { UserProfile, UserProgress, calculateReadinessScore } from '../App';
import { CheckCircle2, Circle, Lock, AlertCircle, TrendingUp, Rocket, Award, Brain, Shield, Play } from 'lucide-react';

interface PersonalizedRoadmapProps {
  userProfile: UserProfile | null;
  userProgress: UserProgress;
  onSimulationComplete: () => void;
  onDecisionCheckPass: (passed: boolean) => void;
  onWeeklyGoalComplete: () => void;
}

export function PersonalizedRoadmap({
  userProfile,
  userProgress,
  onSimulationComplete,
  onDecisionCheckPass,
  onWeeklyGoalComplete,
}: PersonalizedRoadmapProps) {
  const [simulationResult, setSimulationResult] = useState<'consistent' | 'inconsistent' | null>(null);
  const [checklistAnswers, setChecklistAnswers] = useState<boolean[]>([false, false, false, false]);
  const [weeklyGoals, setWeeklyGoals] = useState<boolean[]>([false, false, false, false]);
  const [attemptedReadinessCheck, setAttemptedReadinessCheck] = useState(false);

  if (!userProfile) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Roadmap Yet</h2>
          <p className="text-gray-600">Build your roadmap first to see your personalized learning path.</p>
        </div>
      </div>
    );
  }

  const currentScore = calculateReadinessScore(userProgress);

  // Define stage unlock conditions
  const stage1Unlocked = true; // Always unlocked
  const stage2Unlocked = userProgress.completedCapsules.length >= 3;
  const stage3Unlocked = stage2Unlocked && userProgress.simulationCompleted;
  const stage4Unlocked = stage3Unlocked && currentScore >= 60;

  // Generate dynamic system assessment
  const getSystemAssessment = () => {
    if (currentScore >= 80) {
      return {
        message: "You demonstrate strong investor readiness. The system has evaluated your consistency and decision quality as high.",
        status: "success",
        icon: Award,
        recommendation: "You are ready for real-world practice. Platform recommendations unlocked."
      };
    } else if (currentScore >= 60 && userProgress.decisionCheckPassed) {
      return {
        message: "Readiness improving. You have passed critical evaluations. Continue building discipline habits.",
        status: "progress",
        icon: TrendingUp,
        recommendation: "System recommends completing weekly discipline goals to strengthen readiness."
      };
    } else if (userProgress.simulationCompleted && userProgress.completedCapsules.length >= 3) {
      return {
        message: "Foundation established. You are building necessary knowledge and behavioral awareness.",
        status: "progress",
        icon: Brain,
        recommendation: "System recommends completing the decision readiness check to unlock Discipline Stage."
      };
    } else if (userProgress.completedCapsules.length >= 3) {
      return {
        message: "Learning in progress. You are acquiring foundational knowledge.",
        status: "building",
        icon: Brain,
        recommendation: "System recommends running the behavioral simulation to unlock Stage 3."
      };
    } else {
      return {
        message: "You are building foundational understanding. The system is monitoring your progress.",
        status: "building",
        icon: Shield,
        recommendation: "System recommends remaining in Foundation Mode. Complete 3 learning capsules to unlock Stage 2."
      };
    }
  };

  const systemAssessment = getSystemAssessment();

  const handleSimulation = (choice: 'consistent' | 'inconsistent') => {
    setSimulationResult(choice);
    onSimulationComplete();
  };

  const handleChecklistSubmit = () => {
    const allChecked = checklistAnswers.every(answer => answer === true);
    setAttemptedReadinessCheck(true);
    onDecisionCheckPass(allChecked);
  };

  const handleWeeklyGoalToggle = (index: number) => {
    const newGoals = [...weeklyGoals];
    newGoals[index] = !newGoals[index];
    setWeeklyGoals(newGoals);
    if (newGoals[index]) {
      onWeeklyGoalComplete();
    }
  };

  // Generate content based on profile
  const getRoadmapContent = () => {
    const { capital, risk, mode } = userProfile;

    let foundationFocus = '';
    if (capital <= 1000 && risk === 'low') {
      foundationFocus = 'Focus on understanding how small amounts can grow with consistency, not quick gains.';
    } else if (capital <= 1000 && risk === 'high') {
      foundationFocus = 'Learn why high risk with small capital requires extra caution and preparation.';
    } else {
      foundationFocus = 'Learn balanced approaches that match your capital level and risk tolerance.';
    }

    const decisionCriteria = risk === 'high'
      ? [
          'I understand that high risk means potential for significant loss',
          'I have an emergency fund separate from investment capital',
          'I will not chase quick returns or hot tips',
          'I can handle volatility without panic selling',
        ]
      : [
          'I understand that even \"safe\" options require research',
          'I know my financial capacity and limits',
          'I will research before making decisions',
          'I understand that returns are never guaranteed',
        ];

    const disciplineGoals = mode === 'builder'
      ? [
          'Complete one learning capsule this week',
          'Review your financial capacity without investing',
          'Practice saying \"no\" to unsolicited investment tips',
          'Write down your investment goals and limits',
        ]
      : [
          'Explore two learning capsules at your pace',
          'Reflect on your relationship with money',
          'Identify one common investing mistake to avoid',
          'Learn about one basic investment principle',
        ];

    return { foundationFocus, decisionCriteria, disciplineGoals };
  };

  const roadmapContent = getRoadmapContent();

  return (
    <div className="max-w-4xl mx-auto">
      {/* User Profile Summary */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">Capital</div>
            <div className="font-semibold text-gray-900">₹{userProfile.capital}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Risk Level</div>
            <div className="font-semibold text-gray-900 capitalize">{userProfile.risk}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Time Horizon</div>
            <div className="font-semibold text-gray-900 capitalize">{userProfile.horizon}-term</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Mode</div>
            <div className="font-semibold text-gray-900 capitalize">{userProfile.mode}</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Sample demonstration</strong> — Roadmap generated using rule-based logic. The system evaluates your progress and controls unlocking.
          </p>
        </div>
      </div>

      {/* Readiness Score Card */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-300 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Investor Readiness Score</h3>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-bold text-gray-900">{currentScore}</div>
              <div className="text-2xl text-gray-500 mb-1">/100</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <strong>60 points required</strong> to unlock Discipline Stage
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <Award className="w-10 h-10 text-teal-600" />
          </div>
        </div>
        
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
            style={{ width: `${currentScore}%` }}
          />
          {/* Threshold marker at 60 */}
          <div className="absolute top-0 left-[60%] h-full w-0.5 bg-red-500" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span className="text-red-600 font-semibold">60 (required)</span>
          <span>100</span>
        </div>
      </div>

      {/* System Assessment Panel */}
      <div className={`border-2 rounded-xl p-6 mb-8 ${
        systemAssessment.status === 'success' ? 'bg-green-50 border-green-300' :
        systemAssessment.status === 'progress' ? 'bg-blue-50 border-blue-300' :
        'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${
            systemAssessment.status === 'success' ? 'bg-green-100' :
            systemAssessment.status === 'progress' ? 'bg-blue-100' :
            'bg-gray-100'
          }`}>
            <systemAssessment.icon className={`w-6 h-6 ${
              systemAssessment.status === 'success' ? 'text-green-600' :
              systemAssessment.status === 'progress' ? 'text-blue-600' :
              'text-gray-600'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">System Assessment</h3>
            <p className="text-sm text-gray-700 mb-3">{systemAssessment.message}</p>
            <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-800">
                <strong>Recommendation:</strong> {systemAssessment.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 1: FOUNDATION (Always Unlocked) */}
      <StageCard
        stageNumber={1}
        title="Foundation Learning"
        isLocked={false}
        isCompleted={userProgress.completedCapsules.length >= 3}
        lockReason=""
      >
        <p className="text-gray-600 mb-4">{roadmapContent.foundationFocus}</p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Complete 3-Minute Learning Capsules</h4>
          <div className="space-y-3">
            {['How money grows at small scale', 'What risk really means', 'Why discipline beats shortcuts'].map((capsule, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {userProgress.completedCapsules.includes(`capsule-${idx + 1}`) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700">{capsule}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Visit the "Learning" tab to complete these capsules. <strong>+10 points</strong> per capsule.
          </p>
        </div>
      </StageCard>

      {/* STAGE 2: SIMULATION (Locked until 3 capsules) */}
      <StageCard
        stageNumber={2}
        title="Behavioral Simulation"
        isLocked={!stage2Unlocked}
        isCompleted={userProgress.simulationCompleted}
        lockReason="Complete 3 learning capsules in Stage 1 to unlock"
      >
        <p className="text-gray-600 mb-4">
          Run simulation to see the impact of consistent vs inconsistent behavior patterns.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Choose Your Behavior Pattern</h4>
          <p className="text-sm text-gray-600 mb-4">
            This simulation demonstrates discipline vs inconsistency — no returns or market data involved.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleSimulation('consistent')}
              disabled={userProgress.simulationCompleted}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                simulationResult === 'consistent'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="font-semibold text-gray-900 mb-1">Stay Consistent</div>
              <div className="text-sm text-gray-600">Regular monthly behavior</div>
            </button>
            
            <button
              onClick={() => handleSimulation('inconsistent')}
              disabled={userProgress.simulationCompleted}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                simulationResult === 'inconsistent'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="font-semibold text-gray-900 mb-1">Skip Months</div>
              <div className="text-sm text-gray-600">Irregular behavior</div>
            </button>
          </div>

          {simulationResult && (
            <div className={`p-4 rounded-lg ${
              simulationResult === 'consistent' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h5 className="font-semibold text-gray-900 mb-2">Outcome: {simulationResult === 'consistent' ? 'Strong Discipline' : 'Consistency Gap'}</h5>
              {simulationResult === 'consistent' ? (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>✓ Builds strong investment discipline</p>
                  <p>✓ Reduces emotional decision-making</p>
                  <p>✓ Prepares you for real investing</p>
                  <p className="font-semibold text-green-700 mt-3">
                    <strong>Readiness increased:</strong> +15 points added to your score
                  </p>
                </div>
              ) : (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>✗ Weakens discipline formation</p>
                  <p>✗ Increases emotional decision risk</p>
                  <p>✗ Indicates readiness gaps</p>
                  <p className="font-semibold text-red-700 mt-3">
                    System recommends building consistency before advancing
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </StageCard>

      {/* STAGE 3: READINESS CHECK (Locked until simulation complete) */}
      <StageCard
        stageNumber={3}
        title="Decision Readiness Check"
        isLocked={!stage3Unlocked}
        isCompleted={userProgress.decisionCheckPassed}
        lockReason="Complete Stage 2 (Simulation) to unlock"
      >
        <p className="text-gray-600 mb-4">
          Pass this assessment to prove you understand key concepts. All items must be checked.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Readiness Checklist</h4>
          <div className="space-y-3 mb-4">
            {roadmapContent.decisionCriteria.map((criterion, index) => (
              <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={checklistAnswers[index]}
                  onChange={(e) => {
                    const newAnswers = [...checklistAnswers];
                    newAnswers[index] = e.target.checked;
                    setChecklistAnswers(newAnswers);
                  }}
                  className="mt-1 w-4 h-4 text-teal-600 rounded"
                />
                <span className="text-sm text-gray-700">{criterion}</span>
              </label>
            ))}
          </div>

          {!userProgress.decisionCheckPassed && (
            <button
              onClick={handleChecklistSubmit}
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              Submit Readiness Check
            </button>
          )}

          {userProgress.decisionCheckPassed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-semibold">
                ✓ Check passed! <strong>+20 points</strong> added. Stage 4 unlocking conditions being evaluated...
              </p>
            </div>
          )}

          {attemptedReadinessCheck && !userProgress.decisionCheckPassed && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Check incomplete.</strong> All items must be checked to pass. If you're not ready, continue learning first.
                  This is a protection mechanism, not a failure.
                </div>
              </div>
            </div>
          )}
        </div>
      </StageCard>

      {/* STAGE 4: DISCIPLINE (Locked until score >= 60) */}
      <StageCard
        stageNumber={4}
        title="Discipline Habit System"
        isLocked={!stage4Unlocked}
        isCompleted={weeklyGoals.filter(g => g).length >= 2}
        lockReason={`Score of 60 required to unlock (current: ${currentScore})`}
      >
        <p className="text-gray-600 mb-4">
          Build sustainable investor habits through weekly micro-goals. Focus on consistency.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Weekly Discipline Goals</h4>
          <div className="space-y-3">
            {roadmapContent.disciplineGoals.map((goal, index) => (
              <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={weeklyGoals[index]}
                  onChange={() => handleWeeklyGoalToggle(index)}
                  className="mt-1 w-4 h-4 text-teal-600 rounded"
                />
                <span className="text-sm text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-800">
              <strong>Progress:</strong> {weeklyGoals.filter(g => g).length} / {weeklyGoals.length} goals completed. 
              <strong> +5 points</strong> per goal.
            </p>
          </div>
        </div>
      </StageCard>
    </div>
  );
}

// Reusable Stage Card Component with Visual Locking
function StageCard({
  stageNumber,
  title,
  isLocked,
  isCompleted,
  lockReason,
  children,
}: {
  stageNumber: number;
  title: string;
  isLocked: boolean;
  isCompleted: boolean;
  lockReason: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mb-8 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex items-start gap-4">
        {/* Stage Icon */}
        <div className={`p-3 rounded-lg flex-shrink-0 ${
          isLocked ? 'bg-gray-200' : isCompleted ? 'bg-green-100' : 'bg-teal-100'
        }`}>
          {isLocked ? (
            <Lock className="w-6 h-6 text-gray-500" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Play className="w-6 h-6 text-teal-600" />
          )}
        </div>

        {/* Stage Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Stage {stageNumber}: {title}
            </h3>
            {isLocked && (
              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                LOCKED
              </span>
            )}
            {isCompleted && !isLocked && (
              <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">
                COMPLETED
              </span>
            )}
          </div>

          {/* Lock Explanation */}
          {isLocked && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">This stage is locked</p>
                  <p className="text-sm text-amber-800">{lockReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stage Content (greyed out if locked) */}
          <div className={isLocked ? 'pointer-events-none' : ''}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
