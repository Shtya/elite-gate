import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import LogoIcon from "../shared/LogoIcon";
import Link from "next/link";
import SelectableMenu from "../shared/SelectableMenu";
import LogoutButton from "../shared/LogoutButton";
import { dashboardItems } from "@/constants/AdminDashboardItems";

interface SidebarProps {
    sidebarOpen: boolean;
    onClose: () => void;
}



export default function DashboardSidebar({ sidebarOpen, onClose }: SidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useOutsideClick(sidebarRef, onClose);

    return (
        <div
            ref={sidebarRef}
            className={`${sidebarOpen ? 'mr-0' : 'mr-[-312px]'} lg:mr-0 w-[270px] sm:w-[312px] transition-all duration-300 ease-out z-20 overflow-x-hidden overflow-y-auto fixed top-0 bottom-0 bg-white flex flex-col border-r p-3 md:p-8 min-h-screen shadow-lg lg:shadow-none scrollbarthin`}
        >
            <div className="mb-6 flex flex-col items-center">
                <div className="inline-flex items-center pb-4 lg:pb-9 border-b border-dashed cursor-pointer w-full ">
                    <Link href="/" className="block mx-auto">
                        <LogoIcon />
                    </Link>
                </div>
            </div>
            <SelectableMenu items={dashboardItems} onClose={onClose} />
            <LogoutButton />
        </div >
    );
}
