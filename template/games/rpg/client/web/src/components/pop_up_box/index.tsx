import {useAtom} from "jotai";
import {SellPop_up_boxState, SellState} from "../../jotai";
import {Fragment, useEffect} from "react";
import Link from "next/link";
import {Transition} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Pop_up_box = () =>{
    const [pop_up_boxState,setSop_up_boxState] = useAtom(SellPop_up_boxState)
    const [pop_up_boxData,] =useAtom(SellState)
    let time
    useEffect(()=>{
        clearTimeout(time)
        if(pop_up_boxState){
            time = setTimeout(()=>{
                setSop_up_boxState(false)
            },6000)
        }
        const Pop_up_box = document.getElementById('Pop_up_box');
        Pop_up_box.onmouseover = function(){
            clearInterval(time);
        }
        Pop_up_box.onmouseout = function(){
            time = setTimeout(()=>{
                setSop_up_boxState(false)

            },3000)
        }
    },[pop_up_boxState])
    return(
        <div
            id="Pop_up_box"
            aria-live="assertive"
            className="pointer-events-none z-40 fixed inset-0 top-12 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={pop_up_boxState}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={classNames(pop_up_boxData.state?"bg-green-50":"bg-red-50","pointer-events-auto w-full max-w-xs overflow-hidden rounded-lg  ")}>
                        <div className="p-4">
                            <div className="flex items-center">
                                <img className={pop_up_boxData.state?"w-10  mt-1":"hidden"} src="/successful.svg" alt=""/>
                                <img className={pop_up_boxData.state?"hidden":"w-10  mt-1"} src="/fail.svg" alt=""/>
                                <div className="ml-3 w-0 flex-1 pt-0.5 text-white text-sm">
                                    <p className={classNames(pop_up_boxData.state?
                                            "text-green-800"
                                            :
                                            "text-red-800",
                                        "text-sm font-medium ")}>{pop_up_boxData.type} {classNames(pop_up_boxData.state?"成功":"失败")}</p>
                                    <p className={pop_up_boxData.state?"hidden":"mt-1 text-red-800 font-black"}>请重试</p>
                                    <div className={pop_up_boxData.hash == ""? "hidden":""}>
                                        <Link legacyBehavior href={`https://explorer.sui.io/transaction/${pop_up_boxData.hash}?network=devnet` } target="_Blank">
                                            <a className={classNames(pop_up_boxData.state?
                                                    "bg-green-50 text-green-500 hover:bg-green-100"
                                                    :
                                                    "bg-red-50 text-red-500 hover:bg-red-100",
                                                "mt-1 underline font-semibold ")}
                                               target="_Blank">
                                                View on Explorer
                                            </a></Link>

                                    </div>

                                </div>
                                <div className="-mt-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className={classNames(pop_up_boxData.state?
                                                "bg-green-50 text-green-500 hover:bg-green-100"
                                                :
                                                "bg-red-50 text-red-500 hover:bg-red-100",
                                            "inline-flex rounded-md  p-1.5")}
                                        onClick={() => {
                                            setSop_up_boxState(false)
                                            if(pop_up_boxData.state){
                                                location.reload()
                                            }
                                        }}
                                    >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}
//  function Pop_up_box() {
//     const router = useRouter()
//     const [sellPop_up_boxState,setSellPop_up_boxState] = useAtom(SellPop_up_boxState)
//     const [sellState,setSellState] =useAtom(SellState)
//
//     let time
//     useEffect(()=>{
//         clearTimeout(time)
//         if(sellPop_up_boxState){
//             time = setTimeout(()=>{
//                 setSellPop_up_boxState(false)
//                 if(sellState.state){
//                     location.reload()
//                 }
//             },5000)
//         }
//         const Pop_up_box = document.getElementById('Pop_up_box');
//         Pop_up_box.onmouseover = function(){
//             clearInterval(time);
//         }
//         Pop_up_box.onmouseout = function(){
//             time = setTimeout(()=>{
//                 setSellPop_up_boxState(false)
//                 if(sellState.state){
//                     location.reload()
//                 }
//             },2000)
//         }
//     },[sellPop_up_boxState])
//     return (
//         <div
//             id="Pop_up_box"
//             aria-live="assertive"
//             className={sellPop_up_boxState?"flex  fixed z-20 inset-x-0 justify-center":"hidden"}>
//         <div className={classNames(sellState.state?"bg-green-50":"bg-red-50","rounded-md  p-4 ")}>
//             <div className="flex">
//                 <div className="flex-shrink-0">
//                     <XCircleIcon className={sellState.state?"hidden":"h-5 w-5 text-red-400"} aria-hidden="true" />
//                     <CheckCircleIcon className={sellState.state?"h-5 w-5 text-green-400":"hidden"} aria-hidden="true" />
//                 </div>
//                 <div className="ml-3">
//                     <p className={classNames(sellState.state?
//                             "text-green-800"
//                             :
//                             "text-red-800",
//                         "text-sm font-medium ")}>{sellState.state?`${sellState.type}成功`:`${sellState.type}失败`}</p>
//                 </div>
//                 <div className="ml-auto pl-3">
//                     <div className="-mx-1.5 -my-1.5">
//                         <button
//                             onClick={()=>setSellPop_up_boxState(false)}
//                             type="button"
//                             className={classNames(sellState.state?
//                                 "bg-green-50 text-green-500 hover:bg-green-100"
//                                     :
//                                 "bg-red-50 text-red-500 hover:bg-red-100",
//                                 "inline-flex rounded-md  p-LICENSE-APACHE2.5")}
//                         >
//                             <span className="sr-only">Dismiss</span>
//                             <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     )
// }
export default Pop_up_box
