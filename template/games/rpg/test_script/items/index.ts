import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
import {itemsInfoObjectId, mapObjectId, packageObjectId} from "../Constants";

const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)


const create_items_info = async (signer:any)=> {
    const items_name = "药水哥"
    const attack_lower_limit = '0'
    const attack_upper_limit = '0'
    const defense_lower_limit = '0'
    const defense_upper_limit = '0'
    const description = '恁爹'
    const url_info = 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX'
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'create_items_info',
        typeArguments: [],
        arguments: [
            items_name,
            attack_lower_limit,
            attack_upper_limit,
            defense_lower_limit,
            defense_upper_limit,
            description,
            url_info,
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const add_items_info = async (signer:any)=> {
    const items_name = "药水哥"
    const attack_lower_limit = '0'
    const attack_upper_limit = '0'
    const defense_lower_limit = '0'
    const defense_upper_limit = '0'
    const description = '恁爹'
    const url_info = 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX'
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'add_items_info',
        typeArguments: [],
        arguments: [
        itemsInfoObjectId,
        items_name,
        attack_lower_limit,
        attack_upper_limit,
        defense_lower_limit,
        defense_upper_limit,
        description,
        url_info,
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const main =  async () =>{
    const signer = new RawSigner(keypair, provider);
    await create_items_info(signer)
    // await add_items_info(signer)

}

main();