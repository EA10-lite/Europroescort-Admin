"use client"
import React, { useState } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import "../app/globals.css";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    const pathname = usePathname();
    const isAuthPage = pathname.includes("/login");

    const [open, setOpen] = useState(true);

    return (
        <div className="w-full h-full overflow-auto flex bg-black">
            { open && !isAuthPage && <div className="w-[20%] relative">
                <Sidebar />
            </div> }

            <main className={`${ open && !isAuthPage ? "w-[80%]" : "w-full"} h-full bg-opacity-10 overflow-auto`}>
                { !isAuthPage && <Navbar 
                    open={open} 
                    setOpen={setOpen} 
                
                /> }
                <div className="px-4">
                    { children }
                </div>
            </main>
        </div>
    )
}

export default Layout;