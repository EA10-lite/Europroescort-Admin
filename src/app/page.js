"use client";

import Loading from "@/components/Loading";
import { getDashboard } from "@/services/admin";
import { formatDate } from "@/utils/getDate";
import { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { TbGenderDemigirl } from "react-icons/tb";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const getDashboardDetails = async () => {
        try {
            setLoading(true);
            const response = await getDashboard();
            console.log("response: ", response);
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        getDashboardDetails();
    } ,[])

    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            { loading ? (
                <Loading />
            ) : data && (
                <div className="py-[40px] w-full h-full text-white">
                    <div className="mb-[24px]">
                        <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> <a href="https://www.mcescorts.com" className="text-primary"> MCEscorts.com </a> </h2>
                        <p className="text-[16px] font-[500] leading-[22px]">  </p>
                    </div>


                    <div className="dashboard-header grid grid-cols-12 md:grid-cols-6 lg:grid-cols-4 gap-4 mb-[40px]">
                        <div className="bg-grey border border-lightblack p-[16px] rounded-[4px]">
                            <div className="w-[36px] h-[36px] rounded-full border border-lightblack mb-[10px] flex items-center justify-center bg-gray">
                                <FaUser className="text-[18px]" />
                            </div>
                            <h4 className="text-base font-[500]"> Total Escorts </h4>
                            <p className="text-[22px] font-[500] text-primary"> { data?.total_escorts } <span className="text-sm">escorts</span> </p>
                        </div>
                        <div className="bg-grey border border-lightblack p-[16px] rounded-[4px]">
                            <div className="w-[36px] h-[36px] rounded-full border border-lightblack mb-[10px] flex items-center justify-center bg-gray">
                                <FaUsers className="text-[18px]" />
                            </div>
                            <h4 className="text-base font-[500]"> Total Agencies </h4>
                            <p className="text-[22px] font-[500] text-primary"> { data?.total_agencies } <span className="text-sm">agencies</span> </p>
                        </div>
                        <div className="bg-grey border border-lightblack p-[16px] rounded-[4px]">
                            <div className="w-[36px] h-[36px] rounded-full border border-lightblack mb-[10px] flex items-center justify-center bg-gray">
                                <MdPayment className="text-[18px]" />
                            </div>
                            <h4 className="text-base font-[500]"> Subscribed Escorts </h4>
                            <p className="text-[22px] font-[500] text-primary"> { data?.escort_subscriptions?.length } <span className="text-sm">escorts</span> </p>
                        </div>
                        <div className="bg-grey border border-lightblack p-[16px] rounded-[4px]">
                            <div className="w-[36px] h-[36px] rounded-full border border-lightblack mb-[10px] flex items-center justify-center bg-gray">
                                <MdPayment className="text-[18px]" />
                            </div>
                            <h4 className="text-base font-[500]"> Subscribed Agencies </h4>
                            <p className="text-[22px] font-[500] text-primary"> { data?.agency_subscriptions?.length } <span className="text-sm">agencies</span> </p>
                        </div>
                    </div>


                    <div className="dashboard-body grid grid-cols-2 gap-4 grid-auto">
                        <div className="col-span-1 p-[16px] h-[fit-content] bg-grey border border-lightblack rounded-[4px]">
                            <h4 className="text-[15px] font-[500] mb-[12px] pb-[12px] text-primary border-b border-primary"> Recently subscribed escorts </h4>

                            <table className="w-full relative">
                                <thead className="w-full">
                                    <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Escort </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Plan </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Start </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> End  </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { data?.escort_subscriptions?.slice(0, 5)?.map((subscription, index)=> (
                                        <tr key={index}>
                                            <td className="text-sm text-left py-2 font-[600] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={subscription?.escortId?.profile_picture} 
                                                        alt={subscription?.escortId?.model_name} 
                                                        className="min-w-[36px] h-[36px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { subscription?.escortId?.model_name } </p>
                                                </div>
                                            </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600] uppercase"> { subscription?.type } </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { formatDate(subscription?.startDate) } </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { formatDate(subscription?.endDate) } </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-span-1 p-[16px] bg-grey border border-lightblack rounded-[4px]">
                            <h4 className="text-[15px] font-[500] mb-[12px] pb-[12px] text-primary border-b border-primary"> Recently updated escort profiles </h4>

                            <table className="w-full relative">
                                <thead className="w-full">
                                    <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Escort </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Verified </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Subscribed  </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Date  </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { data?.escorts?.slice(0, 5)?.map((escort, index)=> (
                                        <tr key={index}>
                                            <td className="text-sm text-left py-1 font-[600] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={escort?.profile_picture} 
                                                        alt={escort?.model_name} 
                                                        className="min-w-[36px] h-[36px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> {escort?.model_name } </p>
                                                </div>
                                            </td>
                                            <td className="text-sm text-center py-1 px-2 font-[600]"> { escort?.is_verified ? "Verified" : "Not Verified" } </td>
                                            <td className="text-sm text-center py-1 px-2 font-[600] uppercase"> { escort?.subscription_plan } </td>
                                            <td className="text-sm text-center py-1 px-2 font-[600]"> { formatDate(escort?.updatedAt) }  </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-span-1 p-[16px] h-[fit-content] bg-grey border border-lightblack rounded-[4px]">
                            <h4 className="text-[15px] font-[500] mb-[12px] pb-[12px] text-primary border-b border-primary"> Recently subscribed Agencies </h4>

                            <table className="w-full relative">
                                <thead className="w-full">
                                    <tr className="w-full py-2 bg-gray text-primary sticky top-0 px-4">
                                        <th className="text-sm text-left font-[600] py-[8px] px-[6px]"> Agency </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Plan </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> Start </th>
                                        <th className="text-sm text-center font-[600] py-[8px] px-[6px]"> End  </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { data?.agency_subscriptions?.slice(0, 5)?.map((subscription, index)=> (
                                        <tr key={index}>
                                            <td className="text-sm text-left py-2 font-[600] pr-[6px]">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={subscription?.agencyId?.banner} 
                                                        alt={subscription?.agencyId?.agency_name} 
                                                        className="min-w-[36px] h-[36px] object-cover rounded-full" loading="lazy" 
                                                    />
                                                    <p className="text-sm text-left py-2 px-2 font-[600]"> { subscription?.agencyId?.agency_name } </p>
                                                </div>
                                            </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600] uppercase"> { subscription?.type } </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { formatDate(subscription?.startDate) } </td>
                                            <td className="text-sm text-center py-2 px-2 font-[600]"> { formatDate(subscription?.endDate) } </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page;