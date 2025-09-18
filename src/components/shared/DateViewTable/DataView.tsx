'use client';

import { useSearchParams } from 'next/navigation';
import { FilterConfig, TableColumn, TableRow } from '@/types/components/Table';
import TableSkeleton from '../TableSkeleton';
import PropertyPagination from '../../main/projects/PropertyPagination';
import FilterContainer from './FilterContainer';
import { MenuActionItem } from '../Header/MenuActionList';
import { Suspense } from 'react';
import TableWrapper from './TableWrapper';

type DataViewProps = {
    columns: TableColumn[];
    filters?: FilterConfig[];
    showSearch?: boolean;
    showSort?: boolean;
    sortFields?: { label: string; value: string }[];
    actionsMenuItems?: MenuActionItem[];
    showActions?: boolean;
    totalCount?: number;
    pageSize?: number;
    getRows: () => Promise<TableRow[]>;
};

const directions = [
    { label: 'تصاعدي', value: 'asc' },
    { label: 'تنازلي', value: 'desc' },
];

export default function DataView({
    columns,
    filters = [],
    showSearch = true,
    showSort = true,
    sortFields = [],
    actionsMenuItems = [],
    showActions = false,
    totalCount = 0,
    pageSize = 10,
    getRows,
}: DataViewProps) {
    const searchParams = useSearchParams();
    const suspenseKey = searchParams.toString();

    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalCount);
    const pageCount = Math.ceil(totalCount / pageSize);

    return (
        <>
            {/* 🔍 Filter Container */}
            <FilterContainer
                filters={filters}
                showSearch={showSearch}
                showSort={showSort}
                sortFields={sortFields}
                directions={directions}
            />

            {/* 🧠 Table Wrapper with Suspense */}
            <Suspense fallback={<TableSkeleton columns={columns} />} key={suspenseKey}>
                <TableWrapper
                    columns={columns}
                    showActions={showActions}
                    actionsMenuItems={actionsMenuItems}
                    getRows={getRows}
                />
            </Suspense>

            {totalCount > 0 && (
                <div className="flex justify-between items-center gap-3 pt-5 lg:pt-7 flex-wrap">
                    <PropertyPagination pageCount={pageCount} />
                    <span className="text-sm text-gray-500">
                        Showing {startEntry} to {endEntry} of {totalCount} entries
                    </span>
                </div>
            )}
        </>
    );
}
