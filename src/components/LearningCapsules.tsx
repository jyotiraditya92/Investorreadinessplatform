import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LearningCapsulesProps {
  completedCapsules: string[];
  onCapsuleComplete: (capsuleId: string) => void;
}

interface Capsule {
  id: string;
  title: string;
  duration: string;
  category: string;
  content: {
    misconception: string;
    reality: string;
    keyTakeaway: string;
    example: string;
  };
}

const capsules: Capsule[] = [
  {
    id: 'capsule-1',
    title: 'How Money Grows at Small Scale',
    duration: '2 min',
    category: 'Foundation',
    content: {
      misconception: '"₹500 is too small to make any difference in investing."',
      reality: 'Small amounts build the discipline and knowledge needed for larger investments. The behavior you develop matters more than the amount.',
      keyTakeaway: 'Starting small helps you learn without risking significant capital. It\'s about building investor readiness, not immediate wealth.',
      example: 'Someone who learns to invest ₹500 monthly with discipline is better prepared than someone who invests ₹10,000 once without understanding.',
    },
  },
  {
    id: 'capsule-2',
    title: 'What Risk Really Means',
    duration: '3 min',
    category: 'Foundation',
    content: {
      misconception: '"High risk always means high returns."',
      reality: 'Risk means uncertainty and potential loss, not guaranteed returns. Higher risk can lead to higher losses, not just gains.',
      keyTakeaway: 'Understanding your risk tolerance is about knowing how much loss you can handle emotionally and financially.',
      example: 'A "high return" investment that loses 30% in a month might cause you to panic-sell, losing money and confidence.',
    },
  },
  {
    id: 'capsule-3',
    title: 'Why Discipline Beats Shortcuts',
    duration: '2 min',
    category: 'Foundation',
    content: {
      misconception: '"I need to find the perfect stock or timing to succeed."',
      reality: 'Consistent, disciplined behavior over time matters more than trying to time the market or find "hot tips."',
      keyTakeaway: 'Good investor habits—research, patience, consistency—compound over time. Shortcuts often lead to costly mistakes.',
      example: 'Regular monthly investments over 2 years build better habits than chasing 5 different "guaranteed" tips that fail.',
    },
  },
  {
    id: 'capsule-4',
    title: 'The True Cost of Emotional Decisions',
    duration: '3 min',
    category: 'Behavioral',
    content: {
      misconception: '"I can stay rational when money is at stake."',
      reality: 'Fear and greed drive most beginner mistakes. Emotional decisions—panic selling or FOMO buying—destroy wealth.',
      keyTakeaway: 'Building decision-making discipline in simulations helps you manage emotions when real money is involved.',
      example: 'Selling during a market dip because of fear, then missing the recovery, is a classic emotional mistake.',
    },
  },
  {
    id: 'capsule-5',
    title: 'Understanding "Returns" vs "Guarantees"',
    duration: '2 min',
    category: 'Risk',
    content: {
      misconception: '"This investment promises 20% returns guaranteed."',
      reality: 'No legitimate investment guarantees returns. If it sounds too good to be true, it probably is.',
      keyTakeaway: 'Be skeptical of guaranteed return claims. All investments carry risk, and higher promised returns mean higher risk.',
      example: 'Many fraud schemes promise "guaranteed 30% returns" to attract beginners. Real investments disclose risks clearly.',
    },
  },
  {
    id: 'capsule-6',
    title: 'Time Horizon and Your Strategy',
    duration: '3 min',
    category: 'Planning',
    content: {
      misconception: '"My strategy should be the same whether I invest for 6 months or 6 years."',
      reality: 'Your time horizon fundamentally changes what risks you can take and what approaches make sense.',
      keyTakeaway: 'Short-term goals require safer, more liquid options. Long-term goals can handle more volatility.',
      example: 'Money needed in 6 months shouldn\'t be in volatile assets. Money for 10 years from now can weather short-term drops.',
    },
  },
  {
    id: 'capsule-7',
    title: 'Why Research Matters More Than Tips',
    duration: '2 min',
    category: 'Discipline',
    content: {
      misconception: '"My friend made money on this stock, so I should buy it too."',
      reality: 'Every investor\'s situation is different. What worked for someone else might not work for you.',
      keyTakeaway: 'Do your own research. Understand why you\'re investing in something, not just that someone else did.',
      example: 'A stock that was good for your friend\'s 5-year plan might be terrible for your 6-month timeline.',
    },
  },
  {
    id: 'capsule-8',
    title: 'Building Your Emergency Fund First',
    duration: '3 min',
    category: 'Planning',
    content: {
      misconception: '"I should invest all my savings to grow wealth."',
      reality: 'You need accessible cash for emergencies before investing. Investing money you might need soon creates risk.',
      keyTakeaway: 'Build 3-6 months of expenses in a safe, accessible place before investing for growth.',
      example: 'If you invest your emergency fund and need it during a market drop, you\'ll be forced to sell at a loss.',
    },
  },
];

export function LearningCapsules({ completedCapsules, onCapsuleComplete }: LearningCapsulesProps) {
  const [expandedCapsule, setExpandedCapsule] = useState<string | null>(null);

  const handleToggle = (capsuleId: string) => {
    if (expandedCapsule === capsuleId) {
      setExpandedCapsule(null);
    } else {
      setExpandedCapsule(capsuleId);
    }
  };

  const handleComplete = (capsuleId: string) => {
    if (!completedCapsules.includes(capsuleId)) {
      onCapsuleComplete(capsuleId);
      const newTotal = completedCapsules.length + 1;
      
      // Show toast feedback
      if (newTotal === 3) {
        toast.success('Foundation complete: +10 points | Stage 2 unlocked', {
          description: 'Behavioral simulation now available in Your Roadmap'
        });
      } else if (newTotal >= 5) {
        toast.success('Learning Progress: +10 points', {
          description: `${newTotal}/8 capsules completed | Readiness improving`
        });
      } else {
        toast.success('Capsule Completed: +10 points', {
          description: `${newTotal}/8 completed | Continue building knowledge`
        });
      }
    }
  };

  const categories = ['Foundation', 'Behavioral', 'Risk', 'Planning', 'Discipline'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Learning Capsules
        </h1>
        <p className="text-gray-600">
          Short, focused lessons that fix common misconceptions. Each takes 2-3 minutes.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <p className="text-sm text-gray-600">
              {completedCapsules.length} of {capsules.length} capsules completed
            </p>
          </div>
          <div className="text-3xl font-bold text-teal-600">
            {Math.round((completedCapsules.length / capsules.length) * 100)}%
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-500"
            style={{ width: `${(completedCapsules.length / capsules.length) * 100}%` }}
          />
        </div>
        
        {/* Score Impact Indicator */}
        <div className="mt-4 flex items-center gap-2 p-3 bg-white rounded-lg border border-teal-200">
          <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
          <div className="text-sm text-gray-700">
            <strong className="text-teal-700">Readiness Impact:</strong> Each capsule adds <strong className="text-teal-700">+10 points</strong> to your score. 
            You've earned <strong className="text-teal-700">{completedCapsules.length * 10} / 80 points</strong> from learning.
          </div>
        </div>
      </div>

      {/* Capsules by Category */}
      {categories.map(category => {
        const categoryCapsules = capsules.filter(c => c.category === category);
        if (categoryCapsules.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
            <div className="space-y-4">
              {categoryCapsules.map(capsule => {
                const isCompleted = completedCapsules.includes(capsule.id);
                const isExpanded = expandedCapsule === capsule.id;

                return (
                  <div
                    key={capsule.id}
                    className={`bg-white border-2 rounded-xl transition-all ${
                      isCompleted ? 'border-green-200' : 'border-gray-200'
                    }`}
                  >
                    {/* Capsule Header */}
                    <button
                      onClick={() => handleToggle(capsule.id)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${
                          isCompleted ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {capsule.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{capsule.duration}</span>
                            {isCompleted && (
                              <span className="text-green-600 font-semibold">✓ Completed</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Capsule Content */}
                    {isExpanded && (
                      <div className="px-5 pb-5">
                        <div className="pt-4 border-t border-gray-200 space-y-4">
                          {/* Misconception */}
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="font-semibold text-red-900 mb-2">
                              ❌ Common Misconception
                            </div>
                            <p className="text-sm text-red-800">{capsule.content.misconception}</p>
                          </div>

                          {/* Reality */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="font-semibold text-blue-900 mb-2">
                              💡 Reality
                            </div>
                            <p className="text-sm text-blue-800">{capsule.content.reality}</p>
                          </div>

                          {/* Key Takeaway */}
                          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                            <div className="font-semibold text-teal-900 mb-2">
                              🎯 Key Takeaway
                            </div>
                            <p className="text-sm text-teal-800">{capsule.content.keyTakeaway}</p>
                          </div>

                          {/* Example */}
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="font-semibold text-amber-900 mb-2">
                              📋 Example
                            </div>
                            <p className="text-sm text-amber-800">{capsule.content.example}</p>
                          </div>

                          {/* Complete Button */}
                          {!isCompleted && (
                            <button
                              onClick={() => handleComplete(capsule.id)}
                              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                            >
                              Mark as Complete
                            </button>
                          )}

                          {isCompleted && (
                            <div className="text-center py-2 text-sm text-green-600 font-semibold">
                              ✓ You've completed this capsule
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Why Learning Capsules?</h3>
        <p className="text-sm text-gray-700 mb-3">
          Each capsule is designed to fix a specific misconception that commonly causes beginner investors to make costly mistakes.
        </p>
        <p className="text-sm text-gray-700">
          Complete at least 3 capsules to unlock the Decision Readiness Check in your roadmap.
        </p>
      </div>
    </div>
  );
}