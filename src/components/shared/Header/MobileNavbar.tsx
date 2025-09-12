"use client"
import Image from "next/image";
import { RiCloseLargeFill } from "react-icons/ri";
import Navbar from "./Navbar";
import { useState } from "react";

type MobileNavbarProps = {
    onCloseMobileMenu: () => void;
    mobileMenuOpen: boolean
};

export default function MobileNavbar({
    onCloseMobileMenu,
    mobileMenuOpen
}: MobileNavbarProps) {

    const [currentLevel, setCurrentlevel] = useState<number | undefined>(undefined);




    return (
        <div className={`fixed top-0 left-0 h-screen w-full bg-white shadow-lg z-100 transform transition-transform ease-in-out duration-300 pt-2 ${mobileMenuOpen ? 'translate-x-0' : "translate-x-full "}`}>

            <button
                className="p-3 rounded-full absolute top-1 left-1 text-neutral-700"
                onClick={onCloseMobileMenu}
                aria-label="Close mobile menu"
            >
                <RiCloseLargeFill size={20} />
            </button>

            <Image src="/logo.png" alt="الشعار" width={227} height={60} className="mr-3" />

            <div className="border-b my-2" />

            <Navbar
                currentLevel={currentLevel}
                onChangeLevel={(val) => setCurrentlevel(val)}
                onCloseMobileMenu={onCloseMobileMenu} />
        </div>
    );
}
