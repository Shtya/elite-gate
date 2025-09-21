import React from 'react';

type CardProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
    hasMinHeight?: boolean;
};

export default function Card({ children, title = '', className = '', hasMinHeight = false }: CardProps) {
    return (
        <div
            className={
                `bg-white p-4 sm:p-6  rounded-2xl border ${hasMinHeight ? "min-h-[712px]" : ""}` + className}
        >
            {title && <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {title}
                </h3>
            </div>}
            {children}
        </div>
    );
}