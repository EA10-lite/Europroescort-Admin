"use client"
import React from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import "../app/globals.css";

const Layout = ({ children }) => {
    const pathname = usePathname();
    const isAuthPage = pathname === "/";

    return (
        <div className="w-full h-full overflow-auto bg-black text-white">
            { !isAuthPage && <Navbar /> }

            <main className={`w-full h-full ${ !isAuthPage ? "mt-[40px]" : "mt-0"}`}>
                { children }
            </main>
        </div>
    )
}

export default Layout;