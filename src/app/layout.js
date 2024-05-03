import { Suspense } from "react";
import Layout from "@/components/Layout";
import "./globals.css";
import UserContextProvider from "@/context/AdminContext";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className="h-full w-full">
            <body className="h-full w-full">
                <Toaster position="top-center" />
                <Suspense>
                    <UserContextProvider>
                        <Layout>
                            { children }
                        </Layout>
                    </UserContextProvider>
                </Suspense>
            </body>
        </html>
    )
}

export default RootLayout;