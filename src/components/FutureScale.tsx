import React from 'react';
import { UserProgress, calculateReadinessScore } from '../App';
import { TrendingUp, Lock, CheckCircle2, Sparkles, Users, Target, BarChart, Shield } from 'lucide-react';

interface FutureScaleProps {
  userProgress: UserProgress;
}

export function FutureScale({ userProgress }: FutureScaleProps) {
  const currentScore = calculateReadinessScore(userProgress);

  // Define readiness tiers and what they unlock
  const tiers = [
    {
      level: 'Foundation (0-40)',
      score: 0,
      unlocked: currentScore >= 0,
      color: 'gray',
      features: [
        'Basic learning capsules',
        'Behavioral simulations',
        'Foundation knowledge building',
      ],
      status: 'Current features available to all new users',
    },
    {
      level: 'Developing (40-60)',
      score: 40,
      unlocked: currentScore >= 40,
      color: 'blue',
      features: [
        'Advanced learning modules',
        'Decision readiness assessments',
        'Personalized risk profiling',
      ],
      status: currentScore >= 40 ? 'Unlocked' : 'Unlock by completing more learning capsules and simulations',
    },
    {
      level: 'Ready (60-80)',
      score: 60,
      unlocked: currentScore >= 60,
      color: 'teal',
      features: [
        'Platform recommendations',
        'Discipline tracking system',
        'Weekly goal setting',
      ],
      status: currentScore >= 60 ? 'Unlocked' : 'Unlock by passing readiness check and building discipline',
    },
    {
      level: 'Investor-Ready (80-100)',
      score: 80,
      unlocked: currentScore >= 80,
      color: 'green',
      features: [
        'Full platform access',
        'Priority support resources',
        'Graduation certificate',
      ],
      status: currentScore >= 80 ? 'Unlocked' : 'Unlock by demonstrating consistent behavior and high readiness',
    },
  ];

  // Future capabilities (conceptual vision)
  const futureCapabilities = [
    {
      title: 'Personalized Mentorship Matching',
      description: 'Connect with experienced investors based on your profile and progress',
      requiredScore: 70,
      icon: Users,
      timeline: 'Future Phase 1',
    },
    {
      title: 'Portfolio Review & Feedback',
      description: 'Get automated analysis of your investment decisions and behavioral patterns',
      requiredScore: 75,
      icon: BarChart,
      timeline: 'Future Phase 2',
    },
    {
      title: 'Advanced Simulation Lab',
      description: 'Test complex investment scenarios with realistic market conditions',
      requiredScore: 65,
      icon: Target,
      timeline: 'Future Phase 1',
    },
    {
      title: 'Community Learning Circles',
      description: 'Join groups of learners at similar readiness levels for peer learning',
      requiredScore: 50,
      icon: Sparkles,
      timeline: 'Future Phase 2',
    },
    {
      title: 'Fraud Protection Alerts',
      description: 'AI-powered warnings about high-risk or fraudulent investment schemes',
      requiredScore: 0,
      icon: Shield,
      timeline: 'Future Phase 3',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          How This Platform Grows With You
        </h1>
        <p className="text-gray-600">
          Your access and features expand as your investor readiness improves. The system adapts to your progress.
        </p>
      </div>

      {/* Conceptual Vision Label */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <p className="text-sm text-purple-900">
            <strong>Conceptual Vision:</strong> This page demonstrates how the platform could scale to protect and guide users at every stage of their investing journey.
          </p>
        </div>
      </div>

      {/* Current Score Display */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-300 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Your Current Readiness Score</h3>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-bold text-gray-900">{currentScore}</div>
              <div className="text-2xl text-gray-500 mb-1">/100</div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-10 h-10 text-teal-600" />
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
            style={{ width: `${currentScore}%` }}
          />
        </div>
      </div>

      {/* Readiness Tiers */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Progressive Feature Unlocking</h2>
        <div className="space-y-4">
          {tiers.map((tier, index) => {
            const isUnlocked = tier.unlocked;
            const isCurrent = index === 0 || (tier.unlocked && (index === tiers.length - 1 || !tiers[index + 1].unlocked));

            return (
              <div
                key={tier.level}
                className={`border-2 rounded-xl p-6 transition-all ${
                  isUnlocked
                    ? tier.color === 'gray'
                      ? 'border-gray-300 bg-gray-50'
                      : tier.color === 'blue'
                      ? 'border-blue-300 bg-blue-50'
                      : tier.color === 'teal'
                      ? 'border-teal-300 bg-teal-50'
                      : 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isUnlocked
                          ? tier.color === 'gray'
                            ? 'bg-gray-100'
                            : tier.color === 'blue'
                            ? 'bg-blue-100'
                            : tier.color === 'teal'
                            ? 'bg-teal-100'
                            : 'bg-green-100'
                          : 'bg-gray-200'
                      }`}
                    >
                      {isUnlocked ? (
                        <CheckCircle2
                          className={`w-6 h-6 ${
                            tier.color === 'gray'
                              ? 'text-gray-600'
                              : tier.color === 'blue'
                              ? 'text-blue-600'
                              : tier.color === 'teal'
                              ? 'text-teal-600'
                              : 'text-green-600'
                          }`}
                        />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tier.level}</h3>
                      <p className="text-sm text-gray-600">Score: {tier.score}+</p>
                    </div>
                  </div>
                  {isCurrent && isUnlocked && (
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200">
                      Your Level
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Features:</h4>
                  <ul className="space-y-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isUnlocked
                              ? tier.color === 'gray'
                                ? 'text-gray-600'
                                : tier.color === 'blue'
                                ? 'text-blue-600'
                                : tier.color === 'teal'
                                ? 'text-teal-600'
                                : 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`text-sm ${
                    isUnlocked
                      ? tier.color === 'gray'
                        ? 'text-gray-800'
                        : tier.color === 'blue'
                        ? 'text-blue-800'
                        : tier.color === 'teal'
                        ? 'text-teal-800'
                        : 'text-green-800'
                      : 'text-gray-600'
                  }`}
                >
                  {tier.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Capabilities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Capabilities (Vision)</h2>
        <p className="text-gray-600 mb-6">
          As the platform scales, these features will unlock based on your readiness score, providing tailored support at every stage.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {futureCapabilities.map((capability, index) => {
            const willUnlock = currentScore >= capability.requiredScore;
            const Icon = capability.icon;

            return (
              <div
                key={index}
                className={`border-2 rounded-xl p-5 ${
                  willUnlock ? 'border-teal-200 bg-teal-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${willUnlock ? 'bg-teal-100' : 'bg-gray-200'}`}>
                    <Icon className={`w-5 h-5 ${willUnlock ? 'text-teal-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{capability.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{capability.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{capability.timeline}</span>
                      <span
                        className={`text-xs font-semibold ${
                          willUnlock ? 'text-teal-700' : 'text-gray-500'
                        }`}
                      >
                        {willUnlock
                          ? 'Available at your level'
                          : `Unlocks at ${capability.requiredScore}+ score`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Why Progressive Access Matters</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Protection First:</strong> Beginners aren't overwhelmed with advanced features they're not ready for. The system guides them through proven learning stages.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Motivation Through Progress:</strong> Clear milestones and unlockable features motivate users to complete their learning journey.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Scalable Quality:</strong> As the platform grows, the readiness system ensures every user gets appropriate guidance regardless of scale.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}