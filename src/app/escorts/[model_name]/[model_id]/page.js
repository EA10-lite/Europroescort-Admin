"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getEscort } from "@/services/admin";
import { useParams } from "next/navigation";

import { LuLoader2 } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import ProfileActionModal from "@/components/modals/ProfileActionModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

import { approveEscortProfile, rejectEscortProfile } from "@/services/admin";



const Page = () => {
    const [tab, setTab] = useState(1);

    const { model_name, model_id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const getEscortDetails = async () => {
        try {
            setLoading(true);
            const response = await getEscort(model_id);
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(model_name, model_id) {
            getEscortDetails();
        }
    }, [model_id, model_name])

    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);

    const [rejecting, setRejecting] = useState(false);
    const handleRejection = async (values) => {
        try {
            setRejecting(true);
            const resposne = await rejectEscortProfile(model_id, values);
            if(resposne?.data?.success) {
                toast.success("Escort Profile Rejected");
                setOpenRejectModal(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to reject escort profile");
        } finally {
            setRejecting(false);
        }
    }

    const [approving, setApproving] = useState(false);
    const handleApproval = async () => {
        try {
            setApproving(true);
            const resposne = await approveEscortProfile(model_id);
            if(resposne?.data?.success) {
                toast.success("Escort Profile Approved");
                setOpenApproveModal(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to approve escort profile");
        } finally {
            setApproving(false);
        }
    }
    

    return (
        <>  
            { openRejectModal && (
                <ProfileActionModal 
                    title="Are you sure you want to Reject this profile"
                    type="reject"
                    handleAction={handleRejection}
                    loading={rejecting}
                    closeModal={()=> setOpenRejectModal(false)}
                />
            )}

            { openApproveModal && (
                <ProfileActionModal 
                    title="Are you sure you want to Approve this profile"
                    type="approve"
                    handleAction={handleApproval}
                    loading={approving}
                    closeModal={()=> setOpenApproveModal(false)}
                />
            )}

            { openSubscriptionModal && (
                <SubscriptionModal 
                    closeModal={()=> setOpenSubscriptionModal(false)}
                    escortId={data?.details?._id}
                />
            )}

            { loading ? (
                <div className="flex items-center justify-center min-h-[100vh]">
                    <LuLoader2 className="animate-spin text-[28px] text-white" />
                </div>
            ) : data ? (
                <div className="escort-details py-[40px]">
                    { data && <div className="container px-[40px]">
                        <div className="header mb-[40px] text-white">
                            <div className="flex gap-4 items-start justify-between">
                                <div className="">
                                    <h2 className="text-primary font-[500] text-[28px] mb-2"> { data?.details?.model_name } </h2>

                                    <div className="flex items-center gap-3">
                                        <MdLocationOn size={28} className="text-white" />
                                        <h4 className="text-lg font-[500] mb-2"> { data?.details?.country + " " + data?.details?.state } </h4>
                                    </div>
                                    <p className="text-base mb-4 font-[500] max-w-[600px]"> { data?.details?.bio || data?.details?.about } </p>

                                    <p className="text-base mb-4 font-[500]"> 
                                        <b> status: </b> 
                                        <span className="pending ml-2"> { data?.details?.status } </span> 
                                    </p>

                                    <p className="text-base mb-4 font-[500]"> 
                                        <b> verification: </b> 
                                        <span className={` ml-2 ${ data?.details?.is_verified ? "active" : "pending"}`}> 
                                            { data?.details?.is_verified ? "Verified" : "Not Verified "} 
                                        </span> 
                                    </p>

                                    <p className="text-base mb-4 font-[500]"> 
                                        <b> subscription: </b> 
                                        <span className="ml-2 uppercase text-primary"> { data?.details?.subscription_plan } </span> 
                                        <button className="ml-2 bg-primary border border-lightblack px-[12px] py-[4px] text-sm text-black" onClick={()=> setOpenSubscriptionModal(true)}>
                                            <span> update </span>
                                        </button>
                                    </p>

                                    <img src={data?.details?.profile_picture} alt={data?.details?.model_name} className="h-[280px] border border-lightblack mb-4" />
                                </div>

                                <div className="flex items-center gap-3 justify-start">
                                    { !data?.details?.profile_approved && <button 
                                        className="text-primary bg-grey w-[145px] py-[8px] rounded-[133.33px] text-base font-[600]"
                                        onClick={()=> setOpenApproveModal(true)}
                                    >
                                        <span> Approve </span>
                                    </button> }
                                    
                                    <button 
                                        className="text-primary border border-lightblack shadow-md bg-grey w-[145px] py-[8px] rounded-[133.33px] text-base font-[600]"
                                        onClick={()=> setOpenRejectModal(true)}
                                    >
                                        <span> Reject </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="body w-[824px]">
                            <div className="navigatiton mb-[40px]">
                                <ul className="flex items-center gap-2">
                                    <li 
                                        className={`
                                            bg-grey border border-lightblack text-base font-[600] leading-[22px] md:text-[18px] md:leading-[24.8px] py-[8px] px-[12px] font-[400] 
                                            whitespace-nowrap w-[105px] lg:w-[184px] text-center cursor-pointer hover:text-white 
                                            ${ tab === 1 ? "text-white" : "text-[#959595]"}
                                        `}
                                        onClick={()=> setTab(1)}
                                    >
                                        <span> Overview </span>
                                    </li>
                                    <li 
                                        className={`
                                            bg-grey border border-lightblack text-base font-[600] leading-[22px] md:text-[18px] md:leading-[24.8px] py-[8px] px-[12px] font-[400] 
                                            whitespace-nowrap w-[105px] lg:w-[184px] text-center cursor-pointer hover:text-white 
                                            ${ tab === 2 ? "text-white" : "text-[#959595]"}
                                        `}
                                        onClick={()=> setTab(2)}
                                    >
                                        <span> Pictures </span>
                                    </li>
                                    <li 
                                        className={`
                                            bg-grey border border-lightblack text-base font-[600] leading-[22px] md:text-[18px] md:leading-[24.8px] py-[8px] px-[12px] font-[400] 
                                            whitespace-nowrap w-[105px] lg:w-[184px] text-center cursor-pointer hover:text-white 
                                            ${ tab === 3 ? "text-white" : "text-[#959595]"}
                                        `}
                                        onClick={()=> setTab(3)}
                                    >
                                        <span> Rates </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="content text-white">
                                { tab === 1 ? (
                                    <div className="">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-7 bg-gray py-[12px] px-[16px]">
                                                <div className="stats-header bg-grey py-[12px] px-[12px] mb-[12px]">
                                                    <h4 className="text-primary text-base font-[600]"> Stats </h4>
                                                </div>

                                                <div className="stats-body px-[12px]">
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Age </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.age || <span class="text-primary"> Not Added  </span> } years </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Gender </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.gender || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Ethnicity </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.ethnicity || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>

                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Height </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.height || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Bust type </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.body_type || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>

                                                    { data?.details?.breast_size && <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Breast size </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.breast_size || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div> }

                                                    { data?.details?.breast_type && <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Breast type </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.breast_type || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div> }

                                                    { data?.details?.dick_size && <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Dick size </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.dick_size || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div> }

                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Hair Color </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.hair_color || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Hair Length </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.hair_length || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Pornstar </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.pornstar || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Smoker </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.smoker || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Piercing </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.piercing || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Tattoo </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.tattoo || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Availability </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.availability || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Meeting with  </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.meeting_with || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    <div className="stats-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Orientation </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.orientation || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-5 bg-gray py-[12px] px-[16px] h-[fit-content]">
                                                <div className="contact-header bg-grey py-[12px] px-[12px] mb-[12px]">
                                                    <h4 className="text-primary text-base font-[600]"> Contact </h4>
                                                </div>

                                                <div className="contact-body">
                                                    <div className="contact-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Phone </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.phone || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>
                                                    
                                                    <div className="contact-field flex items-center gap-4 mb-[24px]">
                                                        <h4 className="text-sm font-[500]"> Email </h4>
                                                        <div className="divider border border-white grow" />
                                                        <h4 className="text-sm font-[500]"> { data?.details?.email || <span class="text-primary"> Not Added  </span> } </h4>
                                                    </div>

                                                    { data?.details?.twitter && <div className="contact-field flex items-center gap-4 mb-[24px]">
                                                        <img src="/assets/twitter.svg" className="w-[24px] h-[24px]" />
                                                        <a href={data?.details?.website} className="text-sm font-[500]">
                                                            <span> Twitter </span>
                                                        </a>
                                                    </div> }

                                                    { data?.details?.website && <div className="contact-field flex items-center gap-4 mb-[24px]">
                                                        <img src="/assets/web.svg" className="w-[24px] h-[24px]" />
                                                        <a href={data?.details?.website} className="text-sm font-[500]">
                                                            <span> Website </span>
                                                        </a>
                                                    </div> }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : tab === 2 ? (
                                    <div className="flex gap-4 overflow-auto">
                                        { data?.media?.map((url, index)=> (
                                            <div className="border border-grey min-w-[" key={index}>
                                                <img src={url?.url} alt={data?.details?.model_name} className="" />
                                            </div>
                                        ))}

                                        { data?.media?.length <= 0 && (
                                            <div className="px-[16px] py-[8px] border border-grey bg-grey text-white w-full">
                                                <p className="text-sm font-[500]"> { model_name } has added no picture! </p>
                                            </div>
                                        )}
                                    </div>
                                ) : tab === 3 ? (
                                    <div className="model-rate bg-gray p-[20px] max-w-[824px]">
                                        <h4 className="text-white text-[24px] font-[600] mb-4"> Rates </h4>

                                        <div className="rate-table">
                                            <div className="rate-table-heading bg-grey px-[24px] py-[12px] flex items-center justify-between w-full">
                                                <div className="flex-[0.33] md:flex-[0.5] font-[600] text-base leading-[22px]  lg:leading-[38px]"> Time </div>
                                                <div className="flex-[0.33] md:flex-[0.25] font-[600] text-base leading-[22px]  lg:leading-[38px]"> Incall </div>
                                                <div className="flex-[0.33] md:flex-[0.25] font-[600] text-base leading-[22px]  lg:leading-[38px]"> Outcall </div>
                                            </div>

                                            <div className="rate-table-body">
                                                { data?.details?.rates?.map((rate, index)=> (
                                                    <div className="rate-table-row flex items-center justify-between w-full px-[24px] mb-[12px]" key={index}>
                                                        <div className="flex-[0.33] md:flex-[0.5] font-[600] text-base leading-[22px]  lg:leading-[38px]"> { rate?.time } </div>
                                                        <div className="flex-[0.33] md:flex-[0.25] font-[600] text-base leading-[22px]  lg:leading-[38px]"> { rate?.incall } { data?.details?.currency } </div>
                                                        <div className="flex-[0.33] md:flex-[0.25] font-[600] text-base leading-[22px]  lg:leading-[38px]"> { rate?.outcall } { data?.details?.currency } </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : null }
                            </div>
                        </div>
                    </div> }
                </div>
            ): error && (
                <div className="">
                    <div className=""> Error </div>
                </div>
            )}
        </>
    )
}

export default Page;