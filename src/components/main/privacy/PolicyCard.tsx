'use client';
import React from 'react';

interface PolicyCardProps {
    title: string;
    items: string[];
}

export default function PolicyCard({ title, items }: PolicyCardProps) {
    return (
        <div className="col-span-12 md:col-span-6 p-4 rounded-2xl border border-gray-300 border-dashed lg:p-8">
            <h3 className="h3 mb-4">{title}</h3>
            <ul className="list-disc list-inside marker:text-primary flex flex-col gap-3">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
