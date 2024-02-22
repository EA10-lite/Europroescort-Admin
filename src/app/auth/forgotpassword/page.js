"use client";
import { use, useState } from "react";
import { Formik } from "formik";
import Link from "next/link";
import FormField from "@/components/form/FormField";

import { forgotpassword_schema } from "@/utils/validation";
import { SubmitButton } from "@/components/form/FormButton";
import { forgot_password } from "@/services/apis";
import Toast from "@/components/Toast";

const ForgotPassword = () => {

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const forgotPassword = async (values) => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        try {
            await forgot_password(values);
            setEmailSubmitted(true);
        } catch (err) {
            setError(true);
            setErrorMessage(err?.response?.data || err?.response?.message || err?.message || "Failed to send password reset mail!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            { error && (
                <Toast 
                    type="error"
                    message={errorMessage}
                />
            )}
            <div className="signin w-full h-full">
                <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center w-full h-full bg-white p-[32px] rounded-lg">
                    <div className="logo mb-[24px] w-full">
                        <h2  className="text-lg font-[600] text-left w-full"> Forgot Password </h2>
                    </div>
                    { !emailSubmitted ? (
                        <div className="auth-form mb-[40px] w-full mx-auto">
                            <Formik
                                initialValues={{ email: "" }}
                                onSubmit={(values) => forgotPassword(values)}
                                validationSchema={forgotpassword_schema}
                            >
                                {()=> (
                                    <div className="auth-form">
                                        <FormField 
                                            label="Email Address"
                                            name="email"
                                            placeholder="Enter your email address"
                                            type="email"
                                        />

                                        <div className="mt-[40px]">
                                            <SubmitButton 
                                                title="Submit"
                                                loading={loading}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    ) : (
                        <div className="">
                            <p> A verification mail has been sent to your email to reset your password. Please click the link to reset your password.</p>
                        </div>
                    )}

                    { !emailSubmitted && <div className="">
                        <p className="text-center"> Remember Password ? <Link href="/auth/signin" className="text-[blue] underline"> Back to signin</Link></p>
                    </div> }
                </div>

            </div>
        </>
    )
}

export default ForgotPassword;