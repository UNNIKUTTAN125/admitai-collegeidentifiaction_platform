import React, { useRef } from 'react';
import { Hero } from '../components/Hero';
import { AIQuickActions } from '../components/AIQuickActions';
import { AIChatbot } from '../components/AIChatbot';
import { SupportCategories } from '../components/SupportCategories';
import { HowItWorks } from '../components/HowItWorks';
import { KnowledgeBaseSection } from '../components/KnowledgeBaseSection';
import { Features } from '../components/Features';
import { WhyEduBugs } from '../components/WhyEduBugs';
import { SecurityTrust } from '../components/SecurityTrust';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { SupportCategory } from '../services/aiAssistantService';
import { User, Shield, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface OverviewPageProps {
  onOpenHandoff: (dept?: string, query?: string) => void;
  onOpenStudentHub: () => void;
  onOpenAdminPanel: () => void;
  preloadedPrompt?: string;
  externalCategory?: SupportCategory;
  onSetAssistantPrompt: (category: SupportCategory, prompt: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onOpenHandoff,
  onOpenStudentHub,
  onOpenAdminPanel,
  preloadedPrompt,
  externalCategory,
  onSetAssistantPrompt
}) => {
  const assistantRef = useRef<HTMLDivElement>(null);

  const scrollToAssistant = () => {
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    const el = document.getElementById('support-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerAction = (category: SupportCategory, prompt: string) => {
    onSetAssistantPrompt(category, prompt);
    scrollToAssistant();
  };

  return (
    <div className="space-y-0 animate-in fade-in duration-300">
      
      {/* 1. Hero Section */}
      <Hero
        onStartChatting={scrollToAssistant}
        onExploreSupport={scrollToCategories}
        onTriggerAssistantChip={(chip) => {
          handleTriggerAction('admissions', chip);
        }}
      />

      {/* 2. AI Quick Actions */}
      <AIQuickActions
        onTriggerAction={handleTriggerAction}
      />

      {/* 3. AI Student Support Assistant (Full-Width Main Feature: Meet EDU BUGS AI) */}
      <div id="ai-assistant" ref={assistantRef}>
        <AIChatbot
          onOpenHandoff={onOpenHandoff}
          externalCategoryTrigger={externalCategory}
          preloadedPrompt={preloadedPrompt}
        />
      </div>

      {/* 4. Smart AI Support Categories */}
      <div id="support-categories">
        <SupportCategories
          onSelectPrompt={(cat, query) => handleTriggerAction(cat, query)}
        />
      </div>

      {/* 5. How EDU BUGS Helps (01 Ask -> 02 Understand -> 03 Find -> 04 Answer -> 05 Support) */}
      <HowItWorks />

      {/* 6. AI Knowledge Base & RAG Architecture */}
      <KnowledgeBaseSection />

      {/* 7. Student Support Hub & Admin Console Interactive Portals Preview */}
      <section className="py-20 bg-brand-navy-900/60 border-y border-slate-800/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Ecosystem Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Personalized Portals for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 to-brand-blue-400">Students & Administrators</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Experience the dual-sided power of EDU BUGS: a personalized applicant tracker for students and a knowledge management console for college faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Student Hub Card */}
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/40 via-brand-blue-600/20 to-slate-800 hover:shadow-glow-cyan transition-all duration-300">
              <div className="bg-brand-navy-950/95 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan-500/10 border border-brand-cyan-500/30 flex items-center justify-center text-brand-cyan-400 mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Student Support Hub</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Track your college admission status, milestone progress, submitted documents, fee receipts, and previous AI enquiries in one centralized space.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Live admission milestone tracker & provisional offer letter</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Conversation history & previous questions to EDU BUGS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Hostel preferences & tuition payment receipts simulator</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={onOpenStudentHub}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white font-semibold text-sm shadow-glow-cyan hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Student Support Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Console Card */}
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-indigo-500/40 via-purple-600/20 to-slate-800 hover:shadow-glow-indigo transition-all duration-300">
              <div className="bg-brand-navy-950/95 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">College Admin & Faculty Console</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Empower admissions officers to upload institutional documents, edit syllabus & fee details, monitor enquiry trends, and triage escalated student tickets.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      <span>Document Ingestion: Upload PDFs and official notices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      <span>Real-time Analytics: Enquiries, trends & unanswered questions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      <span>Smart Human Handoff queue with direct department dispatch</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={onOpenAdminPanel}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-glow-indigo hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Open College Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Features Section (9 Feature Cards) */}
      <Features />

      {/* 9. Why EDU BUGS? (Traditional vs EDU BUGS comparison) */}
      <WhyEduBugs />

      {/* 10. Security & Trust (Built with Student Privacy in Mind) */}
      <SecurityTrust />

      {/* 11. FAQ Section (10 Questions Accordion with Search) */}
      <FAQ
        onAskAI={(q) => handleTriggerAction('admissions', q)}
      />

      {/* 12. Final Call to Action */}
      <CTA
        onAskAI={scrollToAssistant}
        onGetSupport={() => onOpenHandoff('Student Affairs & Welfare', 'I would like to speak with a campus student advisor')}
      />

    </div>
  );
};
