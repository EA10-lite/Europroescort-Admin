"use client";
import React from "react";
import { useFormikContext } from "formik";

import Error from "./Error";
import Input from "./Input";

const Field = ({ iconText, handleIconClick, label, name, placeholder, type, ...otherProps }) => {
    const { errors, handleChange, touched, values } = useFormikContext();
    return (
        <div className="form-group">
            <Input 
                handleChange={handleChange}
                label={label}
                name={name}
                placeholder={placeholder}
                type={type}
                value={values[name]}
                iconText={iconText}
                handleIconClick={handleIconClick}
                {...otherProps}
            />

            <Error 
                error={errors[name]}
                visible={touched[name]}
            />
        </div>
    )
}

export default Field;