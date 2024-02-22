"use client";
import React from "react";
import { useFormikContext } from "formik";

import FormErrorText from "./FromErrorText";
import FormInput from "./FormInput";

const FormField = ({ Icon, iconText, handleIconClick, label, name, placeholder, type, ...otherProps }) => {
    const { errors, handleChange, touched, values } = useFormikContext();
    return (
        <div className="form-group mb-5">
            <FormInput 
                Icon={Icon}
                iconText={iconText}
                iconClick={handleIconClick}
                handle_change={handleChange}
                label={label}
                name={name}
                placeholder={placeholder}
                type={type}
                value={values[name]}
                {...otherProps}
            />

            <FormErrorText 
                error={errors[name]}
                visible={touched[name]}
            />
        </div>
    )
}

export default FormField;