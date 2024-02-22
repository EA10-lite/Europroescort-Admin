"use client";
import { useState } from "react";
import { Formik } from "formik";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormField from "@/components/form/FormField";
import Toast from "@/components/Toast";
import { SubmitButton } from "@/components/form/FormButton";

import { agency_signup_schema } from "@/utils/validation";
import { signup_agency } from "@/services/apis";

const AgencySignup = () => {
    const [isVisible, setIsVisible] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const signup = async (values) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setErrorMessage("");

        try {
            await signup_agency(values);
            setSuccess(true);
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
                    message="Agency Account created successful!"
                    type="success"
                    redirectUrl="/completeprofile"
                />
            )}
            <div className="signin w-full h-full">
                <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center w-full h-full bg-white p-[32px] rounded-lg">
                    <div className="form-heading mb-[40px] w-full">
                        <h2 className="text-lg font-[600]"> Create Agency Account </h2>
                    </div>
                    <div className="auth-form mb-[40px] w-full mx-auto">
                        <Formik
                            initialValues={{ brand_name: "", email: "", password: "", terms_agreement: false }}
                            onSubmit={(values) => signup(values)}
                            validationSchema={agency_signup_schema}
                        >
                            {()=> (
                                <div className="auth-form">
                                    <FormField 
                                        label="Agency Name"
                                        name="brand_name"
                                        placeholder="Enter your Brand Name"
                                        type="text"
                                    />

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
                                    
                                    <FormCheckbox 
                                        label="Agree to Terms & Conditions"
                                        name="terms_agreement"
                                        id="terms_agreement"
                                    />

                                    <div className="mt-[40px]">
                                        <SubmitButton 
                                            title="Create Agency Account"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>

                    <div className="mb-[24px]">
                        <p className="text-center"> Already have an account? <Link href="/auth/signin" className="text-[blue] underline"> Signin. </Link></p>
                    </div>

                    <div className="text-center w-full mb-[24px]">
                        <div className="divider mb-[24px]">
                            <span> OR </span>
                        </div>

                        <Link href="/auth/escortsignup" className="block w-full border border-grey border-opacity-60 rounded-[133.33px] text-sm font-[600] hover:bg-primary hover:text-white text-opacity-60 transition-all delay-150 mb-4 py-[10px]"> Create Escort Account </Link>

                        <Link href="/auth/signup" className="block w-full border border-grey border-opacity-60 rounded-[133.33px] text-sm font-[600] hover:bg-primary hover:text-white text-opacity-60 transition-all delay-150 py-[10px]"> Create Member Account </Link>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-[600]"> By creating an account, you agree to Europroescort
                            <Link href="terms-conditions" className="underline text-[blue]"> <span> conditions of use </span> </Link> and<Link href="privacy-policy" className="underline text-[blue]"> <span> Privacy Policy </span> </Link> 
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencySignup;