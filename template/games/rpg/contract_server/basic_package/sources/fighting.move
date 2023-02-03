// module rpg_game::fighting {
    // use sui::coin::{Self, Coin};
    // use sui::event;
    // use sui::object::{Self, ID, UID};
    // use sui::math;
    // use sui::sui::SUI;
    // use sui::transfer;
    // use sui::tx_context::{Self, TxContext};
    // use std::option::{Self, Option};

    // /// Strength of the hero when attacking
    // public fun hero_strength(hero: &Hero): u64 {
    //     // a hero with zero HP is too tired to fight
    //     if (hero.hp == 0) {
    //         return 0
    //     };
    //
    //     let sword_strength = if (option::is_some(&hero.sword)) {
    //         sword_strength(option::borrow(&hero.sword))
    //     } else {
    //         // hero can fight without a sword, but will not be very strong
    //         0
    //     };
    //     // hero is weaker if he has lower HP
    //     (hero.experience * hero.hp) + sword_strength
    // }
    //
    // /// Strength of a sword when attacking
    // public fun sword_strength(sword: &Sword): u64 {
    //     sword.magic + sword.strength
    // }
// }