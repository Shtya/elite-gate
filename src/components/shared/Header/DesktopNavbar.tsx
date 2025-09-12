import { FaBars } from "react-icons/fa";
import Navbar from "./Navbar";


type DesktopNavbarProps = {
    onOpenMobileMenu: () => void;
};

export default function DesktopNavbar({ onOpenMobileMenu }: DesktopNavbarProps) {
    return (
        <div className="lg:order-1">
            {/* Mobile Menu Button */}
            <button className="lg:hidden border py-1 px-2 rounded-md bg-btn-bg" onClick={onOpenMobileMenu}>
                <FaBars className="text-2xl" />
            </button>

            <div className="lg:block hidden">
                <Navbar />
            </div>
        </div>
    );
}
