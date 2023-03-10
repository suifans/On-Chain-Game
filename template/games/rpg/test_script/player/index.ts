import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
import {
    itemsInfoObjectId,
    mapObjectId,
    monsterObjectId,
    packageObjectId,
    playerObjectId,
    playerRulesObjectId
} from "../Constants";
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
    const map_name = 'China'
    const monster_name = 'chicken'
    const map_types = true
    const monster_number = 100

    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'battle_calculate',
        typeArguments: [],
        arguments: [
            playerObjectId,
            monsterObjectId,
            mapObjectId,
            itemsInfoObjectId,
            map_name,
            monster_name,
            map_types,
            monster_number,
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}

const upgrade_level = async (signer:any) =>{
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'upgrade_level',
        typeArguments: [],
        arguments: [
            playerObjectId,
            playerRulesObjectId,
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}

const restore_hit_points = async (signer:any) =>{
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'restore_hit_points',
        typeArguments: [],
        arguments: [
            playerObjectId,
            playerRulesObjectId,
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}


const sell_items = async (signer:any) =>{
    const nftObjectId = '0x44d76ccafc9d6aee304b11f7dfa155c03843daf4'
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'player',
        function: 'sell_items',
        typeArguments: [],
        arguments: [
            nftObjectId,
            playerObjectId
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}

const main = async() =>{
    const signer = new RawSigner(keypair, provider);
    // await create_player(signer)
    // await battle_calculate(signer)
    await sell_items(signer)
}
main()
