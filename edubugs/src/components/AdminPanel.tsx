import React, { useState } from 'react';
import { 
  Shield, 
  Upload, 
  FileText, 
  Database, 
  Edit3, 
  BarChart3, 
  Users, 
  PhoneForwarded, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  TrendingUp, 
  Plus,
  Trash2,
  Save,
  Check,
  Building2,
  RefreshCw
} from 'lucide-react';
import { COURSES_DATABASE } from '../data/collegeKnowledgeBase';

interface AdminPanelProps {
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToHome }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'knowledge' | 'update' | 'handoff'>('analytics');
  
  // Knowledge docs state
  const [documents, setDocuments] = useState([
    { id: 'DOC-01', name: 'Admissions_Brochure_2026_Final.pdf', size: '4.2 MB', status: 'Indexed', chunks: 142, date: 'May 02, 2026' },
    { id: 'DOC-02', name: 'School_of_Computing_Curriculum_v2.pdf', size: '2.8 MB', status: 'Indexed', chunks: 98, date: 'May 14, 2026' },
    { id: 'DOC-03', name: 'Hostel_Regulations_Dining_Rules.pdf', size: '1.5 MB', status: 'Indexed', chunks: 52, date: 'Jun 01, 2026' },
    { id: 'DOC-04', name: 'Scholarship_Eligibility_Notification_2026.pdf', size: '940 KB', status: 'Indexed', chunks: 36, date: 'Jun 10, 2026' },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Editable Courses state
  const [courses, setCourses] = useState(COURSES_DATABASE);
  const [saveCourseSuccess, setSaveCourseSuccess] = useState<string | null>(null);

  // Human Handoff Tickets Queue
  const [tickets, setTickets] = useState([
    {
      id: 'EB-TK-812049',
      student: 'Maria Santos',
      email: 'm.santos@applicant.com',
      department: 'Admissions & Enrolment Office',
      query: 'I hold a Cambridge A-Level curriculum with predicted A*AA. Can you verify if equivalence certificate is required?',
      time: '18 mins ago',
      status: 'Pending Review',
      urgency: 'Normal'
    },
    {
      id: 'EB-TK-809121',
      student: 'Devan Patel',
      email: 'devan.p@gmail.com',
      department: 'Scholarships & Financial Aid',
      query: 'My father underwent emergency medical surgery last week. Can we apply for emergency need-based fee subsidy?',
      time: '1 hour ago',
      status: 'Officer Assigned',
      urgency: 'Urgent'
    },
    {
      id: 'EB-TK-799440',
      student: 'Sophia Lin',
      email: 'sophia.lin@gmail.com',
      department: 'Hostel & Residence Office',
      query: 'Requesting allocation in Himalaya Hostel AC Double suite with quiet study corridor assignment.',
      time: '3 hours ago',
      status: 'Resolved',
      urgency: 'Normal'
    }
  ]);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setDocuments(prev => [
          {
            id: `DOC-0${prev.length + 1}`,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            status: 'Indexed',
            chunks: Math.floor(25 + Math.random() * 50),
            date: 'Today'
          },
          ...prev
        ]);
        setIsUploading(false);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }, 1200);
    }
  };

  const handleUpdateCourseFee = (id: string, newFee: string) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, annualFee: newFee } : c));
    setSaveCourseSuccess(id);
    setTimeout(() => setSaveCourseSuccess(null), 2000);
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
  };

  return (
    <section id="admin-panel" className="py-20 lg:py-28 relative bg-brand-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>College Administration & Knowledge Console</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Admin & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-brand-cyan-400 to-brand-blue-400">Institutional Governance</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Manage indexed documents, update live admission parameters, monitor query analytics, and oversee human officer handoffs.
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 transition"
          >
            ← Back to Student View
          </button>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 border-b border-slate-800 pb-3 mb-8 overflow-x-auto text-sm">
          {[
            { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
            { id: 'knowledge', label: 'Manage Knowledge (RAG)', icon: Database },
            { id: 'update', label: 'Update Info & Fees', icon: Edit3 },
            { id: 'handoff', label: 'Human Handoff Queue', icon: PhoneForwarded, badge: tickets.filter(t => t.status !== 'Resolved').length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600/30 border border-indigo-400 text-indigo-200 shadow-md'
                    : 'bg-brand-navy-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-brand-navy-950 font-bold text-[10px] flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Analytics Dashboard */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-8">
            
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
                <span className="text-xs font-mono text-slate-400 block uppercase">Total Enquiries</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono">14,892</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +28%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Active admissions cycle 2026</p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
                <span className="text-xs font-mono text-brand-cyan-400 block uppercase">Admission Queries</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-brand-cyan-300 font-mono">68.4%</span>
                  <span className="text-xs text-slate-400">10,186 chats</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Computer Science & AI top interest</p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
                <span className="text-xs font-mono text-emerald-400 block uppercase">AI Resolution Rate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">94.8%</span>
                  <span className="text-xs text-emerald-400">Instant</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Resolved without human escalation</p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
                <span className="text-xs font-mono text-amber-400 block uppercase">Unanswered / Escalated</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-amber-400 font-mono">5.2%</span>
                  <span className="text-xs text-slate-400">774 cases</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Routed to Officer Handoff Queue</p>
              </div>
            </div>

            {/* Most Asked Questions & Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-7 p-6 rounded-3xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
                <h4 className="text-base font-bold text-white mb-4">Most Frequent Student Questions (Live Index)</h4>
                
                <div className="space-y-3">
                  {[
                    { q: 'What is the cutoff rank and eligibility for B.Tech Computer Science?', count: 3240, percent: 84 },
                    { q: 'What scholarships and fee waivers are available for 2026?', count: 2410, percent: 62 },
                    { q: 'What are the hostel room charges and curfew timings?', count: 1890, percent: 49 },
                    { q: 'How do I download my digital student ID or bonafide certificate?', count: 1240, percent: 32 },
                    { q: 'Can I pay annual tuition fees in semester installments?', count: 960, percent: 25 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200 font-medium truncate pr-2">{item.q}</span>
                        <span className="text-slate-400 font-mono flex-shrink-0">{item.count} asks</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-blue-500 to-brand-cyan-400 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-3xl bg-brand-navy-900/80 border border-slate-800 shadow-lg flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-4">Enquiry Distribution by Pillar</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">🎓 Admissions & Eligibility</span>
                      <strong className="text-brand-cyan-400 font-mono">54%</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">💰 Scholarships & Financial Aid</span>
                      <strong className="text-emerald-400 font-mono">18%</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">🏫 Campus & Hostel Life</span>
                      <strong className="text-indigo-400 font-mono">14%</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">🧑🎓 Student Services & Documents</span>
                      <strong className="text-sky-400 font-mono">8%</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">🆘 Personal Advising & Guidance</span>
                      <strong className="text-amber-400 font-mono">6%</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Engine: EDU BUGS RAG v2.4</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Operational
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Manage Knowledge */}
        {activeAdminTab === 'knowledge' && (
          <div className="space-y-6">
            
            {/* Upload Box */}
            <div className="p-8 rounded-3xl bg-brand-navy-900/80 border-2 border-dashed border-slate-750 hover:border-brand-cyan-500/60 transition text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 flex items-center justify-center mx-auto">
                {isUploading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white">Upload Official College Documents to Knowledge Base</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Upload PDFs, brochures, circulars, fee notifications, or FAQ spreadsheets. The system automatically chunks and indexes content into vector memory.
                </p>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white font-semibold text-xs cursor-pointer shadow-glow-cyan transition">
                  <Plus className="w-4 h-4" />
                  <span>Select Document (PDF / DOCX)</span>
                  <input type="file" onChange={handleSimulateUpload} className="hidden" accept=".pdf,.docx,.txt" />
                </label>
              </div>

              {uploadSuccess && (
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Document ingested and 42 vector embeddings generated!</span>
                </div>
              )}
            </div>

            {/* Ingested Documents List */}
            <div className="p-6 rounded-3xl bg-brand-navy-900/80 border border-slate-800 shadow-lg">
              <h4 className="text-base font-bold text-white mb-4">Currently Indexed Institutional Repositories</h4>
              
              <div className="space-y-2.5">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-brand-cyan-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block">{doc.name}</strong>
                        <span className="text-slate-400 text-[11px]">{doc.size} • {doc.chunks} semantic chunks • Added {doc.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Update Info & Fees */}
        {activeAdminTab === 'update' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-navy-900/80 border border-slate-800 shadow-lg space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white">Live Institutional Information Editor</h4>
              <p className="text-xs text-slate-400">Modify course fee structures or quotas in real time. Changes propagate immediately to the AI assistant.</p>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h5 className="text-sm font-bold text-white">{course.name}</h5>
                    <p className="text-xs text-slate-400">{course.department} • {course.duration} • Seats: {course.intakeSeats}</p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono">Fee:</span>
                      <input
                        type="text"
                        value={course.annualFee}
                        onChange={(e) => handleUpdateCourseFee(course.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-brand-navy-950 border border-slate-700 text-brand-cyan-300 text-xs font-mono focus:border-brand-cyan-400 focus:outline-none w-56"
                      />
                    </div>

                    {saveCourseSuccess === course.id && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 rounded-lg">
                        <Check className="w-3 h-3" /> Saved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Human Handoff Queue */}
        {activeAdminTab === 'handoff' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-navy-900/80 border border-slate-800 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-white">Escalated Enquiries & Human Officer Inbox</h4>
                <p className="text-xs text-slate-400">Questions where the AI assistant detected individual complexity or policy ambiguity.</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {tickets.filter(t => t.status !== 'Resolved').length} Active Tickets
              </span>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-cyan-400">{ticket.id}</span>
                      <span className="text-xs text-white font-semibold">• {ticket.student}</span>
                      <span className="text-xs text-slate-400">({ticket.email})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        ticket.urgency === 'Urgent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {ticket.urgency}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        ticket.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{ticket.time}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-navy-950/80 border border-slate-800 text-xs text-slate-200">
                    <p>“{ticket.query}”</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      Routed to: <strong className="text-slate-300">{ticket.department}</strong>
                    </span>

                    {ticket.status !== 'Resolved' && (
                      <button
                        onClick={() => handleResolveTicket(ticket.id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                      >
                        <Check className="w-3 h-3" />
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
