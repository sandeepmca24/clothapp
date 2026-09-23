import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { 
  CategoryType, 
  BrandTierType, 
  ConditionType, 
  ValuationFormValues 
} from '../types';
import { calculateSwapValuation } from '../utils/calculator';
import { 
  Scale, 
  Sparkles, 
  Droplet, 
  Wind, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const SwapValueCalculatorView: React.FC = () => {
  const { setPrefilledValuation, setIsCreateListingOpen } = useSwap();

  const [form, setForm] = useState<ValuationFormValues>({
    category: 'Outerwear',
    brandTier: 'sustainable_indie',
    originalPrice: 320,
    condition: 'like_new',
    materialPurity: '100% Natural/Organic',
    garmentAgeYears: 2
  });

  const valuation = calculateSwapValuation(form);

  const handleApplyToNewListing = () => {
    setPrefilledValuation({
      points: valuation.swapValuePoints,
      category: form.category,
      brand: form.brandTier === 'luxury_designer' ? 'Designer / Archival' :
             form.brandTier === 'sustainable_indie' ? 'Sustainable Indie' :
             form.brandTier === 'vintage_heritage' ? 'Vintage Heritage' : 'Contemporary'
    });
    setIsCreateListingOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <span>Algorithmic Fair Trade</span>
          <span aria-hidden="true">·</span>
          <span>Zero Currency Required</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Garment Swap Value Calculator
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Traditional resale places artificial markups on clothing. Our algorithmic valuation assesses fiber purity, structural longevity, brand craftsmanship, and lifecycle condition to compute an equitable swap value for cashless exchanges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 shadow-xs space-y-6">
          
          <h2 className="font-display font-bold text-neutral-900 text-base">
            Garment Specifications
          </h2>

          <div className="space-y-5 text-xs">
            
            {/* Category */}
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-900">Garment Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as CategoryType })}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
              >
                <option value="Outerwear">Outerwear (Coats, Trench, Parkas, Heavy Jackets)</option>
                <option value="Knitwear">Knitwear (Merino, Cashmere, Heavy Cable Knits)</option>
                <option value="Denim & Trousers">Denim &amp; Trousers (Selvedge, Tailored Wool)</option>
                <option value="Dresses & Jumpsuits">Dresses &amp; Jumpsuits (Linen, Silk, Structured)</option>
                <option value="Tops & Shirts">Tops &amp; Shirts (Chore Overshirts, Blouses, Tees)</option>
                <option value="Shoes & Accessories">Shoes &amp; Accessories (Belts, Boots, Bags)</option>
              </select>
            </div>

            {/* Brand Tier */}
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-900">Brand Tier &amp; Heritage</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'sustainable_indie', title: 'Sustainable Indie / Artisan', desc: 'Toast, Story mfg, BODE, Nudie' },
                  { id: 'luxury_designer', title: 'Designer / Luxury House', desc: 'Studio Nicholson, Lemaire, Margaret Howell' },
                  { id: 'vintage_heritage', title: 'Vintage Heritage', desc: 'Kurabo denim, 90s Schott, Made in USA/UK' },
                  { id: 'contemporary_highstreet', title: 'Contemporary High-Street', desc: 'COS, Arket, Everlane, Uniqlo U' }
                ].map(tier => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setForm({ ...form, brandTier: tier.id as BrandTierType })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.brandTier === tier.id
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-semibold text-neutral-900">{tier.title}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5 truncate">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Original Retail Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-neutral-900">Original Retail Price</label>
                <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                  ${form.originalPrice} USD
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={900}
                step={10}
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                <span>$30 (High-street staple)</span>
                <span>$450 (Designer piece)</span>
                <span>$900+ (Archival outerwear)</span>
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-900">Garment Condition</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'brand_new_tags', label: 'Brand New (Tags)' },
                  { id: 'like_new', label: 'Like New (Worn < 3x)' },
                  { id: 'gently_used', label: 'Gently Used' },
                  { id: 'vintage_good', label: 'Vintage Patina' }
                ].map(cond => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setForm({ ...form, condition: cond.id as ConditionType })}
                    className={`py-2 px-2.5 rounded-lg border text-center transition-colors font-medium ${
                      form.condition === cond.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Purity */}
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-900">Fiber Composition &amp; Material Quality</label>
              <select
                value={form.materialPurity}
                onChange={(e) => setForm({ ...form, materialPurity: e.target.value as any })}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
              >
                <option value="100% Natural/Organic">100% Natural / Organic (Pure Virgin Wool, Flax Linen, Raw Silk, Selvedge Cotton) +15% Weight</option>
                <option value="Natural Blend">Natural Fiber Blend (Wool/Cotton/Linen with &lt;15% synthetic strength) +5%</option>
                <option value="Recycled Tech">Certified Recycled Tech Fabric (ECONYL, Repreve, GRS Poly) +8%</option>
                <option value="Synthetic/Polyester">Standard Synthetic / Fast Fashion Blend (Polyester, Acrylic, Nylon)</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-neutral-900">Garment Age (Years)</label>
                <span className="font-mono font-bold text-neutral-900 text-sm tabular-nums">
                  {form.garmentAgeYears === 0 ? 'Current Season (<1 yr)' : `${form.garmentAgeYears} years old`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={form.garmentAgeYears}
                onChange={(e) => setForm({ ...form, garmentAgeYears: Number(e.target.value) })}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>Current season</span>
                <span>Modern vintage</span>
                <span>Archival collector (15+ yrs)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Calculated Valuation & Trade Parity Output (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="uppercase tracking-wider font-semibold">Recommended Valuation</span>
              <span className="font-mono text-emerald-400">Verified Parity</span>
            </div>

            {/* Big Points Display */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-white">
                  {valuation.swapValuePoints}
                </span>
                <span className="text-sm font-semibold uppercase text-neutral-300">
                  Swap Points
                </span>
              </div>
              <div className="text-xs text-neutral-300">
                Equivalent to a 1-to-1 swap for items between <span className="font-mono font-semibold text-white">{valuation.fairnessBand.min}</span> and <span className="font-mono font-semibold text-white">{valuation.fairnessBand.max}</span> points.
              </div>
            </div>

            {/* Tier Card */}
            <div className="p-4 bg-neutral-800 rounded-xl border border-neutral-700 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400">
                {valuation.tierLabel}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {valuation.tierDescription}
              </p>
            </div>

            {/* Recommended Compatible Garments to Target */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-neutral-300">
                Optimal Exchange Categories:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {valuation.recommendedSwapCategories.map(cat => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 bg-neutral-800 text-neutral-200 rounded-md text-[11px] border border-neutral-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Sustainability Metrics */}
            <div className="pt-4 border-t border-neutral-800 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CO2e Diverted</span>
                </div>
                <div className="font-mono text-base font-bold text-white tabular-nums">
                  {valuation.co2SavedKg} kg
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Droplet className="w-3.5 h-3.5 text-sky-400" />
                  <span>Water Conserved</span>
                </div>
                <div className="font-mono text-base font-bold text-white tabular-nums">
                  {valuation.waterSavedLitres.toLocaleString()} L
                </div>
              </div>
            </div>

            {/* Action Button: Apply to New Listing */}
            <button
              onClick={handleApplyToNewListing}
              className="w-full py-3.5 px-4 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>List Garment with {valuation.swapValuePoints} Points</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Education Explainer */}
          <div className="p-4 bg-neutral-100/70 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-2">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-neutral-600" />
              <span>How Swap Points Work</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Swap Points eliminate monetary bargaining. When two members propose a swap within $\pm 15\%$ points parity, the platform marks the exchange as optimal fair trade. Members can also bundle 2 everyday garments for 1 premium coat.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
