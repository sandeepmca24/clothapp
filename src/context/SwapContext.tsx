import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClothingItem, 
  UserProfile, 
  SwapRequest, 
  ChatMessage, 
  DisputeTicket, 
  CategoryType, 
  ConditionType,
  ExchangeMethod
} from '../types';
import { 
  INITIAL_ITEMS, 
  MOCK_USERS, 
  INITIAL_SWAP_REQUESTS, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_DISPUTES,
  COMMUNITY_SAFE_SPOTS
} from '../data/mockData';
import { calculateTradeFairness } from '../utils/calculator';

interface SwapContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  setCurrentUser: (user: UserProfile) => void;
  switchUserById: (userId: string) => void;

  // Items
  items: ClothingItem[];
  addItem: (itemData: Partial<ClothingItem>) => ClothingItem;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  deleteItem: (id: string) => void;
  moderateItem: (itemId: string, action: 'approve' | 'flag' | 'remove') => void;

  // Swap Requests
  swapRequests: SwapRequest[];
  createSwapRequest: (params: {
    requestedItemId: string;
    offeredItemIds: string[];
    proposalNote: string;
    exchangeMethod: ExchangeMethod;
    meetupDetails?: any;
  }) => SwapRequest;
  acceptSwapRequest: (requestId: string) => void;
  declineSwapRequest: (requestId: string) => void;
  counterOfferSwapRequest: (requestId: string, offeredItemIds: string[], counterNote: string) => void;
  confirmSwapTerms: (requestId: string, details?: any) => void;
  completeSwap: (requestId: string) => void;
  updateCourierStatus: (requestId: string, stage: 'label_created' | 'picked_up' | 'in_transit' | 'delivered') => void;

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (swapId: string, text: string) => void;

  // Disputes & Moderation
  disputes: DisputeTicket[];
  submitDispute: (swapId: string, accusedParty: string, reason: string, description: string) => void;
  resolveDispute: (disputeId: string, resolution: string) => void;
  toggleUserVerification: (userId: string) => void;

  // Navigation & Modals
  activeTab: 'browse' | 'calculator' | 'dashboard' | 'messages' | 'admin';
  setActiveTab: (tab: 'browse' | 'calculator' | 'dashboard' | 'messages' | 'admin') => void;
  activeItemModal: ClothingItem | null;
  setActiveItemModal: (item: ClothingItem | null) => void;
  activeSwapProposalTarget: ClothingItem | null;
  setActiveSwapProposalTarget: (item: ClothingItem | null) => void;
  activeNegotiationSwapId: string | null;
  setActiveNegotiationSwapId: (swapId: string | null) => void;
  isCreateListingOpen: boolean;
  setIsCreateListingOpen: (open: boolean) => void;
  isProjectReportOpen: boolean;
  setIsProjectReportOpen: (open: boolean) => void;
  prefilledValuation: { points: number; category: CategoryType; brand: string } | null;
  setPrefilledValuation: (val: any) => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  selectedCondition: ConditionType | 'All';
  setSelectedCondition: (cond: ConditionType | 'All') => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  maxDistanceKm: number;
  setMaxDistanceKm: (dist: number) => void;
  sortBy: 'relevance' | 'distance' | 'swapValue' | 'sustainableImpact';
  setSortBy: (sort: 'relevance' | 'distance' | 'swapValue' | 'sustainableImpact') => void;

  // Notifications
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
  notify: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [items, setItems] = useState<ClothingItem[]>(INITIAL_ITEMS);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(INITIAL_SWAP_REQUESTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [disputes, setDisputes] = useState<DisputeTicket[]>(INITIAL_DISPUTES);

  // App navigation & modal state
  const [activeTab, setActiveTab] = useState<'browse' | 'calculator' | 'dashboard' | 'messages' | 'admin'>('browse');
  const [activeItemModal, setActiveItemModal] = useState<ClothingItem | null>(null);
  const [activeSwapProposalTarget, setActiveSwapProposalTarget] = useState<ClothingItem | null>(null);
  const [activeNegotiationSwapId, setActiveNegotiationSwapId] = useState<string | null>(null);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState<boolean>(false);
  const [isProjectReportOpen, setIsProjectReportOpen] = useState<boolean>(false);
  const [prefilledValuation, setPrefilledValuation] = useState<{ points: number; category: CategoryType; brand: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedCondition, setSelectedCondition] = useState<ConditionType | 'All'>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(50); // default 50km
  const [sortBy, setSortBy] = useState<'relevance' | 'distance' | 'swapValue' | 'sustainableImpact'>('relevance');

  // Notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const switchUserById = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showNotification(`Switched profile to ${found.name} (${found.role === 'admin' ? 'Platform Moderator' : found.location})`, 'info');
    }
  };

  // Item management
  const addItem = (itemData: Partial<ClothingItem>): ClothingItem => {
    const newItem: ClothingItem = {
      id: `item-${Date.now()}`,
      title: itemData.title || 'Untitled Garment',
      brand: itemData.brand || 'Unbranded / Vintage',
      category: itemData.category || 'Tops & Shirts',
      size: itemData.size || 'M',
      condition: itemData.condition || 'like_new',
      conditionDescription: itemData.conditionDescription || 'Good condition, kept carefully.',
      material: itemData.material || 'Natural Fibers',
      color: itemData.color || 'Neutral',
      originalRetailPrice: itemData.originalRetailPrice || 120,
      estimatedSwapValue: itemData.estimatedSwapValue || 50,
      swapTier: itemData.swapTier || 2,
      lookingFor: itemData.lookingFor || 'Open to fair exchanges in M or accessories.',
      city: currentUser.city || 'New York',
      neighborhood: currentUser.location || 'Greenpoint, Brooklyn',
      distanceKm: Math.round((Math.random() * 4 + 1) * 10) / 10,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerRating: currentUser.rating,
      ownerAvatar: currentUser.avatar,
      ownerSwapCount: currentUser.completedSwaps,
      images: itemData.images && itemData.images.length > 0 ? itemData.images : [INITIAL_ITEMS[0].images[0]],
      status: 'available',
      isModerated: true,
      isFeatured: false,
      ecoImpact: itemData.ecoImpact || {
        co2SavedKg: 12.4,
        waterSavedLitres: 2400,
        textileWeightKg: 0.7
      },
      createdAt: new Date().toISOString()
    };

    setItems(prev => [newItem, ...prev]);
    showNotification(`"${newItem.title}" is now active in the swap exchange pool!`);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<ClothingItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    showNotification('Item details successfully updated.');
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showNotification('Item removed from your wardrobe listings.', 'info');
  };

  const moderateItem = (itemId: string, action: 'approve' | 'flag' | 'remove') => {
    if (action === 'remove') {
      setItems(prev => prev.filter(i => i.id !== itemId));
      showNotification('Listing removed by moderation.', 'warning');
    } else if (action === 'flag') {
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, isModerated: false } : i));
      showNotification('Listing flagged for authenticity verification.', 'warning');
    } else {
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, isModerated: true } : i));
      showNotification('Listing verified and marked active.', 'success');
    }
  };

  // Swap Request Operations
  const createSwapRequest = (params: {
    requestedItemId: string;
    offeredItemIds: string[];
    proposalNote: string;
    exchangeMethod: ExchangeMethod;
    meetupDetails?: any;
  }): SwapRequest => {
    const targetItem = items.find(i => i.id === params.requestedItemId);
    const offeredGarments = items.filter(i => params.offeredItemIds.includes(i.id));

    if (!targetItem) {
      throw new Error('Target item not found');
    }

    const parity = calculateTradeFairness(targetItem, offeredGarments);

    const newRequest: SwapRequest = {
      id: `swap-${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      receiverId: targetItem.ownerId,
      receiverName: targetItem.ownerName,
      requestedItemId: targetItem.id,
      offeredItemIds: params.offeredItemIds,
      status: 'pending',
      proposalNote: params.proposalNote,
      exchangeMethod: params.exchangeMethod,
      meetupDetails: params.meetupDetails || (params.exchangeMethod === 'local_meetup' ? {
        spotName: COMMUNITY_SAFE_SPOTS[0].name,
        address: COMMUNITY_SAFE_SPOTS[0].address,
        scheduledTime: 'Saturday afternoon'
      } : undefined),
      courierDetails: params.exchangeMethod === 'eco_courier' ? {
        provider: 'GreenPost Zero-Emission Courier',
        trackingNumber: `GP-ECO-${Math.floor(100000 + Math.random() * 900000)}-NYC`,
        currentStage: 'label_created',
        eta: 'In 2 business days',
        originCity: currentUser.location,
        destinationCity: targetItem.neighborhood
      } : undefined,
      fairnessScore: parity.score,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSwapRequests(prev => [newRequest, ...prev]);

    // Create introductory message in negotiation chat
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      swapId: newRequest.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: 'Just now',
      text: params.proposalNote || `Hello ${targetItem.ownerName}! I have submitted a swap proposal for your "${targetItem.title}".`,
      isSystemEvent: true,
      systemActionType: 'offer_submitted'
    };
    setChatMessages(prev => [...prev, initialMsg]);

    showNotification(`Swap proposal sent to ${targetItem.ownerName}! Trade parity: ${parity.score}%.`);
    return newRequest;
  };

  const acceptSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'accepted',
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    const req = swapRequests.find(r => r.id === requestId);
    if (req) {
      // Mark items as in_negotiation or swapped
      setItems(prev => prev.map(item => {
        if (item.id === req.requestedItemId || req.offeredItemIds.includes(item.id)) {
          return { ...item, status: 'in_negotiation' };
        }
        return item;
      }));

      // Add system message to chat
      const sysMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        swapId: requestId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        timestamp: 'Just now',
        text: `${currentUser.name} accepted the exchange proposal! Terms and exchange method confirmed.`,
        isSystemEvent: true,
        systemActionType: 'swap_accepted'
      };
      setChatMessages(prev => [...prev, sysMsg]);
    }

    showNotification('Swap proposal accepted! Proceed to finalize handshake or courier tracking.');
  };

  const declineSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: 'declined', updatedAt: new Date().toISOString() } : req));
    showNotification('Swap proposal declined.', 'info');
  };

  const counterOfferSwapRequest = (requestId: string, offeredItemIds: string[], counterNote: string) => {
    setSwapRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'counter_offered',
          counterOfferedItemIds: offeredItemIds,
          counterOfferNote: counterNote,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    const counterMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      swapId: requestId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: 'Just now',
      text: `Counter-proposal submitted: "${counterNote}"`,
      isSystemEvent: true,
      systemActionType: 'counter_offered'
    };
    setChatMessages(prev => [...prev, counterMsg]);
    showNotification('Counter-offer sent to member.');
  };

  const confirmSwapTerms = (requestId: string, details?: any) => {
    setSwapRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          meetupDetails: details || req.meetupDetails,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    const confirmMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      swapId: requestId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: 'Just now',
      text: `${currentUser.name} confirmed the exchange schedule & safety terms.`,
      isSystemEvent: true,
      systemActionType: 'terms_confirmed'
    };
    setChatMessages(prev => [...prev, confirmMsg]);
    showNotification('Exchange arrangement confirmed!');
  };

  const completeSwap = (requestId: string) => {
    const req = swapRequests.find(r => r.id === requestId);
    if (!req) return;

    setSwapRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'completed', updatedAt: new Date().toISOString() } : r));

    // Mark items as swapped
    setItems(prev => prev.map(item => {
      if (item.id === req.requestedItemId || req.offeredItemIds.includes(item.id)) {
        return { ...item, status: 'swapped' };
      }
      return item;
    }));

    // Update user stats
    setAllUsers(prev => prev.map(user => {
      if (user.id === req.requesterId || user.id === req.receiverId) {
        return {
          ...user,
          completedSwaps: user.completedSwaps + 1,
          savedTextileKg: Math.round((user.savedTextileKg + 1.6) * 10) / 10,
          savedWaterLitres: user.savedWaterLitres + 3200
        };
      }
      return user;
    }));

    showNotification('Exchange successfully completed! Circular impact logged to your profile.', 'success');
  };

  const updateCourierStatus = (requestId: string, stage: 'label_created' | 'picked_up' | 'in_transit' | 'delivered') => {
    setSwapRequests(prev => prev.map(req => {
      if (req.id === requestId && req.courierDetails) {
        return {
          ...req,
          courierDetails: {
            ...req.courierDetails,
            currentStage: stage
          },
          status: stage === 'delivered' ? 'completed' : req.status
        };
      }
      return req;
    }));

    const stageLabel = stage === 'picked_up' ? 'Picked up by zero-emission bike fleet' :
      stage === 'in_transit' ? 'In transit via GreenPost electric hub' :
      stage === 'delivered' ? 'Safely delivered to recipient doorstep' : 'Shipping label generated';

    const courierMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      swapId: requestId,
      senderId: currentUser.id,
      senderName: 'GreenPost Logistics',
      senderAvatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=250&q=80',
      timestamp: 'Just now',
      text: `Courier status update: ${stageLabel}.`,
      isSystemEvent: true,
      systemActionType: 'courier_dispatched'
    };
    setChatMessages(prev => [...prev, courierMsg]);

    showNotification(`Courier updated: ${stageLabel}`);
  };

  // Chat
  const sendChatMessage = (swapId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      swapId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: 'Just now',
      text: text.trim()
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  // Disputes & Moderation
  const submitDispute = (swapId: string, accusedParty: string, reason: string, description: string) => {
    const newDsp: DisputeTicket = {
      id: `dsp-${Date.now()}`,
      swapId,
      reportedBy: currentUser.id,
      accusedParty,
      reason,
      description,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    setDisputes(prev => [newDsp, ...prev]);
    showNotification('Dispute ticket submitted to platform mediation team.', 'info');
  };

  const resolveDispute = (disputeId: string, resolution: string) => {
    setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'resolved', resolution } : d));
    showNotification('Dispute resolved by administrator.');
  };

  const toggleUserVerification = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
    showNotification('User verification badge status toggled.');
  };

  return (
    <SwapContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        switchUserById,
        items,
        addItem,
        updateItem,
        deleteItem,
        moderateItem,
        swapRequests,
        createSwapRequest,
        acceptSwapRequest,
        declineSwapRequest,
        counterOfferSwapRequest,
        confirmSwapTerms,
        completeSwap,
        updateCourierStatus,
        chatMessages,
        sendChatMessage,
        disputes,
        submitDispute,
        resolveDispute,
        toggleUserVerification,
        activeTab,
        setActiveTab,
        activeItemModal,
        setActiveItemModal,
        activeSwapProposalTarget,
        setActiveSwapProposalTarget,
        activeNegotiationSwapId,
        setActiveNegotiationSwapId,
        isCreateListingOpen,
        setIsCreateListingOpen,
        isProjectReportOpen,
        setIsProjectReportOpen,
        prefilledValuation,
        setPrefilledValuation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedSize,
        setSelectedSize,
        maxDistanceKm,
        setMaxDistanceKm,
        sortBy,
        setSortBy,
        notification,
        showNotification,
        notify: showNotification
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
};
