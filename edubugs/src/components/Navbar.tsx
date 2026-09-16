import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, Sparkles, User, Shield, ChevronRight } from 'lucide-react';

export type NavSection = 'home' | 'about' | 'assistant' | 'features' | 'support' | 'how-it-works' | 'faq' | 'hub' | 'admin';

interface NavbarProps {
  activeSection: string;
  onNavigateSection: (section: string) => void;
  onOpenHub: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateSection,
  onOpenHub,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'features', label: 'Features' },
    { id: 'support', label: 'Student Support' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleItemClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40 py-2.5'
          : 'bg-brand-navy-950/40 backdrop-blur-md border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Left */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 group focus:outline-none text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue-600 via-indigo-600 to-brand-cyan-400 p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-brand-navy-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  EDU <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 to-brand-blue-400">BUGS</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-brand-cyan-400 animate-pulse" />
              </div>
              <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 -mt-1 hidden sm:block">
                AI Student Support
              </p>
            </div>
          </button>

          {/* Desktop Navigation Center */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-brand-cyan-300 bg-brand-blue-600/15 border border-brand-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Portals Switcher */}
            <button
              onClick={onOpenHub}
              title="Open Student Support Hub"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-brand-cyan-400" />
              <span>Student Hub</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="Open College Admin Console"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin</span>
            </button>

            {/* Launch AI Assistant CTA Button */}
            <button
              onClick={() => handleItemClick('assistant')}
              className="relative group px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-glow-cyan hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Assistant</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleItemClick('assistant')}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white text-xs font-semibold"
            >
              Ask AI
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-brand-navy-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-brand-cyan-400 bg-brand-navy-900 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-brand-navy-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenHub();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-brand-navy-900 border border-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-brand-cyan-400" />
                <span>Student Hub</span>
              </button>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-brand-navy-900 border border-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Console</span>
              </button>
            </div>

            <button
              onClick={() => handleItemClick('assistant')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white text-sm font-semibold shadow-glow-cyan flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch AI Assistant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
