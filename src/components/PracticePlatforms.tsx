import React from 'react';
import { UserProfile, UserProgress } from '../App';
import { Rocket, Lock, AlertTriangle, TrendingUp, Shield, BookOpen, Target } from 'lucide-react';

interface PracticePlatformsProps {
  userProfile: UserProfile | null;
  userProgress: UserProgress;
}

interface Platform {
  name: string;
  type: string;
  minAmount: string;
  bestFor: string[];
  learningFocus: string;
  features: string[];
  riskLevel: 'low' | 'medium' | 'high';
  idealHorizon: ('short' | 'medium' | 'long')[];
}

const platforms: Platform[] = [
  {
    name: 'Zerodha Coin',
    type: 'Mutual Fund Platform',
    minAmount: '₹100',
    bestFor: ['Beginners with ₹500-₹2000', 'Low to medium risk tolerance', 'Long-term goals'],
    learningFocus: 'Understanding systematic investing and fund selection',
    features: [
      'Direct mutual funds (no commission)',
      'Start SIPs with small amounts',
      'Educational content included',
      'Easy to track and monitor',
    ],
    riskLevel: 'low',
    idealHorizon: ['medium', 'long'],
  },
  {
    name: 'Groww',
    type: 'Beginner-Friendly Investment App',
    minAmount: '₹100',
    bestFor: ['Complete beginners', 'All risk levels', 'Explorer mode learners'],
    learningFocus: 'Simplified interface for learning investment basics',
    features: [
      'User-friendly interface',
      'Mutual funds and stocks',
      'Educational resources',
      'Goal-based investing tools',
    ],
    riskLevel: 'low',
    idealHorizon: ['short', 'medium', 'long'],
  },
  {
    name: 'ET Money',
    type: 'Goal-Based Investment Platform',
    minAmount: '₹500',
    bestFor: ['Goal-oriented investors', 'Medium risk tolerance', 'Builder mode users'],
    learningFocus: 'Linking investments to specific financial goals',
    features: [
      'Goal-based planning',
      'Tax-saving funds',
      'Insurance integration',
      'Portfolio tracking',
    ],
    riskLevel: 'low',
    idealHorizon: ['medium', 'long'],
  },
  {
    name: 'Smallcase',
    type: 'Thematic Stock Portfolios',
    minAmount: '₹2000',
    bestFor: ['₹2000+ capital', 'Medium to high risk', 'Theme-based learners'],
    learningFocus: 'Understanding portfolio construction and diversification',
    features: [
      'Pre-built themed portfolios',
      'Learn sector-based investing',
      'Rebalancing guidance',
      'Transparent strategy',
    ],
    riskLevel: 'medium',
    idealHorizon: ['medium', 'long'],
  },
  {
    name: 'Paytm Money',
    type: 'Multi-Asset Platform',
    minAmount: '₹100',
    bestFor: ['Digital-first users', 'All capital levels', 'Medium-term goals'],
    learningFocus: 'Exploring multiple asset classes in one place',
    features: [
      'Stocks, mutual funds, gold',
      'NPS and tax-saving options',
      'Paperless onboarding',
      'Educational blogs',
    ],
    riskLevel: 'medium',
    idealHorizon: ['short', 'medium', 'long'],
  },
  {
    name: 'INDmoney',
    type: 'Wealth Management App',
    minAmount: '₹500',
    bestFor: ['Comprehensive tracking', 'All risk levels', 'Organized learners'],
    learningFocus: 'Holistic wealth view and portfolio management',
    features: [
      'Track all investments in one place',
      'US stocks access',
      'Financial planning tools',
      'Net worth tracking',
    ],
    riskLevel: 'medium',
    idealHorizon: ['medium', 'long'],
  },
];

