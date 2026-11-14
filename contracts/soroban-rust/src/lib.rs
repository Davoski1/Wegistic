#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, BytesN, Env, Symbol};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Buyer,
    Merchant,
    Rider,
    Amount,
    DeliveryFee,
    ConditionHash,
    IsSettled,
}

#[contract]
pub struct WegisticsEscrowContract;

#[contractimpl]
impl WegisticsEscrowContract {
    /// Locks buyer funds into Soroban escrow conditioned on physical tamper seal SHA-256 hash
    pub fn initialize_escrow(
        env: Env,
        buyer: Address,
        merchant: Address,
        rider: Address,
        token_id: Address,
        amount: i128,
        fee: i128,
        condition_hash: BytesN<32>,
    ) {
        buyer.require_auth();

        // Transfer funds into contract custody
        let client = token::Client::new(&env, &token_id);
        client.transfer(&buyer, &env.current_contract_address(), &(amount + fee));

        // Store escrow state
        env.storage().instance().set(&DataKey::Buyer, &buyer);
        env.storage().instance().set(&DataKey::Merchant, &merchant);
        env.storage().instance().set(&DataKey::Rider, &rider);
        env.storage().instance().set(&DataKey::Amount, &amount);
        env.storage().instance().set(&DataKey::DeliveryFee, &fee);
        env.storage().instance().set(&DataKey::ConditionHash, &condition_hash);
        env.storage().instance().set(&DataKey::IsSettled, &false);
    }

    /// Fulfills escrow upon physical unbox scan revealing the cryptographic pre-image
    pub fn fulfill_handover(
        env: Env,
        preimage: BytesN<32>,
        token_id: Address,
    ) {
        let is_settled: bool = env.storage().instance().get(&DataKey::IsSettled).unwrap_or(false);
        if is_settled {
            panic!("Escrow already fulfilled");
        }

        // Verify SHA-256(preimage) == condition_hash
        let expected_hash: BytesN<32> = env.storage().instance().get(&DataKey::ConditionHash).unwrap();
        let computed_hash = env.crypto().sha256(&preimage.into());

        if computed_hash != expected_hash {
            panic!("Invalid tamper seal pre-image: verification failed");
        }

        let merchant: Address = env.storage().instance().get(&DataKey::Merchant).unwrap();
        let rider: Address = env.storage().instance().get(&DataKey::Rider).unwrap();
        let amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        let fee: i128 = env.storage().instance().get(&DataKey::DeliveryFee).unwrap();

        let client = token::Client::new(&env, &token_id);
        client.transfer(&env.current_contract_address(), &merchant, &amount);
        client.transfer(&env.current_contract_address(), &rider, &fee);

        env.storage().instance().set(&DataKey::IsSettled, &true);
    }
}
