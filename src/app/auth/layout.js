
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AuthLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="content py-[140px] bg-dark">
                <div className="px-4 lg:px-12">
                    { children }
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AuthLayout;