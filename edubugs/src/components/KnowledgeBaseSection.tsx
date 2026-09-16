import React from 'react';
import { 
  Database, 
  FileText, 
  Cpu, 
  CheckCircle, 
  ArrowDown, 
  Layers, 
  ShieldCheck, 
  Server, 
  Zap, 
  Bot,
  Sparkles
} from 'lucide-react';

export const KnowledgeBaseSection: React.FC = () => {
  const sources = [
    { title: 'Admission Brochures', desc: 'Prospectus, seat matrices, and cutoff history' },
    { title: 'Course Catalogs', desc: 'Curriculum, credits, prerequisites & syllabus' },
    { title: 'Official Circulars', desc: 'Registrar notifications, exam schedules & notices' },
    { title: 'Fee Structures', desc: 'Tuition rates, lab levies, hostel & refund rules' },
    { title: 'Scholarship Rules', desc: 'Merit matrices, donor funds, and state schemes' },
    { title: 'Student Service Guides', desc: 'Bonafide procedures, ID issuance & transcripts' }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>Enterprise Knowledge Ingestion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 via-brand-blue-400 to-indigo-300">Trusted College Information</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            EDU BUGS bridges raw university documentation with conversational intelligence — ensuring every answer is authentic, timely, and citation-backed.
          </p>
        </div>

        {/* Ingestion Sources Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {sources.map((src, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-brand-navy-900/60 border border-slate-800 hover:border-brand-cyan-500/40 transition-colors group text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-950 mx-auto flex items-center justify-center text-brand-cyan-400 group-hover:scale-110 transition-transform mb-2.5">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-brand-cyan-300 transition-colors">{src.title}</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{src.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical Architecture Flow Diagram */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/30 via-brand-blue-600/20 to-slate-800/40 shadow-2xl">
          <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-slate-800">
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-slate-800/80 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand-cyan-400 uppercase tracking-wider block">
                  System Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  RAG & Knowledge Retrieval Architecture
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No Unverified Hallucinations
                </span>
              </div>
            </div>

            {/* Architecture Node Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              
              {/* Node 1: Ingestion */}
              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-slate-800 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase">Input Layer</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">College Documents & Database</h4>
                  <p className="text-xs text-slate-400 mt-1">Brochures, PDFs, ERP SQL dumps, and notices.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                  Sync: Real-time Webhook
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex items-center justify-center text-brand-cyan-400">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Node 2: Knowledge Base Vectorization */}
              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-brand-cyan-500/30 shadow-glow-cyan flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-brand-cyan-500/30 text-brand-cyan-400 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-brand-cyan-400 uppercase">Retrieval Index</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">EDU BUGS Knowledge Base</h4>
                  <p className="text-xs text-slate-400 mt-1">Chunked semantic vectors, taxonomies, and policy graph.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-brand-cyan-300 font-mono">
                  Index: HNSW Vector Graph
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex items-center justify-center text-brand-cyan-400">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
                </div>
              </div>

              {/* Node 3: AI Inference & Personalized Response */}
              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-indigo-500/30 shadow-glow-blue flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-3">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-indigo-400 uppercase">Output Layer</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Personalized Answer</h4>
                  <p className="text-xs text-slate-400 mt-1">Contextualized answer with verified citations & human escalation.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-indigo-300 font-mono">
                  Latency: &lt; 250ms
                </div>
              </div>

            </div>

            {/* Architecture Details Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Encrypted at rest & in transit (AES-256)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-cyan-400" />
                <span>Automatic versioning on circular updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Integrated Smart Human Handoff Dispatch</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
