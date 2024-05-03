"use client";
import { useEffect, useState } from "react";

import { FcCancel } from "react-icons/fc";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineDomainVerification, MdStar, MdWarning, MdOutlineLocationOn } from "react-icons/md";
import Search from "@/components/Search";
import SuspendModal from "@/components/modals/SuspendModal";
import { getAllEscorts, getEscort } from "@/services/admin";
import { LuLoader2 } from "react-icons/lu";

const Table = ({ data }) => {
    return (
        <div className="table min-w-[1200px]">
            <ul className="table-header w-full flex items-center border-b border-lightblack">
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[20%]">
                    <span> Model Name </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[20%]">
                    <span> Email </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[15%]">
                    <span> Status </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[15%]">
                    <span> Type </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[13.5%]">
                    <span> Country </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[13.5%]">
                    <span> State </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[3%]">
                </li>
            </ul>


            <div className="">
                { data?.map((escort, index) => {
                    const [toggle, setToggle] = useState(false);

                    const [loading, setLoading] = useState(false);
                    const [escortData, setEscortData] = useState();
                    const getEscortDetails = async () => {
                        try {
                            const response = await getEscort(escort._id);
                            if(response?.data?.success) {
                                console.log("RESPONSE: ", response?.data?.result);
                                setEscortData(response?.data?.result);
                            }
                        } catch (error) {
                            
                        } finally {
                            setLoading(false);
                        }
                    }

                    useEffect(()=> {
                        if(toggle) {
                            getEscortDetails();
                        }
                    },[toggle])
                    
                    return (
                        <div className="">
                            <ul className="w-full flex items-center cursor-pointer hover:bg-grey hover:bg-opacity-60 border-b border-lightblack" onClick={()=> setToggle(!toggle)} key={index}>
                                <li className="w-[20%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.model_name } </span>
                                </li>
                                <li className="w-[20%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.email } </span>
                                </li>
                                <li className="w-[15%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.status } </span>
                                </li>
                                <li className="w-[15%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.country } </span>
                                </li>
                                <li className="w-[13%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.country } </span>
                                </li>
                                <li className="w-[13%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <span> { escort?.state } </span>
                                </li>
                                <li className="w-[4%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                                    <div className="" onClick={()=> setToggle(!toggle)}>
                                        <span className={`block border-b border-white w-[24px] bg-white mb-2 transition-all delay-150s ${ toggle ? "rotate-[45deg]" : "rotate-[0deg]"}`}></span>
                                        <span className={`block border-b border-white w-[24px] bg-white transition-all delay-150s ${ toggle ? "rotate-[-45deg] mt-[-8px]" : "rotate-[0deg]"}`}></span>
                                    </div>
                                </li>
                            </ul>

                            <div className={`table-content w-0 h-0 overflow-hidden transition-all delay-150s ${ toggle ? "w-[100%] h-[fit-content] overflow-auto" : "" }`}>
                                {loading && <div className="flex items-center justify-center w-full h-[200px]">
                                    <LuLoader2 className="animate-spin delay-150s text-white" size={40} />
                                </div> }

                                { escortData && (
                                    <div className="p-[40px] w-full">
                                        <div className="flex items-center justify-between gap-4 w-full">
                                            <div>
                                                <h2 className="text-primary text-[26px] font-[600]"> { escortData[0]?.model_name} </h2>
                                                
                                            </div>

                                            <div className="flex items-center gap-3">
                                                { !escortData[0]?.profile_approved && (
                                                    <button className="bg-primary text-black p-[10px] font-[600] text-sm min-w-[125px] rounded-[8px]">
                                                        <span> Approve </span>
                                                    </button>
                                                )}

                                                { escortData[0]?.profile_approved && <button className={`bg-primary text-black p-[10px] font-[600] text-sm min-w-[125px] rounded-[8px]`}>
                                                    <span> { escortData[0]?.status === "active" ? "Suspend" : "Activate"} </span>
                                                </button> }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
}

const Page = () => {
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState("active");
    const [tabData, setTabData] = useState();

    const [suspend, setSuspendModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getEscortsProfile = async () => {
        try {
            setLoading(true);
            const response = await getAllEscorts();
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        getEscortsProfile();
    },[])


    useEffect(()=> {
        if(data && tab !== "all") {
            let temp_data = data.filter(item=> item.status === tab);
            setTabData(temp_data)
        }
        if(data && tab === "all") {
            setTabData(data);
        }
    },[tab, data])

    return (
        <>
            { suspend && (
                <SuspendModal 
                    closeModal={()=> setSuspendModal(false)}
                    handleSuspend={()=> null}
                    loading={false}
                />
            )}
            <div className="escorts max-w-[90%] mx-auto">
                <div className="container mx-auto">
                    <div className="page-header mb-[40px]">
                        <h1 className="text-[24px] leading-[29px] mb-3 font-[600]"> Escorts Overview </h1>

                        <Search 
                            name="escorts"
                            value={search}
                            setValue={setSearch}
                            placeholder="Search for escorts by name, country or state..."
                        />
                    </div>

                    <div className="page-body">
                        <div className="body-nav flex items-center justify-end">
                            <ul className=" border border-lightblack rounded-[8px] flex items-center overflow-hidden">
                                <li>
                                    <button className={`border-r border-lightblack px-[16px] py-[6px] min-w-[85px] text-center text-sm font-[500] ${ tab === "active" ? "text-primary bg-lightblack bg-opacity-60" : "opacity-60"}`}
                                        onClick={()=> setTab("active")}
                                    >
                                        <span> Active </span>
                                    </button>
                                </li>
                                <li>
                                    <button className={`border-r border-lightblack px-[16px] py-[6px] min-w-[85px] text-center text-sm font-[500] ${ tab === "suspended" ? "text-primary bg-lightblack bg-opacity-60" : "opacity-60"}`}
                                        onClick={()=> setTab("suspended")}
                                    >
                                        <span> Suspended </span>
                                    </button>
                                </li>
                                <li>
                                    <button className={`px-[16px] py-[6px] min-w-[85px] text-center text-sm font-[500] ${ tab === "all" ? "text-primary bg-lightblack bg-opacity-60" : "opacity-60"}`}
                                        onClick={()=> setTab("all")}
                                    >
                                        <span> All </span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="body-table mt-[20px] w-full overflow-auto">
                            <Table data={tabData} />

                            { loading && (
                                <div className="flex items-center justify-center h-[200px] w-full">
                                    <LuLoader2 className="animate-spin delay-150s" size={40} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;