import {useAtom} from "jotai";
import {
    BattleResultDetail,
    BattleResultState,
    LoadingState,
    RoleDetails,
    Select_RoleList,
    SellPop_up_boxState, SellState
} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect,useState} from "react";
import {ethos} from "ethos-connect";
import Loading from "../loading";


const BattleResult = () =>{
    const [selectBattleResultState,setSelectBattleResultState] = useAtom(BattleResultState)
    const [battleResultDetail,] = useAtom(BattleResultDetail)

    const [battleWinResult,setBattleWinResult] = useState(false)

    const [sell_replaceState,setSell_replaceState] = useState(false)

    const [sell_replaceType,setSell_replaceType] =useState("")

    const [,setOpenLoading] =useAtom(LoadingState)

    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)

    const [sellPop_up_boxState,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)

    const [sellState,setSellState] =useAtom(SellState)

    const check = () =>{
        if(battleResultDetail.state){
            setSelectBattleResultState(false)
            setBattleWinResult(true)
        }else {
            setSelectBattleResultState(false)
        }
    }

    const sell_replace = (type) =>{
        setSell_replaceType(type)
        setSell_replaceState(true)
    }

    const sell = () =>{
        setSell_replaceState(false)
        setBattleWinResult(false)
        setOpenLoading(true)

        setTimeout(function() {
            setOpenLoading(false)
            //是否成功
            setSellState(true)

            setSellPop_up_boxState(true)

            setTimeout(function() {
                setSellPop_up_boxState(false)
            },3000)
            if(sell_replaceType =="replace"){
                setRoleDetails({name:"无上老祖",hp:"200",ex:"200",lv:"2",weapons:"蓝色宝剑"})
            }

        },3000)
    }


    return(
        <>
            <Loading/>
            <Transition.Root show={selectBattleResultState} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={()=> false}>
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
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md ">
                                    <div className=' flex justify-between text-xl font-light text-black text-center 	mb-5 items-centers'>
                                      <div></div>
                                        <div className={battleResultDetail.state?"text-green-400 font-light text-base  font-semibold ":"text-red-600 font-light text-base  font-semibold "}>
                                            {battleResultDetail.state? "战斗成功":"战斗失败"}
                                        </div>
                                        <button  onClick={() => setSelectBattleResultState(false)}
                                                 className="fa fa-times " aria-hidden="true"></button>
                                    </div>

                                    <div className={battleResultDetail.state? "text-base my-5":"hidden"}>
                                       获得奖励如下
                                        <div className="flex justify-between mt-3">
                                           <div>
                                               经验 +100
                                           </div>
                                            <div>
                                                金币 +100
                                            </div>
                                            <div>
                                               武器 蓝色宝剑
                                            </div>

                                        </div>
                                    </div>

                                    <div className={battleResultDetail.state? "hidden":"text-center py-5"}>
                                        可以尝试打打低等级的怪物
                                    </div>

                                    <div className="flex justify-center mt-5" >
                                        <button onClick={check} className="bg-black px-2 py-1 rounded-lg text-white">
                                            {battleResultDetail.state? "查看装备":"回到主页"}
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={battleWinResult} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={()=> false}>
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
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md ">
                                    <div className='flex justify-between  text-xl font-light text-black text-center 	mb-5 items-centers'>
                                        <div></div>
                                        <div className=" font-light text-base  font-semibold ">
                                          领取战利品
                                        </div>
                                        <button  onClick={() => setBattleWinResult(false)}
                                                 className="fa fa-times " aria-hidden="true"></button>
                                    </div>

                                    <div className="py-5">
                                        现在的装备 红色宝剑 攻击 + 100
                                    </div>

                                    <div className="mt-5">
                                        获得的装备 蓝色宝剑 攻击 + 50
                                    </div>

                                    <div className="flex justify-between mt-10">
                                        <button onClick={()=>sell_replace("sell")}  className="bg-black px-4 py-1 rounded-lg text-white">
                                            售卖
                                        </button>
                                        <button onClick={()=>sell_replace("replace")} className="bg-black px-4 py-1 rounded-lg text-white">
                                            售卖并更换
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={sell_replaceState} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto " onClose={()=> setSell_replaceState(false)}>
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
                                <div className="bg-white px-4 py-5 sm:px-6 lg:px-12 rounded-md ">
                                    <div className='flex justify-between  text-xl font-light text-black text-center 	mb-5 items-centers'>
                                        <div></div>
                                        <div className=" font-light text-base  font-semibold ">
                                            {sell_replaceType =="sell"?"售卖装备":"替换装备"}
                                        </div>

                                        <button  onClick={() => setSell_replaceState(false)}
                                                 className="fa fa-times " aria-hidden="true"></button>
                                    </div>
                                    <div className="py-5 text-center">
                                        <div className={sell_replaceType =="sell"?"hidden" :"  text-center"}>
                                            替换为新获得的装备: 蓝色宝剑 攻击 + 100
                                        </div>
                                       <div className="my-2">
                                           {sell_replaceType =="sell"?
                                               "售卖新获得的装备: 蓝色宝剑 攻击 + 50" :
                                               "售卖之前的装备: 红色宝剑 攻击 + 100"}

                                       </div>
                                        <div className="">
                                            价值 100 金币
                                        </div>
                                    </div>

                                    <div className="flex justify-center py-2">
                                        <button onClick={sell}   className="bg-black px-4 py-1 rounded-lg text-white">
                                            {sell_replaceType =="sell"?"售卖":"替换并售卖"}
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

export  default BattleResult
