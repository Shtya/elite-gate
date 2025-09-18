'use client';

import { FilterConfig } from '@/types/components/Table';
import DataView from '@/components/shared/DateViewTable/DataView';
import { columns, rows } from '@/constants/dashboard/users';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';

const filters: FilterConfig[] = [
    {
        type: 'select',
        label: 'الحالة',
        key: 'status',
        options: [
            { label: 'نشط', value: 'active' },
            { label: 'قيد المراجعة', value: 'pending' },
            { label: 'موقوف', value: 'suspended' },
        ],
    },
    {
        type: 'dateRange',
        label: 'تاريخ الانضمام',
        key: 'joinedAt',
    },
];

const sortFields = [
    { label: 'الاسم', value: 'name' },
    { label: 'الحالة', value: 'status' },
    { label: 'تاريخ الانضمام', value: 'joinedAt' },
];

// ✅ Simulated async fetch function
const getRows = async () => {
    await new Promise((r) => setTimeout(r, 700));
    return rows; // Replace with API call if needed
};

export default function ClientsDataView() {
    return (
        <DataView
            columns={columns}
            filters={filters}
            sortFields={sortFields}
            showSearch
            showSort
            pageSize={10}
            totalCount={20}
            getRows={getRows}
            showActions
            actionsMenuItems={[
                {
                    label: 'تعديل المستخدم',
                    icon: <FaPencilAlt />,
                    type: 'primary',
                    link: `/users/1/edit`,
                },
                {
                    label: 'حذف المستخدم',
                    icon: <FaRegTrashAlt />,
                    type: 'delete',
                    child: <div>Delete popup</div>,
                },
            ]}
        />
    );
}
