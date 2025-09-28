'use client';

import { useSearchParams } from 'next/navigation';
import { MarketerFilterKeys, MarketerRow, MarketerStatus } from '@/types/dashboard/marketer';
import { useCallback } from 'react';
import { mockedMarketers } from '@/constants/dashboard/admin/marketers/contants';

export default function useMarketers() {
    const searchParams = useSearchParams();
    const getParam = useCallback(
        (key: MarketerFilterKeys) => searchParams.get(key),
        [searchParams]
    );

    const getRows = useCallback(
        async (signal?: AbortSignal): Promise<{
            rows: MarketerRow[];
            error?: Error | null;
            totalCount?: number;
        }> => {
            try {
                const status = getParam('status');
                const sort = getParam('sort');
                const dir = getParam('dir');
                const joinedFrom = getParam('joinedAt_from');
                const joinedTo = getParam('joinedAt_to');
                const page = parseInt(getParam('page') || '1', 10);
                const limit = parseInt(getParam('limit') || '10', 10);
                const searchKey = getParam('search')?.toLowerCase().trim() || '';

                // Simulate delay
                await new Promise((r) => setTimeout(r, 300));

                let filtered = [...mockedMarketers];

                // Filter by status
                if (status && status !== 'all') {
                    filtered = filtered.filter((row) => row.status === status as MarketerStatus);
                }

                // Filter by joined date range
                if (joinedFrom || joinedTo) {
                    filtered = filtered.filter((row) => {
                        const date = new Date(row.joinedAt);
                        const from = joinedFrom ? new Date(joinedFrom) : null;
                        const to = joinedTo ? new Date(joinedTo) : null;
                        return (!from || date >= from) && (!to || date <= to);
                    });
                }

                // Search across multiple fields
                if (searchKey) {
                    filtered = filtered.filter((row) => {
                        return (
                            row.name?.toLowerCase().includes(searchKey) ||
                            row.email?.toLowerCase().includes(searchKey) ||
                            row.phone?.toLowerCase().includes(searchKey)
                        );
                    });
                }

                // Sorting
                if (sort) {
                    const sortKey = sort as keyof MarketerRow;

                    filtered.sort((a, b) => {
                        const valA = a[sortKey];
                        const valB = b[sortKey];

                        if (valA === undefined || valB === undefined) return 0;

                        if (sortKey === 'joinedAt') {
                            const dateA = new Date(valA as string);
                            const dateB = new Date(valB as string);
                            if (dateA < dateB) return dir === 'desc' ? 1 : -1;
                            if (dateA > dateB) return dir === 'desc' ? -1 : 1;
                            return 0;
                        }

                        if (valA < valB) return dir === 'desc' ? 1 : -1;
                        if (valA > valB) return dir === 'desc' ? -1 : 1;
                        return 0;
                    });
                }

                // Pagination
                const total = filtered.length;
                const paginated = filtered.slice((page - 1) * limit, page * limit);

                return {
                    rows: paginated,
                    totalCount: total,
                };
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return { rows: [] };
                }
                return {
                    rows: [],
                    error: new Error('فشل في جلب بيانات المسوقين'),
                };
            }
        },
        [getParam]
    );

    return getRows;
}
