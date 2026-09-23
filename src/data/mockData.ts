import { ClothingItem, UserProfile, SwapRequest, ChatMessage, DisputeTicket } from '../types';

import heroBannerImg from '../assets/images/hero_sustainable_swap_1790150740507.jpg';
import trenchCoatImg from '../assets/images/vintage_wool_trench_1790150755633.jpg';
import denimJacketImg from '../assets/images/raw_denim_jacket_1790150766952.jpg';
import knitSweaterImg from '../assets/images/chunky_knit_sweater_1790150778386.jpg';
import linenDressImg from '../assets/images/linen_summer_dress_1790150787852.jpg';

export { heroBannerImg };

export const COMMUNITY_SAFE_SPOTS = [
  {
    name: 'Greenpoint Library & Environmental Center',
    address: '107 Norman Ave, Brooklyn, NY 11222',
    zone: 'Brooklyn North',
    notes: 'Indoor public atrium with open seating and zero-waste swap shelf.'
  },
  {
    name: 'DUMBO Waterfront Eco Community Hub',
    address: '55 Water St, Brooklyn, NY 11201',
    zone: 'Brooklyn DUMBO',
    notes: 'Well-lit public concourse near Jane’s Carousel with bag inspection counter.'
  },
  {
    name: 'Lower East Side Ecology Center',
    address: '469 Grand St, New York, NY 10002',
    zone: 'Manhattan LES',
    notes: 'Sustainable community venue dedicated to textile recycling and clothing swaps.'
  },
  {
    name: 'Williamsburg Artisanal Transit Kiosk',
    address: 'Bedford Ave & N 7th St, Brooklyn, NY 11249',
    zone: 'Williamsburg',
    notes: 'Busy pedestrian plaza beside public transit entrance with high foot traffic.'
  }
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@rethread.org',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    location: 'Greenpoint, Brooklyn, NY',
    city: 'New York, NY',
    bio: 'Archival collector & circular fashion advocate. Swapping timeless, natural fibers instead of buying new.',
    rating: 4.95,
    completedSwaps: 24,
    savedTextileKg: 38.5,
    savedWaterLitres: 64200,
    isVerified: true,
    joinedDate: 'March 2025'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Chen',
    email: 'marcus.vintage@rethread.org',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    location: 'Lower East Side, NY',
    city: 'New York, NY',
    bio: 'Japanese selvedge denim enthusiast & workwear archivist. Open to fair swaps for durable outerwear.',
    rating: 4.9,
    completedSwaps: 18,
    savedTextileKg: 29.0,
    savedWaterLitres: 48500,
    isVerified: true,
    joinedDate: 'January 2025'
  },
  {
    id: 'user-aria',
    name: 'Aria Thorne',
    email: 'aria.thorne@rethread.org',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    location: 'Williamsburg, Brooklyn, NY',
    city: 'New York, NY',
    bio: 'Slow fashion capsule wardrobe curator. Focused on organic linen, heavy silk, and neutral minimalism.',
    rating: 5.0,
    completedSwaps: 14,
    savedTextileKg: 21.2,
    savedWaterLitres: 37800,
    isVerified: true,
    joinedDate: 'May 2025'
  },
  {
    id: 'user-admin',
    name: 'ReThread Moderator',
    email: 'moderation@rethread.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    location: 'Platform HQ, New York, NY',
    city: 'New York, NY',
    bio: 'Community standard verification, garment authenticity review, and swap dispute mediation.',
    rating: 5.0,
    completedSwaps: 112,
    savedTextileKg: 180.0,
    savedWaterLitres: 310000,
    isVerified: true,
    joinedDate: 'January 2024'
  }
];

