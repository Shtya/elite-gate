'use client';

import { useEffect, useState } from 'react';

import { TableColumn, TableRow } from '@/types/components/Table';
import { MenuActionItem } from '../Header/MenuActionList';
import Table from '../Table';


type TableWrapperProps = {
    columns: TableColumn[];
    showActions?: boolean;
    actionsMenuItems?: MenuActionItem[];
    getRows: () => Promise<TableRow[]>;
};

export default function TableWrapper({
    columns,
    showActions = false,
    actionsMenuItems = [],
    getRows,
}: TableWrapperProps) {
    const [rows, setRows] = useState<TableRow[] | null>(null);

    useEffect(() => {
        const fetchRows = async () => {
            const data = await getRows();
            setRows(data);
        };

        fetchRows();
    }, [getRows]);



    return (
        <Table
            columns={columns}
            rows={rows ?? []}
            showActions={showActions}
            actionsMenuItems={actionsMenuItems}
        />
    );
}
