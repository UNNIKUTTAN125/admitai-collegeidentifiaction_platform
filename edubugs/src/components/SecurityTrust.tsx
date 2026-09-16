import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserX, 
  KeyRound, 
  Server, 
  EyeOff, 
  Sparkles 
} from 'lucide-react';

export const SecurityTrust: React.FC = () => {
  const principles = [
    {
      title: 'Secure Authentication',
      desc: 'Token-based session management and optional institutional single sign-on (SSO) ensuring applicant data remains confidential.',
      icon: Lock
    },
    {
      title: 'Protected Student Information',
      desc: 'Personal details and query logs are isolated with strict tenant separation so student conversations are never exposed.',
      icon: ShieldCheck
    },
    {
      title: 'Minimal Data Collection',
      desc: 'EDU BUGS queries do not require unnecessary personal identifiers. Students can ask general admissions questions anonymously.',
      icon: UserX
    },
    {
      title: 'Role-Based Admin Access',
      desc: 'Granular access controls guarantee that only authorized college department heads and officers can review escalated support tickets.',
      icon: KeyRound
    },
    {
      title: 'Secure API Communication',
      desc: 'All data exchanged between the browser, knowledge vector stores, and AI inference engines is encrypted using modern TLS.',
      icon: Server
    },
    {
      title: 'Privacy-Focused AI Architecture',
      desc: 'Student questions are not used to train public commercial AI models. Your institutional data stays strictly inside your campus perimeter.',
      icon: EyeOff
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ethical Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">Student Privacy in Mind</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            We treat academic records, applicant credentials, and student queries with uncompromising technical discretion.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-brand-navy-900/60 border border-slate-800 hover:border-brand-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-brand-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-brand-cyan-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan-400" />
                  <span>Verified Architecture Principle</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
