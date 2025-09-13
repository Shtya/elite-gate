import React from 'react';

type TextareaInputProps = {
    label: string;
    name: string;
    placeholder: string;
    id: string;
};

export default function TextareaInput({ label, name, placeholder, id }: TextareaInputProps) {
    return (
        <div className="col-span-12">
            <label htmlFor={id} className="text-xl font-medium block mb-3">{label}</label>
            <textarea
                id={id}
                name={name}
                rows={5}
                placeholder={placeholder}
                className="w-full bg-[var(--bg-1)] focus:outline-none border rounded-3xl py-3 px-5"
            />
        </div>
    );
}
