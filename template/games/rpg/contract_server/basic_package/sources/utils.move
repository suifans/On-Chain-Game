module rpg_game::utils {
    use sui::address;
    use sui::object::{Self, ID};
    use rpg_game::main::GameInfo;

    // --- Game integrity / Links checks ---

    public fun check_id(game_info: &GameInfo, id: ID) {
        assert!(id(game_info) == id, 403); // TODO: error code
    }

    public fun id(game_info: &GameInfo): ID {
        object::id(game_info)
    }

    public fun create_address(map_name: vector<u8>): address {
        address::from_bytes(map_name)
    }

}