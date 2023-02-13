module basic_package::player {
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext, sender};
    use std::option::{Self, Option};
    use sui::transfer;
    use basic_package::monster::{get_monster_defense_lower_limit, MonsterInfo, get_monster_attack_lower_limit, get_monster_hp, get_drop_nft};
    use basic_package::map::{update_mapinfo_monster_number, Map, get_map_monster_number};
    use basic_package::items::ItemsInfo;
    // use sui::devnet_nft;
    // use sui::devnet_nft::DevNetNFT;
    use basic_package::player_rules::{PlayerLevelAndAttribute, get_level_hp, get_level_attack_lower_limit, get_level_attack_upper_limit, get_level_defense_lower_limit, get_level_defense_upper_limit, get_level_cost};


    const MONSTER_WON: u64 = 0;
    const NO_MONEY:u64 = 1;

    struct Player has key {
        id: UID,
        name:vector<u8>,
        /// Player attribute
        attribute:Attribute,
        /// Equipment
        equipment_slot:Equipment_Slot,
    }

    struct Attribute has store {
        level:u64,
        /// Hit points. If they go to zero, the player will die and don't to do anything
        hp:u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        gold:u64
    }

    struct Weapon has key, store {
        id: UID,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
    }

    struct Clothing has key, store {
        id: UID,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
    }


    struct Equipment_Slot has store{
        /// The hero's minimal inventory
        weapon: Option<Weapon>,
        clothing: Option<Clothing>,
    }

    /// Add `new_sword` to the hero's inventory and return the old sword
    /// (if any)
    // public fun equip_sword(warrior: &mut Player, new_weapon: Weapon): Option<Weapon> {
    //     if (option::is_some(&warrior.equipment_slot.sword)) {
    //
    //     };
    //     option::swap_or_fill(&mut warrior.equipment_slot.sword,new_weapon)
    // }
    //
    // const ENO_SWORD: u64 = 4;
    // public fun remove_sword(warrior: &mut Player): Weapon {
    //     assert!(option::is_some(&warrior.equipment_slot.sword), ENO_SWORD);
    //     option::extract(&mut warrior.equipment_slot.sword)
    // }


    /// Anyone can create a hero if they have a sword. All heroes start with the
    /// same attributes.
    public entry fun create_player(
        ctx: &mut TxContext
    ) {
        let player = Player {
            id: object::new(ctx),
            name:b"",
            attribute:Attribute{
                level:1,
                hp:100,
                attack_lower_limit:2,
                attack_upper_limit:0,
                defense_lower_limit:1,
                defense_upper_limit:0,
                gold:0
            },
            equipment_slot:Equipment_Slot{
                weapon:option::none(),
                clothing:option::none(),
            },
        };
        transfer::transfer(player,sender(ctx))
    }

    public entry fun battle_calculate(
        player:&mut Player,
        monster_info:&mut MonsterInfo,
        map:&mut Map,
        items_info:&mut ItemsInfo,
        map_name:vector<u8>,
        monster_name: vector<u8>,
        map_types:bool,
        monster_number: u8,
        ctx:&mut TxContext
    )
    {
        let player_attribute_attack_lower_limit = player.attribute.attack_lower_limit;
        let monster_defense_lower_limit = get_monster_defense_lower_limit(monster_info,monster_name);
        let player_damage_value = player_attribute_attack_lower_limit - monster_defense_lower_limit;

        let monster_attack_lower_limit = get_monster_attack_lower_limit(monster_info,monster_name);
        let player_attribute_defense_lower_limit = player.attribute.defense_lower_limit;
        let monster_damage_value = monster_attack_lower_limit - player_attribute_defense_lower_limit;

        let player_attribute_hp = player.attribute.hp;
        let monster_hp = get_monster_hp(monster_info,monster_name);

        let while_times = monster_hp/player_damage_value;
        let index = 0u64 ;
        while (index < while_times){
            // monster battle test
            player_attribute_hp = player_attribute_hp - monster_damage_value;
            assert!(player_attribute_hp >= monster_damage_value , MONSTER_WON);
            index = index + 1;
        };
        //update player hp
        player.attribute.hp = player_attribute_hp;
        //add gold
        player.attribute.gold = player.attribute.gold + 1u64;
        let old_monster_number = get_map_monster_number(map,map_name,map_types,monster_name,monster_number);
        let new_monster_number = old_monster_number - 1u8;
        // update map monster number
        update_mapinfo_monster_number(map,map_name,map_types,monster_name,old_monster_number,new_monster_number);
        // get drop nft and send to player
        get_drop_nft(monster_info,monster_name,items_info,ctx)
    }

    // public entry fun sell_items(nft:&mut DevNetNFT,player:&mut Player){
    //     devnet_nft::burn(*nft);
    //     player.attribute.gold = player.attribute.gold + 1;
    // }

    public entry fun upgrade_level(player: &mut Player,player_rules:&mut PlayerLevelAndAttribute){
        let old_level = player.attribute.level;
        let new_level = old_level + 1u64;
        let gold_cost = get_level_cost(player_rules,new_level);
        assert!(player.attribute.gold >= gold_cost,NO_MONEY);
        player.attribute.gold = player.attribute.gold - gold_cost;
        let new_hp = get_level_hp(player_rules,new_level);
        let new_attack_lower_limit = get_level_attack_lower_limit(player_rules,new_level);
        let new_attack_upper_limit = get_level_attack_upper_limit(player_rules,new_level);
        let new_defense_lower_limit = get_level_defense_lower_limit(player_rules,new_level);
        let new_defense_upper_limit = get_level_defense_upper_limit(player_rules,new_level);
        player.attribute.hp = new_hp;
        player.attribute.attack_lower_limit = new_attack_lower_limit;
        player.attribute.attack_upper_limit = new_attack_upper_limit;
        player.attribute.defense_lower_limit = new_defense_lower_limit;
        player.attribute.defense_upper_limit =  new_defense_upper_limit;
        player.attribute.level = new_level;
    }

    public entry fun restore_hit_points(player: &mut Player,player_rules:&mut PlayerLevelAndAttribute){
        assert!(player.attribute.gold >= 1u64,NO_MONEY);
        player.attribute.gold = player.attribute.gold - 1;
        let level = player.attribute.level;
        let new_hp = get_level_hp(player_rules,level);
        player.attribute.hp = new_hp;
    }
}