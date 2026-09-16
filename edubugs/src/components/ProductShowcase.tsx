import React, { useState, useRef, useEffect } from 'react';
import { 
  generateAIResponse, 
  streamResponse, 
  SupportCategory, 
  ChatMessage 
} from '../services/aiAssistantService';
import { Volume2, VolumeX, Send, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface ProductShowcaseProps {
  onOpenHandoff: (department?: string, query?: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenHandoff }) => {
  const [activeTab, setActiveTab] = useState<SupportCategory>('admissions');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'demo-1',
      sender: 'ai',
      text: 'Welcome to EDU BUGS. Ask me about program eligibility, tuition fees, scholarships, or campus life.',
      timestamp: 'Now',
      suggestedActions: [
        'What are the eligibility requirements for Computer Science?',
        'What scholarships are available?',
        'Tell me about hostel facilities and rules',
        'How do I apply for Fall 2026?'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const tabs: { id: SupportCategory; label: string; placeholder: string }[] = [
    { id: 'admissions', label: 'Admissions', placeholder: 'Ask about eligibility, application deadlines, fees...' },
    { id: 'academics', label: 'Academics', placeholder: 'Ask about course curriculum, credit hours, departments...' },
    { id: 'scholarships', label: 'Scholarships', placeholder: 'Ask about merit awards, STEM grants, fee waivers...' },
    { id: 'campus', label: 'Campus Life', placeholder: 'Ask about hostels, dining, transit, library hours...' },
    { id: 'services', label: 'Services', placeholder: 'Ask about student ID, bonafide certificates, transcripts...' },
    { id: 'guidance', label: 'Advising', placeholder: 'Ask if you are undecided about which major to choose...' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now',
      category: activeTab
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsStreaming(true);

    const result = generateAIResponse(text, activeTab);
    const aiId = `ai-${Date.now()}`;

    const aiMsg: ChatMessage = {
      id: aiId,
      sender: 'ai',
      text: '',
      timestamp: 'Now',
      suggestedActions: result.suggestedActions,
      needsHumanHandoff: result.needsHumanHandoff,
      handoffDepartment: result.handoffDepartment,
      sources: result.sources,
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMsg]);

    await streamResponse(result.text, (chunk) => {
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, text: chunk } : m));
    }, 12);

    setIsStreaming(false);
    setMessages(prev => prev.map(m => m.id === aiId ? { ...m, isStreaming: false } : m));
  };

  const handleSpeech = (text: string) => {
    if (!window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const clean = text.replace(/[*_#•]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 1.0;
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <section id="showcase" className="py-24 sm:py-32 bg-black border-t border-white/[0.08] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Live Product Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Conversational precision. <br />
            <span className="text-[#86868b]">Across every department.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal tracking-tight mt-4">
            Select a domain to test how EDU BUGS resolves student questions using verified institutional knowledge.
          </p>
        </div>

        {/* Minimal Domain Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 tracking-tight whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-black'
                    : 'bg-[#161617] text-[#86868b] border border-white/[0.08] hover:text-white hover:border-white/[0.2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Frame */}
        <div className="rounded-[24px] bg-[#161617] border border-white/[0.08] overflow-hidden">
          
          {/* Top Header Bar */}
          <div className="px-6 py-4 border-b border-white/[0.06] bg-[#1d1d1f]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="text-xs sm:text-sm font-medium text-white tracking-tight">
                EDU BUGS AI — {tabs.find(t => t.id === activeTab)?.label}
              </span>
            </div>
            <span className="text-xs text-[#86868b] font-mono">
              Institutional Verified
            </span>
          </div>

          {/* Conversation Thread */}
          <div className="p-6 sm:p-8 space-y-6 min-h-[340px] max-h-[480px] overflow-y-auto">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                    <div
                      className={`px-5 py-3.5 rounded-[18px] text-sm sm:text-base leading-relaxed tracking-tight ${
                        isAi
                          ? 'bg-[#1d1d1f] text-[#f5f5f7] border border-white/[0.06]'
                          : 'bg-white text-black font-medium'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {msg.text}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-pulse align-middle" />
                        )}
                      </div>

                      {/* Source Citation */}
                      {isAi && msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                        <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] text-[#86868b]">
                          Source: {msg.sources.join(' • ')}
                        </div>
                      )}
                    </div>

                    {/* Human Handoff Alert */}
                    {isAi && msg.needsHumanHandoff && (
                      <div className="p-4 rounded-[16px] bg-[#1d1d1f] border border-white/[0.14] text-xs text-[#f5f5f7] space-y-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-white" />
                          <span className="font-medium">Smart Human Handoff Recommended</span>
                        </div>
                        <p className="text-[#86868b]">
                          This specific enquiry requires human verification. Would you like to connect directly with the college support team?
                        </p>
                        <button
                          onClick={() => onOpenHandoff(msg.handoffDepartment, msg.text)}
                          className="apple-pill-btn apple-pill-primary text-xs py-1.5 px-4"
                        >
                          Connect with Support Officer
                        </button>
                      </div>
                    )}

                    {/* Suggested Chips */}
                    {isAi && msg.suggestedActions && msg.suggestedActions.length > 0 && !msg.isStreaming && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            className="text-xs px-3 py-1.5 rounded-full bg-[#1d1d1f] border border-white/[0.08] text-[#86868b] hover:text-white hover:border-white/[0.2] transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Audio read-aloud button */}
                    {isAi && !msg.isStreaming && (
                      <div className="flex items-center gap-2 text-[11px] text-[#86868b] px-1">
                        <button
                          onClick={() => handleSpeech(msg.text)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3 text-white" /> : <Volume2 className="w-3 h-3" />}
                          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Minimal Input Bar */}
          <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-[#161617]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
                className="flex-1 px-4 py-3 rounded-full bg-[#1d1d1f] border border-white/[0.08] text-[#f5f5f7] text-sm focus:border-white/[0.3] focus:outline-none placeholder:text-[#86868b]"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isStreaming}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
