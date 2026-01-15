import React from 'react';
import { Shield, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export function SafetyTransparency() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Safety & Transparency
        </h1>
        <p className="text-gray-600">
          Understanding what this platform is, what it isn't, and how it protects you.
        </p>
      </div>

      {/* Demo-Safety Banner */}
      <div className="mb-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">🔔 Important Demo Disclaimers</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>Educational demonstration only</strong> — This is a learning system, not a real investment platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>No financial advice</strong> — Nothing here constitutes investment advice or recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>No guaranteed returns</strong> — We make no claims about investment performance or outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span><strong>No real-money execution</strong> — This system does not handle real money transactions or investments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* What This Platform Is */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What This Platform IS</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>An educational system</strong> designed to build investor readiness through learning and simulation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>A discipline-building tool</strong> that helps you develop good investor habits before deploying real money</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>A behavioral readiness system</strong> focused on decision quality, not financial returns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>A protected learning path</strong> that blocks progression until you demonstrate readiness</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* What This Platform Is NOT */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What This Platform IS NOT</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span><strong>Financial advice</strong> — We do not provide investment recommendations or tell you what to buy/sell</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span><strong>Stock advisory service</strong> — We never mention specific stocks, funds, or securities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span><strong>Trading platform</strong> — No real money flows through this system. This is education only.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span><strong>Return guarantee</strong> — We make no claims about investment performance or financial outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span><strong>Get-rich-quick scheme</strong> — This is about long-term readiness, not fast money</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Protect You */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Protect You</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Progressive Locking</h3>
                <p className="text-sm text-gray-700">
                  You cannot skip stages. If you haven't demonstrated understanding in one stage, 
                  the next stage remains locked. Protection over speed.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. No Real Money</h3>
                <p className="text-sm text-gray-700">
                  This is a simulation and learning environment. No actual financial transactions occur, 
                  eliminating the risk of monetary loss while learning.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Focus on Behavior, Not Returns</h3>
                <p className="text-sm text-gray-700">
                  We measure readiness through knowledge, discipline, and decision-making quality—not 
                  through promised returns or market performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">4. Transparent Logic</h3>
                <p className="text-sm text-gray-700">
                  All roadmap generation and scoring uses visible rule-based logic. No hidden algorithms 
                  or AI making opaque decisions about your path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Disclaimers */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Important Disclaimers</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Not Financial Advice:</strong> Nothing on this platform constitutes financial, 
                investment, tax, or legal advice. Always consult qualified professionals before making 
                financial decisions.
              </p>
              <p>
                <strong>No Guarantees:</strong> We make no representations or warranties about investment 
                outcomes. Past performance does not indicate future results.
              </p>
              <p>
                <strong>Your Responsibility:</strong> You are solely responsible for any investment decisions 
                you make outside this platform. This system only provides educational content.
              </p>
              <p>
                <strong>Risk Warning:</strong> All investments carry risk. You can lose some or all of your 
                capital. Never invest money you cannot afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use This Platform Safely */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Platform Safely</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-teal-600 font-bold">1.</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Complete All Learning Stages</h3>
              <p className="text-sm text-gray-600">
                Don't rush. Each stage builds critical knowledge and habits.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-teal-600 font-bold">2.</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Understand This Is Simulation</h3>
              <p className="text-sm text-gray-600">
                Real investing involves real risk. Use this to prepare, not to predict outcomes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-teal-600 font-bold">3.</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Seek Professional Advice</h3>
              <p className="text-sm text-gray-600">
                Before investing real money, consult with certified financial advisors who understand your situation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-teal-600 font-bold">4.</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Focus on Process, Not Promises</h3>
              <p className="text-sm text-gray-600">
                Good investor habits matter more than chasing returns. Build the foundation first.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Questions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Questions or Concerns?</h2>
        <p className="text-sm text-gray-700 mb-4">
          This platform is designed with beginner safety in mind. If you have questions about how to use 
          the system or concerns about the content, please review the Learning Capsules or refer to 
          professional financial educators.
        </p>
        <p className="text-xs text-gray-500">
          <strong>Remember:</strong> Building investor readiness is a journey, not a race. Take your time 
          and focus on truly understanding each concept.
        </p>
      </div>
    </div>
  );
}