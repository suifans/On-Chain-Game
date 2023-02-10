module basic_package::monster {
    use sui::object::{UID };
    use sui::vec_map::VecMap;
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};
    use sui::vec_map;
    use std::vector;
    use sui::devnet_nft;


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

    struct ItemsInfo has key {
        id: UID,
        items:VecMap<vector<u8>,Items>
    }

    struct Items has store,copy,drop {
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        description:vector<u8>,
        url:vector<u8>,
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

    public entry fun create_items_info(ctx:&mut TxContext){
        let items_info = ItemsInfo{
            id:object::new(ctx),
            items:vec_map::empty()
        };
        transfer::transfer(items_info,sender(ctx))
    }

    public entry fun add_items_info(
        items_info:&mut ItemsInfo,
        items_name:vector<u8>,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        description:vector<u8>,
        url:vector<u8>
    ){
        vec_map::insert(
            &mut items_info.items,
            items_name,
            Items{
                attack_lower_limit,
                attack_upper_limit,
                defense_lower_limit,
                defense_upper_limit,
                description,
                url
            }
        )
    }

    public fun drop_nft(monster_name:vector<u8>,monster_info:&mut MonsterInfo,items_info:&mut ItemsInfo,ctx:&mut TxContext){
        let monster = vec_map::get(&monster_info.monster,&monster_name);
        let items = &monster.drop_config.items;
        let items_name_keys = vec_map::keys(items);
        let items_name_keys_length = vector::length(&items_name_keys);
        let index = 0u64;
        while (index < items_name_keys_length)  {
            let items_name = vector::borrow(&items_name_keys,index);
            let items_info = vec_map::get(&items_info.items,items_name);
            let items_description = items_info.description;
            let items_url = items_info.url;
            devnet_nft::mint(*items_name,items_description,items_url,ctx);
            index = index + 1
        };
    }

    public fun get_monster_info(monster_info:&mut MonsterInfo) :&MonsterInfo{
        monster_info
    }
}