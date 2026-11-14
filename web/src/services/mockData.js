// Wegistics Autonomous Agent & Protocol Mock State Store

export const initialOrders = [
  {
    id: "WEG-8941",
    itemTitle: "Sneakers (Nike Air Jordan 1)",
    amountNgn: 45000,
    amountXrp: 32.5,
    deliveryFeeXrp: 2.5,
    buyerPhone: "+234 812 345 6789",
    buyerAddress: "Lekki Phase 1, Admiralty Way, Lagos",
    merchantName: "KicksLagos Hub",
    riderName: "Ibrahim S. (Yamaha MT-07)",
    sealLinked: true,
    sealSerial: "SEAL-XRPL-0948",
    conditionHex: "A4F89BC93012EF44893CD78912AB457890123456789ABCDEF0123456789ABCDE",
    preimageSecret: "SECRET_HANDOVER_TOKEN_948",
    status: "IN_TRANSIT", // CREATED, ESCROW_LOCKED, IN_TRANSIT, DELIVERED_PENDING_SCAN, SETTLED
    escrowTxHash: "4A9E881B45F20E648937D1A25B741E0947B89C942D8E09425A893D1A54E102F4",
    finishTxHash: null,
    vaultCollateralXrp: 35.0,
    etaMinutes: 12,
  }
];

export const initialVault = {
  totalStakedXrp: 12500,
  activeInTransitXrp: 1450,
  availableFloatXrp: 11050,
  earnedYieldXrp: 84.6,
  underwrittenDeliveriesCount: 412,
  activeRidersCount: 18,
};
