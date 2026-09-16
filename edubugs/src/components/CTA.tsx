import React from 'react';
import { Bot, LifeBuoy, ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onAskAI: () => void;
  onGetSupport: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onAskAI, onGetSupport }) => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-brand-navy-950 border-t border-slate-800/80">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-blue-600/20 via-brand-cyan-500/20 to-indigo-600/20 blur-[130px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-900 border border-brand-cyan-500/30 text-brand-cyan-300 text-xs font-semibold shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan-400" />
          <span>Ask. Learn. Solve. Succeed.</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Your Questions Deserve <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">
            Instant Answers.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          Start your college journey with EDU BUGS — 24/7 verified AI assistance from admission cutoffs to graduation support.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onAskAI}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white font-bold text-sm sm:text-base shadow-glow-cyan hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
          >
            <Bot className="w-5 h-5" />
            <span>Ask EDU BUGS AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGetSupport}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy-900 hover:bg-brand-navy-850 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 hover:border-brand-cyan-400/60 transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <LifeBuoy className="w-5 h-5 text-brand-cyan-400" />
            <span>Get Student Support</span>
          </button>
        </div>

        {/* Mini security note */}
        <p className="text-xs text-slate-400 font-medium">
          No sign-up required for general queries • Powered by verified institutional knowledge
        </p>

      </div>
    </section>
  );
};
