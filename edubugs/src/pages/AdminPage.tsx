import React from 'react';
import { AdminPanel } from '../components/AdminPanel';

interface AdminPageProps {
  onBackToHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToHome }) => {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Institutional Control Center
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            College Admin Console.
          </h1>
          <p className="text-base text-[#86868b] font-normal tracking-tight mt-2">
            Manage vector-indexed knowledge documents, update course parameters, review live analytics, and oversee officer escalations.
          </p>
        </div>

        <AdminPanel onBackToHome={onBackToHome} />
      </div>
    </div>
  );
};
