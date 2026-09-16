import React, { useState, useRef, useEffect } from 'react';
import { 
  generateAIResponse, 
  streamResponse, 
  SupportCategory, 
  ChatMessage 
} from '../services/aiAssistantService';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AssistantPageProps {
  onOpenHandoff: (department?: string, query?: string) => void;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({ onOpenHandoff }) => {
  const [selectedCat, setSelectedCat] = useState<SupportCategory>('all');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Welcome to the EDU BUGS AI Studio. I am your 24/7 institutional guide. You can ask about programs, eligibility cutoffs, fees, scholarships, hostels, or student documents.',
      timestamp: 'Now',
      suggestedActions: [
        'What are the eligibility requirements for Computer Science?',
        'What scholarships are available for 2026?',
        'What are the annual tuition and hostel fees?',
        'How do I request an official Bonafide Certificate?'
      ],
      sources: ['Official College Regulations 2026']
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Web Speech API
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.onresult = (e: any) => {
        setInputVal(e.results[0][0].transcript);
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSpeech = (id: string, text: string) => {
    if (!window.speechSynthesis) return;
    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#•]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 1.0;
    u.onend = () => setIsSpeakingId(null);
    u.onerror = () => setIsSpeakingId(null);
    setIsSpeakingId(id);
    window.speechSynthesis.speak(u);
  };

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now',
      category: selectedCat
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsStreaming(true);

    const result = generateAIResponse(text, selectedCat);
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

  const categories: { id: SupportCategory; label: string }[] = [
    { id: 'all', label: 'All Topics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'academics', label: 'Academics' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'services', label: 'Student Services' },
    { id: 'guidance', label: 'Guidance' },
  ];

  const quickPrompts: Record<SupportCategory, string[]> = {
    all: ['What are the eligibility requirements for Computer Science?', 'What scholarships are available?', 'Tell me about hostel facilities'],
    admissions: ['How do I apply for Fall 2026?', 'What documents are required for application?', 'What are the application deadlines?'],
    academics: ['What subjects are taught in AI & Data Science?', 'How does the credit system work?', 'How do I contact the School of Computing Dean?'],
    scholarships: ['Tell me about the Chancellor’s Merit Scholarship', 'What is the Women in STEM grant?', 'What income proof is needed?'],
    campus: ['What are the hostel room amenities and curfew?', 'Tell me about bus transit routes', 'What are the Central Library hours?'],
    services: ['How do I download my digital student ID?', 'How can I request an official Bonafide Certificate?', 'Where is Student Affairs?'],
    guidance: ['I don’t know which course to choose. Can you advise me?', 'I am confused about the application procedure', 'Speak to a mentor'],
  };

  const handleExport = () => {
    const transcript = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EDU-BUGS-Chat-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            AI Assistant Workspace
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-[#f5f5f7]">
            Meet EDU BUGS AI.
          </h1>
          <p className="text-sm sm:text-base text-[#86868b] font-normal tracking-tight mt-2 max-w-xl">
            Your dedicated college admission, academic, and student support companion. Grounded strictly in verified institutional knowledge.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 tracking-tight whitespace-nowrap ${
                selectedCat === cat.id
                  ? 'bg-white text-black'
                  : 'bg-[#161617] text-[#86868b] border border-white/[0.08] hover:text-white hover:border-white/[0.2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Conversation Studio Frame */}
        <div className="rounded-[28px] bg-[#161617] border border-white/[0.08] overflow-hidden flex flex-col h-[680px]">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] bg-[#1d1d1f]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-white tracking-tight">
                EDU BUGS AI • {categories.find(c => c.id === selectedCat)?.label}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                title="Export Transcript"
                className="p-1.5 text-[#86868b] hover:text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMessages([messages[0]])}
                title="Clear Chat"
                className="p-1.5 text-[#86868b] hover:text-white rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Feed */}
          <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                  <div className="max-w-[88%] sm:max-w-[78%] space-y-2.5">
                    
                    <div
                      className={`px-5 py-4 rounded-[20px] text-sm sm:text-base leading-relaxed tracking-tight ${
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

                      {isAi && msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                        <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] text-[#86868b]">
                          Verified: {msg.sources.join(' • ')}
                        </div>
                      )}
                    </div>

                    {/* Smart Human Handoff Banner */}
                    {isAi && msg.needsHumanHandoff && (
                      <div className="p-4 rounded-[18px] bg-[#1d1d1f] border border-white/[0.14] text-xs text-[#f5f5f7] space-y-3 animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-white" />
                          <span className="font-semibold">Smart Human Handoff Recommended</span>
                        </div>
                        <p className="text-[#86868b]">
                          “I'm not completely sure about this information. Would you like me to connect you with the appropriate college support team?”
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onOpenHandoff(msg.handoffDepartment, msg.text)}
                            className="apple-pill-btn apple-pill-primary text-xs py-1.5 px-4"
                          >
                            Contact Support Officer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Suggested Chips */}
                    {isAi && msg.suggestedActions && msg.suggestedActions.length > 0 && !msg.isStreaming && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            className="text-xs px-3.5 py-1.5 rounded-full bg-[#1d1d1f] border border-white/[0.08] text-[#86868b] hover:text-white hover:border-white/[0.2] transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Utilities: Audio & Copy */}
                    {isAi && !msg.isStreaming && (
                      <div className="flex items-center gap-3 text-[11px] text-[#86868b] px-1">
                        <button
                          onClick={() => handleSpeech(msg.id, msg.text)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {isSpeakingId === msg.id ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isSpeakingId === msg.id ? 'Stop' : 'Listen'}</span>
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-6 py-2.5 border-t border-white/[0.06] bg-[#161617] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-[#86868b] whitespace-nowrap">Suggested:</span>
            {quickPrompts[selectedCat].map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-xs px-3 py-1 rounded-full bg-[#1d1d1f] border border-white/[0.06] text-[#86868b] hover:text-white whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-[#161617]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={toggleMic}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-[#1d1d1f] border-white/[0.08] text-[#86868b] hover:text-white'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={isListening ? 'Listening... Speak now.' : 'Ask EDU BUGS anything...'}
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
    </div>
  );
};
