import React from "react";
import { useFormikContext } from "formik";
import FormErrorText from "./FromErrorText";

const FormCheckbox = ({ name, label, id }) => {
    const { handleChange, errors, touched } = useFormikContext();
    return (
        <div className="form-field mt-[20px]">
            <div className="form-checkbox">
                <input 
                    type="checkbox" 
                    name={name} 
                    id={id} 
                    className=""
                    onChange={handleChange}
                />
                <label htmlFor={id}> { label } </label>
            </div>
            <FormErrorText error={errors[name]} visible={touched[name]} />
        </div>
    )
}

export default FormCheckbox;