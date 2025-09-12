"use client";

import { useState, useRef } from "react";
import { SlArrowDown } from "react-icons/sl";
import { useOutsideClick } from "@/hooks/useOutsideClick"; // adjust path as needed

type SelectDropdownProps<T extends string> = {
    options: T[];
    value: T;
    onChange: (val: T) => void;
};

export default function SelectDropdown<T extends string>({
    options,
    value,
    onChange,
}: SelectDropdownProps<T>) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, () => setOpen(false));

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative w-full py-3 px-8 focus:shadow-xl flex gap-3 items-center sm:text-sm bg-bg-1 border rounded-3xl"
            >
                <span className="truncate">{value}</span>
                <SlArrowDown size={13} className="absolute left-8" />
            </button>

            {open && (
                <ul
                    className="z-40 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-lg border focus:outline-none sm:text-sm"
                    role="listbox"
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            role="option"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="relative cursor-pointer select-none pl-4 py-2 pr-4 text-gray-700 hover:bg-gray-100"
                        >
                            <span className="truncate flex gap-3 items-center text-base font-normal">
                                {option}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
