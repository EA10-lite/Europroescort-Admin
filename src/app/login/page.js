"use client";
import { useState } from "react";
import { Formik } from "formik";
import Field from "@/components/forms/Field";
import Submit from "@/components/forms/Submit";
import { login_schema } from "@/schema/auth";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const handleLogin = async (values) => {
        try {
            
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            <div className="bg-white shadow-xl w-[356px] p-[24px] border border-gray rounded-[16px]">
                <h1 className="text-[16px] font-[600] leading-[22.4px] mb-[24px]"> Sign in to continue </h1>

                <div className="login-form">
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values)=> handleLogin(values)}
                        validationSchema={login_schema}
                    >
                        {()=> (
                            <>
                                <div className="mb-[12px]">
                                    <Field 
                                        label="E-mail Address"
                                        name="email"
                                        type="email"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-[24px]">
                                    <Field 
                                        label="Password"
                                        name="password"
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>

                                <Submit title="Login" loading={loading} />
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Page;