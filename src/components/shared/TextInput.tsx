import React from 'react';

type TextInputProps = {
    id: string;
    label: string;
    placeholder: string;
    name: string;
    type?: string;
    value?: string;
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
    id,
    label,
    placeholder,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    ...props
}: TextInputProps) {
    return (
        <div className="col-span-12">
            <label htmlFor={id} className="text-xl font-medium block mb-3">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...props}
                className="w-full bg-[var(--bg-1)] focus:outline-none border rounded-full py-3 px-5"
            />
        </div>
    );
}
