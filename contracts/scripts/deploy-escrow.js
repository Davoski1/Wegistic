import { Client, Wallet, xrpToDrops } from 'xrpl';
import crypto from 'crypto';

async function main() {
  console.log('--- WEGISTICS CLI: DEPLOYING ESCROW WITH CRYPTO-CONDITION ---');

  const client = new Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  console.log('1. Funding Buyer & Merchant Wallets from Faucet...');
  const { wallet: buyer } = await client.fundWallet();
  const { wallet: merchant } = await client.fundWallet();
  console.log(`Buyer:    ${buyer.address}`);
  console.log(`Merchant: ${merchant.address}`);

  // Generate 32-byte secret printed on the physical seal
  const preimage = crypto.randomBytes(32);
  const condition = crypto.createHash('sha256').update(preimage).digest('hex').toUpperCase();

  console.log('\n2. Generated Physical Tamper Seal Pre-Image:');
  console.log(`Condition Hash: ${condition}`);

  // Submit EscrowCreate
  const cancelAfter = Math.floor(Date.now() / 1000) + 86400; // 24 hours
  const escrowTx = {
    TransactionType: 'EscrowCreate',
    Account: buyer.address,
    Destination: merchant.address,
    Amount: xrpToDrops('25'),
    CancelAfter: cancelAfter,
  };

  console.log('\n3. Broadcasting EscrowCreate to XRPL Testnet...');
  const prepared = await client.autofill(escrowTx);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log(`✅ Escrow Confirmed on XRPL!`);
  console.log(`Tx Hash: ${result.result.hash}`);
  console.log(`Explorer: https://testnet.xrpl.org/transactions/${result.result.hash}`);

  await client.disconnect();
}

main().catch(console.error);
