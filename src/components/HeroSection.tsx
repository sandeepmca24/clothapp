import React from 'react';
import { useSwap } from '../context/SwapContext';
import { heroBannerImg } from '../data/mockData';
import { ArrowRight, Sparkles, Scale, RefreshCw } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setIsCreateListingOpen } = useSwap();

  return (
    <section className="relative border-b border-neutral-200 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-neutral-400">
              <span>Circular Wardrobe Network</span>
              <span aria-hidden="true">·</span>
              <span>Zero Monetary Cost</span>
              <span aria-hidden="true">·</span>
              <span>NYC &amp; Regional Hubs</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Exchange garments, eliminate waste, revitalize your personal style.
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              A peer-to-peer clothing exchange engineered for quality textiles. Trade garments directly with verified neighbors or via carbon-neutral eco-couriers using equitable swap valuations.
            </p>

            {/* Direct Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const browseEl = document.getElementById('marketplace-listings');
                  if (browseEl) {
                    browseEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-3 text-sm font-semibold bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors shadow-sm flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Explore Available Swaps</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className="px-5 py-3 text-sm font-semibold bg-neutral-800/80 hover:bg-neutral-800 text-white border border-neutral-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <Scale className="w-4 h-4 text-neutral-300" />
                <span>Swap Value Calculator</span>
              </button>
            </div>

            {/* Quantitative Proof Adjacency */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-3 gap-6 max-w-xl text-left">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                  100%
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Cashless peer exchange
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                  184.2 kg
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Fabrics diverted from landfill
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                  312,000 L
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Water saved across exchanges
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-2xl border border-neutral-800 bg-neutral-800">
              <img
                src={heroBannerImg}
                alt="Curated circular clothing swap studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-neutral-900/85 backdrop-blur-md rounded-xl border border-neutral-700/60 text-xs">
                <div className="flex items-center justify-between text-neutral-300 mb-1">
                  <span className="font-semibold text-white">Active Verified Exchange Hub</span>
                  <span className="font-mono text-[11px] text-emerald-400">● 24 Live Swaps Nearby</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-snug">
                  Safe meetup zones at Brooklyn Greenpoint Library &amp; LES Ecology Center.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
