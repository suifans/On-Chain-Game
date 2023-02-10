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




const battle_calculate = async (signer:any,monster_name:string) =>{
// ,playerObjectId:string,
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId:"0xea824e31540524d03e7853495507943974a2d81c",
        module: 'player',
        function: 'battle_calculate',
        typeArguments: [],
        arguments: [
            monster_name
        ],
        gasBudget: 1000000,
    });
    console.log(moveCallTxn);
}

const battle_calculateMain = async(playerObjectId,monster_name) =>{
    const signer = new RawSigner(keypair, provider);
    // await create_player(signer)
    playerObjectId
    await battle_calculate(signer,monster_name)
}


export {battle_calculateMain}
