import { Formik } from "formik";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import Textbox from "../forms/Textbox";
import Submit from "../forms/Submit";

const MessageModal = ({ 
    closeModal,
    handleAction, 
    loading, 
}) => {

    return (
        <div className="modal">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80 z-[99]">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="form modal-content min-w-[360px] p-[24px] bg-gray">
                        <Formik
                            initialValues={{ message: "" }}
                            onSubmit={(values)=> handleAction(values)}
                        >
                            {()=> (
                                <>
                                    <Textbox 
                                        name="message"
                                        placeholder="Type your message here"
                                        label={"Message"}
                                    />

                                    <div className="flex items-center gap-2">
                                        <div className="flex-[0.5]">
                                            <button onClick={closeModal} className="w-[130px] p-[10px] bg-gray text-primary border border-primary text-[16px] leading-[22px] font-[500] cursor-pointer hover:bg-primary hover:text-black rounded-[4px]">
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
                </div>
            </div>
        </div>
    )
}

export default MessageModal;