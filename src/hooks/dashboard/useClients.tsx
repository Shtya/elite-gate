'use client';

import { useSearchParams } from 'next/navigation';
import { TableRow } from '@/types/components/Table';
import { rows as mockRows } from '@/constants/dashboard/users';

export default function useClients() {
    const searchParams = useSearchParams();

    const getRows = async (): Promise<{
        rows: TableRow[];
        error: string | null;
    }> => {
        try {
            const status = searchParams.get('status');
            const sort = searchParams.get('sort');
            const dir = searchParams.get('dir');
            const joinedFrom = searchParams.get('joinedAt_from');
            const joinedTo = searchParams.get('joinedAt_to');
            const page = parseInt(searchParams.get('page') || '1', 10);
            const limit = parseInt(searchParams.get('limit') || '10', 10);
            const searchKey = searchParams.get('search')?.toLowerCase().trim() || '';

            await new Promise((r) => setTimeout(r, 700)); // simulate delay

            let filtered = [...mockRows];

            if (status) {
                filtered = filtered.filter((row) => {
                    const statusText = typeof row.status === 'string' ? row.status : row.status?.props?.children;
                    return statusText === statusMap[status];
                });
            }

            if (joinedFrom || joinedTo) {
                filtered = filtered.filter((row) => {
                    const date = new Date(row.joinedAt);
                    const from = joinedFrom ? new Date(joinedFrom) : null;
                    const to = joinedTo ? new Date(joinedTo) : null;
                    return (!from || date >= from) && (!to || date <= to);
                });
            }

            // 🔠 Filter by searchKey across multiple fields
            if (searchKey) {
                filtered = filtered.filter((row) => {
                    return (
                        row.name?.toLowerCase().includes(searchKey) ||
                        row.email?.toLowerCase().includes(searchKey) ||
                        row.role?.toLowerCase().includes(searchKey) ||
                        row.phone?.toLowerCase().includes(searchKey)
                    );
                });
            }

            if (sort) {
                filtered.sort((a, b) => {
                    let valA = a[sort];
                    let valB = b[sort];
                    if (sort === 'joinedAt') {
                        valA = new Date(valA);
                        valB = new Date(valB);
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
                error: null,
            };
        } catch {
            return {
                rows: [],
                error: 'Failed to fetch rows',
            };
        }
    };

    return getRows;
}

const statusMap: Record<string, string> = {
    active: 'نشط',
    pending: 'قيد المراجعة',
    suspended: 'موقوف',
};
