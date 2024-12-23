"use client";
import Loading from "@/components/Loading";
import { getAllAgencies } from "@/services/admin";
import { useEffect, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { formatDate } from "@/utils/getDate";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import Search from "@/components/Search";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getAgencys = async () => {
        try {
            const response = await getAllAgencies();
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
        getAgencys();
    },[])

    
    const [search, setSearch] = useState("");
    const handleSearch = (e)=> {
        setSearch(e.target.value);
    }
    
    const [tempData, setTempData] = useState();
    useEffect(()=> {
        setTempData(data);
    }, [data])

    useEffect(()=> {
        setTempData(data);
        if(search.length > 0) {
            setTempData(
                (temp_data)=> temp_data?.filter(
                    agency => agency?.agency_name?.toLowerCase().includes(search) || 
                    agency?.country?.toLowerCase().includes(search) || 
                    agency?.state?.toLowerCase().includes(search)
                )
            );
        }
        else {
            setTempData(data);
        }
    },[search])

    return (
        <>
            { loading ? (
                <Loading />
            ) : data && <div className="pt-[40px] w-full h-full">
                <div className="page-header text-white px-6 mb-[40px]">
                    {/* Title */}
                    <div className="mb-[24px]">
                        <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Agencies @ <a href="https://www.mcescorts.com" className="text-primary"> MCEscorts.com </a> </h2>
                        <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive agencies management section of our website. Here, you can browse through the full list of agencies associated with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
                    </div>

                    {/* Search For Escorts */}
                    <Search 
                        placeholder="Search for escorts using model names, country, state...."
                        value={search}
                        setValue={handleSearch}
                        name={"search"}
                    />

                    {/* Filter - Profile Status, Subscribers, Verified escorts, Approved Profiles */}
                    <div className="filters mt-[24px] hidden">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <p> Filter type A </p>
                            </div>
                            <div className="">
                                <p> Filter Tye B </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body p-6">
                    <div className="shadow">
                        <div className="search flex items-center gap-2 justify-between w-full border border-gray rounded-[4px] px-4 py-2 mb-[24px] hidden">
                            <BiSearch className="text-[24px] text-grey" />
                            <input 
                                type="search" 
                                className="w-full text-sm font-[500] leading-[19px]"
                                placeholder="Search for agencys here"
                            />
                        </div>
                        <div className="table w-full relative">
                            <div className="table-nav">

                            </div>

                            <table className="w-full relative border border-grey">
                                <thead className="w-full">
                                    <tr className="w-full py-2 bg-gray text-primary sticky top-0">
                                        <th className="text-sm text-left py-[12px] px-[6px] font-[600]"> Agency </th>
                                        <th className="text-sm text-center py-[12px] px-[6px] font-[600]"> Verification </th>
                                        <th className="text-sm text-center py-[12px] px-[6px] font-[600]"> Profile Status </th>
                                        <th className="text-sm text-left py-[12px] px-[6px] font-[600]"> Country </th>
                                        <th className="text-sm text-left py-[12px] px-[6px] font-[600]"> City </th>
                                        <th className="text-sm text-left py-[12px] px-[6px] font-[600]"> Date Joined </th>
                                        <th className="text-sm text-center py-[12px] px-[6px] font-[600]"> </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { tempData?.map(agency => (
                                        <tr key={agency?._id} className="py-2 text-white">
                                            <td className="text-sm text-left py-2 px-2 font-[600]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={agency?.banner || agency?.profile_picture} 
                                                        alt={agency?.agency_name} 
                                                        className="w-[44px] h-[44px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { agency?.agency_name } </p>
                                                </div>
                                            </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { agency?.is_verified ? "Yes" : "No"} </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { agency?.status } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { agency?.country } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { agency?.state } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { formatDate(agency?.createdAt) } </td>
                                            <td className="text-sm text-right py-2 px-2 font-[600]">
                                                <Link href={`/agencies/${agency?.agency_name}/${agency?._id}`} className="flex items-center gap-2 text-white hover:text-primary">
                                                    <span className="text-xs"> view </span>
                                                    <FiEye size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> }
        </>
    )
}

export default Page;