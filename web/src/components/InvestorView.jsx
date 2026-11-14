import React, { useState } from 'react';
import { DollarSign, TrendingUp, ShieldCheck, PieChart, ArrowUpRight, ArrowDownLeft, Lock, Award, CheckCircle2 } from 'lucide-react';

export default function InvestorView({ vault, setVault }) {
  const [investorBalance, setInvestorBalance] = useState(1500); // User's personal staked XRP
  const [stakeInput, setStakeInput] = useState('');
  const [withdrawInput, setWithdrawInput] = useState('');
  const [selectedFleet, setSelectedFleet] = useState('ALL');
  const [actionSuccess, setActionSuccess] = useState(null);

  // Simulated Fleets for diversified underwriting
  const fleets = [
    {
      id: 'FLEET-01',
      name: 'Lagos Island Express Fleet',
      activeRiders: 42,
      utilizationRate: '88%',
      successRate: '99.2%',
      firstLossProtection: '25% (Fleet Funded)',
      projectedApy: '19.4%',
      riskTier: 'Tier A (Low Risk)'
    },
    {
      id: 'FLEET-02',
      name: 'Abuja Metro Logistics Hub',
      activeRiders: 28,
      utilizationRate: '74%',
      successRate: '98.8%',
      firstLossProtection: '20% (Fleet Funded)',
      projectedApy: '17.8%',
      riskTier: 'Tier A (Low Risk)'
    },
    {
      id: 'FLEET-03',
      name: 'Nairobi Inter-City Dispatch',
      activeRiders: 35,
      utilizationRate: '91%',
      successRate: '98.4%',
      firstLossProtection: '30% (Fleet Funded)',
      projectedApy: '21.2%',
      riskTier: 'Tier B+ (Higher Yield)'
    }
  ];

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(stakeInput);
    if (!amount || amount <= 0) return;

    setInvestorBalance(prev => prev + amount);
    setVault(prev => ({
      ...prev,
      totalStakedXrp: prev.totalStakedXrp + amount,
      availableFloatXrp: prev.availableFloatXrp + amount,
    }));
    setActionSuccess(`Successfully staked ${amount} XRP into Senior Underwriting Tranche`);
    setStakeInput('');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawInput);
    if (!amount || amount <= 0 || amount > investorBalance) return;

    setInvestorBalance(prev => prev - amount);
    setVault(prev => ({
      ...prev,
      totalStakedXrp: prev.totalStakedXrp - amount,
      availableFloatXrp: prev.availableFloatXrp - amount,
    }));
    setActionSuccess(`Withdrew ${amount} XRP back to XRPL Wallet`);
    setWithdrawInput('');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const estimatedDailyYield = ((investorBalance * 0.184) / 365).toFixed(2);
  const estimatedMonthlyYield = ((investorBalance * 0.184) / 12).toFixed(1);

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-[#FAF7FF] border border-[#DDD6FE] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7006B7] bg-[#F3E8FF] px-2.5 py-1 rounded-full border border-[#DDD6FE]">
              DePIN RWA Capital Market
            </span>
            <h1 className="text-2xl font-bold text-[#171717] mt-2">Institutional & Retail Underwriting Portal</h1>
            <p className="text-sm text-[#737373] mt-1 max-w-xl">
              Provide short-duration revolving liquidity to collateralize high-velocity e-commerce logistics across Africa. Earn continuous yield from escrow protocol take-rates with first-loss protection.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#737373]">Consolidated APY</span>
            <div className="text-2xl font-bold text-[#10B981] font-mono">18.4% &ndash; 21.2%</div>
            <span className="text-[10px] text-[#7006B7] font-semibold">Protected Senior Tranche</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Your Staked Capital</span>
            <Lock className="w-4 h-4 text-[#7006B7]" />
          </div>
          <div className="text-2xl font-bold text-[#171717]">{investorBalance.toLocaleString()} XRP</div>
          <div className="text-[11px] text-[#737373] mt-1">&asymp; ${(investorBalance * 1.4).toFixed(2)} USD value</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Est. Monthly Earnings</span>
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#10B981]">+{estimatedMonthlyYield} XRP</div>
          <div className="text-[11px] text-emerald-600 mt-1">&asymp; {estimatedDailyYield} XRP / day compounding</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Senior Tranche Protection</span>
            <ShieldCheck className="w-4 h-4 text-[#7006B7]" />
          </div>
          <div className="text-2xl font-bold text-[#7006B7]">100% Insured</div>
          <div className="text-[11px] text-[#737373] mt-1">Fleet First-Loss absorbed first</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Capital Velocity</span>
            <Award className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-bold text-[#171717]">4.8x / Day</div>
          <div className="text-[11px] text-[#737373] mt-1">Avg 42-min delivery turnaround</div>
        </div>

      </div>

      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {actionSuccess}
        </div>
      )}

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Deposit / Withdraw Controls */}
        <div className="lg:col-span-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-6 h-fit space-y-6">
          
          <div>
            <h2 className="text-base font-bold text-[#171717] mb-1">Deposit / Stake XRP</h2>
            <p className="text-xs text-[#737373] mb-3">
              Allocate funds to underwrite in-transit parcels and earn fractional escrow take-rates.
            </p>
            <form onSubmit={handleDeposit} className="space-y-3">
              <input
                type="number"
                placeholder="Amount in XRP"
                value={stakeInput}
                onChange={(e) => setStakeInput(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#7006B7] hover:bg-[#8F0CD1] text-white py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4" />
                Deposit to Underwriting Pool
              </button>
            </form>
          </div>

          <div className="border-t border-[#E5E5E5] pt-5">
            <h2 className="text-base font-bold text-[#171717] mb-1">Withdraw Unlocked Liquidity</h2>
            <p className="text-xs text-[#737373] mb-3">
              Available to withdraw instantly as deliveries complete and collateral unlocks.
            </p>
            <form onSubmit={handleWithdraw} className="space-y-3">
              <input
                type="number"
                placeholder="Amount in XRP"
                value={withdrawInput}
                onChange={(e) => setWithdrawInput(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
                required
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-[#E5E5E5] text-[#171717] border border-[#E5E5E5] py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowDownLeft className="w-4 h-4" />
                Withdraw to Wallet
              </button>
            </form>
          </div>

          <div className="bg-[#FAF7FF] border border-[#DDD6FE] p-3 rounded-lg text-[11px] text-[#737373] space-y-1">
            <div className="font-semibold text-[#7006B7]">DePIN Vault Mechanics:</div>
            <div>&bull; Instant settlement via XRPL native escrows.</div>
            <div>&bull; Logistics firms deposit Tier-1 First-Loss buffer.</div>
            <div>&bull; Investor principal is zero-touch from AI agent.</div>
          </div>

        </div>

        {/* Vetted Fleets Underwriting Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#171717]">Vetted Logistics Fleets Available for Allocation</h2>
            <span className="text-xs text-[#737373]">Live XRPL Telemetry Verified</span>
          </div>

          <div className="space-y-3">
            {fleets.map((fleet) => (
              <div
                key={fleet.id}
                className="bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#DDD6FE] transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#171717]">{fleet.name}</span>
                      <span className="font-mono text-xs text-[#737373]">({fleet.id})</span>
                    </div>
                    <div className="text-xs text-[#737373] mt-0.5">
                      {fleet.activeRiders} Active Motorcycle Couriers &bull; {fleet.utilizationRate} Vault Utilization
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#10B981] font-mono">{fleet.projectedApy} APY</span>
                    <div className="text-[10px] text-[#737373]">{fleet.riskTier}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#F5F5F5] rounded-lg p-3 text-xs border border-[#E5E5E5] mb-3">
                  <div>
                    <span className="text-[#737373] block text-[10px] uppercase font-semibold">Delivery Success</span>
                    <span className="font-bold text-[#171717]">{fleet.successRate}</span>
                  </div>
                  <div>
                    <span className="text-[#737373] block text-[10px] uppercase font-semibold">First-Loss Cushion</span>
                    <span className="font-bold text-[#7006B7]">{fleet.firstLossProtection}</span>
                  </div>
                  <div>
                    <span className="text-[#737373] block text-[10px] uppercase font-semibold">Payout Interval</span>
                    <span className="font-bold text-[#171717]">Per-Scan (Real-Time)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[11px] text-[#737373]">
                    Underwritten via <strong className="text-[#7006B7]">Wegistics Revolving Escrow Protocol</strong>
                  </span>
                  <button
                    onClick={() => {
                      setStakeInput('250');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-[#7006B7] bg-[#F3E8FF] hover:bg-[#DDD6FE] px-3 py-1.5 rounded-lg border border-[#DDD6FE] transition-all"
                  >
                    Allocate to this Fleet
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
