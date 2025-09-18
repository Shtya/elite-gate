'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SelectDropdown from '../SelectDropdown';


type SortControlsWrapperProps = {
    fields: { label: string; value: string }[];
    directions?: { label: string; value: 'asc' | 'desc' }[];
};

export default function SortControlsWrapper({
    fields,
    directions = [
        { label: 'تصاعدي', value: 'asc' },
        { label: 'تنازلي', value: 'desc' },
    ],
}: SortControlsWrapperProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentSort = searchParams.get('sort') ?? fields[0].value;
    const currentDir = searchParams.get('dir') ?? directions[0].value;

    const handleSortChange = (label: string) => {
        const selected = fields.find((f) => f.label === label);
        if (!selected) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', selected.value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleDirChange = (label: string) => {
        const selected = directions.find((d) => d.label === label);
        if (!selected) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('dir', selected.value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <div className='w-fit'>

                <SelectDropdown
                    label="ترتيب حسب"
                    options={fields.map((f) => f.label)}
                    value={fields.find((f) => f.value === currentSort)?.label ?? fields[0].label}
                    onChange={handleSortChange}
                />
            </div>
            <div className='w-fit'>
                <SelectDropdown
                    label="الاتجاه"
                    options={directions.map((d) => d.label)}
                    value={directions.find((d) => d.value === currentDir)?.label ?? directions[0].label}
                    onChange={handleDirChange}
                />
            </div>
        </>
    );
}
