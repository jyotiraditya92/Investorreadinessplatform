import React, { useState } from 'react';
import { UserProfile, UserProgress, calculateReadinessScore, RISK_FRAMEWORK } from '../App';
import { CheckCircle2, Circle, Lock, AlertCircle, TrendingUp, Rocket, Award, Brain, Shield, Play, X, AlertTriangle, Target } from 'lucide-react';
import { toast } from 'sonner';

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
  const [showLockModal, setShowLockModal] = useState<{ stage: number; reason: string; nextSteps: string[] } | null>(null);
  const [showScoreChange, setShowScoreChange] = useState<{ points: number; reason: string } | null>(null);
  const [showFeedback, setShowFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Auto-hide feedback after 5 seconds
  React.useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

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

  // Define stage unlock conditions (HARD GATING)
  const stage1Unlocked = true; // Always unlocked
  const stage2Unlocked = userProgress.completedCapsules.length >= 3;
  const stage3Unlocked = stage2Unlocked && userProgress.simulationCompleted;
  const stage4Unlocked = stage3Unlocked && currentScore >= 60;

  // Generate dynamic system assessment WITH RISK GUIDANCE
  const getSystemAssessment = () => {
    // Get capital-aware messaging
    const getCapitalAwareGuidance = () => {
      if (userProfile.capital <= 1000) {
        return "With small capital (≤₹1000), discipline and consistency matter more than returns. Focus on building habits.";
      } else if (userProfile.capital <= 2000) {
        return "With moderate capital (₹1000-₹2000), you can learn systematically. Take time to build understanding.";
      } else {
        return "Higher capital (≥₹2000) allows smoother learning with less pressure. Use this advantage to build strong foundations.";
      }
    };

    // Get risk category guidance
    const getRiskGuidance = () => {
      if (currentScore < 40) {
        return "Your current readiness supports Very Low Risk (0-5%) and Low Risk (5-10%) options only.";
      } else if (currentScore < 60) {
        return "Moderate Risk (10-20%) education unlocked. High risk options remain restricted.";
      } else {
        return "High Risk (20-40%) education unlocked. Continue building discipline before considering direct equity.";
      }
    };

    const capitalGuidance = getCapitalAwareGuidance();
    const riskGuidance = getRiskGuidance();

    if (currentScore >= 80) {
      return {
        message: `You demonstrate strong investor readiness. The system has evaluated your consistency and decision quality as high. ${capitalGuidance}`,
        status: "success",
        icon: Award,
        recommendation: `You are ready for real-world practice. Platform recommendations unlocked. ${riskGuidance}`
      };
    } else if (currentScore >= 60 && userProgress.decisionCheckPassed) {
      return {
        message: `Readiness improving. You have passed critical evaluations. Continue building discipline habits. ${capitalGuidance}`,
        status: "progress",
        icon: TrendingUp,
        recommendation: `System recommends completing weekly discipline goals to strengthen readiness. ${riskGuidance}`
      };
    } else if (userProgress.simulationCompleted && userProgress.completedCapsules.length >= 3) {
      return {
        message: `Foundation established. You are building necessary knowledge and behavioral awareness. ${capitalGuidance}`,
        status: "progress",
        icon: Brain,
        recommendation: `System recommends completing the decision readiness check to unlock Discipline Stage. ${riskGuidance}`
      };
    } else if (userProgress.completedCapsules.length >= 3) {
      return {
        message: `Learning in progress. You are acquiring foundational knowledge. ${capitalGuidance}`,
        status: "building",
        icon: Brain,
        recommendation: `System recommends running the behavioral simulation to unlock Stage 3. ${riskGuidance}`
      };
    } else {
      return {
        message: `You are building foundational understanding. The system is monitoring your progress. ${capitalGuidance}`,
        status: "building",
        icon: Shield,
        recommendation: `System recommends remaining in Foundation Mode. Complete 3 learning capsules to unlock Stage 2. ${riskGuidance}`
      };
    }
  };

  const systemAssessment = getSystemAssessment();

  const handleSimulation = (choice: 'consistent' | 'inconsistent') => {
    setSimulationResult(choice);
    onSimulationComplete();
    
    // Show toast feedback
    if (choice === 'consistent') {
      toast.success('Behavior assessed: +15 readiness points | Stage 3 unlocked', {
        description: 'Strong discipline pattern recognized by the system'
      });
    } else {
      toast.info('Simulation complete | Behavior pattern recorded', {
        description: 'System recommends building consistency before advancing'
      });
    }
  };

  const handleChecklistSubmit = () => {
    const allChecked = checklistAnswers.every(answer => answer === true);
    setAttemptedReadinessCheck(true);
    onDecisionCheckPass(allChecked);
    
    // Show toast feedback
    if (allChecked) {
      toast.success('Readiness Check Passed: +20 points', {
        description: 'Stage 4 eligibility increased'
      });
    } else {
      toast.error('Action restricted to protect beginners', {
        description: 'All criteria must be acknowledged to pass'
      });
    }
  };

  const handleWeeklyGoalToggle = (index: number) => {
    const newGoals = [...weeklyGoals];
    newGoals[index] = !newGoals[index];
    setWeeklyGoals(newGoals);
    if (newGoals[index]) {
      onWeeklyGoalComplete();
      toast.success('Discipline Goal Complete: +5 points', {
        description: 'Habit consistency improving'
      });
    }
  };

  // Generate content based on profile WITH RISK FRAMEWORK
  const getRoadmapContent = () => {
    const { capital, riskCategoryId, mode } = userProfile;
    const selectedRisk = RISK_FRAMEWORK.find(r => r.id === riskCategoryId) || RISK_FRAMEWORK[1];

    let foundationFocus = '';
    if (capital <= 1000 && (riskCategoryId === 'very-low' || riskCategoryId === 'low')) {
      foundationFocus = `Focus on understanding how small amounts can grow with consistency, not quick gains. Your selected risk level (${selectedRisk.downsideRange} downside) emphasizes stability.`;
    } else if (capital <= 1000 && (riskCategoryId === 'high' || riskCategoryId === 'moderate')) {
      foundationFocus = `Learn why higher risk (${selectedRisk.downsideRange} downside) with small capital requires extra caution and preparation. Volatility can impact smaller portfolios significantly.`;
    } else {
      foundationFocus = `Learn balanced approaches that match your capital level and risk tolerance (${selectedRisk.downsideRange} downside). Understanding risk is crucial before deployment.`;
    }

    const decisionCriteria = (riskCategoryId === 'high' || riskCategoryId === 'moderate')
      ? [
          `I understand that ${selectedRisk.label} means potential for significant short-term losses`,
          'I have an emergency fund separate from investment capital',
          'I will not chase quick returns or hot tips',
          'I can handle volatility without panic selling',
        ]
      : [
          'I understand that even lower-risk options require research',
          'I know my financial capacity and limits',
          'I will research before making decisions',
          'I understand that returns are never guaranteed',
        ];

    const disciplineGoals = mode === 'builder'
      ? [
          'Complete one learning capsule this week',
          'Review your financial capacity without investing',
          'Practice saying "no" to unsolicited investment tips',
          'Write down your investment goals and limits',
        ]
      : [
          'Explore two learning capsules at your pace',
          'Reflect on your relationship with money',
          'Identify one common investing mistake to avoid',
          'Learn about one basic investment principle',
        ];

    return { foundationFocus, decisionCriteria, disciplineGoals, selectedRisk };
  };

  const roadmapContent = getRoadmapContent();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lock Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Stage {showLockModal.stage} Locked</h3>
                  <p className="text-sm text-gray-600 mt-1">🛡️ This is a protection mechanism</p>
                </div>
              </div>
              <button
                onClick={() => setShowLockModal(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">{showLockModal.reason}</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Why this matters:</strong> The system is protecting you from advancing before you're ready. 
                Rushing through stages increases the risk of making costly mistakes with real money later.
              </p>
            </div>
            <div className="space-y-2">
              {showLockModal.nextSteps.map((step, index) => (
                <p key={index} className="text-sm text-gray-700">
                  <strong>Next Step {index + 1}:</strong> {step}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowLockModal(null)}
              className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* User Profile Summary */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">Capital</div>
            <div className="font-semibold text-gray-900">₹{userProfile.capital}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Risk Level</div>
            <div className="font-semibold text-gray-900">{roadmapContent.selectedRisk.label}</div>
            <div className="text-xs text-teal-600 mt-0.5">{roadmapContent.selectedRisk.description}</div>
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

      {/* "Why You're Here" Dynamic Assessment Panel */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Brain className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why You're Here: System Analysis</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Profile Analysis:</strong> You selected ₹{userProfile.capital} capital with {roadmapContent.selectedRisk.label} \n                and {userProfile.horizon}-term horizon in {userProfile.mode} mode.
              </p>
              <p>
                <strong>System Decision:</strong> {roadmapContent.foundationFocus}
              </p>
              <p>
                <strong>Protection Level:</strong> Based on your profile, the system has calibrated stage requirements \n                to ensure you build sufficient knowledge before advancing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Sample demonstration</strong> — Roadmap generated using visible rule-based logic. The system evaluates your progress and controls stage unlocking based on predefined thresholds.
          </p>
        </div>
      </div>

      {/* Journey Progress Timeline */}
      <div className="bg-white border-2 border-gray-300 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Your Journey Progress</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" />
          <div 
            className="absolute top-5 left-0 h-1 bg-teal-500 transition-all duration-500"
            style={{ 
              width: `${
                stage4Unlocked ? '100%' :
                stage3Unlocked ? '66%' :
                stage2Unlocked ? '33%' :
                '0%'
              }%`
            }}
          />
          
          {/* Timeline nodes */}
          <div className="relative flex justify-between">
            {[
              { num: 1, title: 'Foundation', unlocked: stage1Unlocked, completed: userProgress.completedCapsules.length >= 3 },
              { num: 2, title: 'Simulation', unlocked: stage2Unlocked, completed: userProgress.simulationCompleted },
              { num: 3, title: 'Assessment', unlocked: stage3Unlocked, completed: userProgress.decisionCheckPassed },
              { num: 4, title: 'Discipline', unlocked: stage4Unlocked, completed: weeklyGoals.filter(g => g).length >= 2 },
            ].map((stage, index) => (
              <div key={stage.num} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2 border-2 transition-all ${
                    stage.completed ? 'bg-green-500 border-green-600 text-white' :
                    stage.unlocked ? 'bg-teal-500 border-teal-600 text-white' :
                    'bg-gray-200 border-gray-300 text-gray-500'
                  }`}
                >
                  {stage.completed ? '✓' : stage.num}
                </div>
                <div className="text-xs text-center">
                  <div className={`font-semibold ${stage.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {stage.title}
                  </div>
                  <div className={`text-xs ${
                    stage.completed ? 'text-green-600' :
                    stage.unlocked ? 'text-teal-600' :
                    'text-gray-400'
                  }`}>
                    {stage.completed ? 'Done' : stage.unlocked ? 'Active' : 'Locked'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Readiness Score Card */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-400 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Investor Readiness Score</h3>
          <div className="text-3xl font-bold text-teal-600">{currentScore}/100</div>
        </div>
        
        {/* Readiness Explanation */}
        <div className="mb-4 p-3 bg-white rounded-lg border border-teal-200">
          <p className="text-sm text-gray-700">
            <strong className="text-teal-700">What is Readiness?</strong> Readiness represents your knowledge, discipline, and emotional preparedness for investing. Higher readiness unlocks higher-risk education content. The system gates access based on your score to protect beginners.
          </p>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${currentScore}%` }}
            >
              {currentScore > 10 && (
                <span className="text-white font-semibold text-sm">{currentScore}%</span>
              )}
            </div>
          </div>
          {/* Score Milestones */}
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>0</span>
            <span className={currentScore >= 40 ? 'text-teal-600 font-semibold' : ''}>40 - Moderate Risk</span>
            <span className={currentScore >= 60 ? 'text-teal-600 font-semibold' : ''}>60 - Stage 4</span>
            <span className={currentScore >= 80 ? 'text-teal-600 font-semibold' : ''}>80 - High Risk</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <systemAssessment.icon className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Status:</strong> {systemAssessment.message}
            </p>
            <p className="text-sm text-gray-700">
              <strong>System Recommendation:</strong> {systemAssessment.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic "What's Next" Panel */}
      <div className="bg-white border-2 border-blue-400 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 What's Next For You</h3>
            <div className="space-y-2">
              {!stage2Unlocked && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Complete 3 learning capsules in Stage 1 to unlock behavioral simulation</span>
                </div>
              )}
              {stage2Unlocked && !userProgress.simulationCompleted && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Run the behavioral simulation in Stage 2 to test consistency patterns</span>
                </div>
              )}
              {userProgress.simulationCompleted && !stage3Unlocked && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Stage 3 is now unlocked - Complete the decision readiness assessment</span>
                </div>
              )}
              {stage3Unlocked && !userProgress.decisionCheckPassed && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Pass the readiness check in Stage 3 to increase your score significantly</span>
                </div>
              )}
              {userProgress.decisionCheckPassed && !stage4Unlocked && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>Your readiness score is {currentScore}/100. You need 60 points to unlock Stage 4. Complete more learning or discipline activities.</span>
                </div>
              )}
              {stage4Unlocked && weeklyGoals.filter(g => g).length < 2 && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Stage 4 unlocked! Build discipline through weekly habit goals to prepare for real investing</span>
                </div>
              )}
              {currentScore >= 80 && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>High readiness achieved! Review platform recommendations below based on your risk profile</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 1: FOUNDATION (Always Unlocked) */}
      <StageCard
        stageNumber={1}
        title="Foundation Learning"
        suggestedDuration="1-2 days"
        isLocked={false}
        isCompleted={userProgress.completedCapsules.length >= 3}
        lockReason=""
        onLockedClick={() => {}}
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
        suggestedDuration="3-5 days"
        isLocked={!stage2Unlocked}
        isCompleted={userProgress.simulationCompleted}
        lockReason={`Complete 3 learning capsules in Stage 1 to unlock. Current progress: ${userProgress.completedCapsules.length}/3 capsules completed.`}
        onLockedClick={(reason) => setShowLockModal({ stage: 2, reason, nextSteps: ['Complete 3 learning capsules in Stage 1'] })}
      >
        <p className="text-gray-600 mb-4">
          Run simulation to see the impact of consistent vs inconsistent behavior patterns.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Run Behavioral Simulation</h4>
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
        suggestedDuration="After simulation"
        isLocked={!stage3Unlocked}
        isCompleted={userProgress.decisionCheckPassed}
        lockReason="Complete Stage 2 (Behavioral Simulation) to unlock this assessment. The system requires simulation completion to test your understanding."
        onLockedClick={(reason) => setShowLockModal({ stage: 3, reason, nextSteps: ['Complete Stage 2 (Behavioral Simulation)'] })}
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900">
            <strong>⚠️ Assessment Mode:</strong> This is a decision readiness evaluation. All criteria must be acknowledged \n            to pass. The system will evaluate your responses to determine if you're ready to progress.
          </p>
        </div>
        
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 text-lg">Pass Readiness Assessment</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Progress:</span>
              <span className="font-semibold text-teal-600">
                {checklistAnswers.filter(a => a).length} / {checklistAnswers.length}
              </span>
            </div>
          </div>
          
          <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${(checklistAnswers.filter(a => a).length / checklistAnswers.length) * 100}%` }}
            />
          </div>

          <div className="space-y-3 mb-6">
            {roadmapContent.decisionCriteria.map((criterion, index) => (
              <label 
                key={index} 
                className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all border-2 ${
                  checklistAnswers[index] 
                    ? 'bg-teal-50 border-teal-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklistAnswers[index]}
                  onChange={(e) => {
                    const newAnswers = [...checklistAnswers];
                    newAnswers[index] = e.target.checked;
                    setChecklistAnswers(newAnswers);
                  }}
                  className="mt-1 w-5 h-5 text-teal-600 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-700 font-medium">{criterion}</span>
                    {checklistAnswers[index] && (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {!userProgress.decisionCheckPassed && !attemptedReadinessCheck && (
            <button
              onClick={handleChecklistSubmit}
              disabled={checklistAnswers.filter(a => a).length !== checklistAnswers.length}
              className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
            >
              {checklistAnswers.filter(a => a).length === checklistAnswers.length 
                ? '✓ Submit Assessment' 
                : `Complete All Items to Submit (${checklistAnswers.filter(a => a).length}/${checklistAnswers.length})`}
            </button>
          )}

          {userProgress.decisionCheckPassed && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-green-900 text-lg mb-2">✓ Assessment Passed!</h5>
                  <p className="text-sm text-green-800 mb-2">
                    You have successfully demonstrated decision readiness. The system has evaluated your acknowledgment \n                    of key investment principles.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>Score Impact:</strong> <span className="text-green-600 font-semibold">+20 points</span> added to your readiness score. \n                      Stage 4 unlock conditions are now being evaluated based on your total score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {attemptedReadinessCheck && !userProgress.decisionCheckPassed && (
            <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-300 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-red-900 text-lg mb-2">Assessment Incomplete</h5>
                  <p className="text-sm text-red-800 mb-3">
                    All assessment items must be acknowledged to pass. The system requires complete understanding \n                    before allowing progression to Stage 4.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="text-sm text-gray-700">
                      <strong>Why this matters:</strong> This is a protection mechanism. If you're not ready to acknowledge \n                      these principles, it indicates you need more preparation time. Consider reviewing learning capsules \n                      or reflecting on your investment readiness.
                    </p>
                  </div>
                  <button
                    onClick={() => setAttemptedReadinessCheck(false)}
                    className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Review & Try Again
                  </button>
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
        suggestedDuration="Ongoing weekly habit"
        isLocked={!stage4Unlocked}
        isCompleted={weeklyGoals.filter(g => g).length >= 2}
        lockReason={`Readiness score of 60 required to unlock (Current score: ${currentScore}/100). You need ${Math.max(0, 60 - currentScore)} more points. Complete more learning capsules, pass the readiness check, or improve simulation performance.`}
        onLockedClick={(reason) => setShowLockModal({ stage: 4, reason, nextSteps: ['Complete more learning capsules', 'Pass the readiness check', 'Improve simulation performance'] })}
      >
        <p className="text-gray-600 mb-4">
          Build sustainable investor habits through weekly micro-goals. Focus on consistency.
        </p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Track Weekly Discipline Goals</h4>
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
              <strong>Progress:</strong> {weeklyGoals.filter(g => g).length} / {weeklyGoals.length} goals completed. \n              <strong> +5 points</strong> per goal.
            </p>
          </div>
        </div>
      </StageCard>

      {/* Time-based Progression Notice */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-sm text-gray-700 text-center">
          <strong>⏱️ Time-based progression:</strong> Progress is habit-based, not instant. Each stage builds upon the previous one to ensure sustainable readiness development.
        </p>
      </div>

      {/* PLATFORM RECOMMENDATIONS - Unlocks at high readiness */}
      {currentScore >= 60 && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-400 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Rocket className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🎯 Platform Recommendations Unlocked</h3>
              <p className="text-sm text-gray-700 mb-4">
                Based on your readiness score of <strong>{currentScore}/100</strong> and selected risk profile \n                (<strong>{roadmapContent.selectedRisk.label}</strong>), here are suitable platforms categorized by risk level.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Educational information only.</strong> This is not financial advice. All platforms listed are examples. \n                  Research thoroughly and verify regulatory compliance before using any platform.
                </p>
              </div>
            </div>
          </div>

          {/* Risk Category Recommendations */}
          <div className="space-y-4">
            {/* VERY LOW RISK */}
            <div className="bg-white rounded-xl p-5 border-2 border-gray-300">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${currentScore >= 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <h4 className="font-semibold text-gray-900">Very Low Risk (0-5% downside)</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  ALWAYS ACCESSIBLE
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Typical Return Range:</strong> 4-7% annually | <strong>Ideal For:</strong> Emergency funds, short-term goals
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Platforms:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {['Bank Recurring Deposits', 'Liquid Funds via Groww', 'Zerodha Coin', 'Paytm Money'].map((platform) => (
                    <span key={platform} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* LOW RISK */}
            <div className="bg-white rounded-xl p-5 border-2 border-gray-300">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${currentScore >= 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <h4 className="font-semibold text-gray-900">Low Risk (5-10% downside)</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  ACCESSIBLE
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Typical Return Range:</strong> 6-9% annually | <strong>Ideal For:</strong> Medium-term goals (2-5 years)
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Platforms:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {['Short-term Debt Funds', 'Digital Gold via Google Pay', 'Groww', 'ET Money'].map((platform) => (
                    <span key={platform} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MODERATE RISK */}
            <div className={`bg-white rounded-xl p-5 border-2 ${currentScore >= 40 ? 'border-teal-300' : 'border-gray-200 opacity-60'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${currentScore >= 40 ? 'bg-teal-500' : 'bg-gray-300'}`} />
                <h4 className="font-semibold text-gray-900">Moderate Risk (10-20% downside)</h4>
                {currentScore >= 40 ? (
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded">
                    LOCKED - Need 40+ score
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Typical Return Range:</strong> 10-14% annually | <strong>Ideal For:</strong> Long-term wealth building (5+ years)
              </p>
              {currentScore >= 40 ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Example Platforms:</strong></p>
                  <div className="flex flex-wrap gap-2">
                    {['Index Funds (NIFTY 50) via Zerodha', 'Groww', 'Kuvera', 'Paytm Money'].map((platform) => (
                      <span key={platform} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    🔒 Complete more learning and pass assessments to unlock moderate risk education. Current score: {currentScore}/40
                  </p>
                </div>
              )}
            </div>

            {/* HIGH RISK */}
            <div className={`bg-white rounded-xl p-5 border-2 ${currentScore >= 80 ? 'border-orange-300' : 'border-gray-200 opacity-60'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${currentScore >= 80 ? 'bg-orange-500' : 'bg-gray-300'}`} />
                <h4 className="font-semibold text-gray-900">High Risk (20-40% downside)</h4>
                {currentScore >= 80 ? (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded">
                    LOCKED - Need 80+ score
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Typical Return Range:</strong> Variable (15-25% long-term) | <strong>Ideal For:</strong> Experienced investors with high risk tolerance
              </p>
              {currentScore >= 80 ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Example Platforms:</strong></p>
                  <div className="flex flex-wrap gap-2">
                    {['Direct Stocks via Zerodha', 'Upstox', 'Groww', 'Angel One'].map((platform) => (
                      <span key={platform} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-red-800">
                      <strong>⚠️ Caution:</strong> Direct equity investing requires extensive research, emotional discipline, and long-term commitment. \n                      Only proceed if you understand fundamental and technical analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    🔒 Achieve 80+ readiness score to unlock high risk education. This requires completing all stages and building strong discipline habits.
                  </p>
                </div>
              )}
            </div>

            {/* VERY HIGH RISK - PERMANENTLY RESTRICTED */}
            <div className="bg-gray-100 rounded-xl p-5 border-2 border-red-300 opacity-70">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h4 className="font-semibold text-gray-900">Very High Risk (40-100% downside)</h4>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                  NOT RECOMMENDED FOR BEGINNERS
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Risk Profile:</strong> Extremely volatile, potential for total capital loss | <strong>Examples:</strong> Intraday trading, F&O, Crypto
              </p>
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <p className="text-sm text-red-900 font-semibold mb-2">
                  🚫 This system does not support very high risk activities for beginners
                </p>
                <p className="text-xs text-red-800">
                  These instruments require professional-level expertise, significant capital reserves, and tolerance for complete loss. \n                  Most beginners who attempt these lose substantial amounts. This platform prioritizes your long-term financial safety.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Sample demonstration</strong> — Platform recommendations are educational examples based on your risk profile and readiness score. \n              Always verify platform credentials, fees, and regulatory compliance independently before making any investment decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Stage Card Component with Visual Locking
function StageCard({
  stageNumber,
  title,
  suggestedDuration,
  isLocked,
  isCompleted,
  lockReason,
  onLockedClick,
  children,
}: {
  stageNumber: number;
  title: string;
  suggestedDuration: string;
  isLocked: boolean;
  isCompleted: boolean;
  lockReason: string;
  onLockedClick: (reason: string) => void;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    if (isLocked) {
      onLockedClick(lockReason);
    }
  };

  return (
    <div 
      className={`mb-8 ${isLocked ? 'opacity-60' : 'opacity-100'} ${isLocked ? 'cursor-pointer' : ''}`}
      onClick={isLocked ? handleClick : undefined}
    >
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
          
          {/* Suggested Duration */}
          <p className="text-xs text-gray-500 mb-3">
            <strong>⏱️ Suggested duration:</strong> {suggestedDuration}
          </p>

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