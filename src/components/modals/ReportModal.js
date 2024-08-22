import { getEscortReportsById } from "@/services/admin";
import React, { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const ReportModal = ({ closeModal, id }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const getReport = async () => {
        try {
            setLoading(true);
            const response = await getEscortReportsById(id);
            if(response?.data?.success) {
                setData(response?.data?.result);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(id !== -1) {
            getReport();
        }
    }, [id])

    return (
        <div className="modal report-modal">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-opacity-25 bg-[black] z-[99]">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="modal-content w-[620px] relative bg-gray">
                        { loading ? (
                            <div className="">
                                <LuLoader2 className="animate-spin delay-150ms text-white text-[28px]" />
                            </div>
                        ) : data && (
                            <div className="border border-grey">
                                <div className="modal-header flex items-center justify-between bg-primary px-[16px] py-[12px]">
                                    <h3 className="text-[18px] font-[500] text-black"> Report </h3>

                                    <MdClose className="text-black text-[22px] cursor-pointer" onClick={closeModal} />
                                </div>


                                <div className="modal-body p-[20px] text-white">
                                    <div className="mb-[24px]">
                                        <h4 className="text-[18px] font-[500] underline mb-2"> Reporter Details </h4>
                                        <p className="text-base font-[400]"><b> Name: </b> { data[0].name } </p>
                                        <p className="text-base font-[400]"><b> Email: </b> { data[0].email } </p>
                                    </div>

                                    <div className="mb-[24px]">
                                        <h4 className="text-[18px] font-[500] underline mb-2"> Reason for report </h4>
                                        <p className="text-base font-[400]"> { data[0]?.message } </p>
                                    </div>

                                    <div className="mb-[24px]">
                                        <h4 className="text-[18px] font-[500] underline mb-2"> Proofs </h4>

                                        <div className="report-pictures flex items-center gap-3">
                                            { data[0]?.pictures?.map((picture, index) => (
                                                <div className="report-picture" key={index}>
                                                    <img src={picture?.url} alt="" loading="lazy" className=" w-[180px] h-[220px] object-cover" />
                                                </div>
                                            ))}    
                                        </div>  
                                    </div>  
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            /</div>
        </div>
    )
}

export default ReportModal;