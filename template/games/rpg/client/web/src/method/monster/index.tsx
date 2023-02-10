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

const query_monster_info = async  () => {

    const txn = await provider.getObject(
        mapObjectId,
    );
    //查询怪物信息
    const monsterTxn = await provider.getObject(
        monsterObjectId,
    );
    // @ts-ignore
    const monsterAttributes = monsterTxn.details.data.fields.monster.fields.contents
    // console.log(monsterAttributes[0].fields)
    // @ts-ignore
    const monster = txn.details.data.fields.map_info.fields.contents[0].fields.value
    // console.log(monster[1].fields.monster_name)
    let monsterList = []
    // console.log(monster)
    for(let index = 0 ;index<monster.length;index++){
        let monsterData = monster[index].fields
        let monsterAttributesIndex =
            monsterAttributes.findIndex((monsterAttribute) =>
                Uint8ArrayToString(monsterAttribute.fields.key) === Uint8ArrayToString(monsterData.monster_name))
        let monsterAttribute = monsterAttributes[monsterAttributesIndex].fields.value.fields
        let  monsterResult = {
            title:Uint8ArrayToString(monsterData.monster_name),
            detail: {
                attack_lower_limit:monsterAttribute.attack_lower_limit,
                attack_upper_limit:monsterAttribute.attack_upper_limit,
                defense_lower_limit:monsterAttribute.defense_lower_limit,
                defense_upper_limit:monsterAttribute.defense_upper_limit,
                hp:monsterAttribute.hp,
            },
            number:monsterData.monster_number
        }
        monsterList.push(monsterResult)
        // console.log(index)
    }
    return monsterList
}


export {query_monster_info}
