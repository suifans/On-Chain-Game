import {ethos, EthosConnectStatus, SignInButton} from "ethos-connect";
import React, { useEffect } from "react";
import {Router, useRouter} from "next/router";

const Login = () =>{
    const { status, wallet } = ethos.useWallet();
    const router = useRouter()
    // useEffect(()=>{
    //     console.log(status,EthosConnectStatus.Loading,EthosConnectStatus.NoConnection,wallet?.address)
    //     if(status =="connected"){
    //         window.location.replace('/home')
    //         // router.push('/home')
    //     }
    // },[status])
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ethos.components.AddressWidget />

        </div>
    )
}

export default Login


