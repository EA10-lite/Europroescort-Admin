import React, {  useState } from "react";
import { Formik } from "formik";
import Submit from "../forms/Submit";
import Select from "../forms/Select";
import { MdClose } from "react-icons/md";
import { subscribeEscort } from "@/services/admin";
import toast from "react-hot-toast";

const SubscriptionModal = ({ escortId, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const updateEscortSubcription = async (values) => {
        try {
            setLoading(true);
            const response = await subscribeEscort(escortId, values);
            if(response?.data?.success) {
                toast.success("Escort succesffuly subscribed to", values?.type, "plan");
                window.location.reload();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update escort subscription plan");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal delete-account">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="modal-content w-full md:w-[420px] bg-grey border border-lightblack rounded-[8px] overflow-hidden text-white">
                        <div className="flex items-center  justify-between bg-primary text-black py-[12px] px-[16px]">
                            <h1 className="text-[16px] leading-[22px] font-[500]"> Subscription update </h1>
                            <MdClose className="text-[24px]" onClick={closeModal} />
                        </div>
                        <div className="w-full px-[24px] py-[24px]">
                            <Formik
                                initialValues={{ type: "" , duration: "", payment_method: "" }}
                                onSubmit={(values)=> updateEscortSubcription(values)}
                            >
                                {({ values })=> (
                                    <>
                                        <div className="mb-[24px]">
                                            <Select 
                                                name="type"
                                                options={["Top", "Vip"]}
                                                label="Subscription Plan *"
                                            />
                                        </div>

                                        { values["type"] && <div className="mb-[24px]">
                                            <Select 
                                                name="duration"
                                                options={ values["type"] === "Top" ? [30] :[7, 14, 30]}
                                                label="Duration *"
                                            />
                                        </div> }
                                        <div className="mb-[24px]">
                                            <Select 
                                                name="payment_method"
                                                options={["Online card payment", "Bank Transfer", "Cryptocurrency"]}
                                                label="Payment method *"
                                            />
                                        </div>

                                        <Submit title="Update" loading={loading} />
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionModal;