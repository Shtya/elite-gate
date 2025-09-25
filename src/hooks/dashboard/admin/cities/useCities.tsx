'use client';

import { CityRow } from '@/types/dashboard/city';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';


export function useCities() {
    const searchParams = useSearchParams();

    return useCallback(async (_signal?: AbortSignal): Promise<{
        rows: CityRow[];
        error?: Error | null;
        totalCount?: number;
    }> => {
        try {
            // 👉 Mocked data
            let rows: CityRow[] = [
                { id: 1, name: 'المدينة المنورة', regionsCount: 7 },
                { id: 2, name: 'الطائف', regionsCount: 6 },
                { id: 3, name: 'أبها', regionsCount: 4 },
                { id: 4, name: 'تبوك', regionsCount: 5 },
                { id: 5, name: 'حائل', regionsCount: 3 },
            ];

            await new Promise((r) => setTimeout(r, 300));

            // read sort params
            const sort = searchParams.get('sort');
            const dir = searchParams.get('dir');
            if (sort) {
                const direction = dir === 'desc' ? -1 : 1;
                rows.sort((a, b) => {
                    if (sort === 'name') {
                        return a.name.localeCompare(b.name, 'ar') * direction;
                    }
                    if (sort === 'regionsCount') {
                        return (a.regionsCount - b.regionsCount) * direction;
                    }
                    if (sort === 'id') {
                        return (a.id - b.id) * direction;
                    }
                    return 0;
                });
            }

            return {
                rows,
                totalCount: rows.length,
                error: null,
            };
        } catch (err: any) {
            return {
                rows: [],
                totalCount: 0,
                error: err,
            };
        }
    }, [searchParams]);
}
