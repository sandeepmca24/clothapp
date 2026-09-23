import React, { useState, useEffect } from 'react';
import { useSwap } from '../context/SwapContext';
import { CategoryType, ConditionType } from '../types';
import { calculateSwapValuation } from '../utils/calculator';
import { 
  X, 
  Upload, 
  Sparkles, 
  Scale, 
  Image as ImageIcon,
  Check
} from 'lucide-react';

import trenchCoatImg from '../assets/images/vintage_wool_trench_1790150755633.jpg';
import denimJacketImg from '../assets/images/raw_denim_jacket_1790150766952.jpg';
import knitSweaterImg from '../assets/images/chunky_knit_sweater_1790150778386.jpg';
import linenDressImg from '../assets/images/linen_summer_dress_1790150787852.jpg';

const SAMPLE_PHOTO_CHOICES = [
  { id: 'trench', label: 'Trench / Coat', src: trenchCoatImg },
  { id: 'denim', label: 'Denim / Jacket', src: denimJacketImg },
  { id: 'knit', label: 'Artisanal Knit', src: knitSweaterImg },
  { id: 'dress', label: 'Linen Dress', src: linenDressImg },
];

export const CreateListingModal: React.FC = () => {
  const {
    isCreateListingOpen,
    setIsCreateListingOpen,
    addItem,
    prefilledValuation,
    setPrefilledValuation,
    setActiveTab
  } = useSwap();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<CategoryType>('Outerwear');
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState<ConditionType>('like_new');
  const [conditionDescription, setConditionDescription] = useState('');
  const [material, setMaterial] = useState('100% Organic Cotton');
  const [color, setColor] = useState('Natural Beige');
  const [originalRetailPrice, setOriginalRetailPrice] = useState(250);
  const [estimatedSwapValue, setEstimatedSwapValue] = useState(85);
  const [lookingFor, setLookingFor] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_PHOTO_CHOICES[0].src);

  // If redirected from Swap Calculator tool, prefill data
  useEffect(() => {
    if (prefilledValuation) {
      setEstimatedSwapValue(prefilledValuation.points);
      setCategory(prefilledValuation.category);
      if (prefilledValuation.brand) {
        setBrand(prefilledValuation.brand);
      }
      setPrefilledValuation(null);
    }
  }, [prefilledValuation, setPrefilledValuation]);

  if (!isCreateListingOpen) return null;

  // Live auto-calculation helper
  const handleAutoCalculate = () => {
    const res = calculateSwapValuation({
      category,
      brandTier: 'sustainable_indie',
      originalPrice: originalRetailPrice,
      condition,
      materialPurity: material.includes('100%') ? '100% Natural/Organic' : 'Natural Blend',
      garmentAgeYears: 1
    });
    setEstimatedSwapValue(res.swapValuePoints);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addItem({
      title: title.trim(),
      brand: brand.trim() || 'Curated Circular',
      category,
      size,
      condition,
      conditionDescription: conditionDescription.trim() || 'Well-cared-for garment in great shape.',
      material: material.trim(),
      color: color.trim(),
      originalRetailPrice: Number(originalRetailPrice),
      estimatedSwapValue: Number(estimatedSwapValue),
      swapTier: estimatedSwapValue >= 150 ? 5 : estimatedSwapValue >= 105 ? 4 : estimatedSwapValue >= 65 ? 3 : 2,
      lookingFor: lookingFor.trim() || 'Open to fair exchanges in M or versatile knitwear.',
      images: [selectedPhoto],
      ecoImpact: {
        co2SavedKg: Math.round((estimatedSwapValue * 0.14 + 5) * 10) / 10,
        waterSavedLitres: Math.round(estimatedSwapValue * 24 + 1000),
        textileWeightKg: 0.9
      }
    });

    setIsCreateListingOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div>
            <h2 className="font-display text-lg font-bold text-neutral-900">
              List Garment for Cashless Exchange
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Put unused clothing back into circulation. Earn swap parity credit.
            </p>
          </div>
          <button
            onClick={() => setIsCreateListingOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          {/* Photo Selection */}
          <div className="space-y-2">
            <label className="font-semibold text-neutral-900">
              Garment Photography Showcase
            </label>
            <div className="grid grid-cols-4 gap-3">
              {SAMPLE_PHOTO_CHOICES.map(photo => {
                const isSelected = selectedPhoto === photo.src;
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo.src)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      isSelected ? 'border-neutral-900 ring-2 ring-neutral-900' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-neutral-900 text-white rounded p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-neutral-900/70 text-white text-[9px] text-center py-0.5 truncate px-1">
                      {photo.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Garment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ribbed Merino Fisherman Cardigan"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Brand / Maker</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Studio Nicholson, Toast, Levi's Vintage"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Category, Size, Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Knitwear">Knitwear</option>
                <option value="Denim & Trousers">Denim &amp; Trousers</option>
                <option value="Dresses & Jumpsuits">Dresses &amp; Jumpsuits</option>
                <option value="Tops & Shirts">Tops &amp; Shirts</option>
                <option value="Shoes & Accessories">Shoes &amp; Accessories</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Size</label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. M / Chest 40 / 32W"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionType)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              >
                <option value="brand_new_tags">Brand New (Tags)</option>
                <option value="like_new">Like New (Worn &lt;3x)</option>
                <option value="gently_used">Gently Used</option>
                <option value="vintage_good">Vintage Character</option>
              </select>
            </div>
          </div>

          {/* Material & Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Material Composition</label>
              <input
                type="text"
                required
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. 100% Belgian Linen, Raw Denim, 80% Wool"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-900">Color Tone</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Charcoal Fleck, Washed Olive, Ecru"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Swap Value & Auto Calculate */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-neutral-700" />
                <span>Fair Swap Value Allocation</span>
              </span>
              <button
                type="button"
                onClick={handleAutoCalculate}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Auto-Calculate Fair Value</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-500">Original Retail ($)</label>
                <input
                  type="number"
                  value={originalRetailPrice}
                  onChange={(e) => setOriginalRetailPrice(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500">Calculated Swap Points</label>
                <input
                  type="number"
                  value={estimatedSwapValue}
                  onChange={(e) => setEstimatedSwapValue(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Condition Description */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-900">Condition Notes &amp; Fit Details</label>
            <textarea
              rows={2}
              value={conditionDescription}
              onChange={(e) => setConditionDescription(e.target.value)}
              placeholder="e.g. Kept folded with cedar blocks. No pilling or stretching, true to size..."
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* Wishlist / What I'm Looking For */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-900">What Are You Looking to Swap For?</label>
            <input
              type="text"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              placeholder="e.g. Heavyweight workwear overshirts, raw denim in 32W, or oversized trench..."
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setIsCreateListingOpen(false)}
              className="px-4 py-2 font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
            >
              Publish Garment to Exchange Pool
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
