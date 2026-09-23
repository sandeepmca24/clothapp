import { 
  CategoryType, 
  BrandTierType, 
  ConditionType, 
  ValuationFormValues, 
  ValuationBreakdown,
  ClothingItem 
} from '../types';

export const CATEGORY_MULTIPLIERS: Record<CategoryType, number> = {
  'Outerwear': 1.35,
  'Knitwear': 1.10,
  'Denim & Trousers': 1.15,
  'Dresses & Jumpsuits': 1.10,
  'Tops & Shirts': 0.85,
  'Shoes & Accessories': 0.95,
};

export const BRAND_TIER_MULTIPLIERS: Record<BrandTierType, number> = {
  'luxury_designer': 1.15,
  'sustainable_indie': 1.00,
  'vintage_heritage': 0.95,
  'contemporary_highstreet': 0.70,
};

export const CONDITION_MULTIPLIERS: Record<ConditionType, number> = {
  'brand_new_tags': 1.0,
  'like_new': 0.88,
  'gently_used': 0.72,
  'vintage_good': 0.80,
};

export const MATERIAL_BONUS: Record<string, number> = {
  '100% Natural/Organic': 1.15,
  'Natural Blend': 1.05,
  'Recycled Tech': 1.08,
  'Synthetic/Polyester': 0.85,
};

/**
 * Calculates fair swap points and tier for an item
 */
export function calculateSwapValuation(values: ValuationFormValues): ValuationBreakdown {
  const catMult = CATEGORY_MULTIPLIERS[values.category] || 1.0;
  const brandMult = BRAND_TIER_MULTIPLIERS[values.brandTier] || 0.85;
  const condMult = CONDITION_MULTIPLIERS[values.condition] || 0.75;
  const matMult = MATERIAL_BONUS[values.materialPurity] || 1.0;

  // Age factor: Vintage garments (>= 15 years) retain or appreciate; 2-5 year items depreciate slightly
  let ageMult = 1.0;
  if (values.garmentAgeYears >= 15) {
    ageMult = 1.15; // vintage appreciation
  } else if (values.garmentAgeYears > 4) {
    ageMult = 0.85;
  } else if (values.garmentAgeYears > 1) {
    ageMult = 0.92;
  }

  // Base calculation normalized to 10-250 swap points
  const rawPriceFactor = Math.min(600, Math.max(25, values.originalPrice));
  const rawPoints = (rawPriceFactor * 0.35) * catMult * brandMult * condMult * matMult * ageMult;
  const swapValuePoints = Math.round(Math.min(250, Math.max(15, rawPoints)));

  // Tier determination
  let swapTier: 1 | 2 | 3 | 4 | 5 = 1;
  let tierLabel = 'Tier 1 · Everyday Essentials';
  let tierDescription = 'Basics, everyday casual staples, and entry-level garments.';
  
  if (swapValuePoints >= 150) {
    swapTier = 5;
    tierLabel = 'Tier 5 · Archival & Luxury Heritage';
    tierDescription = 'Collector outerwear, archival designer garments, and pure cashmere/wool coats.';
  } else if (swapValuePoints >= 105) {
    swapTier = 4;
    tierLabel = 'Tier 4 · Premium Sustainable & Tailoring';
    tierDescription = 'High-end sustainable knitwear, selvedge denim, and structured jackets.';
  } else if (swapValuePoints >= 65) {
    swapTier = 3;
    tierLabel = 'Tier 3 · Contemporary Quality';
    tierDescription = 'Natural fiber dresses, fine wool knits, and durable modern wardrobe staples.';
  } else if (swapValuePoints >= 35) {
    swapTier = 2;
    tierLabel = 'Tier 2 · Elevated Daily Wear';
    tierDescription = 'Quality linen shirts, chore tops, and well-maintained casual trousers.';
  }

  // Ecological impact estimation
  // Average garment production footprints: ~1.2kg fabric, ~2700L water, ~14kg CO2
  const co2SavedKg = Math.round((swapValuePoints * 0.12 + 6.5) * 10) / 10;
  const waterSavedLitres = Math.round(swapValuePoints * 22 + 1200);

  // Recommended swap categories
  const recommendedSwapCategories: CategoryType[] = [];
  if (swapTier >= 4) {
    recommendedSwapCategories.push('Outerwear', 'Denim & Trousers', 'Knitwear');
  } else if (swapTier >= 3) {
    recommendedSwapCategories.push('Dresses & Jumpsuits', 'Knitwear', 'Denim & Trousers');
  } else {
    recommendedSwapCategories.push('Tops & Shirts', 'Shoes & Accessories', 'Dresses & Jumpsuits');
  }

  return {
    swapValuePoints,
    swapTier,
    tierLabel,
    tierDescription,
    co2SavedKg,
    waterSavedLitres,
    recommendedSwapCategories,
    fairnessBand: {
      min: Math.max(10, Math.round(swapValuePoints * 0.82)),
      max: Math.round(swapValuePoints * 1.18),
    }
  };
}

/**
 * Calculates trade fairness parity percentage between a requested item and offered item(s)
 * 100% = perfectly fair balance
 */
export function calculateTradeFairness(
  targetItem: ClothingItem, 
  offeredItems: ClothingItem[]
): {
  score: number; // 0 - 100
  status: 'fair' | 'favorable_to_receiver' | 'favorable_to_requester';
  summary: string;
  offeredTotalPoints: number;
  targetPoints: number;
  difference: number;
} {
  const targetPoints = targetItem.estimatedSwapValue;
  const offeredTotalPoints = offeredItems.reduce((acc, it) => acc + it.estimatedSwapValue, 0);

  if (offeredTotalPoints === 0) {
    return {
      score: 0,
      status: 'favorable_to_requester',
      summary: 'No items selected to offer yet.',
      offeredTotalPoints: 0,
      targetPoints,
      difference: -targetPoints
    };
  }

  const ratio = offeredTotalPoints / targetPoints;
  const difference = offeredTotalPoints - targetPoints;

  // Fairness score curve
  let score: number;
  if (ratio >= 0.85 && ratio <= 1.15) {
    score = Math.round(92 + (1 - Math.abs(1 - ratio) / 0.15) * 8);
  } else if (ratio >= 0.70 && ratio < 0.85) {
    score = Math.round(75 + ((ratio - 0.70) / 0.15) * 16);
  } else if (ratio > 1.15 && ratio <= 1.35) {
    score = Math.round(80 + ((1.35 - ratio) / 0.20) * 12);
  } else if (ratio < 0.70) {
    score = Math.max(30, Math.round(ratio * 100));
  } else {
    score = Math.max(50, Math.round((1.5 - (ratio - 1.35)) * 50));
  }

  let status: 'fair' | 'favorable_to_receiver' | 'favorable_to_requester' = 'fair';
  let summary = 'Equitable balance. Both garments hold compatible swap weight.';

  if (ratio > 1.18) {
    status = 'favorable_to_receiver';
    summary = `Generous offer (+${difference} swap pts). High acceptance likelihood.`;
  } else if (ratio < 0.82) {
    status = 'favorable_to_requester';
    summary = `Points gap of ${Math.abs(difference)} pts. Consider bundling a 2nd garment or accessory.`;
  }

  return {
    score,
    status,
    summary,
    offeredTotalPoints,
    targetPoints,
    difference
  };
}
