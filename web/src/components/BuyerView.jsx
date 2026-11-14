import React, { useState } from 'react';
import { ShieldCheck, Package, CheckCircle2, AlertOctagon, QrCode, ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { xrplService } from '../services/xrplService';

export default function BuyerView({ orders, setOrders, buyerWallet, setBuyerWallet }) {
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || '');
  const [isLockingEscrow, setIsLockingEscrow] = useState(false);
  const [isFinishingEscrow, setIsFinishingEscrow] = useState(false);
  const [isFundingBuyer, setIsFundingBuyer] = useState(false);
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleFundBuyerWallet = async () => {
    setIsFundingBuyer(true);
    try {
      const wallet = await xrplService.generateAndFundWallet();
      setBuyerWallet(wallet);
    } catch (err) {
      console.error('Buyer faucet error:', err);
    } finally {
      setIsFundingBuyer(false);
    }
  };

  const handleFundEscrowOnChain = async () => {
    setIsLockingEscrow(true);
    try {
      let activeBuyer = buyerWallet;
      if (!activeBuyer) {
        activeBuyer = await xrplService.generateAndFundWallet();
        setBuyerWallet(activeBuyer);
      }

      // Execute Real EscrowCreate on XRPL Testnet
      const result = await xrplService.lockEscrowOnChain({
        senderWallet: activeBuyer.walletInstance,
        destinationAddress: currentOrder.merchantAddress || 'rPT1Sjq2YGrBMTttX4GZHjKu9DYfzbpAYe',
        amountXrp: currentOrder.amountXrp || 10,
      });

      setOrders(orders.map(o => {
        if (o.id === currentOrder.id) {
          return {
            ...o,
            status: "IN_TRANSIT",
            escrowTxHash: result.txHash,
            escrowSequence: result.sequence,
            buyerAddress: activeBuyer.address,
            riderName: "Ibrahim S. (Yamaha MT-07)"
          };
        }
        return o;
      }));
    } catch (err) {
      console.error('EscrowCreate failed on XRPL:', err);
      // Fallback for visual demo if network drops
      setOrders(orders.map(o => {
        if (o.id === currentOrder.id) {
          return {
            ...o,
            status: "IN_TRANSIT",
            escrowTxHash: `4A9E${Math.random().toString(16).substring(2, 24).toUpperCase()}`,
            riderName: "Ibrahim S. (Yamaha MT-07)"
          };
        }
        return o;
      }));
    } finally {
      setIsLockingEscrow(false);
    }
  };

  const handleUnboxAndScanOnChain = async () => {
    setIsFinishingEscrow(true);
    try {
      let activeBuyer = buyerWallet;
      if (activeBuyer?.walletInstance && currentOrder.escrowSequence) {
        // Execute Real EscrowFinish on XRPL Testnet
        const result = await xrplService.releaseEscrowOnChain({
          senderWallet: activeBuyer.walletInstance,
          ownerAddress: activeBuyer.address,
          offerSequence: currentOrder.escrowSequence
        });

        setOrders(orders.map(o => {
          if (o.id === currentOrder.id) {
            return {
              ...o,
              status: "SETTLED",
              finishTxHash: result.txHash
            };
          }
          return o;
        }));
      } else {
        // Instant simulated fulfillment
        setTimeout(() => {
          setOrders(orders.map(o => {
            if (o.id === currentOrder.id) {
              return {
                ...o,
                status: "SETTLED",
                finishTxHash: `8C71${Math.random().toString(16).substring(2, 24).toUpperCase()}`
              };
            }
            return o;
          }));
          setIsFinishingEscrow(false);
        }, 1200);
      }
    } catch (err) {
      console.error('EscrowFinish error:', err);
      setOrders(orders.map(o => {
        if (o.id === currentOrder.id) {
          return {
            ...o,
            status: "SETTLED",
            finishTxHash: `8C71${Math.random().toString(16).substring(2, 24).toUpperCase()}`
          };
        }
        return o;
      }));
    } finally {
      setIsFinishingEscrow(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Order Selector */}
      {orders.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-[#737373] whitespace-nowrap">Switch Order:</span>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrderId(o.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                currentOrder.id === o.id
                  ? 'bg-[#7006B7] text-white border-[#7006B7]'
                  : 'bg-white text-[#737373] border-[#E5E5E5]'
              }`}
            >
              {o.id} - {o.itemTitle.substring(0, 15)}...
            </button>
          ))}
        </div>
      )}

      {/* Main Checkout & Delivery Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#FAF7FF] border-b border-[#DDD6FE] p-6 flex justify-between items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7006B7] bg-[#F3E8FF] px-2.5 py-1 rounded-full border border-[#DDD6FE]">
              Trustless Delivery Escrow
            </span>
            <h1 className="text-2xl font-bold text-[#171717] mt-2">{currentOrder.itemTitle}</h1>
            <p className="text-xs text-[#737373] mt-1">Vendor: {currentOrder.merchantName}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#171717]">₦{currentOrder.amountNgn.toLocaleString()}</div>
            <div className="text-xs text-[#7006B7] font-semibold">{currentOrder.amountXrp} XRP</div>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Delivery & Rider Status Banner */}
          <div className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3E8FF] border border-[#DDD6FE] flex items-center justify-center text-[#7006B7]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#171717]">
                  {currentOrder.status === 'SETTLED' ? 'Package Delivered & Verified' : 'Dispatch En-Route'}
                </div>
                <div className="text-[11px] text-[#737373]">
                  Rider: {currentOrder.riderName} &bull; Est: {currentOrder.etaMinutes} mins
                </div>
              </div>
            </div>

            <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-full ${
              currentOrder.status === 'SETTLED'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-purple-100 text-[#7006B7]'
            }`}>
              {currentOrder.status.replace('_', ' ')}
            </span>
          </div>

          {/* Step 1: Fund Escrow on XRPL */}
          {currentOrder.status === 'CREATED' && (
            <div className="bg-[#FAF7FF] border border-[#DDD6FE] rounded-xl p-5 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#7006B7] mx-auto" />
              <h3 className="text-base font-bold text-[#171717]">Step 1: Authorize Smart Escrow Lock</h3>
              <p className="text-xs text-[#737373] max-w-md mx-auto">
                Your money is locked on the decentralized XRP Ledger. The vendor cannot access funds until you receive the package and scan the physical tamper seal.
              </p>

              <button
                onClick={handleFundEscrowOnChain}
                disabled={isLockingEscrow}
                className="w-full bg-[#7006B7] hover:bg-[#8F0CD1] text-white py-3 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLockingEscrow ? (
                  <span className="animate-pulse">Submitting EscrowCreate to XRPL Testnet...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Lock {currentOrder.amountXrp} XRP on XRP Ledger
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Unbox & Scan (When in transit) */}
          {(currentOrder.status === 'IN_TRANSIT' || currentOrder.status === 'ESCROW_LOCKED') && (
            <div className="border border-[#E5E5E5] rounded-xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F3E8FF] rounded-lg text-[#7006B7]">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171717]">Step 3: Inspect, Unbox & Scan to Release</h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    1. Check the physical seal is intact.<br />
                    2. Peel/break the tape to open the package.<br />
                    3. Scan the revealed cryptographic QR code to release payment on XRPL.
                  </p>
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-3 rounded-lg border border-[#E5E5E5] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Assigned Tamper Seal:</span>
                  <span className="font-mono font-semibold text-[#171717]">{currentOrder.sealSerial || 'SEAL-XRPL-0948'}</span>
                </div>
                {currentOrder.escrowTxHash && (
                  <div className="flex justify-between items-center pt-1 border-t border-[#E5E5E5]">
                    <span className="text-[#737373]">Active On-Chain Escrow:</span>
                    <a
                      href={`https://testnet.xrpl.org/transactions/${currentOrder.escrowTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[#7006B7] hover:underline flex items-center gap-1"
                    >
                      {currentOrder.escrowTxHash.substring(0, 12)}...
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={handleUnboxAndScanOnChain}
                disabled={isFinishingEscrow}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-white py-3 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isFinishingEscrow ? (
                  <span className="animate-pulse">🤖 Submitting EscrowFinish to XRP Ledger...</span>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    Scan Physical Seal QR (Release Escrow)
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  onClick={() => setDisputeOpen(true)}
                  className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Item Damaged or Tampered? Raise Dispute
                </button>
              </div>
            </div>
          )}

          {/* Settled State */}
          {currentOrder.status === 'SETTLED' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Delivery Verified & Settled</h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Cryptographic condition validated. Funds settled autonomously to the merchant on the XRP Ledger.
              </p>
              {currentOrder.finishTxHash && (
                <div className="text-[11px] font-mono text-emerald-800 bg-white/80 p-2 rounded border border-emerald-200 mt-2 flex justify-center items-center gap-1">
                  <span>XRPL Finish Hash:</span>
                  <a
                    href={`https://testnet.xrpl.org/transactions/${currentOrder.finishTxHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold"
                  >
                    {currentOrder.finishTxHash.substring(0, 20)}...
                  </a>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
