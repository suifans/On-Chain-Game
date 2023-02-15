module basic_package::items {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::vec_map::VecMap;
    use sui::vec_map;
    use std::vector;

    const EVEC_LEN_NOT_MATCHING:u64 = 0;

    // ItemsInfo is a holder of Items prototypes
    struct ItemsInfo has key {
        id: UID,
        items:VecMap<vector<u8>,Items>
    }

    // Items is an item prototype
    struct Items has store,copy,drop {
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        description:vector<u8>,
        url_info:vector<u8>,
    }

    // SECTION I: INIT METHODS
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

    public entry fun create_items_info_batch(
        items_name:vector<vector<u8>>,
        attack_lower_limit:vector<u64>,
        attack_upper_limit:vector<u64>,
        defense_lower_limit:vector<u64>,
        defense_upper_limit:vector<u64>,
        description:vector<vector<u8>>,
        url_info:vector<vector<u8>>,
        ctx:&mut TxContext,
    ){
        assert!(vector::length(&items_name) == vector::length(&attack_lower_limit) && 
            vector::length(&items_name) == vector::length(&attack_upper_limit) &&
            vector::length(&items_name) == vector::length(&defense_lower_limit) &&
            vector::length(&items_name) == vector::length(&defense_upper_limit) &&
            vector::length(&items_name) == vector::length(&description) &&
            vector::length(&items_name) == vector::length(&url_info),
            EVEC_LEN_NOT_MATCHING);
        let items = vec_map::empty<vector<u8>,Items>();
        let len = vector::length(&items_name);
        let i = 0;
        while(i < len){
            vec_map::insert(
                &mut items,
                vector::pop_back(&mut items_name),
                Items{
                    attack_lower_limit:vector::pop_back(&mut attack_lower_limit),
                    attack_upper_limit:vector::pop_back(&mut attack_upper_limit),
                    defense_lower_limit:vector::pop_back(&mut defense_lower_limit),
                    defense_upper_limit:vector::pop_back(&mut defense_upper_limit),
                    description:vector::pop_back(&mut description),
                    url_info:vector::pop_back(&mut url_info)
                }
            );
            i = i+1;
        };
        let items_info = ItemsInfo{
            id:object::new(ctx),
            items
        };
        transfer::share_object(items_info)
    }

    // SECTION II: ADD METHODS
    public entry fun add_items_info(
        items_info:&mut ItemsInfo,
        items_name:vector<u8>,
        attack_lower_limit:u64,
        attack_upper_limit:u64,
        defense_lower_limit:u64,
        defense_upper_limit:u64,
        description:vector<u8>,
        url_info:vector<u8>
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
                url_info
            }
        )
    }

    public entry fun add_items_info_batch(
        items_info:&mut ItemsInfo,
        items_name:vector<vector<u8>>,
        attack_lower_limit:vector<u64>,
        attack_upper_limit:vector<u64>,
        defense_lower_limit:vector<u64>,
        defense_upper_limit:vector<u64>,
        description:vector<vector<u8>>,
        url_info:vector<vector<u8>>
    ){
        assert!(vector::length(&items_name) == vector::length(&attack_lower_limit) && 
            vector::length(&items_name) == vector::length(&attack_upper_limit) &&
            vector::length(&items_name) == vector::length(&defense_lower_limit) &&
            vector::length(&items_name) == vector::length(&defense_upper_limit) &&
            vector::length(&items_name) == vector::length(&description) &&
            vector::length(&items_name) == vector::length(&url_info),
            EVEC_LEN_NOT_MATCHING);
        let len = vector::length(&items_name);
        let i = 0;
        while(i < len){
            vec_map::insert(
                &mut items_info.items,
                vector::pop_back(&mut items_name),
                Items{
                    attack_lower_limit:vector::pop_back(&mut attack_lower_limit),
                    attack_upper_limit:vector::pop_back(&mut attack_upper_limit),
                    defense_lower_limit:vector::pop_back(&mut defense_lower_limit),
                    defense_upper_limit:vector::pop_back(&mut defense_upper_limit),
                    description:vector::pop_back(&mut description),
                    url_info:vector::pop_back(&mut url_info)
                }
            );
            i = i+1;
        }
    }

    // SECTION III: REMOVE METHODS
    public entry fun remove_items_info(items_info:&mut ItemsInfo,items_name:vector<u8>){
        vec_map::remove(&mut items_info.items,&items_name);
    }

    public entry fun remove_items_info_batch(items_info:&mut ItemsInfo,items_name:vector<vector<u8>>){
        let len = vector::length(&items_name);
        let i = 0;
        while(i < len){
            vec_map::remove(&mut items_info.items,vector::borrow(&items_name,i));
            i = i+1;
        }
    }

    // SECTION IV: GETTER METHODS
    // Not tested via Typescript yet because function with return value can't be entry function, which can't be accessed through TS SDK
    public fun get_items_info_v2(items_info:&mut ItemsInfo,items_name:vector<u8>):(u64,u64,u64,u64,vector<u8>,vector<u8>){
        let items = vec_map::get(&items_info.items,&items_name);
        (items.attack_lower_limit, items.attack_upper_limit, items.defense_lower_limit, items.defense_upper_limit, items.description, items.url_info)
    }

    public fun get_items_info_batch_v2(items_info:&mut ItemsInfo,items_name:vector<vector<u8>>):(vector<u64>,vector<u64>,vector<u64>,vector<u64>,vector<vector<u8>>,vector<vector<u8>>){
        let len = vector::length(&items_name);
        let i = 0;
        let attack_lower_limit = vector::empty<u64>();
        let attack_upper_limit = vector::empty<u64>();
        let defense_lower_limit = vector::empty<u64>();
        let defense_upper_limit = vector::empty<u64>();
        let description = vector::empty<vector<u8>>();
        let url_info = vector::empty<vector<u8>>();
        while(i < len){
            let items = vec_map::get(&items_info.items,vector::borrow(&items_name,i));
            vector::push_back(&mut attack_lower_limit,items.attack_lower_limit);
            vector::push_back(&mut attack_upper_limit,items.attack_upper_limit);
            vector::push_back(&mut defense_lower_limit,items.defense_lower_limit);
            vector::push_back(&mut defense_upper_limit,items.defense_upper_limit);
            vector::push_back(&mut description,items.description);
            vector::push_back(&mut url_info,items.url_info);
            i = i+1;
        };
        (attack_lower_limit,attack_upper_limit,defense_lower_limit,defense_upper_limit,description,url_info)
    }

    // SECTION IV.2: DEPRECATED GETTER METHODS
    // other modules still depend on these getter methods but they will be removed in the future
    public fun get_items_info(items_info:&mut ItemsInfo,items_name:vector<u8>):(vector<u8>,vector<u8>){
        let items = vec_map::get(&items_info.items,&items_name);
        (items.description, items.url_info)
    }

    // SECTION V: SETTER METHODS
    public entry fun set_items_info(
        items_info:&mut ItemsInfo,
        items_name:vector<u8>,
        new_attack_lower_limit:u64,
        new_attack_upper_limit:u64,
        new_defense_lower_limit:u64,
        new_defense_upper_limit:u64,
        new_description:vector<u8>,
        new_url_info:vector<u8>    
    ){
        let state = vec_map::contains(&items_info.items,&items_name);
        if (state){
            let items = vec_map::get_mut(&mut items_info.items,&items_name);
            items.attack_lower_limit = new_attack_lower_limit;
            items.attack_upper_limit = new_attack_upper_limit;
            items.defense_lower_limit = new_defense_lower_limit;
            items.defense_upper_limit = new_defense_upper_limit;
            items.description = new_description;
            items.url_info = new_url_info;
        }
    }

    public entry fun set_items_info_batch(
        items_info:&mut ItemsInfo,
        items_name:vector<vector<u8>>,
        new_attack_lower_limit:vector<u64>,
        new_attack_upper_limit:vector<u64>,
        new_defense_lower_limit:vector<u64>,
        new_defense_upper_limit:vector<u64>,
        new_description:vector<vector<u8>>,
        new_url_info:vector<vector<u8>>
    ){
        assert!(vector::length(&items_name) == vector::length(&new_attack_lower_limit) &&
                vector::length(&items_name) == vector::length(&new_attack_upper_limit) &&
                vector::length(&items_name) == vector::length(&new_defense_lower_limit) &&
                vector::length(&items_name) == vector::length(&new_defense_upper_limit) &&
                vector::length(&items_name) == vector::length(&new_description) &&
                vector::length(&items_name) == vector::length(&new_url_info),
                EVEC_LEN_NOT_MATCHING);
        let len = vector::length(&items_name);
        let i = 0;
        while(i < len){
            let state = vec_map::contains(&items_info.items,vector::borrow(&items_name,i));
            if (state){
                let items = vec_map::get_mut(&mut items_info.items,vector::borrow(&items_name,i));
                items.attack_lower_limit = *vector::borrow(&new_attack_lower_limit,i);
                items.attack_upper_limit = *vector::borrow(&new_attack_upper_limit,i);
                items.defense_lower_limit = *vector::borrow(&new_defense_lower_limit,i);
                items.defense_upper_limit = *vector::borrow(&new_defense_upper_limit,i);
                items.description = *vector::borrow(&new_description,i);
                items.url_info = *vector::borrow(&new_url_info,i);
            };
            i = i+1;
        }
    }
}