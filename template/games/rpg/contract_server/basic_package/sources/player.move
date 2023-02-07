module basic_package::player {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{TxContext};
    use std::option::{Self, Option};
    use basic_package::main::GameInfo;
    use basic_package::utils::{id };
    // use rpg_game::monster::Boar;



    struct Player has key {
        id: UID,
        /// An ID of the game user is playing
        game_id: ID,
        name:vector<u8>,
        /// Player attribute
        attribute:Attribute,
        /// Equipment
        equipment_slot:Equipment_Slot,
    }

    struct Attribute has store {
        level:u64,
        /// Experience of the hero. Begins at zero
        experience: u64,
        /// Hit points. If they go to zero, the player will die and don't to do anything
        hp:u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        gold:u64
    }

    /// The hero's trusty sword
    struct Weapon has key, store {
        id: UID,
        /// Constant set at creation. Acts as a multiplier on sword's strength.
        /// Weapons with high magic are rarer (because they cost more).
        magic: u64,
        /// Weapon grows in strength as we use it
        strength: u64,
        /// An ID of the game
        game_id: ID,
    }

    struct Equipment_Slot has store{
        /// The hero's minimal inventory
        sword: Option<Weapon>,
    }

    // --- Gameplay ---
    /// Slay the `boar` with the `hero`'s sword, get experience.
    /// Aborts if the hero has 0 HP or is not strong enough to slay the boar
    // public entry fun slay(
    //     game: &GameInfo, warrior: &mut Player, boar: Boar, ctx: &TxContext
    // ) {
    //     check_id(game, warrior.game_id);
    //     check_id(game, boar.game_id);
    //     let Boar { id: boar_id, strength: boar_strength, hp, game_id: _ } = boar;
    //     let hero_strength = hero_strength(hero);
    //     let boar_hp = hp;
    //     let hero_hp = hero.hp;
    //     // attack the boar with the sword until its HP goes to zero
    //     while (boar_hp > hero_strength) {
    //         // first, the hero attacks
    //         boar_hp = boar_hp - hero_strength;
    //         // then, the boar gets a turn to attack. if the boar would kill
    //         // the hero, abort--we can't let the boar win!
    //         assert!(hero_hp >= boar_strength , EBOAR_WON);
    //         hero_hp = hero_hp - boar_strength;
    //
    //     };
    //     // hero takes their licks
    //     hero.hp = hero_hp;
    //     // hero gains experience proportional to the boar, sword grows in
    //     // strength by one (if hero is using a sword)
    //     hero.experience = hero.experience + hp;
    //     if (option::is_some(&hero.sword)) {
    //         level_up_sword(option::borrow_mut(&mut hero.sword), 1)
    //     };
    //     // let the world know about the hero's triumph by emitting an event!
    //     event::emit(BoarSlainEvent {
    //         slayer_address: tx_context::sender(ctx),
    //         hero: object::uid_to_inner(&hero.id),
    //         boar: object::uid_to_inner(&boar_id),
    //         game_id: id(game)
    //     });
    //     object::delete(boar_id);
    // }

    /// Add `new_sword` to the hero's inventory and return the old sword
    /// (if any)
    public fun equip_sword(warrior: &mut Player, new_weapon: Weapon): Option<Weapon> {
        if (option::is_some(&warrior.equipment_slot.sword)) {

        };
        option::swap_or_fill(&mut warrior.equipment_slot.sword,new_weapon)
    }

    const ENO_SWORD: u64 = 4;
    public fun remove_sword(warrior: &mut Player): Weapon {
        assert!(option::is_some(&warrior.equipment_slot.sword), ENO_SWORD);
        option::extract(&mut warrior.equipment_slot.sword)
    }



    /// Anyone can create a hero if they have a sword. All heroes start with the
    /// same attributes.
    public fun create_warrior(
        game: &GameInfo, ctx: &mut TxContext
    ): Player {
        Player {
            id: object::new(ctx),
            game_id: id(game),
            name:b"",
            attribute:Attribute{
                level:0,
                experience:0,
                hp:0,
                attack_lower_limit:0,
                attack_upper_limit:0,
                defense_lower_limit:0,
                defense_upper_limit:0,
                gold:0
            },
            equipment_slot:Equipment_Slot{
                sword:option::none()
            },
        }
    }

}