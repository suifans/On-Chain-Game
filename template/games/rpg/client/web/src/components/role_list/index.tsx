import {useAtom} from "jotai";
import {
    LoadingState,
    MapName,
    MonsterDetails,
    RoleDetails,
    Select_RoleList,
    SellPop_up_boxState,
    SellState
} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {ethos} from "ethos-connect";
import {JsonRpcProvider} from "@mysten/sui.js";
import {query_map_info} from "../../method/map";
import {query_monster_info} from "../../method/monster";
import {packageObjectId} from "../../constants";


const SelectRoleList = () =>{
    const [selectRoleList,setSelectRoleList] = useAtom(Select_RoleList)
    const {status, wallet } = ethos.useWallet();
    const [sellState,setSellState] =useAtom(SellState)
    const [,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)
    const  roleList = [
        {
            id:"",
            attack_lower_limit:"",
            attack_upper_limit:"",
            defense_lower_limit:"",
            defense_upper_limit:"",
            gold:"",
            hp:"",
            level:"",
        }
    ]
    const [RoleList,setRoleList] = useState(roleList)
    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)
    const [openLoading,setOpenLoading] =useState(false)
    const [mapName,setMapName] = useAtom(MapName)
    const [monsterDetails,setMonsterDetails] = useAtom(MonsterDetails)
    const [downloadData,setDownloadData] = useState(false)
    useEffect( () => {
      const query  =async () =>{
          setDownloadData(true)
          let info = []
          for (let i = 0; i < wallet?.contents?.objects.length; i++) {
              if (wallet?.contents?.objects[i].details.data.type == `${packageObjectId}::player::Player`) {
                  //查询角色信息
                  let data = wallet?.contents?.objects[i].details.data.fields
                  // console.log(data.id)
                  let result = {
                      id: data.id.id,
                      attack_lower_limit: data.attribute.fields.attack_lower_limit,
                      attack_upper_limit: data.attribute.fields.attack_upper_limit,
                      defense_lower_limit: data.attribute.fields.defense_lower_limit,
                      defense_upper_limit: data.attribute.fields.defense_upper_limit,
                      gold: data.attribute.fields.gold,
                      hp: data.attribute.fields.hp,
                      level: data.attribute.fields.level,
                  }
                  info.push(result)

              }
          }

          //查询地图信息
          const map_name = query_map_info()
          setMapName(await map_name)

          //查询怪物信息
          const monsterList = query_monster_info()
          setMonsterDetails(await monsterList)

          setRoleList(info)
          setDownloadData(false)
        }

        query()
    }, [wallet?.address])

    const selectRole = (item) =>{
        setRoleDetails(item)
        setSelectRoleList(false)
    }

    const mint = useCallback(async () => {
        if(!openLoading){
         setOpenLoading(true)
            if (!wallet) return
            try {
                const signableTransaction = {
                    kind: 'moveCall' as const,
                    data: {
                        packageObjectId,
                        module: 'player',
                        function: 'create_player',
                        typeArguments: [],
                        arguments: [],
                        gasBudget: 30000,
                    },
                }
                const result = await wallet.signAndExecuteTransaction(signableTransaction)
                // @ts-ignore
                const tx_status = result.effects.status.status;
                // @ts-ignore
                const objectId = result.effects.events[1].newObject.objectId
                if(tx_status == "success"){
                    const provider = new JsonRpcProvider();
                    const result = await provider.getObject(
                        objectId
                    );
                    // @ts-ignore
                    const data = result.details.data.fields
                    console.log(data)
                    const CreateRole = {
                        id: data.id.id,
                        attack_lower_limit:data.attribute.fields.attack_lower_limit,
                        attack_upper_limit:data.attribute.fields.attack_upper_limit,
                        defense_lower_limit:data.attribute.fields.defense_lower_limit,
                        defense_upper_limit:data.attribute.fields.defense_upper_limit,
                        gold:data.attribute.fields.gold,
                        hp:data.attribute.fields.hp,
                        level:data.attribute.fields.level,
                    }
                    setRoleDetails(CreateRole)
                    setOpenLoading(false)
                    setSelectRoleList(false)
                    setSellState({state:true,type:"创建"})
                    setSellPop_up_boxState(true)
                    setTimeout(function() {
                        setSellPop_up_boxState(false)
                    },3000)
                }else {
                    setOpenLoading(false)
                    setSelectRoleList(false)
                    setSellState({state:false,type:"创建"})
                    setSellPop_up_boxState(true)
                }
            } catch (error) {
                console.log(error)
            }
        }

    }, [wallet])

    return(
        <>
            <Transition.Root show={selectRoleList} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={setSelectRoleList}>
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
                            <div className="inline-block align-bottom p-0.5 rounded-lg  w-11/12 md:w-5/12 2xl:w-4/12  rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle   ">
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md">
                                    <div className='flex justify-between text-xl font-light text-black 	mb-5 items-centers'>
                                        <div className=" font-light text-base  font-semibold ">
                                           选择角色
                                        </div>
                                        <button   onClick={() => setSelectRoleList(false)}
                                                 className="fa fa-times  outline-none" aria-hidden="true"></button>
                                    </div>
                                    <div className={downloadData?"flex justify-center py-10":"hidden"}>
                                        <div className="animate-spin text-black">
                                            <i className="fa fa-spinner f-spin fa-2x fa-fw"></i>
                                        </div>
                                    </div>
                                    <div className={downloadData?"hidden":"my-5 h-40 pr-4  scrollbar-thin scrollbar-thumb-custom items-center scrollbar-thumb-rounded-full overflow-y-scroll"}>

                                        <div className="flex grid md:grid-cols-2  gap-4">
                                            {RoleList?.map((item,index)=>(
                                                <div  key={item.id} className={"rounded-full "}>
                                                    <button onClick={()=>selectRole(item)}  className="flex ">
                                                        <div id={wallet?.name} className="flex items-center">
                                                            <div>{index+1}</div>
                                                            <img  className="w-10 mx-2 rounded-full" src={wallet?.icon} alt=""/>
                                                            <div className="text-sm ml-1 text-left">
                                                                {/*<div  className="text-black text-left">{truncateMiddle(wallet?.address, 4)}</div>*/}
                                                                <div>
                                                                    {/*ethos.formatBalance*/}
                                                                    金币: {item.gold}
                                                                </div>
                                                                <div>
                                                                    {ethos.truncateMiddle(item.id, 5)}
                                                                </div>
                                                                {/*<div  className="text-gray-400">$ {item}</div>*/}
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-center py-4 ">
                                            <button onClick={mint} className="bg-black rounded-md  px-4 py-1.5 text-white text-sm">

                                                <div className={openLoading?"hidden":""}>创建新的角色</div>
                                                <div className={openLoading?"animate-spin text-white":"hidden"}>
                                                    <i className="fa fa-spinner f-spin fa-2x fa-fw"></i>
                                                </div>
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

export  default SelectRoleList
