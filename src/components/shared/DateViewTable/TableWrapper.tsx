'use client';

import { useEffect, useState } from 'react';

import { TableColumn, TableRow } from '@/types/components/Table';
import { MenuActionItem } from '../Header/MenuActionList';
import Table from '../Table';
import TableSkeleton from '../TableSkeleton';


type TableWrapperProps = {
    columns: TableColumn[];
    showActions?: boolean;
    actionsMenuItems?: MenuActionItem[];
    getRows: () => Promise<{ rows: TableRow[]; error: string | null }>;
};

export default function TableWrapper({
    columns,
    showActions = false,
    actionsMenuItems = [],
    getRows,
}: TableWrapperProps) {
    const [rows, setRows] = useState<TableRow[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRows = async () => {
            setIsLoading(true);
            try {
                const { rows, error } = await getRows();
                setRows(rows);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRows();
    }, [getRows]);



    if (isLoading) return <TableSkeleton columns={columns} />;

    return (
        <Table
            columns={columns}
            rows={rows ?? []}
            showActions={showActions}
            actionsMenuItems={actionsMenuItems}
        />
    );
}
