"use client";

import FooterLogoSection from "./FooterLogoSection";
import FooterLinksSection from "./FooterLinksSection";
import FooterContactSection from "./FooterContactSection";
import FooterNewsletterSection from "./FooterNewsletterSection";
import FooterBottom from "./FooterBottom";

export default function MainFooter() {
    return (
        <footer className="bg-[#091E43] text-white mt-auto">
            <div className="py-[60px] lg:py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6 px-3 xl:px-0">
                        <FooterLogoSection />
                        <FooterLinksSection />
                        <FooterContactSection />
                        <FooterNewsletterSection />
                    </div>
                </div>
            </div>
            <div className="container">
                <FooterBottom />
            </div>
        </footer>
    );
}
