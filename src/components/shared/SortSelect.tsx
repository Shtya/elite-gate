'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type SortOption = {
    value: string;
    label: string;
};

interface SortSelectProps {
    options: SortOption[];
}

export default function SortSelect({ options }: SortSelectProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || options[0]?.value || '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`?${params.toString()}`);
    };

    return (
        <select
            className="w-full bg-transparent px-5 py-2 focus:outline-none border-0"
            value={currentSort}
            onChange={handleChange}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
