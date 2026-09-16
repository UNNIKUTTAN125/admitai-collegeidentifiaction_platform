import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Trash2, 
  Download, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Sparkles, 
  User, 
  AlertCircle, 
  RefreshCw, 
  Volume2, 
  VolumeX,
  Building2,
  GraduationCap,
  BookOpen,
  DollarSign,
  Compass,
  LifeBuoy,
  PhoneForwarded,
  CheckCircle2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { 
  ChatMessage, 
  SupportCategory, 
  generateAIResponse, 
  streamResponse 
} from '../services/aiAssistantService';

interface AIChatbotProps {
  onOpenHandoff: (department?: string, query?: string) => void;
  externalCategoryTrigger?: SupportCategory;
  preloadedPrompt?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  onOpenHandoff,
  externalCategoryTrigger,
  preloadedPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! 👋 I'm **EDU BUGS**, your intelligent college admission, academic, and student support companion.\n\nWhether you need help exploring degree programs, checking eligibility cutoffs, discovering scholarships, inspecting campus facilities, or obtaining student services, I'm here 24/7 with verified institutional answers.\n\nHow can I help your college journey today?`,
      timestamp: 'Just now',
      suggestedActions: [
        'How do I apply for admissions?',
        'What are the eligibility requirements for Computer Science?',
        'What scholarships are available?',
        'Tell me about hostel & dining facilities'
      ],
      sources: ['EDU BUGS Knowledge Base v2.4']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync external category trigger if provided
  useEffect(() => {
    if (externalCategoryTrigger) {
      setSelectedCategory(externalCategoryTrigger);
    }
  }, [externalCategoryTrigger]);

  // Handle preloaded prompt trigger
  useEffect(() => {
    if (preloadedPrompt) {
      setInputQuery(preloadedPrompt);
    }
  }, [preloadedPrompt]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize Web Speech API for voice input if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!window.speechSynthesis) return;

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    
    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: selectedCategory
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Generate response from knowledge engine
    const aiResult = generateAIResponse(query, selectedCategory);

    // Create temporary streaming AI message
    const aiMessageId = `ai-${Date.now()}`;
    const initialAiMessage: ChatMessage = {
      id: aiMessageId,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: aiResult.suggestedActions,
      needsHumanHandoff: aiResult.needsHumanHandoff,
      handoffDepartment: aiResult.handoffDepartment,
      sources: aiResult.sources,
      isStreaming: true
    };

    setMessages(prev => [...prev, initialAiMessage]);

    // Realistic streaming cadence
    await streamResponse(aiResult.text, (streamed) => {
      setMessages(prev => 
        prev.map(m => m.id === aiMessageId ? { ...m, text: streamed } : m)
      );
    }, 14);

    setIsTyping(false);
    setMessages(prev => 
      prev.map(m => m.id === aiMessageId ? { ...m, isStreaming: false } : m)
    );
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation history?')) {
      window.speechSynthesis?.cancel();
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          text: `Chat cleared! How can I assist you with admissions, academics, or student services?`,
          timestamp: 'Just now',
          suggestedActions: [
            'How do I apply for admissions?',
            'What scholarships are available?',
            'Check fee structure',
            'I need guidance choosing a program'
          ]
        }
      ]);
    }
  };

  const handleExportChat = () => {
    const transcript = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EDU-BUGS-Chat-Transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackGiven(prev => ({ ...prev, [id]: type }));
  };

  // Category Configuration
  const categories: { id: SupportCategory; label: string; icon: any; count: string }[] = [
    { id: 'all', label: 'All Queries', icon: Compass, count: '6 Topics' },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap, count: 'Courses & Fees' },
    { id: 'academics', label: 'Academic Support', icon: BookOpen, count: 'Curriculum & Exams' },
    { id: 'scholarships', label: 'Scholarships & Aid', icon: DollarSign, count: 'Merit & Sports' },
    { id: 'campus', label: 'Campus & Hostels', icon: Building2, count: 'Labs, Gym & Mess' },
    { id: 'services', label: 'Student Services', icon: HelpCircle, count: 'IDs & Bonafides' },
    { id: 'guidance', label: 'Help & Guidance', icon: LifeBuoy, count: 'Career & Advising' },
  ];

  // Quick Prompt Suggestions mapped to selected category
  const categoryQuickPrompts: Record<SupportCategory, string[]> = {
    all: [
      'What are the eligibility requirements for Computer Science?',
      'How much is the annual tuition fee?',
      'What scholarships are available for 2026?',
      'What is the last date to apply?'
    ],
    admissions: [
      'How do I apply for B.Tech CSE?',
      'What documents are required for application?',
      'What are the important admission dates?',
      'Tell me about the BCA course eligibility'
    ],
    academics: [
      'What subjects are taught in AI & Data Science?',
      'How does the semester grading system work?',
      'How do I contact the School of Computing Dean?',
      'What research lab equipment is available?'
    ],
    scholarships: [
      'Tell me about the Chancellor’s Merit Scholarship',
      'What is the Women in STEM grant?',
      'Are there need-based tuition fee waivers?',
      'What documents do I need for financial aid?'
    ],
    campus: [
      'What are the hostel rules and curfew timings?',
      'Tell me about the campus bus transit routes',
      'What are the Central Library hours?',
      'What sports facilities are open to freshmen?'
    ],
    services: [
      'How do I get my digital student ID card?',
      'How can I request an official Bonafide Certificate?',
      'Where is the Student Affairs help desk located?',
      'How do I apply for an official transcript?'
    ],
    guidance: [
      'I don’t know which course to choose. Can you guide me?',
      'I am confused about the application procedure',
      'Can I switch my branch after first year?',
      'Who should I talk to for personal counseling?'
    ]
  };

  return (
    <section id="ai-assistant" className="relative py-20 lg:py-28 bg-brand-navy-950/70">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive AI Core</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">EDU BUGS AI</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            More than an admission chatbot — your intelligent student support companion.
          </p>
        </div>

        {/* Category Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 text-white border-brand-cyan-400 shadow-glow-cyan'
                    : 'bg-brand-navy-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-brand-cyan-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chatbot Window Main Container */}
        <div className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/30 via-brand-blue-600/20 to-slate-800/40 shadow-2xl">
          <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[740px] sm:h-[780px]">
            
            {/* Chatbot Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-800/90 bg-brand-navy-900/70 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-blue-600 via-brand-cyan-500 to-indigo-500 p-[1.5px] shadow-glow-cyan">
                    <div className="w-full h-full bg-brand-navy-950 rounded-[14px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-brand-cyan-300" />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-brand-navy-950 rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-wide">EDU BUGS AI Assistant</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-blue-500/20 text-brand-cyan-300 border border-brand-blue-400/30">
                      RAG Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Connected to Verified College Knowledge Base</span>
                  </p>
                </div>
              </div>

              {/* Chat Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleExportChat}
                  title="Export Chat Transcript"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClearChat}
                  title="Clear Conversation"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 sm:gap-3.5 ${
                      isAi ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Avatar for AI */}
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-blue-600 to-brand-cyan-400 p-[1px] flex-shrink-0 mt-0.5">
                        <div className="w-full h-full bg-brand-navy-950 rounded-[11px] flex items-center justify-center">
                          <Bot className="w-4 h-4 text-brand-cyan-300" />
                        </div>
                      </div>
                    )}

                    {/* Message Body */}
                    <div className={`max-w-[88%] sm:max-w-[80%] space-y-2.5 ${!isAi ? 'items-end' : ''}`}>
                      
                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl px-4 sm:px-5 py-3.5 text-sm sm:text-[15px] leading-relaxed shadow-sm ${
                          isAi
                            ? 'bg-brand-slate-850/80 border border-slate-700/70 text-slate-100 rounded-tl-sm'
                            : 'bg-brand-blue-600 text-white rounded-tr-sm'
                        }`}
                      >
                        <div className="whitespace-pre-line break-words font-normal">
                          {msg.text}
                          {msg.isStreaming && (
                            <span className="inline-block w-2 h-4 ml-1 bg-brand-cyan-400 animate-pulse align-middle" />
                          )}
                        </div>

                        {/* Verified Sources Pill for AI */}
                        {isAi && msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="font-semibold text-brand-cyan-400">Verified Source:</span>
                            <span>{msg.sources.join(' • ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Smart Human Handoff Banner (if flagged) */}
                      {isAi && msg.needsHumanHandoff && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3 animate-in fade-in duration-300">
                          <div className="flex items-start gap-2.5">
                            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-white">Smart Human Handoff Recommended</p>
                              <p className="text-xs text-amber-200/90 mt-0.5">
                                “I'm not completely sure about this information. Would you like me to connect you with the appropriate college support team?”
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              onClick={() => onOpenHandoff(msg.handoffDepartment, msg.text)}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-brand-navy-950 shadow-md transition"
                            >
                              <PhoneForwarded className="w-3.5 h-3.5" />
                              Contact Support Officer
                            </button>
                            <button
                              onClick={() => handleSendMessage('Tell me what general information is available in your database instead.')}
                              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                            >
                              Continue Asking AI
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Suggested Action Chips */}
                      {isAi && msg.suggestedActions && msg.suggestedActions.length > 0 && !msg.isStreaming && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.suggestedActions.map((action) => (
                            <button
                              key={action}
                              onClick={() => handleSendMessage(action)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-brand-blue-600/20 border border-slate-700 hover:border-brand-cyan-400 text-slate-300 hover:text-brand-cyan-300 transition"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* AI Utilities: Audio Read-Aloud, Copy, Feedback */}
                      {isAi && !msg.isStreaming && (
                        <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                          <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>

                          <button
                            onClick={() => handleSpeakText(msg.id, msg.text)}
                            title={isSpeaking === msg.id ? 'Stop Speaking' : 'Read aloud with AI Voice'}
                            className="flex items-center gap-1 hover:text-brand-cyan-400 transition"
                          >
                            {isSpeaking === msg.id ? (
                              <VolumeX className="w-3.5 h-3.5 text-brand-cyan-400 animate-pulse" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">{isSpeaking === msg.id ? 'Stop' : 'Listen'}</span>
                          </button>

                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            title="Copy response text"
                            className="flex items-center gap-1 hover:text-white transition"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          <div className="flex items-center gap-1 border-l border-slate-750 pl-2">
                            <button
                              onClick={() => handleFeedback(msg.id, 'up')}
                              className={`p-1 hover:text-emerald-400 transition ${feedbackGiven[msg.id] === 'up' ? 'text-emerald-400' : ''}`}
                              title="Helpful response"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, 'down')}
                              className={`p-1 hover:text-rose-400 transition ${feedbackGiven[msg.id] === 'down' ? 'text-rose-400' : ''}`}
                              title="Needs improvement"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Timestamp for User message */}
                      {!isAi && (
                        <div className="text-right">
                          <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>
                      )}

                    </div>

                    {/* Avatar for User */}
                    {!isAi && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-300">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && !messages.some(m => m.isStreaming) && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-navy-900 border border-slate-800 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand-cyan-400 animate-spin-slow" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-brand-slate-850/80 border border-slate-700/60 rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-slate-400 font-medium ml-2">Searching College Knowledge Base...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Category Quick Prompts Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-brand-navy-900/40 border-t border-slate-800/80">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-brand-cyan-400" />
                  Quick Ask:
                </span>
                {categoryQuickPrompts[selectedCategory].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-brand-blue-600/20 border border-slate-750 text-slate-300 hover:text-white whitespace-nowrap transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-800 bg-brand-navy-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 sm:gap-3"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title={isListening ? 'Stop listening' : 'Voice Input (Dictate question)'}
                  className={`p-2.5 rounded-xl border transition ${
                    isListening
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse shadow-glow-rose'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Input Text Box */}
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    isListening
                      ? 'Listening to your voice... Speak now.'
                      : `Ask EDU BUGS about ${selectedCategory === 'all' ? 'admissions, fees, courses, hostel' : selectedCategory}...`
                  }
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm sm:text-base focus:border-brand-cyan-400 focus:ring-1 focus:ring-brand-cyan-400/40 focus:outline-none placeholder:text-slate-400"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white shadow-glow-blue transition disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>

              {/* Input Footer status note */}
              <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan-400" />
                  <span>Confidential Student Assistance • Human Handoff Protected</span>
                </span>
                <span className="hidden sm:inline">Press Enter to Send</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
