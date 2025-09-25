'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { AppointmentRequestRow, mockAppointmentRequests } from '@/constants/dashboard/agent/appointment-requests/constants';

export default function useAppointmentRequests() {
    const searchParams = useSearchParams();
    const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

    const getRows = useCallback(
        async (signal?: AbortSignal): Promise<{
            rows: AppointmentRequestRow[];
            error?: Error | null;
            totalCount?: number;
        }> => {
            try {
                const apFrom = getParam('appointmentAt_from');
                const apTo = getParam('appointmentAt_to');
                const crFrom = getParam('createdAt_from');
                const crTo = getParam('createdAt_to');

                const sort = getParam('sort');
                const dir = getParam('dir');
                const page = parseInt(getParam('page') || '1', 10);
                const limit = parseInt(getParam('limit') || '10', 10);

                await new Promise((r) => setTimeout(r, 200));

                let filtered = [...mockAppointmentRequests];

                if (apFrom || apTo) {
                    filtered = filtered.filter((row) => {
                        const d = new Date(row.appointmentAt);
                        d.setHours(0, 0, 0, 0);
                        const from = apFrom ? new Date(apFrom) : null;
                        if (from) from.setHours(0, 0, 0, 0);
                        const to = apTo ? new Date(apTo) : null;
                        if (to) to.setHours(0, 0, 0, 0);
                        return (!from || d >= from) && (!to || d <= to);
                    });
                }

                if (crFrom || crTo) {
                    filtered = filtered.filter((row) => {
                        const d = new Date(row.createdAt);
                        d.setHours(0, 0, 0, 0);
                        const from = crFrom ? new Date(crFrom) : null;
                        if (from) from.setHours(0, 0, 0, 0);
                        const to = crTo ? new Date(crTo) : null;
                        if (to) to.setHours(0, 0, 0, 0);
                        return (!from || d >= from) && (!to || d <= to);
                    });
                }

                if (sort) {
                    filtered.sort((a, b) => {
                        const direction = dir === 'desc' ? -1 : 1;
                        if (sort === 'projectTitle') {
                            return a.project.title.localeCompare(b.project.title) * direction;
                        }
                        if (sort === 'appointmentAt') {
                            const da = new Date(a.appointmentAt).getTime();
                            const db = new Date(b.appointmentAt).getTime();
                            return (da - db) * direction;
                        }
                        if (sort === 'createdAt') {
                            const da = new Date(a.createdAt).getTime();
                            const db = new Date(b.createdAt).getTime();
                            return (da - db) * direction;
                        }
                        if (sort === 'clientName') {
                            return a.client.name.localeCompare(b.client.name) * direction;
                        }
                        return 0;
                    });
                }

                const total = filtered.length;
                const paginated = filtered.slice((page - 1) * limit, page * limit);

                return { rows: paginated, totalCount: total };
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return { rows: [] };
                return { rows: [], error: new Error('فشل في جلب البيانات') };
            }
        },
        [getParam]
    );

    return getRows;
}


