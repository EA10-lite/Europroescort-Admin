import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("token");
    const { pathname } = req.nextUrl;

    if(!verify && ( pathname === "/" || pathname.startsWith("/profile") || pathname === "/completeprofile")){ 
        return NextResponse.redirect( new URL("http://localhost:3000/auth/signin", req.url));  
    }     
}
