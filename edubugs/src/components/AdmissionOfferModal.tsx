import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Building2, 
  QrCode, 
  Sparkles, 
  FileCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdmissionOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAI: (prompt: string) => void;
}

export const AdmissionOfferModal: React.FC<AdmissionOfferModalProps> = ({
  isOpen,
  onClose,
  onAskAI
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst on pop up
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAcceptSeat = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.4 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#161617] border border-white/[0.14] rounded-[28px] shadow-2xl overflow-hidden flex flex-col text-[#f5f5f7]">
        
        {/* Top Header Bar */}
        <div className="px-6 sm:px-8 py-4 border-b border-white/[0.08] bg-[#1d1d1f]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block">
                Official Document
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                Provisional Offer of Admission — Fall 2026
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Offer Letter"
              className="p-2 text-[#86868b] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#86868b] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Letter Body Canvas */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto max-h-[75vh]">
          
          {/* Institutional Crest & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tighter text-white font-sans">
                  EDU BUGS
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-[#f5f5f7] border border-white/20 font-mono">
                  Admissions Office
                </span>
              </div>
              <p className="text-xs text-[#86868b] mt-1">
                Office of Undergraduate Admissions • Academic Year 2026–2027
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-[#86868b] font-mono space-y-0.5">
              <div>Ref: <strong className="text-white">EB-ADM-2026-CS8891</strong></div>
              <div>Date of Issue: <strong className="text-white">June 18, 2026</strong></div>
              <div>Validity: <span className="text-emerald-400">Provisional — Active</span></div>
            </div>
          </div>

          {/* Congratulations Greeting */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Congratulations, Alex Rivera!</span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Offer of Provisional Admission
            </h4>

            <p className="text-sm text-[#a1a1a6] leading-relaxed">
              We are delighted to inform you that based on your academic performance, entrance test ranking, and document verification, the Admissions Committee has granted you **Provisional Admission** to our premier undergraduate engineering cohort.
            </p>
          </div>

          {/* Academic Details Matrix */}
          <div className="p-6 rounded-[22px] bg-[#1d1d1f] border border-white/[0.08] space-y-4">
            <h5 className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
              Enrolment & Allotment Particulars
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[#86868b] block">Student Name:</span>
                <strong className="text-white font-medium">Alex Rivera</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[#86868b] block">Application Roll No:</span>
                <span className="text-white font-mono font-medium">EB-2026-CS8891</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#86868b] block">Offered Degree Program:</span>
                <strong className="text-white font-medium">B.Tech in Computer Science & Artificial Intelligence</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[#86868b] block">Department / Faculty:</span>
                <span className="text-white font-medium">School of Computing & AI</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#86868b] block">Duration & Mode:</span>
                <span className="text-white">4 Years (8 Semesters) • Full-Time Residential</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#86868b] block">All-India Merit Rank:</span>
                <span className="text-white font-mono">Rank #142 (EB-AST: 94.2% Percentile)</span>
              </div>
            </div>

            {/* Scholarship Subsidized Fee Calculation */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-[#86868b]">
                <span>Standard Annual Tuition Fee:</span>
                <span className="font-mono text-white">$4,500 / ₹1,85,000</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Chancellor’s Merit Excellence Grant:</span>
                <span className="font-mono font-semibold">- 50% Tuition Waiver Applied</span>
              </div>
              <div className="flex justify-between text-white font-semibold pt-1 border-t border-white/[0.08]">
                <span>Net Payable Annual Tuition:</span>
                <span className="font-mono text-emerald-400 text-sm sm:text-base">$2,250 / ₹92,500</span>
              </div>
            </div>
          </div>

          {/* Crucial Upcoming Orientation Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#1d1d1f]/60 border border-white/[0.06] flex items-start gap-3">
              <Calendar className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Freshman Orientation:</strong>
                <span className="text-[#86868b]">August 14, 2026 • 9:00 AM</span>
                <span className="text-[#86868b] block mt-0.5">Central Academic Auditorium</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1d1d1f]/60 border border-white/[0.06] flex items-start gap-3">
              <Building2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Hostel Room Allotment:</strong>
                <span className="text-[#86868b]">August 01, 2026</span>
                <span className="text-[#86868b] block mt-0.5">Nilgiri Boys & Himalaya Girls Residences</span>
              </div>
            </div>
          </div>

          {/* Signatures & Security Seals */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-black" />
              </div>
              <div className="text-[11px] text-[#86868b] font-mono leading-tight">
                <div>Digital Verification Valid</div>
                <div>Hash: SHA256: 8f4b29c...</div>
                <div className="text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified by Registrar
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="font-serif italic text-base text-white">Dr. Evelyn Vance</div>
              <div className="text-xs font-semibold text-white">Dr. Evelyn Vance, Ph.D.</div>
              <div className="text-[11px] text-[#86868b]">Director of Admissions & Enrolment</div>
              <div className="text-[10px] text-[#86868b] font-mono">EDU BUGS Collegiate System</div>
            </div>
          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#1d1d1f] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isAccepted ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> Seat Officially Accepted
              </span>
            ) : (
              <button
                onClick={handleAcceptSeat}
                className="apple-pill-btn apple-pill-primary text-xs py-2.5 px-5 w-full sm:w-auto font-semibold"
              >
                Accept Offer & Confirm Seat
              </button>
            )}

            <button
              onClick={handlePrint}
              className="apple-pill-btn apple-pill-secondary text-xs py-2.5 px-4"
            >
              Print / Save PDF
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onAskAI('What are the next steps after accepting my provisional admission offer?');
              }}
              className="apple-link text-xs flex items-center gap-1"
            >
              <span>Ask AI Next Steps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="text-xs text-[#86868b] hover:text-white px-3 py-2 transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
