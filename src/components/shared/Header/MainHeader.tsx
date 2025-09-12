'use client'
import { useEffect, useState } from "react";
import HeaderActions from "./HeaderActions";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";



export default function MainHeader() {
    const [atTop, setAtTop] = useState<boolean>(false)
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className={`z-50 border-y sticky top-0 left-0 duration-300  ${atTop && "backdrop-blur shadow-md !bg-white/70 border-none"}`}>
            < div className="container flex justify-between items-center relative px-3 py-2 lg:py-0 lg:px-0 mx-auto" >
                <HeaderActions />
                <DesktopNavbar onOpenMobileMenu={() => setShowMobileMenu(true)} />
            </div>
            <div className="lg:hidden ">
                <MobileNavbar onCloseMobileMenu={() => setShowMobileMenu(false)} mobileMenuOpen={showMobileMenu} />
            </div>
        </header >

    )
}
