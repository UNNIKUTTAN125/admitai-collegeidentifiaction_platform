import React from 'react';
import { XCircle, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const WhyEduBugs: React.FC = () => {
  const comparisons = [
    {
      traditional: 'Long waiting times on busy campus phone helplines and admission email inboxes.',
      edubugs: 'Instant AI answers in under 250 milliseconds with zero queue or hold time.'
    },
    {
      traditional: 'Repeated repetitive enquiries overwhelming admissions staff every July and August.',
      edubugs: 'Automated 24/7 triage handling 94%+ of repetitive enquiries accurately.'
    },
    {
      traditional: 'Information fragmented across outdated PDFs, unstructured web pages, and pin boards.',
      edubugs: 'Single centralized knowledge base synchronized with official institutional notices.'
    },
    {
      traditional: 'Strict office hours (9 AM - 4 PM); unavailable over weekends, holidays, and nights.',
      edubugs: '24/7/365 continuous availability whenever students and parents are researching.'
    },
    {
      traditional: 'Difficult navigation through complex multi-page prospectus booklets.',
      edubugs: 'Natural conversational interface with voice input, suggested chips, and speech playback.'
    },
    {
      traditional: 'Disjointed communication without clear routing when edge-case disputes arise.',
      edubugs: 'Smart Human Handoff with automatic ticket dispatch and direct department routing.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-brand-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Competitive Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">EDU BUGS?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            See how EDU BUGS replaces legacy college bureaucracy with modern, student-centric conversational intelligence.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Traditional Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-navy-900/60 border border-rose-900/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Traditional Admission Support</h3>
                  <p className="text-xs text-slate-400">Legacy university enquiry workflows</p>
                </div>
              </div>

              <div className="space-y-4">
                {comparisons.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                    <XCircle className="w-4 h-4 text-rose-400/80 flex-shrink-0 mt-0.5" />
                    <span>{c.traditional}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-rose-300/80 font-mono">
              High student frustration • Operational staff burnout
            </div>
          </div>

          {/* EDU BUGS Card */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/60 via-brand-blue-600/40 to-slate-800 shadow-2xl">
            <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue-600 to-brand-cyan-400 p-0.5 shadow-glow-cyan">
                      <div className="w-full h-full bg-brand-navy-950 rounded-[10px] flex items-center justify-center text-brand-cyan-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">EDU BUGS AI Ecosystem</h3>
                      <p className="text-xs text-brand-cyan-400 font-medium">Next-gen AI assistant + student portal</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-cyan-500/10 text-brand-cyan-300 border border-brand-cyan-500/30 uppercase">
                    Modern Standard
                  </span>
                </div>

                <div className="space-y-4">
                  {comparisons.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{c.edubugs}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-brand-cyan-300 font-mono">
                <span>99.4% Student Satisfaction</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Architecture
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
