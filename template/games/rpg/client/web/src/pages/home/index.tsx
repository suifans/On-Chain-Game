import {ethos, EthosConnectStatus, SignInButton} from "ethos-connect";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import SelectTokenTail from "../../components/role_list";
import SelectRoleList from "../../components/role_list";
import {useAtom} from "jotai";
import {MonsterDetails, RoleDetails, Select_LoginState, Select_RoleList} from "../../jotai";
import RoleDetail from "../../components/role_detail";
import Pop_up_box from "../../components/pop_up_box";
import Link from "next/link";

const Home = () =>{
    const { status, wallet } = ethos.useWallet();
    const [login,setLogin] = useAtom(Select_LoginState)
    const [selectRoleList,setSelectRoleList] = useAtom(Select_RoleList)
    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)
    const router = useRouter()
    useEffect(()=>{
        console.log(status,EthosConnectStatus.Loading,EthosConnectStatus.NoConnection,wallet?.address)

        const push = async ()=>{

           if(wallet?.address){
               setSelectRoleList(true)
               setLogin(true)
           }else {
               setLogin(false)
               setRoleDetails({
                   id:"",
                   attack_lower_limit:"",
                   attack_upper_limit:"",
                   defense_lower_limit:"",
                   defense_upper_limit:"",
                   gold:"",
                   hp:"",
                   level:"",
               })
           }
        }
        push()
        // },[router.isReady])
    },[wallet?.address])
        return (
            <>
                <Pop_up_box/>
                <div className="flex items-center justify-end mx-auto mt-5 max-w-7xl">
                    <ethos.components.AddressWidget />
                </div>

                <SelectRoleList/>


                <div className="flex items-center  mx-auto mt-5 max-w-7xl">

                    <RoleDetail/>
                </div>
            </>

        )

}

export default Home


