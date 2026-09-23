import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { Plus, ArrowLeftRight, User, ShieldCheck, ChevronDown, Check, FileText } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    switchUserById, 
    activeTab, 
    setActiveTab, 
    swapRequests, 
    setIsCreateListingOpen,
    setIsProjectReportOpen
  } = useSwap();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Count pending incoming requests for current user
  const incomingPendingCount = swapRequests.filter(
    r => r.receiverId === currentUser.id && (r.status === 'pending' || r.status === 'counter_offered')
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('browse')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
                ReThread
              </span>
              <span className="sr-only">Clothing Exchange & Swap Marketplace</span>
            </button>
          </div>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => setActiveTab('browse')}
              className={`transition-colors relative py-1 focus:outline-none ${
                activeTab === 'browse' 
                  ? 'text-neutral-900 font-semibold' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Browse Garments
              {activeTab === 'browse' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`transition-colors relative py-1 focus:outline-none ${
                activeTab === 'calculator' 
                  ? 'text-neutral-900 font-semibold' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Swap Calculator
              {activeTab === 'calculator' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition-colors relative py-1 flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'dashboard' 
                  ? 'text-neutral-900 font-semibold' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Wardrobe
              {incomingPendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
              {activeTab === 'dashboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`transition-colors relative py-1 flex items-center gap-1.5 focus:outline-none ${
                activeTab === 'messages' 
                  ? 'text-neutral-900 font-semibold' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Negotiations
              {activeTab === 'messages' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`transition-colors relative py-1 flex items-center gap-1 focus:outline-none ${
                activeTab === 'admin' 
                  ? 'text-neutral-900 font-semibold' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Admin Panel
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & Demo User Switcher */}
          <div className="flex items-center gap-3">
            {/* User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors focus:outline-none text-left"
                title="Switch active demo account"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:block text-xs">
                  <p className="font-semibold text-neutral-900 leading-tight truncate max-w-[100px]">
                    {currentUser.name}
                  </p>
                  <p className="text-neutral-500 text-[10px] leading-tight">
                    {currentUser.role === 'admin' ? 'Admin' : `${currentUser.completedSwaps} swaps`}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-neutral-100 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                    Switch Active Persona (Evaluation)
                  </div>
                  {allUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchUserById(user.id);
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-50 transition-colors ${
                        currentUser.id === user.id ? 'bg-neutral-50/80 font-medium' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs text-neutral-900 flex items-center gap-1">
                            {user.name}
                            {user.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {user.role === 'admin' ? 'Moderator & Dispute Lead' : user.location}
                          </div>
                        </div>
                      </div>
                      {currentUser.id === user.id && (
                        <Check className="w-3.5 h-3.5 text-neutral-900" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Report (.doc) Action */}
            <button
              onClick={() => setIsProjectReportOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors shadow-xs whitespace-nowrap focus:outline-none cursor-pointer"
              title="View and download official Project Report document (.doc)"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-600" />
              <span>Report .doc</span>
            </button>

            {/* Primary Action Button: List Garment */}
            <button
              onClick={() => setIsCreateListingOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap focus:outline-none"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Garment</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-100 px-2 py-2 bg-neutral-50/80 text-xs">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-2 py-1 ${activeTab === 'browse' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
        >
          Browse
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2 py-1 ${activeTab === 'calculator' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2 py-1 relative ${activeTab === 'dashboard' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
        >
          Wardrobe
          {incomingPendingCount > 0 && <span className="absolute top-1 right-0 w-1.5 h-1.5 bg-amber-500 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-2 py-1 ${activeTab === 'messages' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
        >
          Negotiate
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-2 py-1 ${activeTab === 'admin' ? 'font-semibold text-neutral-900' : 'text-neutral-500'}`}
        >
          Admin
        </button>
        <button
          onClick={() => setIsProjectReportOpen(true)}
          className="px-2 py-1 text-neutral-700 font-medium flex items-center gap-0.5"
        >
          <FileText className="w-3 h-3 text-neutral-500" />
          <span>Report</span>
        </button>
      </div>
    </header>
  );
};
