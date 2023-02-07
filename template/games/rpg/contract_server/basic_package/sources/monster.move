module basic_package::monster {
    use sui::object::{UID, ID};
    use sui::vec_map::VecMap;
    use std::vector;
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};
    use sui::vec_map;


    struct MonsterInfo has key {
        id: UID,
        monster:VecMap<vector<u8>,Monster>
    }

     struct Monster has store,copy,drop {
        hp: u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        drop_config: DropConfig
    }

    struct DropConfig has store,copy,drop {
        items:VecMap<vector<u8>,u64>
    }

    public entry fun create_monster_info(ctx:&mut TxContext){
       let monster_info = MonsterInfo{
           id:object::new(ctx),
           monster:vec_map::empty()
       };
        transfer::transfer(monster_info,sender(ctx))
    }

    public entry fun add_monster_info(
        monster_info:&mut MonsterInfo,
        monster_name:vector<u8>,
        hp: u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
    ){
        vec_map::insert(
            &mut monster_info.monster,
            monster_name,
            Monster{
                hp,
                attack_lower_limit,
                attack_upper_limit,
                defense_lower_limit,
                defense_upper_limit,
                drop_config:DropConfig{
                    items:vec_map::empty()
                }
            }
        )
    }

    // public fun create_and_add_monster_info(monster_info:MonsterInfo,monster:Monster,ctx:&mut TxContext){
    //     let new_monster_info = MonsterInfo{
    //         id:object::new(ctx),
    //         monster:vector::empty<Monster>()
    //     };
    //     transfer::transfer(new_monster_info,sender(ctx));
    //     let before_monster_info = monster_info.monster;
    //     vector::push_back(&mut before_monster_info,monster);
    //     transfer::transfer(monster_info,sender(ctx))
    // }


}