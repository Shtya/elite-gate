'use client';

import React from 'react';
import { TableColumn } from '@/types/components/Table';

type TableSkeletonProps = {
    columns: TableColumn[];
    rowCount?: number;
    showActions?: boolean;
};

export default function TableSkeleton({ columns, rowCount = 5, showActions = false }: TableSkeletonProps) {
    const allColumns = showActions
        ? [...columns, { key: 'actions', label: '', className: 'w-12 text-center' }]
        : columns;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed whitespace-nowrap overflow-hidden">
                <thead>
                    <tr className="bg-[var(--primary-light)] text-right text-[var(--dark)]">
                        {allColumns.map((col) => (
                            <th
                                key={col.key}
                                className={`py-4 px-4 font-semibold text-sm uppercase tracking-wide border-b border-[var(--border)] ${col.className || ''}`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-dashed animate-pulse"
                        >
                            {allColumns.map((col) => (
                                <td
                                    key={col.key}
                                    className={`py-4 px-4 text-right align-top text-[var(--dark)] ${col.className || ''}`}
                                >
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
