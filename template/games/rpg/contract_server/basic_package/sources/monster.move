module basic_package::monster {
    use sui::object::{UID };
    use sui::vec_map::VecMap;
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::vec_map;
    use std::vector;
    use sui::devnet_nft;
    use basic_package::items::{ItemsInfo, get_items_info};


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



    public entry fun create_monster_info(
        monster_name:vector<u8>,
        hp: u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        items_name:vector<u8>,
        items_number:u64,
        ctx:&mut TxContext
    ){
       let m = vec_map::empty<vector<u8>,Monster>();
       let items =  vec_map::empty<vector<u8>,u64>();
       vec_map::insert(&mut items,items_name,items_number);
       vec_map::insert(&mut m,monster_name,Monster{
            hp,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
            drop_config:DropConfig{
                items
            },
       });

       let monster_info = MonsterInfo{
           id:object::new(ctx),
           monster:m
       };
        transfer::share_object(monster_info);
        // transfer::transfer(monster_info,sender(ctx))
    }

    public entry fun add_monster_info(
        monster_info:&mut MonsterInfo,
        monster_name:vector<u8>,
        hp: u64,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        items_name:vector<u8>,
        items_number:u64,
    ){
        let items =  vec_map::empty<vector<u8>,u64>();
        vec_map::insert(&mut items,items_name,items_number);
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
                    items
                }
            }
        )
    }

    public fun get_drop_nft(monster_info:&mut MonsterInfo,monster_name:vector<u8>,items_info:&mut ItemsInfo,ctx:&mut TxContext){
        // get monster drop all items_name
        let (items_name_key,_items_number) = get_monster_drop_itmes(monster_info,monster_name);
        // times
        let items_while_times = vector::length(&items_name_key);
        let items_index = 0u64 ;
        while (items_index < items_while_times){
            // get times name
            let items_name = vector::borrow(&items_name_key,items_index);
            // get items ds and url
            let (items_description, items_url_info) = get_items_info(items_info,*items_name);
            // send
            devnet_nft::mint(*items_name,items_description,items_url_info,ctx);
            items_index = items_index + 1;
        }
    }

    public fun get_monster_hp(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
        let monster  = vec_map::get(&monster_info.monster,&monster_name);
        monster.hp
    }

    public fun get_monster_attack_lower_limit(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
        let monster  = vec_map::get(&monster_info.monster,&monster_name);
        monster.attack_lower_limit
    }

    public fun get_monster_attack_upper_limit(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
        let monster  = vec_map::get(&monster_info.monster,&monster_name);
        monster.attack_upper_limit
    }

    public fun get_monster_defense_lower_limit(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
        let monster  = vec_map::get(&monster_info.monster,&monster_name);
        monster.defense_lower_limit
    }

    public fun get_monster_drop_itmes(monster_info:&mut MonsterInfo,monster_name:vector<u8>):(vector<vector<u8>>,vector<u64>){
        let monster  = vec_map::get(&monster_info.monster,&monster_name);
        let drop_items = monster.drop_config.items;
        let (items_name_key,items_number) = vec_map::into_keys_values(drop_items);
        (items_name_key,items_number)
    }



    // public fun get_monster_defense_upper_limit(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
    //     let monster  = vec_map::get(&monster_info.monster,&monster_name);
    //     monster.defense_upper_limit
    // }
    //
    // public fun get_monster_defense_upper_limit(monster_info:&mut MonsterInfo,monster_name:vector<u8>) : u64{
    //     let monster  = vec_map::get(&monster_info.monster,&monster_name);
    //     // let drop_items = vec_map::
    //
    // }

}