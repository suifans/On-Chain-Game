import { Disclosure } from "@headlessui/react";
import {useAtom} from "jotai";
import {
    BattleResultDetail,
    BattleResultState,
    LoadingState, MapName,
    MonsterDetails,
    RoleDetails,
    Select_LoginState,
    Select_RoleList, SellPop_up_boxState, SellState
} from "../../jotai";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
import {useEffect} from "react";
import Loading from "../loading";
import BattleResult from "../battle_result";
import {ethos} from "ethos-connect";
import {battle_calculateMain} from "../../method/player";
import {JsonRpcProvider} from "@mysten/sui.js";
import {mapObjectId, monsterObjectId, packageObjectId} from "../../constants";
import {query_user_detail} from "../../method/user";
import {query_monster_info} from "../../method/monster";
import Pop_up_box from "../pop_up_box";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const RoleDetail = () =>{

    const [login,setLogin] = useAtom(Select_LoginState)
    const [selectRoleList,setSelectRoleList] = useAtom(Select_RoleList)
    const [roleDetails,] = useAtom(RoleDetails)

    const selectRole = () =>{
        setSelectRoleList(true)
    }
    return(
        <>
            <div className="w-full">
                <div className={login?"hidden":""}>
                    ....
                </div>
                <button onClick={selectRole} className={login?"":"hidden"}>
                    {roleDetails.id ===""?"选择角色":"切换角色"}
                </button>
                <div className={roleDetails.id ==""?"hidden":"flex justify-between  w-full  mt-10"}>

                <div>
                    <div >
                        <div>
                            {/*{roleDetails.id}*/}
                            ID :  {ethos.truncateMiddle(roleDetails.id, 5)}
                        </div>
                        <div>
                            金币 :  {roleDetails.gold}
                        </div>
                        <div>
                            等级 : {roleDetails.level}
                        </div>
                        <div>
                            血量 : {roleDetails.hp}
                        </div>
                        <div>
                            攻击上限 : {roleDetails.attack_upper_limit}
                        </div>
                        <div>
                            攻击下限 : {roleDetails.attack_lower_limit}
                        </div>
                        <div>
                            防御上限 : {roleDetails.defense_upper_limit}
                        </div>
                        <div>
                            防御下限 : {roleDetails.defense_lower_limit}
                        </div>
                    </div>
                </div>
                    <MonsterDetail/>
                </div>
            </div>
        </>
    )
}

const MonsterDetail = () =>{
    const [monsterDetails,setMonsterDetails] = useAtom(MonsterDetails)
    const [openLoading,setOpenLoading] =useAtom(LoadingState)
    const {status, wallet} = ethos.useWallet();
    const [,setSelectBattleResultState] = useAtom(BattleResultState)
    const [,setBattleResultDetail] = useAtom(BattleResultDetail)
    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)
    const [sellState,setSellState] =useAtom(SellState)
    const [,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)
    const [mapName] = useAtom(MapName)
    useEffect(
        ()=>{
        },[])
    const dareMonster =async (monster_name,monster_number) =>{
        // setOpenLoading(true)
        try {
            const playerObjectId = roleDetails.id;
            const signableTransaction = {
                kind: 'moveCall' as const,
                data: {
                    packageObjectId,
                    module: 'player',
                    function: 'battle_calculate',
                    typeArguments: [],
                    arguments: [
                        playerObjectId,
                        monsterObjectId,
                        mapObjectId,
                        mapName,
                        monster_name,
                        true,
                        monster_number,
                    ],
                    gasBudget: 1000000,
                },
            }
            const result = await wallet.signAndExecuteTransaction(signableTransaction)
            // @ts-ignore
            const tx_status = result.effects.status.status;
            if(tx_status == "success"){
                const data =await query_user_detail(playerObjectId)
                // @ts-ignore
                const userResult = data.details.data.fields
                const result = {
                    id: userResult.id.id,
                    attack_lower_limit: userResult.attribute.fields.attack_lower_limit,
                    attack_upper_limit: userResult.attribute.fields.attack_upper_limit,
                    defense_lower_limit: userResult.attribute.fields.defense_lower_limit,
                    defense_upper_limit: userResult.attribute.fields.defense_upper_limit,
                    gold: userResult.attribute.fields.gold,
                    hp: userResult.attribute.fields.hp,
                    level: userResult.attribute.fields.level,
                }
                setRoleDetails(result)

                const monsterList = query_monster_info()
                setMonsterDetails(await monsterList)

                setOpenLoading(false)
                setSellState({state:true,type:"挑战"})
                setSellPop_up_boxState(true)
                setTimeout(function() {
                    setSellPop_up_boxState(false)
                },3000)

            }else {
                setOpenLoading(false)
                setSellState({state:false,type:"挑战"})
                setSellPop_up_boxState(true)
            }
        } catch (error) {
            console.log(error)
            setOpenLoading(false)
            setSellState({state:false,type:"签名"})
            setSellPop_up_boxState(true)
        }

        // setTimeout(function() {
        //     setBattleResultDetail({state: true})
        //     setOpenLoading(false)
        //     setSelectBattleResultState(true)
        //     // setRoleDetails({name:"无上老祖",hp:"200",ex:"200",lv:"2",weapons:"红色宝剑"})
        // },3000)
    }
    return(
        <div className="">
            <div>
                当前地图 ：{mapName}
            </div>
            <div>
                怪物列表
            </div>
            <div className="  w-96    ">
                {monsterDetails.map(item=>(
                    <Disclosure key={item.title}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between items-center rounded-2xl  bg-white p-4 text-left  font-medium text-black   border-gray-200">
                                    <div className="flex items-center">
                                    <div>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? '' : 'rotate-180 transform '
                                            } h-5 w-5 text-black`}
                                        />
                                    </div>

                                    <span key={item.title} className="ml-5">{item.title}</span>
                                    </div>
                                    <div>
                                        还有{item.number}只
                                    </div>
                                </Disclosure.Button>
                                <div className="border-b border-gray-200 ">
                                </div>
                                <Disclosure.Panel className={classNames("px-10 py-4  text-gray-800 font-normal bg-gray-100 list-decimal")}>
                                    <div>
                                        血量 : {item.detail.hp}
                                    </div>
                                    <div>
                                        攻击上限 : {item.detail.attack_upper_limit}
                                    </div>
                                    <div>
                                        攻击下限 : {item.detail.attack_lower_limit}
                                    </div>
                                    <div>
                                        防御上限 : {item.detail.defense_upper_limit}
                                    </div>
                                    <div>
                                        防御下限 : {item.detail.defense_lower_limit}
                                    </div>
                                    <div>
                                        {/*获得经验:{item.detail.ex}*/}
                                    </div>
                                    <button onClick={()=>dareMonster(item.title,item.number)} className="bg-black text-white px-2 py-1 rounded-lg ">
                                        挑战
                                    </button>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
            <BattleResult/>
            <Loading/>
        </div>
    )
}

export default RoleDetail
