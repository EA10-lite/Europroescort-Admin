import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="footer w-full border-t border-grey border-opacity-50 bg-dark">
            <div className="container mx-auto px-4 lg:px-12 py-8">
                <div className="footer-logo mb-[40px]">
                    <h4 className="text-white"> Europroescort </h4>
                </div>
                <div className="grid grid-cols-12 gap-[24px] mb-[40px]">
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="link-heading mb-2.5 text-base font-[600] text-white opacity-80"> Popular Locations </h4>
                        <ul className="footer-links">
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/">
                                    <span> UK Escort </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/agencies">
                                    <span> Amsterdan Girls </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/escort?search=pornstars">
                                    <span> Mexican Latinos  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/escort-live">
                                    <span> Berlin Baddies  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/escort-live">
                                    <span> Euro Ladies  </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="link-heading mb-2.5 text-base font-[600] text-white opacity-80"> Quick Links </h4>
                        <ul className="footer-links">
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/">
                                    <span> Escort </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/agencies">
                                    <span> Agencies </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/escort?search=pornstars">
                                    <span> Pornstars  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/escort-live">
                                    <span> Live  </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="link-heading mb-2.5 text-base font-[600] text-white opacity-80"> Company </h4>
                        <ul className="footer-links">
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/about">
                                    <span> About us </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/about">
                                    <span> FAQs </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/about">
                                    <span> Terms & Conditions  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/about">
                                    <span> Privacy  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/contact">
                                    <span> Contact us  </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                        <h4 className="link-heading mb-2.5 text-base font-[600] text-white opacity-80"> Join Europroescort </h4>
                        <ul className="footer-links">
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/auth/escortsignup">
                                    <span> Escort signup </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/auth/agencysignup">
                                    <span> Agency signup </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/auth/signup">
                                    <span> Member signup  </span>
                                </Link>
                            </li>
                            <li className="footer-link text-white hover:underline transition ease-in-out delay-500 mb-1.5 text-sm font-[400]">
                                <Link href="/advertisement">
                                    <span> Advertisement  </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-social">
                    <div className="w-full py-[24px] px-[24px] border-t border-b border-grey flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                        <div className="text-white">
                            <p> All Copyrights Reserved. </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <a href="https://www.facebook/europroescort">
                                <BsFacebook className="text-white text-[24px]" />
                            </a>
                            <a href="https://www.instagram/europroescort">
                                <BsInstagram className="text-white text-[24px]" />
                            </a>
                            <a href="https://www.twitter/europroescort">
                                <BsTwitter className="text-white text-[24px]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;