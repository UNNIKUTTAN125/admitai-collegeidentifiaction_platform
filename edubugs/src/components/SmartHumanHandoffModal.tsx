import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, PhoneCall, Mail, Building2, Clock, Copy, Check } from 'lucide-react';
import { DEPARTMENT_CONTACTS } from '../data/collegeKnowledgeBase';

interface SmartHumanHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartment?: string;
  initialQuery?: string;
  onSubmitSuccess?: (ticketId: string, department: string) => void;
}

export const SmartHumanHandoffModal: React.FC<SmartHumanHandoffModalProps> = ({
  isOpen,
  onClose,
  defaultDepartment = 'Admissions & Enrolment Office',
  initialQuery = '',
  onSubmitSuccess
}) => {
  const [department, setDepartment] = useState(defaultDepartment);
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@student.edu');
  const [phone, setPhone] = useState('+1 (555) 349-8821');
  const [message, setMessage] = useState(initialQuery || 'I need official guidance regarding my admission documentation and cutoff criteria.');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent'>('Normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentDeptContact = DEPARTMENT_CONTACTS.find(d => 
    d.department.toLowerCase().includes(department.toLowerCase()) ||
    department.toLowerCase().includes(d.department.toLowerCase())
  ) || DEPARTMENT_CONTACTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `EB-TK-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(generatedId, department);
      }
    }, 900);
  };

  const copyTicket = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetAndClose = () => {
    setTicketId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-brand-navy-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-brand-navy-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-blue-600/20 border border-brand-blue-500/40 flex items-center justify-center text-brand-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Connect with College Support Officer</h3>
              <p className="text-xs text-slate-400">Smart Human Handoff — Official Institutional Desk</p>
            </div>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {ticketId ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white">Ticket Created Successfully!</h4>
                <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  Your enquiry has been routed directly to the <span className="text-brand-cyan-300 font-semibold">{department}</span>. A designated officer will contact you shortly.
                </p>
              </div>

              {/* Ticket details pill */}
              <div className="p-4 rounded-xl bg-brand-navy-950/80 border border-slate-800 flex items-center justify-between max-w-md mx-auto">
                <div className="text-left">
                  <span className="text-xs text-slate-400 block">Official Ticket ID</span>
                  <span className="text-lg font-mono font-bold text-brand-cyan-400">{ticketId}</span>
                </div>
                <button
                  onClick={copyTicket}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/30 text-left text-xs text-slate-300 space-y-1.5 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-brand-cyan-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Expected Response Time: Under 2 Hours (During Office Hours)</span>
                </div>
                <p className="text-slate-400">Direct Department Contact: <span className="text-slate-200">{currentDeptContact.deanOrHOD}</span> ({currentDeptContact.phone})</p>
                <p className="text-slate-400">Office: {currentDeptContact.officeLocation}</p>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full max-w-md mx-auto py-2.5 px-4 bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white font-semibold rounded-xl shadow-glow-cyan transition"
              >
                Done & Return to Assistant
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  When the AI assistant cannot confirm a specific institutional policy or individual dispute, this smart handoff directly assigns your query to authorized college faculty and officers.
                </p>
              </div>

              {/* Department selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Assigned College Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-200 text-sm focus:border-brand-cyan-400 focus:outline-none"
                >
                  {DEPARTMENT_CONTACTS.map((dept) => (
                    <option key={dept.department} value={dept.department}>
                      {dept.department} — {dept.deanOrHOD.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-200 text-sm focus:border-brand-cyan-400 focus:outline-none"
                    placeholder="e.g. Alex Rivera"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-200 text-sm focus:border-brand-cyan-400 focus:outline-none"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-200 text-sm focus:border-brand-cyan-400 focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency Level</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('Normal')}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${
                        urgency === 'Normal' 
                          ? 'bg-brand-blue-600/30 border-brand-blue-500 text-white' 
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Normal (24 hrs)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('Urgent')}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${
                        urgency === 'Urgent' 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold' 
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Urgent (Immediate)
                    </button>
                  </div>
                </div>
              </div>

              {/* Query message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enquiry Details</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-950 border border-slate-700 text-slate-200 text-sm focus:border-brand-cyan-400 focus:outline-none resize-none"
                  placeholder="Explain your question, application ID or context..."
                />
              </div>

              {/* Department preview card */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-brand-cyan-400" />
                  <span>Direct Hotline: <strong className="text-slate-200">{currentDeptContact.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-blue-400" />
                  <span>{currentDeptContact.email}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-cyan-500 hover:from-brand-blue-500 hover:to-brand-cyan-400 text-white font-semibold text-sm shadow-glow-cyan transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Routing to Officer...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit to Human Support
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
