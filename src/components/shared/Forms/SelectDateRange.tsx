'use client';

import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { SlArrowDown } from "react-icons/sl";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


type DateRangePickerWrapperProps = {
    value?: { startDate?: Date; endDate?: Date };
    onChange: (range: { startDate?: Date; endDate?: Date }) => void;
    label?: string;
};

export default function SelectDateRange({
    value,
    onChange,
    label,
}: DateRangePickerWrapperProps) {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: value?.startDate,
            endDate: value?.endDate,
            key: 'selection',
        },
    ]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick(dropdownRef, () => setOpen(false));

    useEffect(() => {
        setRange([
            {
                startDate: value?.startDate,
                endDate: value?.endDate,
                key: 'selection',
            },
        ]);
    }, [value?.startDate, value?.endDate]);

    const isSelected = range[0].startDate && range[0].endDate;

    const formattedRange = isSelected
        ? `${format(range[0].startDate!, 'yyyy-MM-dd')} - ${format(range[0].endDate!, 'yyyy-MM-dd')}`
        : 'لم يتم التحديد';

    const fallbackRange = [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ];

    const handleReset = () => {
        setRange([{ startDate: undefined, endDate: undefined, key: 'selection' }]);
        onChange({ startDate: undefined, endDate: undefined });
        setOpen(false);
    };

    return (
        <div className="relative w-fit" ref={dropdownRef} dir="ltr">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative w-full py-3 px-8 focus:shadow-xl flex gap-2 items-center sm:text-sm bg-bg-1 border rounded-3xl justify-between"
            >
                <span className="truncate flex items-center gap-2">
                    <span className="font-medium">{formattedRange}</span>
                    {label && <span className="text-gray-500">:{label}</span>}
                </span>
                <SlArrowDown size={13} className="text-gray-400" />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-lg p-3">
                    <DateRange
                        editableDateInputs
                        onChange={(item) => {
                            const { startDate, endDate, key } = item.selection;
                            setRange([{ startDate, endDate, key: key ?? 'selection' }]);
                            onChange({ startDate: startDate ?? undefined, endDate: endDate ?? undefined });
                        }}
                        moveRangeOnFirstSelection={false}
                        rangeColors={['var(--primary-300)']}
                        ranges={isSelected ? range : fallbackRange}
                    />
                    <button
                        onClick={handleReset}
                        className="mt-3 w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-2 rounded-md transition"
                    >
                        حذف التحديد
                    </button>
                </div>
            )}
        </div>
    );
}
