'use client';

import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export default function PrimaryButton({ className = '', children, ...props }: PrimaryButtonProps) {
    return (
        <button
            {...props}
            className={`btn-primary w-full justify-center ${className}`}
        >
            {children}
        </button>
    );
}
