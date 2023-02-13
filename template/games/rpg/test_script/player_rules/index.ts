import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
import {itemsInfoObjectId, mapObjectId, monsterObjectId, packageObjectId } from "../Constants";
const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)



const create_player_rules = async (signer:any) =>{
    const hp = '120'
    const attack_lower_limit = '5'
    const attack_upper_limit = '0'
    const defense_lower_limit = '1'
    const defense_upper_limit = '0'
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player_rules',
        function: 'create_player_rules',
        typeArguments: [],
        arguments: [
            hp,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}


const main = async() =>{
    const signer = new RawSigner(keypair, provider);
    await create_player_rules(signer)
}
main()