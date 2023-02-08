import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
const { execSync } = require('child_process');

const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)


const create_map = async (signer:any) => {
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x57160d59d9194cddae32389186a8bb0acf14e561',
        module: 'map',
        function: 'create_map',
        typeArguments: [],
        arguments: [],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const add_mapinfo_and_monster = async (signer:any) =>{
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x57160d59d9194cddae32389186a8bb0acf14e561',
        module: 'map',
        function: 'add_mapinfo_and_monster',
        typeArguments: [],
        arguments: [
            "0xdd6dc74e6a8353b74949a04e4a7a700cd0e91523",
            "city",
            true,
            "chicken",
            10
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}


const main =  async () =>{
    const signer = new RawSigner(keypair, provider);
    // await create_map(signer)
    await add_mapinfo_and_monster(signer)
}

main();


// const moveCallTxn = await signer.executeMoveCall({
//     packageObjectId: '0x2',
//     module: 'devnet_nft',
//     function: 'mint',
//     typeArguments: [],
//     arguments: [
//         'Example NFT',
//         'An NFT created by the wallet Command Line Tool',
//         'ipfs://bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty',
//     ],
//     gasBudget: 10000,
// });
// console.log('moveCallTxn', moveCallTxn);