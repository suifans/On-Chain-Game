import {ethos, EthosConnectStatus, SignInButton} from "ethos-connect";
import { useEffect } from "react";
import {Router, useRouter} from "next/router";

const Login = () =>{
    const { status, wallet } = ethos.useWallet();
    const router = useRouter()
    useEffect(()=>{
        console.log(status,EthosConnectStatus.Loading,EthosConnectStatus.NoConnection,wallet?.address)
        if(status =="connected"){
            window.location.replace('/home')
            // router.push('/home')
        }
    },[status])
    return (
        <div className="flex items-center justify-center min-h-screen">
            <button onClick={ethos.showSignInModal} className="bg-black  px-5 py-2 rounded-xl text-white">
                Login
            </button>
            {status === EthosConnectStatus.Loading ? (
                <div>Loading...</div>
            ) : status === EthosConnectStatus.NoConnection ? (
                <div>
                    No wallet connected
                </div>
            ) : (
                // status is EthosConnectStatus.Connected
                <div>
                    Wallet connected
                </div>
            )}

        </div>
    )
}

export default Login