export function PracticePlatforms({ userProfile, userProgress }: PracticePlatformsProps) {
  // Calculate readiness score
  const calculateReadinessScore = () => {
    let score = 0;
    score += Math.min((userProgress.completedCapsules.length / 8) * 40, 40);
    if (userProgress.simulationCompleted) score += 30;
    if (userProgress.decisionCheckPassed) score += 10;
    score += Math.min((userProgress.weeklyGoalsCompleted / 10) * 20, 20);
    return Math.round(score);
  };

  const readinessScore = calculateReadinessScore();
  const isReady = readinessScore >= 50; // Minimum 50% readiness required

  // Get personalized recommendations based on user profile
  const getRecommendations = (): Platform[] => {
    if (!userProfile) return [];

    const { capital, risk, horizon } = userProfile;
    
    return platforms
      .filter(platform => {
        // Filter by capital
        const platformMinAmount = parseInt(platform.minAmount.replace(/[^0-9]/g, ''));
        if (capital < platformMinAmount) return false;

        // Filter by risk level
        if (risk === 'low' && platform.riskLevel === 'high') return false;
        if (risk === 'high' && platform.riskLevel === 'low') return false;

        // Filter by horizon
        if (!platform.idealHorizon.includes(horizon)) return false;

        return true;
      })
      .slice(0, 3); // Show top 3 matches
  };

  const recommendations = getRecommendations();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Next Steps: Practice Platforms
        </h1>
        <p className="text-gray-600">
          Bridge the gap between learning and real-world practice with personalized platform recommendations.
        </p>
      </div>

      {/* Readiness Check */}
      {!isReady ? (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Build Your Readiness First
              </h2>
              <p className="text-gray-700 mb-4">
                Your current readiness score is <strong>{readinessScore}/100</strong>. We recommend achieving at least 
                50/100 before exploring real investment platforms.
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Complete These Steps:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className={`flex items-center gap-2 ${userProgress.completedCapsules.length >= 3 ? 'text-green-700' : ''}`}>
                    {userProgress.completedCapsules.length >= 3 ? '✓' : '○'} 
                    Complete at least 3 learning capsules ({userProgress.completedCapsules.length}/8)
                  </li>
                  <li className={`flex items-center gap-2 ${userProgress.simulationCompleted ? 'text-green-700' : ''}`}>
                    {userProgress.simulationCompleted ? '✓' : '○'} 
                    Complete behavioral simulation
                  </li>
                  <li className={`flex items-center gap-2 ${userProgress.decisionCheckPassed ? 'text-green-700' : ''}`}>
                    {userProgress.decisionCheckPassed ? '✓' : '○'} 
                    Pass decision readiness check
                  </li>
                </ul>
              </div>

              <p className="text-sm text-amber-800">
                <strong>Why this matters:</strong> These platforms involve real money. Building foundational knowledge 
                first helps you avoid costly beginner mistakes.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Rocket className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  You're Ready to Practice! (Score: {readinessScore}/100)
                </h2>
                <p className="text-sm text-gray-700">
                  Based on your learning progress and profile, here are personalized platform recommendations 
                  where you can gain real-world experience with small amounts.
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          {userProfile && (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Your Profile</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Capital</div>
                  <div className="font-semibold text-gray-900">₹{userProfile.capital}</div>
                </div>
                <div>
                  <div className="text-gray-600">Risk Level</div>
                  <div className="font-semibold text-gray-900 capitalize">{userProfile.risk}</div>
                </div>
                <div>
                  <div className="text-gray-600">Horizon</div>
                  <div className="font-semibold text-gray-900 capitalize">{userProfile.horizon}-term</div>
                </div>
                <div>
                  <div className="text-gray-600">Mode</div>
                  <div className="font-semibold text-gray-900 capitalize">{userProfile.mode}</div>
                </div>
              </div>
            </div>
          )}

          {/* Personalized Recommendations */}
          {recommendations.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Recommended for You
                </h2>
                <p className="text-sm text-gray-600">
                  These platforms match your capital level (₹{userProfile?.capital}), risk tolerance ({userProfile?.risk}), 
                  and time horizon ({userProfile?.horizon}-term).
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {recommendations.map((platform, index) => (
                  <div key={platform.name} className="bg-white border-2 border-teal-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{platform.name}</h3>
                          {index === 0 && (
                            <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{platform.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Min. Amount</div>
                        <div className="font-semibold text-teal-600">{platform.minAmount}</div>
                      </div>
                    </div>

                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-blue-900 mb-1">Learning Focus</div>
                          <div className="text-sm text-blue-800">{platform.learningFocus}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Best For:</h4>
                      <ul className="space-y-1">
                        {platform.bestFor.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-teal-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {platform.features.map((feature, i) => (
                          <div key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span className="capitalize">Risk: {platform.riskLevel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>Horizon: {platform.idealHorizon.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center mb-8">
              <p className="text-gray-700">
                Complete your profile in the "Build Roadmap" section to see personalized recommendations.
              </p>
            </div>
          )}

          {/* All Available Platforms */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              All Available Platforms
            </h2>
            <p className="text-sm text-gray-600">
              Explore other options that might suit different goals or capital levels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {platforms
              .filter(p => !recommendations.some(r => r.name === p.name))
              .map(platform => (
                <div key={platform.name} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-xs text-gray-600">{platform.type}</p>
                    </div>
                    <div className="text-xs font-semibold text-gray-700">{platform.minAmount}</div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{platform.learningFocus}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="capitalize">Risk: {platform.riskLevel}</span>
                    <span>•</span>
                    <span>Min: {platform.minAmount}</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* Important Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Practice Safely: Important Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">1.</span>
                <span><strong>Start with the minimum:</strong> Use only the minimum required amount to learn. This isn't about making money—it's about gaining experience.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">2.</span>
                <span><strong>Never invest more than you can afford to lose:</strong> Use money you've budgeted for learning, not your emergency fund or essential savings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">3.</span>
                <span><strong>Focus on learning, not returns:</strong> Your goal is to understand how platforms work, not to generate profits immediately.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">4.</span>
                <span><strong>Do your own research:</strong> Read platform terms, understand fees, and verify regulatory compliance before signing up.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">5.</span>
                <span><strong>Track your behavior:</strong> Notice your emotional reactions to gains/losses. This self-awareness is invaluable.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Important Disclaimer</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Not Endorsements:</strong> These platform recommendations are educational suggestions based on your 
            profile. We are not affiliated with any of these platforms and do not receive compensation for these recommendations.
          </p>
          <p>
            <strong>Do Your Research:</strong> Before investing real money on any platform, conduct your own research, 
            read user reviews, understand fee structures, and verify regulatory compliance.
          </p>
          <p>
            <strong>Risk Warning:</strong> All investments carry risk of loss. These recommendations are meant to help 
            you gain practical experience with small amounts, not to guarantee returns or success.
          </p>
          <p>
            <strong>Seek Professional Advice:</strong> For significant investment decisions, consult with SEBI-registered 
            financial advisors who can provide personalized guidance based on your complete financial situation.
          </p>
        </div>
      </div>
    </div>
  );
}
