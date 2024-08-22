"use client"
import { useContext, useState } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";

import Submit from "@/components/forms/Submit";
import Field from "@/components/forms/Field";
import { BsTrash } from "react-icons/bs";

import { change_password_schema, update_profile_schema } from "../../schema/profile";
import { UserContext } from "@/context/AdminContext";
import { updateAdminPassword, updateAdminProfile } from "@/services/admin";

const Page = () => {
    const { user } = useContext(UserContext);

    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const changePassword = async (values) => {
        try {
            setLoading(true);
            const response = await updateAdminPassword(values);
            if(response?.data?.success) {
                toast.success("Admin Password updated!");
                setOpenPasswordModal(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.data?.message || error?.message || "Failed to update password!");
        } finally {
            setLoading(false);
        }
    }

    const [updating, setUpdating] = useState(false);
    const updateProfile = async (values) => {
        try {
            setUpdating(true);
            const response = await updateAdminProfile(values);
            if(response?.data?.success) {
                toast.success("Admin Profile updated!");
                setOpenInfoModal(false);
                window.location.reload();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.data?.message || error?.message || "Failed to update profile!");
        } finally {
            setUpdating(false);
        }
    }

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    return (
        <div className="settings text-white py-[80px] px-[40px]">
            <div className="flex gap-4 justify-between bg-gray px-[40px] py-[24px]">
                <div className="settings-header flex-[0.3] border-r border-grey">
                    <h2 className="text-[22px] leading-[28px] font-[500]"> Settings </h2>
                </div>
                <div className="settings-body flex-[0.67]">
                    <div className="profile-settings-form">
                        <div className="settings-field pb-4 mb-4 border-b border-grey">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="border border-grey rounded-full">
                                    <img src={user?.profile_picture || user?.admin?.profile_picture} alt={user?.name || user?.admin?.name} className="w-[100px] h-[100px] rounded-full object-cover" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="bg-grey px-[12px] py-[8px] border-grey border flex items-center justify-center">
                                        <BsTrash size={22} color="white" />
                                    </button>

                                    <button className="bg-grey px-[12px] py-[8px] text-base font-[500] text-white w-[88px] border-grey border">
                                        <span> Upload </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="settings-field pb-4 mb-4 border-b border-grey">
                            <h4 className="text-[18px] font-[500] text-primary mb-2"> Personal Info </h4>
                            
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="">
                                    <p className="text-base font-[500] text-opacity-25 mb-2"> <b> Name: </b> { user?.name || user?.admin?.name } </p>
                                    <p className="text-base font-[500] text-opacity-25"> <b> Email: </b> { user?.email || user?.admin?.email } </p>
                                </div>
                                <button 
                                    className="bg-grey px-[12px] py-[8px] text-base font-[500] text-white w-[88px] border-grey border"
                                    onClick={()=> setOpenInfoModal(!openInfoModal)}
                                >
                                    <span> { !openInfoModal ? "Edit" : "Cancel" } </span>
                                </button>
                            </div>

                            { openInfoModal && (
                                <div className="mt-[32px] max-w-[420px]">
                                    <Formik
                                        initialValues={{ name: user?.name || user?.admin?.name, email: user?.email || user?.admin?.email }}
                                        onSubmit={(values) => updateProfile(values)}
                                        validationSchema={update_profile_schema}
                                    >
                                        {() => (
                                            <>
                                                <div className="mb-[24px]">
                                                    <Field 
                                                        name="name"
                                                        type="text"
                                                        placeholder="Name"
                                                        disabled={updating}
                                                    />
                                                </div>

                                                <div className="mb-[24px]">
                                                    <Field 
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        disabled={updating}
                                                    />
                                                </div>

                                                <Submit loading={updating} title="Update" />
                                            </>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </div>

                        <div className="settings-field pb-4">
                            <h4 className="text-[18px] font-[500] text-primary mb-2"> Password </h4>
                            
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="">
                                    <p className="text-base font-[500] text-opacity-25"> Manage your passwords </p>       
                                </div>
                                <button 
                                    className="bg-grey px-[12px] py-[8px] text-base font-[500] text-white w-[88px] border-grey border"
                                    onClick={()=> setOpenPasswordModal(!openPasswordModal)}
                                >
                                    <span> { openPasswordModal ? "Cancel" : "Edit" } </span>
                                </button>
                            </div>

                            { openPasswordModal && (
                                <div className="mt-[32px] max-w-[420px]">
                                    <Formik
                                        initialValues={{ oldpassword: "", password: "" }}
                                        onSubmit={(values) => changePassword(values)}
                                        validationSchema={change_password_schema}
                                    >
                                        {() => (
                                            <>
                                                <div className="mb-[24px]">
                                                    <Field 
                                                        name="oldpassword"
                                                        placeholder="Enter your old password"
                                                        disabled={loading}
                                                        type={isVisible ? "text" : "password"}
                                                        iconText={isVisible ? "Hide" : "Show"}
                                                        handleIconClick={()=> setIsVisible(!isVisible)}
                                                    />
                                                </div>

                                                <div className="mb-[24px]">
                                                    <Field 
                                                        name="password"
                                                        placeholder="Enter your new password"
                                                        disabled={loading}
                                                        type={isVisible2 ? "text" : "password"}
                                                        iconText={isVisible2 ? "Hide" : "Show"}
                                                        handleIconClick={()=> setIsVisible2(!isVisible2)}
                                                    />
                                                </div>

                                                <Submit loading={loading} title="Change Password" />
                                            </>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;