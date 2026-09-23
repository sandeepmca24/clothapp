import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { 
  ClothingItem, 
  SwapRequest 
} from '../types';
import { 
  Shirt, 
  ArrowLeftRight, 
  History, 
  Sparkles, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Plus, 
  MapPin, 
  ShieldCheck, 
  Droplet, 
  Wind,
  ExternalLink
} from 'lucide-react';

export const UserDashboardView: React.FC = () => {
  const {
    currentUser,
    items,
    swapRequests,
    deleteItem,
    acceptSwapRequest,
    declineSwapRequest,
    setActiveTab,
    setActiveNegotiationSwapId,
    setActiveItemModal,
    setIsCreateListingOpen
  } = useSwap();

  const [dashboardTab, setDashboardTab] = useState<'wardrobe' | 'incoming' | 'outgoing' | 'history'>('wardrobe');

  // Filter items owned by current user
  const myItems = items.filter(i => i.ownerId === currentUser.id);
  const myAvailableItems = myItems.filter(i => i.status !== 'swapped');

  // Filter requests
  const incomingRequests = swapRequests.filter(
    r => r.receiverId === currentUser.id && r.status !== 'completed' && r.status !== 'declined'
  );
  const outgoingRequests = swapRequests.filter(
    r => r.requesterId === currentUser.id && r.status !== 'completed' && r.status !== 'declined'
  );
  const completedSwaps = swapRequests.filter(
    r => (r.requesterId === currentUser.id || r.receiverId === currentUser.id) && r.status === 'completed'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Profile Header & Eco Impact Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">
                  {currentUser.name}
                </h1>
                {currentUser.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Member
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>{currentUser.location}</span>
                <span aria-hidden="true">·</span>
                <span>Member since {currentUser.joinedDate}</span>
              </p>
              <p className="text-xs text-neutral-600 max-w-xl leading-relaxed pt-1">
                {currentUser.bio}
              </p>
            </div>
          </div>

          {/* Sustainability Scorecard */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 grid grid-cols-3 gap-4 text-center min-w-[280px]">
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Swaps</div>
              <div className="font-mono text-xl font-bold text-neutral-900 tabular-nums">
                {currentUser.completedSwaps}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Textiles Kept</div>
              <div className="font-mono text-xl font-bold text-emerald-700 tabular-nums">
                {currentUser.savedTextileKg} kg
              </div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Water Saved</div>
              <div className="font-mono text-xl font-bold text-sky-700 tabular-nums">
                {(currentUser.savedWaterLitres / 1000).toFixed(1)} kL
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setDashboardTab('wardrobe')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            dashboardTab === 'wardrobe'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>My Wardrobe ({myAvailableItems.length})</span>
        </button>

        <button
          onClick={() => setDashboardTab('incoming')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            dashboardTab === 'incoming'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Incoming Requests ({incomingRequests.length})</span>
          {incomingRequests.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setDashboardTab('outgoing')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            dashboardTab === 'outgoing'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Outgoing Offers ({outgoingRequests.length})</span>
        </button>

        <button
          onClick={() => setDashboardTab('history')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            dashboardTab === 'history'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Completed Swaps ({completedSwaps.length})</span>
        </button>
      </div>

      {/* Tab 1: Wardrobe Items */}
      {dashboardTab === 'wardrobe' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              Garments you currently have listed for peer-to-peer exchange.
            </p>
            <button
              onClick={() => setIsCreateListingOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Garment</span>
            </button>
          </div>

          {myAvailableItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-3">
              <p className="font-display font-semibold text-neutral-800">
                Your wardrobe is currently empty
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                List outerwear, denim, or knitwear you no longer wear to begin receiving swap offers.
              </p>
              <button
                onClick={() => setIsCreateListingOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg"
              >
                List Your First Garment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myAvailableItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-neutral-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-neutral-900/90 text-white px-2 py-0.5 rounded text-xs font-mono font-semibold">
                      {item.estimatedSwapValue} pts
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500">
                        {item.brand} · {item.size}
                      </div>
                      <h4 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                        {item.material}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setActiveItemModal(item)}
                        className="font-medium text-neutral-700 hover:text-neutral-900"
                      >
                        Inspect Details
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Incoming Requests */}
      {dashboardTab === 'incoming' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Swap offers proposed by other members for garments in your wardrobe.
          </p>

          {incomingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              No pending incoming swap proposals right now.
            </div>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map(req => {
                const targetGarment = items.find(i => i.id === req.requestedItemId);
                const offeredGarments = items.filter(i => req.offeredItemIds.includes(i.id));

                return (
                  <div
                    key={req.id}
                    className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={req.requesterAvatar}
                          alt={req.requesterName}
                          className="w-7 h-7 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-semibold text-neutral-900">
                          {req.requesterName}
                        </span>
                        <span className="text-neutral-400 text-xs">wants to swap for your:</span>
                        <span className="text-xs font-bold text-neutral-900">
                          "{targetGarment?.title}"
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {req.fairnessScore}% Parity Match
                      </span>
                    </div>

                    {/* Offered Garments summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-500 font-medium">Offered in Exchange:</span>
                        <div className="mt-1 space-y-1">
                          {offeredGarments.map(og => (
                            <div key={og.id} className="flex items-center gap-2 bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                              <img src={og.images[0]} alt={og.title} className="w-8 h-8 rounded object-cover" referrerPolicy="no-referrer" />
                              <div className="truncate">
                                <p className="font-semibold text-neutral-900 truncate">{og.title}</p>
                                <p className="text-[10px] text-neutral-500">{og.brand} · {og.size} · {og.estimatedSwapValue} pts</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-neutral-500 font-medium">Proposal Message:</span>
                        <p className="mt-1 p-2 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-700 italic text-[11px] leading-relaxed">
                          "{req.proposalNote}"
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                      <button
                        onClick={() => {
                          setActiveNegotiationSwapId(req.id);
                          setActiveTab('messages');
                        }}
                        className="text-neutral-700 hover:text-neutral-900 font-medium flex items-center gap-1"
                      >
                        <span>Open Negotiation Room</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => declineSwapRequest(req.id)}
                              className="px-3 py-1.5 font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => acceptSwapRequest(req.id)}
                              className="px-4 py-1.5 font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
                            >
                              Accept Swap
                            </button>
                          </>
                        )}
                        {req.status === 'accepted' && (
                          <span className="font-semibold text-emerald-800">
                            Accepted · Coordinate Handshake
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Outgoing Offers */}
      {dashboardTab === 'outgoing' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Swap requests you have sent to other circular fashion members.
          </p>

          {outgoingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              You haven't submitted any outgoing swap proposals.
            </div>
          ) : (
            <div className="space-y-4">
              {outgoingRequests.map(req => {
                const targetGarment = items.find(i => i.id === req.requestedItemId);
                return (
                  <div
                    key={req.id}
                    className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="text-neutral-500">
                        Proposal to <span className="font-semibold text-neutral-900">{req.receiverName}</span>
                      </div>
                      <h4 className="font-semibold text-neutral-900 text-sm">
                        {targetGarment?.title}
                      </h4>
                      <div className="text-neutral-500">
                        Status: <span className="font-semibold capitalize text-neutral-800">{req.status.replace(/_/g, ' ')}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveNegotiationSwapId(req.id);
                        setActiveTab('messages');
                      }}
                      className="px-4 py-2 font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap"
                    >
                      View Live Discussion
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Completed Swaps Ledger */}
      {dashboardTab === 'history' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Historical ledger of garments successfully traded and kept out of landfills.
          </p>

          {completedSwaps.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              No completed swaps logged yet. Complete your first trade to begin logging your circular impact metrics!
            </div>
          ) : (
            <div className="space-y-3">
              {completedSwaps.map(req => {
                const targetGarment = items.find(i => i.id === req.requestedItemId);
                return (
                  <div
                    key={req.id}
                    className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900">
                        Swap Trade #{req.id.slice(-6)} · {targetGarment?.title}
                      </div>
                      <div className="text-neutral-500 text-[11px] mt-0.5">
                        Exchange completed with {req.requesterId === currentUser.id ? req.receiverName : req.requesterName}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-emerald-700 font-bold text-xs">
                        +1.6 kg fabric preserved
                      </span>
                      <div className="text-[10px] text-neutral-400">Zero monetary transaction</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
