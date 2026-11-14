import React from 'react';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole }) {
  const roles = [
    { id: 'merchant', label: '1. Merchant' },
    { id: 'buyer', label: '2. Buyer' },
    { id: 'logistics', label: '3. Logistics Fleet' },
    { id: 'investor', label: '4. Investor (DePIN Yield)' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <span className="font-wordmark text-3xl tracking-wider text-[#7006B7]">TELXI</span>
          <div className="h-5 w-[1px] bg-[#E5E5E5]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#171717]">
            WEGISTICS
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F3E8FF] border border-[#DDD6FE] text-[#7006B7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F0CD1]" />
            XRPL Autonomous Agent &bull; DePIN RWA
          </span>
        </div>

        {/* Role Navigation Pills */}
        <div className="flex items-center bg-[#F5F5F5] p-1 rounded-lg border border-[#E5E5E5] overflow-x-auto">
          {roles.map((r) => {
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7006B7] text-white shadow-sm'
                    : 'text-[#737373] hover:text-[#171717]'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
