import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { calculateTradeFairness } from '../utils/calculator';
import { COMMUNITY_SAFE_SPOTS } from '../data/mockData';
import { ExchangeMethod } from '../types';
import { 
  X, 
  ArrowLeftRight, 
  MapPin, 
  Truck, 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Check 
} from 'lucide-react';

export const SwapRequestModal: React.FC = () => {
  const {
    activeSwapProposalTarget,
    setActiveSwapProposalTarget,
    currentUser,
    items,
    createSwapRequest,
    setActiveTab,
    setActiveNegotiationSwapId,
    setIsCreateListingOpen
  } = useSwap();

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [exchangeMethod, setExchangeMethod] = useState<ExchangeMethod>('local_meetup');
  const [selectedSafeSpot, setSelectedSafeSpot] = useState(COMMUNITY_SAFE_SPOTS[0]);
  const [proposalNote, setProposalNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeSwapProposalTarget) return null;

  // Current user's available items
  const userItems = items.filter(
    item => item.ownerId === currentUser.id && item.status === 'available'
  );

  const offeredGarments = userItems.filter(i => selectedItemIds.includes(i.id));
  const fairness = calculateTradeFairness(activeSwapProposalTarget, offeredGarments);

  const toggleItemSelection = (id: string) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemIds.length === 0) return;

    setIsSubmitting(true);
    try {
      const newSwap = createSwapRequest({
        requestedItemId: activeSwapProposalTarget.id,
        offeredItemIds: selectedItemIds,
        proposalNote: proposalNote.trim() || `Hi ${activeSwapProposalTarget.ownerName}! I'm proposing an exchange for your "${activeSwapProposalTarget.title}".`,
        exchangeMethod,
        meetupDetails: exchangeMethod === 'local_meetup' ? {
          spotName: selectedSafeSpot.name,
          address: selectedSafeSpot.address,
          scheduledTime: 'To be confirmed in chat'
        } : undefined
      });

      setActiveSwapProposalTarget(null);
      setActiveNegotiationSwapId(newSwap.id);
      setActiveTab('messages');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div>
            <h2 className="font-display text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-neutral-700" />
              <span>Propose Zero-Cash Garment Swap</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Select one or more pieces from your wardrobe to offer {activeSwapProposalTarget.ownerName}.
            </p>
          </div>
          <button
            onClick={() => setActiveSwapProposalTarget(null)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Target Garment Card */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activeSwapProposalTarget.images[0]}
                alt={activeSwapProposalTarget.title}
                className="w-16 h-16 rounded-lg object-cover border border-neutral-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs space-y-1">
                <div className="text-neutral-500">
                  Target Piece · Owned by <span className="font-medium text-neutral-800">{activeSwapProposalTarget.ownerName}</span>
                </div>
                <h4 className="font-semibold text-neutral-900 text-sm leading-tight">
                  {activeSwapProposalTarget.title}
                </h4>
                <div className="text-neutral-500 flex items-center gap-2">
                  <span>{activeSwapProposalTarget.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSwapProposalTarget.size}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-neutral-900">{activeSwapProposalTarget.estimatedSwapValue} Swap Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Wardrobe Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">
                Choose Garment(s) From Your Wardrobe to Offer:
              </span>
              <span className="text-neutral-500">
                {userItems.length} active pieces in your closet
              </span>
            </div>

            {userItems.length === 0 ? (
              <div className="text-center p-6 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 space-y-2">
                <p className="text-xs text-neutral-600">
                  You don't have any available garments listed in your wardrobe yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSwapProposalTarget(null);
                    setIsCreateListingOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  List a Garment First
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-1">
                {userItems.map(item => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemSelection(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-neutral-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-xs truncate">
                          <p className="font-medium text-neutral-900 truncate">{item.title}</p>
                          <p className="text-neutral-500 text-[11px] truncate">
                            {item.brand} · {item.size}
                          </p>
                          <p className="font-mono text-neutral-700 font-semibold text-[11px]">
                            {item.estimatedSwapValue} pts
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-neutral-900 text-white' : 'border border-neutral-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Fair Trade Parity Gauge */}
          {selectedItemIds.length > 0 && (
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Fair Trade Parity Index</span>
                </span>
                <span className="font-mono font-bold text-neutral-900 tabular-nums">
                  {fairness.score}% Match Parity
                </span>
              </div>

              {/* Parity Bar */}
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    fairness.score >= 85 ? 'bg-emerald-600' : fairness.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(15, fairness.score))}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>{fairness.summary}</span>
                <span className="font-mono">
                  Offered: {fairness.offeredTotalPoints} pts vs Target: {fairness.targetPoints} pts
                </span>
              </div>
            </div>
          )}

          {/* Exchange Method Selection */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-neutral-900">
              Exchange Method:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label 
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 transition-colors ${
                  exchangeMethod === 'local_meetup' 
                    ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-neutral-900">
                    <MapPin className="w-4 h-4 text-neutral-700" />
                    <span>Local Community Meetup</span>
                  </div>
                  <input
                    type="radio"
                    name="exchangeMethod"
                    value="local_meetup"
                    checked={exchangeMethod === 'local_meetup'}
                    onChange={() => setExchangeMethod('local_meetup')}
                    className="accent-neutral-900"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  Inspect garments in person at a verified safe public hub (library, eco center).
                </p>
              </label>

              <label 
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 transition-colors ${
                  exchangeMethod === 'eco_courier' 
                    ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-neutral-900">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>GreenPost Eco-Courier</span>
                  </div>
                  <input
                    type="radio"
                    name="exchangeMethod"
                    value="eco_courier"
                    checked={exchangeMethod === 'eco_courier'}
                    onChange={() => setExchangeMethod('eco_courier')}
                    className="accent-neutral-900"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  Zero-emission e-bike &amp; electric van delivery with prepaid swap labels.
                </p>
              </label>
            </div>

            {/* Local safe spots selector */}
            {exchangeMethod === 'local_meetup' && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[11px] font-medium text-neutral-600">
                  Select Suggested Public Safe Exchange Spot:
                </span>
                <select
                  value={selectedSafeSpot.name}
                  onChange={(e) => {
                    const spot = COMMUNITY_SAFE_SPOTS.find(s => s.name === e.target.value);
                    if (spot) setSelectedSafeSpot(spot);
                  }}
                  className="w-full text-xs py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
                >
                  {COMMUNITY_SAFE_SPOTS.map(spot => (
                    <option key={spot.name} value={spot.name}>
                      {spot.name} ({spot.address})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-500">
                  {selectedSafeSpot.notes}
                </p>
              </div>
            )}
          </div>

          {/* Proposal Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-900">
              Proposal Note to {activeSwapProposalTarget.ownerName}:
            </label>
            <textarea
              rows={2}
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              placeholder="e.g. Hi! I'd love to swap for this coat. My piece has been worn once and matches your style wishlist..."
              className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveSwapProposalTarget(null)}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedItemIds.length === 0 || isSubmitting}
              className={`px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors shadow-xs ${
                selectedItemIds.length === 0
                  ? 'bg-neutral-300 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-800'
              }`}
            >
              {isSubmitting ? 'Dispatching Proposal...' : 'Send Swap Proposal'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
