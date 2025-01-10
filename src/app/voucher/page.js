"use client";
import Search from "@/components/Search";
import { getSubmittedVouchersByAgency, getSubmittedVouchersByEscort } from "@/services/admin";
import { formatDate } from "@/utils/getDate";
import { useEffect, useState } from "react";


const Page = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [accountType, setAccountType] = useState("Escorts");

    const [tempData, setTempData] = useState();
    const [data, setData] = useState();

    const [loading, setLoading] = useState(false);
    const getActiveEscortsSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await getSubmittedVouchersByEscort();
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            
        }
        finally {
            setLoading(false);
        }
    }
    const getActiveAgenciesSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await getSubmittedVouchersByAgency();
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(accountType === "Escorts") {
            getActiveEscortsSubscriptions();
        }

        else {
            getActiveAgenciesSubscriptions();
        }
    }, [accountType])


    useEffect(()=> {
        if(data) {
            let new_data = [...data]
            if(activeFilter?.toLowerCase() === "all") {
                setTempData(data);
            }

            if(activeFilter?.toLowerCase() === "top") {
                new_data = new_data.filter(item => item.type === "Top");
                setTempData(new_data);
            }

            else if(activeFilter?.toLowerCase() === "vip") {
                new_data = new_data.filter(item => item.type === "Vip");
                setTempData(new_data);
            }
        }
    } ,[activeFilter, data])

    const [search, setSearch] = useState("");
    const handleSearch = (e)=> {
        setSearch(e.target.value);
    }

    useEffect(()=> {
        setTempData(data);
        if(search.length > 0) {
            if(accountType === "Escorts") {
                setTempData(
                    (temp_data)=> temp_data?.filter(
                        item => item?.submitted_by?.model_name?.toLowerCase().includes(search)
                    )
                );
            }
            
            else {
                setTempData(
                    (temp_data)=> temp_data?.filter(
                        item => item?.submitted_by?.agency_name?.toLowerCase().includes(search)
                    )
                );
            }
        }
        else {
            setTempData(data);
        }
    },[search, accountType])


    return (
        <div className="py-[40px] w-full h-full"> 
            <div className="page-header text-white px-6 mb-[20px]">
                {/* Title */}
                <div className="mb-[24px]">
                    <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Voucher submitted </h2>
                    <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models who are currently subscribed with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
                </div>

                {/* Search For Escorts */}
                <Search 
                    placeholder="Search for escorts or agencies using names, country, state...."
                    value={search}
                    setValue={handleSearch}
                    name={"search"}
                />

                {/* Filter - Escorts, Agencies, Top, Vip */}
                <div className="filters mt-[60px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ul className="flex items-center bg-gray border border-grey rounded-[6px] overflow-hidden">
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ activeFilter === "Escorts" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("Escorts")}    
                                >
                                    <span> Escorts </span>
                                </li>
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ activeFilter === "Agencies" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("Agencies")}    
                                >
                                    <span> Agencies </span>
                                </li>
                            </ul>
                        </div>
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
                                    ${ activeFilter === "TOP" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("TOP")}    
                                >
                                    <span> TOP </span>
                                </li>
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] text-center cursor-pointer  
                                    ${ activeFilter === "VIP" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("VIP")}    
                                >
                                    <span> VIP </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body px-6 pb-[80px]">
                <div className="overflow-hidden">
                    <div className="table w-full relative overflow-auto">
                        <table className="w-full relative shadow border border-grey">
                            <thead className="w-full">
                                <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                    <th className="text-sm text-left font-[600] py-[12px] pl-[22px] pr-[6px]"> { accountType === "Escorts" ? "Escort" : "Agencies" } </th>
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> ORDER ID </th>
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> CODE </th>
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Date </th>
                                    <th className="text-sm text-center font-[600]"> </th>
                                </tr>
                            </thead>

                            <tbody className="text-white">
                                { tempData?.map(data => (
                                    <tr key={data?._id} className="py-2">
                                        { accountType === "Escorts" ? (
                                            <td className="text-sm text-left py-2 px-2 font-[600] pl-[22px] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={data?.submitted_by?.profile_picture} 
                                                        alt={data?.submitted_by?.model_name} 
                                                        className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { data?.submitted_by?.model_name } </p>
                                                </div>
                                            </td> 
                                        ) : (
                                            <td className="text-sm text-left py-2 px-2 font-[600] pl-[22px] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={data?.submitted_by?.banner} 
                                                        alt={data?.submitted_by?.agency_name} 
                                                        className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { data?.submitted_by?.agency_name } </p>
                                                </div>
                                            </td>
                                        )}
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { data?.order_id } </td>
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { data?.code } </td>
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { formatDate(data?.createdAt) } </td>
                                        <td className="text-sm text-center py-2 px-2 font-[600]">  </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;