"use client";
import React, { useRef } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const Navbar = ({ open, setOpen }) => {

    const profileRef = useRef(null);
    useOutsideClick([profileRef], ()=> setOpen(false));
    return (
        <nav className="w-full bg-grey sticky top-0 z-[99] shadow">
            
        </nav>
    )
}

export default Navbar;