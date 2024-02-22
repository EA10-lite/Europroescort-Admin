
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AuthLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="content py-[140px] bg-dark">
                { children }
            </main>
            <Footer />
        </>
    )
}

export default AuthLayout;