import React from 'react';
import { useSwap } from '../context/SwapContext';
import { downloadProjectReportDoc } from '../utils/generateProjectReportDoc';
import { 
  X, 
  FileDown, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  ArrowRight 
} from 'lucide-react';

export const ProjectReportModal: React.FC = () => {
  const { isProjectReportOpen, setIsProjectReportOpen, notify } = useSwap();

  if (!isProjectReportOpen) return null;

  const handleDownload = () => {
    downloadProjectReportDoc();
    notify('Project Report downloaded as Word Document (.doc)', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-neutral-900">
                Official Project Report Document
              </h2>
              <p className="text-xs text-neutral-500">
                Unified Mentor Portal · Clothing Exchange &amp; Swap Marketplace Specification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Download Microsoft Word .doc file"
            >
              <FileDown className="w-4 h-4" />
              <span>Download .doc</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex px-3 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors items-center gap-1.5 cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => setIsProjectReportOpen(false)}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-neutral-800 text-xs sm:text-sm leading-relaxed bg-white">
          
          {/* Header Cover Box */}
          <div className="border border-neutral-200 rounded-xl p-6 sm:p-8 bg-neutral-50/50 space-y-4 text-center sm:text-left">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Unified Mentor Portal · Capstone Project Report
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
              ReThread: Clothing Exchange &amp; Swap Marketplace
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
              A comprehensive technical and functional report detailing the engineering, algorithmic trade valuation, location-based neighborhood matching, and circular sustainability metrics of a zero-cash clothing swap platform.
            </p>

            <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs">
              <div>
                <span className="text-neutral-400 font-medium">Domain:</span>
                <p className="font-semibold text-neutral-900">Sustainable Commerce</p>
              </div>
              <div>
                <span className="text-neutral-400 font-medium">Framework:</span>
                <p className="font-semibold text-neutral-900">React 19 &amp; TypeScript</p>
              </div>
              <div>
                <span className="text-neutral-400 font-medium">Submission:</span>
                <p className="font-semibold text-neutral-900">September 2026</p>
              </div>
              <div>
                <span className="text-neutral-400 font-medium">Status:</span>
                <p className="font-semibold text-emerald-700">Phase 1 Live &amp; Verified</p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              1. Executive Summary &amp; Abstract
            </h2>
            <p className="text-neutral-700">
              The global fashion industry generates over <strong>92 million tonnes of textile waste annually</strong>. While second-hand platforms exist, their monetization mechanics prioritize fees and seller margins rather than genuine circularity. <strong>ReThread</strong> introduces a dedicated, zero-monetary transaction clothing swap network where items are exchanged directly using an algorithmic <strong>Swap Value Calculator</strong> (15–250 pts). The system combines neighborhood location filtering, verified public safe-exchange hubs, negotiation chat rooms, and a zero-carbon courier simulation.
            </p>
          </section>

          {/* Section 2: Problem Statement */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              2. Problem Statement &amp; Market Need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-1.5">
                <h4 className="font-semibold text-neutral-900 text-xs">Linear Take-Make-Waste Paradigm</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Fast fashion encourages hyper-consumption, leaving wearable garments discarded in landfills after fewer than 7 wears.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-1.5">
                <h4 className="font-semibold text-neutral-900 text-xs">Frictional Monetary Resale</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  High platform cuts (15–20%) and speculative pricing deter casual circular sharing between community members.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Algorithmic Model */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              3. Mathematical &amp; Algorithmic Valuation Model
            </h2>
            <div className="p-4 rounded-xl bg-neutral-900 text-white font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-semibold">// Swap Value Points Formulation</div>
              <div>Points = clamp(15, 250, [ (RetailPrice × 0.35) × M_cat × M_brand × M_cond × M_fiber × M_age ])</div>
              <div className="text-neutral-400 text-[11px] pt-1">
                • Category Multiplier: Outerwear (1.35), Denim (1.15), Knitwear (1.10), Tops (0.85)<br/>
                • Fiber Purity Bonus: 100% Organic Wool/Linen/Cotton (+15%), Natural Blend (+5%)<br/>
                • Trade Parity Index: Offered Points / Target Points (Targeting ±15% parity band)
              </div>
            </div>
          </section>

          {/* Section 4: Module Matrix */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              4. System Architecture &amp; Functional Modules
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-neutral-200 rounded-lg overflow-hidden">
                <thead className="bg-neutral-100 text-neutral-700 font-semibold">
                  <tr>
                    <th className="p-2.5 border-b border-neutral-200">Module Name</th>
                    <th className="p-2.5 border-b border-neutral-200">Functionality &amp; Capabilities</th>
                    <th className="p-2.5 border-b border-neutral-200">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-900">Garment Catalog</td>
                    <td className="p-2.5 text-neutral-600">Filters by category, condition, radius (&lt;5 km to 500 km), text search</td>
                    <td className="p-2.5 text-emerald-700 font-medium">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-900">Value Calculator</td>
                    <td className="p-2.5 text-neutral-600">Interactive form calculating points, tier (1–5), water/carbon diverted</td>
                    <td className="p-2.5 text-emerald-700 font-medium">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-900">Negotiation Chat</td>
                    <td className="p-2.5 text-neutral-600">Deal room, agreement ledger, counter-offers, dispute mediation trigger</td>
                    <td className="p-2.5 text-emerald-700 font-medium">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-900">Courier Tracking</td>
                    <td className="p-2.5 text-neutral-600">Simulated 4-stage pipeline for GreenPost zero-emission remote swaps</td>
                    <td className="p-2.5 text-emerald-700 font-medium">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-900">Admin Governance</td>
                    <td className="p-2.5 text-neutral-600">KPI metrics, listing moderation queue, ticket resolution, badge verification</td>
                    <td className="p-2.5 text-emerald-700 font-medium">Verified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Environmental Ledger */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              5. Sustainability Impact &amp; Life-Cycle Metrics
            </h2>
            <p className="text-neutral-700">
              Extending the lifespan of apparel by just 9 months reduces its carbon, waste, and water footprint by 20–30%. Each completed swap on ReThread saves an average of <strong>3,600 Liters of water</strong> and prevents <strong>1.8 kg of textile waste</strong> from municipal landfill deposition.
            </p>
          </section>

          {/* Section 6: Action Banner */}
          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm">
                Need this document for official Unified Mentor submission?
              </h4>
              <p className="text-neutral-500 text-xs mt-0.5">
                Download the fully styled Microsoft Word (.doc) document complete with XML pagination and tables.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 shrink-0 shadow-xs cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download .doc File</span>
            </button>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-between text-xs text-neutral-500">
          <span>Format: Microsoft Word XML Document (.doc)</span>
          <button
            onClick={() => setIsProjectReportOpen(false)}
            className="font-medium text-neutral-700 hover:text-neutral-900"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
