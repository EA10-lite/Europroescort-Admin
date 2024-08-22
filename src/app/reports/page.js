"use client";
import Loading from "@/components/Loading";
import { getEscortReports } from "@/services/admin";
import { useEffect, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { formatDate } from "@/utils/getDate";

import ReportModal from "@/components/modals/ReportModal";
import Search from "@/components/Search";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getReports = async () => {
        try {
            const response = await getEscortReports();
            console.log("Response: ", response);
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
        getReports();
    },[])


    const [activeReportId, setActiveReportId] = useState(-1);

    const [search, setSearch] = useState("");

    return (
        <>
            { activeReportId !== -1 && (
                <ReportModal 
                    closeModal={()=> setActiveReportId(-1)}
                    id={activeReportId}
                />
            )}


            { loading ? (
                <Loading />
            ) : data ? (
                <div className="py-[40px] w-full h-full">
                    <div className="page-header text-white px-6 mb-[40px]">
                        {/* Title */}
                        <div className="mb-[24px]">
                            <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Reports </h2>
                            <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models associated with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>
                        </div>

                        {/* Search For Escorts */}
                        <Search 
                            placeholder="Search for escorts using model names, country, state...."
                            value={search}
                            setValue={setSearch}
                            name={"search"}
                        />
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
                                            <th className="text-sm text-left font-[600] py-[12px] pl-[22px] pr-[6px]"> Reporter </th>
                                            <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Email </th>
                                            <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Escort </th>
                                            <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Country </th>
                                            <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Reason </th>
                                            <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Date </th>
                                            <th className="text-sm text-center font-[600]"> </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-white">
                                        { data?.map(report => (
                                            <tr key={report?._id} className="py-2">
                                                <td className="text-sm text-left py-2 pl-[22px] pr-[6px] font-[600]"> { report?.name } </td>
                                                <td className="text-sm text-left py-2 px-2 font-[600]"> { report?.email } </td>
                                                <td className="text-sm text-left py-2 px-2 font-[600]">
                                                    <div className="flex items-center gap-2">
                                                        <img 
                                                            src={report?.escort_id?.profile_picture} 
                                                            alt={report?.escort_id?.model_name} 
                                                            className="min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] object-cover rounded-full" loading="lazy" 
                                                        />
                                                        <p className="text-sm text-left py-2 px-2 font-[600]"> { report?.escort_id?.model_name } </p>
                                                    </div>
                                                </td>
                                                <td className="text-sm text-center py-2 px-2 font-[600]">{ report?.escort_id?.country }  </td>
                                                <td className="text-sm text-left py-2 px-2 font-[600]">  </td>
                                                <td className="text-sm text-left py-2 px-2 font-[600]"> { formatDate(report?.createdAt) } </td>
                                                <td className="text-sm text-right py-2 px-2 font-[600]"> 
                                                    <button className="hover:text-primary" onClick={()=> setActiveReportId(report?._id)}>
                                                        <span> View </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> 
            ) : (
                <div className="bg-gray border border-grey px-[16px] py-[12px]">
                    <p className="text-[500] text-[18px]"> No Report found </p>
                </div>
            )}
        </>
    )
}

export default Page;