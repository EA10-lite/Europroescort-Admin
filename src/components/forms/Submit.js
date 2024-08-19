import React from "react";
import { useFormikContext } from "formik";
import { BiLoaderAlt } from "react-icons/bi";

const Submit = ({ Icon, title, loading, loadingText = "Submitting", type = "button", ...otherProps}) => {
    const { handleSubmit } = useFormikContext();
    return (
        <button 
            id="submit-btn"
            className={`w-full bg-primary text-black text-center text-sm font-[600] py-[12px] px-[24px] rounded-[4px] ${ loading ? "bg-opacity-60" : ""}`}
            type={type}
            disabled={loading}
            onClick={handleSubmit}
            {...otherProps}
        >
            { !loading ? (
                <div className="flex items-center gap-2 justify-center">
                    <span> { title } </span>
                    { Icon && <Icon /> }
                </div> 
            ) : (
                <div className="flex items-center gap-2 justify-center">
                    <BiLoaderAlt className="animate-spin h-5 w-5" />
                    <p className="text-sm font-[600]"> {loadingText} <span className="animate-ping h-2 w-2">...</span></p>
                </div>
            )}
        </button>
    )
}

export default Submit;