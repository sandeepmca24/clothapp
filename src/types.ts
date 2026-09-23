export type CategoryType = 
  | 'Outerwear'
  | 'Knitwear'
  | 'Denim & Trousers'
  | 'Dresses & Jumpsuits'
  | 'Tops & Shirts'
  | 'Shoes & Accessories';

export type ConditionType = 
  | 'brand_new_tags'
  | 'like_new'
  | 'gently_used'
  | 'vintage_good';

export type BrandTierType = 
  | 'luxury_designer'
  | 'sustainable_indie'
  | 'contemporary_highstreet'
  | 'vintage_heritage';

export type SwapStatus = 
  | 'pending'
  | 'negotiating'
  | 'counter_offered'
  | 'accepted'
  | 'completed'
  | 'declined'
  | 'cancelled';

export type ExchangeMethod = 'local_meetup' | 'eco_courier';

export interface EcologicalImpact {
  co2SavedKg: number;
  waterSavedLitres: number;
  textileWeightKg: number;
}

export interface ClothingItem {
  id: string;
  title: string;
  brand: string;
  category: CategoryType;
  size: string;
  condition: ConditionType;
  conditionDescription: string;
  material: string;
  color: string;
  originalRetailPrice: number;
  estimatedSwapValue: number; // Swap points 10-250
  swapTier: 1 | 2 | 3 | 4 | 5;
  lookingFor: string;
  city: string;
  neighborhood: string;
  distanceKm: number;
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  ownerAvatar: string;
  ownerSwapCount: number;
  images: string[];
  status: 'available' | 'in_negotiation' | 'swapped';
  isModerated: boolean;
  isFeatured?: boolean;
  ecoImpact: EcologicalImpact;
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  receiverId: string;
  receiverName: string;
  requestedItemId: string;
  offeredItemIds: string[];
  status: SwapStatus;
  proposalNote: string;
  counterOfferNote?: string;
  counterOfferedItemIds?: string[];
  exchangeMethod: ExchangeMethod;
  meetupDetails?: {
    spotName: string;
    address: string;
    scheduledTime?: string;
    instructions?: string;
  };
  courierDetails?: {
    provider: string;
    trackingNumber: string;
    currentStage: 'label_created' | 'picked_up' | 'in_transit' | 'delivered';
    eta: string;
    originCity: string;
    destinationCity: string;
  };
  fairnessScore: number; // 0 - 100 percentage
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  swapId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  text: string;
  isSystemEvent?: boolean;
  systemActionType?: 'offer_submitted' | 'counter_offered' | 'swap_accepted' | 'courier_dispatched' | 'terms_confirmed';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
  location: string;
  city: string;
  bio: string;
  rating: number;
  completedSwaps: number;
  savedTextileKg: number;
  savedWaterLitres: number;
  isVerified: boolean;
  joinedDate: string;
}

export interface DisputeTicket {
  id: string;
  swapId: string;
  reportedBy: string;
  accusedParty: string;
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved';
  createdAt: string;
  resolution?: string;
}

export interface ValuationFormValues {
  category: CategoryType;
  brandTier: BrandTierType;
  originalPrice: number;
  condition: ConditionType;
  materialPurity: '100% Natural/Organic' | 'Natural Blend' | 'Synthetic/Polyester' | 'Recycled Tech';
  garmentAgeYears: number;
}

export interface ValuationBreakdown {
  swapValuePoints: number;
  swapTier: 1 | 2 | 3 | 4 | 5;
  tierLabel: string;
  tierDescription: string;
  co2SavedKg: number;
  waterSavedLitres: number;
  recommendedSwapCategories: CategoryType[];
  fairnessBand: {
    min: number;
    max: number;
  };
}
