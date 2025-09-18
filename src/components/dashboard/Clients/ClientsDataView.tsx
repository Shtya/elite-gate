'use client';

import { FilterConfig } from '@/types/components/table';
import DataView from '@/components/shared/DateViewTable/DataView';
import { FaCheck, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import useClients from '@/hooks/dashboard/useClients';
import { columns } from '@/constants/dashboard/clientsContants';

const filters: FilterConfig[] = [
    {
        type: 'select',
        label: 'الحالة',
        key: 'status',
        options: [
            { label: 'الكل', value: '' },
            { label: 'نشط', value: 'active' },
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
            getRows={getRows}
            showActions
            actionsMenuItems={(row) => {
                const isSuspended = row.status === 'suspended';

                return [
                    {
                        label: 'عرض التفاصيل',
                        type: 'primary',
                        icon: <FaPencilAlt />,
                        link: `/clients/${row.id}`,
                    },
                    {
                        label: isSuspended ? 'تفعيل الحساب' : 'تعليق الحساب',
                        type: isSuspended ? 'primary' : 'delete',
                        icon: isSuspended ? <FaCheck /> : <FaRegTrashAlt />,
                        child: (
                            <div>
                                {isSuspended
                                    ? `Activate client ${row.id}`
                                    : `Suspend client ${row.id}`}
                            </div>
                        ),
                    },
                ];
            }}

        />
    );
}

