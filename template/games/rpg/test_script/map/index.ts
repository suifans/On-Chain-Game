import {Ed25519Keypair, JsonRpcProvider, RawSigner, TypeTag} from '@mysten/sui.js';
import {fromExportedKeypair} from "@mysten/sui.js";
import {ExportedKeypair} from "@mysten/sui.js/src/cryptography/keypair";
const  _ = require('lodash');
const { execSync } = require('child_process');


const provider = new JsonRpcProvider();
const schema = new Ed25519Keypair().getKeyScheme();
const private_key = 'QVg8OT8vnrT/JdXLHpV3wiBhR1FcdHmamoac5IE2PF+15p+mCrEzOnYixuwiaUOCyUl9emkEbvYoXka++RHEQQ=='
const key_pair_struct:ExportedKeypair = {
    schema,
    privateKey:private_key
}
const keypair = fromExportedKeypair(key_pair_struct)


const create_map_info = async (signer:any) => {
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x23c7e5d8a9a4b7736472640d89cc7b5379a41f86',
        module: 'map',
        function: 'create_map_info',
        typeArguments: [],
        arguments: [
            "biqi",
            true
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const add_map_and_monster = async (signer:any) =>{
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x23c7e5d8a9a4b7736472640d89cc7b5379a41f86',
        module: 'map',
        function: 'add_map_and_monster',
        typeArguments: [],
        arguments: [
            "0xc62f25b044a4069831d2ae317df9ffb04c40a3d2",
            "chicken",
            10
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

function Uint8ArrayToString(fileData:any){
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}

const query_map_info = async  () =>{
    const provider = new JsonRpcProvider();
    const txn = await provider.getObject(
        '0xc62f25b044a4069831d2ae317df9ffb04c40a3d2',
    );
    // @ts-ignore
    // console.log(txn.details.data.fields)

    // @ts-ignore

    const a = txn.details.data.fields.map_info.fields.contents[0].fields.key.fields.name
    // @ts-ignore


    // console.log(txn.details.data.fields.map_info.fields.contents[0].fields.key.fields.name)
    // // @ts-ignore
    // console.log(txn.details.data.fields.map_info.fields.contents[0].fields.value[0].fields)
    // @ts-ignore
    // let a = Object.getOwnPropertyNames(txn.details.data.fields.map_info.fields.contents)
    // console.log(a)

    // @ts-ignore
    // const {key,value} = JSON.stringify(txn.details.data.fields.map_info.fields.contents.fields)
    // console.log(JSON.stringify(txn.details.data.fields.map_info.fields.contents))
    // @ts-ignore
    // console.log(JSON.stringify(txn.details.data.fields.map_info.fields.contents))
    // // @ts-ignore
    // console.log(txn.details.data.fields.map_info.fields.contents.fields)
}

const main =  async () =>{
    const signer = new RawSigner(keypair, provider);
    // await create_map_info(signer)
    // await add_map_and_monster(signer)
    await query_map_info()
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