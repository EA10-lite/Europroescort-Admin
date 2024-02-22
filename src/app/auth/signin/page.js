"use client";
import { useState } from "react";
import { Formik } from "formik";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";
import FormField from "@/components/form/FormField";
import Toast from "@/components/Toast";

import { login_schema } from "@/utils/validation";
import { SubmitButton } from "@/components/form/FormButton";
import { login } from "@/services/apis";

const Signin = () => {
    const [isVisible, setIsVisible] = useState(false);

    const [redirectUrl, setRedirectUrl] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const signin = async (values) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setErrorMessage("");

        try {
            const response = await login(values)
            setSuccess(true);
            if(response?.data?.profile_completed) {
               setRedirectUrl("/profile");
            }
            else {
                setRedirectUrl("/completeprofile");
            }
        } catch (err) {
            setError(true);
            setErrorMessage(err?.response?.data || err?.response?.message || err?.message || "Failed to signin");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            { error && (
                <Toast 
                    message={errorMessage}
                    type="error"
                />
            )}
            { success && (
                <Toast 
                    message="Login Successful!"
                    type="success"
                    redirectUrl={redirectUrl}
                />
            )}
            <div className="signin w-full h-full">
                <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center w-full h-full bg-white p-[32px] rounded-lg">
                    <div className="form-heading mb-[40px]">
                        <h2 className="text-lg font-[600]"> Account Signin </h2>
                    </div>
                    <div className="auth-form mb-[20px] w-full mx-auto">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={(values) => signin(values)}
                            validationSchema={login_schema}
                        >
                            {()=> (
                                <div className="auth-form">
                                    <FormField 
                                        label="Email Address"
                                        name="email"
                                        placeholder="Enter your email address"
                                        type="email"
                                    />

                                    <FormField 
                                        Icon={isVisible ? FiEye : FiEyeOff}
                                        label="Password"
                                        name="password"
                                        placeholder="Enter your password"
                                        type={ isVisible ? "password" : "text" }
                                        handleIconClick={()=> setIsVisible(!isVisible)}
                                    />

                                    <div className="mt-[40px]">
                                        <SubmitButton 
                                            title="Signin"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>

                    <div className="">
                        <p className="text-center"> Don't have an account ? <Link href="/auth/signup" className="text-[blue] underline"> Create Account </Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;