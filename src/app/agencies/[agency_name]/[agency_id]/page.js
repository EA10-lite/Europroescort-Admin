"use client";
import React, { useEffect, useState } from "react";
import { getAgency } from "@/services/admin";
import { useParams } from "next/navigation";

import { MdLocationOn } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";

import EscortCard from "@/components/EscortCard";


const Page = () => {
    const { agency_name, agency_id } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const getAgencyDetails = async () => {
        try {
            setLoading(true);
            const response = await getAgency(agency_id);
            console.log(response);
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
        if(agency_name, agency_id) {
            getAgencyDetails();
        }
    }, [agency_id, agency_name])

    return (
        <div className="escort-details py-[40px]">
           { loading ? (
                <div className="flex items-center justify-center min-h-[100vh]">
                    <LuLoader2 className="animate-spin text-[28px] text-white" />
                </div>
            ) : data ? (
                <div className="container px-[40px]">
                    <div className="header mb-[40px] text-white">
                        <div className="flex gap-4 justify-between">
                            <div className="">
                                <h2 className="text-primary font-[500] text-[28px] mb-2"> { data?.details?.agency_name } </h2>

                                <div className="flex items-center gap-3">
                                    <MdLocationOn size={28} className="text-white" />
                                    <h4 className="text-lg font-[500] mb-2"> { data?.details?.country + " " + data?.details?.state } </h4>
                                </div>
                                <p className="text-base mb-4 font-[500] max-w-[600px]"> { data?.details?.bio || data?.details?.about } </p>

                                <p className="text-base mb-4 font-[500]"> <b> status: </b> <span className="pending ml-2"> { data?.details?.status } </span> </p>
                                <p className="text-base mb-4 font-[500]"> <b> verification: </b> <span className={` ml-2 ${ data?.is_verified ? "" : "pending"}`}> { data?.details?.is_verified ? "Verified" : "Not Verified "} </span> </p>

                                <img src={data?.details?.banner || data?.details.profile_picture} alt={data?.details?.agency_name} className="h-[280px] object-cover border border-lightblack mb-4" />
                            </div>
                        </div>
                    </div>

                    <div className="body w-full text-white">
                        <div className="mb-[40px]">
                            <h3> Escorts </h3>
                        </div>

                        <div className="content">
                            { data?.escorts?.map((escort, index) => (
                                <EscortCard 
                                    key={index}
                                    escort={escort}
                                />
                            ))}


                            { data?.escorts?.length <= 0 && (
                                <div className="border border-grey bg-gray w-[824px] py-[8px] px-[16px]">
                                    <p className="font-[500] text-sm"> { data?.details?.agency_name } have added no escort added </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div> 
            ) : error && (
                <div className="">
                    <div className=""> Error </div>
                </div>
            )}
        </div>
    )
}

export default Page;