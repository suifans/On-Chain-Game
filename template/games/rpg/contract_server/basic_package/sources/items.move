module basic_package::items {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext, sender};
    use sui::vec_map::VecMap;
    use sui::vec_map;

    struct ItemsInfo has key {
        id: UID,
        items:VecMap<vector<u8>,Items>
    }

    struct Items has store,copy,drop {
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
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
        defense_upper_limit:u64
    ){
        vec_map::insert(
            &mut items_info.items,
            items_name,
            Items{
                attack_lower_limit,
                attack_upper_limit,
                defense_lower_limit,
                defense_upper_limit,
            }
        )
    }


}