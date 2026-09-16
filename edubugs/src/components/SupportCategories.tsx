import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Building2, 
  UserCheck, 
  LifeBuoy, 
  ArrowRight, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { SupportCategory } from '../services/aiAssistantService';

interface SupportCategoriesProps {
  onSelectPrompt: (category: SupportCategory, query: string) => void;
}

export const SupportCategories: React.FC<SupportCategoriesProps> = ({ onSelectPrompt }) => {
  const categoryData = [
    {
      id: 'admissions' as SupportCategory,
      title: 'Admissions & Enrolment',
      icon: GraduationCap,
      badge: 'Admissions',
      color: 'from-blue-600 to-cyan-500',
      description: 'Get instant answers on program cutoffs, application procedures, fees, and required certificates.',
      questions: [
        'How do I apply for 2026 admissions?',
        'What courses are available and what are their fees?',
        'What is the eligibility for Computer Science & Engineering?',
        'What documents are required for application submission?',
        'What are the upcoming admission deadlines?'
      ]
    },
    {
      id: 'academics' as SupportCategory,
      title: 'Academic Guidance & Departments',
      icon: BookOpen,
      badge: 'Academic Support',
      color: 'from-cyan-500 to-blue-600',
      description: 'Explore curricula, semester grading frameworks, faculty offices, and laboratory access.',
      questions: [
        'Which subjects are included in the AI & Data Science curriculum?',
        'What are the academic departments and dean contacts?',
        'How does the semester credit and GPA system work?',
        'What research laboratories and digital libraries are accessible?',
        'How can I contact my department coordinator?'
      ]
    },
    {
      id: 'scholarships' as SupportCategory,
      title: 'Scholarships & Financial Aid',
      icon: DollarSign,
      badge: 'Scholarships',
      color: 'from-emerald-500 to-teal-600',
      description: 'Discover institutional merit awards, women in STEM grants, sports fellowships, and fee waivers.',
      questions: [
        'What scholarships are available for incoming students?',
        'Who is eligible for the Chancellor’s Merit Scholarship?',
        'How do I apply for the Women in STEM leadership grant?',
        'What income certificates are needed for financial aid?',
        'Are flexible semester installment plans offered?'
      ]
    },
    {
      id: 'campus' as SupportCategory,
      title: 'Campus Life & Facilities',
      icon: Building2,
      badge: 'Campus Info',
      color: 'from-indigo-500 to-purple-600',
      description: 'Complete verified details regarding hostels, dining halls, sports arenas, and bus routes.',
      questions: [
        'What are the hostel room amenities and in-time curfew rules?',
        'What are the Dr. APJ Abdul Kalam Central Library timings?',
        'How do I register for campus bus transit routes?',
        'What student clubs, coding hackathons, and sports are active?',
        'What dining options and meal plans are available?'
      ]
    },
    {
      id: 'services' as SupportCategory,
      title: 'Student Services & Help Desk',
      icon: UserCheck,
      badge: 'Student Services',
      color: 'from-sky-500 to-indigo-600',
      description: 'Streamline administrative paperwork including student IDs, bonafide certificates, and transcripts.',
      questions: [
        'How do I download my digital student ID card?',
        'How can I request an official Bonafide Certificate?',
        'How are administrative requests and grievances handled?',
        'Where is the Student Affairs help desk located?',
        'What is the turnaround time for official transcripts?'
      ]
    },
    {
      id: 'guidance' as SupportCategory,
      title: 'Student Help & Empathetic Guidance',
      icon: LifeBuoy,
      badge: 'Help & Guidance',
      color: 'from-amber-500 to-rose-600',
      description: 'Feeling overwhelmed or uncertain? Get empathetic advising or direct human specialist routing.',
      questions: [
        'I don’t know which course to choose. Can you advise me?',
        'I am confused about the college admission procedure.',
        'I need help understanding career paths for engineers.',
        'Who should I talk to if I am feeling stressed or homesick?'
      ],
      disclaimer: 'For emergency medical or crisis safety, AI routes you directly to campus hotlines.'
    }
  ];

  return (
    <section id="support-categories" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-600/15 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Assistance Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Smart AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">Support Categories</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Ask natural questions across 6 core pillars of campus life. Tap any suggested query below to chat with EDU BUGS instantly.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryData.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 hover:from-brand-cyan-500/50 hover:to-brand-blue-600/50 transition-all duration-300 shadow-lg hover:shadow-glow-card flex flex-col"
              >
                <div className="bg-brand-navy-950/90 backdrop-blur-xl rounded-[15px] p-6 flex flex-col h-full justify-between">
                  
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} p-0.5 shadow-md`}>
                        <div className="w-full h-full bg-brand-navy-950 rounded-[10px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-brand-cyan-300 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Disclaimer if present (Guidance) */}
                    {cat.disclaimer && (
                      <div className="mt-3 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 flex items-start gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{cat.disclaimer}</span>
                      </div>
                    )}

                    {/* Clickable Questions List */}
                    <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Frequently Asked Questions:
                      </span>
                      {cat.questions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectPrompt(cat.id, q)}
                          className="w-full text-left text-xs p-2 rounded-lg bg-slate-900/70 hover:bg-brand-blue-600/20 border border-slate-800 hover:border-brand-cyan-500/40 text-slate-300 hover:text-white transition flex items-center justify-between group/q"
                        >
                          <span className="truncate pr-2">{q}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover/q:text-brand-cyan-400 group-hover/q:translate-x-0.5 transition-transform flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-5 mt-4 border-t border-slate-800/60">
                    <button
                      onClick={() => onSelectPrompt(cat.id, `Tell me more about ${cat.title}`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-blue-600/30 border border-slate-700 hover:border-brand-cyan-400 text-xs font-semibold text-brand-cyan-300 hover:text-white transition"
                    >
                      <span>Ask AI About {cat.badge}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
