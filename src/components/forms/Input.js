"use client";
import React, { useRef } from "react";

const Input = ({ name, type="text", iconText, handleIconClick, label, placeholder, value, handleChange, ...otherProps}) => {
    const inputRef = useRef(null);

    const handleFocus = () => {
        if (inputRef.current.classList.contains('active')) {
            return
        } else {
            inputRef.current.classList.add('active');
        }
    }

    const handleBlur = () => {
        inputRef.current.classList.remove("active");
    }

    return (
        <div className="">
            <label htmlFor={name} className="text-white text-sm font-[600]"> { label } </label>
            <div className="form-input border border-lightblack py-[6px] px-[24px] mt-2 flex items-center justify-between rounded-[6px]" ref={inputRef} onFocus={handleFocus} onBlur={handleBlur}>    
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    className="bg-[transparent] border-[none] outline-[none] w-full text-sm font-[400]"
                    {...otherProps}
                />

                { iconText && <button onClick={handleIconClick} className="border-[none] outline-[none] text-primary font-[500]"> { iconText} </button>}
            </div>
        </div>
    )
}

export default Input;