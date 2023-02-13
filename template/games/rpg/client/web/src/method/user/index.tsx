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
    //查询角色信息
    // @ts-ignore
    const userResult = txn.details.data.fields
    const RoleResult = {
        id: userResult.id.id,
        attack_lower_limit: userResult.attribute.fields.attack_lower_limit,
        attack_upper_limit: userResult.attribute.fields.attack_upper_limit,
        defense_lower_limit: userResult.attribute.fields.defense_lower_limit,
        defense_upper_limit: userResult.attribute.fields.defense_upper_limit,
        gold: userResult.attribute.fields.gold,
        hp: userResult.attribute.fields.hp,
        level: userResult.attribute.fields.level,
    }
        // console.log(index)
    return RoleResult
}


export {query_user_detail}
