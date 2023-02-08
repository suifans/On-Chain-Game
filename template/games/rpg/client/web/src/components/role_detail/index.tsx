import { Disclosure } from "@headlessui/react";
import {useAtom} from "jotai";
import {
    BattleResultDetail,
    BattleResultState,
    LoadingState,
    MonsterDetails,
    RoleDetails,
    Select_LoginState,
    Select_RoleList
} from "../../jotai";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
import {useEffect} from "react";
import Loading from "../loading";
import BattleResult from "../battle_result";
import {ethos} from "ethos-connect";

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
    const [,setOpenLoading] =useAtom(LoadingState)
    const [,setSelectBattleResultState] = useAtom(BattleResultState)
    const [,setBattleResultDetail] = useAtom(BattleResultDetail)

    const [roleDetails,setRoleDetails] = useAtom(RoleDetails)
    useEffect(
        ()=>{
            setMonsterDetails([
                {
                title:"鸡",
                detail: {
                    lv:"1",
                    power: "10",
                    hp:"30",
                    ex:"100",
                }
            },
                {
                    title:"狗",
                    detail: {
                        lv:"2",
                        power: "20",
                        hp:"50",
                        ex:"200",
                    }
                },
            ])},[])

    const dareMonster = () =>{
        setOpenLoading(true)

        setTimeout(function() {
            setBattleResultDetail({state: true})
            setOpenLoading(false)
            setSelectBattleResultState(true)
            // setRoleDetails({name:"无上老祖",hp:"200",ex:"200",lv:"2",weapons:"红色宝剑"})
        },3000)
    }
    return(
        <div className="">
            <div>
                怪物列表
            </div>
            <div className="  w-96    ">
                {monsterDetails.map(item=>(
                    <Disclosure key={item.title}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full items-center rounded-2xl  bg-white p-4 text-left  font-medium text-black   border-gray-200">
                                    <div>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? '' : 'rotate-180 transform '
                                            } h-5 w-5 text-black`}
                                        />
                                    </div>
                                    <span key={item.title} className="ml-5">{item.title}</span>

                                </Disclosure.Button>
                                <div className="border-b border-gray-200 ">
                                </div>
                                <Disclosure.Panel className={classNames("px-10 py-4  text-gray-800 font-normal bg-gray-100 list-decimal")}>
                                    <div>
                                        等级:{item.detail.lv}
                                    </div>
                                    <div>
                                        攻击力:{item.detail.power}
                                    </div>
                                    <div>
                                        血量:{item.detail.hp}
                                    </div>
                                    <div>
                                        获得经验:{item.detail.ex}
                                    </div>
                                    <button onClick={dareMonster} className="bg-black text-white px-2 py-1 rounded-lg">
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
