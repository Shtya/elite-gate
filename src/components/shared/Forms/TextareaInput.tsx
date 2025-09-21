import React from 'react';

type TextareaInputProps = {
    label?: string;
    name: string;
    placeholder: string;
    id: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextareaInput({
    label,
    name,
    placeholder,
    id,
    className = '',
    value,
    onChange,
}: TextareaInputProps) {
    return (
        <div className={`col-span-12 ${className}`}>
            {label && <label htmlFor={id} className="text-xl font-medium block mb-3">
                {label}
            </label>}
            <textarea
                id={id}
                name={name}
                rows={5}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-[var(--bg-1)] focus:outline-none border rounded-3xl py-3 px-5"
            />
        </div>
    );
}
