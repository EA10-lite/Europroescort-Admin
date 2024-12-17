"use client";
import Loading from "@/components/Loading";
import CreateBannerModal from "@/components/modals/CreateBannerModal";
import { getAllBanners } from "@/services/admin";
import { useEffect, useState } from "react";


const Page = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const getBanners = async () => {
        try {
            setLoading(true);
            const response = await getAllBanners();
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
        getBanners();
    },[])

    const [open, setOpen] = useState(false);


    return (
        <>
            { open && (
                <CreateBannerModal 
                    closeModal={()=> setOpen(false)}
                />
            )}
            <div className="py-[40px] w-full h-full">
                <div className="page-header text-white px-6 mb-[20px]">
                    {/* Title */}
                    <div className="mb-[24px]">
                        <h2 className="text-[22px] leading-[28px] font-[500] mb-[12px]"> Banners @ <a href="https://www.mcescorts.com" className="text-primary"> MCEscorts.com </a> </h2>
                        <p className="text-[16px] font-[500] leading-[22px]"> Welcome to the comprehensive escorts management section of our website. Here, you can browse through the full list of models associated with our platform, view their detailed profiles including bio, portfolio, and performance metrics, and utilize the administrative tools available to update their information, manage their visibility, and ensure their profiles are up-to-date and fully optimized for the best user experience. </p>

                        <button onClick={()=> setOpen(true)} className="bg-primary text-black text-sm font-[500] block w-[fit-content] mt-[24px] px-[12px] py-[8px] rounded-[132px]"> Add New Banner </button>
                    </div>
                </div>

                <div className="page-body px-6 pb-[80px]">
                    { loading ? (
                            <Loading />
                        ) : data && (
                            <div className="flex items-center gap-4 flex-wrap">
                                { data?.length > 0 ? data?.map((banner, index)=> (
                                    <a href={banner?.link} key={index} target="_blank" className="bg-grey border border-lightblack">
                                        <img src={banner?.picture} alt={banner?.name} className="w-[187px] h-[243px] object-cover" />
                                    </a>
                                )) : (
                                    <p className="bg-grey border border-lightblack py-[12px] px-[16px] w-full text-white text-center"> No Banner added yet </p>
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