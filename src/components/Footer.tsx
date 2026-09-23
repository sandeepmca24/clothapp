import React from 'react';
import { useSwap } from '../context/SwapContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsProjectReportOpen } = useSwap();

  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-xs text-neutral-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <span className="font-display font-bold text-neutral-900 text-sm">
              ReThread
            </span>
            <p className="text-neutral-500 text-[11px]">
              Circular clothing exchange network dedicated to zero-waste wardrobes and equitable textile swaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-neutral-600">
            <button
              onClick={() => setActiveTab('browse')}
              className="hover:text-neutral-900 transition-colors"
            >
              Marketplace
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className="hover:text-neutral-900 transition-colors"
            >
              Swap Calculator
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-neutral-900 transition-colors"
            >
              My Wardrobe
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className="hover:text-neutral-900 transition-colors"
            >
              Negotiations
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className="hover:text-neutral-900 transition-colors"
            >
              Moderation
            </button>
            <button
              onClick={() => setIsProjectReportOpen(true)}
              className="text-neutral-900 font-semibold hover:underline transition-all flex items-center gap-1"
            >
              Project Report (.doc)
            </button>
          </div>

          <div className="text-neutral-400 text-[11px] text-center md:text-right">
            &copy; 2026 ReThread Foundation. Dedicated to circular textile stewardship.
          </div>

        </div>
      </div>
    </footer>
  );
};