export const INITIAL_ITEMS: ClothingItem[] = [
  {
    id: 'item-1',
    title: 'Double-Breasted Camel Wool Oversized Trench',
    brand: 'Studio Nicholson',
    category: 'Outerwear',
    size: 'M (Oversized Fit)',
    condition: 'like_new',
    conditionDescription: 'Worn twice to dry indoor events. Zero pilling, immaculate horn buttons, heavy drape.',
    material: '90% Virgin Wool, 10% Cashmere',
    color: 'Warm Camel / Honey',
    originalRetailPrice: 620,
    estimatedSwapValue: 185,
    swapTier: 5,
    lookingFor: 'Structured chore coat, selvedge denim jacket, or high-tier heavy knit cardigan.',
    city: 'New York',
    neighborhood: 'Greenpoint, Brooklyn',
    distanceKm: 2.1,
    ownerId: 'user-elena',
    ownerName: 'Elena Rostova',
    ownerRating: 4.95,
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 24,
    images: [trenchCoatImg],
    status: 'available',
    isModerated: true,
    isFeatured: true,
    ecoImpact: {
      co2SavedKg: 28.5,
      waterSavedLitres: 5300,
      textileWeightKg: 1.8
    },
    createdAt: '2026-09-18T10:14:00Z'
  },
  {
    id: 'item-2',
    title: '15oz Raw Indigo Selvedge Trucker Jacket',
    brand: 'Kuro Denim',
    category: 'Denim & Trousers',
    size: 'L (Chest 42")',
    condition: 'vintage_good',
    conditionDescription: 'Authentic early honeycombs fading at elbows. Stiff structured Kurabo selvedge with custom donut buttons.',
    material: '100% Zimbabwean Cotton Selvedge',
    color: 'Deep Raw Indigo',
    originalRetailPrice: 340,
    estimatedSwapValue: 125,
    swapTier: 4,
    lookingFor: 'Heavy gauge wool fisherman sweater, archival workwear pants, or vintage trench.',
    city: 'New York',
    neighborhood: 'Lower East Side',
    distanceKm: 3.8,
    ownerId: 'user-marcus',
    ownerName: 'Marcus Chen',
    ownerRating: 4.9,
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 18,
    images: [denimJacketImg],
    status: 'in_negotiation',
    isModerated: true,
    isFeatured: true,
    ecoImpact: {
      co2SavedKg: 21.0,
      waterSavedLitres: 3950,
      textileWeightKg: 1.2
    },
    createdAt: '2026-09-19T14:30:00Z'
  },
  {
    id: 'item-3',
    title: 'Hand-Ribbed Fisherman Crewneck in Oatmeal',
    brand: 'Inverallan Artisan',
    category: 'Knitwear',
    size: 'M',
    condition: 'like_new',
    conditionDescription: 'Substantial 5-gauge cable knit. Freshly wool-washed, stored flat with cedar blocks.',
    material: '100% Unbleached Merino Wool',
    color: 'Natural Oatmeal',
    originalRetailPrice: 290,
    estimatedSwapValue: 110,
    swapTier: 4,
    lookingFor: 'Raw denim jacket (size L), wide pleated wool trousers, or tailored coat.',
    city: 'New York',
    neighborhood: 'Greenpoint, Brooklyn',
    distanceKm: 1.5,
    ownerId: 'user-elena',
    ownerName: 'Elena Rostova',
    ownerRating: 4.95,
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 24,
    images: [knitSweaterImg],
    status: 'available',
    isModerated: true,
    isFeatured: true,
    ecoImpact: {
      co2SavedKg: 19.5,
      waterSavedLitres: 3600,
      textileWeightKg: 0.95
    },
    createdAt: '2026-09-20T08:45:00Z'
  },
  {
    id: 'item-4',
    title: 'Washed Sage Linen Relaxed Wrap Midi Dress',
    brand: 'Toast UK',
    category: 'Dresses & Jumpsuits',
    size: 'S / UK 10',
    condition: 'brand_new_tags',
    conditionDescription: 'Never worn, tags still attached. Pre-washed European flax with organic mother-of-pearl buttons.',
    material: '100% Belgian Organic Flax Linen',
    color: 'Dusty Sage Green',
    originalRetailPrice: 265,
    estimatedSwapValue: 95,
    swapTier: 3,
    lookingFor: 'Oatmeal merino sweater, pleated linen trousers, or structured leather tote.',
    city: 'New York',
    neighborhood: 'Williamsburg',
    distanceKm: 2.9,
    ownerId: 'user-aria',
    ownerName: 'Aria Thorne',
    ownerRating: 5.0,
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 14,
    images: [linenDressImg],
    status: 'available',
    isModerated: true,
    isFeatured: true,
    ecoImpact: {
      co2SavedKg: 16.8,
      waterSavedLitres: 3200,
      textileWeightKg: 0.65
    },
    createdAt: '2026-09-21T11:20:00Z'
  },
  {
    id: 'item-5',
    title: 'Pleated Japanese Wool Blend Wide Trousers',
    brand: 'Margaret Howell',
    category: 'Denim & Trousers',
    size: '32 Waist / 30 Inseam',
    condition: 'like_new',
    conditionDescription: 'High-rise silhouette with deep front pleats. Hem intact with generous allowance.',
    material: '85% Worsted Wool, 15% Linen',
    color: 'Charcoal Fleck',
    originalRetailPrice: 380,
    estimatedSwapValue: 120,
    swapTier: 4,
    lookingFor: 'Heavyweight knitwear or boxy overshirts in M/L.',
    city: 'New York',
    neighborhood: 'Lower East Side',
    distanceKm: 4.1,
    ownerId: 'user-marcus',
    ownerName: 'Marcus Chen',
    ownerRating: 4.9,
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 18,
    images: [trenchCoatImg],
    status: 'available',
    isModerated: true,
    isFeatured: false,
    ecoImpact: {
      co2SavedKg: 18.2,
      waterSavedLitres: 3400,
      textileWeightKg: 0.75
    },
    createdAt: '2026-09-15T15:10:00Z'
  },
  {
    id: 'item-6',
    title: 'Boxy French Canvas Workwear Overshirt',
    brand: 'Arpenteur',
    category: 'Tops & Shirts',
    size: 'M',
    condition: 'gently_used',
    conditionDescription: 'Softened through careful wear. No tears or stains, classic triple-needle chain stitching.',
    material: '100% Heavyweight French Cotton Twill',
    color: 'Bleu de Travail (Workwear Navy)',
    originalRetailPrice: 220,
    estimatedSwapValue: 70,
    swapTier: 3,
    lookingFor: 'Linen button-down shirts, canvas tote bag, or casual hats.',
    city: 'New York',
    neighborhood: 'Williamsburg',
    distanceKm: 3.2,
    ownerId: 'user-aria',
    ownerName: 'Aria Thorne',
    ownerRating: 5.0,
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 14,
    images: [denimJacketImg],
    status: 'available',
    isModerated: true,
    isFeatured: false,
    ecoImpact: {
      co2SavedKg: 14.0,
      waterSavedLitres: 2600,
      textileWeightKg: 0.6
    },
    createdAt: '2026-09-17T09:05:00Z'
  },
  {
    id: 'item-7',
    title: 'Handmade Tuscan Vachetta Leather Belt & Brass Buckle',
    brand: 'Il Bisonte',
    category: 'Shoes & Accessories',
    size: '34" (Adjustable 32-36)',
    condition: 'vintage_good',
    conditionDescription: 'Natural vegetable-tanned leather with a rich deep honey patina. Solid sand-cast brass hardware.',
    material: 'Vegetable Tanned Full Grain Cowhide',
    color: 'Caramel Patina',
    originalRetailPrice: 160,
    estimatedSwapValue: 50,
    swapTier: 2,
    lookingFor: 'Vintage scarves, knit beanies, or organic cotton tees.',
    city: 'New York',
    neighborhood: 'Greenpoint, Brooklyn',
    distanceKm: 1.8,
    ownerId: 'user-elena',
    ownerName: 'Elena Rostova',
    ownerRating: 4.95,
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    ownerSwapCount: 24,
    images: [chunky_knit_sweater_placeholder_or_img(knitSweaterImg)],
    status: 'available',
    isModerated: true,
    isFeatured: false,
    ecoImpact: {
      co2SavedKg: 9.5,
      waterSavedLitres: 1800,
      textileWeightKg: 0.35
    },
    createdAt: '2026-09-21T18:40:00Z'
  }
];

