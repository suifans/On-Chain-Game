module rpg_game::admin {
    use sui::object::{ ID, UID};
    // use rpg_game::main::{GameInfo, GameAdmin};
    // use sui::tx_context::TxContext;
    // use rpg_game::utils::check_id;

    struct Monster has key,store{
        id: UID,
        boar:Boar
    }

    struct Boar has store {
        /// Hit points before the boar is slain
        hp: u64,
        /// Strength of this particular boar
        strength: u64,
        /// An ID of the game
        game_id: ID,
    }

    // / Admin can create a boar with the given attributes for `recipient`
    // public entry fun create_monster(
    //     game: &GameInfo,
    //     admin: &mut GameAdmin,
    //     map_name:vector<u8>,
    //     monster_name:Monster,
    //     number:u8,
    //     ctx: &mut TxContext
    // ) {
    //
    //     // send boars to the designated player
    //     // let map_address = create_address(map_name);
    //     // transfer::transfer(
    //     //     Boar { id: object::new(ctx), hp, strength, game_id: id(game) },
    //     //     map_address
    //     // )
    // }

}