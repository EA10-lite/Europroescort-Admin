"use client";
import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { BiPlus } from "react-icons/bi";

import Error from "./Error";

const Image = ({ name }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const inputRef = useRef();
    const handleClick = () => inputRef.current.click();

    function isString(variable) {
        return typeof variable === 'string';
    }

    const handleChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFieldValue(name, base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => { resolve(fileReader.result); };
            fileReader.onerror = (error) => { reject(error); };
        });
    };

    return (
        <div className="image-input">
            { values[name] ? (
                <div className="">
                    <img src={isString(values[name]) ? values[name] : URL.createObjectURL(values[name])} alt="" className="w-[188px] h-[227px] object-cover" />
                </div>
            ) : <div className="image-preview border border-lightblack bg-[#151515] flex items-center justify-center w-[188px] h-[227px] mb-[28px]">
                <button onClick={handleClick} className="bg-[#252525] w-[48px] h-[48px] flex items-center justify-center">
                    <BiPlus size="24" color="#fff" />
                </button>
            </div> }

            <div className="image-btn">
                <input 
                    type="file" 
                    name={name} 
                    id={name} 
                    className="w-[0] h-[0]" ref={inputRef} 
                    accept=".jpg, .jpeg, .png, .mp4"
                    onChange={(e)=> handleChange(e)}
                />
                <div className="flex items-center justify-between">
                    <label htmlFor={name} className="bg-grey text-base leading-[19px] font-[500] p-[10px] text-white max-w-[180px] border border-lightblack"> Browse </label>
                </div>
            </div>

            <Error 
                error={errors[name]}
                visible={touched[name]}
            />
        </div>
    )
}

export default Image;