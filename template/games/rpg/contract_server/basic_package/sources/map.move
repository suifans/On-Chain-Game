module basic_package::map {
    use sui::vec_map::VecMap;
    use sui::object::UID;
    use sui::table_vec::TableVec;

    struct Map has key {
        id:UID,
        map_info:VecMap<MapDetails,TableVec<MapMonsterSetting>>
    }

    struct MapDetails has store, copy, drop {
        name: vector<u8>,
        types: bool
    }

    struct MapMonsterSetting has store {
        monster_name:vector<u8>,
        monster_number:u8
    }


    #[test]
    public fun test_map(){
        use sui::vec_map;
        use sui::table_vec;
        use sui::tx_context;
        use std::debug;
        use sui::object;
        use sui::transfer;

        // create a dummy TxContext for testing
        let ctx = tx_context::dummy();
        let details = MapDetails{
            name:b"sky",
            types:true
        };
        let setting = MapMonsterSetting{
            monster_name:b"a",
            monster_number:10
        };
        let map_info = Map{
            id:object::new(&mut ctx),
            map_info:vec_map::empty()
        };

        let all_setting = table_vec::empty<MapMonsterSetting>(&mut ctx);
        table_vec::push_back(&mut all_setting,setting);
        vec_map::insert(&mut map_info.map_info,details,all_setting);
        // debug::print(&map_info.map_info);
        // let map_monster_setting = table_vec::push_back(&mut MapMonsterSetting,setting);
        // debug::print(&map_monster_setting);

        let monster_setting = vec_map::get(&mut map_info.map_info,&details);
        debug::print(monster_setting);


        let dummy_address = @0xCAFE;
        transfer::transfer(map_info, dummy_address);

    }
}