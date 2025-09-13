'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectInput from '@/components/shared/SelectInput';
import KeywordSearch from '@/components/shared/KeywordSearch';
import PriceRangeSlider from '@/components/shared/PriceRangeSlider';
import ResetFiltersButton from '@/components/shared/ResetFiltersButton';


export default function ProjectsFilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [city, setCity] = useState(searchParams.get('city') || '');
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get('priceMin')) || 25,
        Number(searchParams.get('priceMax')) || 89,
    ]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (keyword.trim()) params.set('keyword', keyword);
        if (type) params.set('type', type);
        if (city) params.set('city', city);
        if (priceRange[0]) params.set('priceMin', priceRange[0].toString());
        if (priceRange[1]) params.set('priceMax', priceRange[1].toString());
        router.push(`?${params.toString()}`);
    }, [keyword, type, city, priceRange]);

    const handleReset = () => {
        setKeyword('');
        setType('');
        setCity('');
        setPriceRange([25, 89]);
        router.push('?');
    };

    return (
        <div className="p-4 lg:py-6 lg:px-8 bg-white rounded-2xl shadow-lg">
            <h4 className="mb-0 text-2xl font-semibold">فلترة</h4>
            <div className="border-b border-dashed my-6 opacity-50" />

            <KeywordSearch value={keyword} onChange={setKeyword} />

            <div className="border-t border-dashed my-6" />

            <ul className="flex flex-col gap-4">
                <li>
                    <SelectInput
                        label="نوع العقار"
                        name="type"
                        value={type}
                        onChange={setType}
                        options={[
                            { value: '', label: 'اختر نوع العقار' },
                            { value: 'apartment', label: 'شقة' },
                            { value: 'villa', label: 'فيلا' },
                            { value: 'land', label: 'ارض' },
                        ]}
                    />
                </li>
                <li>
                    <SelectInput
                        label="المدينة"
                        name="city"
                        value={city}
                        onChange={setCity}
                        options={[
                            { value: '', label: 'اختر المدينة' },
                            { value: 'jeddah', label: 'جدة' },
                            { value: 'riyadh', label: 'الرياض' },
                            { value: 'dammam', label: 'الدمام' },
                        ]}
                    />
                </li>
            </ul>

            <div className="border-t border-dashed my-6" />
            <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">نطاق السعر</p>

            <PriceRangeSlider value={priceRange} onChange={setPriceRange} />

            <div className="border-t border-dashed my-4 " />
            <ResetFiltersButton onClick={handleReset} />
        </div>
    );
}
