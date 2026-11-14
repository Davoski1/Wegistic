import React, { useState } from 'react';
import { PlusCircle, QrCode, Copy, Check, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import { xrplService } from '../services/xrplService';

export default function MerchantView({ orders, setOrders, merchantWallet, setMerchantWallet }) {
  const [itemTitle, setItemTitle] = useState('');
  const [amountNgn, setAmountNgn] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [linkingSealId, setLinkingSealId] = useState(null);
  const [manualSerial, setManualSerial] = useState('');
  const [isFundingWallet, setIsFundingWallet] = useState(false);

  const handleFundMerchantWallet = async () => {
    setIsFundingWallet(true);
    try {
      const wallet = await xrplService.generateAndFundWallet();
      setMerchantWallet(wallet);
    } catch (err) {
      console.error('Faucet funding error:', err);
    } finally {
      setIsFundingWallet(false);
    }
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!itemTitle || !amountNgn) return;

    const ngn = parseFloat(amountNgn);
    const xrpValue = (ngn / 1400).toFixed(1);

    const newOrder = {
      id: `WEG-${Math.floor(1000 + Math.random() * 9000)}`,
      itemTitle,
      amountNgn: ngn,
      amountXrp: parseFloat(xrpValue),
      deliveryFeeXrp: 2.0,
      buyerPhone: buyerPhone || "+234 812 000 0000",
      buyerAddress: buyerAddress || "Lekki, Lagos",
      merchantName: "Lagos Merchant Hub",
      merchantAddress: merchantWallet?.address || 'rPT1Sjq2YGrBMTttX4GZHjKu9DYfzbpAYe',
      riderName: "Pending Dispatch",
      sealLinked: false,
      sealSerial: null,
      status: "CREATED",
      escrowTxHash: null,
      escrowSequence: null,
      finishTxHash: null,
      vaultCollateralXrp: parseFloat(xrpValue) + 2.0,
      etaMinutes: 25,
    };

    setOrders([newOrder, ...orders]);
    setItemTitle('');
    setAmountNgn('');
    setBuyerPhone('');
    setBuyerAddress('');
  };

  const handleLinkSeal = (orderId) => {
    const serial = manualSerial || `SEAL-XRPL-${Math.floor(1000 + Math.random() * 9000)}`;

    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          sealLinked: true,
          sealSerial: serial,
        };
      }
      return o;
    }));

    setLinkingSealId(null);
    setManualSerial('');
  };

  const copyCheckoutLink = (orderId) => {
    const link = `${window.location.origin}/?order=${orderId}&role=buyer`;
    navigator.clipboard.writeText(link);
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Banner with Live XRPL Merchant Faucet Wallet */}
      <div className="bg-[#FAF7FF] border border-[#DDD6FE] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7006B7] bg-[#F3E8FF] px-2.5 py-1 rounded-full border border-[#DDD6FE]">
              Merchant Portal
            </span>
            <h1 className="text-2xl font-bold text-[#171717] mt-2">Zero-Risk Pay on Delivery Escrow</h1>
            <p className="text-sm text-[#737373] mt-1 max-w-xl">
              Create instant payment links for WhatsApp & Instagram buyers. Package items with tamper-evident seals and get underwritten by DePIN liquidity vaults.
            </p>
          </div>

          <div className="bg-white border border-[#DDD6FE] p-3 rounded-xl shadow-sm text-right min-w-[220px]">
            <span className="text-[11px] font-semibold text-[#737373] block">Merchant Settlement Wallet</span>
            {merchantWallet ? (
              <div>
                <span className="text-xs font-mono font-bold text-[#7006B7]">
                  {merchantWallet.address.substring(0, 8)}...{merchantWallet.address.substring(merchantWallet.address.length - 6)}
                </span>
                <div className="text-[11px] text-[#10B981] font-semibold">{merchantWallet.balance} XRP (Testnet)</div>
              </div>
            ) : (
              <button
                onClick={handleFundMerchantWallet}
                disabled={isFundingWallet}
                className="mt-1 bg-[#7006B7] hover:bg-[#8F0CD1] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 ml-auto transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                {isFundingWallet ? 'Funding from Faucet...' : 'Connect Testnet Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form: Create Order */}
        <div className="lg:col-span-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-6 h-fit">
          <h2 className="text-base font-bold text-[#171717] mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#7006B7]" />
            Step 1: Generate Order Link
          </h2>

          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Item Title</label>
              <input
                type="text"
                placeholder="e.g. Nike Dunks (Size 43)"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Price (NGN)</label>
              <input
                type="number"
                placeholder="50000"
                value={amountNgn}
                onChange={(e) => setAmountNgn(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
                required
              />
              {amountNgn && (
                <span className="text-[11px] text-[#7006B7] font-medium mt-1 block">
                  &asymp; {(amountNgn / 1400).toFixed(1)} XRP on XRPL
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Customer Phone</label>
              <input
                type="text"
                placeholder="+234 812 000 0000"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Delivery Address</label>
              <textarea
                placeholder="Admiralty Way, Lekki Phase 1"
                rows={2}
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7006B7]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7006B7] hover:bg-[#8F0CD1] text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              Generate Wegistics Link
            </button>
          </form>
        </div>

        {/* Orders Feed & Seal Management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#171717]">Active Shipments & Escrows</h2>
            <span className="text-xs text-[#737373]">{orders.length} total orders</span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#DDD6FE] transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#171717]">{order.itemTitle}</span>
                      <span className="font-mono text-xs text-[#737373]">({order.id})</span>
                    </div>
                    <div className="text-xs text-[#737373] mt-0.5">
                      ₦{order.amountNgn.toLocaleString()} &bull; {order.amountXrp} XRP
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    order.status === 'SETTLED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : order.status === 'ESCROW_LOCKED' || order.status === 'IN_TRANSIT'
                      ? 'bg-[#F3E8FF] text-[#7006B7] border border-[#DDD6FE]'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#737373] border-t border-[#E5E5E5] pt-3 mb-4">
                  <div>
                    <span className="font-semibold text-[#171717]">Destination:</span> {order.buyerAddress}
                  </div>
                  <div>
                    <span className="font-semibold text-[#171717]">Rider:</span> {order.riderName}
                  </div>
                </div>

                {/* Step 2: Seal Linking & Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {!order.sealLinked ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {linkingSealId === order.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Enter Seal Serial"
                            value={manualSerial}
                            onChange={(e) => setManualSerial(e.target.value)}
                            className="bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-1 rounded text-xs"
                          />
                          <button
                            onClick={() => handleLinkSeal(order.id)}
                            className="bg-[#7006B7] text-white px-3 py-1 rounded text-xs font-semibold"
                          >
                            Save Seal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setLinkingSealId(order.id)}
                          className="text-xs font-semibold text-[#7006B7] bg-[#F3E8FF] hover:bg-[#DDD6FE] px-3 py-1.5 rounded-lg border border-[#DDD6FE] flex items-center gap-1.5 transition-all"
                        >
                          <QrCode className="w-4 h-4" />
                          Step 2: Link Tamper Seal
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-[#10B981] font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      Seal Linked: <span className="font-mono text-[#171717]">{order.sealSerial}</span>
                    </div>
                  )}

                  {/* Copy Link to WhatsApp */}
                  <button
                    onClick={() => copyCheckoutLink(order.id)}
                    className="text-xs font-semibold text-[#171717] bg-[#F5F5F5] hover:bg-[#E5E5E5] px-3 py-1.5 rounded-lg border border-[#E5E5E5] flex items-center gap-1.5 transition-all ml-auto"
                  >
                    {copiedId === order.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Link for Buyer
                      </>
                    )}
                  </button>
                </div>

                {order.escrowTxHash && (
                  <div className="mt-3 bg-[#FAF7FF] p-2 rounded text-[11px] font-mono text-[#7006B7] flex justify-between items-center">
                    <a
                      href={`https://testnet.xrpl.org/transactions/${order.escrowTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      XRPL Hash: {order.escrowTxHash.substring(0, 16)}...
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[10px] text-[#737373]">Vault Underwritten: {order.vaultCollateralXrp} XRP</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
