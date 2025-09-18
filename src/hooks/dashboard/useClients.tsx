'use client';

import { useSearchParams } from 'next/navigation';
import { TableRow } from '@/types/components/table';
import { rows as mockRows } from '@/constants/dashboard/clientsContants';
import { ClientRow, ClientStatus, statusMap } from '@/types/client';

export default function useClients() {
    const searchParams = useSearchParams();

    const getRows = async (signal?: AbortSignal): Promise<{
        rows: ClientRow[];
        error?: Error | null;
        totalCount?: number;
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

            // Simulate delay 
            await new Promise((r) => setTimeout(r, 700)); // simulate delay

            let filtered = [...mockRows];

            if (status) {
                filtered = filtered.filter((row) => {
                    const statusText = row.status;
                    return statusText === status as ClientStatus;
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
                const sortKey = sort as keyof ClientRow;

                filtered.sort((a, b) => {
                    let valA = a[sortKey];
                    let valB = b[sortKey];

                    // Handle undefined values safely
                    if (valA === undefined || valB === undefined) return 0;

                    // Special case: sort by date
                    if (sortKey === 'joinedAt') {
                        const dateA = new Date(valA as string);
                        const dateB = new Date(valB as string);

                        if (dateA < dateB) return dir === 'desc' ? 1 : -1;
                        if (dateA > dateB) return dir === 'desc' ? -1 : 1;
                        return 0;
                    }

                    // General comparison
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
                return {
                    rows: [],
                };
            }
            return {
                rows: [],
                error: new Error('فشل في جلب البيانات'),
            };
        }
    };

    return getRows;
}

