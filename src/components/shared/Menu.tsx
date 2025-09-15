'use client'
import { cloneElement, ReactElement, ReactNode, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";


type MenuChildProps = {
    onClose: () => void;
};

type MenuProps = {
    trigger: (toggle: () => void) => ReactNode;
    children: ReactElement<MenuChildProps>; // 👈 expects onClose prop
    className?: string;
    width?: number;
};

export default function Menu({
    trigger,
    children,
    width = 224,
    className = "",
}: MenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const onClose = () => setIsMenuOpen(false);
    // Close menu when clicking outside
    useOutsideClick(menuRef, () => {
        setIsMenuOpen(false);
    });

    // Toggle function passed to render prop
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <div ref={menuRef} className={`relative inline-block`}>
            {/* Render trigger with toggle function */}
            {trigger(toggleMenu)}

            {/* Dropdown panel */}
            <div
                className={`
                absolute
                left-auto right-0 lg:right-auto lg:left-0 
                mt-2 origin-top-right
                divide-y divide-gray-100
                rounded-md bg-white shadow-lg 
                border-1 
                p-3
                transition-all duration-150 ease-in-out
                transform
                ${isMenuOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"} ${className}`}
                role="menu"
                aria-hidden={!isMenuOpen}
                style={{ width }}
            >
                {cloneElement(children, { onClose })}
            </div>
        </div >
    );
}
