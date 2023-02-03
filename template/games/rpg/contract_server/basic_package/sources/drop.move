// module rpg_game::drop {
    // use sui::coin::{Self, Coin};
    // use sui::event;
    // use sui::object::{Self, ID, UID};
    // use sui::math;
    // use sui::sui::SUI;
    // use sui::transfer;
    // use sui::tx_context::{Self, TxContext};
    // use std::option::{Self, Option};
    //
    // // --- Object creation ---
    // /// It all starts with the sword. Anyone can buy a sword, and proceeds go
    // /// to the admin. Amount of magic in the sword depends on how much you pay
    // /// for it.
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
// }