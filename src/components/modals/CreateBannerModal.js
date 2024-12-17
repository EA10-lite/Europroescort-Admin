import React, {  useState } from "react";
import { Formik } from "formik";
import Submit from "../forms/Submit";
import Select from "../forms/Select";
import { MdClose } from "react-icons/md";
import { addBanner } from "@/services/admin";
import toast from "react-hot-toast";
import Field from "../forms/Field";
import Image from "../forms/Image";

const CreateBannerModal = ({ closeModal }) => {
    const [loading, setLoading] = useState(false);

    const createBanner = async (values) => {
        try {
            setLoading(true);
            const response = await addBanner(values);
            if(response?.data?.success) {
                toast.success("Banner successfully uploaded");
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
                    <div className="modal-content w-full md:w-[420px] h-[80vh] overflow-auto bg-grey border border-lightblack rounded-[8px] text-white">
                        <div className="flex items-center  justify-between bg-primary text-black py-[12px] px-[16px]">
                            <h1 className="text-[16px] leading-[22px] font-[500]"> Banner </h1>
                            <MdClose className="text-[24px]" onClick={closeModal} />
                        </div>
                        <div className="w-full px-[24px] py-[24px]">
                            <Formik
                                initialValues={{ link: "" , duration: "", location: "", page: "",  picture: null }}
                                onSubmit={(values)=> createBanner(values)}
                            >
                                {()=> (
                                    <>
                                        <div className="mb-[24px]">
                                            <Field 
                                                name="link"
                                                label="Link *"
                                            />
                                        </div>

                                        <div className="mb-[24px]">
                                            <Select 
                                                name="duration"
                                                options={[7, 14, 30]}
                                                label="Duration *"
                                            />
                                        </div>
                                        <div className="mb-[24px]">
                                            <Select 
                                                name="location"
                                                options={["Left", "Right", "Top"]}
                                                label="Location *"
                                            />
                                        </div>
                                        <div className="mb-[24px]">
                                            <Select 
                                                name="page"
                                                options={[
                                                    { value: "/", title: "Escort"},
                                                    { value: "/escort-agencies", title: "Agency"},
                                                    { value: "/female-escorts", title: "Female"},
                                                    { value: "/male-escorts", title: "Male"},
                                                    { value: "/trans-escorts", title: "Trans"},
                                                    { value: "/pornstar-escorts", title: "Pornstar"},
                                                ]}
                                                label="Page *"
                                            />
                                        </div>

                                        <div className="mb-[24px]">
                                            <Image 
                                                name="picture"
                                            />
                                        </div>
                                        
                                        <Submit title="Submit" loading={loading} />
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

export default CreateBannerModal;