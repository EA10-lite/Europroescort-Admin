"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"

import { BsSearch } from "react-icons/bs";
import GoogleTranslate from "./GoogleTranslate";

const Navbar = () => {
    const isLoggedIn = false;
    const pathname = usePathname();

    return (
        <nav className="navbar w-full sticky top-0 bg-dark text-white border-b border-grey border-opacity-50 z-[99]">
            <div className="container mx-auto px-4 lg:px-8 py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 flex-[0.25]">
                        <div className="navbar-logo">
                            <h4> Europroescort </h4>
                        </div>

                        <div className="navbar-search hidden">
                            <form className="search-form">
                                <div className="search-input flex items-center gap-2 border border-grey px-4 py-2 rounded">
                                    <BsSearch />
                                    <input 
                                        type="text" 
                                        name="search" 
                                        placeholder="search escorts"
                                        className="w-full border-0 outline-0 text-sm bg-transparent hidden xl:inline-flex" 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="navbar-links flex-[0.5]">
                        <ul className="hidden xl:flex items-center justify-center gap-2">
                            <li className={`navbar-link  px-4 py-2 text-sm font-[600] transition-all delay-150 hover:bg-primary ${ pathname === "/" ? "border border-primary text-primary rounded-[4px] " : ""}`}>
                                <Link href="/">
                                    <span> Escorts </span>
                                </Link>
                            </li>
                            <li className={`navbar-link  px-4 py-2 text-sm font-[600] transition-all delay-150 hover:bg-primary ${ pathname === "/agencies" ? "border border-primary text-primary rounded-[4px] " : ""}`}>
                                <Link href="/">
                                    <span> Agencies </span>
                                </Link>
                            </li>
                            <li className={`navbar-link  px-4 py-2 text-sm font-[600] transition-all delay-150 hover:bg-primary ${ pathname === "/escorts" ? "border border-primary text-primary rounded-[4px] " : ""}`}>
                                <Link href="/">
                                    <span> Pornstars </span>
                                </Link>
                            </li>
                            <li className={`navbar-link  px-4 py-2 text-sm font-[600] transition-all delay-150 hover:bg-primary ${ pathname === "/escorts/live" ? "border border-primary text-primary rounded-[4px] " : ""}`}>
                                <Link href="/">
                                    <span> Sex Live </span>
                                </Link>
                            </li>
                            <li className={`navbar-link  px-4 py-2 text-sm font-[600] transition-all delay-150 hover:bg-primary ${ pathname === "/escorts/live" ? "border border-primary text-primary rounded-[4px] " : ""}`}>
                                <Link href="/advertisement">
                                    <span> Post AD </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-profile flex-[0.25] flex items-center gap-2.5 justify-end">
                        <GoogleTranslate />

                        { isLoggedIn ? ( 
                            <div className="flex items-center justify-between gap-4 rounded-[133.333px] border border-grey px-2 py-1.5 w-[180px]">
                                <h4 className="username font-bold whitespace-nowrap"> Lizzy Smith </h4>
                                <Image 
                                    src={"/assets/profile-5.jpg"} 
                                    alt="Chris sutton" 
                                    height={36}
                                    width={36}
                                    priority
                                    className="rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="btn-signup ml-8 hidden md:block">
                                <Link href="/auth/signup" className={` ${ pathname === "/auth/signup" ? "bg-primary" : "border border-primary"} text-white rounded-[133.333px] px-6 py-2 whitespace-nowrap hover:bg-primary transition-all delay-150`}>
                                    <span> Join Europroescort </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;