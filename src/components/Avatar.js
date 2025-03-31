import React from "react";

const Avatar = ({ name, width, height}) => {
    return (
        <div className={`flex items-center justify-center rounded-full min-w-[${width ? width : '36px'}] h-[${height ? height : '36px'}] bg-grey border border-lightblack`}>
            <h4 className="text-primary font-[600] uppercase"> { name.slice(0,2)} </h4>
        </div>
    )
}

export default Avatar;