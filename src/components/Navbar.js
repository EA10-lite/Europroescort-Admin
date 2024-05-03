"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BiUser } from "react-icons/bi";
import { MdLogout, MdOutlineKeyboardArrowDown, MdOutlineSettings} from "react-icons/md";

import useOutsideClick from "@/hooks/useOutsideClick";


const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const profileRef = useRef(null);
    useOutsideClick([profileRef], ()=> setOpen(false));
    return (
        <nav className="w-full bg-black border-b border-lightblack text-white sticky top-0">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex items-center gap-16">
                    <div className="nav-logo">
                        <h4 className="text-lg font-[600]"> Europroescort </h4>
                    </div>

                    <ul className="nav-links flex items-center gap-8">
                        <li className="nav-link">
                            <Link href="/escorts" className={`font-[500] text-sm leading-[19px] py-4 inline-flex ${ pathname.includes("/escorts") ? "border-b border-primary text-primary opacity-100" : "opacity-60"}`}>
                                <span> Escorts </span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link href="/agencies" className={`font-[500] text-sm leading-[19px] py-4 inline-flex ${ pathname.includes("/agencies") ? "border-b border-primary text-primary opacity-100" : "opacity-60"}`}>
                                <span> Agencies </span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link href="/blacklists" className={`font-[500] text-sm leading-[19px] py-4 inline-flex ${ pathname.includes("/blacklits") ? "border-b border-primary text-primary opacity-100" : "opacity-60"}`}>
                                <span> Blacklists </span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link href="/reports" className={`font-[500] text-sm leading-[19px] py-4 inline-flex ${ pathname.includes("/reports") ? "border-b border-primary text-primary opacity-100" : "opacity-60"}`}>
                                <span> Reports </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="border-l border-gray px-4">
                    <div className="nav-profile-dropdown relative" ref={profileRef}>
                        <div className="profile-dropdown-header w-[225px] flex justify-end">
                            <div className="flex items-center gap-2 opacity-60 cursor-pointer" onClick={()=> setOpen(!open)}>
                                <BiUser className="text-[22px] leading-[36px]" />
                                <h4 className="text-base font-[500] leading-[22px]"> Europroescort Admin </h4>
                                <MdOutlineKeyboardArrowDown className="text-[18px] leading-[24px]" />
                            </div>
                        </div>

                        <div className={`profile-dropdown-body absolute bg-grey shadow-lg border border-lightblack w-[225px] right-0 top-[28px] rounded-[4px] p-[4px] ${ open ? "block" : "hidden"}`}>
                            <ul className="p-1">
                                <li className="flex items-center gap-2 cursor-pointer bg-primary px-[4px] py-[6px] rounded-[4px] mb-2">
                                    <div className="flex items-center justify-center bg-grey rounded-[8px] w-[28px] h-[28px]">
                                        <BiUser className="text-[16px] leading-[18px]" />
                                    </div>
                                    <h4 className="text-sm font-[500] leading-[18px] text-black"> Admin </h4>
                                </li>

                                <li className="border-t border-gray pt-2">
                                    <div className="cursor-pointer flex items-center gap-2 hover:bg-lightblack px-[8px] py-[10px] rounded-[4px] hover:bg-opacity-60 opacity-60">
                                        <MdOutlineSettings className="text-base" />
                                        <span className="text-sm font-[400]"> Account settings </span>
                                    </div>
                                </li>
                                <li className="">
                                    <div className="cursor-pointer flex items-center gap-2 hover:bg-lightblack px-[8px] py-[10px] rounded-[4px] hover:bg-opacity-60 opacity-60">
                                        <MdLogout className="text-base" />
                                        <span className="text-sm font-[400]"> Sign Out </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;