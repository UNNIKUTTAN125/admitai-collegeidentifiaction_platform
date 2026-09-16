import React from 'react';

export const VisualStatement: React.FC = () => {
  return (
    <section className="py-28 sm:py-44 bg-black border-t border-white/[0.08] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        
        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-mono text-[#86868b] uppercase tracking-wider block">
          The EDU BUGS Philosophy
        </span>

        {/* Large Statement Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#f5f5f7] leading-[1.08] max-w-4xl mx-auto">
          Designed to know your campus. <br />
          <span className="text-[#86868b]">Engineered never to guess.</span>
        </h2>

        {/* Supporting Editorial Paragraph */}
        <p className="text-base sm:text-xl text-[#86868b] font-normal tracking-tight leading-relaxed max-w-2xl mx-auto pt-4">
          When a student asks an admission question, precision is not an option — it is a responsibility. EDU BUGS grounds every syllable in verified institutional truth, providing clarity when it matters most.
        </p>

        {/* Minimal Hairline Spec Divider */}
        <div className="pt-12 max-w-lg mx-auto">
          <div className="h-[1px] bg-white/[0.1] w-full" />
        </div>

      </div>
    </section>
  );
};
