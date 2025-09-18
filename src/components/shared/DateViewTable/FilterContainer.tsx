'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';
import { FilterConfig } from '@/types/components/table';
import SelectDropdown from '../SelectDropdown';
import SelectDateRange from '../Forms/SelectDateRange';
import SearchField from '../Forms/SearchField';

type Props = {
    filters: FilterConfig[];
    showSearch: boolean;
    showSort: boolean;
    sortFields: { label: string; value: string }[];
    directions: { label: string; value: string }[];
};

export default function FilterContainer({
    filters,
    showSearch,
    showSort,
    sortFields,
    directions,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateQuery = (key: string, value: string | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const currentSort = searchParams.get('sort') ?? sortFields[0]?.value;
    const currentDir = searchParams.get('dir') ?? directions[0]?.value;

    const handleSortChange = (label: string) => {
        const selected = sortFields.find((f) => f.label === label);
        if (selected) updateQuery('sort', selected.value);
    };

    const handleDirChange = (label: string) => {
        const selected = [
            { label: 'تصاعدي', value: 'asc' },
            { label: 'تنازلي', value: 'desc' },
        ].find((d) => d.label === label);
        if (selected) updateQuery('dir', selected.value);
    };

    return (
        <div className="flex justify-between items-center mb-7 gap-3 flex-wrap">
            {showSort && sortFields.length > 0 && (
                <>
                    <div className="w-fit">
                        <SelectDropdown
                            label="ترتيب حسب"
                            options={sortFields.map((f) => f.label)}
                            value={sortFields.find((f) => f.value === currentSort)?.label ?? sortFields[0].label}
                            onChange={handleSortChange}
                        />
                    </div>
                    <div className="w-fit">
                        <SelectDropdown
                            label="الاتجاه"
                            options={directions.map((d) => d.label)}
                            value={directions.find((d) => d.value === currentDir)?.label ?? directions[0].label}
                            onChange={handleDirChange}
                        />
                    </div>
                </>
            )}

            {filters.map((filter) => {
                if (filter.type === 'select' && filter.options) {
                    const current = searchParams.get(filter.key) ?? filter.options[0].value;
                    const handleChange = (label: string) => {
                        const selected = filter.options?.find((o) => o.label === label);
                        if (selected) updateQuery(filter.key, selected.value);
                    };
                    return (
                        <div className="w-fit" key={filter.key}>
                            <SelectDropdown
                                label={filter.label}
                                options={filter.options.map((o) => o.label)}
                                value={filter.options.find((o) => o.value === current)?.label ?? filter.options[0].label}
                                onChange={handleChange}
                            />
                        </div>
                    );
                }

                if (filter.type === 'dateRange') {
                    const fromParam = searchParams.get(`${filter.key}_from`);
                    const toParam = searchParams.get(`${filter.key}_to`);

                    const fromDate = fromParam ? parse(fromParam, 'yyyy-MM-dd', new Date()) : undefined;
                    const toDate = toParam ? parse(toParam, 'yyyy-MM-dd', new Date()) : undefined;

                    const handleDateChange = (range: { startDate: Date | undefined; endDate: Date | undefined }) => {
                        const params = new URLSearchParams(searchParams.toString());

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

                        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                    };

                    return (
                        <SelectDateRange
                            key={filter.key}
                            label={filter.label}
                            defaultStartDate={fromDate}
                            defaultEndDate={toDate}
                            onChange={handleDateChange}
                        />
                    );
                }

                return null;
            })}

            {showSearch && (
                <div className="mr-auto">
                    <SearchField />
                </div>
            )}
        </div>
    );
}
