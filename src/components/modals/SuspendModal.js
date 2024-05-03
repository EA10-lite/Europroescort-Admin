import React from "react";
import { LuLoader2 } from "react-icons/lu";

const SuspendModal = ({ closeModal, handleSuspend, loading, type = "Escort"}) => {
    return (
        <div className="modal delete-account">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="modal-content max-w-[420px] p-[40px] bg-grey">
                        <h4 className="text-center font-[500] text-white text-[24px] leading-[39px]"> Are your sure you want to suspend this { type } account </h4>

                        <div className="flex items-center justify-center gap-4 mt-[24px]">
                            <button onClick={closeModal} className="w-[130px] p-[10px] bg-grey text-primary border border-primary text-[20px] leading-[24px] font-[500] cursor-pointer hover:bg-primary hover:text-black ">
                                <span> Cancel </span>
                            </button>
                            <button onClick={handleSuspend} className={`w-[130px] p-[10px] bg-primary text-black border border-primary text-[20px] leading-[24px] font-[500] cursor-pointer flex items-center justify-center gap-3 ${ loading && "bg-opacity-60"}`}>
                                { loading && <LuLoader2 className="animate-spin delay-100" size="24" />}
                                <span> Confirm </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuspendModal;