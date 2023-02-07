module basic_package::monster {
    use sui::object::{UID, ID};

    struct Monster has key,store{
        id: UID,
        boar:Boar
    }

     struct Boar has store {
        /// Hit points before the boar is slain
        hp: u64,
        /// Strength of this particular boar
        strength: u64,
        /// An ID of the game
        game_id: ID,
    }

    

}