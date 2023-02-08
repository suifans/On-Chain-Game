module basic_package::drop {
    use sui::tx_context::{TxContext, sender};
    use sui::randomness;
    use sui::devnet_nft;
    use basic_package::player::{Player, get_player};
    use basic_package::monster::Monster;

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