import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Shirt, 
  Scale, 
  Check, 
  X, 
  Search, 
  FileText 
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const {
    items,
    allUsers,
    disputes,
    swapRequests,
    moderateItem,
    resolveDispute,
    toggleUserVerification,
    setActiveItemModal
  } = useSwap();

  const [adminTab, setAdminTab] = useState<'analytics' | 'listings' | 'disputes' | 'users'>('analytics');
  const [resolutionInput, setResolutionInput] = useState<Record<string, string>>({});

  // KPI Calculations
  const totalListings = items.length;
  const completedSwapsCount = swapRequests.filter(s => s.status === 'completed').length;
  const activeNegotiationsCount = swapRequests.filter(s => s.status === 'negotiating' || s.status === 'accepted').length;
  const totalFabricsSavedKg = items.reduce((acc, i) => acc + i.ecoImpact.textileWeightKg, 0) + (completedSwapsCount * 1.8);
  const totalWaterSavedKL = Math.round((items.reduce((acc, i) => acc + i.ecoImpact.waterSavedLitres, 0) + (completedSwapsCount * 3600)) / 1000);
  const conversionRate = swapRequests.length > 0 
    ? Math.round((completedSwapsCount / swapRequests.length) * 100) 
    : 38;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Platform Governance &amp; Moderation</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            Community Administration Center
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Ensure authentic textile fibers, equitable valuations, and dispute mediation across NYC swap hubs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'analytics' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            KPI Analytics
          </button>
          <button
            onClick={() => setAdminTab('listings')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'listings' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Listings Moderation ({items.filter(i => !i.isModerated).length})
          </button>
          <button
            onClick={() => setAdminTab('disputes')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'disputes' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Disputes Queue ({disputes.filter(d => d.status !== 'resolved').length})
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'users' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            User Verification ({allUsers.length})
          </button>
        </div>
      </div>

      {/* Tab 1: KPI Analytics Overview */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Total Garment Listings</span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                {totalListings}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">● 100% Peer Circulated</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Completed Swaps</span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                {completedSwapsCount}
              </div>
              <span className="text-[11px] text-neutral-500">
                {activeNegotiationsCount} in negotiation
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Fabrics Saved from Landfill</span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums">
                {totalFabricsSavedKg.toFixed(1)} kg
              </div>
              <span className="text-[11px] text-neutral-500">
                Avg 1.2kg per piece
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <span className="text-xs text-neutral-500 font-medium">Swap Conversion Rate</span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                {conversionRate}%
              </div>
              <span className="text-[11px] text-neutral-500">Proposal to handshake</span>
            </div>

          </div>

          {/* Environmental Ledger Card */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-display text-lg font-bold">
              Aggregated Environmental Conservation Ledger
            </h3>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              By exchanging rather than purchasing new garments, community members have prevented extensive water extraction and synthetic textile landfill contamination.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-400">Total Clean Water Conserved</span>
                <p className="font-mono text-xl sm:text-2xl font-bold text-sky-400 mt-1 tabular-nums">
                  {totalWaterSavedKL.toLocaleString()} Thousand Liters
                </p>
              </div>
              <div>
                <span className="text-neutral-400">Displaced CO2 Emissions</span>
                <p className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                  {(totalFabricsSavedKg * 14.2).toFixed(0)} kg CO2e
                </p>
              </div>
              <div>
                <span className="text-neutral-400">Zero-Emission Courier Share</span>
                <p className="font-mono text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                  100% GreenPost Fleet
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Listings Moderation */}
      {adminTab === 'listings' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Review listed garments for accurate material tags, condition honesty, and fair valuation scores.
          </p>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-neutral-100 text-xs">
              {items.map(item => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">{item.title}</span>
                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-500 font-mono">{item.brand} ({item.size})</span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        Owner: {item.ownerName} · Value: {item.estimatedSwapValue} pts · {item.material}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveItemModal(item)}
                      className="px-2.5 py-1 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                    >
                      Inspect
                    </button>
                    {item.isModerated ? (
                      <button
                        onClick={() => moderateItem(item.id, 'flag')}
                        className="px-2.5 py-1 text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                      >
                        Flag for Review
                      </button>
                    ) : (
                      <button
                        onClick={() => moderateItem(item.id, 'approve')}
                        className="px-2.5 py-1 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors font-semibold"
                      >
                        Approve Verified
                      </button>
                    )}
                    <button
                      onClick={() => moderateItem(item.id, 'remove')}
                      className="px-2.5 py-1 text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                    >
                      Take Down
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Disputes Queue */}
      {adminTab === 'disputes' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Mediation tickets submitted by swappers regarding garment condition mismatches or unfulfilled commitments.
          </p>

          <div className="space-y-4">
            {disputes.map(disp => (
              <div
                key={disp.id}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{disp.reason}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-500">Reported against {disp.accusedParty}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                    disp.status === 'resolved' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {disp.status}
                  </span>
                </div>

                <p className="text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-100 leading-relaxed">
                  "{disp.description}"
                </p>

                {disp.resolution && (
                  <div className="text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200">
                    <span className="font-semibold">Resolution Note:</span> {disp.resolution}
                  </div>
                )}

                {disp.status !== 'resolved' && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Enter administrator resolution notes (e.g. Approved return courier label)..."
                      value={resolutionInput[disp.id] || ''}
                      onChange={(e) => setResolutionInput({ ...resolutionInput, [disp.id]: e.target.value })}
                      className="flex-1 p-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const note = resolutionInput[disp.id] || 'Mediated by moderator. Both parties agreed to return label.';
                        resolveDispute(disp.id, note);
                      }}
                      className="px-4 py-2 font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap"
                    >
                      Resolve Dispute
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: User Verification */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Community members directory. Verify trusted swappers who maintain high rating standards.
          </p>

          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-neutral-100 text-xs">
            {allUsers.map(user => (
              <div key={user.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                      {user.name}
                      {user.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="text-neutral-500 text-[11px]">
                      {user.location} · {user.completedSwaps} completed trades · ★ {user.rating}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleUserVerification(user.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    user.isVerified
                      ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {user.isVerified ? 'Remove Verification' : 'Grant Verified Badge'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
