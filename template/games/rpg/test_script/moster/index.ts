import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)

const create_monster_info = async (signer:any)=> {
    const monster_name = "chicken"
    const hp = "1"
    const attack_lower_limit = "1"
    const attack_upper_limit = "1"
    const defense_lower_limit = "1"
    const defense_upper_limit = "1"
    const items_name = "weapon"
    const items_number = "1"
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x06fc60ac485d6ae9f669e7339c71c99b4ebf3675',
        module: 'monster',
        function: 'create_monster_info',
        // typeArguments: ['vector','u64','u64','u64','u64','u64','vector','u64'],
        typeArguments: [],
        arguments: [
            monster_name,
            hp,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
            items_name,
            items_number
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const add_monster_info = async (signer:any)=> {
    const monster_info = '0x0152c0b32c106de2f46ddb4e743a216fea28fd36'
    const monster_name = 'hello'
    const hp = "10"
    const attack_lower_limit = "0"
    const attack_upper_limit = "2"
    const defense_lower_limit = "0"
    const defense_upper_limit = "0"
    const items_name = "clothing"
    const items_number = "1"
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x06fc60ac485d6ae9f669e7339c71c99b4ebf3675',
        module: 'monster',
        function: 'add_monster_info',
        typeArguments: [],
        arguments: [
            monster_info,
            monster_name,
            hp,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
            items_name,
            items_number
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}



const main =  async () =>{
    const signer = new RawSigner(keypair, provider);
    // await create_monster_info(signer)
    await add_monster_info(signer)
}

main();