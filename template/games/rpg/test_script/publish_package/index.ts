import {Ed25519Keypair, JsonRpcProvider, RawSigner} from '@mysten/sui.js';
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


const main =  async () =>{

    const signer = new RawSigner(keypair, provider);
    const cliPath = '/Users/henryliu/.cargo/bin/sui'
    const packagePath = '/Users/henryliu/sui/Test/template/games/rpg/contract_server/basic_package'
    const compiledModules = JSON.parse(
        execSync(
            `${cliPath} move build --dump-bytecode-as-base64 --path ${packagePath}`,
            { encoding: 'utf-8' },
        ),
    );

    const publishTxn = await signer.publish({
        compiledModules: compiledModules,
        gasBudget: 10000,
    });
    console.log(publishTxn)
}

main();
