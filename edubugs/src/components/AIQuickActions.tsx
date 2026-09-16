import React from 'react';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  CreditCard, 
  Award, 
  LifeBuoy, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';
import { SupportCategory } from '../services/aiAssistantService';

interface AIQuickActionsProps {
  onTriggerAction: (category: SupportCategory, prompt: string) => void;
}

export const AIQuickActions: React.FC<AIQuickActionsProps> = ({ onTriggerAction }) => {
  const actions = [
    {
      title: 'Ask About Admissions',
      subtitle: 'Deadlines, online portal steps & quotas',
      icon: GraduationCap,
      category: 'admissions' as SupportCategory,
      prompt: 'How do I apply for 2026 admissions and what are the key deadlines?',
      glow: 'group-hover:border-blue-500/50'
    },
    {
      title: 'Find My Course',
      subtitle: 'Explore engineering, computing & MBA',
      icon: Search,
      category: 'admissions' as SupportCategory,
      prompt: 'What undergraduate and postgraduate courses are offered at EDU BUGS partner colleges?',
      glow: 'group-hover:border-cyan-500/50'
    },
    {
      title: 'Check Eligibility',
      subtitle: '10+2 cutoffs, entrance ranks & criteria',
      icon: CheckCircle2,
      category: 'admissions' as SupportCategory,
      prompt: 'What are the eligibility requirements for Computer Science and AI & Data Science?',
      glow: 'group-hover:border-emerald-500/50'
    },
    {
      title: 'Understand Fees',
      subtitle: 'Tuition schedule, hostel & payment plans',
      icon: CreditCard,
      category: 'admissions' as SupportCategory,
      prompt: 'Can you show me the complete annual fee breakdown and installment options?',
      glow: 'group-hover:border-amber-500/50'
    },
    {
      title: 'Find Scholarships',
      subtitle: 'Merit waivers, sports & women in STEM',
      icon: Award,
      category: 'scholarships' as SupportCategory,
      prompt: 'What scholarships and fee waivers can I qualify for?',
      glow: 'group-hover:border-purple-500/50'
    },
    {
      title: 'Get Student Support',
      subtitle: 'Empathetic guidance, IDs & mental wellness',
      icon: LifeBuoy,
      category: 'guidance' as SupportCategory,
      prompt: 'I am confused about my choices and need guidance on next steps.',
      glow: 'group-hover:border-rose-500/50'
    },
  ];

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant AI Shortcuts</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Quick Actions
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Jump straight into conversation with pre-configured prompts tailored to popular student enquiries.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                onClick={() => onTriggerAction(action.category, action.prompt)}
                className={`group cursor-pointer rounded-2xl bg-brand-navy-900/80 hover:bg-brand-slate-850 border border-slate-800 ${action.glow} p-5 transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-xl flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-brand-cyan-400/60 flex items-center justify-center text-brand-cyan-400 group-hover:text-white transition-colors flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-cyan-300 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {action.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-brand-blue-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
