import React, { useState, useEffect, useRef } from 'react';
import { useSwap } from '../context/SwapContext';
import { SwapRequest, ClothingItem } from '../types';
import { 
  Send, 
  ArrowLeftRight, 
  MapPin, 
  Truck, 
  Check, 
  X, 
  Clock, 
  ShieldAlert, 
  PackageCheck, 
  Scale, 
  MessageSquare,
  ChevronRight,
  Info
} from 'lucide-react';

export const NegotiationChatView: React.FC = () => {
  const {
    currentUser,
    swapRequests,
    items,
    chatMessages,
    sendChatMessage,
    acceptSwapRequest,
    declineSwapRequest,
    counterOfferSwapRequest,
    confirmSwapTerms,
    completeSwap,
    updateCourierStatus,
    activeNegotiationSwapId,
    setActiveNegotiationSwapId,
    submitDispute
  } = useSwap();

  const [messageInput, setMessageInput] = useState('');
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  const [counterNote, setCounterNote] = useState('');
  const [counterSelectedItems, setCounterSelectedItems] = useState<string[]>([]);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('Condition Mismatch');
  const [disputeDetails, setDisputeDetails] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Filter swap requests involving currentUser
  const userSwaps = swapRequests.filter(
    s => s.requesterId === currentUser.id || s.receiverId === currentUser.id
  );

  // Active selected swap
  const activeSwap = userSwaps.find(s => s.id === activeNegotiationSwapId) || userSwaps[0];

  useEffect(() => {
    if (activeSwap && (!activeNegotiationSwapId || activeNegotiationSwapId !== activeSwap.id)) {
      setActiveNegotiationSwapId(activeSwap.id);
    }
  }, [activeSwap, activeNegotiationSwapId, setActiveNegotiationSwapId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeSwap?.id]);

  if (userSwaps.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-bold text-neutral-900">
          No Active Swap Negotiations
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Propose an exchange on any listed garment or wait for fellow members to request items from your wardrobe.
        </p>
      </div>
    );
  }

  if (!activeSwap) return null;

  const targetItem = items.find(i => i.id === activeSwap.requestedItemId);
  const offeredItems = items.filter(i => activeSwap.offeredItemIds.includes(i.id));
  const isRequester = activeSwap.requesterId === currentUser.id;
  const isReceiver = activeSwap.receiverId === currentUser.id;
  const counterPartyName = isRequester ? activeSwap.receiverName : activeSwap.requesterName;

  // Active chat stream for this swap
  const currentMessages = chatMessages.filter(m => m.swapId === activeSwap.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage(activeSwap.id, messageInput);
    setMessageInput('');
  };

  const handleSendCounterOffer = () => {
    if (counterSelectedItems.length === 0) return;
    counterOfferSwapRequest(activeSwap.id, counterSelectedItems, counterNote);
    setIsCounterOfferOpen(false);
    setCounterNote('');
  };

  const handleRaiseDispute = (e: React.FormEvent) => {
    e.preventDefault();
    submitDispute(activeSwap.id, counterPartyName, disputeReason, disputeDetails);
    setIsDisputeOpen(false);
    setDisputeDetails('');
  };

  // Status badge styling
  const statusStyles: Record<string, string> = {
    pending: 'text-amber-800 bg-amber-50 border-amber-200',
    negotiating: 'text-blue-800 bg-blue-50 border-blue-200',
    counter_offered: 'text-purple-800 bg-purple-50 border-purple-200',
    accepted: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    completed: 'text-neutral-800 bg-neutral-100 border-neutral-300',
    declined: 'text-rose-800 bg-rose-50 border-rose-200'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Sidebar: Threads List (4 cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/50 flex flex-col">
          <div className="p-4 border-b border-neutral-200 bg-white">
            <h2 className="font-display font-bold text-neutral-900 text-sm">
              Swap Conversations &amp; Offers
            </h2>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Direct negotiations with verified circular members
            </p>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-neutral-100">
            {userSwaps.map((swap) => {
              const swapTarget = items.find(i => i.id === swap.requestedItemId);
              const isSelected = swap.id === activeSwap.id;
              const otherUser = swap.requesterId === currentUser.id ? swap.receiverName : swap.requesterName;

              return (
                <div
                  key={swap.id}
                  onClick={() => setActiveNegotiationSwapId(swap.id)}
                  className={`p-4 transition-colors cursor-pointer text-left flex items-start gap-3 ${
                    isSelected ? 'bg-white border-l-2 border-l-neutral-900' : 'hover:bg-neutral-100/60'
                  }`}
                >
                  {swapTarget && (
                    <img
                      src={swapTarget.images[0]}
                      alt={swapTarget.title}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-semibold text-neutral-900 truncate">
                        {otherUser}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border capitalize ${statusStyles[swap.status] || ''}`}>
                        {swap.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 truncate font-medium">
                      {swapTarget?.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Updated {new Date(swap.updatedAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Area: Negotiation Room & Live Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Top Pinned Swap Agreement Card */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/70 space-y-3">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900">Exchange Deal Room:</span>
                <span className="text-xs text-neutral-600 font-medium">{counterPartyName}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${statusStyles[activeSwap.status]}`}>
                  {activeSwap.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setIsDisputeOpen(true)}
                  className="text-neutral-500 hover:text-rose-700 flex items-center gap-1 transition-colors text-[11px]"
                  title="Report an issue to platform moderator"
                >
                  <ShieldAlert className="w-3 h-3 text-rose-500" />
                  <span>Report / Mediation</span>
                </button>
              </div>
            </div>

            {/* Side-by-side garment exchange parity review */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Requested item */}
              <div className="flex items-center gap-3">
                {targetItem && (
                  <img
                    src={targetItem.images[0]}
                    alt={targetItem.title}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="truncate">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
                    Requested Item ({targetItem?.ownerName})
                  </span>
                  <p className="font-semibold text-neutral-900 truncate">{targetItem?.title}</p>
                  <p className="font-mono text-neutral-600 text-[11px]">
                    {targetItem?.estimatedSwapValue} Swap Points
                  </p>
                </div>
              </div>

              {/* Offered item(s) */}
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-neutral-100 sm:pl-4 pt-2 sm:pt-0">
                <div className="flex -space-x-3 shrink-0">
                  {offeredItems.map((item, idx) => (
                    <img
                      key={item.id}
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
                    Offered Item(s) ({offeredItems.length})
                  </span>
                  <p className="font-semibold text-neutral-900 truncate">
                    {offeredItems.map(i => i.title).join(' + ')}
                  </p>
                  <p className="font-mono text-neutral-600 text-[11px]">
                    Total: {offeredItems.reduce((acc, i) => acc + i.estimatedSwapValue, 0)} Points · {activeSwap.fairnessScore}% Parity
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Handshake & Agreement Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              
              {/* Receiver can accept/counter if pending */}
              {isReceiver && activeSwap.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptSwapRequest(activeSwap.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Swap Deal</span>
                  </button>
                  <button
                    onClick={() => setIsCounterOfferOpen(true)}
                    className="px-3.5 py-1.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    Propose Counter-Offer
                  </button>
                  <button
                    onClick={() => declineSwapRequest(activeSwap.id)}
                    className="px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                </div>
              )}

              {/* Status indicator if counter offered */}
              {activeSwap.status === 'counter_offered' && (
                <div className="text-xs text-purple-900 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                  A counter-offer was proposed. Review terms in chat below.
                </div>
              )}

              {/* When accepted: Mark Completed or track delivery */}
              {activeSwap.status === 'accepted' && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => completeSwap(activeSwap.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Confirm Completed Handshake / Received</span>
                  </button>
                </div>
              )}

              {/* Exchange Details info */}
              <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                {activeSwap.exchangeMethod === 'local_meetup' ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Meetup Spot: {activeSwap.meetupDetails?.spotName || 'Public Center'}</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Courier: GreenPost Zero-Carbon</span>
                  </>
                )}
              </div>

            </div>

            {/* Courier Tracking Status Bar (Simulated Live Tracker for remote swaps) */}
            {activeSwap.exchangeMethod === 'eco_courier' && activeSwap.courierDetails && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-950 font-medium">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Live Eco-Courier Tracking: {activeSwap.courierDetails.trackingNumber}</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-700">ETA: {activeSwap.courierDetails.eta}</span>
                </div>

                {/* Progress Stages Stepper */}
                <div className="grid grid-cols-4 gap-1 text-center text-[10px] pt-1">
                  {[
                    { id: 'label_created', label: 'Label Created' },
                    { id: 'picked_up', label: 'Picked Up (E-Bike)' },
                    { id: 'in_transit', label: 'In Transit' },
                    { id: 'delivered', label: 'Delivered' }
                  ].map((step, idx) => {
                    const stages = ['label_created', 'picked_up', 'in_transit', 'delivered'];
                    const currentIdx = stages.indexOf(activeSwap.courierDetails!.currentStage);
                    const isPassed = idx <= currentIdx;
                    return (
                      <div key={step.id} className="space-y-1">
                        <div className={`h-1.5 rounded-full ${isPassed ? 'bg-emerald-600' : 'bg-neutral-200'}`} />
                        <span className={isPassed ? 'font-semibold text-emerald-900' : 'text-neutral-400'}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Courier simulator controls for user evaluation */}
                <div className="pt-2 flex items-center justify-between border-t border-emerald-200/60 text-[11px]">
                  <span className="text-emerald-800">Simulate Dispatch Pipeline:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateCourierStatus(activeSwap.id, 'picked_up')}
                      className="px-2 py-0.5 bg-white border border-emerald-300 rounded text-emerald-900 hover:bg-emerald-100 transition-colors"
                    >
                      Mark Picked Up
                    </button>
                    <button
                      onClick={() => updateCourierStatus(activeSwap.id, 'in_transit')}
                      className="px-2 py-0.5 bg-white border border-emerald-300 rounded text-emerald-900 hover:bg-emerald-100 transition-colors"
                    >
                      In Transit
                    </button>
                    <button
                      onClick={() => updateCourierStatus(activeSwap.id, 'delivered')}
                      className="px-2 py-0.5 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors font-medium"
                    >
                      Delivered
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[380px]">
            {currentMessages.length === 0 ? (
              <div className="text-center py-10 text-xs text-neutral-400">
                No messages yet. Send a note to discuss exchange logistics or garment measurements.
              </div>
            ) : (
              currentMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;

                if (msg.isSystemEvent) {
                  return (
                    <div key={msg.id} className="text-center my-3">
                      <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-neutral-200 mb-0.5"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs space-y-1 ${
                        isMe
                          ? 'bg-neutral-900 text-white rounded-br-xs'
                          : 'bg-neutral-100 text-neutral-900 rounded-bl-xs'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div
                        className={`text-[10px] text-right ${
                          isMe ? 'text-neutral-400' : 'text-neutral-400'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <div className="p-3 sm:p-4 border-t border-neutral-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${counterPartyName} regarding garment fit, pickup, or counter-terms...`}
                className="flex-1 px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 disabled:bg-neutral-200 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Modal: Propose Counter-Offer */}
      {isCounterOfferOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 border border-neutral-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-display font-bold text-neutral-900 text-base">
                Propose Counter-Offer
              </h3>
              <button onClick={() => setIsCounterOfferOpen(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            
            <p className="text-xs text-neutral-600">
              Select which item(s) from {counterPartyName}'s wardrobe you want in exchange:
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items
                .filter(i => i.ownerId === (isReceiver ? activeSwap.requesterId : activeSwap.receiverId))
                .map(item => {
                  const isChecked = counterSelectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCounterSelectedItems(prev => 
                          prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]
                        );
                      }}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer text-xs ${
                        isChecked ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'
                      }`}
                    >
                      <div className="truncate">
                        <span className="font-semibold text-neutral-900">{item.title}</span>
                        <div className="text-[11px] text-neutral-500 font-mono">{item.estimatedSwapValue} pts · {item.size}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="accent-neutral-900"
                      />
                    </div>
                  );
                })}
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-800">Counter Note / Rationale:</label>
              <textarea
                rows={2}
                value={counterNote}
                onChange={(e) => setCounterNote(e.target.value)}
                placeholder="Explain the modification (e.g. Please add the accessories belt to balance points)..."
                className="w-full mt-1 p-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setIsCounterOfferOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendCounterOffer}
                disabled={counterSelectedItems.length === 0}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg disabled:bg-neutral-300"
              >
                Submit Counter-Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dispute / Mediation Ticket */}
      {isDisputeOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleRaiseDispute} className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 border border-neutral-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-display font-bold text-neutral-900 text-base flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Request Swap Mediation</span>
              </h3>
              <button type="button" onClick={() => setIsDisputeOpen(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Our platform moderators review disputed condition claims, textile authenticity, and delivery delays.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-800">Dispute Reason:</label>
              <select
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              >
                <option value="Condition Discrepancy">Condition Discrepancy (Flaws/Damage not shown)</option>
                <option value="Material Authenticity">Material Authenticity (Fiber composition mismatch)</option>
                <option value="Delivery / Meetup No-Show">Delivery / Meetup No-Show</option>
                <option value="Unfair Negotiation Behavior">Unfair Negotiation Behavior</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-800">Incident Details:</label>
              <textarea
                rows={3}
                required
                value={disputeDetails}
                onChange={(e) => setDisputeDetails(e.target.value)}
                placeholder="Describe specifically what occurred and what resolution you request..."
                className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setIsDisputeOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors"
              >
                Submit to Admin Team
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
