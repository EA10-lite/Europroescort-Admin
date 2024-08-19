"use client";
import React, { useContext, useRef, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";

import Field from "@/components/forms/Field";
import Submit from "@/components/forms/Submit";

import { login_schema } from "@/schema/auth";

import { adminLogin } from "@/services/auth";
import { UserContext } from "@/context/AdminContext";

const LoginModal = () => {
    const { login } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await adminLogin(values);
            if(response?.data?.success){
                toast.success("Login successful");
                login(response?.data?.result);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.message || error?.message || "Failed to login user");
        } finally {
            setLoading(false);
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="login">
            <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80 z-[99]">
                <div className="flex items-center justify-center w-full h-full relative">
                    <div className="modal-content w-full h-full md:h-[fit-content] md:max-w-[480px] p-[40px] bg-grey rounded-[6px] border border-lightblack relative">
                        <h4 className="text-center font-[500] text-white text-[24px] leading-[39px]"> Login </h4>

                        <div className="mt-[24px]">
                            <div className="login-form w-[95%] mx-auto">
                                <Formik
                                    initialValues={{ email: "", password: ""}}
                                    onSubmit={(values)=> handleSubmit(values)}
                                    validationSchema={login_schema}
                                >
                                    {()=> (
                                        <>
                                            <div className="mb-5">
                                                <Field 
                                                    name="email"
                                                    label="Email Address"
                                                    placeholder="Email Address"
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="mb-8">
                                                <Field 
                                                    name="password" 
                                                    type={isVisible ? "text" : "password"}
                                                    label="Password"
                                                    placeholder="Password"
                                                    iconText={isVisible ? "Hide" : "Show"}
                                                    handleIconClick={()=> setIsVisible(!isVisible)}
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="">
                                                <Submit title="Continue" loading={loading} />
                                            </div>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;