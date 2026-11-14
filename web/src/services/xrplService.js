import { Client, Wallet, xrpToDrops } from 'xrpl';

const TESTNET_WS = 'wss://s.altnet.rippletest.net:51233';

class XRPLService {
  constructor() {
    this.client = null;
    this.connecting = null;
  }

  async getClient() {
    if (this.client && this.client.isConnected()) {
      return this.client;
    }
    if (!this.connecting) {
      this.client = new Client(TESTNET_WS);
      this.connecting = this.client.connect().then(() => {
        console.log('⚡ Connected to XRP Ledger Testnet:', TESTNET_WS);
        this.connecting = null;
      });
    }
    await this.connecting;
    return this.client;
  }

  /**
   * Generates and funds a fresh testnet wallet using Ripple's testnet faucet
   */
  async generateAndFundWallet() {
    const client = await this.getClient();
    console.log('🤖 Faucet funding new XRPL Testnet wallet...');
    const { wallet, balance } = await client.fundWallet();
    return {
      address: wallet.address,
      seed: wallet.seed,
      balance,
      walletInstance: wallet
    };
  }

  /**
   * Locks funds into a real on-chain XRPL Escrow (or Payment on Testnet)
   */
  async lockEscrowOnChain({ senderWallet, destinationAddress, amountXrp }) {
    const client = await this.getClient();
    
    // For demo stability and instant execution on Testnet:
    // Create an Escrow transaction with CancelAfter timestamp (3 days)
    const cancelAfter = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60);

    const escrowTx = {
      TransactionType: 'EscrowCreate',
      Account: senderWallet.address,
      Destination: destinationAddress,
      Amount: xrpToDrops(amountXrp.toString()),
      CancelAfter: cancelAfter,
    };

    console.log('🚀 Submitting EscrowCreate to XRPL...', escrowTx);
    const prepared = await client.autofill(escrowTx);
    const signed = senderWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    console.log('✅ EscrowCreate Confirmed on XRPL:', result.result.hash);
    return {
      txHash: result.result.hash,
      sequence: result.result.Sequence || result.result.tx_json?.Sequence,
      status: result.result.meta.TransactionResult,
      explorerUrl: `https://testnet.xrpl.org/transactions/${result.result.hash}`
    };
  }

  /**
   * Fulfills and Releases the Escrow on-chain to the merchant
   */
  async releaseEscrowOnChain({ senderWallet, ownerAddress, offerSequence }) {
    const client = await this.getClient();

    const finishTx = {
      TransactionType: 'EscrowFinish',
      Account: senderWallet.address,
      Owner: ownerAddress,
      OfferSequence: offerSequence,
    };

    console.log('🚀 Submitting EscrowFinish to XRPL...', finishTx);
    const prepared = await client.autofill(finishTx);
    const signed = senderWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    console.log('✅ EscrowFinish Confirmed on XRPL:', result.result.hash);
    return {
      txHash: result.result.hash,
      status: result.result.meta.TransactionResult,
      explorerUrl: `https://testnet.xrpl.org/transactions/${result.result.hash}`
    };
  }
}

export const xrplService = new XRPLService();
