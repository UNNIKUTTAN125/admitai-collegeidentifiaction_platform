import React from 'react';

export const ProductSpecs: React.FC = () => {
  const specs = [
    {
      category: 'Intelligence & Architecture',
      items: [
        { label: 'Retrieval Engine', value: 'Retrieval-Augmented Generation (RAG) with local vector indexing' },
        { label: 'Verification Standard', value: 'Zero-hallucination constraint — institutional ground truth only' },
        { label: 'Inference Latency', value: '< 180 milliseconds to initial stream token' },
        { label: 'Ingestion Formats', value: 'Admissions brochures, course catalogs, fee schedules, official circulars' },
      ]
    },
    {
      category: 'Interaction & Accessibility',
      items: [
        { label: 'Voice Input', value: 'Native Web Speech API speech recognition with live visual feedback' },
        { label: 'Audio Synthesis', value: 'Instant text-to-speech read aloud for all AI responses' },
        { label: 'Languages', value: 'Universal multilingual intent parsing with localized institution support' },
      ]
    },
    {
      category: 'Human Escalation & Governance',
      items: [
        { label: 'Smart Human Handoff', value: 'Automated ticket dispatch to designated campus department officers' },
        { label: 'Escalation SLA', value: '< 2 Hours target resolution during institutional operating hours' },
        { label: 'Department Routing', value: 'Admissions, Academics, Financial Aid, Hostel Office, Student Affairs' },
      ]
    },
    {
      category: 'Privacy & Security Standards',
      items: [
        { label: 'Encryption', value: 'TLS 1.3 in transit • AES-256 data isolation at rest' },
        { label: 'Model Retraining Policy', value: 'Zero student data used for commercial model training' },
        { label: 'Student Data Footprint', value: 'Minimal identifier requirement — general enquiries are anonymous' },
      ]
    }
  ];

  return (
    <section id="specs" className="py-24 sm:py-36 bg-black border-t border-white/[0.08] text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 text-left">
          <span className="text-xs sm:text-sm font-medium text-[#86868b] uppercase tracking-tight block mb-2">
            Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#f5f5f7]">
            Specifications.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal tracking-tight mt-4 max-w-xl">
            A closer look at the engineering, security, and performance benchmarks that power EDU BUGS.
          </p>
        </div>

        {/* Apple-style Specifications Table */}
        <div className="space-y-12">
          {specs.map((group, idx) => (
            <div key={idx} className="border-t border-white/[0.12] pt-6">
              <h3 className="text-xs sm:text-sm font-mono text-[#86868b] uppercase tracking-wider mb-6">
                {group.category}
              </h3>

              <div className="divide-y divide-white/[0.06]">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                  >
                    <span className="text-sm sm:text-base font-normal text-[#86868b] sm:w-1/3">
                      {item.label}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-[#f5f5f7] sm:w-2/3 tracking-tight">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
