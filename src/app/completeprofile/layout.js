import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const CompleteProfileLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="py-[100px] px-8 bg-dark flex items-center w-full justify-center">
                { children }
            </main>
            <Footer />
        </>
    )
}

export default CompleteProfileLayout;