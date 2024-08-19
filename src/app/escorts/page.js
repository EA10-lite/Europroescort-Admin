"use client";
import Loading from "@/components/Loading";
import { getAllEscorts } from "@/services/admin";
import { useEffect, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { formatDate } from "@/utils/getDate";

import { FiEye } from "react-icons/fi";
import Link from "next/link";
import Search from "@/components/Search";


const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getEscorts = async () => {
        try {
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
    },[])

    const [search, setSearch] = useState("");

    return (
        <>
            { loading ? (
                <Loading />
            ) : data && <div className="py-[40px] w-full h-full">
                <div className="page-header text-white px-6 mb-[40px]">
                    {/* Title */}
                    <div className="mb-[24px]">
                        <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Escorts @ <a href="https://www.mcescorts.com" className="text-primary"> MCEscorts.com </a> </h2>
                        <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models associated with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
                    </div>

                    {/* Search For Escorts */}
                    <Search 
                        placeholder="Search for escorts using model names, country, state...."
                        value={search}
                        setValue={setSearch}
                        name={"search"}
                    />

                    {/* Filter - Profile Status, Subscribers, Verified escorts, Approved Profiles */}
                    <div className="filters mt-[24px]">
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

                <div className="page-body px-6 pb-[80px]">
                    <div className="overflow-hidden">
                        <div className="search flex items-center gap-2 justify-between w-full border border-gray px-4 py-2 mb-[24px] hidden">
                            <BiSearch className="text-[24px] text-grey" />
                            <input 
                                type="search" 
                                className="w-full text-sm font-[500] leading-[19px]"
                                placeholder="Search for escorts here"
                            />
                        </div>
                        <div className="table w-full relative overflow-auto">
                            <div className="table-nav">

                            </div>

                            <table className="w-full relative shadow border border-grey">
                                <thead className="w-full">
                                    <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                        <th className="text-sm text-left font-[600] py-[12px] px-[6px]"> Escort Details </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Verified </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Subscribed </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Status </th>
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Gender </th>
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Country </th>
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> City </th>
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Date </th>
                                        <th className="text-sm text-center font-[600]"> </th>
                                    </tr>
                                </thead>

                                <tbody className="text-white">
                                    { data?.map(escort => (
                                        <tr key={escort?._id} className="py-2">
                                            <td className="text-sm text-left py-2 px-2 font-[600]">
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
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { escort?.is_subscribed ? "Yes" : "No"} </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { escort?.status } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { escort?.gender } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { escort?.country } </td>
                                            <td className="text-sm text-left py-2 px-2 font-[600]"> { escort?.state } </td>
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
                    </div>
                </div>
            </div> }
        </>
    )
}

export default Page;