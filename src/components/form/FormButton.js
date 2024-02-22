import React from "react";
import { useFormikContext } from "formik";
import { BiLoaderAlt } from "react-icons/bi";

export const SubmitButton = ({ Icon, title, loading, loadingText = "Submitting", type = "button"}) => {
    const { handleSubmit } = useFormikContext();
    return (
        <button 
            id="submit-btn"
            className={`w-full bg-primary text-white font-Manrope text-xl py-3 btn ${ loading ? "bg-opacity-60" : ""}`}
            style={{borderRadius: "32px"}}
            type={type}
            disabled={loading}
            onClick={handleSubmit}
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