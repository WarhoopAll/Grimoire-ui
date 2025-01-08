import Navigation from "@/components/features/navigation";
import WelcomeBanner from "@/components/layout/widgets/welcomeBanner";
import StatusServer from "@/components/layout/widgets/serverStatus";
import Footer from "@/components/layout/footer";
import { useState, useEffect } from "react";
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";

export default function Layout({ children, nav = true, welcome = true, status = true, footer = true }) {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="mx-auto mt-0 mb-44 container">
                <div className="mb-8 xl:mb-80">
                    {nav && (
                        <div>
                            <Navigation />
                        </div>
                    )}
                </div>
                {welcome ? (
                    <div>
                        <WelcomeBanner />
                    </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )}
                {welcome && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="md:col-span-3">
                            {children}
                        </div>
                        {status && (
                            <div className="md:col-span-1">
                                <StatusServer />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {footer && <Footer />}
            {showScroll && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-4 cursor-pointer bg-inputCol text-white p-4 rounded-full shadow-lg hover:bg-customBg transition duration-300 animate-fadeIn "
                    style={{ zIndex: 1000 }}
                >
                    <FaArrowUp className="md:size-6 sm:size-2" />
                </div>
            )}
        </div>
    );
}
