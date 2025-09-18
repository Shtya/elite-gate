'use client';

import { FilterConfig } from '@/types/components/Table';
import DataView from '@/components/shared/DateViewTable/DataView';
import { columns, rows } from '@/constants/dashboard/users';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import useClients from '@/hooks/dashboard/useClients';

const filters: FilterConfig[] = [
    {
        type: 'select',
        label: 'الحالة',
        key: 'status',
        options: [
            { label: 'الكل', value: '' },
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


export default function ClientsDataView() {
    const getRows = useClients();
    return (
        <DataView
            columns={columns}
            filters={filters}
            sortFields={sortFields}
            showSearch
            showSort
            pageSize={10}
            totalCount={rows.length}
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
