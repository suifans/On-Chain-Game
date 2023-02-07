module basic_package::drop {
    // use sui::coin::{Self, Coin};
    // use sui::object::{Self, ID, UID};
    // use sui::transfer;
    // use sui::tx_context::{Self, TxContext};
    // use std::option::{Self, Option};
    use sui::tx_context::{TxContext, sender};
    use sui::randomness;
    use sui::devnet_nft;

    // --- Object creation ---
    /// It all starts with the sword. Anyone can buy a sword, and proceeds go
    /// to the admin. Amount of magic in the sword depends on how much you pay
    /// for it.
    // public fun create_sword(
    //     game: &GameInfo,
    //     payment: Coin<SUI>,
    //     ctx: &mut TxContext
    // ): Sword {
    //     let value = coin::value(&payment);
    //     // ensure the user pays enough for the sword
    //     assert!(value >= MIN_SWORD_COST, EINSUFFICIENT_FUNDS);
    //     // pay the admin for this sword
    //     transfer::transfer(payment, game.admin);
    //
    //     // magic of the sword is proportional to the amount you paid, up to
    //     // a max. one can only imbue a sword with so much magic
    //     let magic = (value - MIN_SWORD_COST) / MIN_SWORD_COST;
    //     Sword {
    //         id: object::new(ctx),
    //         magic: math::min(magic, MAX_MAGIC),
    //         strength: 1,
    //         game_id: id(game)
    //     }
    // }




    struct RANDOMNESS_WITNESS has drop {}


    public entry fun create_random(ctx:&mut TxContext){
        let random = randomness::new(RANDOMNESS_WITNESS {}, ctx);
        randomness::transfer(random,sender(ctx))
    }

    public entry fun create_nft(name:vector<u8>,description:vector<u8>,url:vector<u8>,ctx:&mut TxContext){
        devnet_nft::mint(name,description,url,ctx)
    }



    #[test]
    public fun test_random(){
        use std::debug::print;
        use sui::randomness;
        use sui::tx_context;
        use sui::transfer;
        let ctx = tx_context::dummy();
        let random = randomness::new(RANDOMNESS_WITNESS {}, &mut ctx);
        print(&random);
        transfer::transfer(random, @sui);
    }
}