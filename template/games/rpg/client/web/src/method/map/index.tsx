import {JsonRpcProvider} from "@mysten/sui.js";

const provider = new JsonRpcProvider();
const MapAddress = "0xc62f25b044a4069831d2ae317df9ffb04c40a3d2"

function Uint8ArrayToString(fileData:any){
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}


const query_map_info = async  () => {
    const txn = await provider.getObject(
        MapAddress,
    );
    // @ts-ignore
    const map_name = txn.details.data.fields.map_info.fields.contents[0].fields.key.fields.name

    return Uint8ArrayToString(map_name)
}


export {query_map_info}
