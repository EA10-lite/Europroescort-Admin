"use client";
import { useState } from "react";
import { Formik } from "formik";

import FormField from "@/components/form/FormField";
import FormTextArea from "@/components/form/FormTextArea";
import { SubmitButton } from "@/components/form/FormButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdAddLink } from "react-icons/md";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";

import { img_urls_schema, profile_schema } from "@/utils/validation";

const CompleteProfile = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [profile, setProfile] = useState({

    });

    const savePersonalInfo = () => {
        setCurrentStep(2);
    }

    const saveImageAndUrls = () => {
        setCurrentStep(3);
    }

    const saveServices = () => {

    }

    const completeProfileSetup = () => {

    }

    return (
        <div className="complete-profile w-full max-w-[1024px] mx-auto relative">
            <div className="container relative">
                <div className="heading mb-[60px]">
                    <div className="flex items-center cursor-pointer gap-4 mb-3 text-white transition-all delay-150 hover:opacity-100">
                        <FaArrowLeftLong />
                        <div className="text-base font-[600]"> Go Back </div>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white"> Complete Profile Setup </h2>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-24 relative">
                    <div className="steps sticky top-[12px]">
                        <ul className="steps-item flex flex-row lg:flex-col gap-8 justify-between">
                            <li className="step-item flex items-center gap-4">
                                <div className={`step-count w-[48px] h-[48px] flex items-center justify-center rounded-full border ${ currentStep === 1 ? "bg-primary text-white border-white" : "text-grey border-grey"}`}> 1 </div>
                                <h4 className={`text-lg font-[600] hidden md:inline-flex ${ currentStep === 1 ? "text-primary" : "text-white opacity-60"}`}> Personal Info </h4>
                            </li>
                            <li className="step-item flex items-center gap-4">
                                <div className={`step-count w-[48px] h-[48px] flex items-center justify-center rounded-full border ${ currentStep === 2 ? "bg-primary text-white border-white" : "text-grey border-grey"}`}> 2 </div>
                                <h4 className={`text-lg font-[600] hidden md:inline-flex ${ currentStep === 2 ? "text-primary" : "text-white opacity-60"}`}> URLs & Images </h4>
                            </li>
                            <li className="step-item flex items-center gap-4">
                                <div className={`step-count w-[48px] h-[48px] flex items-center justify-center rounded-full border ${ currentStep === 3 ? "bg-primary text-white border-white" : "text-grey border-grey"}`}> 3 </div>
                                <h4 className={`text-lg font-[600] hidden md:inline-flex ${ currentStep === 3 ? "text-primary" : "text-white opacity-60"}`}> Stats </h4>
                            </li>
                        </ul>
                    </div>

                    <div className="profile-sections mt-2.5 grow">
                        { currentStep === 1 && (
                            <div className="personal-info">
                                <div className="personal-info-section">
                                    <Formik
                                        initialValues={{
                                            firstname: "",
                                            lastname: "",
                                            country: "",
                                            state: "",
                                            bio: "",
                                        }}
                                        onSubmit={(values) => savePersonalInfo(values)}
                                        validationSchema={profile_schema}
                                    >
                                        {()=> (
                                            <div className="personal-info-form">
                                                <div className="personal-info">
                                                    <h4 className="text-white mb-4 text-lg font-bold"> Personal Information </h4>
                                                    <div className="flex gap-4">
                                                        <FormField 
                                                            name="firstname"
                                                            type="text"
                                                            label="First Name"
                                                            placeholder="Enter your First Name"
                                                        />
                                                        
                                                        <FormField 
                                                            name="lastname"
                                                            type="text"
                                                            label="Last Name"
                                                            placeholder="Enter your last Name"
                                                        />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <FormField 
                                                            name="country"
                                                            type="text"
                                                            label="Country"
                                                        />
                                                        
                                                        <FormField 
                                                            name="state"
                                                            type="text"
                                                            label="State"
                                                        />
                                                    </div>

                                                    <FormTextArea 
                                                        name="bio" 
                                                        label="About Me" 
                                                        placeholder="write a little something about yourself" 
                                                    />
                                                </div>

                                                <div className="footer flex items-center justify-end w-full mt-4">
                                                    <SubmitButton title="Next" />
                                                </div>
                                            </div>  
                                        )}
                                    </Formik>
                                </div>

                            </div>
                        )}
                        { currentStep === 2 && (
                            <div className="personal-info">
                                <div className="personal-info-section">
                                    <Formik
                                        initialValues={{
                                            website: "",
                                            facebook: "",
                                            twitter: "",
                                            instagram: "",
                                        }}
                                        onSubmit={(values) => saveImageAndUrls(values)}
                                        validationSchema={img_urls_schema}
                                    >
                                        {()=> (
                                            <div className="urls-img-form">
                                                <div className="img mb-8">
                                                    <h4 className="text-white mb-4 text-lg font-bold"> Upload coverphoto for your profile </h4>

                                                    <div className="img-box text-white cursor-pointer transition-all delay-150 hover:bg-white hover:bg-opacity-80 hover:text-black rounded-lg border border-grey w-full h-[198px] flex items-center justify-center">
                                                        <label className="cursor-pointer text-center text-lg font-bold flex flex-col items-center gap-1" htmlFor="coverphoto">
                                                            <IoCloudUploadOutline className="text-4xl" />
                                                            <span>Click to Upload coverphoto</span> 
                                                        </label>
                                                        <input id="coverphoto" name="coverphoto" type="file" className="w-0 h-0" />
                                                    </div>

                                                </div>

                                                <div className="urls">
                                                    <h4 className="text-lg text-white font-bold mb-4"> Personal Links & Urls </h4>


                                                    <div className="flex gap-4">
                                                        <FormField 
                                                            name="website"
                                                            label="Personal Website Url"
                                                            placeholder="www.europorescort.com"
                                                            Icon={MdAddLink}
                                                        />

                                                        <FormField 
                                                            name="facebook"
                                                            label="Facebook URL"
                                                            placeholder="www.facebook.com"
                                                            Icon={BsFacebook}
                                                        />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <FormField 
                                                            name="twitter"
                                                            label="Twitter URL"
                                                            placeholder="www.twitter.com"
                                                            Icon={BsTwitter}
                                                        />

                                                        <FormField 
                                                            name="instagram"
                                                            label="Instagram URL"
                                                            placeholder="www.instagram.com"
                                                            Icon={BsInstagram}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="footer flex items-center justify-between w-full mt-4">
                                                    <button className="border border-primary text-white rounded-[133.333px] w-[165px] px-[24px] py-[10px] text-base font-[600] transition-all delay-150 hover:bg-primary" onClick={()=> setCurrentStep(1)}>
                                                        <span> Back </span>
                                                    </button>

                                                    <SubmitButton title="Next" />
                                                </div>
                                            </div>
                                        )}
                                    </Formik>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile;