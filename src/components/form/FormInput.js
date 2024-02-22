import React, { useRef } from "react";

const FormInput = ({ 
    Icon,
    iconText,
    iconClick = () => null,
    handle_change, 
    label,
    name, 
    placeholder, 
    type = "text",
    value, 
    ...otherProps
}) => {
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
        <>
            {label && <label className="text-base font-Manrope" style={{color: "#484848"}}> { label } </label>}
            <div className={`input-box border border-[#66666659] p-2.5 px-3 rounded-xl flex items-center justify-between mt-1 gap-2`} style={{borderColor: "rgba(102, 102, 102, 0.35)"}} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur}>
                {/* {Icon && <Icon onClick={iconClick} />} */}
                <input 
                    className="text-base font-normal text-dark outline-none w-full"
                    name={name}
                    onChange={handle_change}
                    placeholder={placeholder}
                    type={type} 
                    value={value}
                    {...otherProps}
                />
                {Icon && !iconText && <Icon onClick={iconClick} />}
                { iconText && Icon && (
                    <div className="flex items-center gap-2 cursor-pointer" onClick={iconClick}>
                        <Icon />
                        <p className="uppercase"> { iconText } </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default FormInput;