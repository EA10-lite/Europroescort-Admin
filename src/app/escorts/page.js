"use client";
import Loading from "@/components/Loading";
import { getAllEscorts } from "@/services/admin";
import { useEffect, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { formatDate } from "@/utils/getDate";

import { FiEye } from "react-icons/fi";
import Link from "next/link";
import Search from "@/components/Search";
import { capitalizeWord } from "@/utils/text-formatting";
import Pagination from "@/components/Pagination";
import { LuLoader2 } from "react-icons/lu";


const Page = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const getEscorts = async () => {
        try {
            setLoading(true);
            const response = await getAllEscorts();
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        getEscorts();
    },[page])

    const [activeFilter, setActiveFilter] = useState("All");
    const [tempData, setTempData] = useState();

    useEffect(()=> {
        setTempData(data);
    }, [data])

    useEffect(()=> {
        if(activeFilter === "All") {
            setTempData(data);
        }

        else if (activeFilter === "Active") {
            const result  = data?.filter(item => item.status.toLowerCase() === "active")
            setTempData(result);
        }

        else if (activeFilter === "Suspended") {
            const result  = data?.filter(item => item.status.toLowerCase() === "suspended")
            setTempData(result);
        }

        else if (activeFilter === "Verified") {
            const result  = data?.filter(item => item.is_verified)
            setTempData(result);
        }

        else if (activeFilter === "Subscribed") {
            const result  = data?.filter(item => item.has_subscribed)
            setTempData(result);
        }

    }, [activeFilter])

    const [search, setSearch] = useState("");
    const handleSearch = (e)=> {
        setSearch(e.target.value);
    }

    useEffect(()=> {
        if(search.length > 0) {
            let new_data = data?.filter(
                escort => escort?.model_name?.toLowerCase().includes(search.toLowerCase()) || 
                escort?.country?.toLowerCase().includes(search.toLowerCase()) || 
                escort?.state?.toLowerCase().includes(search.toLowerCase())
            );
            setTempData(new_data);
        }
        else {
            setTempData(data);
        }
    },[search])

    const [visible, setVisible] = useState(10);
    const [fetching, setFetching] = useState(false);
    const showMore = (total_item) => {
        if(total_item > visible) {
            setFetching(true)
            setTimeout(() => {
                setVisible(visible + 10);
                setFetching(false)
            }, 1500);
        }
    }

    return (
        <>
            <div className="py-[40px] w-full h-full">
                <div className="page-header text-white px-6 mb-[20px]">
                    {/* Title */}
                    <div className="mb-[24px]">
                        <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Escorts @ <a href="https://www.mcescorts.com" className="text-primary"> MCEscorts.com </a> </h2>
                        <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models associated with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
                    </div>

                    {/* Search For Escorts */}
                    <Search 
                        placeholder="Search for escorts using model names, country, state...."
                        value={search}
                        setValue={handleSearch}
                        name={"search"}
                    />

                    {/* Filter - Profile Status, Subscribers, Verified escorts, Approved Profiles */}
                    <div className="filters mt-[60px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <ul className="flex items-center bg-gray border border-grey rounded-[6px] overflow-hidden">
                                    <li 
                                        className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                        ${ activeFilter === "All" ? "bg-primary text-black" : "text-primary"}`}
                                        onClick={()=> setActiveFilter("All")}    
                                    >
                                        <span> All </span>
                                    </li>
                                    <li 
                                        className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                        ${ activeFilter === "Active" ? "bg-primary text-black" : "text-primary"}`}
                                        onClick={()=> setActiveFilter("Active")}    
                                    >
                                        <span> Active </span>
                                    </li>
                                    <li 
                                        className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] text-center cursor-pointer  
                                        ${ activeFilter === "Suspended" ? "bg-primary text-black" : "text-primary"}`}
                                        onClick={()=> setActiveFilter("Suspended")}    
                                    >
                                        <span> Suspended </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center">
                                <ul className="flex items-center bg-gray border border-grey rounded-[6px] overflow-hidden">
                                    <li 
                                        className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                        ${ activeFilter === "Verified" ? "bg-primary text-black" : "text-primary"}`}
                                        onClick={()=> setActiveFilter("Verified")}    
                                    >
                                        <span> Verified </span>
                                    </li>
                                    <li 
                                        className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] text-center cursor-pointer  
                                        ${ activeFilter === "Subscribed" ? "bg-primary text-black" : "text-primary"}`}
                                        onClick={()=> setActiveFilter("Subscribed")}    
                                    >
                                        <span> Subscribed </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body px-6 pb-[80px]">
                    { loading ? (
                            <Loading />
                        ) : tempData && (
                            <div className="overflow-hidden">
                                <div className="table w-full relative overflow-auto">
                                    <table className="w-full relative shadow border border-grey">
                                        <thead className="w-full">
                                            <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                                <th className="text-sm text-left font-[600] py-[12px] pl-[22px] pr-[6px]"> Escort Details </th>
                                                <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Verified </th>
                                                <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Subscribed </th>
                                                <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Status </th>
                                                <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Gender </th>
                                                <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Country </th>
                                                <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> State </th>
                                                <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Date </th>
                                                <th className="text-sm text-center font-[600]"> </th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-white">
                                            { tempData?.slice(0, visible)?.map(escort => (
                                                <tr key={escort?._id} className="py-2">
                                                    <td className="text-sm text-left py-2 px-2 font-[600] pl-[22px] pr-[6px]">
                                                        <div className="flex items-center gap-2">
                                                            <img 
                                                                src={escort?.profile_picture} 
                                                                alt={escort?.model_name} 
                                                                className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                            />
                                                            <p className="text-sm text-left py-2 px-2 font-[600]"> { escort?.model_name } </p>
                                                        </div>
                                                    </td>
                                                    <td className="text-sm text-center py-2 px-2 font-[600]"> { escort?.is_verified ? "Yes" : "No"} </td>
                                                    <td className="text-sm text-center py-2 px-2 font-[600]"> { escort?.has_subscribed ? "Yes" : "No"} </td>
                                                    <td className="text-sm text-center py-2 px-2 font-[600]"> { capitalizeWord(escort?.status) } </td>
                                                    <td className="text-sm text-left py-2 px-2 font-[600]"> { escort?.gender } </td>
                                                    <td className="text-sm text-left py-2 px-2 font-[600]"> { escort?.country} </td>
                                                    <td className="text-sm text-left py-2 px-2 font-[600]" title={escort?.state}> { escort?.state?.slice(0, 15) } </td>
                                                    <td className="text-sm text-left py-2 px-2 font-[600]"> { formatDate(escort?.createdAt) } </td>
                                                    <td className="text-sm text-right py-2 px-2 font-[600]">
                                                        <Link href={`/escorts/${escort?.model_name}/${escort?._id}`} className="flex items-center gap-2 text-white hover:text-primary">
                                                            <span className="text-xs"> view </span>
                                                            <FiEye size={18} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                { tempData?.length > visible && (
                                    <div className="flex items-center justify-center">
                                        <button 
                                            className="bg-grey text-white w-[137px] mx-auto border border-lightblack mt-[40px] rounded-[4px] py-[8px] flex items-center justify-center gap-4" 
                                            onClick={()=> showMore(tempData?.length)}
                                        >
                                            { fetching && <LuLoader2 className="animate-spin delay-150ms text-white text-[18px]" />}
                                            <span> Load more </span>
                                        </button>
                                    </div>
                                )}
                            </div> 
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Page;