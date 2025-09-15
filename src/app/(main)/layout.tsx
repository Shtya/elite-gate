'use client';

import { useState } from "react";
import TopContactBar from "@/components/shared/Header/TopContactBar";
import MainHeader from "@/components/shared/Header/MainHeader";
import MobileNavbar from "@/components/shared/Header/MobileNavbar";
import MainFooter from "@/components/shared/Footer/MainFooter";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <>
            <TopContactBar />
            <MainHeader setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />
            <MobileNavbar
                mobileMenuOpen={showMobileMenu}
                onCloseMobileMenu={() => setShowMobileMenu(false)}
            />
            <main className="flex-1">{children}</main>
            <MainFooter />
        </>
    );
}
