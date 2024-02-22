import React from "react";
import { useFormikContext } from "formik";

import FormErrorText from "./FromErrorText";

const FormTextArea = ({ Icon, label, name, placeholder, type, ...otherProps }) => {
    const { errors, handleChange, touched, values } = useFormikContext();
    return (
        <div className="form-group mb-5">
            { label && <label> { label } </label> }
            <div className="form-text-area">
                <textarea 
                    className="w-full bg-transparent px-4 py-4 border border-grey rounded-xl resize-none h-[128px]"
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={values[name]}
                    {...otherProps}
                />
            </div>

            <FormErrorText 
                error={errors[name]}
                visible={touched[name]}
            />
        </div>
    )
}

export default FormTextArea;