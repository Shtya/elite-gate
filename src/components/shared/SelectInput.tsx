import React from 'react';

type SelectInputProps = {
    label: string;
    name: string;
    options: string[];
};

export default function SelectInput({ label, name, options }: SelectInputProps) {
    return (
        <div className="col-span-12">
            <label className="text-xl font-medium block mb-3">{label}</label>
            <div className="border text-left bg-[var(--bg-1)] rounded-full px-4">
                <select name={name} className="w-full bg-transparent py-3 focus:outline-none">
                    {options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
