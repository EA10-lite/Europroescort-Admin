import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPayment, MdWarningAmber, MdOutlineSettings, MdOutlineDashboardCustomize  } from "react-icons/md";
import { TbGenderDemigirl } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="h-full shadow-md fixed w-[20%] top-0 bg-gray overflow-auto">
            <div className="px-8 py-4 w-full">
               <img src="/assets/mce-logo.svg" alt="MCEscorts" />
            </div>
            <div className="px-4 py-6">
                <ul className="flex flex-col gap-4">
                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname === "/" ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/" className="flex items-center gap-3 w-full font-[600]">
                            <MdOutlineDashboardCustomize className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Dashboard </span>
                        </Link>
                    </li>

                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/escorts") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/escorts" className="flex items-center gap-3 w-full font-[600]">
                            <TbGenderDemigirl className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Escorts </span>
                        </Link>
                    </li>

                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/agencies") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/agencies" className="flex items-center gap-3 w-full font-[600]">
                            <FaUsers className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Agencies </span>
                        </Link>
                    </li>

                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/subscriptions") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/subscriptions" className="flex items-center gap-3 w-full font-[600]">
                            <MdPayment className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Subscriptions </span>
                        </Link>
                    </li>

                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/banners") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/banners" className="flex items-center gap-3 w-full font-[600]">
                            <MdPayment className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Banners </span>
                        </Link>
                    </li>
                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/verification") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/verification" className="flex items-center gap-3 w-full font-[600]">
                            <IoMdCheckmarkCircleOutline className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Verification </span>
                        </Link>
                    </li>
                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/reports") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/reports" className="flex items-center gap-3 w-full font-[600]">
                            <MdWarningAmber className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Violations </span>
                        </Link>
                    </li>
                    <li className={`px-4 py-2 transition-all delay-150ms ${ pathname.includes("/settings") ? "text-primary" : "text-white hover:text-primary   hover:border-r-[2px] border-primary"}`}>
                        <Link href="/settings" className="flex items-center gap-3 w-full font-[600]">
                            <MdOutlineSettings className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Settings </span>
                        </Link>
                    </li>

                    <li className="py-2 mt-[40px]">
                        <button className="flex items-center gap-3 font-[600] bg-primary rounded-r-[12px] w-full py-2 px-4">
                            <FiLogOut className="text-[24px]" />
                            <span className="text-[15px] leading-[22px]"> Logout </span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;