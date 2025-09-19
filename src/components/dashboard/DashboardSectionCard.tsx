'use client';

import React from 'react';
type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function DashboardSectionCard({ children, className }: Props) {
    return (
        <section
            className={`
                'p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]'
                ${className}
            `}
        >
            {children}
        </section>
    );
}
