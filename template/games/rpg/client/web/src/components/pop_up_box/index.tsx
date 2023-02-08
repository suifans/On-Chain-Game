import {CheckCircleIcon, XCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'
import {useAtom} from "jotai";
import {SellPop_up_boxState, SellState} from "../../jotai";
import {useEffect} from "react";
import {useRouter} from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Pop_up_box() {
    const router = useRouter()
    const [sellPop_up_boxState,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)
    const [sellState,setSellState] =useAtom(SellState)
    useEffect(()=>{
        setTimeout(function() {
            setSellPop_up_boxState(false)
        },3000)
    },[router.isReady])
    return (
        <div className={sellPop_up_boxState?"flex  fixed z-20 inset-x-0 justify-center":"hidden"}>
        <div className={classNames(sellState.state?"bg-green-50":"bg-red-50","rounded-md  p-4 ")}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className={sellState.state?"hidden":"h-5 w-5 text-red-400"} aria-hidden="true" />
                    <CheckCircleIcon className={sellState.state?"h-5 w-5 text-green-400":"hidden"} aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className={classNames(sellState.state?
                            "text-green-800"
                            :
                            "text-red-800",
                        "text-sm font-medium ")}>{sellState.state?`${sellState.type}成功`:`${sellState.type}失败`}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={()=>setSellPop_up_boxState(false)}
                            type="button"
                            className={classNames(sellState.state?
                                "bg-green-50 text-green-500 hover:bg-green-100"
                                    :
                                "bg-red-50 text-red-500 hover:bg-red-100",
                                "inline-flex rounded-md  p-LICENSE-APACHE2.5")}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
