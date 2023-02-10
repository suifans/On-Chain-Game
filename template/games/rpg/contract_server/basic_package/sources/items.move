module basic_package::items {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
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
        description:vector<u8>,
        url_info:vector<u8>,
    }

    public entry fun create_items_info(
        items_name:vector<u8>,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        description:vector<u8>,
        url_info:vector<u8>,
        ctx:&mut TxContext,
    ){
        let items = vec_map::empty<vector<u8>,Items>();
        vec_map::insert(
            &mut items,
            items_name,
            Items{
                attack_lower_limit,
                attack_upper_limit,
                defense_lower_limit,
                defense_upper_limit,
                description,
                url_info
        });
        let items_info = ItemsInfo{
            id:object::new(ctx),
            items
        };
        transfer::share_object(items_info)
    }

    // public entry fun add_items_info(
    //     items_info:&mut ItemsInfo,
    //     items_name:vector<u8>,
    //     attack_lower_limit:u64,
    //     attack_upper_limit:u64,
    //     defense_lower_limit:u64,
    //     defense_upper_limit:u64,
    //     description:vector<u8>,
    //     url_info:vector<u8>
    // ){
    //     vec_map::insert(
    //         &mut items_info.items,
    //         items_name,
    //         Items{
    //             attack_lower_limit,
    //             attack_upper_limit,
    //             defense_lower_limit,
    //             defense_upper_limit,
    //             description,
    //             url_info
    //         }
    //     )
    // }

    public fun get_items_info(items_info:&mut ItemsInfo,items_name:vector<u8>):(vector<u8>,vector<u8>){
        let items = vec_map::get(&items_info.items,&items_name);
        (items.description, items.url_info)
    }




}