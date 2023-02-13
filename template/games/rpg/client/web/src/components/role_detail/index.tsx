import {Dialog, Disclosure, Transition} from "@headlessui/react";
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
import React, {Fragment, useEffect, useState} from "react";
import Loading from "../loading";
import BattleResult from "../battle_result";
import {ethos} from "ethos-connect";
import {battle_calculateMain} from "../../method/player";
import {JsonRpcProvider} from "@mysten/sui.js";
import {itemsInfoObjectId, mapObjectId, monsterObjectId, packageObjectId, playerRulesObjectId} from "../../constants";
import {query_user_detail} from "../../method/user";
import {query_monster_info} from "../../method/monster";
import Pop_up_box from "../pop_up_box";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const RoleDetail = () =>{
    const {status, wallet} = ethos.useWallet();
    const [login,setLogin] = useAtom(Select_LoginState)
    const [selectRoleList,setSelectRoleList] = useAtom(Select_RoleList)
    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)

    const [sellState,setSellState] =useAtom(SellState)
    const [,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)
    const [openLoading,setOpenLoading] =useAtom(LoadingState)
    const [selectUpgrade,setSelectUpgrade] = useState(false)
    const [selectRecover,setSelectRecover] = useState(false)
    const [errorState,setErrorState] = useState(false)

    const Upgrade = async () => {
        if(Number(roleDetails.gold) >= Number(roleDetails.level) * 4) {
            setOpenLoading(true)
            try {
                const playerObjectId = roleDetails.id;
                const signableTransaction = {
                    kind: 'moveCall' as const,
                    data: {
                        packageObjectId,
                        module: 'player',
                        function: 'upgrade_level',
                        typeArguments: [],
                        arguments: [
                            playerObjectId,
                            playerRulesObjectId,
                        ],
                        gasBudget: 1000000,
                    },
                }
                const result = await wallet.signAndExecuteTransaction(signableTransaction)
                console.log(result)
                // @ts-ignore
                const tx_status = result.effects.status.status;
                if (tx_status == "success") {

                    const data = await query_user_detail(playerObjectId)
                    setRoleDetails(data)
                    //刷新用户信息


                    setSellState({state: true, type: "升级", hash: result.certificate.transactionDigest})
                    setSellPop_up_boxState(true)
                    setOpenLoading(false)
                } else {
                    setOpenLoading(false)
                    setSellState({state: false, type: "升级", hash: ""})
                    setSellPop_up_boxState(true)

                }
            } catch (error) {
                console.log(error)
                setOpenLoading(false)
                setSellState({state: false, type: "签名", hash: ""})
                setSellPop_up_boxState(true)
            }
        }else {
            setErrorState(true)
        }
    }

    const Recover = async () => {
        if(Number(roleDetails.gold) >= 1){
            setOpenLoading(true)
            setSelectRecover(false)
            try {
                const playerObjectId = roleDetails.id;
                const signableTransaction = {
                    kind: 'moveCall' as const,
                    data: {
                        packageObjectId,
                        module: 'player',
                        function: 'restore_hit_points',
                        typeArguments: [],
                        arguments: [
                            playerObjectId,
                            playerRulesObjectId,
                        ],
                        gasBudget: 1000000,
                    },
                }
                const result = await wallet.signAndExecuteTransaction(signableTransaction)
                console.log(result)
                // @ts-ignore
                const tx_status = result.effects.status.status;
                if(tx_status == "success"){
                    const data = await query_user_detail(playerObjectId)
                    setRoleDetails(data)
                    //刷新用户信息
                    setSellState({state:true,type:"恢复",hash: result.certificate.transactionDigest})
                    setSellPop_up_boxState(true)
                    setOpenLoading(false)

                }else {
                    setOpenLoading(false)
                    setSellState({state:false,type:"恢复",hash: ""})
                    setSellPop_up_boxState(true)

                }
            } catch (error) {
                console.log(error)
                setOpenLoading(false)
                setSellState({state:false,type:"签名",hash: ""})
                setSellPop_up_boxState(true)
            }
        }else {
            setErrorState(true)
        }

    }

    return(
        <>
            <div className="w-full">
                <div className={login?"hidden":""}>
                    ....
                </div>
                <button onClick={()=>{setSelectRoleList(true)}} className={login?"":"hidden"}>
                    {roleDetails.id ===""?"选择角色":"切换角色"}
                </button>
                <div className={roleDetails.id ==""?"hidden":"flex justify-between  w-full  mt-10"}>

                <div >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            {/*{roleDetails.id}*/}
                            ID :  {ethos.truncateMiddle(roleDetails.id, 5)}
                        </div>
                        <div>
                            金币 :  {roleDetails.gold}
                        </div>
                        <div className="flex items-center">
                            <div className="flex w-24">
                                等级 : {roleDetails.level}
                            </div>
                            <button onClick={()=>setSelectUpgrade(true)} className="text-black ml-5 bg-black rounded-lg text-white px-4 py-0.5">
                                升级
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex w-24">
                                血量 : {roleDetails.hp}
                            </div>
                            <button  onClick={()=>setSelectRecover(true)} className="text-black ml-5 bg-black rounded-lg text-white px-4 py-0.5">
                                恢复
                            </button>
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

            <Transition.Root show={selectUpgrade} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={setSelectUpgrade}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md">
                                    <div className='flex justify-end text-xl font-light text-black 	mb-5 items-centers'>
                                        <button   onClick={() => setSelectUpgrade(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <div className="flex justify-center">
                                        你确定你消耗
                                        <div className="mx-1 font-semibold">
                                            {Number(roleDetails.level) * 4}
                                    </div>
                                        金币来升级吗
                                    </div>
                                    <div className="flex justify-between mt-10">
                                        <button onClick={()=>setSelectUpgrade(false)} className="bg-red-100 text-red-500 px-4 py-1 rounded-lg ">
                                            取消
                                        </button>
                                        <button  onClick={Upgrade} className="bg-green-100 text-green-500 px-4 py-1 rounded-lg ">
                                            确认
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={selectRecover} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={setSelectRecover}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md">
                                    <div className='flex justify-end text-xl font-light text-black 	mb-5 items-centers'>
                                        <button   onClick={() => setSelectRecover(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <div className="flex justify-center">
                                        你确定你消耗
                                        <div className="mx-1 font-semibold">
                                            1
                                        </div>
                                        金币来恢复到满血吗
                                    </div>
                                    <div className="flex justify-between mt-10">
                                        <button onClick={()=>setSelectRecover(false)} className="bg-red-100 text-red-500 px-4 py-1 rounded-lg ">
                                            取消
                                        </button>
                                        <button  onClick={Recover} className="bg-green-100 text-green-500 px-4 py-1 rounded-lg ">
                                            确认
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={errorState} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={setErrorState}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center shadow-2xl   sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-3/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md">
                                    <div className='flex justify-end text-xl font-light text-black 	mb-5 items-centers'>
                                        <button   onClick={() => setErrorState(false)}
                                                  className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <div className="flex justify-center">
                                       金币不足
                                    </div>
                                    <div className="flex justify-center mt-10">
                                        <button onClick={()=>setErrorState(false)} className="bg-red-100 text-red-500 px-4 py-1 rounded-lg ">
                                            取消
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
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
        setOpenLoading(true)
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
                        itemsInfoObjectId,
                        mapName,
                        monster_name,
                        true,
                        monster_number
                    ],
                    gasBudget: 1000000,
                },
            }
            const result = await wallet.signAndExecuteTransaction(signableTransaction)
            console.log(result)
            // @ts-ignore
            const tx_status = result.effects.status.status;
            if(tx_status == "success"){

                const data = await query_user_detail(playerObjectId)
                setRoleDetails(data)
                //刷新用户信息
                const monsterList = query_monster_info()
                setMonsterDetails(await monsterList)
                //刷新怪物信息


                let RewardList = []
                for (let i = 0 ;i<result.effects.created.length ;i++){
                    const provider = new JsonRpcProvider();
                    let rewardResult = await provider.getObject(
                        result.effects.created[i].reference.objectId
                    );
                    console.log("rewardResult",rewardResult)
                    let reward = {
                        // @ts-ignore
                        url:rewardResult.details.data.fields.url,
                        objectId:result.effects.created[i].reference.objectId
                    }
                    RewardList.push(reward)
                }
                setBattleResultDetail({
                    state: true,
                    RewardList
                })
                //获取的NFT信息
                setSellState({state:true,type:"挑战",hash: result.certificate.transactionDigest})
                setSellPop_up_boxState(true)
                setSelectBattleResultState(true)
                setOpenLoading(false)
            }else {
                setOpenLoading(false)
                setSellState({state:false,type:"挑战",hash: ""})
                setSellPop_up_boxState(true)
                setBattleResultDetail({state: false,RewardList:[]})
                setSelectBattleResultState(true)
            }
        } catch (error) {
            console.log(error)
            setOpenLoading(false)
            setSellState({state:false,type:"签名",hash: ""})
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
            <div className="w-96">
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
                                    <div className=" ">
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
