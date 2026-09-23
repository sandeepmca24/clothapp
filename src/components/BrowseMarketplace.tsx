import React, { useMemo } from 'react';
import { useSwap } from '../context/SwapContext';
import { CategoryType, ConditionType, ClothingItem } from '../types';
import { 
  Search, 
  MapPin, 
  ArrowLeftRight, 
  SlidersHorizontal, 
  Sparkles,
  Check, 
  ChevronRight,
  Filter
} from 'lucide-react';

const CATEGORIES: (CategoryType | 'All')[] = [
  'All',
  'Outerwear',
  'Knitwear',
  'Denim & Trousers',
  'Dresses & Jumpsuits',
  'Tops & Shirts',
  'Shoes & Accessories'
];

const CONDITIONS: { label: string; value: ConditionType | 'All' }[] = [
  { label: 'All Conditions', value: 'All' },
  { label: 'Brand New (Tags)', value: 'brand_new_tags' },
  { label: 'Like New', value: 'like_new' },
  { label: 'Gently Used', value: 'gently_used' },
  { label: 'Vintage Patina', value: 'vintage_good' }
];

export const BrowseMarketplace: React.FC = () => {
  const {
    items,
    currentUser,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    maxDistanceKm,
    setMaxDistanceKm,
    sortBy,
    setSortBy,
    setActiveItemModal,
    setActiveSwapProposalTarget
  } = useSwap();

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Exclude items that are fully swapped
      if (item.status === 'swapped') return false;

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
        return false;
      }

      // Distance filter
      if (item.distanceKm > maxDistanceKm) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesMaterial = item.material.toLowerCase().includes(query);
        const matchesLookingFor = item.lookingFor.toLowerCase().includes(query);
        const matchesCity = item.neighborhood.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesMaterial && !matchesLookingFor && !matchesCity) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'swapValue') {
        return b.estimatedSwapValue - a.estimatedSwapValue;
      }
      if (sortBy === 'sustainableImpact') {
        return b.ecoImpact.co2SavedKg - a.ecoImpact.co2SavedKg;
      }
      // default: relevance / featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [items, selectedCategory, selectedCondition, maxDistanceKm, searchQuery, sortBy]);

  const conditionLabels: Record<ConditionType, string> = {
    brand_new_tags: 'Brand New (Tags)',
    like_new: 'Like New',
    gently_used: 'Gently Used',
    vintage_good: 'Vintage Character'
  };

  return (
    <div id="marketplace-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search and Location Filter Bar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Top row: Search input & sort dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by garment type, brand (Studio Nicholson, Kuro), material (merino, selvedge, linen)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/70 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 text-xs font-medium bg-neutral-50/70 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
            >
              <option value="relevance">Featured &amp; Relevance</option>
              <option value="distance">Closest to Me (Distance)</option>
              <option value="swapValue">Highest Swap Points</option>
              <option value="sustainableImpact">Greatest Eco Impact</option>
            </select>
          </div>
        </div>

        {/* Second row: Location Radius Segmented Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="text-neutral-600 font-medium">Distance Radius:</span>
            <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg">
              {[
                { label: '< 5 km Local', val: 5 },
                { label: '< 15 km Metro', val: 15 },
                { label: '< 50 km Regional', val: 50 },
                { label: 'All (Courier)', val: 500 }
              ].map(d => (
                <button
                  key={d.val}
                  onClick={() => setMaxDistanceKm(d.val)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    maxDistanceKm === d.val
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Condition selector dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Condition:</span>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as any)}
              className="py-1 px-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
            >
              {CONDITIONS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Third row: Interactive Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Active Filters Context */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <div>
          Showing <span className="font-semibold text-neutral-900 font-mono tabular-nums">{filteredItems.length}</span> verified garments ready for circular trade
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>Active user:</span>
          <span className="font-medium text-neutral-900">{currentUser.name}</span>
          <span aria-hidden="true">·</span>
          <span>Location: {currentUser.location}</span>
        </div>
      </div>

      {/* Product Card Grid (3-column on desktop, responsive) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8 space-y-3">
          <p className="font-display text-lg font-semibold text-neutral-900">
            No matching garments found
          </p>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            Try broadening your location radius or adjusting your search filters to view clothes available in other neighborhoods.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedCondition('All');
              setMaxDistanceKm(500);
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map(item => {
            const isOwnItem = item.ownerId === currentUser.id;

            return (
              <div
                key={item.id}
                className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                {/* Image Section (65%-70% visual focus on neutral surface) */}
                <div 
                  onClick={() => setActiveItemModal(item)}
                  className="relative aspect-[4/3] bg-neutral-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Fallback pattern if image is hidden */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-neutral-100 p-6 text-center text-xs text-neutral-400">
                    <span>{item.title}</span>
                  </div>

                  {/* Swap Points Badge (Quiet unboxed banner at top-right) */}
                  <div className="absolute top-3 right-3 bg-neutral-900/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono font-semibold tabular-nums shadow-xs">
                    {item.estimatedSwapValue} pts
                  </div>

                  {/* Distance Indicator */}
                  <div className="absolute bottom-3 left-3 bg-white/90 text-neutral-900 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 shadow-xs">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>{item.distanceKm} km · {item.neighborhood}</span>
                  </div>
                </div>

                {/* Card Body - Zero Pill Rule applied */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-900">{item.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.size}</span>
                      <span aria-hidden="true">·</span>
                      <span>{conditionLabels[item.condition]}</span>
                    </div>

                    <h3 
                      onClick={() => setActiveItemModal(item)}
                      className="font-semibold text-neutral-900 text-base leading-snug line-clamp-1 hover:text-neutral-600 cursor-pointer transition-colors"
                      title={item.title}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.material}
                    </p>
                  </div>

                  {/* What owner wants in return */}
                  <div className="pt-2.5 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-400 font-medium">Looking to swap for: </span>
                    <span className="text-neutral-700 italic line-clamp-1">
                      {item.lookingFor}
                    </span>
                  </div>

                  {/* Card Actions: Request Swap & Detail View */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                    {isOwnItem ? (
                      <button
                        onClick={() => setActiveItemModal(item)}
                        className="w-full py-2 px-3 text-xs font-semibold text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors text-center cursor-pointer"
                      >
                        Your Wardrobe Item (Inspect)
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setActiveSwapProposalTarget(item)}
                          className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                          <span>Propose Swap</span>
                        </button>
                        <button
                          onClick={() => setActiveItemModal(item)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer focus:outline-none"
                          title="View detailed garment specifications"
                        >
                          Details
                        </button>
                      </>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
