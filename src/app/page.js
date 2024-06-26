"use client";
import { useContext, useState } from "react";
import { Formik } from "formik";
import Field from "@/components/forms/Field";
import Submit from "@/components/forms/Submit";
import { login_schema } from "@/schema/auth";
import { adminLogin } from "@/services/auth";
import toast from "react-hot-toast";
import { UserContext } from "@/context/AdminContext";

const Page = () => {
    const { login } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        try {
            setLoading(true);
            const response = await adminLogin(values);
            if(response?.data?.success) {
                toast.success("Login successful");
                login(response?.data?.result);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something failed - please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-[100vh] w-full flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-grey text-white shadow-xl w-[356px] p-[24px] border border-lightblack rounded-[16px]">
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