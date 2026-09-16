import React from 'react';
import { 
  Bot, 
  Clock, 
  Database, 
  Compass, 
  Award, 
  Building, 
  UserCheck, 
  PhoneForwarded, 
  BarChart3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FeaturesProps {
  onLearnMore?: (feature: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onLearnMore }) => {
  const features = [
    {
      title: 'AI Admission Assistant',
      desc: 'Instant, intelligent admission-related guidance covering cutoffs, application milestones, seat matrices, and document checklists.',
      icon: Bot,
      color: 'from-blue-600 to-cyan-500',
      tag: 'Admissions'
    },
    {
      title: '24/7 Student Support',
      desc: 'Students can ask questions anytime from anywhere without queueing outside administrative offices or waiting for office hours.',
      icon: Clock,
      color: 'from-cyan-500 to-teal-500',
      tag: 'Always On'
    },
    {
      title: 'Smart Knowledge Base',
      desc: 'Answers are generated strictly using verified institutional brochures, circulars, syllabi, and official fee notifications.',
      icon: Database,
      color: 'from-indigo-600 to-blue-500',
      tag: 'Zero-Hallucination'
    },
    {
      title: 'Course & Degree Guidance',
      desc: 'Helps students evaluate curriculum tracks, compare computing vs data science, and understand future career opportunities.',
      icon: Compass,
      color: 'from-purple-600 to-indigo-500',
      tag: 'Academic'
    },
    {
      title: 'Scholarship Support',
      desc: 'Discover institutional merit awards, women in STEM grants, sports quotas, and income-based tuition fee waivers with deadlines.',
      icon: Award,
      color: 'from-emerald-500 to-cyan-500',
      tag: 'Financial Aid'
    },
    {
      title: 'Campus Life & Facilities',
      desc: 'Provides comprehensive details on air-conditioned hostels, dining options, Central Library access, and 16 bus transit routes.',
      icon: Building,
      color: 'from-amber-500 to-rose-500',
      tag: 'Campus Info'
    },
    {
      title: 'Personalized Assistance',
      desc: 'Context-aware responses tailored to the student’s admitted department, application milestone, and degree program.',
      icon: UserCheck,
      color: 'from-sky-500 to-blue-600',
      tag: 'Personalized'
    },
    {
      title: 'Smart Human Handoff',
      desc: 'When an inquiry requires official discretion or confidential review, smoothly routes the student to the appropriate human officer.',
      icon: PhoneForwarded,
      color: 'from-rose-500 to-purple-600',
      tag: 'Fail-Safe'
    },
    {
      title: 'Enquiry Analytics',
      desc: 'Empowers college leadership with real-time analytics to identify common student bottlenecks, FAQs, and application trends.',
      icon: BarChart3,
      color: 'from-indigo-500 to-cyan-400',
      tag: 'College Admin'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 relative bg-brand-navy-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Higher Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">Excellence</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Everything students and college administrators need to make the college experience intuitive, transparent, and responsive.
          </p>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 hover:from-brand-cyan-400/50 hover:to-brand-blue-600/50 transition-all duration-300 shadow-lg hover:shadow-glow-cyan flex flex-col"
              >
                <div className="bg-brand-navy-950/90 backdrop-blur-xl rounded-[15px] p-6 flex flex-col h-full justify-between">
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${f.color} p-0.5 shadow-md`}>
                        <div className="w-full h-full bg-brand-navy-950 rounded-[10px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-brand-cyan-300 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {f.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan-300 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-brand-cyan-400 font-semibold group-hover:text-white transition-colors">
                    <span>Explore Feature</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
