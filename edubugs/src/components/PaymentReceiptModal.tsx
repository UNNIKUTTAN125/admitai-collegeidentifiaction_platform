import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Download, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  QrCode,
  Sparkles,
  Receipt
} from 'lucide-react';

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptId: string;
  utrNumber: string;
  hostelChoice: string;
  roomTier: string;
  studentName: string;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isOpen,
  onClose,
  receiptId,
  utrNumber,
  hostelChoice,
  roomTier,
  studentName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0c1222] border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d19]/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Official Bursar Electronic Receipt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5 transition"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">EDU BUGS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-cyan-500/10 text-brand-cyan-400 border border-brand-cyan-500/20 font-mono">
                  Autonomous Campus Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Office of the University Bursar & Comptroller of Finance</p>
              <p className="text-[11px] text-slate-500 font-mono">Affiliated with State Technical University • ISO 9001:2015</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Receipt ID</span>
              <span className="text-sm font-mono font-bold text-brand-cyan-400">{receiptId}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Issued: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Payment Confirmed & Settled</span>
                <span className="text-xs text-emerald-300/80 font-mono">
                  NPCI UPI Gateway Ref: {utrNumber}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              PAID IN FULL
            </span>
          </div>

          {/* Student & Course Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Student Particulars</span>
              <p className="font-semibold text-white">{studentName}</p>
              <p className="text-slate-300 font-mono text-[11px]">Application ID: EB-2026-8842</p>
              <p className="text-slate-400 text-[11px]">B.Tech Computer Science & Engineering</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Accommodation Allotment</span>
              <p className="font-semibold text-white">{hostelChoice}</p>
              <p className="text-slate-300 text-[11px]">{roomTier}</p>
              <p className="text-emerald-400 text-[11px] font-mono">Room Key Issuance: Sep 28, 2026</p>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-center">Term / Period</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 font-medium text-white">Annual Tuition & Laboratory Fee</td>
                  <td className="py-2.5 px-4 text-center text-slate-400 font-mono">2026–2027 (Term-1)</td>
                  <td className="py-2.5 px-4 text-right font-mono text-white">$4,500.00</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400 font-medium">Chancellor’s Merit Scholarship Waiver (50%)</td>
                  <td className="py-2.5 px-4 text-center text-emerald-400 font-mono">Academic Merit</td>
                  <td className="py-2.5 px-4 text-right font-mono text-emerald-400">-$2,250.00</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-white">Hostel Advance & Caution Deposit (Included)</td>
                  <td className="py-2.5 px-4 text-center text-slate-400 font-mono">Annual Allotment</td>
                  <td className="py-2.5 px-4 text-right font-mono text-white">$0.00 (Subsidized)</td>
                </tr>
                <tr className="bg-slate-900/80 font-bold">
                  <td className="py-3 px-4 text-white">Total Amount Paid (via Google Pay UPI)</td>
                  <td className="py-3 px-4 text-center text-slate-400 font-mono">Settled Instantly</td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-400">
                    ₹92,500 <span className="text-xs text-slate-400 font-normal">($2,250.00 USD)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer & Digital Sign-off */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <img 
                src="/payment-qr.png" 
                alt="Payment QR Verification" 
                className="w-14 h-14 rounded-lg bg-white p-1 border border-slate-700" 
              />
              <div>
                <p className="text-white font-semibold">Cryptographically Signed Receipt</p>
                <p className="text-slate-400 font-mono text-[10px]">Hash: 9f8a-4421-eb67-bursar-9002</p>
                <p className="text-emerald-400 text-[10px] font-mono">Verified by EDU BUGS Bursar Office</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="font-serif italic text-sm text-slate-200">Dr. S. K. Subramanian</div>
              <p className="text-[10px] text-slate-400 uppercase font-mono">Chief Comptroller & Bursar</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#080d19]/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
