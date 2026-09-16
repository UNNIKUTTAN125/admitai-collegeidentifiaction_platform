import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewPage } from './pages/OverviewPage';
import { StudentHubPage } from './pages/StudentHubPage';
import { AdminPage } from './pages/AdminPage';
import { Footer } from './components/Footer';
import { SmartHumanHandoffModal } from './components/SmartHumanHandoffModal';
import { SupportCategory } from './services/aiAssistantService';

export type ActiveView = 'main' | 'hub' | 'admin';

export function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('main');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [handoffDept, setHandoffDept] = useState('Admissions & Enrolment Office');
  const [handoffQuery, setHandoffQuery] = useState('');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preloadedAssistantPrompt, setPreloadedAssistantPrompt] = useState<string>('');
  const [preloadedCategory, setPreloadedCategory] = useState<SupportCategory>('all');

  // Handle section scrolling and view routing
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hub') {
      setCurrentView('hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'admin') {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Switch back to main page if currently in Hub or Admin
    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 50);
    } else {
      scrollToElement(sectionId);
    }
  };

  const scrollToElement = (id: string) => {
    setActiveSection(id);
    const targetMap: Record<string, string> = {
      home: 'home',
      about: 'about',
      assistant: 'ai-assistant',
      features: 'features',
      support: 'support-categories',
      'how-it-works': 'how-it-works',
      faq: 'faq'
    };

    const targetId = targetMap[id] || id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenHandoff = (dept?: string, query?: string) => {
    if (dept) setHandoffDept(dept);
    if (query) setHandoffQuery(query);
    setHandoffOpen(true);
  };

  const handleSetAssistantPrompt = (category: SupportCategory, prompt: string) => {
    setPreloadedCategory(category);
    setPreloadedAssistantPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-brand-navy-950 text-slate-100 flex flex-col font-sans selection:bg-brand-cyan-500/30 selection:text-brand-cyan-300">
      
      {/* Sticky Professional Navbar */}
      <Navbar
        activeSection={currentView === 'main' ? activeSection : currentView}
        onNavigateSection={handleNavigateSection}
        onOpenHub={() => {
          setCurrentView('hub');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content View Switcher */}
      <main className="flex-grow">
        {currentView === 'main' && (
          <OverviewPage
            onOpenHandoff={handleOpenHandoff}
            onOpenStudentHub={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdminPanel={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            preloadedPrompt={preloadedAssistantPrompt}
            externalCategory={preloadedCategory}
            onSetAssistantPrompt={handleSetAssistantPrompt}
          />
        )}

        {currentView === 'hub' && (
          <div className="pt-16">
            <StudentHubPage
              onAskAI={(prompt) => {
                setCurrentView('main');
                setTimeout(() => {
                  if (prompt) {
                    handleSetAssistantPrompt('admissions', prompt);
                  }
                  scrollToElement('ai-assistant');
                }, 50);
              }}
              onOpenHandoff={() => handleOpenHandoff('Student Affairs & Welfare', 'I need assistance with my applicant portal profile')}
              onNavigateCourses={() => {
                setCurrentView('main');
                setTimeout(() => {
                  handleSetAssistantPrompt('admissions', 'What courses are available and what are their fees?');
                  scrollToElement('ai-assistant');
                }, 50);
              }}
              onNavigateScholarships={() => {
                setCurrentView('main');
                setTimeout(() => {
                  handleSetAssistantPrompt('scholarships', 'What scholarships and fee waivers are available?');
                  scrollToElement('ai-assistant');
                }, 50);
              }}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="pt-16">
            <AdminPage
              onBackToHome={() => {
                setCurrentView('main');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenContact={() => handleOpenHandoff('Admissions & Enrolment Office', 'General admissions enquiry')}
      />

      {/* Smart Human Handoff Modal */}
      <SmartHumanHandoffModal
        isOpen={handoffOpen}
        onClose={() => setHandoffOpen(false)}
        defaultDepartment={handoffDept}
        initialQuery={handoffQuery}
        onSubmitSuccess={(ticketId, dept) => {
          console.log(`Support ticket submitted: ${ticketId} for ${dept}`);
        }}
      />

      {/* Privacy Statement Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-brand-navy-900 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight">Privacy Philosophy</h3>
            <p>
              EDU BUGS is engineered with a strict student-first privacy framework. General admissions queries, course explores, and campus information searches do not require personal identification or user registration.
            </p>
            <p>
              When a student voluntarily requests a Smart Human Handoff, contact information is routed securely and directly to the relevant college department head. Conversations are never sold to data brokers or used to train third-party public AI models.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white font-semibold text-xs hover:brightness-110 transition shadow-glow-cyan"
              >
                Close Privacy Statement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
