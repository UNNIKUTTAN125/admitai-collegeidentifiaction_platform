import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  LifeBuoy, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Send,
  CornerDownLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface HeroProps {
  onStartChatting: () => void;
  onExploreSupport: () => void;
  onTriggerAssistantChip: (chip: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartChatting,
  onExploreSupport,
  onTriggerAssistantChip
}) => {
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [chipDetails, setChipDetails] = useState<string | null>(null);

  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    if (chip === 'View Eligibility') {
      setChipDetails(
        'B.Tech CSE Criteria: Minimum 60% aggregate in 10+2 with Physics, Mathematics & Chemistry/CS. Valid state or national entrance percentile accepted.'
      );
    } else if (chip === 'Admission Process') {
      setChipDetails(
        'Step 1: Online Registration → Step 2: Upload 10th/12th Transcripts → Step 3: Merit & Counseling Round → Step 4: Provisional Seat Acceptance.'
      );
    } else if (chip === 'Required Documents') {
      setChipDetails(
        'Checklist: Class 10 & 12 mark sheets, official Transfer Certificate (TC), valid Govt Photo ID (Aadhaar/Passport), and 6 passport photographs.'
      );
    } else {
      // Ask Another Question
      onTriggerAssistantChip('What courses and scholarships are available?');
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-blue-600/20 via-brand-cyan-500/15 to-indigo-600/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-cyan-500/10 blur-[140px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-900 border border-brand-cyan-500/30 text-brand-cyan-300 text-xs font-semibold shadow-glow-cyan animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan-400" />
              <span>EDU BUGS • Next-Gen AI Student Support</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Your AI Guide for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">
                Every Step of Your
              </span> <br />
              College Journey.
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From admission enquiries to student support, EDU BUGS gives students quick, intelligent, and easy-to-understand assistance whenever they need it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartChatting}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white font-semibold text-sm sm:text-base shadow-glow-cyan hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Chatting with EDU BUGS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSupport}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-navy-900/90 hover:bg-brand-navy-850 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-800 hover:border-brand-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-brand-cyan-400" />
                <span>Explore Student Support</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-mono">24/7</p>
                <p className="text-xs text-slate-400 font-medium">Instant AI Assistance</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-cyan-400 font-mono">100%</p>
                <p className="text-xs text-slate-400 font-medium">Verified College Data</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">0 sec</p>
                <p className="text-xs text-slate-400 font-medium">Wait Time For Answers</p>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic AI Chatbot Interface (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/40 via-brand-blue-600/30 to-slate-800 shadow-2xl shadow-cyan-950/30">
              <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-slate-800/90 flex flex-col">
                
                {/* Chatbot Top Window Bar */}
                <div className="px-4 sm:px-5 py-3.5 bg-brand-navy-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue-600 to-brand-cyan-400 p-0.5 shadow-glow-cyan">
                        <div className="w-full h-full bg-brand-navy-950 rounded-[6px] flex items-center justify-center">
                          <Bot className="w-4 h-4 text-brand-cyan-300" />
                        </div>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-brand-navy-950 rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        EDU BUGS AI
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-brand-blue-600/30 text-brand-cyan-300 border border-brand-cyan-500/30">
                          Active
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">Admissions & Student Companion</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                  
                  {/* Student Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-brand-blue-600 to-indigo-600 text-white px-4 py-2.5 shadow-md">
                      <p className="text-[11px] font-medium text-blue-200 mb-0.5">Student</p>
                      <p className="leading-snug">
                        “I want to apply for Computer Science. What are the eligibility requirements?”
                      </p>
                    </div>
                  </div>

                  {/* EDU BUGS AI Message */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-brand-navy-900 border border-slate-800 text-slate-200 px-4 py-3 shadow-md space-y-3">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-cyan-400" />
                        <span className="text-[11px] font-bold text-brand-cyan-400">EDU BUGS</span>
                        <span className="text-[10px] text-slate-400">• Just now</span>
                      </div>

                      <p className="leading-relaxed">
                        “I can help you with that. Let me guide you through the eligibility requirements, application process, required documents, and important dates.”
                      </p>

                      {/* Interactive Chip Detail if tapped */}
                      {chipDetails && (
                        <div className="p-2.5 rounded-xl bg-brand-navy-950 border border-brand-cyan-500/30 text-xs text-brand-cyan-200 animate-in fade-in duration-200">
                          <p className="font-semibold text-white mb-0.5">📋 Quick Summary:</p>
                          <p>{chipDetails}</p>
                        </div>
                      )}

                      {/* Suggested Actions Chips */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Suggested Actions:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'View Eligibility',
                            'Admission Process',
                            'Required Documents',
                            'Ask Another Question'
                          ].map((chip) => {
                            const isSelected = activeChip === chip;
                            return (
                              <button
                                key={chip}
                                onClick={() => handleChipClick(chip)}
                                className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 font-medium ${
                                  isSelected
                                    ? 'bg-brand-cyan-500 text-brand-navy-950 border-brand-cyan-400 font-bold shadow-glow-cyan'
                                    : 'bg-brand-navy-950 hover:bg-brand-navy-850 text-slate-200 border-slate-700/80 hover:border-brand-cyan-400/50 hover:text-white'
                                }`}
                              >
                                {chip}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Bottom Input Area Bar */}
                <div className="p-3.5 bg-brand-navy-900/90 border-t border-slate-800 flex items-center gap-2">
                  <div 
                    onClick={onStartChatting}
                    className="flex-grow flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 hover:border-brand-cyan-500/50 text-xs text-slate-400 cursor-pointer transition-colors"
                  >
                    <span>Ask admissions, fees, hostel, scholarships...</span>
                    <CornerDownLeft className="w-3.5 h-3.5 text-brand-cyan-400" />
                  </div>
                  <button
                    onClick={onStartChatting}
                    className="p-2.5 rounded-xl bg-brand-cyan-500 hover:bg-brand-cyan-400 text-brand-navy-950 font-bold shadow-glow-cyan transition-all"
                    title="Send query to EDU BUGS"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
