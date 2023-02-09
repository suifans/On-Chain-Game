module basic_package::map {
    use sui::vec_map::{Self, VecMap};
    use sui::object::UID;
    use std::vector;
    use std::string::{String};
    use sui::transfer;
    use sui::tx_context::{sender, TxContext};
    use sui::object;
    use std::string;

    struct Map has key {
        id: UID,
        map_info: VecMap<MapDetails,vector<MapMonsterSetting>>
    }

    struct MapDetails has copy, store, drop {
        name: vector<u8>,
        types: bool
    }

    struct MapMonsterSetting has store, copy, drop {
        monster_name: vector<u8>,
        monster_number: u8
    }

    public entry fun create_map_info(name: vector<u8>, types: bool,ctx: &mut TxContext){
        let m = vec_map::empty<MapDetails, vector<MapMonsterSetting>>();
        vec_map::insert(&mut m, MapDetails{name, types}, vector[MapMonsterSetting{monster_name: b"hello",monster_number: 0}]);
        let map = Map{
            id: object::new(ctx),
            map_info: m
        };
        transfer::transfer(map,sender(ctx));
    }

    public entry fun add_map_and_monster(map:&mut Map, name: vector<u8>, types: bool, monster_name: vector<u8>, monster_number: u8){
        let (mapdetail_k, mapmonster_v) = vec_map::remove(&mut map.map_info, &MapDetails{name, types});
        vector::push_back(&mut mapmonster_v , MapMonsterSetting{monster_name, monster_number});
        vec_map::insert(&mut map.map_info, mapdetail_k, mapmonster_v);
    }

    //
//    public entry fun set_map_moster_setting(map:&mut Map,name: vector<u8>, types: bool,monster_name:vector<u8>,monster_number:u8){
//        let vec = vec_map::get_mut(&mut map.map_info,&MapDetails{name,types});
//        vector::push_back(vec,MapMonsterSetting {
//            monster_name,
//            monster_number
//        });
//    }

    // #[test]
    // public fun test_map(){
    //     use sui::vec_map;
    //     use sui::table_vec;
    //     use sui::tx_context;
    //     use std::debug;
    //     use sui::object;
    //     use sui::transfer;
    //
    //     // create a dummy TxContext for testing
    //     let ctx = tx_context::dummy();
    //     let details = MapDetails{
    //         name:b"sky",
    //         types:true
    //     };
    //     let setting = MapMonsterSetting{
    //         monster_name:b"a",
    //         monster_number:10
    //     };
    //     let map_info = Map{
    //         id:object::new(&mut ctx),
    //         map_info:vec_map::empty()
    //     };
    //
    //     let all_setting = vector::empty<MapMonsterSetting>();
    //     // vector::insert(&mut all_setting,setting,vector::length(&mut all_setting));
    //     vec_map::insert(&mut map_info.map_info,details,all_setting);
    //     // debug::print(&map_info.map_info);
    //     // let map_monster_setting = table_vec::push_back(&mut MapMonsterSetting,setting);
    //     // debug::print(&map_monster_setting);
    //     let monster_setting = vec_map::get(&mut map_info.map_info,&details);
    //     debug::print(monster_setting);
    //     let dummy_address = @0xCAFE;
    //     transfer::transfer(map_info, dummy_address);
    // }

    #[test]
    public fun test_create_map(){
            use sui::tx_context;
            use sui::object;
            use sui::transfer;
            use sui::tx_context::sender;
            use sui::vec_map;
            use std::vector;
            use std::debug;

        let map_details = MapDetails {
            name: b"test",
            types: false
        };
        let ctx = tx_context::dummy();
        let map = Map{
            id:object::new(&mut ctx),
            map_info:vec_map::empty()
        };
        vec_map::insert(&mut map.map_info,map_details,vector::empty<MapMonsterSetting>());
        let map_monster_setting = MapMonsterSetting {
            monster_name: b"test",
            monster_number:0
        };
        let vec = vec_map::get_mut(&mut map.map_info,&map_details);
        vector::push_back(vec,map_monster_setting);
        let value = vec_map::get(&mut map.map_info,&map_details);
        debug::print(value);
        transfer::transfer(map,sender(&mut ctx));

    }
}