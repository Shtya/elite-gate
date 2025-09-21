'use client';

/**
 * 📌 FilterContainer Component
 *
 * This component initializes filter and sort state from URL search parameters.
 * 
 * 🔍 For filters of type `'dateRange'`, the `key` is split into two query parameters:
 * - `${key}_from` → represents the start date
 * - `${key}_to` → represents the end date
 *
 * These are used to prefill the date range inputs and apply filtering logic accordingly.
 */

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import { FilterConfig, SortConfig } from '@/types/components/table';
import SelectDropdown from '../Forms/SelectDropdown';
import SelectDateRange from '../Forms/SelectDateRange';
import SearchField from '../Forms/SearchField';
import { TbFilterCancel } from 'react-icons/tb';

type Props = {
    filters: FilterConfig[];
    showSearch: boolean;
    searchPlaceholder?: string;
    showSort: boolean;
    sortConfig: SortConfig;
};

const defaultDirections = [
    { label: 'تصاعدي', value: 'asc' },
    { label: 'تنازلي', value: 'desc' },
];



export default function FilterContainer({
    filters,
    showSearch,
    searchPlaceholder,
    showSort,
    sortConfig,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') ?? '');
    const { sortFields, directions = defaultDirections, defaultSort, defaultDir } = sortConfig;

    const [allFilters, setAllFilters] = useState(() => {
        const initial: Record<string, string> = {};

        initial.sort = searchParams.get('sort') ?? defaultSort ?? sortFields[0]?.value;
        initial.dir = searchParams.get('dir') ?? defaultDir ?? directions[0]?.value;
        initial.search = searchParams.get('search') ?? '';
        filters.forEach((filter) => {
            if (filter.type === 'select') {
                initial[filter.key] =
                    searchParams.get(filter.key) ??
                    (typeof filter.default === 'string' ? filter.default : '') ??
                    filter.options?.[0]?.value ??
                    '';
            }

            if (filter.type === 'dateRange') {
                const fromParam = searchParams.get(`${filter.key}_from`);
                const toParam = searchParams.get(`${filter.key}_to`);
                const defaultRange = typeof filter.default === 'object' ? filter.default : {};

                initial[`${filter.key}_from`] =
                    fromParam ??
                    (defaultRange.startDate ? format(defaultRange.startDate, 'yyyy-MM-dd') : '');

                initial[`${filter.key}_to`] =
                    toParam ??
                    (defaultRange.endDate ? format(defaultRange.endDate, 'yyyy-MM-dd') : '');
            }
        });

        return initial;
    });

    // ✅ Update query and state
    const updateQuery = (key: string, value: string | undefined) => {
        const updated = { ...allFilters };
        if (value) {
            updated[key] = value;
        } else {
            delete updated[key];
        }
        setAllFilters(updated);

        const params = new URLSearchParams(updated);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSortChange = (value: string) => {
        updateQuery('sort', value);
    };

    const handleDirChange = (value: string) => {
        updateQuery('dir', value);
    };

    const handleReset = () => {
        const reset: Record<string, string> = {};

        reset.sort = defaultSort ?? sortFields[0]?.value;
        reset.dir = defaultDir ?? directions[0]?.value;
        reset.search = '';
        setSearch('');
        filters.forEach((filter) => {
            if (filter.type === 'select') {
                reset[filter.key] =
                    typeof filter.default === 'string'
                        ? filter.default
                        : filter.options?.[0]?.value ?? '';
            }

            if (filter.type === 'dateRange') {
                const defaultRange = typeof filter.default === 'object' ? filter.default : {};
                if (defaultRange.startDate) {
                    reset[`${filter.key}_from`] = format(defaultRange.startDate, 'yyyy-MM-dd');
                }
                if (defaultRange.endDate) {
                    reset[`${filter.key}_to`] = format(defaultRange.endDate, 'yyyy-MM-dd');
                }
            }
        });

        setAllFilters(reset);
        const params = new URLSearchParams(reset);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-between items-center mb-7 gap-3 flex-wrap">
            {showSort && sortFields.length > 0 && (
                <>
                    <div className="w-fit">
                        <SelectDropdown
                            label="ترتيب حسب"
                            options={sortFields}
                            value={allFilters.sort}
                            onChange={handleSortChange}
                        />

                    </div>
                    <div className="w-fit">
                        <SelectDropdown
                            label="الاتجاه"
                            options={directions}
                            value={allFilters.dir}
                            onChange={handleDirChange}
                        />

                    </div>
                </>
            )}

            {filters.map((filter) => {
                const current = allFilters[filter.key];
                const handleChange = (value: string | undefined) => {
                    updateQuery(filter.key, value);
                };
                if (filter.type === 'custom' && filter.component) {
                    const CustomComponent = filter.component;
                    return (
                        <div key={filter.key} className="w-fit">
                            <CustomComponent value={current} onChange={handleChange} />
                        </div>
                    );
                }

                if (filter.type === 'select' && filter.options) {
                    return (
                        <div className="w-fit" key={filter.key}>
                            <SelectDropdown
                                label={filter.label}
                                options={filter.options}
                                value={current}
                                onChange={handleChange}
                            />
                        </div>
                    );
                }

                if (filter.type === 'dateRange') {
                    const fromDate = allFilters[`${filter.key}_from`]
                        ? parse(allFilters[`${filter.key}_from`], 'yyyy-MM-dd', new Date())
                        : undefined;
                    const toDate = allFilters[`${filter.key}_to`]
                        ? parse(allFilters[`${filter.key}_to`], 'yyyy-MM-dd', new Date())
                        : undefined;


                    const handleDateChange = (range: { startDate?: Date; endDate?: Date }) => {
                        const params = new URLSearchParams(allFilters);

                        if (range.startDate) {
                            params.set(`${filter.key}_from`, format(range.startDate, 'yyyy-MM-dd'));
                        } else {
                            params.delete(`${filter.key}_from`);
                        }

                        if (range.endDate) {
                            params.set(`${filter.key}_to`, format(range.endDate, 'yyyy-MM-dd'));
                        } else {
                            params.delete(`${filter.key}_to`);
                        }

                        const updated = Object.fromEntries(params.entries());
                        setAllFilters(updated);
                        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                    };

                    return (
                        <SelectDateRange
                            key={filter.key}
                            label={filter.label}
                            value={{
                                startDate: fromDate,
                                endDate: toDate
                            }}
                            onChange={handleDateChange}
                        />
                    );
                }

                return null;
            })}

            {showSearch ? (
                <div className="mr-auto">
                    <SearchField
                        value={search}
                        onChange={setSearch}
                        searchPlaceholder={searchPlaceholder}
                    />
                </div>) : <div className='mr-auto'></div>
            }

            {(showSearch || filters.length > 0 || showSort) && (
                <div className="relative group">
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--btn-bg)] text-[var(--dark)] cursor-pointer transition-colors duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                        <TbFilterCancel size={24} />
                    </button>
                    <span className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 bg-[var(--rt-color-dark)] text-[var(--rt-color-white)] text-[12px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-[var(--rt-opacity)] z-10">
                        إعادة تعيين الفلاتر
                    </span>
                </div>
            )}
        </div>
    );
}
