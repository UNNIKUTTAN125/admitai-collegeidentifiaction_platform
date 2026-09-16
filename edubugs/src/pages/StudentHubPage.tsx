import React from 'react';
import { StudentDashboard } from '../components/StudentDashboard';

interface StudentHubPageProps {
  onAskAI: (prompt?: string) => void;
  onOpenHandoff: () => void;
  onNavigateCourses: () => void;
  onNavigateScholarships: () => void;
}

export const StudentHubPage: React.FC<StudentHubPageProps> = ({
  onAskAI,
  onOpenHandoff,
  onNavigateCourses,
  onNavigateScholarships
}) => {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-10 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Applicant & Student Portal
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Student Hub.
          </h1>
          <p className="text-base text-[#86868b] font-normal tracking-tight mt-2">
            Monitor your provisional admission status, previous AI enquiries, and official campus circulars.
          </p>
        </div>

        <StudentDashboard
          onAskAI={onAskAI}
          onOpenHandoff={onOpenHandoff}
          onNavigateCourses={onNavigateCourses}
          onNavigateScholarships={onNavigateScholarships}
        />
      </div>
    </div>
  );
};
