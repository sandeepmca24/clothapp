import React from 'react';
import { SwapProvider, useSwap } from './context/SwapContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrowseMarketplace } from './components/BrowseMarketplace';
import { SwapValueCalculatorView } from './components/SwapValueCalculatorView';
import { UserDashboardView } from './components/UserDashboardView';
import { NegotiationChatView } from './components/NegotiationChatView';
import { AdminPanelView } from './components/AdminPanelView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { SwapRequestModal } from './components/SwapRequestModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ProjectReportModal } from './components/ProjectReportModal';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  const { activeTab } = useSwap();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-800 selection:text-white">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'browse' && (
          <>
            <HeroSection />
            <BrowseMarketplace />
          </>
        )}

        {activeTab === 'calculator' && (
          <SwapValueCalculatorView />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboardView />
        )}

        {activeTab === 'messages' && (
          <NegotiationChatView />
        )}

        {activeTab === 'admin' && (
          <AdminPanelView />
        )}
      </main>

      {/* Global Interactive Modals */}
      <ItemDetailModal />
      <SwapRequestModal />
      <CreateListingModal />
      <ProjectReportModal />
      <NotificationToast />

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <SwapProvider>
      <MainAppContent />
    </SwapProvider>
  );
}
