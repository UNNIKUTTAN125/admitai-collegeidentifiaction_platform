import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Bell, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Building2, 
  PhoneCall, 
  Sparkles, 
  Upload, 
  FileCheck, 
  Check, 
  CreditCard, 
  ChevronRight, 
  ChevronLeft, 
  Printer, 
  Home, 
  Utensils,
  QrCode,
  Copy,
  CheckCheck,
  Smartphone,
  RefreshCw,
  Download,
  AlertCircle
} from 'lucide-react';
import { IMPORTANT_DATES } from '../data/collegeKnowledgeBase';
import confetti from 'canvas-confetti';
import { AdmissionOfferModal } from './AdmissionOfferModal';
import { PaymentReceiptModal } from './PaymentReceiptModal';

interface StudentDashboardProps {
  onAskAI: (prompt?: string) => void;
  onOpenHandoff: () => void;
  onNavigateCourses: () => void;
  onNavigateScholarships: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onAskAI,
  onOpenHandoff,
  onNavigateCourses,
  onNavigateScholarships
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'announcements'>('overview');
  const [showOfferModal, setShowOfferModal] = useState(false);
  
  // Interactive Milestone Tracker State (Stages 1 to 4)
  const [selectedStage, setSelectedStage] = useState<number>(3);
  const [seatConfirmed, setSeatConfirmed] = useState(false);
  const [feePaid, setFeePaid] = useState(false);
  const [paymentReceiptId, setPaymentReceiptId] = useState<string | null>(null);
  
  // Stage 1 Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [studentEmail, setStudentEmail] = useState('alex.rivera@student.edu');
  const [studentPhone, setStudentPhone] = useState('+1 (555) 349-8821');

  // Stage 2 Documents State
  const [documentsList, setDocumentsList] = useState([
    { id: 'D1', name: '10th Secondary School Certificate', score: '96.4%', verified: true, date: 'May 12, 2026' },
    { id: 'D2', name: '12th Senior Secondary Marksheet', score: 'Physics 95, Math 98, Chem 92', verified: true, date: 'May 14, 2026' },
    { id: 'D3', name: 'National/State Entrance Scorecard (EB-AST)', score: 'Rank #142 (94.2 Percentile)', verified: true, date: 'May 18, 2026' },
    { id: 'D4', name: 'Government Photo ID (National Card)', score: 'Verified Identity', verified: true, date: 'May 12, 2026' },
  ]);

  // Stage 4 Hostel & Fee Choices
  const [hostelChoice, setHostelChoice] = useState<'Nilgiri Boys (North Quad)' | 'Himalaya Girls (North Quad)'>('Nilgiri Boys (North Quad)');
  const [roomTier, setRoomTier] = useState<'AC Double Suite ($1,800/yr)' | 'Non-AC Triple Deluxe ($1,200/yr)'>('AC Double Suite ($1,800/yr)');
  const [mealPlan, setMealPlan] = useState<'Full Board (4 Meals + Snacks)' | 'Standard Board (3 Meals)'>('Full Board (4 Meals + Snacks)');

  // Student Enquiries state
  const [enquiries] = useState([
    {
      id: 'ENQ-901',
      question: 'What are the eligibility requirements for Computer Science & Engineering?',
      timestamp: 'Today at 10:42 AM',
      category: 'Admissions',
      status: 'Answered by AI',
      statusColor: 'emerald'
    },
    {
      id: 'ENQ-889',
      question: 'Does the Chancellor’s Merit Scholarship cover hostel accommodation fees?',
      timestamp: 'Yesterday at 3:15 PM',
      category: 'Scholarships',
      status: 'Escalated to Officer',
      statusColor: 'amber'
    },
    {
      id: 'ENQ-852',
      question: 'Where can I collect my RFID digital campus access card?',
      timestamp: 'Sep 12, 2026',
      category: 'Student Services',
      status: 'Resolved',
      statusColor: 'blue'
    }
  ]);

  const celebrateAdmission = () => {
    setShowOfferModal(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleConfirmSeat = () => {
    setSeatConfirmed(true);
    setSelectedStage(4);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.4 }
    });
  };

  const handleSimulatePayment = () => {
    const rId = `PAY-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setPaymentReceiptId(rId);
    setFeePaid(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  const handleUploadExtraDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentsList(prev => [
        ...prev,
        {
          id: `D${prev.length + 1}`,
          name: file.name,
          score: 'Uploaded & Digitally Verified',
          verified: true,
          date: 'Just now'
        }
      ]);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  // Calculate overall progress percentage
  const getProgressPercentage = () => {
    let completedCount = 2; // Stage 1 & 2 are completed
    if (seatConfirmed) completedCount += 1;
    if (feePaid) completedCount += 1;
    return completedCount === 4 ? 100 : completedCount === 3 ? 75 : 50;
  };

  const getStageStatus = (stageNum: number) => {
    if (stageNum === 1 || stageNum === 2) return 'done';
    if (stageNum === 3) return seatConfirmed ? 'done' : 'current';
    if (stageNum === 4) return feePaid ? 'done' : (seatConfirmed ? 'current' : 'pending');
    return 'pending';
  };

  return (
    <section id="student-hub" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/20 border border-brand-cyan-500/30 text-brand-cyan-400 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Support Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-400 to-brand-blue-400">Student Hub</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Interactive milestone tracker, profile management, live admissions milestones, and query logs.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAskAI()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white text-xs font-semibold shadow-glow-cyan transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI
            </button>
            <button
              onClick={onOpenHandoff}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-cyan-400 text-slate-200 text-xs font-semibold transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-cyan-400" />
              Contact College
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-8 text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 font-semibold transition relative ${
              activeTab === 'overview'
                ? 'text-brand-cyan-400 border-b-2 border-brand-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hub Overview
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-2 px-1 font-semibold transition relative flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'text-brand-cyan-400 border-b-2 border-brand-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>My Enquiries</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-blue-600/30 text-brand-cyan-300 font-mono">
              {enquiries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`pb-2 px-1 font-semibold transition relative ${
              activeTab === 'announcements'
                ? 'text-brand-cyan-400 border-b-2 border-brand-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Notices & Deadlines
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top Grid: Profile Card + Admission Status Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-4 rounded-3xl p-[1px] bg-gradient-to-b from-brand-cyan-400/20 to-slate-800/60 shadow-xl">
                <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-brand-cyan-400 font-semibold uppercase tracking-wider">
                        My Student Profile
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Verified Applicant
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-blue-600 via-brand-cyan-500 to-indigo-500 p-0.5 shadow-md">
                        <div className="w-full h-full bg-brand-navy-950 rounded-[14px] flex items-center justify-center text-white font-bold text-lg">
                          AR
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{studentName}</h3>
                        <p className="text-xs text-slate-400 font-mono">App ID: EB-2026-CS8891</p>
                        <p className="text-xs text-brand-cyan-400 font-medium">Cohort: Fall 2026</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs border-t border-slate-800/80 pt-4">
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Preferred Course:</span>
                        <strong className="text-white">B.Tech in Computer Science & AI</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Department:</span>
                        <span className="text-slate-200">School of Computing & AI</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Admission Status:</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {seatConfirmed ? 'Seat Confirmed & Enrolled' : 'Provisionally Admitted'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Merit Category:</span>
                        <span className="text-brand-cyan-300">Merit List #142 (EB-AST: 94.2%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/80 flex gap-2">
                    <button
                      onClick={celebrateAdmission}
                      className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition text-center"
                    >
                      🎉 View Offer Letter
                    </button>
                    <button
                      onClick={() => onAskAI('What are the next steps after provisional admission?')}
                      className="py-2 px-3 text-xs font-semibold rounded-xl bg-brand-blue-600/30 hover:bg-brand-blue-600/50 border border-brand-blue-500/50 text-brand-cyan-300 transition"
                    >
                      Next Steps
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Milestone Progress Tracker Across All Stages */}
              <div className="lg:col-span-8 rounded-3xl p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-900/80 shadow-xl">
                <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between">
                  <div>
                    {/* Header with Live Progress Indicator */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-brand-cyan-400 font-semibold uppercase tracking-wider">
                            Interactive Milestone Tracker
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                            Click any stage below
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-0.5">Application Journey (Phase-1)</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white">
                            {getProgressPercentage()}% Complete
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {getProgressPercentage() === 100 ? 'All Milestones Met!' : 'Stage 3 of 4 Active'}
                          </span>
                        </div>
                        <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-blue-500 to-emerald-400 rounded-full transition-all duration-500" 
                            style={{ width: `${getProgressPercentage()}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Clickable 4-Stage Step Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {[
                        { step: 1, title: 'Registration', desc: 'Profile Verified', status: getStageStatus(1) },
                        { step: 2, title: 'Docs Verified', desc: `${documentsList.length} Verified`, status: getStageStatus(2) },
                        { step: 3, title: 'Seat Allotment', desc: seatConfirmed ? 'Seat Confirmed' : 'Offer Issued', status: getStageStatus(3) },
                        { step: 4, title: 'Hostel & Fees', desc: feePaid ? 'Fees Paid' : 'Selection Open', status: getStageStatus(4) },
                      ].map((s) => {
                        const isSelected = selectedStage === s.step;
                        return (
                          <div
                            key={s.step}
                            onClick={() => setSelectedStage(s.step)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 ${
                              isSelected
                                ? 'bg-brand-blue-950/50 border-brand-cyan-400 shadow-glow-cyan'
                                : s.status === 'done'
                                ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/70'
                                : s.status === 'current'
                                ? 'bg-brand-blue-950/30 border-brand-cyan-500/60'
                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-mono font-bold text-slate-400">0{s.step}</span>
                              {s.status === 'done' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : s.status === 'current' ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan-400 animate-ping" />
                              ) : (
                                <Clock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <h5 className={`text-xs font-bold ${isSelected ? 'text-brand-cyan-300' : 'text-white'}`}>{s.title}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5">{s.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dedicated Working Workspace For Selected Stage */}
                    <div className="mt-5 p-5 rounded-2xl bg-brand-navy-900/90 border border-slate-800 text-xs text-slate-200 space-y-4">
                      
                      {/* Stage 1 Workspace */}
                      {selectedStage === 1 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <strong className="text-white text-sm">Stage 01: Applicant Profile & Account Registration</strong>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              Verified May 10, 2026
                            </span>
                          </div>

                          {isEditingProfile ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                                <input
                                  type="text"
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-brand-cyan-400 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Email</label>
                                <input
                                  type="email"
                                  value={studentEmail}
                                  onChange={(e) => setStudentEmail(e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-brand-cyan-400 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Phone</label>
                                <input
                                  type="text"
                                  value={studentPhone}
                                  onChange={(e) => setStudentPhone(e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-brand-cyan-400 focus:outline-none"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-slate-400 block text-[10px]">Registered Name:</span>
                                <strong className="text-white">{studentName}</strong>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-slate-400 block text-[10px]">Verified Email:</span>
                                <strong className="text-white">{studentEmail}</strong>
                              </div>
                              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-slate-400 block text-[10px]">Mobile Contact:</span>
                                <strong className="text-white">{studentPhone}</strong>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setIsEditingProfile(!isEditingProfile)}
                              className="text-xs text-brand-cyan-400 hover:text-white transition"
                            >
                              {isEditingProfile ? 'Save & Lock Details' : 'Edit Contact Details'}
                            </button>
                            <button
                              onClick={() => setSelectedStage(2)}
                              className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg transition"
                            >
                              Next: Document Verification <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Stage 2 Workspace */}
                      {selectedStage === 2 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-emerald-400" />
                              <strong className="text-white text-sm">Stage 02: Academic Document Verification</strong>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              {documentsList.length} of {documentsList.length} Verified
                            </span>
                          </div>

                          <div className="space-y-2">
                            {documentsList.map((doc) => (
                              <div
                                key={doc.id}
                                className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <span className="text-white font-medium block">{doc.name}</span>
                                  <span className="text-[11px] text-slate-400 font-mono">{doc.score} • {doc.date}</span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                  <Check className="w-3 h-3" /> Registrar Verified
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                            <label className="inline-flex items-center gap-1.5 text-xs text-brand-cyan-400 hover:text-white cursor-pointer transition">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Extra Certificate / Document</span>
                              <input type="file" onChange={handleUploadExtraDoc} className="hidden" />
                            </label>
                            <button
                              onClick={() => setSelectedStage(3)}
                              className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg transition"
                            >
                              Next: Seat Allotment <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Stage 3 Workspace */}
                      {selectedStage === 3 && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-brand-cyan-400" />
                              <strong className="text-white text-sm">Stage 03: Provisional Seat Allocation</strong>
                            </div>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${seatConfirmed ? 'text-emerald-400 bg-emerald-500/10' : 'text-brand-cyan-300 bg-brand-blue-500/20'}`}>
                              {seatConfirmed ? 'Seat Confirmed' : 'Offer Letter Issued'}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Allocated Degree:</span>
                              <strong className="text-white">B.Tech in Computer Science & Artificial Intelligence</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Department:</span>
                              <span className="text-slate-200">School of Computing & AI</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Merit Category Rank:</span>
                              <span className="text-emerald-400 font-mono">Rank #142 (94.2 Percentile)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Scholarship Award:</span>
                              <span className="text-brand-cyan-300 font-medium">Chancellor’s Merit Grant (50% Tuition Waiver)</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={celebrateAdmission}
                                className="px-3 py-1.5 rounded-lg bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-brand-cyan-300" />
                                🎉 View Offer Letter
                              </button>

                              {!seatConfirmed && (
                                <button
                                  onClick={handleConfirmSeat}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Confirm & Lock Seat
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => setSelectedStage(4)}
                              className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg transition"
                            >
                              Next: Hostel & Fees <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Stage 4 Workspace */}
                      {selectedStage === 4 && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-brand-cyan-400" />
                              <strong className="text-white text-sm">Stage 04: Hostel Room Booking & Term Fee Payment</strong>
                            </div>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${feePaid ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                              {feePaid ? 'Phase-1 Fully Completed' : 'Window Open'}
                            </span>
                          </div>

                          {/* Hostel Choices Configuration */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-brand-cyan-400" />
                                <span>Hostel Block Selection</span>
                              </label>
                              <select
                                value={hostelChoice}
                                onChange={(e) => setHostelChoice(e.target.value as any)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-brand-cyan-400 focus:outline-none"
                              >
                                <option value="Nilgiri Boys (North Quad)">Nilgiri Boys Hostel (North Quad)</option>
                                <option value="Himalaya Girls (North Quad)">Himalaya Girls Hostel (North Quad)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                                <Home className="w-3 h-3 text-brand-cyan-400" />
                                <span>Room Tier Preference</span>
                              </label>
                              <select
                                value={roomTier}
                                onChange={(e) => setRoomTier(e.target.value as any)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-brand-cyan-400 focus:outline-none"
                              >
                                <option value="AC Double Suite ($1,800/yr)">AC Double Suite ($1,800/yr)</option>
                                <option value="Non-AC Triple Deluxe ($1,200/yr)">Non-AC Triple Deluxe ($1,200/yr)</option>
                              </select>
                            </div>
                          </div>

                          {/* Fee Breakdown & Payment Action */}
                          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-slate-400">
                              <span>Standard Tuition Fee:</span>
                              <span className="font-mono text-white">$4,500</span>
                            </div>
                            <div className="flex justify-between text-emerald-400">
                              <span>Chancellor's Merit Scholarship:</span>
                              <span className="font-mono">- 50% ($2,250)</span>
                            </div>
                            <div className="flex justify-between text-white font-semibold pt-1 border-t border-slate-800">
                              <span>Net Payable Term Installment:</span>
                              <span className="text-brand-cyan-300 font-mono text-sm">$2,250 / ₹92,500</span>
                            </div>
                          </div>

                          {/* Payment State */}
                          {feePaid ? (
                            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                <div>
                                  <span className="font-bold text-white block">Payment Confirmed & Verified!</span>
                                  <span className="text-[10px] text-slate-400 font-mono">Receipt ID: {paymentReceiptId}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => window.print()}
                                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:text-white transition"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                Print Receipt
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>256-Bit Encrypted Campus Gateway</span>
                              </span>
                              <button
                                onClick={handleSimulatePayment}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs shadow-md transition"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                Simulate Term Fee Payment ($2,250)
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Quick Action Buttons Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 mt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => onAskAI('Check my admission status')}
                      className="py-2 px-3 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 hover:text-white transition"
                    >
                      Check Status
                    </button>
                    <button
                      onClick={onNavigateCourses}
                      className="py-2 px-3 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 hover:text-white transition"
                    >
                      View Courses
                    </button>
                    <button
                      onClick={onNavigateScholarships}
                      className="py-2 px-3 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 hover:text-white transition"
                    >
                      Scholarships
                    </button>
                    <button
                      onClick={onOpenHandoff}
                      className="py-2 px-3 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 hover:text-white transition"
                    >
                      College Desk
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: My Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="rounded-3xl p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-900/80 shadow-xl">
            <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-bold text-white">Previous EDU BUGS Interactions</h4>
                  <p className="text-xs text-slate-400">All questions you’ve asked the AI assistant are recorded here for your reference.</p>
                </div>
                <button
                  onClick={() => onAskAI()}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-blue-600 hover:bg-brand-blue-500 text-white transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  New Question
                </button>
              </div>

              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-2xl bg-brand-navy-900/70 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{enq.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-brand-cyan-300 border border-slate-700">
                          {enq.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{enq.timestamp}</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{enq.question}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        enq.statusColor === 'emerald'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : enq.statusColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {enq.status}
                      </span>
                      <button
                        onClick={() => onAskAI(enq.question)}
                        className="text-xs text-brand-cyan-400 hover:text-white transition flex items-center gap-1"
                      >
                        Re-ask AI <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Announcements & Deadlines */}
        {activeTab === 'announcements' && (
          <div className="rounded-3xl p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-900/80 shadow-xl">
            <div className="bg-brand-navy-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <h4 className="text-lg font-bold text-white">Official Institutional Bulletins & Deadlines</h4>
                <p className="text-xs text-slate-400">Directly synchronized with the Registrar and Academic Office bulletin board.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {IMPORTANT_DATES.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-brand-navy-900/70 border border-slate-800 flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-750 flex items-center justify-center text-brand-cyan-400 flex-shrink-0 mt-0.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-brand-cyan-400">{item.category}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{item.status}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-0.5">{item.event}</h5>
                      <p className="text-xs text-brand-cyan-300 font-mono mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Official Admission Offer Modal */}
      <AdmissionOfferModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        onAskAI={onAskAI}
      />
    </section>
  );
};
