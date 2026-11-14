import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MerchantView from './components/MerchantView';
import BuyerView from './components/BuyerView';
import LogisticsView from './components/LogisticsView';
import InvestorView from './components/InvestorView';
import { initialOrders, initialVault } from './services/mockData';

export default function App() {
  const [activeRole, setActiveRole] = useState('merchant');
  const [orders, setOrders] = useState(initialOrders);
  const [vault, setVault] = useState(initialVault);
  const [merchantWallet, setMerchantWallet] = useState(null);
  const [buyerWallet, setBuyerWallet] = useState(null);

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans">
      <Navbar activeRole={activeRole} setActiveRole={setActiveRole} />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8">
        {activeRole === 'merchant' && (
          <MerchantView
            orders={orders}
            setOrders={setOrders}
            merchantWallet={merchantWallet}
            setMerchantWallet={setMerchantWallet}
          />
        )}
        {activeRole === 'buyer' && (
          <BuyerView
            orders={orders}
            setOrders={setOrders}
            buyerWallet={buyerWallet}
            setBuyerWallet={setBuyerWallet}
          />
        )}
        {activeRole === 'logistics' && (
          <LogisticsView vault={vault} setVault={setVault} orders={orders} />
        )}
        {activeRole === 'investor' && (
          <InvestorView vault={vault} setVault={setVault} />
        )}
      </main>

      <footer className="border-t border-[#E5E5E5] py-6 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#737373]">
          <div>
            <span className="font-bold text-[#171717]">Wegistics Protocol</span> &bull; Built on XRP Ledger Agentic Finance & DePIN RWA
          </div>
          <div className="flex gap-4 font-mono text-[11px]">
            <span>Network: XRPL Testnet</span>
            <span className="text-[#10B981]">&bull; Consensus: 3.5s Finality</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
