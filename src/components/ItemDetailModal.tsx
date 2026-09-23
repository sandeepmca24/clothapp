import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { calculateTradeFairness } from '../utils/calculator';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  ArrowLeftRight, 
  Sparkles, 
  Droplet, 
  Wind, 
  Scale, 
  Check, 
  HelpCircle 
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { 
    activeItemModal, 
    setActiveItemModal, 
    currentUser, 
    items, 
    setActiveSwapProposalTarget,
    setActiveTab,
    setActiveNegotiationSwapId,
    swapRequests
  } = useSwap();

  const [selectedPreviewItem, setSelectedPreviewItem] = useState<string>('');

  if (!activeItemModal) return null;

  const isOwnItem = activeItemModal.ownerId === currentUser.id;
  const userWardrobe = items.filter(i => i.ownerId === currentUser.id && i.status === 'available');

  // Calculate parity against preview selected wardrobe item if any
  const previewItemObj = userWardrobe.find(i => i.id === selectedPreviewItem);
  const parity = previewItemObj 
    ? calculateTradeFairness(activeItemModal, [previewItemObj]) 
    : null;

  // Check if there is an active swap request for this item
  const existingSwap = swapRequests.find(
    r => (r.requestedItemId === activeItemModal.id || r.offeredItemIds.includes(activeItemModal.id)) &&
         (r.status === 'pending' || r.status === 'negotiating' || r.status === 'accepted')
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveItemModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 shadow-xs border border-neutral-200 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close modal</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          
          {/* Left Column: Visual Gallery */}
          <div className="md:col-span-6 bg-neutral-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 border border-neutral-200/80 shadow-xs">
              <img
                src={activeItemModal.images[0]}
                alt={activeItemModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-md text-white text-xs font-mono font-semibold px-2.5 py-1 rounded">
                {activeItemModal.estimatedSwapValue} Swap Points
              </div>
            </div>

            {/* Ecological Impact Diverted */}
            <div className="mt-6 p-4 bg-white/80 rounded-xl border border-neutral-200/80 space-y-3">
              <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Circular Impact of Exchanging This Piece</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <div className="font-mono font-bold text-neutral-900 tabular-nums">
                      {activeItemModal.ecoImpact.waterSavedLitres.toLocaleString()} L
                    </div>
                    <div className="text-[11px] text-neutral-500">Water saved</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-mono font-bold text-neutral-900 tabular-nums">
                      {activeItemModal.ecoImpact.co2SavedKg} kg
                    </div>
                    <div className="text-[11px] text-neutral-500">CO2e diverted</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Profile Snippet */}
            <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeItemModal.ownerAvatar}
                  alt={activeItemModal.ownerName}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1">
                    {activeItemModal.ownerName}
                    <span title="Verified Swap Member">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {activeItemModal.ownerSwapCount} successful swaps · ★ {activeItemModal.ownerRating}
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>{activeItemModal.neighborhood}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase / Swap Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Clean unboxed category header */}
              <div className="text-xs text-neutral-500 flex items-center gap-2">
                <span className="font-semibold text-neutral-900 uppercase tracking-wide">
                  {activeItemModal.brand}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeItemModal.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Est. Retail ${activeItemModal.originalRetailPrice}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {activeItemModal.title}
              </h2>

              {/* Garment Key Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-100 text-xs">
                <div>
                  <span className="text-neutral-400">Size:</span>
                  <p className="font-medium text-neutral-900">{activeItemModal.size}</p>
                </div>
                <div>
                  <span className="text-neutral-400">Condition:</span>
                  <p className="font-medium text-neutral-900 capitalize">
                    {activeItemModal.condition.replace(/_/g, ' ')}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-400">Fabric Composition:</span>
                  <p className="font-medium text-neutral-900">{activeItemModal.material}</p>
                </div>
                <div>
                  <span className="text-neutral-400">Color Palette:</span>
                  <p className="font-medium text-neutral-900">{activeItemModal.color}</p>
                </div>
              </div>

              {/* Condition notes */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-neutral-700">Condition Description:</span>
                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  {activeItemModal.conditionDescription}
                </p>
              </div>

              {/* What Owner is Looking For */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-1.5">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Owner's Swap Wishlist</span>
                </span>
                <p className="text-xs text-neutral-600 italic leading-relaxed">
                  "{activeItemModal.lookingFor}"
                </p>
              </div>

              {/* Interactive Trade Parity Estimator */}
              {!isOwnItem && userWardrobe.length > 0 && (
                <div className="p-3 bg-neutral-100/60 rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800">Quick Parity Test</span>
                    <span className="text-neutral-400 text-[11px]">Compare with your piece</span>
                  </div>
                  
                  <select
                    value={selectedPreviewItem}
                    onChange={(e) => setSelectedPreviewItem(e.target.value)}
                    className="w-full text-xs py-1.5 px-2 bg-white border border-neutral-200 rounded-md focus:outline-none"
                  >
                    <option value="">Select an item from your wardrobe to test fairness...</option>
                    {userWardrobe.map(wItem => (
                      <option key={wItem.id} value={wItem.id}>
                        {wItem.title} ({wItem.estimatedSwapValue} pts)
                      </option>
                    ))}
                  </select>

                  {parity && (
                    <div className="pt-1.5 text-xs flex items-center justify-between">
                      <span className="font-medium text-neutral-700">{parity.summary}</span>
                      <span className="font-mono font-bold text-neutral-900 tabular-nums">
                        {parity.score}% match
                      </span>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Bottom CTAs */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              {isOwnItem ? (
                <div className="text-center p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 font-medium">
                  This garment is currently in your listed wardrobe.
                </div>
              ) : existingSwap ? (
                <div className="space-y-2">
                  <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    A swap negotiation is already active for this piece.
                  </div>
                  <button
                    onClick={() => {
                      setActiveItemModal(null);
                      setActiveNegotiationSwapId(existingSwap.id);
                      setActiveTab('messages');
                    }}
                    className="w-full py-3 px-4 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Open Active Negotiation Chat
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const target = activeItemModal;
                    setActiveItemModal(null);
                    setActiveSwapProposalTarget(target);
                  }}
                  className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Propose Swap Offer</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
