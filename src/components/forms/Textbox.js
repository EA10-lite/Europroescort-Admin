import React, { useRef } from "react";
import { useFormikContext } from "formik";
import Error from "./Error";

const Textbox = ({ name, label, placeholder }) => {
    const { handleChange, values, errors, touched } = useFormikContext();

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
        <div className="form-group mb-[16px]">
            <label htmlFor={name} className="text-white"> { label } </label>
            <textarea 
                name={name}
                placeholder={placeholder}
                className="w-full border border-lightblack py-[10px] px-[24px] min-h-[80px] mt-2 bg-[transparent] resize-[none] outline-[none] text-white"
                ref={inputRef} onFocus={handleFocus} onBlur={handleBlur}
                value={values[name]}
                onChange={handleChange}
            />
            <Error error={errors[name]} visible={touched[name]} />
        </div>
    )
}

export default Textbox;