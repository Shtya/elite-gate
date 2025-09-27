'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SelectInput from '@/components/shared/Forms/SelectInput';
import PriceRangeSlider from '@/components/shared/PriceRangeSlider';
import ResetFiltersButton from '@/components/shared/ResetFiltersButton';
import { useDebounce } from '@/hooks/useDebounce';
import SearchField from '@/components/shared/Forms/SearchField';

type price = { min: number, max: number };
type Filters = {
    type: string;
    city: string;
    priceRange: { min: number; max: number };
    [key: string]: any; // 👈 allows dynamic access
};


export default function ProjectsFilterPanel({ defaultPriceRange = { min: 100000, max: 500000 } }: { defaultPriceRange?: price }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [search, setSearch] = useState(searchParams.get('search') ?? '');
    const [filters, setFilters] = useState<Filters>(() => {
        const params = new URLSearchParams(searchParams.toString());
        return {
            type: params.get('type') ?? '',
            city: params.get('city') ?? '',
            priceRange: {
                min: Number(searchParams.get('priceMin')) || defaultPriceRange.min,
                max: Number(searchParams.get('priceMax')) || defaultPriceRange.max,
            },
        };
    });

    // Debounced values
    const debouncedPriceRange = useDebounce(filters.priceRange);
    const handlePriceChange = (price: price) => {
        const params = new URLSearchParams(searchParams);

        if (price.min === defaultPriceRange.min && price.max === defaultPriceRange.max) {
            if (!params.has('priceMin') && !params.has('priceMax')) return;

            params.delete('priceMin');
            params.delete('priceMax');

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            return;
        }

        if (String(price.min) === params.get('priceMin') && String(price.max) === params.get('priceMax')) return;

        const updated = { ...filters };
        if (price.min) {
            params.set('priceMin', price.min.toString());
            updated.priceRange.min = price.min;
        } else {
            updated.priceRange.min = defaultPriceRange.min;
            params.delete('priceMin');
        }

        if (price.max) {
            updated.priceRange.max = price.max;
            params.set('priceMax', price.max.toString());
        } else {
            updated.priceRange.max = defaultPriceRange.max;
            params.delete(`priceMax`);
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        handlePriceChange(debouncedPriceRange)
    }, [debouncedPriceRange.min, debouncedPriceRange.max]);

    const updateQuery = (key: string, value: string | number | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        const updated = { ...filters };

        if (value !== undefined && value !== '') {
            params.set(key, value.toString());
            updated[key] = value;
        } else {
            if (params.has(key)) params.delete(key);
            updated[key] = '';
        }

        setFilters(updated);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        ['search', 'type', 'city', 'priceMin', 'priceMax'].forEach((key) => {
            params.delete(key);
        });
        setSearch('');

        setFilters({
            type: '',
            city: '',
            priceRange: {
                min: defaultPriceRange.min,
                max: defaultPriceRange.max,
            },
        });


        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };


    return (
        <div className="sticky top-24  p-4 lg:py-6 lg:px-8 bg-white rounded-2xl shadow-lg ">
            <h4 className="mb-0 text-2xl font-semibold">فلترة</h4>
            <div className="border-b border-dashed my-6 opacity-50" />


            <SearchField
                value={search}
                onChange={setSearch}
            />

            <div className="border-t border-dashed my-6" />

            <ul className="flex flex-col gap-4">
                <li>
                    <SelectInput
                        label="نوع العقار"
                        name="type"
                        value={filters.type}
                        onChange={(val) => updateQuery('type', val)}
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
                        value={filters.city}
                        onChange={(val) => updateQuery('city', val)}
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
                value={[filters.priceRange.min, filters.priceRange.max]}
                onChange={(val) =>
                    setFilters((prev) => ({
                        ...prev,
                        priceRange: {
                            ...prev.priceRange,
                            min: val[0],
                            max: val[1],
                        },
                    }))
                }
            />

            <div className="border-t border-dashed my-4 " />
            <ResetFiltersButton onClick={handleReset} />
        </div>
    );
}
