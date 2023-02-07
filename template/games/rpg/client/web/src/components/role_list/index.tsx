import {useAtom} from "jotai";
import {LoadingState, RoleDetails, Select_RoleList} from "../../jotai";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect,useState} from "react";
import {ethos} from "ethos-connect";


const SelectRoleList = () =>{
    const [selectRoleList,setSelectRoleList] = useAtom(Select_RoleList)
    const { status, wallet } = ethos.useWallet();

    const  roleList = [{
        extraFields:{
            balance:"",
        },
        objectId:"",

    }]
    const [RoleList,setRoleList] = useState(roleList)
    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)
    const [,setOpenLoading] =useAtom(LoadingState)
    useEffect(() => {
        if (!wallet) return
        // console.log(ethos.truncateMiddle(wallet?.address, 6))
        // for (let tokenName in wallet?.contents?.tokens) {
        //     let token = wallet?.contents?.tokens[tokenName];
        //     console.log(tokenName,token.balance)
        // }
        setRoleList(wallet?.contents?.objects)
        console.log("1111",wallet?.contents?.objects)
    }, [wallet])

    const selectRole = () =>{
        setRoleDetails({name:"无上老祖",hp:"100",ex:"100",lv:"1",weapons:"红色宝剑"})
        setSelectRoleList(false)
    }

    const CreateRole = () =>{
        setSelectRoleList(false)
        setOpenLoading(true)

        setTimeout(function() {
            setRoleDetails({name:"无上老祖",hp:"100",ex:"100",lv:"1",weapons:"红色宝剑"})
            setOpenLoading(false)

        },3000)
    }

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
                                        <button  onClick={() => setSelectRoleList(false)}
                                                 className="fa fa-times " aria-hidden="true"></button>
                                    </div>
                                    <div className="my-5 h-40 pr-4  scrollbar-thin scrollbar-thumb-custom  scrollbar-thumb-rounded-full overflow-y-scroll">
                                        <div className="flex grid md:grid-cols-2  gap-4">
                                            {RoleList?.map((item,index)=>(
                                                <div  key={wallet?.name} className="rounded-full ">
                                                    <button onClick={selectRole}  className="flex ">
                                                        <div id={wallet?.name} className="flex items-center">
                                                            <div>{index+1}</div>
                                                            <img  className="w-10 mr-1 rounded-full" src={wallet?.icon} alt=""/>
                                                            <div className="text-sm ml-1 text-left">
                                                                {/*<div  className="text-black text-left">{truncateMiddle(wallet?.address, 4)}</div>*/}
                                                                <div>
                                                                    Balance: {ethos.formatBalance(item?.extraFields?.balance)}
                                                                </div>
                                                                <div>
                                                                    {ethos.truncateMiddle(item?.objectId, 4)}
                                                                </div>
                                                                {/*<div  className="text-gray-400">$ {item}</div>*/}
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-center py-4">
                                        <button onClick={CreateRole} className="bg-black rounded-md  px-4 py-1.5 text-white text-sm">
                                            创建新的角色
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
