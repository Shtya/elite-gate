'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { propertySubmissionRow } from '@/types/dashboard/property-submissions';
import { mockpropertySubmissions } from '@/constants/dashboard/admin/propertySubmissions/constants';

export default function usePropertySubmissions() {
  const searchParams = useSearchParams();
  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

  const getRows = useCallback(
    async (signal?: AbortSignal): Promise<{
      rows: propertySubmissionRow[];
      error?: Error | null;
      totalCount?: number;
    }> => {
      try {
        const status = getParam('status');
        const propertyType = getParam('propertyType');
        const crFrom = getParam('createdAt_from');
        const crTo = getParam('createdAt_to');
        const search = getParam('q');

        const sort = getParam('sort');
        const dir = getParam('dir');
        const page = parseInt(getParam('page') || '1', 10);
        const limit = parseInt(getParam('limit') || '10', 10);

        await new Promise((r) => setTimeout(r, 300)); // simulate delay

        let filtered = [...mockpropertySubmissions];

        if (status && status !== 'all') {
          filtered = filtered.filter((row) => row.status === status);
        }

        if (propertyType && status !== 'all') {
          filtered = filtered.filter((row) => row.propertyType === propertyType);
        }


        if (search) {
          filtered = filtered.filter((row) =>
            row.requesterName.toLowerCase().includes(search.toLowerCase())
          );
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

            if (sort === 'status') {
              return a.status.localeCompare(b.status) * direction;
            }
            if (sort === 'requesterName') {
              return a.requesterName.localeCompare(b.requesterName) * direction;
            }
            if (sort === 'propertyType') {
              return a.propertyType.localeCompare(b.propertyType) * direction;
            }
            if (sort === 'createdAt') {
              const da = new Date(a.createdAt).getTime();
              const db = new Date(b.createdAt).getTime();
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
