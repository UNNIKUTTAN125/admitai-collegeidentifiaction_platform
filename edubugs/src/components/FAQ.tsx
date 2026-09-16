import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';

interface FAQProps {
  onAskAI: (prompt: string) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onAskAI }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchFilter, setSearchFilter] = useState('');

  const faqs = [
    {
      q: 'What is EDU BUGS?',
      a: 'EDU BUGS is an intelligent AI-powered college admission, academic guidance, and student support platform. It acts as a 24/7 digital assistant for prospective applicants and enrolled students, delivering instant answers on programs, eligibility, fees, scholarships, campus facilities, and administrative services.'
    },
    {
      q: 'How does the AI assistant work?',
      a: 'EDU BUGS uses a specialized Retrieval-Augmented Generation (RAG) architecture. When a student asks a question via text or voice, the system semantically analyzes the query, retrieves verified facts from the institution’s official knowledge base (brochures, syllabi, fee schedules), and delivers an accurate, structured response without inventing facts.'
    },
    {
      q: 'What questions can I ask?',
      a: 'You can ask about any aspect of college life: program cutoffs, application procedures, fee payment plans, merit scholarships, hostel accommodation and curfew, bus routes, laboratory hours, digital student ID issuance, bonafide certificate downloads, or advice if you feel confused about choosing a major.'
    },
    {
      q: 'Can EDU BUGS help with admissions?',
      a: 'Yes! EDU BUGS guides you through every step of the admission lifecycle: reviewing degree eligibility, gathering required documents, submitting online applications, tracking application milestones, and checking upcoming deadline dates.'
    },
    {
      q: 'Can EDU BUGS provide course information?',
      a: 'Yes. EDU BUGS contains comprehensive profiles of every offered undergraduate and postgraduate program, including B.Tech Computer Science, AI & Data Science, Mechanical Engineering, MBA, and BCA — detailing curricula, duration, tuition fees, and career prospects.'
    },
    {
      q: 'Can students ask academic questions?',
      a: 'Yes. Students can inquire about course curricula, semester grading systems, academic calendar deadlines, laboratory timings, faculty consultation hours, and official department coordinator contacts.'
    },
    {
      q: 'What happens when the AI doesn’t know an answer?',
      a: 'If a question involves unconfirmed institutional policies, sensitive individual grievances, or edge-case disputes, EDU BUGS immediately activates its Smart Human Handoff protocol. It informs the student transparently and offers to generate a support ticket routed to the relevant college officer.'
    },
    {
      q: 'Can I contact a human support officer?',
      a: 'Absolutely. You can initiate a human handoff at any point directly from the chat or the navigation menu. Your query will be assigned a unique ticket ID and forwarded to the Admissions, Academic Affairs, Financial Aid, or Student Welfare department.'
    },
    {
      q: 'Can colleges customize EDU BUGS with their own information?',
      a: 'Yes. College administrators have a dedicated Admin Panel where they can upload official PDFs, course catalogs, circulars, and FAQs. The knowledge base updates dynamically without requiring manual software recompilation.'
    },
    {
      q: 'Can EDU BUGS be integrated into an existing college website?',
      a: 'Yes. EDU BUGS is engineered with a modern component-based React and API architecture. It can be embedded as a full-page college portal, an interactive floating chat widget, or connected to university ERPs and mobile apps via secure webhooks.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchFilter.toLowerCase()) || 
    f.a.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-brand-navy-950/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">Questions</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Everything you need to know about EDU BUGS, our verified AI intelligence, and human handoff support.
          </p>

          {/* FAQ Search Filter */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search questions (e.g. admissions, handoff, fees)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-brand-navy-900 border border-slate-700 text-sm text-white focus:border-brand-cyan-400 focus:outline-none placeholder:text-slate-400 shadow-inner"
            />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-brand-navy-900/70 border border-slate-800 hover:border-slate-700 transition overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-cyan-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand-blue-600/30 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                    <div className="mt-3 pt-2 flex items-center justify-end">
                      <button
                        onClick={() => onAskAI(faq.q)}
                        className="text-xs text-brand-cyan-400 hover:text-white flex items-center gap-1 font-semibold transition"
                      >
                        <Sparkles className="w-3 h-3" />
                        Ask EDU BUGS this in chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
