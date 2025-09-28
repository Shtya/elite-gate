'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { properties as mockedProperties } from '@/constants/projects';
import { Property } from '@/types/global';

export default function useProperties() {
    const searchParams = useSearchParams();

    const [data, setData] = useState<Property[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        setError(null);

        const keyword = searchParams.get('keyword')?.toLowerCase().trim() || '';
        const type = searchParams.get('type') || '';
        const city = searchParams.get('city') || '';
        const priceMin = parseInt(searchParams.get('priceMin') || '0', 10);
        const priceMax = parseInt(searchParams.get('priceMax') || '999999999', 10);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const fetchData = async () => {
            try {
                await new Promise((r) => setTimeout(r, 300)); // simulate delay
                if (signal.aborted) return;

                const filtered = [...mockedProperties];

                if (!signal.aborted) {
                    setData(filtered);
                    setTotalCount(filtered.length);
                    setLoading(false);
                }
            } catch (err) {
                if (!signal.aborted) {
                    setError(new Error('فشل في جلب بيانات العقارات'));
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [searchParams]);

    return { data, totalCount, loading, error };
}
