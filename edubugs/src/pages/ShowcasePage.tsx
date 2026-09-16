import React, { useState } from 'react';
import { COURSES_DATABASE, SCHOLARSHIPS_DATABASE, CAMPUS_FACILITIES } from '../data/collegeKnowledgeBase';
import { ArrowUpRight } from 'lucide-react';

interface ShowcasePageProps {
  onAskAbout: (query: string) => void;
}

export const ShowcasePage: React.FC<ShowcasePageProps> = ({ onAskAbout }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'scholarships' | 'campus'>('courses');

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Institutional Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Programs & Campus.
          </h1>
          <p className="text-base sm:text-lg text-[#86868b] font-normal tracking-tight mt-3">
            Explore degree programs, verified fee schedules, institutional scholarships, and world-class campus facilities.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 mb-10 text-sm">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-2 font-medium transition-colors tracking-tight ${
              activeTab === 'courses' ? 'text-white border-b-2 border-white' : 'text-[#86868b] hover:text-white'
            }`}
          >
            Academic Programs ({COURSES_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`pb-2 font-medium transition-colors tracking-tight ${
              activeTab === 'scholarships' ? 'text-white border-b-2 border-white' : 'text-[#86868b] hover:text-white'
            }`}
          >
            Scholarships & Aid ({SCHOLARSHIPS_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('campus')}
            className={`pb-2 font-medium transition-colors tracking-tight ${
              activeTab === 'campus' ? 'text-white border-b-2 border-white' : 'text-[#86868b] hover:text-white'
            }`}
          >
            Campus Life & Hostels ({CAMPUS_FACILITIES.length})
          </button>
        </div>

        {/* Tab 1: Courses */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSES_DATABASE.map((c) => (
              <div
                key={c.id}
                className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#86868b] font-mono mb-3">
                    <span>{c.department}</span>
                    <span>{c.duration}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {c.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#86868b] mt-3 leading-relaxed">
                    {c.eligibility}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#86868b]">Annual Tuition:</span>
                    <strong className="text-white font-mono">{c.annualFee}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-[#86868b]">Accreditation:</span>
                    <span className="text-white">{c.accreditation}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">Seats: {c.intakeSeats}</span>
                  <button
                    onClick={() => onAskAbout(`Tell me more about ${c.name} fees and admission process`)}
                    className="apple-link text-xs"
                  >
                    <span>Ask AI about this course</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Scholarships */}
        {activeTab === 'scholarships' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHOLARSHIPS_DATABASE.map((s) => (
              <div
                key={s.id}
                className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#86868b] uppercase block mb-2">{s.category} Category</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{s.title}</h3>
                  <div className="mt-3 p-3 rounded-xl bg-[#1d1d1f] text-xs sm:text-sm text-white font-medium">
                    {s.benefit}
                  </div>
                  <p className="text-xs text-[#86868b] mt-3">
                    <strong>Eligibility:</strong> {s.eligibility}
                  </p>
                  <p className="text-xs text-[#86868b] mt-1 font-mono">
                    Deadline: {s.deadline}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex justify-end">
                  <button
                    onClick={() => onAskAbout(`How do I apply for the ${s.title}?`)}
                    className="apple-link text-xs"
                  >
                    <span>Ask AI about application steps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Campus Life */}
        {activeTab === 'campus' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAMPUS_FACILITIES.map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#86868b] uppercase block mb-2">{f.category}</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{f.name}</h3>
                  <p className="text-xs text-[#a1a1a6] mt-2 font-mono">Location: {f.location}</p>
                  <p className="text-xs text-[#86868b] mt-1 font-mono">Timings: {f.timing}</p>
                  <p className="text-xs sm:text-sm text-[#86868b] mt-4 leading-relaxed">{f.details}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex justify-between items-center text-xs">
                  <span className="text-[#86868b]">{f.coordinator}</span>
                  <button
                    onClick={() => onAskAbout(`Tell me about ${f.name} rules and timings`)}
                    className="apple-link text-xs"
                  >
                    <span>Ask AI details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
