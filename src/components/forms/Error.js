import React from "react";

const Error = ({ error, visible }) => {
    if(!visible) return null

    return (
        <p className="text-sm text-[#e63946] font-ManropeBold ml-3"> { error } </p>
    )
}

export default Error;