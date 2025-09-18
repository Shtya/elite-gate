'use client';

import { useSearchParams } from 'next/navigation';
import { FilterConfig, TableColumn, TableRow } from '@/types/components/table';
import TableSkeleton from '../TableSkeleton';
import PropertyPagination from '../../main/projects/PropertyPagination';
import FilterContainer from './FilterContainer';
import { MenuActionItem } from '../Header/MenuActionList';
import { useEffect, useState } from 'react';
import Table from '../Table';
import TableError from '../TableError';

type DataViewProps<T = Record<string, any>> = {
    columns: TableColumn<T>[];
    filters?: FilterConfig[];
    showSearch?: boolean;
    showSort?: boolean;
    sortFields?: { label: string; value: string }[];
    actionsMenuItems?: (row: T) => MenuActionItem[];
    showActions?: boolean;
    pageSize?: number;
    getRows: (signal?: AbortSignal) => Promise<{
        rows: TableRow<T>[];
        error?: Error | null;
        totalCount?: number;
    }>;
};

const directions = [
    { label: 'تصاعدي', value: 'asc' },
    { label: 'تنازلي', value: 'desc' },
];

export default function DataView<T = Record<string, any>>({
    columns,
    filters = [],
    showSearch = true,
    showSort = true,
    sortFields = [],
    actionsMenuItems,
    showActions = false,
    pageSize = 10,
    getRows,
}: DataViewProps<T>) {
    const searchParams = useSearchParams();
    const [rows, setRows] = useState<TableRow<T>[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRowsCount, setTotalRowsCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetchRows(controller.signal);
        return () => controller.abort();
    }, [getRows]);

    const fetchRows = async (signal?: AbortSignal) => {
        setIsLoading(true);
        try {
            const { rows, error, totalCount } = await getRows(signal);
            setTotalRowsCount(totalCount ?? 0);
            setError(error ? error.message : null);
            setRows(rows);
        } finally {
            setIsLoading(false);
        }
    };

    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalRowsCount);
    const pageCount = Math.ceil(totalRowsCount / pageSize);

    return (
        <>
            <FilterContainer
                filters={filters}
                showSearch={showSearch}
                showSort={showSort}
                sortFields={sortFields}
                directions={directions}
            />

            {isLoading ? (
                <TableSkeleton columns={columns} />
            ) : error ? (
                <TableError message={error} onRetry={fetchRows} />
            ) : (
                <Table<T>
                    columns={columns}
                    rows={rows ?? []}
                    showActions={showActions}
                    actionsMenuItems={actionsMenuItems}
                />
            )}

            {totalRowsCount > 0 && (
                <div className="flex justify-between items-center gap-3 pt-5 lg:pt-7 flex-wrap">
                    <PropertyPagination pageCount={pageCount} />
                    <span className="text-sm text-gray-500">
                        Showing {startEntry} to {endEntry} of {totalRowsCount} entries
                    </span>
                </div>
            )}
        </>
    );
}
