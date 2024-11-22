import { useFormikContext } from "formik";
import React, { useRef } from "react";
import Error from "./Error";

const Select = ({
    label,
    name,
    options,
}) => {
    const inputRef = useRef(null);
    const { errors, touched, handleChange, values } = useFormikContext();

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
        <div className="form-group">
            { label && <label htmlFor={name} className="text-white text-[sm] font-[600]"> { label } </label> }
            <select 
                name={name} 
                id={name}
                className={`form-select w-full border border-lightblack py-[6px] px-[12px] mt-2 bg-grey`} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur}
                onChange={handleChange}
                value={values[name]}
            >
                <option> Choose </option>
                {options?.slice(0, options?.length).map((option, index) => (
                    <option value={option} key={index}> { option } </option>
                ))}
            </select>
            <Error error={errors[name]} visible={touched[name]} />
        </div>
    )
}


export default Select;