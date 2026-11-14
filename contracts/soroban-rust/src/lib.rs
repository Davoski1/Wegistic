#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, BytesN, Env, Symbol, Vec};

#[contracttype]
#[derive(Clone)]
pub enum EscrowState {
    Initiated,
    InTransit,
    Settled,
    Disputed,
    Refunded,
}

#[contracttype]
#[derive(Clone)]
pub struct EscrowOrder {
    pub buyer: Address,
    pub merchant: Address,
    pub rider: Address,
    pub token: Address,
    pub amount: i128,
    pub delivery_fee: i128,
    pub condition_hash: BytesN<32>,
    pub cancel_after: u64,
    pub state: EscrowState,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Order(BytesN<32>),
    Admin,
    VaultAddress,
    TotalVolumeLocked,
}

#[contract]
pub struct WegisticsEscrowContract;

#[contractimpl]
impl WegisticsEscrowContract {
    /// Initialize global protocol state and collateral vault link
    pub fn initialize(env: Env, admin: Address, vault: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Protocol already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::VaultAddress, &vault);
        env.storage().instance().set(&DataKey::TotalVolumeLocked, &0i128);
    }

    /// Locks buyer funds into Soroban escrow conditioned on physical tamper seal SHA-256 hash
    pub fn lock_escrow(
        env: Env,
        order_id: BytesN<32>,
        buyer: Address,
        merchant: Address,
        rider: Address,
        token: Address,
        amount: i128,
        delivery_fee: i128,
        condition_hash: BytesN<32>,
        cancel_after_timestamp: u64,
    ) {
        buyer.require_auth();

        if env.storage().persistent().has(&DataKey::Order(order_id.clone())) {
            panic!("Order ID already exists on-chain");
        }

        let total_deposit = amount + delivery_fee;
        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&buyer, &env.current_contract_address(), &total_deposit);

        let order = EscrowOrder {
            buyer,
            merchant,
            rider,
            token,
            amount,
            delivery_fee,
            condition_hash,
            cancel_after: cancel_after_timestamp,
            state: EscrowState::InTransit,
        };

        env.storage().persistent().set(&DataKey::Order(order_id), &order);
    }

    /// Fulfills escrow upon physical unbox scan revealing the cryptographic pre-image
    pub fn fulfill_handover(
        env: Env,
        order_id: BytesN<32>,
        preimage: BytesN<32>,
    ) {
        let mut order: EscrowOrder = env
            .storage()
            .persistent()
            .get(&DataKey::Order(order_id.clone()))
            .expect("Order not found");

        match order.state {
            EscrowState::InTransit => {},
            _ => panic!("Order is not in valid settlement state"),
        }

        // Cryptographic verification: SHA-256(preimage) must match stored condition
        let computed_hash = env.crypto().sha256(&preimage.into());
        if computed_hash != order.condition_hash {
            panic!("Cryptographic pre-image mismatch: Tamper seal invalid");
        }

        let token_client = token::Client::new(&env, &order.token);
        
        // Instant settlement
        token_client.transfer(&env.current_contract_address(), &order.merchant, &order.amount);
        token_client.transfer(&env.current_contract_address(), &order.rider, &order.delivery_fee);

        order.state = EscrowState::Settled;
        env.storage().persistent().set(&DataKey::Order(order_id), &order);
    }

    /// Arbitrated settlement in case of damaged goods
    pub fn arbitrate_dispute(
        env: Env,
        order_id: BytesN<32>,
        refund_buyer_percentage: u32,
    ) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut order: EscrowOrder = env
            .storage()
            .persistent()
            .get(&DataKey::Order(order_id.clone()))
            .expect("Order not found");

        let token_client = token::Client::new(&env, &order.token);
        let total = order.amount + order.delivery_fee;
        let refund_amount = (total * (refund_buyer_percentage as i128)) / 100i128;
        let merchant_amount = total - refund_amount;

        if refund_amount > 0 {
            token_client.transfer(&env.current_contract_address(), &order.buyer, &refund_amount);
        }
        if merchant_amount > 0 {
            token_client.transfer(&env.current_contract_address(), &order.merchant, &merchant_amount);
        }

        order.state = EscrowState::Disputed;
        env.storage().persistent().set(&DataKey::Order(order_id), &order);
    }
}
