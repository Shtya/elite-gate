'use client';

import { useSearchParams } from 'next/navigation';
import { AgentFilterKeys, AgentRow, AgentStatus } from '@/types/dashboard/agent';
import { useCallback } from 'react';
import { mockedAgents } from '@/constants/dashboard/admin/agent/contants';

export default function useAgents() {
    const searchParams = useSearchParams();
    const getParam = useCallback((key: AgentFilterKeys) => searchParams.get(key), [searchParams]);

    const getRows = useCallback(
        async (signal?: AbortSignal): Promise<{
            rows: AgentRow[];
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

                await new Promise((r) => setTimeout(r, 300)); // simulate delay

                let filtered = [...mockedAgents];

                if (status && status !== 'all') {
                    filtered = filtered.filter((row) => row.status === status as AgentStatus);
                }

                if (joinedFrom || joinedTo) {
                    filtered = filtered.filter((row) => {
                        const date = new Date(row.joinedAt);
                        const from = joinedFrom ? new Date(joinedFrom) : null;
                        const to = joinedTo ? new Date(joinedTo) : null;
                        return (!from || date >= from) && (!to || date <= to);
                    });
                }

                if (searchKey) {
                    filtered = filtered.filter((row) => {
                        return (
                            row.name?.toLowerCase().includes(searchKey) ||
                            row.email?.toLowerCase().includes(searchKey) ||
                            row.phone?.toLowerCase().includes(searchKey)
                        );
                    });
                }

                if (sort) {
                    const sortKey = sort as keyof AgentRow;

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
                    error: new Error('فشل في جلب بيانات الوسطاء'),
                };
            }
        },
        [getParam]
    );

    return getRows;
}
