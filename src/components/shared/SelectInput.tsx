'use client';

import React from 'react';

type OptionType = {
    value: string;
    label: string;
};

type SelectInputProps = {
    label: string;
    name: string;
    options: OptionType[];
    value?: string;
    className?: string;
    small?: boolean;
    onChange?: (val: string) => void;
};

export default function SelectInput({ label, name, options, value, className, small, onChange }: SelectInputProps) {
    return (
        <div className={`col-span-12 ${className}`}>
            <label className="text-xl font-medium block mb-3">{label}</label>
            <div className={`border text-left bg-[var(--bg-1)] rounded-full ${small ? 'px-3' : 'px-4'}`}>
                <select
                    name={name}
                    value={value}
                    className={`w-full bg-transparent ${small ? 'py-2' : 'py-3'}  focus:outline-none`}
                    onChange={(e) => onChange?.(e.target.value)}
                >
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
