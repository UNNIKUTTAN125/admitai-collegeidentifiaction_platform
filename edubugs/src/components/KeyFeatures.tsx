import React from 'react';
import { Database, Mic, ShieldAlert, Check } from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      eyebrow: 'Knowledge Retrieval',
      title: 'Trained on facts. Grounded in truth.',
      description: 'EDU BUGS connects directly to official college catalogs, circulars, and fee matrices. If an institutional policy cannot be confirmed, it never guesses.',
      metric: '0.0%',
      metricLabel: 'Hallucination tolerance'
    },
    {
      eyebrow: 'Speech & Neural Cadence',
      title: 'Speak naturally. Hear clarity.',
      description: 'Integrated speech recognition and text-to-speech engine delivering answers in under 180 milliseconds — accessible for students anywhere, anytime.',
      metric: '< 180ms',
      metricLabel: 'Response latency'
    },
    {
      eyebrow: 'Fail-Safe Escalation',
      title: 'When precision matters, humans step in.',
      description: 'Complex disputes, medical emergencies, and discretionary financial hardship requests are routed immediately to accredited campus department heads.',
      metric: '< 2 hrs',
      metricLabel: 'Target officer response SLA'
    }
  ];

  return (
    <section id="intelligence" className="py-24 sm:py-36 bg-black border-t border-white/[0.08] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Engineered Intelligence
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Every feature. <br />
            <span className="text-[#86868b]">Designed with purpose.</span>
          </h2>
        </div>

        {/* 3 Pillar Cards with Apple-grade Generous Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-[28px] bg-[#161617] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300"
            >
              <div>
                <span className="text-xs font-mono text-[#86868b] uppercase tracking-tight block mb-4">
                  {feat.eyebrow}
                </span>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7] leading-snug">
                  {feat.title}
                </h3>

                <p className="text-sm sm:text-base text-[#86868b] font-normal leading-relaxed tracking-tight mt-4">
                  {feat.description}
                </p>
              </div>

              <div className="pt-10 mt-8 border-t border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-mono">
                  {feat.metric}
                </div>
                <div className="text-xs text-[#86868b] mt-1 tracking-tight">
                  {feat.metricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
