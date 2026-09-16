import React from 'react';
import { ProductSpecs } from '../components/ProductSpecs';
import { KnowledgeBaseSection } from '../components/KnowledgeBaseSection';

export const SpecsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 bg-black text-white min-h-screen animate-in fade-in duration-300">
      <ProductSpecs />
      <KnowledgeBaseSection />
    </div>
  );
};
