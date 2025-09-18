'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import KeywordSearch from '../KeywordSearch';

export default function SearchField() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const initialValue = searchParams.get('search') ?? '';
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue) {
            params.set('search', debouncedValue);
        } else {
            params.delete('search');
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedValue]);

    return <KeywordSearch value={value} onChange={setValue} />;
}
