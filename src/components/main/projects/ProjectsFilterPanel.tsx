'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SelectInput from '@/components/shared/Forms/SelectInput';
import KeywordSearch from '@/components/shared/KeywordSearch';
import PriceRangeSlider from '@/components/shared/PriceRangeSlider';
import ResetFiltersButton from '@/components/shared/ResetFiltersButton';
import { useDebounce } from '@/hooks/useDebounce'; // Adjust path if needed

export default function ProjectsFilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [estate, setEstate] = useState({
        keyword: searchParams.get('keyword') || '',
        type: searchParams.get('type') || '',
        city: searchParams.get('city') || '',
        priceRange: [
            Number(searchParams.get('priceMin')) || 100000,
            Number(searchParams.get('priceMax')) || 500000,
        ] as [number, number],
    });

    // Debounced values
    const debouncedKeyword = useDebounce(estate.keyword);
    const debouncedPriceRange = useDebounce(estate.priceRange);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedKeyword.trim()) params.set('keyword', debouncedKeyword);
        if (estate.type) params.set('type', estate.type);
        if (estate.city) params.set('city', estate.city);

        const [min, max] = debouncedPriceRange;
        if (min !== 100000) params.set('priceMin', min.toString());
        else params.delete('priceMin');

        if (max !== 500000) params.set('priceMax', max.toString());
        else params.delete('priceMax');

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedKeyword, estate.type, estate.city, debouncedPriceRange]);

    const handleReset = () => {
        setEstate({
            keyword: '',
            type: '',
            city: '',
            priceRange: [100000, 500000],
        });
        router.replace(`${pathname}?`, { scroll: false });
    };

    return (
        <div className="sticky top-24  p-4 lg:py-6 lg:px-8 bg-white rounded-2xl shadow-lg ">
            <h4 className="mb-0 text-2xl font-semibold">فلترة</h4>
            <div className="border-b border-dashed my-6 opacity-50" />

            <KeywordSearch
                value={estate.keyword}
                onChange={(val) => setEstate((prev) => ({ ...prev, keyword: val }))}
            />

            <div className="border-t border-dashed my-6" />

            <ul className="flex flex-col gap-4">
                <li>
                    <SelectInput
                        label="نوع العقار"
                        name="type"
                        value={estate.type}
                        onChange={(val) => setEstate((prev) => ({ ...prev, type: val }))}
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
                        value={estate.city}
                        onChange={(val) => setEstate((prev) => ({ ...prev, city: val }))}
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

            <PriceRangeSlider
                value={estate.priceRange}
                onChange={(val) => setEstate((prev) => ({ ...prev, priceRange: val }))}
            />

            <div className="border-t border-dashed my-4 " />
            <ResetFiltersButton onClick={handleReset} />
        </div>
    );
}
