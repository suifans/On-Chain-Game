import {JsonRpcProvider} from "@mysten/sui.js";
import {mapObjectId} from "../../constants";

const provider = new JsonRpcProvider();

function Uint8ArrayToString(fileData:any){
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}


const query_map_info = async  () => {
    const txn = await provider.getObject(
        mapObjectId,
    );
    // @ts-ignore
    const map_name = txn.details.data.fields.map_info.fields.contents[0].fields.key.fields.name

    return Uint8ArrayToString(map_name)
}


export {query_map_info}
