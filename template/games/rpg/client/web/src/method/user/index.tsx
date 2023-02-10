import {JsonRpcProvider} from "@mysten/sui.js";
import {mapObjectId, monsterObjectId} from "../../constants";

const provider = new JsonRpcProvider();
function Uint8ArrayToString(fileData:any){
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}

const query_user_detail = async  (playerObjectId) => {

    const txn = await provider.getObject(
        playerObjectId,
    );
    //查询怪物信息

        // console.log(index)
    return txn
}


export {query_user_detail}
