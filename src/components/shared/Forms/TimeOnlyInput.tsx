
"use client";


interface TimeOnlyInputProps {
    id: string;
    label: string;
    error?: string;
}

export default function TimeOnlyInput({ id, label, error, ...props }: TimeOnlyInputProps) {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="text-base font-medium block mb-2 text-[var(--dark)]"
            >
                {label}
            </label>
            <input
                id={id}
                type="time"
                className="w-full bg-gray-50 border text-gray-900 leading-none px-3 py-2 rounded-lg"
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
