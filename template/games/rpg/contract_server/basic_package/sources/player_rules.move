module basic_package::player_rules {
    use sui::vec_map::VecMap;
    use sui::tx_context::TxContext;
    use sui::vec_map;
    use sui::object::UID;
    use sui::object;
    use sui::transfer;

    struct PlayerLevelAndAttribute has key {
        id: UID,
        level_and_attribute: VecMap<u64, AttributeDetails>,
        level_and_gold_cost: VecMap<u64, u64>
    }


    struct AttributeDetails has copy,drop,store {
        hp:u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
    }

    public entry fun create_player_rules(
        hp: u64,
        attack_lower_limit: u64,
        attack_upper_limit: u64,
        defense_lower_limit: u64,
        defense_upper_limit: u64,
        ctx: &mut TxContext
    ){
        let attribute = AttributeDetails{
            hp,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
        };
        let player_level_and_attribute = vec_map::empty<u64, AttributeDetails>();
        let level_and_gold_cost = vec_map::empty<u64, u64>();
        let player_level_and_attribute = PlayerLevelAndAttribute{
            id:object::new(ctx),
            level_and_attribute:player_level_and_attribute,
            level_and_gold_cost
        };
        vec_map::insert(&mut player_level_and_attribute.level_and_attribute,2,attribute);
        vec_map::insert(&mut player_level_and_attribute.level_and_gold_cost,2,4);
        transfer::share_object(player_level_and_attribute);
    }

    public fun get_level_cost(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let level_and_gold_cost = vec_map::get(&player_rules.level_and_gold_cost,&level);
        *level_and_gold_cost
    }

    public fun get_level_hp(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let attribute_details = vec_map::get(&player_rules.level_and_attribute,&level);
        attribute_details.hp
    }

    public fun get_level_attack_lower_limit(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let attribute_details = vec_map::get(&player_rules.level_and_attribute,&level);
        attribute_details.attack_lower_limit
    }

    public fun get_level_attack_upper_limit(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let attribute_details = vec_map::get(&player_rules.level_and_attribute,&level);
        attribute_details.attack_upper_limit
    }

    public fun get_level_defense_lower_limit(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let attribute_details = vec_map::get(&player_rules.level_and_attribute,&level);
        attribute_details.defense_lower_limit
    }

    public fun get_level_defense_upper_limit(player_rules:&mut PlayerLevelAndAttribute,level:u64):u64{
        let attribute_details = vec_map::get(&player_rules.level_and_attribute,&level);
        attribute_details.defense_upper_limit
    }
}