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

const create_items_info_batch = async (signer:any)=> {
    const items_name = ["药水哥2", "药水哥3"]
    const attack_lower_limit = ['0', '10']
    const attack_upper_limit = ['0', '10']
    const defense_lower_limit = ['0', '10']
    const defense_upper_limit = ['0', '10']
    const description = ['lol', 'lmao']
    const url_info = ['https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX', 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX']
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'create_items_info_batch',
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
    const items_name = "药水哥4"
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

const add_items_info_batch = async (signer:any)=> {
    const items_name = ["药水哥5", "药水哥6"]
    const attack_lower_limit = ['0', '10']
    const attack_upper_limit = ['0', '10']
    const defense_lower_limit = ['0', '10']
    const defense_upper_limit = ['0', '10']
    const description = ['lol', 'lmao']
    const url_info = ['https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX', 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX']
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'add_items_info_batch',
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

const remove_items_info = async (signer:any)=> { 
    const items_name = [
        232,
        141,
        175,
        230,
        176,
        180,
        229,
        147,
        165,
        51
      ]
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'remove_items_info',
        typeArguments: [],
        arguments: [
        itemsInfoObjectId,
        items_name,
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const remove_items_info_batch = async (signer:any)=> {
    const items_name = [
        [
        232,
        141,
        175,
        230,
        176,
        180,
        229,
        147,
        165,
        50
        ],
        [
        232,
        141,
        175,
        230,
        176,
        180,
        229,
        147,
        165,
        52
        ]
      ]
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'remove_items_info_batch',
        typeArguments: [],
        arguments: [
        itemsInfoObjectId,
        items_name,
        ],
        gasBudget: 10000,
    });
    console.log(moveCallTxn);
}

const set_items_info = async (signer:any)=> {
    const items_name = [
        232,
        141,
        175,
        230,
        176,
        180,
        229,
        147,
        165,
        54
      ];
    const attack_lower_limit = '1'
    const attack_upper_limit = '1'
    const defense_lower_limit = '1'
    const defense_upper_limit = '1'
    const description = '恁爹2'
    const url_info = 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX'
    
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'set_items_info',
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

const set_items_info_batch = async (signer:any)=> {
    const items_name = [
        [
            232,
            141,
            175,
            230,
            176,
            180,
            229,
            147,
            165,
            54
          ],
          [
            232,
            141,
            175,
            230,
            176,
            180,
            229,
            147,
            165,
            53
          ]
      ];
    const attack_lower_limit = ['2', '2']
    const attack_upper_limit = ['2', '2']
    const defense_lower_limit = ['2', '2']
    const defense_upper_limit = ['2', '2']
    const description = ['恁爹2', '恁爹3']
    const url_info = ['https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX', 'https://belaunch.infura-ipfs.io/ipfs/QmXinKPP7QkovqPpDxaRCyXQy6QB91DYwBTEvKsGnT6RLX']
    
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId,
        module: 'items',
        function: 'set_items_info_batch',
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
    
    // tested by Henry
    await create_items_info(signer);
    
    // tested at txn digest: 5xeV2m6nBrWw8GQt4mhLQGmR4yE8T58yX8DKaspvaTA3, created ItemsInfo at object id: 0xaf1e2c5084838161279075c559bd21480d9f0287
    // await create_items_info_batch(signer); 
    
    // tested at txn digest: 3KJarRfqMmCnecb2b2hJWGsayc1rAgbBrwEX7JRWXHWn
    // await add_items_info(signer); 
    
    // tested at txn digest: CLuzcz8iHck95dgY18oCVWi1vV76oxQrUfuYEyD51CJL
    // await add_items_info_batch(signer); 

    // tested successfully at txn digest: 5YqTVJ1CbReeEyw1SVepZG2kZuQKnTEMfj1M9axi6vV8 (need to pass in vector<u8> instead of Chinese string for this to be successful);
    // passing in Chinese string failed at txn digest: HkZ5Kuuh2DEamYhnbLNXBTRyEPM3KCEdvDKCRtMjmhGW with error message KEY_NOT_FOUND for vec_map::remove --> vec_map::idx
    // await remove_items_info(signer); 
    
    // tested successfully at txn digest: GCkFUwDbqK7pe1GDcfdbDZJR6VbLME6uq4bQRbrPa81H (need to pass in vector<u8> instead of Chinese string for this to be successful);
    // await remove_items_info_batch(signer);

    // tested successfully at txn digest: G8csmFdpCh7mHL4NCUMxTGAjGZa5TEbyftf6CoZ3beNu (need to pass in vector<u8> instead of Chinese string for this to be successful);
    // await set_items_info(signer);

    // tested successfully at txn digest: 0x427cd1fce648976f7ec64206ae6a7669f7f8480f (need to pass in vector<u8> instead of Chinese string for this to be successful);
    // await set_items_info_batch(signer);
}



main();