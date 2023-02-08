module basic_package::monster {
    use sui::object::{UID };
    use sui::vec_map::VecMap;
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};
    use sui::vec_map;


    struct MonsterInfo has key {
        id: UID,
        monster:VecMap<vector<u8>,Monster>
    }

     struct Monster has key,store,copy,drop {
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

    public entry fun set_monster_drop_info (monster_info:&mut MonsterInfo,monster_name:vector<u8>,items_name:vector<u8>,items_number:u64){
       let monster = vec_map::get_mut(&mut monster_info.monster,&monster_name);
        vec_map::insert(&mut monster.drop_config.items,items_name,items_number)
    }


}