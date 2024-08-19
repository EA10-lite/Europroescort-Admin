import { Formik } from "formik";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import Textbox from "../forms/Textbox";
import Submit from "../forms/Submit";

const ProfileActionModal = ({ 
    closeModal, 
    handleAction, 
    loading, 
    type,
    title = "Are your sure you want to delete your account" 
}) => {
    const [openMessageBox, setOpenMessageBox] = useState(false);

    return (
        <div className="modal delete-account">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80 z-[99]">
                <div className="flex items-center justify-center w-full h-full">
                    { !openMessageBox && <div className="modal-content max-w-[370px] p-[40px] bg-gray">
                        <h4 className="text-center font-[500] text-white text-[24px] leading-[39px]"> { title } </h4>

                        <div className="flex items-center gap-4 mt-[24px]">
                            <button onClick={closeModal} className="w-[130px] p-[10px] bg-gray text-primary border border-primary text-[20px] leading-[24px] font-[500] cursor-pointer hover:bg-primary hover:text-black ">
                                <span> Cancel </span>
                            </button>
                            <button onClick={ type === "reject" ? ()=> setOpenMessageBox(true) : handleAction } className={`w-[130px] p-[10px] bg-primary text-black border border-primary text-[20px] leading-[24px] font-[500] cursor-pointer flex items-center justify-center gap-3 ${ loading && "bg-opacity-60"}`}>
                                { loading && <LuLoader2 className="animate-spin delay-100" size="24" />}
                                <span> Confirm </span>
                            </button>
                        </div>
                    </div> }

                    { type == "reject" && openMessageBox && (
                        <div className="form modal-content min-w-[360px] p-[24px] bg-gray">
                            <Formik
                                initialValues={{ message: "" }}
                                onSubmit={(values)=> handleAction(values)}
                            >
                                {()=> (
                                    <>
                                        <Textbox 
                                            name="message"
                                            placeholder="Enter a reason for rejection"
                                            label={"Message"}
                                        />

                                        <div className="flex items-center gap-2">
                                            <div className="flex-[0.5]">
                                                <button onClick={() => setOpenMessageBox(false)} className="w-[130px] p-[10px] bg-gray text-primary border border-primary text-[16px] leading-[22px] font-[500] cursor-pointer hover:bg-primary hover:text-black rounded-[4px]">
                                                    <span> Cancel </span>
                                                </button>
                                            </div>

                                            <div className="flex-[0.5]">
                                                <Submit 
                                                    loading={loading}
                                                    title={"Submit"}
                                                    style={{ fontSize: "16px", fontWeight: "500"}}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileActionModal;