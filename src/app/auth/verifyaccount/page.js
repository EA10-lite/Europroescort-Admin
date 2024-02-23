"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { BiLoaderAlt } from "react-icons/bi";
import Toast from "@/components/Toast";

import { verify_account } from "@/services/apis";

const VerifyAccount = () => {
    const searchparams = useSearchParams();
    const code = searchparams.get("code");
    const email = searchparams.get("email");


    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const verifyAccount = async () => {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        try {
            await verify_account({ code, email });
        } catch (err) {
            setError(true);
            setErrorMessage(err?.response?.data || err?.response?.message || err?.message || "Failed to verify your account!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        verifyAccount();
    },[code, email])

    return (
        <Suspense>
            { error && (
                <Toast 
                    type="error"
                    message={errorMessage}
                />
            )}
            <div className="signin w-full h-full">
                <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center w-full h-full bg-white p-[32px] rounded-lg">
                    <div className="logo mb-[24px] w-full">
                        <h2  className="text-lg font-[600] text-left w-full"> Email Verification </h2>
                    </div>

                    { loading ? (<div className="">
                        <div className="">
                            <BiLoaderAlt className="h-8 w-8 animate-spin" />
                        </div>
                        <p> We are trying to verify your email, this may take a while! </p>
                    </div>) : (
                        <div className="email-verified">
                            <p> Thank you for Joining <b> Europroescort </b>, click the link to setup your profile.</p>
                            <Link href="/completeprofile"> Proceed to complete profile </Link>
                        </div>
                    )}

                    { error && <div className="email-verification-failed">
                        <p> Failed to verify your account please click the link below to verify your account  </p>
                    </div>}
                </div>

            </div>
        </Suspense>
    )
}

export default VerifyAccount;