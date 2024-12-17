"use client";
import Search from "@/components/Search";
import { getVerifiedEscorts, getVerifiedAgencies } from "@/services/admin";
import { formatDate } from "@/utils/getDate";
import { useEffect, useState } from "react";


const Page = () => {
    const [activeFilter, setActiveFilter] = useState("approved");
    const [accountType, setAccountType] = useState("Escorts");

    const [tempData, setTempData] = useState();
    const [data, setData] = useState();

    const [loading, setLoading] = useState(false);
    const getVerification = async () => {
        try {
            setLoading(true);
            let response;

            if(accountType === "Escorts") {
                response = await getVerifiedEscorts();
            }
            else {
                response = await getVerifiedAgencies();
            }

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
        getVerification();
    }, [accountType])


    useEffect(()=> {
        if(data) {
            console.log("data: ", data);

            let new_data = [...data]
            if(activeFilter?.toLowerCase() === "rejected") {
                new_data = new_data.filter(item => item.status === "rejected");
                setTempData(new_data);
            }

            if(activeFilter?.toLowerCase() === "pending") {
                new_data = new_data.filter(item => item.status === "pending");
                setTempData(new_data);
            }

            else if(activeFilter?.toLowerCase() === "approved") {
                new_data = new_data.filter(item => item.status === "approved");
                setTempData(new_data);
            }

            console.log("new data: ", tempData);
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
                        escort => escort?.model_name?.toLowerCase().includes(search) || 
                        escort?.country?.toLowerCase().includes(search) || 
                        escort?.state?.toLowerCase().includes(search)
                    )
                );
            }
            
            else {
                setTempData(
                    (temp_data)=> temp_data?.filter(
                        agency => agency?.agency_name?.toLowerCase().includes(search) || 
                        agency?.country?.toLowerCase().includes(search) || 
                        agency?.state?.toLowerCase().includes(search)
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
                    <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Verifications </h2>
                    <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models who are currently verified with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
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
                                    ${ accountType === "Escorts" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setAccountType("Escorts")}    
                                >
                                    <span> Escorts </span>
                                </li>
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ accountType === "Agencies" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setAccountType("Agencies")}    
                                >
                                    <span> Agencies </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center">
                            <ul className="flex items-center bg-gray border border-grey rounded-[6px] overflow-hidden">
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ activeFilter === "approved" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("approved")}    
                                >
                                    <span> Approved </span>
                                </li>
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ activeFilter === "pending" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("pending")}    
                                >
                                    <span> Pending </span>
                                </li>
                                <li 
                                    className={`px-[16px] py-[8px] text-[13px] font-[500] min-w-[88px] border-r border-grey text-center cursor-pointer  
                                    ${ activeFilter === "rejected" ? "bg-primary text-black" : "text-primary"}`}
                                    onClick={()=> setActiveFilter("rejected")}    
                                >
                                    <span> Rejected </span>
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
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> status </th>
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> country </th>
                                    <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> state </th>
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
                                                        src={data?.escortId?.profile_picture} 
                                                        alt={data?.escortId?.model_name} 
                                                        className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { data?.escortId?.model_name } </p>
                                                </div>
                                            </td> 
                                        ) : (
                                            <td className="text-sm text-left py-2 px-2 font-[600] pl-[22px] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={data?.agencyId?.banner} 
                                                        alt={data?.agencyId?.agency_name} 
                                                        className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { data?.agencyId?.agency_name } </p>
                                                </div>
                                            </td>
                                        )}
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { data?.status } </td>
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { data?.escortId?.country } </td>
                                        <td className="text-sm text-center py-2 px-2 font-[600]"> { data?.escortId?.state } </td>
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