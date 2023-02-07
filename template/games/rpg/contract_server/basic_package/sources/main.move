module basic_package::main {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};


    /// An immutable object that contains information about the
    /// game admin. Created only once in the module initializer,
    /// hence it cannot be recreated or falsified.
    struct GameInfo has key {
        id: UID,
        admin: address
    }

    /// Capability conveying the authority to create boars and potions
    struct GameAdmin has key {
        id: UID,
    }

    /// On module publish, sender creates a new game. But once it is published,
    /// anyone create a new game with a `new_game` function.
    fun init(ctx: &mut TxContext) {
        create(ctx);
    }

    /// Create a new game. Separated to bypass public entry vs init requirements.
    fun create(ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let id = object::new(ctx);

        transfer::freeze_object(GameInfo {
            id,
            admin: sender,
        });

        transfer::transfer(
            GameAdmin {
                id: object::new(ctx),
            },
            sender
        )
    }
}