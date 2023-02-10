import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
import {mapObjectId, monsterObjectId, packageObjectId, playerObjectId} from "../Constants";
const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)


const create_player = async (signer:any) =>{
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'create_player',
        typeArguments: [],
        arguments: [
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const battle_calculate = async (signer:any) =>{
    const monster_name = 'chicken'
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'battle_calculate',
        typeArguments: [],
        arguments: [
            playerObjectId,
            monsterObjectId,
            monster_name
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}


const main = async() =>{
    const signer = new RawSigner(keypair, provider);
    // await create_player(signer)
    await battle_calculate(signer)
}
main()