import React from 'react';
import { Bot, Mail, Phone, MapPin, Heart, Sparkles, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenPrivacy,
  onOpenContact
}) => {
  return (
    <footer className="bg-brand-navy-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue-600 via-indigo-600 to-brand-cyan-400 p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-brand-navy-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  EDU <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 to-brand-blue-400">BUGS</span>
                </span>
                <span className="inline-block w-2 h-2 ml-1.5 rounded-full bg-brand-cyan-400" />
              </div>
            </div>

            <p className="text-white font-medium text-sm">
              “Your AI Guide for Admissions, Academics & Student Support.”
            </p>
            
            <p className="text-xs text-brand-cyan-400/90 font-semibold tracking-wide">
              “Ask. Learn. Solve. Succeed.”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An intelligent AI-powered student assistance platform designed to help prospective and enrolled students with college admissions, academic guidance, campus services, and empathetic support.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Systems Operational • 24/7
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('home')} className="hover:text-brand-cyan-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-brand-cyan-400 transition">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('assistant')} className="hover:text-brand-cyan-400 transition">
                  AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('features')} className="hover:text-brand-cyan-400 transition">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('support')} className="hover:text-brand-cyan-400 transition">
                  Student Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('how-it-works')} className="hover:text-brand-cyan-400 transition">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-brand-cyan-400 transition">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Support Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  🎓 College Admissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  📚 Academic Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  💰 Scholarships & Financial Aid
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  🏫 Campus Life & Hostels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  🧑‍🎓 Student Services & ID
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('categories')} className="hover:text-brand-cyan-400 transition">
                  🆘 Help & Guidance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Department escalation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contact & Officers
            </h4>
            <p className="text-xs text-slate-400">
              Need to escalate an enquiry to a human admissions officer?
            </p>
            <button
              onClick={onOpenContact}
              className="w-full py-2 px-3 rounded-xl bg-brand-navy-900 border border-slate-700 hover:border-brand-cyan-400 text-xs font-medium text-slate-200 hover:text-white transition flex items-center justify-between"
            >
              <span>Contact Admissions</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan-400" />
            </button>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>📍 Campus Main Gate, Tower 1</p>
              <p>📞 +1 (800) 555-BUGS (2847)</p>
              <p>✉️ support@edubugs.edu</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © 2026 EDU BUGS. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition"
            >
              Terms of Service
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition"
            >
              Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
