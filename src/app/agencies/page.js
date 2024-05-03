"use client";
import { useEffect, useState } from "react";

import { FcCancel } from "react-icons/fc";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdStar } from "react-icons/md";
import Search from "@/components/Search";
import SuspendModal from "@/components/modals/SuspendModal";
import { getAllAgencies } from "@/services/admin";
import { LuLoader2 } from "react-icons/lu";

const Table = ({ data }) => {
    return (
        <div className="table w-full">
            <ul className="table-header w-full flex items-center border-b border-lightblack">
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[18%]">
                    <span> Agency Name </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[18%]">
                    <span> Email </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[16%]">
                    <span> Status </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[16%]">
                    <span> Type </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[16%]">
                    <span> Country </span>
                </li>
                <li className="font-[500] text-xs leading-[16px] uppercase py-4 text-start px-4 w-[16%]">
                    <span> State </span>
                </li>
            </ul>


            <div className="">
                { data?.map((agency, index) => (
                    <ul className="w-full flex items-center" key={index}>
                        <li className="w-[18%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.agency_name } </span>
                        </li>
                        <li className="w-[18%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.email } </span>
                        </li>
                        <li className="w-[16%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.status } </span>
                        </li>
                        <li className="w-[16%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.country } </span>
                        </li>
                        <li className="w-[16%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.country } </span>
                        </li>
                        <li className="w-[16%] font-[400] text-sm leading-[22px] py-4 px-4"> 
                            <span> { agency?.state } </span>
                        </li>
                    </ul>
                ))}
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
    const getAgenciesProfile = async () => {
        try {
            setLoading(true);
            const response = await getAllAgencies();
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        getAgenciesProfile();
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

                        <div className="body-table mt-[20px] w-full">
                            <Table 
                                data={tabData}
                            />

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