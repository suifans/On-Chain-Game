module basic_package::monster {
    use sui::object::{UID, ID};
    use sui::vec_map::VecMap;
    use std::vector;
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};


    struct MonsterInfo has key {
        id: UID,
        monster:vector<Monster>
    }

     struct Monster has store,copy,drop {
        name:vector<u8>,
        /// Hit points before the boar is slain
        hp: u64,
        /// Strength of this particular boar
        strength: u64,
        /// An ID of the game
        game_id: ID,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        drop_config: DropConfig
    }

    struct DropConfig has store,copy,drop {
        items:VecMap<vector<u8>,u64>
    }

    public fun create_monster_info(ctx:&mut TxContext){
       let monster_info = MonsterInfo{
           id:object::new(ctx),
           monster:vector::empty<Monster>()
       };
        transfer::transfer(monster_info,sender(ctx))
    }

    public fun add_monster_info(monster_info:MonsterInfo,monster:Monster,ctx:&mut TxContext){
        let vec_monster = monster_info.monster;
        vector::push_back(&mut vec_monster,monster);
        transfer::transfer(monster_info,sender(ctx))
    }

    public fun create_and_add_monster_info(monster_info:MonsterInfo,monster:Monster,ctx:&mut TxContext){
        let new_monster_info = MonsterInfo{
            id:object::new(ctx),
            monster:vector::empty<Monster>()
        };
        transfer::transfer(new_monster_info,sender(ctx));
        let before_monster_info = monster_info.monster;
        vector::push_back(&mut before_monster_info,monster);
        transfer::transfer(monster_info,sender(ctx))
    }


}