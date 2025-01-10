"use client";
import { useState, createContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getMyAccount } from "@/services/admin";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState();


    const login = (data) => {
        setUser(data);
        Cookies.set("europroadmin", JSON.stringify({ 
            id: data?.admin?._id, 
            email: data?.admin?.email 
        }), { expires: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)});
        Cookies.set("euprtken", data?.admin?.access_token, { expires: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)});
        
        router.push("/");
    }

    const logout = ()=> {
        Cookies.remove("europroescort");
        Cookies.remove("euprtken");
        router.push("/");
        window.location.href = "/";
    }

    const getCurrentUser = async () => {
        try {
            const user = Cookies.get("europroadmin");
            if(user) {
                setUser(JSON.parse(user));
                const response = await getMyAccount();
                if(response?.data?.success) {
                    setUser(response?.data?.result);
                }
            }
            else {
                if(pathname !== "/login"){
                    router.push("/login");
                }
            }
        } catch (error) {
            setUser(null);
            if(pathname !== "/login"){
                router.push("/login");
            }
        }
    }

    useEffect(()=> {
        getCurrentUser();
    },[])

    return (
        <UserContext.Provider value={{ logout, login, user }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;