import React, { useState } from 'react';
import { Layers, ShieldCheck, TrendingUp, Users, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

export default function LogisticsView({ vault, setVault, orders }) {
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = (e) => {
    e.preventDefault();
    if (!stakeAmount) return;
    const added = parseFloat(stakeAmount);

    setIsStaking(true);
    setTimeout(() => {
      setVault(prev => ({
        ...prev,
        totalStakedXrp: prev.totalStakedXrp + added,
        availableFloatXrp: prev.availableFloatXrp + added,
      }));
      setStakeAmount('');
      setIsStaking(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* DePIN Header */}
      <div className="bg-[#FAF7FF] border border-[#DDD6FE] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7006B7] bg-[#F3E8FF] px-2.5 py-1 rounded-full border border-[#DDD6FE]">
              DePIN Infrastructure
            </span>
            <h1 className="text-2xl font-bold text-[#171717] mt-2">Logistics Liquidity Underwriting Vaults</h1>
            <p className="text-sm text-[#737373] mt-1 max-w-xl">
              Logistics fleets and capital providers stake XRP to collateralize goods in transit. Capital cycles multiple times daily, earning protocol yield while eliminating merchant theft risk.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#737373]">Current DePIN APY</span>
            <div className="text-xl font-bold text-[#10B981] font-mono">18.4% APY</div>
          </div>
        </div>
      </div>

      {/* Vault KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Total Vault Staked</span>
            <Layers className="w-4 h-4 text-[#7006B7]" />
          </div>
          <div className="text-2xl font-bold text-[#171717]">{vault.totalStakedXrp.toLocaleString()} XRP</div>
          <div className="text-[11px] text-[#737373] mt-1">&asymp; $17,500 Underwriting Cap</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Active In-Transit</span>
            <RefreshCw className="w-4 h-4 text-[#8F0CD1]" />
          </div>
          <div className="text-2xl font-bold text-[#7006B7]">{vault.activeInTransitXrp.toLocaleString()} XRP</div>
          <div className="text-[11px] text-purple-600 mt-1">Revolving across 14 routes</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Protocol Yield Earned</span>
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#10B981]">+{vault.earnedYieldXrp} XRP</div>
          <div className="text-[11px] text-emerald-600 mt-1">0.75% take per scan</div>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#737373] mb-2">
            <span className="text-xs font-semibold uppercase">Active Fleet Riders</span>
            <Users className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-2xl font-bold text-[#171717]">{vault.activeRidersCount} Riders</div>
          <div className="text-[11px] text-[#737373] mt-1">GPS Telemetry Streaming</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stake Capital Form */}
        <div className="lg:col-span-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-6 h-fit">
          <h2 className="text-base font-bold text-[#171717] mb-2">Stake Fleet Liquidity</h2>
          <p className="text-xs text-[#737373] mb-4">
            Deposit working capital into the Tier-1 underwriting pool to back your riders and earn automated transaction fees.
          </p>

          <form onSubmit={handleStake} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Deposit Amount (XRP)</label>
              <input
                type="number"
                placeholder="500"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
                required
              />
            </div>

            <div className="bg-[#FAF7FF] p-3 rounded-lg border border-[#DDD6FE] text-xs text-[#737373] space-y-1">
              <div className="flex justify-between">
                <span>Available Float:</span>
                <span className="font-semibold text-[#171717]">{vault.availableFloatXrp} XRP</span>
              </div>
              <div className="flex justify-between">
                <span>Underwriting Spread:</span>
                <span className="font-semibold text-[#10B981]">0.75% / delivery</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isStaking}
              className="w-full bg-[#7006B7] hover:bg-[#8F0CD1] text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isStaking ? "Staking to XRPL..." : "Stake Capital into Vault"}
            </button>
          </form>
        </div>

        {/* Live Fleet & Revolving Collateral Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#171717]">Live Underwritten Shipments in Transit</h2>
            <span className="text-xs text-[#737373]">Autonomous XRPL Payment Channels</span>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5] text-[#737373] uppercase font-semibold">
                  <tr>
                    <th className="p-3.5">Order & Item</th>
                    <th className="p-3.5">Rider</th>
                    <th className="p-3.5">Collateral Locked</th>
                    <th className="p-3.5">Streaming Fee</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF7FF]">
                      <td className="p-3.5">
                        <div className="font-bold text-[#171717]">{o.itemTitle}</div>
                        <div className="text-[10px] text-[#737373]">{o.id}</div>
                      </td>
                      <td className="p-3.5 text-[#171717] font-medium">{o.riderName}</td>
                      <td className="p-3.5 font-mono text-[#7006B7] font-semibold">{o.vaultCollateralXrp} XRP</td>
                      <td className="p-3.5 font-mono text-emerald-600">+{o.deliveryFeeXrp} XRP</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#7006B7]'
                        }`}>
                          {o.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
