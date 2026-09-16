import React from 'react';
import { 
  MessageSquare, 
  Cpu, 
  Database, 
  CheckCircle, 
  PhoneForwarded, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'ASK',
      icon: MessageSquare,
      subtitle: 'Natural Student Query',
      description: 'The student asks questions naturally via text or voice — whether about cutoffs, fees, hostels, or feeling confused.',
      highlight: 'Voice or Text Enabled'
    },
    {
      step: '02',
      title: 'UNDERSTAND',
      icon: Cpu,
      subtitle: 'Intent & Entity Parsing',
      description: 'EDU BUGS AI analyzes the inquiry, extracting intent, academic program, student status, and urgency level.',
      highlight: 'NLP Context Matching'
    },
    {
      step: '03',
      title: 'FIND',
      icon: Search,
      subtitle: 'RAG Knowledge Retrieval',
      description: 'The engine searches the college’s official repository: brochures, syllabus, fee schedules, official notices, and FAQs.',
      highlight: 'Zero-Hallucination Index'
    },
    {
      step: '04',
      title: 'ANSWER',
      icon: CheckCircle,
      subtitle: 'Friendly & Verified Reply',
      description: 'The AI delivers a concise, actionable answer formatted with bullet points, fees, deadlines, and suggested next steps.',
      highlight: 'Instant & Read-Aloud'
    },
    {
      step: '05',
      title: 'SUPPORT',
      icon: PhoneForwarded,
      subtitle: 'Smart Human Handoff',
      description: 'If a question involves individual disputes or unconfirmed policies, it instantly connects the student with official staff.',
      highlight: 'Human Officer Escalation'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-brand-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-Stage Intelligent Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">EDU BUGS Helps</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            From initial enquiry to verified answer or human resolution — see the intelligence working behind every response.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step} 
                className="relative group rounded-2xl bg-brand-navy-900/70 hover:bg-brand-navy-900 border border-slate-800 hover:border-brand-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-glow-cyan"
              >
                {/* Step Number & Connector */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 to-brand-blue-500">
                      {item.step}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-brand-cyan-400/50 flex items-center justify-center text-brand-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-cyan-400 block mt-0.5">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-brand-blue-950/80 text-brand-cyan-300 border border-brand-blue-800/50">
                    {item.highlight}
                  </span>
                </div>

                {/* Horizontal Step arrow on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-7 h-7 rounded-full bg-brand-navy-950 border border-slate-700 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Flow Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-brand-navy-900/90 via-brand-slate-850 to-brand-navy-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Guaranteed Zero-Hallucination Policy</h4>
              <p className="text-xs text-slate-400">If institutional facts are missing, EDU BUGS immediately defers to designated college officers.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-brand-cyan-400 font-bold px-3 py-1.5 rounded-lg bg-brand-navy-950 border border-brand-cyan-500/30">
              Status: 100% Policy Compliant
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
