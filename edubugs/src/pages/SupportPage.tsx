import React, { useState } from 'react';
import { FAQ } from '../components/FAQ';
import { DEPARTMENT_CONTACTS } from '../data/collegeKnowledgeBase';
import { PhoneCall, Mail, Building2, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

interface SupportPageProps {
  onAskAI: (query: string) => void;
  onOpenHandoff: (dept?: string, query?: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onAskAI, onOpenHandoff }) => {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Campus Help Desk & FAQ
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Support & Directory.
          </h1>
          <p className="text-base text-[#86868b] font-normal tracking-tight mt-3">
            Find answers to common questions or connect directly with accredited college department officers.
          </p>
        </div>

        {/* Direct Human Handoff Quick Banner */}
        <div className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white tracking-tight">Need direct assistance from an officer?</h3>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-lg">
              When an inquiry cannot be answered by the AI knowledge base, open a verified support ticket dispatched directly to the dean’s office.
            </p>
          </div>
          <button
            onClick={() => onOpenHandoff('Admissions & Enrolment Office', 'I would like to speak with a human support officer')}
            className="apple-pill-btn apple-pill-primary px-6 py-3 text-xs sm:text-sm whitespace-nowrap"
          >
            Connect with Human Officer
          </button>
        </div>

        {/* Emergency & Mental Wellness Disclaimer */}
        <div className="p-6 rounded-[20px] bg-[#161617] border border-rose-500/20 mb-16 flex items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#a1a1a6] space-y-1">
            <strong className="text-rose-300 block font-semibold">Campus Crisis & Health Support Notice</strong>
            <p>
              For urgent personal health or safety emergencies, please call the 24/7 Campus Crisis Helpline at <strong className="text-white">1 (800) 555-WELL (9355)</strong>, dial or text <strong className="text-white">988</strong>, or visit the Campus Health Center (Wing 2).
            </p>
          </div>
        </div>

        {/* Department Directory Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-6">
            Institutional Department Contacts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEPARTMENT_CONTACTS.map((dept, i) => (
              <div
                key={i}
                className="p-6 rounded-[20px] bg-[#161617] border border-white/[0.08] space-y-3"
              >
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">{dept.department}</h4>
                  <p className="text-xs text-[#86868b] mt-0.5">{dept.deanOrHOD}</p>
                </div>

                <div className="space-y-1.5 text-xs text-[#86868b] pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-white" />
                    <span className="text-[#f5f5f7]">{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>{dept.officeHours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenHandoff(dept.department, `I need help contacting ${dept.department}`)}
                    className="apple-link text-xs"
                  >
                    <span>Send message to {dept.department.split('&')[0]}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div>
          <FAQ onAskAI={onAskAI} />
        </div>

      </div>
    </div>
  );
};
