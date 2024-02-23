"use client";
import { useState, Suspense } from "react";
import { Formik } from "formik";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";
import FormField from "@/components/form/FormField";
import Toast from "@/components/Toast";
import { SubmitButton } from "@/components/form/FormButton";

import { resetpassword_schema } from "@/utils/validation";
import { useSearchParams } from "next/navigation";
import { reset_password } from "@/services/apis";

const ResetPassword = () => {
    const searchparams = useSearchParams();
    const code = searchparams.get("code");
    const email = searchparams.get("email");

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const resetPassword = async (values) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setErrorMessage("");
        try {
            await reset_password(values, { email, code });
            setSuccess(true);
        } catch (err) {
            console.log(err);
            setError(true);
            setErrorMessage(err?.response?.data || err?.response?.message || err?.message || "Failed to reset your password!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Suspense>
            { error && (
                <Toast 
                    message={errorMessage}
                    type="error"
                />
            )}
            { success && (
                <Toast 
                    message="Password Reset Successful!"
                    type="success"
                    redirectUrl="/auth/signin"
                />
            )}

            <div className="signin w-full h-full">
                <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center w-full h-full bg-white p-[32px] rounded-lg">
                    <div className="logo mb-[40px]">
                        <Link href="/" className="font-[600] text-base text-left">
                            <span> Europroescort </span>
                        </Link>
                    </div>
                    <div className="auth-form mb-[40px] w-full mx-auto">
                        <Formik
                            initialValues={{ password: "", confirmpassword: ""}}
                            onSubmit={(values) => resetPassword(values)}
                            validationSchema={resetpassword_schema}
                        >
                            {()=> (
                                <div className="auth-form">
                                    <FormField 
                                        Icon={isVisible ? FiEye : FiEyeOff}
                                        label="Password"
                                        name="password"
                                        placeholder="Enter your password"
                                        type={ isVisible ? "password" : "text" }
                                        handleIconClick={()=> setIsVisible(!isVisible)}
                                    />
                                    
                                    <FormField 
                                        Icon={isVisible2 ? FiEye : FiEyeOff}
                                        label="Re-type Password"
                                        name="confirmpassword"
                                        placeholder="Enter your password"
                                        type={ isVisible2 ? "password" : "text" }
                                        handleIconClick={()=> setIsVisible2(!isVisible2)}
                                    />

                                    <div className="mt-[40px]">
                                        <SubmitButton 
                                            title="Reset Password"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>

                    <div className="">
                        <p className="text-center"> Remember Password ? <Link href="/auth/signin" className="text-[blue] underline"> Back to signin</Link></p>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ResetPassword;