function chunky_knit_sweater_placeholder_or_img(img: string) {
  return img;
}

export const INITIAL_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'swap-101',
    requesterId: 'user-elena',
    requesterName: 'Elena Rostova',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    receiverId: 'user-marcus',
    receiverName: 'Marcus Chen',
    requestedItemId: 'item-2', // Marcus's 15oz Kuro Denim Jacket (125 pts)
    offeredItemIds: ['item-3'], // Elena's Inverallan Fisherman Crewneck (110 pts)
    status: 'negotiating',
    proposalNote: 'Hi Marcus! Love your Kurabo selvedge jacket. I have this pristine Inverallan unbleached merino fisherman knit that matches your requested wool wear.',
    counterOfferNote: 'Hi Elena, great piece! Since the denim has Kurabo heritage, would you be open to bundling the Tuscan leather belt or meeting in person at the LES Ecology Center to inspect?',
    counterOfferedItemIds: ['item-3', 'item-7'],
    exchangeMethod: 'local_meetup',
    meetupDetails: {
      spotName: 'Lower East Side Ecology Center',
      address: '469 Grand St, New York, NY 10002',
      scheduledTime: 'Saturday 2:00 PM',
      instructions: 'Meet inside by the community bulletin board. Clean garments in garment bags.'
    },
    fairnessScore: 92,
    createdAt: '2026-09-22T09:15:00Z',
    updatedAt: '2026-09-22T14:40:00Z'
  },
  {
    id: 'swap-102',
    requesterId: 'user-aria',
    requesterName: 'Aria Thorne',
    requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    receiverId: 'user-elena',
    receiverName: 'Elena Rostova',
    requestedItemId: 'item-1', // Elena's Studio Nicholson Camel Trench (185 pts)
    offeredItemIds: ['item-4', 'item-6'], // Aria's Linen wrap dress (95 pts) + Arpenteur overshirt (70 pts) = 165 pts
    status: 'accepted',
    proposalNote: 'Hello Elena! I’ve been looking for this exact Studio Nicholson trench cut for seasons. I’m bundling my brand new Toast organic linen dress plus the French canvas workwear overshirt.',
    exchangeMethod: 'eco_courier',
    courierDetails: {
      provider: 'GreenPost Zero-Emission Courier',
      trackingNumber: 'GP-ECO-882914-NYC',
      currentStage: 'in_transit',
      eta: 'Tomorrow by 4:00 PM',
      originCity: 'Williamsburg, Brooklyn',
      destinationCity: 'Greenpoint, Brooklyn'
    },
    fairnessScore: 89,
    createdAt: '2026-09-21T16:00:00Z',
    updatedAt: '2026-09-22T11:20:00Z'
  },
  {
    id: 'swap-103',
    requesterId: 'user-marcus',
    requesterName: 'Marcus Chen',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    receiverId: 'user-aria',
    receiverName: 'Aria Thorne',
    requestedItemId: 'item-4', // Aria's Washed Sage Linen Wrap Dress (95 pts)
    offeredItemIds: ['item-5'], // Marcus's Pleated Japanese Wool Trousers (120 pts)
    status: 'pending',
    proposalNote: 'Hi Aria! Looking to swap for a gift. My Margaret Howell pleated trousers are in like-new condition.',
    exchangeMethod: 'local_meetup',
    fairnessScore: 94,
    createdAt: '2026-09-22T19:30:00Z',
    updatedAt: '2026-09-22T19:30:00Z'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    swapId: 'swap-101',
    senderId: 'user-elena',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 9:15 AM',
    text: 'Hi Marcus! Love your Kurabo selvedge jacket. I have this pristine Inverallan unbleached merino fisherman knit that matches your requested wool wear.'
  },
  {
    id: 'msg-2',
    swapId: 'swap-101',
    senderId: 'user-marcus',
    senderName: 'Marcus Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 11:42 AM',
    text: 'Hey Elena! The Inverallan knit looks remarkable. The weight on the Kurabo jacket is 15oz, quite substantial. What are the chest measurements on the knit flat?'
  },
  {
    id: 'msg-3',
    swapId: 'swap-101',
    senderId: 'user-elena',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 1:15 PM',
    text: 'Pit to pit is exactly 21.5 inches flat, with natural rib stretch. Stored completely folded so the shoulders haven’t dropped at all.'
  },
  {
    id: 'msg-4',
    swapId: 'swap-101',
    senderId: 'user-marcus',
    senderName: 'Marcus Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 2:30 PM',
    text: 'That sounds perfect. I proposed meeting at the LES Ecology Center safe swap spot this Saturday at 2 PM. Does that work for you?'
  },
  {
    id: 'msg-5',
    swapId: 'swap-101',
    senderId: 'user-elena',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 3:10 PM',
    text: 'Saturday at 2 PM at LES Ecology Center is ideal! I will bring the garment in a protective breathable cotton bag.'
  },
  // Messages for swap 102
  {
    id: 'msg-10',
    swapId: 'swap-102',
    senderId: 'user-aria',
    senderName: 'Aria Thorne',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    timestamp: '2 days ago at 4:00 PM',
    text: 'Hello Elena! I’ve bundled my new Toast Belgian linen dress and the Arpenteur overshirt for your Studio Nicholson trench.'
  },
  {
    id: 'msg-11',
    swapId: 'swap-102',
    senderId: 'user-elena',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    timestamp: 'Yesterday at 11:20 AM',
    text: 'Proposal accepted! Dispatched via GreenPost Zero-Emission Courier. Tracking code: GP-ECO-882914-NYC.'
  }
];

export const INITIAL_DISPUTES: DisputeTicket[] = [
  {
    id: 'dsp-01',
    swapId: 'swap-past-88',
    reportedBy: 'user-marcus',
    accusedParty: 'Anonymous Member (ID: #usr-892)',
    reason: 'Condition Discrepancy',
    description: 'Item received was listed as "Like New" but showed collar fraying and missing care label. Requesting swap reversal.',
    status: 'under_review',
    createdAt: '2026-09-20T14:10:00Z',
    resolution: 'Mediation contacted both parties. Seller agreed to receive garment back via Eco-Courier return label.'
  },
  {
    id: 'dsp-02',
    swapId: 'swap-past-72',
    reportedBy: 'user-aria',
    accusedParty: 'VintageLover99',
    reason: 'Fabric Material Verification',
    description: 'Garment tag indicated 60% polyester blend despite description stating 100% mulberry silk.',
    status: 'resolved',
    createdAt: '2026-09-15T09:30:00Z',
    resolution: 'Dispute resolved in favor of reporter. Listing was removed and member received verification strike.'
  }
];
