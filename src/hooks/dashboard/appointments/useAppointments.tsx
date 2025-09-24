// hooks/useAppointments.ts
'use client';

import { mockAppointments } from '@/constants/dashboard/appointment/contants';
import { AppointmentFilterKeys, AppointmentRow } from '@/types/dashboard/appointment';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
    agentId?: number;
    clientId?: number;
};

export default function useAppointments({ agentId: agentIdProp, clientId }: Props) {
    const searchParams = useSearchParams();
    const getParam = useCallback((key: AppointmentFilterKeys) => searchParams.get(key), [searchParams]);

    const getRows = useCallback(
        async (signal?: AbortSignal): Promise<{
            rows: AppointmentRow[];
            error?: Error | null;
            totalCount?: number;
        }> => {
            try {
                const status = getParam('status');
                const apFrom = getParam('appointmentAt_from');
                const apTo = getParam('appointmentAt_to');
                const crFrom = getParam('createdAt_from');
                const crTo = getParam('createdAt_to');
                const agentId = agentIdProp?.toString() ?? getParam('agentId');
                const isPaid = getParam('isPaid');

                const sort = getParam('sort');
                const dir = getParam('dir');
                const page = parseInt(getParam('page') || '1', 10);
                const limit = parseInt(getParam('limit') || '10', 10);

                await new Promise((r) => setTimeout(r, 300)); // simulate delay

                let filtered = [...mockAppointments];

                if (status && status !== 'all') {
                    filtered = filtered.filter((row) => row.status === status);
                }
                if (agentId) {
                    filtered = filtered.filter((row) => row.agent?.id.toString() === agentId);
                }

                if (clientId) {
                    filtered = filtered.filter((row) => row.client?.id === clientId);
                }

                // isPaid filter: 'all' | 'paid' | 'unpaid'
                if (isPaid === 'paid') {
                    filtered = filtered.filter((row) => row.status === 'completed' && row.isPaid === true);
                } else if (isPaid === 'unpaid') {
                    filtered = filtered.filter((row) => row.status === 'completed' && !row.isPaid);
                }

                if (apFrom || apTo) {
                    filtered = filtered.filter((row) => {
                        const d = new Date(row.appointmentAt);
                        d.setHours(0, 0, 0, 0); // Normalize to date only

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
                        d.setHours(0, 0, 0, 0); // Normalize to date only

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

                        if (sort === 'status') {
                            return a.status.localeCompare(b.status) * direction;
                        }
                        if (sort === 'agentName') {
                            return a.agent.name.localeCompare(b.agent.name) * direction;
                        }
                        if (sort === 'clientName') {
                            return a.client.name.localeCompare(b.client.name) * direction;
                        }
                        if (sort === 'projectTitle') {
                            return a.project.title.localeCompare(b.project.title) * direction;
                        }
                        if (sort === 'appointmentAt') {
                            const da = new Date(a.appointmentAt).getTime();
                            const db = new Date(b.appointmentAt).getTime();
                            return (da - db) * direction;
                        }
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
                return { rows: [], error: new Error('فشل في جلب البيانات') };
            }
        },
        [getParam]
    );

    return getRows;
}
